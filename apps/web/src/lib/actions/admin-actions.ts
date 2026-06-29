"use server";

import { redirect } from "next/navigation";
import {
  crearSesionAdmin,
  cerrarSesionAdmin,
  passwordAdminValida,
  crearTokenRecuperacion,
  consumirTokenRecuperacion,
  actualizarPasswordAdmin,
} from "@/lib/admin-auth";
import { enviarEmailRecuperacionAdmin } from "@/lib/email";

export async function iniciarSesionAdmin(
  _prevState: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  const password = formData.get("password");

  if (typeof password !== "string" || !(await passwordAdminValida(password))) {
    return { error: "Contraseña incorrecta" };
  }

  await crearSesionAdmin();
  redirect("/admin/pedidos");
}

export async function cerrarSesionAdminAction() {
  await cerrarSesionAdmin();
  redirect("/admin/login");
}

export async function solicitarRecuperacionAdmin(
  _prevState: { error?: string; enviado?: boolean } | undefined
): Promise<{ error?: string; enviado?: boolean }> {
  const token = await crearTokenRecuperacion();
  const baseUrl = process.env.APP_URL ?? "http://localhost:3000";

  try {
    await enviarEmailRecuperacionAdmin(`${baseUrl}/admin/reset?token=${token}`);
  } catch {
    return { error: "No se pudo enviar el correo. Revisa la configuración de Resend." };
  }

  return { enviado: true };
}

const passwordSchema = (password: string) => password.length >= 8;

export async function restablecerPasswordAdmin(
  _prevState: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  const token = formData.get("token");
  const password = formData.get("password");
  const confirmacion = formData.get("confirmacion");

  if (typeof token !== "string" || typeof password !== "string" || typeof confirmacion !== "string") {
    return { error: "Datos inválidos" };
  }
  if (!passwordSchema(password)) {
    return { error: "La contraseña debe tener al menos 8 caracteres" };
  }
  if (password !== confirmacion) {
    return { error: "Las contraseñas no coinciden" };
  }

  const tokenValido = await consumirTokenRecuperacion(token);
  if (!tokenValido) {
    return { error: "El link expiró o ya fue usado. Pide uno nuevo." };
  }

  await actualizarPasswordAdmin(password);
  redirect("/admin/login");
}
