import { Resend } from "resend";

export function correosDeRecuperacionAdmin(): string[] {
  return (process.env.ADMIN_RECOVERY_EMAILS ?? "")
    .split(",")
    .map((correo) => correo.trim())
    .filter(Boolean);
}

export async function enviarEmailRecuperacionAdmin(resetUrl: string) {
  const destinatarios = correosDeRecuperacionAdmin();
  const from = process.env.RESEND_FROM_EMAIL;
  if (destinatarios.length === 0 || !from || !process.env.RESEND_API_KEY) {
    throw new Error("Falta configurar RESEND_API_KEY, RESEND_FROM_EMAIL o ADMIN_RECOVERY_EMAILS");
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from,
    to: destinatarios,
    subject: "Recuperar contraseña del panel del dueño",
    html: `
      <p>Pidieron restablecer la contraseña del panel del dueño de Siempre Presente.</p>
      <p><a href="${resetUrl}">Hacer clic aquí para fijar una nueva contraseña</a></p>
      <p>Este link expira en 30 minutos y solo funciona una vez. Si no fuiste tú, ignora este correo.</p>
    `,
  });
}
