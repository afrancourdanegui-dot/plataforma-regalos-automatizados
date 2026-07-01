import Link from "next/link";
import { MarketingNav } from "@/components/marketing-nav";

export const metadata = {
  title: "Política de Privacidad — Siempre Presente",
};

const FECHA_VIGENCIA = "30 de junio de 2026";

export default function PrivacidadPage() {
  return (
    <div className="flex min-h-full flex-col bg-crema">
      <header className="sticky top-0 z-40 bg-crema/95 backdrop-blur-sm border-b border-arena/60">
        <MarketingNav />
      </header>

      <main className="mx-auto w-full max-w-3xl px-6 py-16">
        <div className="mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-terracota">
            Legal
          </p>
          <h1 className="mt-2 font-display text-4xl italic text-ciruelo">
            Política de Privacidad
          </h1>
          <p className="mt-3 text-sm text-gris-calido">
            Fecha de vigencia: {FECHA_VIGENCIA}
          </p>
        </div>

        <div className="prose-legal">
          <Section title="1. Responsable del tratamiento">
            <p>
              <strong>Siempre Presente</strong> [razón social por definir], con RUC [por definir] y
              domicilio en Lima, Perú (en adelante &ldquo;nosotros&rdquo;, &ldquo;la empresa&rdquo; o
              &ldquo;Siempre Presente&rdquo;), es responsable del tratamiento de los datos personales
              que recopilamos a través de nuestra plataforma web{" "}
              <Link href="/" className="text-terracota hover:underline">
                siemprepresente.pe
              </Link>{" "}
              y sus servicios relacionados.
            </p>
            <p>
              Esta Política de Privacidad se elabora en cumplimiento de la Ley N° 29733, Ley de
              Protección de Datos Personales, y su Reglamento aprobado por Decreto Supremo N°
              003-2013-JUS.
            </p>
          </Section>

          <Section title="2. Datos personales que recopilamos">
            <Subsection title="Datos que nos proporcionas directamente">
              <ul>
                <li>
                  <strong>Datos de cuenta:</strong> nombre completo, correo electrónico y
                  contraseña. Las contraseñas se almacenan exclusivamente como hash criptográfico
                  (bcrypt) y nunca en texto plano.
                </li>
                <li>
                  <strong>Datos de destinatarios:</strong> nombre, relación contigo (pareja, amigo,
                  familiar, etc.) y notas de preferencias personales que decides registrar.
                </li>
                <li>
                  <strong>Ocasiones especiales:</strong> tipo de fecha (cumpleaños, aniversario,
                  personalizada), fecha y frecuencia.
                </li>
                <li>
                  <strong>Direcciones de entrega:</strong> calle, número, tipo de vivienda,
                  distrito de Lima y referencias adicionales del destinatario.
                </li>
                <li>
                  <strong>Selección de regalos:</strong> productos elegidos para cada ocasión e
                  historial de pedidos.
                </li>
                <li>
                  <strong>Datos de pago</strong> (próximamente): número de tarjeta, fecha de
                  vencimiento y código de seguridad, procesados por Stripe, Inc. Nosotros no
                  almacenamos datos de tarjetas directamente.
                </li>
              </ul>
            </Subsection>

            <Subsection title="Datos recopilados automáticamente">
              <ul>
                <li>
                  Dirección IP, tipo y versión de navegador, sistema operativo y tipo de
                  dispositivo.
                </li>
                <li>
                  Fecha y hora de acceso, páginas visitadas y acciones realizadas dentro de la
                  plataforma.
                </li>
                <li>
                  Cookies de sesión necesarias para el funcionamiento del servicio (ver sección 8).
                </li>
              </ul>
            </Subsection>

            <Subsection title="Datos provenientes de terceros">
              <p>
                Si inicias sesión con Google (Google OAuth), recibimos de Google LLC tu nombre,
                correo electrónico e imagen de perfil, de acuerdo con los permisos que otorgas en
                tu cuenta de Google. Puedes revocar este acceso en cualquier momento desde la
                configuración de seguridad de tu cuenta Google.
              </p>
            </Subsection>
          </Section>

          <Section title="3. Finalidades del tratamiento">
            <p>Utilizamos tus datos personales para:</p>
            <ol>
              <li>Crear y gestionar tu cuenta en la plataforma.</li>
              <li>
                Coordinar la entrega de regalos con los proveedores locales (floristas, pastelerías
                y otros) en Lima.
              </li>
              <li>
                Enviarte confirmaciones de pedido, recordatorios de fechas próximas y notificaciones
                sobre el estado de tus entregas.
              </li>
              <li>
                Personalizar tu experiencia y mostrarte sugerencias de regalos relevantes.
              </li>
              <li>
                Procesar pagos y prevenir fraudes (cuando esta función esté disponible).
              </li>
              <li>
                Cumplir obligaciones legales y atender requerimientos de autoridades competentes.
              </li>
              <li>
                Enviarte comunicaciones de marketing, únicamente con tu consentimiento explícito y
                previo.
              </li>
              <li>Mejorar y desarrollar la plataforma mediante análisis de uso.</li>
            </ol>
          </Section>

          <Section title="4. Base legal del tratamiento">
            <p>
              El tratamiento de tus datos personales se basa en el consentimiento que otorgas al
              momento de registrarte y aceptar esta Política de Privacidad, conforme al artículo 13
              de la Ley N° 29733. Para determinadas finalidades (como el cumplimiento de
              obligaciones legales), el tratamiento puede basarse en disposiciones legales
              aplicables.
            </p>
          </Section>

          <Section title="5. Con quién compartimos tus datos">
            <p>
              No vendemos ni alquilamos tus datos personales a terceros con fines comerciales
              propios. Solo los compartimos en los siguientes casos:
            </p>

            <Subsection title="Proveedores de tecnología">
              <ul>
                <li>
                  <strong>Google LLC</strong> (EE.UU.): autenticación con Google OAuth.
                </li>
                <li>
                  <strong>Stripe, Inc.</strong> (EE.UU.): procesamiento de pagos con tarjeta
                  (próximamente).
                </li>
                <li>
                  <strong>Vercel Inc.</strong> (EE.UU.): alojamiento y despliegue de la plataforma.
                </li>
                <li>
                  <strong>Neon Tech Inc.</strong> (EE.UU.): base de datos donde se almacena la
                  información de la plataforma.
                </li>
              </ul>
            </Subsection>

            <Subsection title="Proveedores locales de regalos">
              <p>
                Cuando se coordina una entrega, compartimos con el proveedor (florista, pastelería,
                spa, etc.) únicamente la información estrictamente necesaria: nombre del
                destinatario, dirección de entrega y descripción del producto. No compartimos datos
                de tu cuenta ni información de pago.
              </p>
            </Subsection>

            <Subsection title="Autoridades competentes">
              <p>
                Podemos divulgar datos personales cuando la ley peruana lo exija, ante una orden
                judicial o requerimiento de autoridad competente, o para defender los derechos de la
                empresa o de terceros afectados.
              </p>
            </Subsection>

            <Subsection title="Reorganización corporativa">
              <p>
                En caso de fusión, adquisición, venta de activos o reorganización de la empresa, tus
                datos personales podrían ser transferidos al nuevo responsable, quien quedará sujeto
                a los mismos compromisos de esta política o a una actualización notificada con
                anticipación.
              </p>
            </Subsection>
          </Section>

          <Section title="6. Transferencias internacionales de datos">
            <p>
              Algunos de nuestros proveedores de tecnología están domiciliados fuera del Perú,
              principalmente en los Estados Unidos. Al usar Siempre Presente, aceptas que tus datos
              puedan ser procesados en el extranjero. Nos aseguramos de que dichos proveedores
              mantengan estándares de seguridad y privacidad equivalentes o superiores a los
              exigidos por la Ley N° 29733.
            </p>
          </Section>

          <Section title="7. Retención de datos">
            <p>
              Conservamos tus datos personales mientras tu cuenta esté activa o mientras sea
              necesario para prestarte el servicio. Si solicitas la eliminación de tu cuenta,
              procederemos a eliminar o anonimizar tus datos en un plazo razonable, salvo aquellos
              que debamos conservar por obligaciones legales, contables o fiscales (generalmente no
              más de 5 años según la legislación peruana aplicable).
            </p>
            <p>
              Los datos de destinatarios, direcciones y selecciones de regalos se eliminan
              conjuntamente con tu cuenta.
            </p>
          </Section>

          <Section title="8. Cookies y tecnologías similares">
            <p>
              Utilizamos cookies y tecnologías similares para:
            </p>
            <ul>
              <li>
                <strong>Cookies de sesión</strong> (necesarias): mantienen tu sesión iniciada
                mientras navegas por la plataforma. Sin ellas, el servicio no funciona.
              </li>
              <li>
                <strong>Cookies analíticas</strong> (opcionales): nos ayudan a entender cómo se usa
                la plataforma para mejorarla.
              </li>
            </ul>
            <p>
              Puedes controlar y eliminar cookies desde la configuración de tu navegador. Ten en
              cuenta que deshabilitar las cookies de sesión impedirá el uso del servicio.
            </p>
          </Section>

          <Section title="9. Seguridad de los datos">
            <p>
              Implementamos medidas técnicas y organizativas para proteger tus datos personales:
            </p>
            <ul>
              <li>
                Transmisión cifrada mediante HTTPS/TLS entre tu dispositivo y nuestros servidores.
              </li>
              <li>Almacenamiento en servidores con acceso restringido y monitoreado.</li>
              <li>
                Contraseñas almacenadas exclusivamente como hash criptográfico con bcrypt; nunca
                guardamos tu contraseña original.
              </li>
              <li>Acceso interno a datos personales limitado a personal autorizado.</li>
            </ul>
            <p>
              Ningún sistema de transmisión o almacenamiento es completamente seguro. Si detectas
              actividad sospechosa en tu cuenta o sospechas un acceso no autorizado, comunícate con
              nosotros de inmediato a través de{" "}
              <a href="mailto:privacidad@siemprepresente.pe" className="text-terracota hover:underline">
                privacidad@siemprepresente.pe
              </a>
              .
            </p>
          </Section>

          <Section title="10. Menores de edad">
            <p>
              Siempre Presente no está dirigido a personas menores de 18 años ni recopila
              intencionalmente datos personales de menores. Si eres padre, madre o tutor legal y
              tienes razones para creer que un menor nos ha proporcionado datos personales,
              comunícate con nosotros para que procedamos a eliminarlos sin demora.
            </p>
          </Section>

          <Section title="11. Tus derechos como titular de datos (ARCO)">
            <p>
              De conformidad con la Ley N° 29733 y su Reglamento, tienes los siguientes derechos
              sobre tus datos personales:
            </p>
            <ul>
              <li>
                <strong>Acceso:</strong> solicitar información sobre qué datos tuyos tenemos, con
                qué finalidad y a quién se los hemos compartido.
              </li>
              <li>
                <strong>Rectificación:</strong> solicitar la corrección de datos inexactos,
                desactualizados o incompletos.
              </li>
              <li>
                <strong>Cancelación:</strong> solicitar la eliminación de tus datos cuando ya no
                sean necesarios para la finalidad para la que fueron recopilados, o cuando retires
                tu consentimiento.
              </li>
              <li>
                <strong>Oposición:</strong> oponerte al tratamiento de tus datos para determinadas
                finalidades, como comunicaciones de marketing.
              </li>
            </ul>
            <p>
              Para ejercer cualquiera de estos derechos, escríbenos a{" "}
              <a href="mailto:privacidad@siemprepresente.pe" className="text-terracota hover:underline">
                privacidad@siemprepresente.pe
              </a>{" "}
              indicando tu nombre completo, correo electrónico registrado y el derecho que deseas
              ejercer. Responderemos dentro de los 20 días hábiles establecidos por ley.
            </p>
            <p>
              También puedes gestionar directamente tus datos desde la sección{" "}
              <Link href="/dashboard/perfil" className="text-terracota hover:underline">
                Mi perfil
              </Link>{" "}
              de tu cuenta.
            </p>
            <p>
              Si consideras que tus derechos no han sido debidamente atendidos, tienes el derecho de
              presentar una reclamación ante la{" "}
              <strong>Autoridad Nacional de Protección de Datos Personales (ANPD)</strong>:
              www.minjus.gob.pe/privacidad.
            </p>
          </Section>

          <Section title="12. Cambios a esta Política">
            <p>
              Nos reservamos el derecho de actualizar esta Política de Privacidad para reflejar
              cambios en nuestros servicios, en la legislación aplicable o en nuestras prácticas de
              tratamiento de datos. Ante cambios significativos, te notificaremos con al menos 10
              días de anticipación mediante un aviso destacado en la plataforma o por correo
              electrónico a la dirección registrada. El uso continuado del servicio después de la
              notificación implica la aceptación de los cambios.
            </p>
          </Section>

          <Section title="13. Contacto">
            <p>Si tienes preguntas, comentarios o solicitudes relacionadas con esta Política de Privacidad:</p>
            <address className="not-italic">
              <strong>Siempre Presente</strong>
              <br />
              Lima, Perú
              <br />
              <a href="mailto:privacidad@siemprepresente.pe" className="text-terracota hover:underline">
                privacidad@siemprepresente.pe
              </a>
            </address>
          </Section>
        </div>

        <div className="mt-12 border-t border-arena pt-6 text-center">
          <p className="text-xs text-gris-calido">
            Este documento es un borrador preliminar sujeto a revisión legal.
          </p>
          <Link href="/" className="mt-4 inline-block text-xs font-semibold text-terracota">
            ← Volver al inicio
          </Link>
        </div>
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 font-display text-2xl italic text-ciruelo">{title}</h2>
      <div className="flex flex-col gap-3 text-[14px] leading-relaxed text-carbon/80">
        {children}
      </div>
    </section>
  );
}

function Subsection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-4">
      <h3 className="mb-2 text-[13px] font-bold uppercase tracking-[0.1em] text-carbon">
        {title}
      </h3>
      <div className="flex flex-col gap-2 text-[14px] leading-relaxed text-carbon/80">
        {children}
      </div>
    </div>
  );
}
