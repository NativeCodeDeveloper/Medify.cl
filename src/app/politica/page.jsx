"use client";
import { useState } from "react";
import Link from "next/link";
import { Shield, FileText, Lock } from "lucide-react";

/* Políticas de Medify. Describen lo que la plataforma hace hoy: directorio de profesionales y centros
 * (no ficha clínica ni agendamiento propio). Si cambia el producto — pagos, nuevos proveedores,
 * datos que se guardan — hay que actualizar este texto y la fecha. */
const ACTUALIZADO = "26 de octubre de 2026";
const CONTACTO = "ventas@medify.cl";

const TABS = [
  { id: "privacidad", label: "Privacidad", icon: Shield },
  { id: "terminos", label: "Términos de uso", icon: FileText },
  { id: "seguridad", label: "Seguridad", icon: Lock },
];

function Seccion({ titulo, children }) {
  return (
    <section className="border-t border-[#e5e5ea] pt-7 first:border-t-0 first:pt-0">
      <h3 className="mb-3 font-semibold text-[#1d1d1f]" style={{ fontSize: "17px", letterSpacing: "-0.01em" }}>{titulo}</h3>
      <div className="space-y-3 font-light leading-relaxed text-[#424245]" style={{ fontSize: "15px" }}>{children}</div>
    </section>
  );
}

function Lista({ items }) {
  return (
    <ul className="space-y-2">
      {items.map((t) => (
        <li key={t} className="flex gap-3">
          <span className="mt-[9px] h-1 w-1 flex-shrink-0 rounded-full bg-[#86868b]" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

function Privacidad() {
  return (
    <>
      <Seccion titulo="Quiénes somos">
        <p>
          Medify es un directorio en línea que permite a pacientes encontrar profesionales de la salud, clínicas y
          centros médicos en Chile. Medify no presta atención de salud, no administra fichas clínicas y no gestiona
          la reserva de horas: el agendamiento ocurre directamente con cada profesional, a través de su propia agenda
          o de su WhatsApp.
        </p>
        <p>
          Tratamos los datos personales conforme a la Ley N° 19.628 sobre Protección de la Vida Privada y, a medida
          que entre en vigencia, a la Ley N° 21.719 sobre Protección de Datos Personales.
        </p>
      </Seccion>

      <Seccion titulo="Qué datos recopilamos">
        <p><strong className="font-medium text-[#1d1d1f]">Profesionales y centros que se registran:</strong></p>
        <Lista items={[
          "Nombre o razón social, RUT y correo electrónico.",
          "Especialidad o categoría, región, comuna y dirección de la consulta (opcional para quienes atienden solo online).",
          "WhatsApp, teléfono, link de agenda y redes sociales que decidan informar.",
          "Presentación, servicios, valores, foto de perfil o logo.",
        ]} />
        <p>
          La contraseña la administra nuestro proveedor de autenticación de forma cifrada. Medify no la ve ni la almacena.
        </p>
        <p><strong className="font-medium text-[#1d1d1f]">Pacientes que dejan una reseña:</strong> el nombre que escriban, la calificación y el comentario.</p>
        <p>
          <strong className="font-medium text-[#1d1d1f]">No recopilamos datos de salud.</strong> Medify no solicita ni guarda
          diagnósticos, antecedentes clínicos ni información de previsión.
        </p>
      </Seccion>

      <Seccion titulo="Para qué los usamos">
        <Lista items={[
          "Publicar el perfil de cada profesional o centro, una vez revisado por nuestro equipo.",
          "Permitir que los pacientes encuentren y contacten al profesional que elijan.",
          "Enviar correos del servicio: confirmación de registro y resultado de la revisión del perfil.",
          "Moderar reseñas y prevenir usos abusivos o fraudulentos de la plataforma.",
        ]} />
        <p>No vendemos ni cedemos datos personales para publicidad.</p>
      </Seccion>

      <Seccion titulo="Qué información es pública">
        <p>
          Del perfil aprobado se muestran: nombre, especialidad, foto, presentación, servicios y valores, comuna,
          dirección de la consulta, WhatsApp, link de agenda, redes sociales y reseñas. El RUT y el correo de acceso
          no se publican.
        </p>
      </Seccion>

      <Seccion titulo="Proveedores que nos ayudan a operar">
        <p>Para funcionar usamos servicios de terceros que tratan datos solo por encargo de Medify:</p>
        <Lista items={[
          "Clerk: autenticación y resguardo de contraseñas.",
          "Cloudflare: almacenamiento y entrega de fotos de perfil y logos.",
          "Brevo: envío de correos del servicio.",
          "Vercel: publicación del sitio web.",
        ]} />
        <p>Algunos de estos proveedores procesan datos fuera de Chile, con sus propias medidas de seguridad.</p>
      </Seccion>

      <Seccion titulo="Cookies">
        <p>
          Usamos únicamente lo necesario para mantener tu sesión iniciada en el panel de profesionales o de
          administración. No usamos cookies de publicidad ni herramientas de seguimiento de terceros.
        </p>
      </Seccion>

      <Seccion titulo="Cuánto tiempo los guardamos">
        <p>
          Mientras la cuenta esté activa. Si eliminas tu cuenta desde tu panel, borramos de inmediato tu perfil, tu
          foto y tu acceso; tu perfil deja de mostrarse y ya no podrás iniciar sesión.
        </p>
      </Seccion>

      <Seccion titulo="Tus derechos">
        <p>Puedes acceder, rectificar, eliminar u oponerte al tratamiento de tus datos:</p>
        <Lista items={[
          "Profesionales y centros: editan o eliminan su información directamente desde su panel en Medify.",
          `Cualquier persona, incluidos pacientes que dejaron una reseña: escribiendo a ${CONTACTO}.`,
        ]} />
        <p>Respondemos dentro de los plazos que establece la ley.</p>
      </Seccion>
    </>
  );
}

function Terminos() {
  return (
    <>
      <Seccion titulo="Qué es Medify">
        <p>
          Medify es un directorio que da visibilidad a profesionales de la salud, clínicas y centros médicos.
          No es un prestador de salud, no participa en la atención y no cobra ni intermedia el pago de las consultas.
        </p>
        <p>
          Medify no garantiza un número de pacientes, consultas ni reservas. La visibilidad de cada perfil depende,
          entre otros factores, de las búsquedas que hagan los pacientes.
        </p>
      </Seccion>

      <Seccion titulo="Registro y publicación">
        <Lista items={[
          "El registro es gratuito. Si en el futuro se incorporan planes de pago, se informarán antes y no se cobrará nada sin tu aceptación.",
          "Cada perfil es revisado por nuestro equipo antes de publicarse. Medify puede solicitar antecedentes, rechazar una solicitud o desactivar un perfil que no cumpla estos términos.",
          "Puedes eliminar tu cuenta cuando quieras desde tu panel.",
        ]} />
      </Seccion>

      <Seccion titulo="Responsabilidades del profesional o centro">
        <Lista items={[
          "Entregar información veraz y mantenerla actualizada: identidad, especialidad, dirección, servicios y valores.",
          "Contar con las habilitaciones legales para ejercer, incluida su inscripción en el Registro Nacional de Prestadores Individuales de Salud cuando corresponda.",
          "Ser titular o tener autorización para usar la foto, el logo y los textos que publique.",
          "Responder de la atención que preste a sus pacientes, que es de su exclusiva responsabilidad.",
        ]} />
      </Seccion>

      <Seccion titulo="Reseñas">
        <p>
          Las reseñas deben reflejar experiencias reales. No se permiten contenidos ofensivos, discriminatorios,
          falsos, publicitarios ni que revelen datos de salud de terceros. Medify puede ocultar las reseñas que no
          cumplan estas reglas.
        </p>
      </Seccion>

      <Seccion titulo="Uso no permitido">
        <Lista items={[
          "Suplantar a otra persona o institución.",
          "Publicar información engañosa sobre servicios, títulos o resultados.",
          "Intentar acceder a cuentas ajenas o vulnerar la seguridad de la plataforma.",
          "Extraer datos de otros perfiles de forma automatizada.",
        ]} />
      </Seccion>

      <Seccion titulo="Responsabilidad de Medify">
        <p>
          Medify procura que la plataforma funcione de forma continua y segura, pero no responde por la atención de
          salud que presten los profesionales, ni por acuerdos, cobros o reservas que se realicen directamente entre
          ellos y los pacientes.
        </p>
      </Seccion>

      <Seccion titulo="Ley aplicable y cambios">
        <p>
          Estos términos se rigen por la ley chilena. Si los modificamos, publicaremos la nueva versión en esta página
          con su fecha de actualización y, si el cambio es relevante, lo avisaremos por correo a las cuentas registradas.
        </p>
      </Seccion>
    </>
  );
}

function Seguridad() {
  return (
    <>
      <Seccion titulo="Cómo protegemos la información">
        <Lista items={[
          "Toda la comunicación con Medify viaja cifrada (HTTPS).",
          "Las contraseñas se resguardan cifradas en nuestro proveedor de autenticación, exigen al menos 15 caracteres y se rechazan las que aparecen en filtraciones conocidas.",
          "Las sesiones expiran automáticamente y se invalidan de inmediato si una cuenta se desactiva o se elimina.",
          "Limitamos los intentos de inicio de sesión para frenar ataques de fuerza bruta.",
          "El panel de administración solo es accesible para el equipo autorizado de Medify.",
          "Los datos que ingresas se validan antes de guardarse, y las imágenes se verifican antes de publicarse.",
        ]} />
      </Seccion>

      <Seccion titulo="Acceso a los datos">
        <p>
          Solo el equipo de Medify que lo necesita para operar la plataforma accede a la información no pública,
          como el RUT y el correo de acceso.
        </p>
      </Seccion>

      <Seccion titulo="Si ocurre un incidente">
        <p>
          Si detectamos un incidente de seguridad que afecte datos personales, lo investigaremos, tomaremos las
          medidas para contenerlo y avisaremos a las personas afectadas y a las autoridades cuando la ley lo exija.
        </p>
      </Seccion>

      <Seccion titulo="Recomendaciones">
        <Lista items={[
          "Usa una contraseña única para Medify, que no uses en otros sitios.",
          "Cierra sesión si usas un computador compartido.",
          `Si notas actividad extraña en tu cuenta, escríbenos de inmediato a ${CONTACTO}.`,
        ]} />
      </Seccion>
    </>
  );
}

export default function PoliticaPage() {
  const [tab, setTab] = useState("privacidad");
  const Contenido = { privacidad: Privacidad, terminos: Terminos, seguridad: Seguridad }[tab];
  const titulo = {
    privacidad: "Política de privacidad",
    terminos: "Términos de uso",
    seguridad: "Seguridad",
  }[tab];

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <div className="mx-auto max-w-[860px] px-5 pb-20 pt-16 sm:px-8 sm:pt-20">

        <div className="mb-10 text-center">
          <p className="mb-3 font-semibold uppercase text-[#6e6e73]" style={{ fontSize: "12px", letterSpacing: "0.08em" }}>
            Legal
          </p>
          <h1 className="font-semibold text-[#1d1d1f]" style={{ fontSize: "clamp(2rem,5vw,3rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}>
            Políticas y términos
          </h1>
          <p className="mx-auto mt-4 max-w-[520px] font-light text-[#6e6e73]" style={{ fontSize: "17px" }}>
            Qué datos usamos, para qué y cómo los protegemos. Sin letra chica.
          </p>
        </div>

        {/* Control segmentado */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-full bg-[#e8e8ed] p-1" role="tablist">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button key={id} role="tab" aria-selected={tab === id} onClick={() => setTab(id)}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 transition-all sm:px-5"
                style={{
                  fontSize: "14px",
                  fontWeight: tab === id ? 500 : 400,
                  color: tab === id ? "#1d1d1f" : "#6e6e73",
                  background: tab === id ? "#ffffff" : "transparent",
                  boxShadow: tab === id ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                }}>
                <Icon size={15} strokeWidth={1.8} />
                <span className={tab === id ? "" : "hidden sm:inline"}>{label}</span>
              </button>
            ))}
          </div>
        </div>

        <article className="rounded-3xl bg-white p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:p-12">
          <h2 className="font-semibold text-[#1d1d1f]" style={{ fontSize: "28px", letterSpacing: "-0.02em" }}>{titulo}</h2>
          <p className="mb-9 mt-1 text-[#86868b]" style={{ fontSize: "13px" }}>Última actualización: {ACTUALIZADO}</p>
          <div className="space-y-7">
            <Contenido />
          </div>
        </article>

        <div className="mt-10 rounded-3xl bg-white p-7 text-center sm:p-9">
          <p className="font-semibold text-[#1d1d1f]" style={{ fontSize: "17px" }}>¿Tienes dudas sobre tus datos?</p>
          <p className="mt-1 font-light text-[#6e6e73]" style={{ fontSize: "15px" }}>
            Escríbenos y te respondemos personalmente.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <a href={`mailto:${CONTACTO}`}
              className="rounded-full px-6 py-2.5 text-white transition-opacity hover:opacity-90"
              style={{ fontSize: "14px", background: "#00C853" }}>
              {CONTACTO}
            </a>
            <Link href="/contacto"
              className="rounded-full border border-[#d2d2d7] px-6 py-2.5 text-[#1d1d1f] transition-colors hover:border-[#1d1d1f]"
              style={{ fontSize: "14px" }}>
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
