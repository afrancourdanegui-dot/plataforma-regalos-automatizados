"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { CredentialsSignin } from "next-auth";
import { prisma } from "@/lib/prisma";
import { signIn, signOut } from "@/auth";

export async function cerrarSesion() {
  await signOut({ redirectTo: "/" });
}

const registroSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export async function registrarUsuario(
  _prevState: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  const parsed = registroSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos inválidos" };
  }

  const { name, email, password } = parsed.data;

  const existente = await prisma.user.findUnique({ where: { email } });
  if (existente) {
    return { error: "Ya existe una cuenta con ese email" };
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: { name, email, passwordHash },
  });

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof CredentialsSignin) {
      return { error: "No se pudo iniciar sesión automáticamente" };
    }
    throw error;
  }

  return {};
}

export async function loginConGoogle() {
  await signIn("google", { redirectTo: "/dashboard" });
}

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "La contraseña es obligatoria"),
});

export async function loginUsuario(
  _prevState: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos inválidos" };
  }

  try {
    await signIn("credentials", {
      ...parsed.data,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof CredentialsSignin) {
      return { error: "Email o contraseña incorrectos" };
    }
    throw error;
  }

  return {};
}
