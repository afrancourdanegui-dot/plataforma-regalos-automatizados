import Link from "next/link";
import { MarketingNav } from "@/components/marketing-nav";

export const metadata = {
  title: "Términos de Uso — Siempre Presente",
};

const FECHA_VIGENCIA = "30 de junio de 2026";

export default function TerminosPage() {
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
            Términos de Uso
          </h1>
          <p className="mt-3 text-sm text-gris-calido">
            Fecha de vigencia: {FECHA_VIGENCIA}
          </p>
        </div>

        <div className="mb-8 rounded-2xl border border-arena bg-white px-5 py-4 text-[13px] text-gris-calido">
          Al registrarte y utilizar Siempre Presente, aceptas estos Términos de Uso en su
          totalidad. Si no estás de acuerdo con alguna parte, no uses el servicio.
        </div>

        <div>
          <Section title="1. Sobre estos términos">
            <p>
              Estos Términos de Uso (&ldquo;Términos&rdquo;) regulan el acceso y uso de la
              plataforma Siempre Presente, operada por{" "}
              <strong>[razón social por definir]</strong>, con RUC [por definir], domiciliada en
              Lima, Perú (en adelante &ldquo;Siempre Presente&rdquo;, &ldquo;nosotros&rdquo; o
              &ldquo;la empresa&rdquo;).
            </p>
            <p>
              Al acceder o usar la plataforma, confirmas que tienes al menos 18 años de edad,
              que tienes capacidad legal para celebrar contratos vinculantes, y que aceptas estos
              Términos junto con nuestra{" "}
              <Link href="/legal/privacidad" className="text-terracota hover:underline">
                Política de Privacidad
              </Link>
              .
            </p>
            <p>
              Nos reservamos el derecho de modificar estos Términos en cualquier momento.
              Ante cambios significativos, te notificaremos con al menos 10 días de anticipación
              por correo electrónico o mediante un aviso destacado en la plataforma. El uso
              continuado después de la notificación implica la aceptación de los cambios.
            </p>
          </Section>

          <Section title="2. Descripción del servicio">
            <p>
              Siempre Presente es una plataforma que permite a los usuarios organizar y
              automatizar el envío de regalos a personas de su entorno (destinatarios) en Lima,
              Perú, con ocasión de fechas especiales como cumpleaños, aniversarios u otras
              celebraciones.
            </p>
            <p>El servicio comprende:</p>
            <ul>
              <li>Registro y gestión de personas y fechas especiales.</li>
              <li>
                Selección de regalos de un catálogo curado de proveedores locales (floristas,
                pastelerías, spas, entre otros).
              </li>
              <li>
                Coordinación y seguimiento de la entrega del regalo en la dirección indicada.
              </li>
              <li>
                Notificaciones y recordatorios sobre fechas próximas.
              </li>
            </ul>
            <p>
              No garantizamos la disponibilidad ininterrumpida del servicio. Podemos realizar
              mantenimientos programados o no programados, y notificaremos cuando sea posible.
            </p>
          </Section>

          <Section title="3. Cuentas de usuario">
            <Subsection title="3.1 Registro">
              <p>
                Para usar la mayor parte del servicio debes crear una cuenta con información
                veraz, completa y actualizada. Cada persona puede tener una sola cuenta. No
                está permitido registrarse en nombre de otra persona ni crear cuentas de forma
                automatizada.
              </p>
              <p>
                Puedes registrarte con correo electrónico y contraseña, o mediante tu cuenta de
                Google. En ambos casos eres responsable de la confidencialidad de tus
                credenciales y de cualquier actividad que ocurra bajo tu cuenta.
              </p>
            </Subsection>

            <Subsection title="3.2 Seguridad de la cuenta">
              <p>
                Debes notificarnos de inmediato a{" "}
                <a
                  href="mailto:hola@siemprepresente.pe"
                  className="text-terracota hover:underline"
                >
                  hola@siemprepresente.pe
                </a>{" "}
                si sospechas un acceso no autorizado a tu cuenta. No somos responsables por
                pérdidas derivadas del uso no autorizado de tu cuenta si no nos notificaste
                oportunamente.
              </p>
            </Subsection>

            <Subsection title="3.3 Suspensión y cancelación">
              <p>
                Puedes cancelar tu cuenta en cualquier momento desde la sección{" "}
                <Link href="/dashboard/perfil" className="text-terracota hover:underline">
                  Mi perfil
                </Link>
                .
              </p>
              <p>
                Nos reservamos el derecho de suspender o cancelar cuentas que incumplan estos
                Términos, proporcionen información falsa, realicen actividades fraudulentas o
                permanezcan inactivas por un período prolongado. En casos graves, podemos
                actuar sin previo aviso.
              </p>
            </Subsection>
          </Section>

          <Section title="4. Pedidos, pagos y entregas">
            <Subsection title="4.1 Selección y confirmación de regalos">
              <p>
                Al seleccionar un regalo para una ocasión, no se genera un pedido ni un cobro
                de forma inmediata. El pedido se confirma y procesa conforme al flujo de pago
                que estará disponible próximamente.
              </p>
              <p>
                Los productos están sujetos a disponibilidad. Nos reservamos el derecho de
                sustituir un producto por uno equivalente o de igual valor si el original no
                estuviera disponible al momento de la entrega, notificándote con anticipación
                cuando sea posible.
              </p>
            </Subsection>

            <Subsection title="4.2 Precios">
              <p>
                Los precios se muestran en soles peruanos (S/) e incluyen IGV cuando
                corresponda. Nos reservamos el derecho de modificar precios sin previo aviso,
                aunque los pedidos ya confirmados se cobran al precio vigente al momento de la
                confirmación.
              </p>
            </Subsection>

            <Subsection title="4.3 Pagos">
              <p>
                El pago se realizará a través de los métodos disponibles en la plataforma al
                momento de la compra. Al proporcionar un método de pago, garantizas que estás
                autorizado a usarlo y que la información es veraz y vigente.
              </p>
              <p>
                Los datos de pago son procesados por proveedores externos certificados. Siempre
                Presente no almacena números de tarjeta completos en sus servidores.
              </p>
            </Subsection>

            <Subsection title="4.4 Entregas">
              <p>
                Las entregas se realizan en Lima Metropolitana en los distritos disponibles en
                la plataforma. Las fechas y horarios de entrega son estimados; no garantizamos
                la exactitud al minuto, aunque nos comprometemos a coordinar con los proveedores
                para cumplir la fecha indicada.
              </p>
              <p>
                Eres responsable de proporcionar información de entrega correcta (dirección,
                distrito, referencias). Siempre Presente no se hace responsable por entregas
                fallidas derivadas de información incorrecta o ausencia del destinatario.
              </p>
            </Subsection>

            <Subsection title="4.5 Regalos con contenido alcohólico">
              <p>
                Algunos productos del catálogo contienen bebidas alcohólicas (vinos, licores,
                cervezas artesanales u otros). Su comercialización y entrega está regulada por
                la Ley N° 28681 y la Ley N° 29907 de la República del Perú, que prohíben la
                venta, suministro o entrega de bebidas alcohólicas a personas menores de 18
                años.
              </p>
              <p>
                Al seleccionar un regalo con contenido alcohólico, el usuario (remitente)
                declara expresamente que:
              </p>
              <ol>
                <li>El destinatario tiene 18 años o más al momento de la entrega.</li>
                <li>
                  Ha obtenido la confirmación correspondiente y asume plena responsabilidad
                  por esta declaración.
                </li>
                <li>
                  Entiende que el proveedor o repartidor podrá solicitar la presentación del
                  DNI u otro documento de identidad vigente al destinatario en el momento de
                  la entrega.
                </li>
              </ol>
              <p>
                Si el destinatario no puede acreditar su mayoría de edad al momento de la
                entrega, el proveedor está obligado por ley a no entregar el producto. En ese
                caso, el pedido se registrará como &ldquo;no entregado&rdquo; y se gestionará
                una devolución o reemplazo conforme a la política indicada en la sección 4.6.
              </p>
              <p>
                Siempre Presente actúa como intermediario entre el remitente y el proveedor
                autorizado para la venta de bebidas alcohólicas. La titularidad del producto
                pasa del proveedor al remitente en el momento de la confirmación del pedido.
                Siempre Presente no asume responsabilidad por el uso indebido derivado de
                declaraciones falsas del remitente respecto a la edad del destinatario.
              </p>
            </Subsection>

            <Subsection title="4.6 Cancelaciones y devoluciones">
              <p>
                Puedes cancelar un regalo programado en cualquier momento antes de que el pedido
                entre en proceso de preparación con el proveedor. Una vez iniciada la
                preparación, la cancelación puede no ser posible.
              </p>
              <p>
                Las devoluciones o reembolsos por productos defectuosos, incorrectos o no
                entregados se gestionan caso a caso. Para solicitarlos, contáctanos en un plazo
                máximo de 48 horas tras la fecha de entrega programada. Tus derechos como
                consumidor bajo el Código de Protección y Defensa del Consumidor (Ley 29571) se
                mantienen vigentes en todo momento.
              </p>
            </Subsection>
          </Section>

          <Section title="5. Uso aceptable">
            <p>Al usar Siempre Presente, te comprometes a no:</p>
            <ul>
              <li>
                Proporcionar información falsa, engañosa o fraudulenta en tu cuenta o al
                registrar destinatarios o direcciones.
              </li>
              <li>
                Usar la plataforma para fines comerciales propios, reventa, o actividades
                distintas al uso personal para el que fue diseñada.
              </li>
              <li>
                Suplantar la identidad de otra persona o entidad.
              </li>
              <li>
                Acceder a cuentas de otros usuarios o intentar obtener sus datos personales.
              </li>
              <li>
                Usar bots, scrapers, crawlers u otros medios automatizados para acceder o
                extraer contenido de la plataforma.
              </li>
              <li>
                Intentar vulnerar, interferir o dañar la seguridad, integridad o disponibilidad
                de la plataforma o sus sistemas.
              </li>
              <li>
                Introducir virus, malware u otro código malicioso.
              </li>
              <li>
                Realizar cualquier actividad que infrinja la legislación peruana aplicable.
              </li>
            </ul>
            <p>
              El incumplimiento de estas condiciones puede resultar en la suspensión inmediata
              de tu cuenta y, si corresponde, en acciones legales.
            </p>
          </Section>

          <Section title="6. Propiedad intelectual">
            <Subsection title="6.1 Contenido de la plataforma">
              <p>
                La plataforma, incluyendo su diseño, código, textos, imágenes, marca y logotipo,
                son propiedad de Siempre Presente o de sus licenciantes, y están protegidos por
                la legislación peruana e internacional sobre propiedad intelectual.
              </p>
              <p>
                Te otorgamos una licencia limitada, no exclusiva, intransferible y revocable para
                usar la plataforma exclusivamente para los fines previstos en estos Términos. No
                puedes copiar, reproducir, modificar, distribuir ni crear obras derivadas del
                contenido de la plataforma sin autorización expresa y escrita.
              </p>
            </Subsection>

            <Subsection title="6.2 Tu contenido">
              <p>
                Al ingresar información en la plataforma (notas sobre destinatarios, mensajes de
                regalo, etc.), nos otorgas una licencia no exclusiva para usar ese contenido
                únicamente en la medida necesaria para prestar el servicio. No reclamamos
                propiedad sobre el contenido que ingresas.
              </p>
            </Subsection>

            <Subsection title="6.3 Comentarios y sugerencias">
              <p>
                Si nos envías ideas, sugerencias o comentarios sobre el servicio, puedes hacerlo
                libremente. Nos reservamos el derecho de usar esas ideas para mejorar la
                plataforma sin obligación de compensación, atribución o confidencialidad, salvo
                acuerdo expreso en contrario.
              </p>
            </Subsection>
          </Section>

          <Section title="7. Proveedores y terceros">
            <p>
              Los regalos disponibles en el catálogo son provistos por floristas, pastelerías,
              spas y otros negocios locales de Lima (&ldquo;Proveedores&rdquo;). Siempre Presente
              actúa como intermediario y coordinador entre el usuario y el Proveedor.
            </p>
            <p>
              La calidad y exactitud de los productos es responsabilidad de cada Proveedor.
              Siempre Presente realiza una selección y evaluación de sus proveedores, pero no
              puede garantizar que todos los pedidos sean perfectos. Ante cualquier inconveniente
              con un producto, contáctanos para gestionar una solución.
            </p>
            <p>
              La plataforma puede contener enlaces a sitios de terceros. No somos responsables
              del contenido ni las prácticas de privacidad de esos sitios, y su inclusión no
              implica endorsement de nuestra parte.
            </p>
          </Section>

          <Section title="8. Limitación de responsabilidad">
            <p>
              En la máxima medida permitida por la legislación peruana aplicable:
            </p>
            <ul>
              <li>
                El servicio se presta &ldquo;tal como está&rdquo; y &ldquo;según disponibilidad&rdquo;,
                sin garantías de funcionamiento ininterrumpido o libre de errores.
              </li>
              <li>
                No somos responsables por daños indirectos, incidentales, especiales o
                consecuentes derivados del uso o la imposibilidad de uso del servicio.
              </li>
              <li>
                En ningún caso nuestra responsabilidad total frente a ti excederá el monto que
                hayas pagado a Siempre Presente en los 12 meses anteriores al evento que dio
                origen al reclamo, o S/ 500 si no has realizado ningún pago.
              </li>
            </ul>
            <p>
              Nada en esta cláusula limita los derechos que te corresponden como consumidor bajo
              el Código de Protección y Defensa del Consumidor (Ley 29571) ni bajo otras normas
              imperativas de la legislación peruana.
            </p>
          </Section>

          <Section title="9. Indemnización">
            <p>
              Aceptas indemnizar y mantener indemne a Siempre Presente, sus directores,
              empleados y colaboradores, frente a cualquier reclamo, pérdida, daño, costo y gasto
              (incluidos honorarios legales razonables) que surjan de: (a) tu uso de la
              plataforma en violación de estos Términos; (b) información falsa que hayas
              proporcionado; o (c) la infracción de derechos de terceros derivada de tu
              conducta.
            </p>
          </Section>

          <Section title="10. Modificaciones y discontinuación del servicio">
            <p>
              Podemos modificar, suspender o discontinuar cualquier función o la totalidad del
              servicio en cualquier momento, por cualquier motivo. Cuando sea posible, te
              notificaremos con anticipación razonable. La discontinuación del servicio no genera
              obligación de compensación, salvo por pedidos ya pagados y no entregados.
            </p>
          </Section>

          <Section title="11. Ley aplicable y resolución de controversias">
            <p>
              Estos Términos se rigen por las leyes de la República del Perú, incluyendo el
              Código Civil, el Código de Protección y Defensa del Consumidor (Ley 29571) y las
              normas aplicables.
            </p>
            <p>
              Ante cualquier controversia, las partes se comprometen a buscar una solución
              amistosa en primera instancia. Si no se llega a un acuerdo, el usuario puede:
            </p>
            <ol>
              <li>
                Presentar un reclamo ante el Servicio de Atención al Ciudadano del INDECOPI
                (Instituto Nacional de Defensa de la Competencia y de la Protección de la
                Propiedad Intelectual): www.indecopi.gob.pe.
              </li>
              <li>
                Recurrir a los juzgados y tribunales competentes de Lima, Perú, a los cuales
                ambas partes se someten expresamente.
              </li>
            </ol>
          </Section>

          <Section title="12. Disposiciones generales">
            <Subsection title="12.1 Acuerdo completo">
              <p>
                Estos Términos, junto con la{" "}
                <Link href="/legal/privacidad" className="text-terracota hover:underline">
                  Política de Privacidad
                </Link>
                , constituyen el acuerdo completo entre tú y Siempre Presente respecto al uso
                de la plataforma, y reemplazan cualquier acuerdo anterior.
              </p>
            </Subsection>

            <Subsection title="12.2 Cesión">
              <p>
                No puedes ceder tus derechos u obligaciones bajo estos Términos sin nuestro
                consentimiento previo por escrito. Siempre Presente puede ceder estos Términos
                en el contexto de una reorganización corporativa, fusión o adquisición.
              </p>
            </Subsection>

            <Subsection title="12.3 Separabilidad">
              <p>
                Si alguna disposición de estos Términos es declarada inválida o inaplicable, las
                demás disposiciones permanecerán en plena vigencia y efecto.
              </p>
            </Subsection>

            <Subsection title="12.4 No renuncia">
              <p>
                El hecho de que no ejerzamos algún derecho bajo estos Términos no implica la
                renuncia a dicho derecho en el futuro.
              </p>
            </Subsection>

            <Subsection title="12.5 Relación entre las partes">
              <p>
                Nada en estos Términos crea una relación de agencia, sociedad, empresa conjunta,
                empleo ni franquicia entre el usuario y Siempre Presente.
              </p>
            </Subsection>

            <Subsection title="12.6 Notificaciones">
              <p>
                Las notificaciones que debamos enviarte se harán al correo electrónico registrado
                en tu cuenta. Las notificaciones que quieras enviarnos deben dirigirse a{" "}
                <a
                  href="mailto:hola@siemprepresente.pe"
                  className="text-terracota hover:underline"
                >
                  hola@siemprepresente.pe
                </a>
                .
              </p>
            </Subsection>
          </Section>

          <Section title="13. Contacto">
            <p>
              Para preguntas, reclamos o sugerencias relacionadas con estos Términos:
            </p>
            <address className="not-italic">
              <strong>Siempre Presente</strong>
              <br />
              Lima, Perú
              <br />
              <a
                href="mailto:hola@siemprepresente.pe"
                className="text-terracota hover:underline"
              >
                hola@siemprepresente.pe
              </a>
            </address>
            <p>
              Si eres consumidor y tu reclamo no ha sido resuelto satisfactoriamente, puedes
              acudir al INDECOPI en www.indecopi.gob.pe o llamar al 224-7777.
            </p>
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
