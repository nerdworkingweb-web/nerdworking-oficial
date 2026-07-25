import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { LegalDocument, LegalSection } from "@/components/legal/LegalDocument";
import { JsonLd } from "@/components/seo/JsonLd";
import { getSiteConfig } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

const LAST_UPDATED = "5 de julio de 2026";

export async function generateMetadata() {
  return createPageMetadata({
    title: "Política de Privacidad — Nerdworking",
    description:
      "Política de privacidad de Nerdworking. Cómo recopilamos, usamos y protegemos datos personales en el medio B2B de tecnología fundado por Manuel Vargas.",
    path: "/privacidad",
  });
}

export default async function PrivacidadPage() {
  const site = await getSiteConfig();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", url: site.url },
          { name: "Política de Privacidad", url: `${site.url}/privacidad` },
        ])}
      />

      <Container as="section" className="py-16 md:py-24">
        <AnimatedSection>
          <SectionHeading
            label="Legal"
            title="Política de Privacidad"
            description="En Nerdworking respetamos tu privacidad. Esta política describe cómo tratamos los datos personales de quienes visitan nuestro sitio, consumen nuestro contenido o se ponen en contacto con nosotros."
          />
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <LegalDocument lastUpdated={LAST_UPDATED}>
            <LegalSection title="1. Responsable del tratamiento">
              <p>
                El responsable del tratamiento de tus datos personales es{" "}
                <strong>{site.name}</strong> (en adelante, &quot;Nerdworking&quot;,
                &quot;nosotros&quot; o &quot;el Sitio&quot;), operador del medio
                digital B2B de tecnología disponible en{" "}
                <a href={site.url} className="underline hover:text-neutral-900">
                  {site.url}
                </a>
                .
              </p>
              <p>
                Para cualquier consulta relacionada con privacidad puedes
                escribirnos a{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="underline hover:text-neutral-900"
                >
                  {site.email}
                </a>
                .
              </p>
            </LegalSection>

            <LegalSection title="2. Ámbito de aplicación">
              <p>
                Esta Política de Privacidad aplica a los datos personales
                recopilados a través del sitio web de Nerdworking, incluyendo
                formularios de contacto, suscripciones, interacciones con
                contenido editorial, podcast, noticias y servicios comerciales
                B2B ofrecidos por la plataforma.
              </p>
              <p>
                No aplica a sitios web, plataformas o servicios de terceros a
                los que puedas acceder mediante enlaces desde nuestro Sitio
                (por ejemplo, YouTube, LinkedIn o sitios de auspiciadores).
              </p>
            </LegalSection>

            <LegalSection title="3. Datos que recopilamos">
              <p>Podemos recopilar las siguientes categorías de datos:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Datos de identificación y contacto:</strong> nombre,
                  correo electrónico, empresa, cargo y teléfono (cuando los
                  proporciones voluntariamente).
                </li>
                <li>
                  <strong>Datos de comunicación:</strong> mensajes enviados a
                  través de formularios de contacto, solicitudes comerciales,
                  postulaciones como invitado al podcast o consultas generales.
                </li>
                <li>
                  <strong>Datos técnicos y de navegación:</strong> dirección IP,
                  tipo de navegador, dispositivo, páginas visitadas, tiempo de
                  permanencia y fuente de referencia.
                </li>
                <li>
                  <strong>Datos de cookies y tecnologías similares:</strong>{" "}
                  según se describe en la sección correspondiente de esta
                  política.
                </li>
              </ul>
              <p>
                No recopilamos intencionalmente datos sensibles (salud, origen
                étnico, opiniones políticas, etc.) a través del Sitio.
              </p>
            </LegalSection>

            <LegalSection title="4. Finalidades del tratamiento">
              <p>Utilizamos tus datos personales para:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Responder consultas y solicitudes enviadas por formulario.</li>
                <li>
                  Gestionar relaciones comerciales B2B, oportunidades de
                  patrocinio, publicidad y servicios corporativos.
                </li>
                <li>
                  Evaluar y coordinar participaciones como invitado en el
                  podcast o en contenidos editoriales.
                </li>
                <li>
                  Enviar comunicaciones informativas o comerciales, cuando
                  exista base legal y, cuando corresponda, tu consentimiento.
                </li>
                <li>
                  Analizar el uso del Sitio para mejorar contenido, experiencia
                  de usuario y rendimiento.
                </li>
                <li>
                  Cumplir obligaciones legales, resolver disputas y proteger
                  nuestros derechos legítimos.
                </li>
              </ul>
            </LegalSection>

            <LegalSection title="5. Base legal">
              <p>El tratamiento de tus datos se fundamenta en:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Tu consentimiento,</strong> al enviar formularios o
                  aceptar cookies no esenciales.
                </li>
                <li>
                  <strong>La ejecución de medidas precontractuales o
                  contractuales,</strong> cuando nos contactas por servicios B2B.
                </li>
                <li>
                  <strong>El interés legítimo de Nerdworking,</strong> para
                  operar un medio digital, analizar audiencia y proteger la
                  plataforma.
                </li>
                <li>
                  <strong>El cumplimiento de obligaciones legales</strong>{" "}
                  aplicables.
                </li>
              </ul>
            </LegalSection>

            <LegalSection title="6. Cookies y tecnologías de seguimiento">
              <p>
                Utilizamos cookies y tecnologías similares para el funcionamiento
                del Sitio y, cuando estén configuradas, para analítica web
                (como Google Analytics o Google Tag Manager).
              </p>
              <p>Las cookies pueden ser:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Esenciales:</strong> necesarias para el funcionamiento
                  básico del Sitio.
                </li>
                <li>
                  <strong>Analíticas:</strong> nos ayudan a entender cómo los
                  visitantes interactúan con el contenido.
                </li>
                <li>
                  <strong>De marketing:</strong> utilizadas para medir campañas
                  publicitarias, cuando aplique.
                </li>
              </ul>
              <p>
                Puedes configurar tu navegador para rechazar cookies o eliminar
                las existentes. Ten en cuenta que desactivar ciertas cookies
                puede afectar la funcionalidad del Sitio.
              </p>
            </LegalSection>

            <LegalSection title="7. Compartición con terceros">
              <p>
                No vendemos tus datos personales. Podemos compartirlos con
                proveedores que nos prestan servicios necesarios para operar el
                Sitio, tales como:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Servicios de hosting y infraestructura web.</li>
                <li>Plataformas de envío de correo electrónico.</li>
                <li>Herramientas de analítica y medición (Google Analytics, GTM).</li>
                <li>Plataformas de video y redes sociales (YouTube, LinkedIn).</li>
              </ul>
              <p>
                Estos proveedores actúan como encargados del tratamiento y están
                obligados contractualmente a proteger tus datos conforme a
                estándares de seguridad razonables.
              </p>
              <p>
                También podemos divulgar información cuando sea requerido por
                ley o autoridad competente.
              </p>
            </LegalSection>

            <LegalSection title="8. Transferencias internacionales">
              <p>
                Dado que Nerdworking opera en Latinoamérica y utiliza proveedores
                tecnológicos globales, tus datos pueden ser transferidos y
                procesados fuera de tu país de residencia, incluyendo Estados
                Unidos y la Unión Europea.
              </p>
              <p>
                Cuando realicemos transferencias internacionales, adoptaremos
                las medidas adecuadas conforme a la legislación aplicable en
                materia de protección de datos.
              </p>
            </LegalSection>

            <LegalSection title="9. Conservación de datos">
              <p>
                Conservamos tus datos personales solo durante el tiempo necesario
                para cumplir las finalidades descritas en esta política, o según
                lo exija la legislación vigente.
              </p>
              <p>
                Los mensajes de contacto se conservan mientras sean relevantes
                para gestionar la relación comercial o editorial. Los datos
                analíticos pueden conservarse en forma agregada o anonimizada
                por períodos más prolongados.
              </p>
            </LegalSection>

            <LegalSection title="10. Tus derechos">
              <p>
                Conforme a la legislación de protección de datos aplicable en tu
                jurisdicción (incluyendo, según corresponda, la LFPDPPP en
                México, la Ley 19.628 en Chile, la Ley 1581 de 2012 en Colombia,
                el RGPD para residentes en la UE u otras normativas locales), puedes
                ejercer los siguientes derechos:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Acceder a tus datos personales.</li>
                <li>Rectificar datos inexactos o incompletos.</li>
                <li>Solicitar la eliminación de tus datos, cuando proceda.</li>
                <li>Oponerte u limitar ciertos tratamientos.</li>
                <li>Retirar tu consentimiento en cualquier momento.</li>
                <li>Solicitar la portabilidad de tus datos, cuando aplique.</li>
              </ul>
              <p>
                Para ejercer estos derechos, escríbenos a{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="underline hover:text-neutral-900"
                >
                  {site.email}
                </a>{" "}
                indicando tu solicitud y acreditando tu identidad. Responderemos
                en un plazo razonable conforme a la ley aplicable.
              </p>
            </LegalSection>

            <LegalSection title="11. Seguridad">
              <p>
                Implementamos medidas técnicas y organizativas razonables para
                proteger tus datos personales contra acceso no autorizado,
                pérdida, alteración o divulgación. Sin embargo, ningún sistema
                de transmisión o almacenamiento en internet es completamente
                seguro.
              </p>
            </LegalSection>

            <LegalSection title="12. Menores de edad">
              <p>
                El Sitio está dirigido a profesionales y tomadores de decisión
                en el ámbito empresarial y tecnológico. No recopilamos
                intencionalmente datos de menores de 18 años. Si detectamos que
                hemos recopilado datos de un menor sin consentimiento parental,
                procederemos a eliminarlos.
              </p>
            </LegalSection>

            <LegalSection title="13. Enlaces a terceros">
              <p>
                Nuestro contenido puede incluir enlaces a sitios de terceros,
                videos embebidos de YouTube o perfiles en redes sociales. No
                somos responsables de las prácticas de privacidad de esos sitios.
                Te recomendamos revisar sus políticas antes de proporcionar
                datos personales.
              </p>
            </LegalSection>

            <LegalSection title="14. Cambios a esta política">
              <p>
                Podemos actualizar esta Política de Privacidad periódicamente
                para reflejar cambios en nuestras prácticas, servicios o
                requisitos legales. Publicaremos la versión actualizada en esta
                página indicando la fecha de última modificación.
              </p>
              <p>
                Te recomendamos revisar esta política de forma regular. El uso
                continuado del Sitio tras la publicación de cambios implica tu
                aceptación de la política actualizada.
              </p>
            </LegalSection>

            <LegalSection title="15. Contacto">
              <p>
                Para preguntas, solicitudes o reclamos relacionados con esta
                Política de Privacidad, contáctanos en:
              </p>
              <p>
                <strong>{site.name}</strong>
                <br />
                Email:{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="underline hover:text-neutral-900"
                >
                  {site.email}
                </a>
              </p>
            </LegalSection>
          </LegalDocument>
        </AnimatedSection>
      </Container>
    </>
  );
}
