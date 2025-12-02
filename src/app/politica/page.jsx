"use client";
import { useState } from "react";
import { Michroma, Space_Grotesk } from "next/font/google";
import { ChevronDown, Shield, FileText, Lock } from "lucide-react";

const michroma = Michroma({ subsets: ["latin"], weight: "400", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "600", "700"], display: "swap" });

export default function PoliticaPage() {
  const [activeTab, setActiveTab] = useState("privacidad");

  const tabs = [
    { id: "privacidad", label: "Privacidad", icon: Shield },
    { id: "terminos", label: "Términos de Uso", icon: FileText },
    { id: "seguridad", label: "Seguridad", icon: Lock },
  ];

  return (
    <div className="min-h-screen w-full relative bg-white text-neutral-900">
      {/* Header */}
      <div className="max-w-5xl mx-auto px-6 py-16 lg:py-24">
        <div className="text-center mb-12">
          <h1 className={`text-4xl lg:text-6xl font-bold tracking-tight text-neutral-900 mb-6 ${spaceGrotesk.className}`}>
            <strong className="bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-text text-transparent">
              Políticas y Términos
            </strong>
          </h1>
          <p className="text-lg text-neutral-700 max-w-2xl mx-auto">
            Transparencia y seguridad en cada detalle de nuestro servicio.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/50"
                    : "bg-white border border-neutral-200 text-neutral-700 hover:border-blue-400 hover:text-blue-500"
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-8 lg:p-12">
          {activeTab === "privacidad" && (
            <div className="space-y-6">
              <h2 className={`text-3xl font-bold text-neutral-900 mb-4 ${spaceGrotesk.className}`}>
                Política de Privacidad y Protección de Datos Personales
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                En cumplimiento de la Ley N° 19.628 sobre Protección de la Vida Privada y la Ley N° 20.584 sobre Derechos 
                y Deberes de los Pacientes, Medify se compromete a proteger sus datos personales y datos de salud con los 
                más altos estándares de seguridad y confidencialidad.
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">Marco Legal</h3>
                  <p className="text-neutral-700">
                    Nuestro tratamiento de datos se rige por la Ley N° 19.628 sobre Protección de la Vida Privada, 
                    la Ley N° 20.584 que regula los derechos y deberes de los pacientes, y el Decreto N° 41 del 
                    Ministerio de Salud sobre ficha clínica electrónica.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">Datos Recopilados</h3>
                  <p className="text-neutral-700 mb-2">
                    Recopilamos únicamente los datos necesarios para la prestación de servicios de salud:
                  </p>
                  <ul className="list-disc list-inside text-neutral-700 space-y-1 ml-4">
                    <li>Datos de identificación personal (RUT, nombre, dirección, contacto)</li>
                    <li>Datos de salud (ficha clínica, diagnósticos, tratamientos, exámenes)</li>
                    <li>Datos de previsión y facturación (FONASA, ISAPRE, seguros)</li>
                    <li>Datos de uso de la plataforma (accesos, agendamiento)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">Finalidad del Tratamiento</h3>
                  <p className="text-neutral-700">
                    Sus datos personales y de salud se utilizan exclusivamente para: gestión de agendamiento de citas 
                    médicas, elaboración y mantención de ficha clínica electrónica, facturación y cobro de prestaciones, 
                    cumplimiento de obligaciones legales sanitarias, y mejora de la calidad de atención. Jamás compartimos 
                    información médica sin su consentimiento expreso o mandato legal.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">Conservación de Datos</h3>
                  <p className="text-neutral-700">
                    En cumplimiento del artículo 15 de la Ley N° 20.584, las fichas clínicas y registros médicos se 
                    conservan por un período mínimo de 15 años desde la última atención. Los datos administrativos se 
                    mantienen según los plazos legales tributarios y contables vigentes.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">Sus Derechos</h3>
                  <p className="text-neutral-700 mb-2">
                    De acuerdo a la legislación chilena, usted tiene derecho a:
                  </p>
                  <ul className="list-disc list-inside text-neutral-700 space-y-1 ml-4">
                    <li>Acceder a sus datos personales y de salud</li>
                    <li>Solicitar la rectificación de datos inexactos o desactualizados</li>
                    <li>Cancelar datos que hayan sido tratados incorrectamente</li>
                    <li>Oponerse al tratamiento de sus datos en casos específicos</li>
                    <li>Obtener copia de su ficha clínica electrónica</li>
                    <li>Conocer quién ha accedido a su información médica</li>
                  </ul>
                  <p className="text-neutral-700 mt-2">
                    Para ejercer estos derechos, puede contactarnos a través de contacto@medify.cl o nuestros 
                    canales oficiales de atención.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">Consentimiento Informado</h3>
                  <p className="text-neutral-700">
                    El tratamiento de sus datos de salud requiere su consentimiento libre, informado y específico, 
                    conforme a lo establecido en la Ley N° 20.584. Este consentimiento puede ser revocado en 
                    cualquier momento, salvo cuando exista obligación legal de conservar la información.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "terminos" && (
            <div className="space-y-6">
              <h2 className={`text-3xl font-bold text-neutral-900 mb-4 ${spaceGrotesk.className}`}>
                Términos y Condiciones de Uso
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                Al utilizar Medify, usted acepta los siguientes términos y condiciones que regulan el uso de nuestra 
                plataforma en conformidad con la legislación chilena vigente.
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">Naturaleza del Servicio</h3>
                  <p className="text-neutral-700">
                    Medify es una plataforma tecnológica que proporciona herramientas digitales de apoyo a la gestión 
                    clínica y administrativa de profesionales e instituciones de salud, incluyendo: sistema de agendamiento 
                    de citas médicas, ficha clínica electrónica conforme al Decreto N° 41/2012, gestión de pacientes y 
                    prestaciones, sistema de facturación y cobro, y herramientas de telemedicina. Medify NO es un prestador 
                    de servicios de salud ni sustituye la relación médico-paciente.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">Usuarios de la Plataforma</h3>
                  <p className="text-neutral-700 mb-2">
                    Pueden utilizar Medify:
                  </p>
                  <ul className="list-disc list-inside text-neutral-700 space-y-1 ml-4">
                    <li>Profesionales de la salud con título válido y registrado en la Superintendencia de Salud</li>
                    <li>Instituciones de salud debidamente autorizadas (clínicas, centros médicos, consultas)</li>
                    <li>Personal administrativo autorizado por los profesionales o instituciones</li>
                    <li>Pacientes con cuentas creadas para acceso a sus propios datos</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">Responsabilidades del Profesional de Salud</h3>
                  <p className="text-neutral-700 mb-2">
                    Los profesionales de salud que utilizan Medify se comprometen a:
                  </p>
                  <ul className="list-disc list-inside text-neutral-700 space-y-1 ml-4">
                    <li>Contar con título profesional vigente y registro en Superintendencia de Salud</li>
                    <li>Cumplir con el Código de Ética Profesional de su respectivo colegio profesional</li>
                    <li>Mantener el secreto profesional conforme al artículo 134 del Código Sanitario</li>
                    <li>Garantizar la veracidad y exactitud de la información clínica registrada</li>
                    <li>Obtener consentimiento informado de pacientes según Ley N° 20.584</li>
                    <li>Utilizar la plataforma exclusivamente para fines profesionales legítimos</li>
                    <li>Mantener la confidencialidad de sus credenciales de acceso</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">Responsabilidad Médica</h3>
                  <p className="text-neutral-700">
                    La responsabilidad por las decisiones clínicas, diagnósticos, tratamientos y atención médica recae 
                    exclusivamente en el profesional de salud tratante, no en Medify. Nuestra plataforma es una herramienta 
                    de apoyo administrativo y de registro, sin intervención en el acto médico. Los profesionales mantienen 
                    total autonomía e independencia profesional en el ejercicio de su práctica clínica.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">Uso Permitido</h3>
                  <p className="text-neutral-700 mb-2">
                    Se prohíbe expresamente:
                  </p>
                  <ul className="list-disc list-inside text-neutral-700 space-y-1 ml-4">
                    <li>Compartir credenciales de acceso con terceros no autorizados</li>
                    <li>Acceder a información de pacientes sin relación terapéutica justificada</li>
                    <li>Modificar, alterar o falsificar registros clínicos</li>
                    <li>Utilizar la plataforma para fines distintos a la atención de salud</li>
                    <li>Realizar ingeniería inversa, descompilar o intentar acceder al código fuente</li>
                    <li>Introducir malware, virus o código malicioso</li>
                    <li>Realizar actividades que comprometan la seguridad del sistema</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">Propiedad Intelectual</h3>
                  <p className="text-neutral-700">
                    Medify, su código fuente, diseño, interfaz, logotipos y contenidos están protegidos por derechos de 
                    autor y propiedad intelectual. Los datos clínicos ingresados por los profesionales son de su propiedad, 
                    manteniendo Medify solo derechos de almacenamiento y procesamiento conforme a estos términos. Los 
                    pacientes conservan propiedad sobre sus datos personales y de salud.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">Facturación y Pagos</h3>
                  <p className="text-neutral-700">
                    Los servicios de Medify se facturan conforme al plan contratado. Los profesionales/instituciones son 
                    responsables de emitir boletas o facturas a sus pacientes conforme a la normativa tributaria chilena 
                    (Ley sobre Impuesto a las Ventas y Servicios). Medify puede facilitar la emisión de documentos 
                    tributarios electrónicos en convenio con proveedores certificados por el SII.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">Suspensión y Terminación</h3>
                  <p className="text-neutral-700">
                    Medify se reserva el derecho de suspender o terminar el acceso a la plataforma en caso de: 
                    incumplimiento de estos términos, uso fraudulento o ilegal, riesgo para la seguridad del sistema, 
                    falta de pago de los servicios contratados, o solicitud de la autoridad sanitaria competente. 
                    En caso de terminación, se garantiza acceso a los datos clínicos por el plazo legal de 15 años.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">Limitaciones de Responsabilidad</h3>
                  <p className="text-neutral-700">
                    Medify no se hace responsable por: decisiones clínicas tomadas por profesionales de salud, 
                    pérdida de ingresos o daños indirectos derivados del uso de la plataforma, interrupciones del 
                    servicio por mantenimiento programado (notificado con anticipación), fallas atribuibles a 
                    problemas de conectividad del usuario, o uso indebido de la plataforma por parte de usuarios. 
                    Mantenemos disponibilidad de servicio superior al 99.5% anual.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">Ley Aplicable y Jurisdicción</h3>
                  <p className="text-neutral-700">
                    Estos términos se rigen por las leyes de la República de Chile. Cualquier controversia será sometida 
                    a la jurisdicción de los tribunales ordinarios de justicia de Santiago, renunciando las partes a 
                    cualquier otro fuero que pudiere corresponderles.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">Modificaciones</h3>
                  <p className="text-neutral-700">
                    Medify puede modificar estos términos previa notificación con 30 días de anticipación. El uso 
                    continuado de la plataforma después de la fecha de vigencia de las modificaciones constituye 
                    aceptación de los nuevos términos.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "seguridad" && (
            <div className="space-y-6">
              <h2 className={`text-3xl font-bold text-neutral-900 mb-4 ${spaceGrotesk.className}`}>
                Políticas de Seguridad de la Información
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                En cumplimiento del Decreto N° 41 del MINSAL sobre Fichas Clínicas Electrónicas y la normativa de 
                seguridad de datos de salud, implementamos medidas técnicas, físicas y administrativas para proteger 
                su información médica y personal.
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">Medidas Técnicas de Seguridad</h3>
                  <p className="text-neutral-700 mb-2">
                    Implementamos las siguientes medidas de seguridad informática:
                  </p>
                  <ul className="list-disc list-inside text-neutral-700 space-y-1 ml-4">
                    <li>Cifrado de datos en tránsito mediante SSL/TLS 1.3</li>
                    <li>Cifrado de datos en reposo con algoritmos AES-256</li>
                    <li>Autenticación multifactor para acceso al sistema</li>
                    <li>Control de acceso basado en roles (RBAC)</li>
                    <li>Registro de auditoría de todos los accesos a fichas clínicas</li>
                    <li>Firewalls y sistemas de detección de intrusiones (IDS/IPS)</li>
                    <li>Actualizaciones de seguridad automáticas</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">Ficha Clínica Electrónica</h3>
                  <p className="text-neutral-700">
                    Nuestra ficha clínica electrónica cumple con los requisitos del Decreto N° 41/2012 del MINSAL, 
                    garantizando: integridad mediante firma electrónica avanzada, trazabilidad completa de todos los 
                    accesos y modificaciones, confidencialidad mediante cifrado y control de acceso, disponibilidad 
                    con respaldos automáticos cada 24 horas, y autenticidad con identificación única de cada profesional.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">Respaldo y Recuperación</h3>
                  <p className="text-neutral-700">
                    Mantenemos copias de seguridad automatizadas diarias de toda la información, almacenadas en centros 
                    de datos con certificación ISO 27001 ubicados en Chile. Los respaldos se conservan por el plazo 
                    legal mínimo de 15 años. Contamos con planes de continuidad operacional y recuperación ante desastres 
                    (DR/BCP) probados regularmente.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">Secreto Profesional</h3>
                  <p className="text-neutral-700">
                    Todo el personal que tiene acceso a datos de salud está sujeto a obligaciones de confidencialidad 
                    médica según lo establecido en el Código Sanitario (artículo 134) y la Ley N° 20.584. Nuestros 
                    colaboradores firman acuerdos de confidencialidad y reciben capacitación periódica en protección 
                    de datos de salud.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">Auditorías y Certificaciones</h3>
                  <p className="text-neutral-700">
                    Realizamos auditorías de seguridad trimestrales, tanto internas como por terceros certificados. 
                    Todos los accesos a fichas clínicas quedan registrados con fecha, hora, usuario y tipo de acción, 
                    conforme a la normativa vigente. Los pacientes pueden solicitar el registro de accesos a su ficha 
                    clínica en cualquier momento.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">Notificación de Incidentes</h3>
                  <p className="text-neutral-700">
                    En caso de vulneración de seguridad que afecte datos personales o de salud, notificaremos a los 
                    titulares afectados dentro de las 72 horas siguientes, informando la naturaleza del incidente, 
                    los datos comprometidos y las medidas adoptadas, conforme a las mejores prácticas internacionales 
                    y en coordinación con la autoridad sanitaria cuando corresponda.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">Hosting y Localización de Datos</h3>
                  <p className="text-neutral-700">
                    Todos los datos de salud se almacenan en servidores ubicados físicamente en Chile, cumpliendo con 
                    las recomendaciones de la Superintendencia de Salud sobre soberanía de datos médicos. No transferimos 
                    información de salud fuera del territorio nacional sin autorización expresa del titular.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center">
          <p className="text-neutral-700 mb-4">
            ¿Tienes preguntas sobre nuestras políticas?
          </p>
          <a
            href="/contacto"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-500/50 transition-all"
          >
            Contáctanos
          </a>
        </div>
      </div>
    </div>
  );
}
