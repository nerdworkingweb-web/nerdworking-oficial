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
    title: "Términos de Servicio — Nerdworking",
    description:
      "Términos y condiciones de uso del sitio web y servicios de Nerdworking, medio B2B de tecnología en Latinoamérica fundado por Manuel Vargas.",
    path: "/terminos",
  });
}

export default async function TerminosPage() {
  const site = await getSiteConfig();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", url: site.url },
          { name: "Términos de Servicio", url: `${site.url}/terminos` },
        ])}
      />

      <Container as="section" className="py-16 md:py-24">
        <AnimatedSection>
          <SectionHeading
            label="Legal"
            title="Términos de Servicio"
            description="Estos términos regulan el acceso y uso del sitio web de Nerdworking, su contenido editorial y los servicios comerciales B2B asociados a la plataforma."
          />
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <LegalDocument lastUpdated={LAST_UPDATED}>
            <LegalSection title="1. Aceptación de los términos">
              <p>
                Al acceder o utilizar el sitio web de{" "}
                <strong>{site.name}</strong> (en adelante, el &quot;Sitio&quot;),
                disponible en{" "}
                <a href={site.url} className="underline hover:text-neutral-900">
                  {site.url}
                </a>
                , aceptas estos Términos de Servicio. Si no estás de acuerdo con
                alguna disposición, debes abstenerse de utilizar el Sitio.
              </p>
              <p>
                Estos términos constituyen un acuerdo legal vinculante entre tú
                (el &quot;Usuario&quot;) y Nerdworking.
              </p>
            </LegalSection>

            <LegalSection title="2. Descripción del servicio">
              <p>
                Nerdworking es un medio digital B2B especializado en tecnología,
                negocios e innovación en Latinoamérica. A través del Sitio
                ofrecemos:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Contenido editorial: noticias, análisis y artículos.</li>
                <li>Podcast con entrevistas a líderes de tecnología y negocios.</li>
                <li>
                  Servicios comerciales B2B: generación de oportunidades,
                  difusión de marcas, publicidad, podcast corporativo y
                  conexión con tomadores de decisión.
                </li>
                <li>Formularios de contacto para consultas comerciales y editoriales.</li>
              </ul>
              <p>
                Nerdworking se reserva el derecho de modificar, suspender o
                discontinuar cualquier aspecto del Sitio o de sus servicios, con
                o sin previo aviso.
              </p>
            </LegalSection>

            <LegalSection title="3. Uso permitido">
              <p>Al utilizar el Sitio, te comprometes a:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Usarlo únicamente con fines lícitos y profesionales.</li>
                <li>
                  No reproducir, distribuir o explotar comercialmente el
                  contenido sin autorización previa por escrito.
                </li>
                <li>
                  No intentar acceder sin autorización a sistemas, cuentas o
                  datos de Nerdworking o de otros usuarios.
                </li>
                <li>
                  No utilizar el Sitio para enviar spam, malware o contenido
                  difamatorio, fraudulento o ilegal.
                </li>
                <li>
                  Proporcionar información veraz y actualizada en formularios de
                  contacto.
                </li>
              </ul>
            </LegalSection>

            <LegalSection title="4. Naturaleza del contenido editorial">
              <p>
                El contenido publicado en Nerdworking — incluyendo noticias,
                artículos, entrevistas de podcast y opiniones de invitados — tiene
                fines informativos y educativos. No constituye asesoría legal,
                financiera, tecnológica ni de inversión.
              </p>
              <p>
                Las opiniones expresadas por autores, invitados o colaboradores
                son de su exclusiva responsabilidad y no necesariamente reflejan
                la posición de Nerdworking.
              </p>
              <p>
                Nerdworking no garantiza la exactitud, integridad o actualidad
                del contenido en todo momento, aunque procuramos mantener
                estándares editoriales rigurosos.
              </p>
            </LegalSection>

            <LegalSection title="5. Propiedad intelectual">
              <p>
                Todo el contenido del Sitio — incluyendo textos, diseño, logotipos,
                marcas, gráficos, audio, video y código — es propiedad de
                Nerdworking o de sus licenciantes, y está protegido por las leyes
                de propiedad intelectual aplicables.
              </p>
              <p>
                Se concede una licencia limitada, no exclusiva e intransferible
                para acceder y visualizar el contenido con fines personales o
                profesionales internos. Queda prohibida la reproducción,
                modificación, distribución o creación de obras derivadas sin
                consentimiento previo por escrito.
              </p>
              <p>
                Si deseas republicar, citar o utilizar contenido de Nerdworking,
                contáctanos en{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="underline hover:text-neutral-900"
                >
                  {site.email}
                </a>
                .
              </p>
            </LegalSection>

            <LegalSection title="6. Servicios comerciales B2B">
              <p>
                Los servicios comerciales ofrecidos por Nerdworking (publicidad,
                patrocinios, generación de oportunidades B2B, podcast corporativo,
                etc.) se rigen por acuerdos comerciales específicos que se
                formalizan por separado de estos Términos de Servicio.
              </p>
              <p>
                La información sobre servicios publicada en el Sitio es
                referencial y no constituye una oferta vinculante hasta que se
                acuerde por escrito entre las partes.
              </p>
              <p>
                Nerdworking se reserva el derecho de aceptar o rechazar
                solicitudes comerciales, de patrocinio o de participación en el
                podcast a su entera discreción editorial y comercial.
              </p>
            </LegalSection>

            <LegalSection title="7. Enlaces a terceros">
              <p>
                El Sitio puede contener enlaces a sitios web, plataformas o
                recursos de terceros (YouTube, LinkedIn, sitios de auspiciadores,
                etc.). Nerdworking no controla ni es responsable del contenido,
                políticas o prácticas de esos sitios.
              </p>
              <p>
                El acceso a enlaces externos es bajo tu propio riesgo. Te
                recomendamos revisar los términos y políticas de privacidad de
                cada sitio de terceros.
              </p>
            </LegalSection>

            <LegalSection title="8. Exclusión de garantías">
              <p>
                El Sitio y su contenido se proporcionan &quot;tal cual&quot; y
                &quot;según disponibilidad&quot;, sin garantías de ningún tipo,
                expresas o implícitas, incluyendo garantías de comerciabilidad,
                idoneidad para un propósito particular o no infracción.
              </p>
              <p>
                No garantizamos que el Sitio esté libre de errores, interrupciones,
                virus u otros componentes dañinos, aunque adoptamos medidas
                razonables para mantener su operación y seguridad.
              </p>
            </LegalSection>

            <LegalSection title="9. Limitación de responsabilidad">
              <p>
                En la máxima medida permitida por la legislación aplicable,
                Nerdworking, sus directores, empleados, colaboradores y
                afiliados no serán responsables por daños directos, indirectos,
                incidentales, especiales, consecuentes o punitivos derivados del
                uso o imposibilidad de uso del Sitio o de su contenido.
              </p>
              <p>
                Esto incluye, sin limitación, pérdida de datos, ingresos,
                oportunidades comerciales o reputación, incluso si Nerdworking
                ha sido advertido de la posibilidad de dichos daños.
              </p>
            </LegalSection>

            <LegalSection title="10. Indemnización">
              <p>
                Aceptas indemnizar y mantener indemne a Nerdworking frente a
                cualquier reclamo, daño, pérdida o gasto (incluyendo honorarios
                legales razonables) derivados de tu uso del Sitio, del
                incumplimiento de estos Términos o de la violación de derechos
                de terceros.
              </p>
            </LegalSection>

            <LegalSection title="11. Privacidad">
              <p>
                El tratamiento de datos personales se rige por nuestra{" "}
                <a
                  href="/privacidad"
                  className="underline hover:text-neutral-900"
                >
                  Política de Privacidad
                </a>
                , la cual forma parte integrante de estos Términos de Servicio.
              </p>
            </LegalSection>

            <LegalSection title="12. Modificaciones">
              <p>
                Nerdworking puede modificar estos Términos de Servicio en
                cualquier momento. Las modificaciones entrarán en vigor al ser
                publicadas en esta página con la fecha de actualización
                correspondiente.
              </p>
              <p>
                El uso continuado del Sitio tras la publicación de cambios
                constituye tu aceptación de los términos revisados. Si no
                aceptas los cambios, debes dejar de utilizar el Sitio.
              </p>
            </LegalSection>

            <LegalSection title="13. Terminación">
              <p>
                Podemos suspender o restringir tu acceso al Sitio, sin previo
                aviso, si consideramos que has incumplido estos Términos o que
                tu conducta puede causar perjuicio a Nerdworking o a terceros.
              </p>
            </LegalSection>

            <LegalSection title="14. Ley aplicable y jurisdicción">
              <p>
                Estos Términos de Servicio se regirán e interpretarán conforme a
                las leyes aplicables en la jurisdicción desde la cual Nerdworking
                opera, sin perjuicio de las normas imperativas de protección al
                consumidor o de datos personales que pudieran aplicarte según tu
                país de residencia en Latinoamérica.
              </p>
              <p>
                Cualquier controversia derivada de estos Términos se someterá a
                los tribunales competentes del domicilio del responsable de
                Nerdworking, salvo disposición legal imperativa en contrario.
              </p>
              <p>
                Para consultas sobre jurisdicción o aspectos legales específicos,
                escríbenos a{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="underline hover:text-neutral-900"
                >
                  {site.email}
                </a>
                .
              </p>
            </LegalSection>

            <LegalSection title="15. Disposiciones generales">
              <p>
                Si alguna disposición de estos Términos se considera inválida o
                inaplicable, las demás disposiciones permanecerán en pleno vigor.
              </p>
              <p>
                La falta de ejercicio por parte de Nerdworking de cualquier
                derecho previsto en estos Términos no constituye una renuncia a
                dicho derecho.
              </p>
              <p>
                Estos Términos, junto con la Política de Privacidad y cualquier
                acuerdo comercial específico, constituyen el acuerdo completo
                entre tú y Nerdworking respecto del uso del Sitio.
              </p>
            </LegalSection>

            <LegalSection title="16. Contacto">
              <p>
                Para consultas sobre estos Términos de Servicio:
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
