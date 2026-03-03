"use client";
import { Check, Shield } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const PLAN_GROUPS = {
    individual: {
        label: "Planes individuales",
        helperText: "Pensados para profesionales independientes que quieren digitalizar su consulta con rapidez.",
        plans: [
            {
                id: "esencial",
                name: "Plan Esencial",
                description:
                    "Perfecto para iniciar tu transformación digital. Todo lo esencial para administrar tu consulta profesionalmente, sin complicaciones.",
                price: "$0",
                priceNote: "Posicón y agenda",
                features: [
                    {
                        title: "Perfil profesional",
                        description: "Tu perfil profesional publicado en nuestro Marketplace.",
                    },
                    {
                        title: "Botón WhatsApp",
                        description: "Has que te contacten y agenden directo a tu WhatsApp",
                    },
                    {
                        title: "Información de contacto",
                        description: "Toda tu información o canales para que se contacten contigo.",
                    },
                    {
                        title: "Información académica y especialidades",
                        description: "Tu información en un solo lugar, tus pacientes podrán saber quien eres.",
                    },
                    {
                        title: "Acceso a redes sociales",
                        description: "Medify te publicará como profesional activo en sus redes sociales.",
                    },
                ],
                ctaLabel: "Comenzar gratis",
                ctaHref: "https://wa.me/56991749964?text=Quiero%20comenzar%20con%20el%20plan%20Esencial%20de%20Medify",
                glowClass: "bg-gradient-to-tr from-blue-400/15 via-teal-400/10 to-transparent",
                cardClass: "ring-1 ring-blue-100/50 bg-gradient-to-br from-white via-blue-50/30 to-white border border-blue-100/40",
                checkClass: "text-teal-600",
                ctaClass: "bg-slate-800 hover:bg-slate-900 shadow-[0_0_20px_rgba(15,23,42,0.25)] ring-slate-700/30",
                offsetClass: "mt-12",
            },
            {
                id: "profesional",
                name: "Plan Profesional - Individual",
                description:
                    "Crece con tu práctica médica",
                price: "$16.990",
                priceNote: "CLP/mes + IVA",
                features: [
                    {
                        title: "Todo lo del Plan Esencial",
                        description: "",
                    },
                    {
                        title: "Agendamiento Automático",
                        description: "",
                    },
                    {
                        title: "Calendario dígital.",
                        description: "",
                    },
                    {
                        title: "Ficha clínica general.",
                        description: "",
                    },
                    {
                        title: "Bloques de horarios por jornada.",
                        description: "",
                    },
                    {
                        title: "Pagos por medio de Mercado Pago.",
                        description: "",
                    },
                    {
                        title: "Gestión de información de pacientes.",
                        description: "",
                    },
                    {
                        title: "Edición de fichas clínicas.",
                        description: "",
                    },
                    {
                        title: "Estado de reservaciones.",
                        description: "",
                    },
                    {
                        title: "Envío de correos desde la paltaforma de seguimiento.",
                        description: "",
                    },
                    
                ],
                ctaLabel: "Solicitar consulta",
                ctaHref: "https://wa.me/56991749964?text=Quiero%20cotizar%20el%20plan%20Profesional%20de%20Medify",
                ctaNote: "Integración Sistema de emisión de Boletas y Facturación · $20.000 CLP adicional.",
                glowClass: "bg-gradient-to-tr from-blue-500/20 via-teal-500/15 to-transparent",
                cardClass: "ring-2 ring-blue-200/60 bg-gradient-to-br from-white via-teal-50/40 to-blue-50/30 border-2 border-blue-100/40",
                checkClass: "text-blue-600",
                ctaClass: "bg-blue-500 hover:bg-blue-600 shadow-[0_0_25px_rgba(59,130,246,0.8)] ring-blue-400/40",
                tag: "Más elegido",
            },
            {
                id: "avanzado",
                name: "Plan Avanzado",
                description:
                    "Solución potente para consultas que necesitan más control, automatización y soporte dedicado, opción hasta 3 profesionales en una sola cuenta.",
                price: "$26.990",
                priceNote: "CLP/mes + IVA",
                features: [
                    {
                        title: "Todo lo del Plan Profesional.",
                        description: "",
                    },
                    {
                        title: "Ficha Clínica Avanzada (Específica por profesional).",
                        description: "",
                    },
                    {
                        title: "Recordatorio de reserva automáticos por correo a tus pacientes(cada 6 y 12 horas).",
                        description: "",
                    },
                    {
                        title: "Recordatorios vía WhatsApp a tus pacientes.",
                        description: "",
                    },
                    {
                        title: "Control de pagos online y reportes en formato Excel y PDF.",
                        description: "",
                    },
                    {
                        title: "Saludo de Cumpleaños para tus pacientes.",
                        description: "",
                    },
                ],
                ctaLabel: "Solicitar demo avanzada",
                ctaHref: "https://wa.me/56991749964?text=Quiero%20conocer%20el%20plan%20Avanzado%20de%20Medify",
                glowClass: "bg-gradient-to-tr from-indigo-400/15 via-blue-400/10 to-transparent",
                cardClass: "ring-1 ring-indigo-100/50 bg-gradient-to-br from-white via-indigo-50/20 to-white border border-indigo-100/40",
                checkClass: "text-indigo-600",
                ctaClass: "bg-indigo-500 hover:bg-indigo-600 shadow-[0_0_25px_rgba(99,102,241,0.55)] ring-indigo-400/40",
                offsetClass: "mt-12",
            },
        ],
    },
    business: {
        label: "Planes Coorporaciones y clínicas",
        helperText: "Diseñados para equipos, centros médicos y clínicas que requieren operación multiusuario y mayor trazabilidad.",
        plans: [

            /* {
                id: "clinica-start",
                name: "Clínica Start",
                description: "Para centros pequeños que buscan centralizar agendas, fichas y cobros de su equipo médico.",
                price: "$59.900",
                priceNote: "CLP/mes + IVA",
                features: [
                    {
                        title: "Hasta 5 profesionales en una sola cuenta",
                        description: "Gestiona roles, turnos y especialidades desde un panel compartido.",
                    },
                    {
                        title: "Agenda centralizada con visión por sede",
                        description: "Controla disponibilidad y evita sobre-reservas entre miembros del equipo.",
                    },
                    {
                        title: "Panel de gestión administrativa",
                        description: "Revisa ingresos, atenciones y productividad por profesional en tiempo real.",
                    },
                ],
                ctaLabel: "Hablar con ventas",
                ctaHref: "https://wa.me/56977889900?text=Quiero%20cotizar%20el%20plan%20Cl%C3%ADnica%20Start%20de%20Medify",
                glowClass: "bg-gradient-to-tr from-blue-400/15 via-teal-400/10 to-transparent",
                cardClass: "ring-1 ring-blue-100/50 bg-gradient-to-br from-white via-blue-50/30 to-white border border-blue-100/40",
                checkClass: "text-teal-600",
                ctaClass: "bg-slate-800 hover:bg-slate-900 shadow-[0_0_20px_rgba(15,23,42,0.25)] ring-slate-700/30",
                offsetClass: "mt-12",
            }, */
            {
                id: "Plan C",
                name: "Clínica Coorporativo",
                description: "Ideal para clínicas en crecimiento + 3 profesionales en una sola cuenta, que requieren control financiero y trazabilidad clínica avanzada.",
                price: "$129.900",
                priceNote: "CLP/mes + IVA",
                features: [
                    {
                        title: "Flujos de trabajo por área clínica",
                        description: "Configura procesos para admisión, atención, seguimiento y facturación.",
                    },
                    {
                        title: "Integraciones administrativas y contables",
                        description: "Conecta cobros y conciliación para reducir errores operativos.",
                    },
                    {
                        title: "Reportería ejecutiva para toma de decisiones",
                        description: "Visualiza rendimiento por sede, especialidad, canal y profesional.",
                    },
                ],
                ctaLabel: "Solicitar asesoría",
                ctaHref: "https://wa.me/56991749964?text=Quiero%20cotizar%20el%20plan%20Cl%C3%ADnica%20Pro%20de%20Medify",
                glowClass: "bg-gradient-to-tr from-blue-500/20 via-teal-500/15 to-transparent",
                cardClass: "ring-2 ring-blue-200/60 bg-gradient-to-br from-white via-teal-50/40 to-blue-50/30 border-2 border-blue-100/40",
                checkClass: "text-blue-600",
                ctaClass: "bg-blue-500 hover:bg-blue-600 shadow-[0_0_25px_rgba(59,130,246,0.8)] ring-blue-400/40",
                tag: "Recomendado clínicas",
            },
            {
                id: "enterprise",
                name: "Enterprise",
                description: "Para instituciones con requerimientos de seguridad, personalización e implementación a gran escala.",
                price: "A medida",
                priceNote: "cotización personalizada",
                features: [
                    {
                        title: "Implementación personalizada por etapas",
                        description: "Parametrizamos módulos, permisos y estructura según tu operación.",
                    },
                    {
                        title: "Soporte prioritario y ejecutivo técnico dedicado",
                        description: "Acompañamiento directo para continuidad operacional y mejoras evolutivas.",
                    },
                    {
                        title: "SLA, seguridad reforzada y alta disponibilidad",
                        description: "Capas avanzadas de continuidad y cumplimiento para organizaciones exigentes.",
                    },
                ],
                ctaLabel: "Contactar a Medify",
                ctaHref: "https://wa.me/56991749964?text=Quiero%20informaci%C3%B3n%20del%20plan%20Enterprise%20de%20Medify",
                glowClass: "bg-gradient-to-tr from-indigo-400/15 via-blue-400/10 to-transparent",
                cardClass: "ring-1 ring-indigo-100/50 bg-gradient-to-br from-white via-indigo-50/20 to-white border border-indigo-100/40",
                checkClass: "text-indigo-600",
                ctaClass: "bg-indigo-500 hover:bg-indigo-600 shadow-[0_0_25px_rgba(99,102,241,0.55)] ring-indigo-400/40",
            },
        ],
    },
};

const Card = ({ children, className, delay = 0 }) => {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) {
            return;
        }

        el.classList.add("opacity-0", "translate-y-8");
        const timeoutId = window.setTimeout(() => {
            el.classList.remove("opacity-0", "translate-y-8");
            el.classList.add("opacity-100", "translate-y-0");
        }, 100 + delay);

        return () => window.clearTimeout(timeoutId);
    }, [delay]);

    return (
        <div
            ref={ref}
            className={`bg-white/95 rounded-2xl shadow-md p-6 transition-all duration-700 ease-out hover:shadow-2xl hover:scale-105 opacity-0 translate-y-8 flex flex-col h-full ${className}`}
            style={{ willChange: "transform, box-shadow, opacity" }}
        >
            {children}
        </div>
    );
};
const CardHeader = ({ children }) => <div className="mb-4">{children}</div>;
const CardTitle = ({ children }) => <h4 className="text-xl font-semibold mb-2">{children}</h4>;
const CardContent = ({ children }) => <div className="flex-1 flex flex-col">{children}</div>;
const CardDescription = ({ children }) => <p className="text-gray-500 mb-4">{children}</p>;

export default function Pricing1() {
    const [activeGroup, setActiveGroup] = useState("individual");
    const currentGroup = PLAN_GROUPS[activeGroup];

    return (
        <div className="py-20 lg:py-40">
            <div className="container mx-auto">
                <div className="flex text-center justify-center items-center gap-4 flex-col">
                    <div className="flex gap-2 flex-col">
                        <h2 className="text-3xl md:text-5xl lg:text-5xl tracking-tighter max-w-2xl text-center font-regular leading-tight mb-6 mt-8">
                            <strong className="bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-text text-transparent">Dedica más tiempo a tus pacientes, menos al papeleo.</strong>
                        </h2>
                        <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center mt-4">
                            <strong className="bg-gradient-to-r from-gray-400 to-blue-500 bg-clip-text text-transparent">Los profesionales ya confían en Medify, Sistema 100% legal, seguro y diseñado específicamente para el sector salud en Chile.</strong>
                        </p>
                    </div>
                    <div className="flex items-center gap-2 mt-4 px-4 py-2 bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200/50 rounded-xl shadow-sm">
                        <Shield className="w-5 h-5 text-teal-600" />
                        <span className="text-sm font-medium text-teal-800">✓ Certificado legal | ✓ Datos protegidos | ✓ Respaldo en la nube</span>
                    </div>

                    <div className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-blue-100/70 bg-white/90 p-2 shadow-md">
                        <button
                            onClick={() => setActiveGroup("individual")}
                            className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all ${activeGroup === "individual"
                                ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                                : "text-slate-600 hover:bg-slate-100"
                                }`}
                        >
                            Planes individuales
                        </button>
                        <button
                            onClick={() => setActiveGroup("business")}
                            className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all ${activeGroup === "business"
                                ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                                : "text-slate-600 hover:bg-slate-100"
                                }`}
                        >
                            Corporaciones y clínicas
                        </button>
                    </div>

                    <p className="text-sm md:text-base text-slate-600 max-w-3xl">
                        {currentGroup.helperText}
                    </p>

                    <div className={`grid pt-20 text-left w-full mt-2 gap-8 ${currentGroup.plans.length === 2 ? "grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto" : "grid-cols-1 lg:grid-cols-3"}`}>
                        {currentGroup.plans.map((plan, index) => (
                            <div key={`${activeGroup}-${plan.id}`} className={`relative h-full ${plan.offsetClass || ""}`}>
                                <div className={`absolute -inset-8 rounded-3xl blur-2xl ${plan.glowClass}`} aria-hidden="true"></div>
                                <Card delay={index * 80} className={`relative rounded-3xl backdrop-blur-sm p-6 shadow-xl w-full ${plan.cardClass}`}>
                                    <CardHeader>
                                        <CardTitle>
                                            <span className="flex flex-row gap-4 items-center font-normal">
                                                <strong>{plan.name}</strong>
                                            </span>
                                        </CardTitle>
                                        {plan.tag && (
                                            <span className="inline-flex items-center text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200/60 rounded-full px-3 py-1 mb-3">
                                                {plan.tag}
                                            </span>
                                        )}
                                        <CardDescription>{plan.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-col gap-8 flex-1 justify-between">
                                            <p className="flex flex-row items-center gap-2 text-xl">
                                                <span className="text-4xl">{plan.price}</span>
                                                <span className="text-sm text-muted-foreground">{plan.priceNote}</span>
                                            </p>

                                            <div className="flex flex-col gap-4 justify-start">
                                                {plan.features.map((feature) => (
                                                    <div key={feature.title} className="flex flex-row gap-4">
                                                        <Check className={`w-4 h-4 mt-2 ${plan.checkClass}`} />
                                                        <div className="flex flex-col">
                                                            <p className="font-semibold">{feature.title}</p>
                                                            <p className="text-muted-foreground text-sm">{feature.description}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {plan.ctaNote && (
                                                <p className="text-center text-xs text-slate-500 bg-slate-50 border border-slate-200/70 rounded-lg px-3 py-2">
                                                    {plan.ctaNote}
                                                </p>
                                            )}
                                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2">
                                                <a
                                                    href={plan.ctaHref}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`inline-flex items-center gap-2 rounded-xl px-8 py-4 text-lg font-semibold text-white ring-1 transition-all focus-visible:outline-none focus-visible:ring-2 ${plan.ctaClass}`}
                                                    aria-label={`${plan.ctaLabel} por WhatsApp`}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                                                        <path d="M20.52 3.48A11.94 11.94 0 0 0 12 .06 11.94 11.94 0 0 0 3.48 3.48C.51 6.46-.52 10.73.6 14.64L.03 23.97l9.33-.57a11.94 11.94 0 0 0 4.91 1.02h.01c3.19 0 6.2-1.24 8.46-3.5A11.94 11.94 0 0 0 24 12a11.94 11.94 0 0 0-3.48-8.52ZM12 21.5h-.01a9.9 9.9 0 0 1-4.45-1.05l-.32-.15-5.53.34.35-5.5-.15-.33A9.9 9.9 0 0 1 2.5 12 9.5 9.5 0 1 1 12 21.5Zm5.21-7.16c-.29-.15-1.7-.84-1.96-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.91 1.13-.17.19-.34.21-.63.08-.29-.15-1.22-.45-2.33-1.45-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.08-.15-.64-1.55-.88-2.12-.23-.56-.47-.48-.64-.49l-.55-.01c-.19 0-.5.07-.77.36-.26.29-1.01.98-1.01 2.39 0 1.41 1.03 2.77 1.18 2.96.15.19 2.03 3.1 4.92 4.35.69.3 1.23.48 1.65.61.69.22 1.31.19 1.8.11.55-.08 1.7-.7 1.94-1.37.24-.67.24-1.25.17-1.37-.07-.12-.26-.19-.55-.34Z" />
                                                    </svg>
                                                    {plan.ctaLabel}
                                                </a>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
