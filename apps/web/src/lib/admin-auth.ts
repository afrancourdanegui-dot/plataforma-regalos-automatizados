import crypto from "crypto";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

const COOKIE_NAME = "admin_session";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 12;
const RESET_TOKEN_DURATION_MS = 1000 * 60 * 30;
const CREDENTIAL_ID = "singleton";

function firmar(payload: string) {
  return crypto.createHmac("sha256", process.env.AUTH_SECRET!).update(payload).digest("hex");
}

async function obtenerOSemearCredencial() {
  const existente = await prisma.adminCredential.findUnique({ where: { id: CREDENTIAL_ID } });
  if (existente) return existente;

  const semilla = process.env.ADMIN_PASSWORD;
  if (!semilla) return null;

  const passwordHash = await bcrypt.hash(semilla, 12);
  return prisma.adminCredential.upsert({
    where: { id: CREDENTIAL_ID },
    update: {},
    create: { id: CREDENTIAL_ID, passwordHash },
  });
}

export async function passwordAdminValida(intentada: string) {
  const credencial = await obtenerOSemearCredencial();
  if (!credencial) return false;
  return bcrypt.compare(intentada, credencial.passwordHash);
}

export async function actualizarPasswordAdmin(nuevaPassword: string) {
  const passwordHash = await bcrypt.hash(nuevaPassword, 12);
  await prisma.adminCredential.upsert({
    where: { id: CREDENTIAL_ID },
    update: { passwordHash },
    create: { id: CREDENTIAL_ID, passwordHash },
  });
}

export async function crearSesionAdmin() {
  const expira = Date.now() + SESSION_DURATION_MS;
  const valor = `${expira}.${firmar(String(expira))}`;
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, valor, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(expira),
  });
}

export async function cerrarSesionAdmin() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
}

async function haySesionAdminValida() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(COOKIE_NAME);
  if (!cookie) return false;

  const [expira, firma] = cookie.value.split(".");
  if (!expira || !firma) return false;
  if (Number(expira) < Date.now()) return false;

  const firmaEsperada = firmar(expira);
  if (firma.length !== firmaEsperada.length) return false;
  return crypto.timingSafeEqual(Buffer.from(firma), Buffer.from(firmaEsperada));
}

export async function requireAdminSession() {
  if (!(await haySesionAdminValida())) redirect("/admin/login");
}

function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function crearTokenRecuperacion() {
  const token = crypto.randomBytes(32).toString("hex");
  await prisma.adminPasswordResetToken.create({
    data: {
      tokenHash: hashToken(token),
      expiresAt: new Date(Date.now() + RESET_TOKEN_DURATION_MS),
    },
  });
  return token;
}

export async function consumirTokenRecuperacion(token: string) {
  const tokenHash = hashToken(token);
  const registro = await prisma.adminPasswordResetToken.findUnique({ where: { tokenHash } });

  if (!registro || registro.usedAt || registro.expiresAt < new Date()) {
    return false;
  }

  await prisma.adminPasswordResetToken.update({
    where: { tokenHash },
    data: { usedAt: new Date() },
  });
  return true;
}
