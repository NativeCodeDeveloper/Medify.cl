import { Check, MoveRight, PhoneCall } from "lucide-react";
import { useEffect, useRef } from "react";

// Dummy Card, CardHeader, CardTitle, CardContent, CardDescription, Button, Badge
// Replace with your UI library or custom components if available
const Card = ({ children, className }) => {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (el) {
            el.classList.add("opacity-0", "translate-y-8");
            setTimeout(() => {
                el.classList.remove("opacity-0", "translate-y-8");
                el.classList.add("opacity-100", "translate-y-0");
            }, 100);
        }
    }, []);
    return (
        <div
            ref={ref}
            className={`bg-white border border-blue-100 rounded-lg shadow-sm p-6 transition-all duration-700 ease-out hover:shadow-2xl hover:scale-105 hover:border-blue-400 opacity-0 translate-y-8 ${className}`}
            style={{ willChange: 'transform, box-shadow, opacity' }}
        >
            {children}
        </div>
    );
};
const CardHeader = ({ children }) => <div className="mb-4">{children}</div>;
const CardTitle = ({ children }) => <h4 className="text-xl font-semibold mb-2">{children}</h4>;
const CardContent = ({ children }) => <div>{children}</div>;
const CardDescription = ({ children }) => <p className="text-gray-500 mb-4">{children}</p>;
const Button = ({ children, className, variant }) => <button className={`px-4 py-2 rounded ${variant === "outline" ? "border" : "bg-blue-600 text-white"} ${className}`}>{children}</button>;
const Badge = ({ children }) => <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold mb-2">{children}</span>;

export default function Pricing1() {
    return (
        <div className="py-20 lg:py-40">
            <div className="container mx-auto">
                <div className="flex text-center justify-center items-center gap-4 flex-col">
                    <Badge>Servicios a sus disposición</Badge>
                    <div className="flex gap-2 flex-col">
                        <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-center font-regular">
                            <strong className="bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-text text-transparent">Evoluciona, gestiona y administra.</strong>
                        </h2>
                        <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl text-center">
                            <strong className="bg-gradient-to-r from-gray-400 to-blue-500 bg-clip-text text-transparent">Nuestros servicios están diseñados para ofrecer soluciones adaptadas a las necesidades de tu consulta médica.</strong>
                        </p>
                    </div>
                    <div className="grid pt-20 text-left grid-cols-1 lg:grid-cols-3 w-full gap-8">
                        <Card className="w-full rounded-md">
                            <CardHeader>
                                <CardTitle>
                                    <span className="flex flex-row gap-4 items-center font-normal">
                                        <strong>Profesionales de la salud independientes</strong>
                                    </span>
                                </CardTitle>
                                <CardDescription>
                                    La forma más simple y rápida de digitalizar tu conuslta médica sin complicarte con tegnología.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-8 justify-start">
                                    <p className="flex flex-row  items-center gap-2 text-xl">
                                        <span className="text-4xl"></span>
                                        <span className="text-sm text-muted-foreground"></span>
                                    </p>
                                    <div className="flex flex-col gap-4 justify-start">
                                        <div className="flex flex-col gap-4 justify-start">
                                            <div className="flex flex-row gap-4">
                                                <Check className="w-4 h-4 mt-2 text-primary" />
                                                <div className="flex flex-col">
                                                    <p>Ficha clínica</p>
                                                    <p className="text-muted-foreground text-sm">
                                                        Registra cosnsultas y tratamientos de manera ordenanda y segura.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex flex-row gap-4">
                                                <Check className="w-4 h-4 mt-2 text-primary" />
                                                <div className="flex flex-col">
                                                    <p>Agenda inteligente</p>
                                                    <p className="text-muted-foreground text-sm">
                                                        Gestión automática de horas, confirmaciones y recordatorios.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex flex-row gap-4">
                                                <Check className="w-4 h-4 mt-2 text-primary" />
                                                <div className="flex flex-col">
                                                    <p>Pagos en línea</p>
                                                    <p className="text-muted-foreground text-sm">
                                                        Recibe pagos con credito o debito desde un solo lugar
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="w-full shadow-2xl rounded-md">
                            <CardHeader>
                                <CardTitle>
                                    <span className="flex flex-row gap-4 items-center font-normal">
                                <strong>Clínicas o grupos de profesionales</strong> 
                                    </span>
                                </CardTitle>
                                <CardDescription>
                                    Diseñado para consultas que quieran crecer y necesitan coordinación, orden y control.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-8 justify-start">
                                    <p className="flex flex-row  items-center gap-2 text-xl">
                                        <span className="text-4xl">$120.000</span>
                                        <span className="text-sm text-muted-foreground"> / + IVA</span>
                                    </p>
                                    <div className="flex flex-col gap-4 justify-start">
                                        <div className="flex flex-col gap-4 justify-start">
                                            <div className="flex flex-row gap-4">
                                                <Check className="w-4 h-4 mt-2 text-primary" />
                                                <div className="flex flex-col">
                                                    <p>Automatización clave</p>
                                                    <p className="text-muted-foreground text-sm">
                                                        Recordatorios, programaciones y comunicación con pacientes.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex flex-row gap-4">
                                                <Check className="w-4 h-4 mt-2 text-primary" />
                                                <div className="flex flex-col">
                                                    <p>Múltiples profesionales</p>
                                                    <p className="text-muted-foreground text-sm">
                                                        Administra agendas, reservas y a tus pacientes.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex flex-row gap-4">
                                                <Check className="w-4 h-4 mt-2 text-primary" />
                                                <div className="flex flex-col">
                                                    <p>Reportes y métricas</p>
                                                    <p className="text-muted-foreground text-sm">
                                                        Visualiza ingresos, asistencia, tratamientos y rendimiento.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
                                            <a
                                                href="https://wa.me/56977889900?text=Quiero%20cotizar%20una%20solución%20médica%20de%20Medify"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 shadow-[0_0_25px_rgba(59,130,246,0.8)] ring-1 ring-blue-400/40 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                                                aria-label="Cotizar solución médica por WhatsApp"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                                                    <path d="M20.52 3.48A11.94 11.94 0 0 0 12 .06 11.94 11.94 0 0 0 3.48 3.48C.51 6.46-.52 10.73.6 14.64L.03 23.97l9.33-.57a11.94 11.94 0 0 0 4.91 1.02h.01c3.19 0 6.2-1.24 8.46-3.5A11.94 11.94 0 0 0 24 12a11.94 11.94 0 0 0-3.48-8.52ZM12 21.5h-.01a9.9 9.9 0 0 1-4.45-1.05l-.32-.15-5.53.34.35-5.5-.15-.33A9.9 9.9 0 0 1 2.5 12 9.5 9.5 0 1 1 12 21.5Zm5.21-7.16c-.29-.15-1.7-.84-1.96-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.91 1.13-.17.19-.34.21-.63.08-.29-.15-1.22-.45-2.33-1.45-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.08-.15-.64-1.55-.88-2.12-.23-.56-.47-.48-.64-.49l-.55-.01c-.19 0-.5.07-.77.36-.26.29-1.01.98-1.01 2.39 0 1.41 1.03 2.77 1.18 2.96.15.19 2.03 3.1 4.92 4.35.69.3 1.23.48 1.65.61.69.22 1.31.19 1.8.11.55-.08 1.7-.7 1.94-1.37.24-.67.24-1.25.17-1.37-.07-.12-.26-.19-.55-.34Z" />
                                                </svg>
                                                Solicitar consulta
                                            </a>
                                        </div>
                                    </div>
                                    </div>
                            </CardContent>
                        </Card>
                        <Card className="w-full rounded-md">
                            <CardHeader>
                                <CardTitle>
                                    <span className="flex flex-row gap-4 items-center font-normal">
                                        <strong>Clínicas en desarrollo o expansión</strong>
                                    </span>
                                </CardTitle>
                                <CardDescription>
                                    Solución Completa y escalable para instituciones de la salud que requieran eficiencia y trazabilidad.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-8 justify-start">
                                    <p className="flex flex-row  items-center gap-2 text-xl">
                                        <span className="text-4xl"></span>
                                        <span className="text-sm text-muted-foreground"> </span>
                                    </p>
                                    <div className="flex flex-col gap-4 justify-start">
                                        <div className="flex flex-row gap-4">
                                            <Check className="w-4 h-4 mt-2 text-primary" />
                                            <div className="flex flex-col">
                                                <p>Cumplimiento normativo</p>
                                                <p className="text-muted-foreground text-sm">
                                                    Seguridad avanzada, auditorías y respaldo según estándares de Salud.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-row gap-4">
                                            <Check className="w-4 h-4 mt-2 text-primary" />
                                            <div className="flex flex-col">
                                                <p>Reportes y trazabilidad</p>
                                                <p className="text-muted-foreground text-sm">
                                                    Generación de informes automáticos y seguimiento de procesos clínicos.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-row gap-4">
                                            <Check className="w-4 h-4 mt-2 text-primary" />
                                            <div className="flex flex-col">
                                                <p>Integración avanzada</p>
                                                <p className="text-muted-foreground text-sm">
                                                    Conexión de tus datos directamente en la nube.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
