"use client";
import React from 'react';
import { Poppins, Inter } from "next/font/google"; // Assuming these are used
import Image from "next/image";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap" });

export default function ComoFunciona() {
    return (
        <section id="precios" className="w-full bg-[#F8FAFC] py-24 relative overflow-hidden">
            {/* Background decorative elements could go here */}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className={`${poppins.className} text-3xl md:text-5xl font-semibold text-[#1e293b] mb-4`}>
                        <strong className='bg-gradient-to-r from-[#5FA5F9] to-[#4B8FE3] bg-clip-text text-transparent'>Cómo funciona Medify</strong>
                    </h2>
                    <p className={`${inter.className} text-lg text-slate-500`}>
                        Una manera simple, ordenada y segura de conectar con tus pacientes.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    {/* Card 1 */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center h-full relative group hover:shadow-md transition-shadow">
                        {/* Number Circle */}
                        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600 mb-6 absolute -top-8 bg-white border-4 border-white shadow-sm ring-4 ring-blue-50/50">
                            1
                        </div>

                        <div className="mt-8 mb-6">
                            <h3 className={`${poppins.className} text-2xl font-semibold text-slate-800 mb-4`}>
                                Encuentra o crea<br />tu perfil profesional
                            </h3>
                            <p className={`${inter.className} text-slate-500 text-sm leading-relaxed px-4`}>
                                Regístrate en Medify y crea tu perfil profesional para aparecer en nuestro marketplace de salud.
                            </p>
                        </div>

                        <button className="bg-[#648D98] hover:bg-[#53767F] text-white px-8 py-3 rounded-full font-medium mb-8 w-full max-w-[240px] transition-colors">
                            Crear perfil
                        </button>

                        <div className="space-y-3 w-full text-left pl-4 mb-8">
                            <FeatureItem text="Agenda online y fichas clinicas" />
                            <FeatureItem text="Módulo de gestión para profesionales" />
                            <FeatureItem text="Soporte online y básico" />
                            <FeatureItem text="LIMITADO - Recordatorios automáticos" />
                        </div>

                        <div className="mt-auto w-full flex flex-col items-center space-y-3">
                            <div className="bg-blue-50 text-blue-600 px-6 py-2 rounded-lg text-sm font-medium w-full">
                                Sin costo inicial
                            </div>
                            <button className="bg-[#648D98] hover:bg-[#53767F] text-white px-8 py-3 rounded-full font-medium w-full shadow-lg shadow-teal-900/10">
                                Crear perfil
                            </button>
                            <span className="text-slate-400 text-sm">Sin costo inicial</span>
                        </div>
                    </div>

                    {/* Card 2 - Blue Header */}
                    <div className="bg-white rounded-[2.5rem] shadow-lg border border-blue-100 flex flex-col items-center text-center h-full relative overflow-hidden transform lg:-translate-y-4">
                        {/* Blue Header Background */}
                        <div className="absolute top-0 w-full h-48 bg-gradient-to-b from-[#5FA5F9] to-[#4B8FE3]"></div>

                        {/* Number Circle */}
                        <div className="w-16 h-16 rounded-full bg-[#4B8FE3] flex items-center justify-center text-2xl font-bold text-white mb-6 absolute top-8 border-4 border-white shadow-md z-10">
                            2
                        </div>

                        <div className="mt-28 mb-6 relative z-10 w-full px-6">
                            <h3 className={`${poppins.className} text-2xl font-semibold text-white mb-1 drop-shadow-md`}>
                                Organiza tu agenda
                            </h3>
                            <h3 className={`${poppins.className} text-2xl font-semibold text-white mb-6 drop-shadow-md`}>
                                y consultas
                            </h3>

                            <div className="h-2"></div> {/* Spacer to push content down from blue header area if needed, though text is on blue */}
                        </div>

                        {/* Content Body */}
                        <div className="w-full px-8 pb-8 flex flex-col items-center flex-grow pt-4">
                            <p className={`${inter.className} text-slate-500 text-sm leading-relaxed mb-6`}>
                                Gestiona tus citas online, ficha a tus pacientes y reduce las tareas administrativas.
                            </p>

                            <button className="bg-[#5FA5F9] hover:bg-[#4B8FE3] text-white px-8 py-3 rounded-full font-medium mb-8 w-full max-w-[240px] shadow-blue-200 shadow-lg">
                                Organizar agenda
                            </button>

                            <div className="space-y-3 w-full text-left pl-4 mb-8">
                                <FeatureItem text={<>Todo lo del plan <strong>Básico</strong></>} iconColor="text-blue-500" />
                                <FeatureItem text="Recordatorios automáticos" iconColor="text-blue-500" />
                                <FeatureItem text="Pagos online e informes completos" iconColor="text-blue-500" />
                                <FeatureItem text="+ Recordatorios por WhatsApp" iconColor="text-blue-500" />
                            </div>

                            <div className="mt-auto w-full flex flex-col items-center space-y-3">
                                <div className="bg-blue-50 text-blue-600 px-6 py-2 rounded-lg text-sm font-medium w-full">
                                    2 meses gratis pagando anualmente
                                </div>
                                <button className="bg-[#5FA5F9] hover:bg-[#4B8FE3] text-white px-8 py-3 rounded-full font-medium w-full shadow-lg shadow-blue-900/10">
                                    Empieza ahora
                                </button>
                                <span className="text-slate-400 text-sm">Obtén descuentos pagando anualmente</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 - Image */}
                    <div className="rounded-[2.5rem] h-full relative overflow-hidden group min-h-[600px] lg:min-h-0">
                        <Image
                            src="/personalsalud.png" // Using existing image as placeholder
                            alt="Professional Doctor"
                            fill
                            className="object-cover"
                        />

                        {/* Bottom Card Overlay */}
                        <div className="absolute bottom-6 left-6 right-6 bg-[#F1F5F9]/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-12 h-12 rounded-full bg-[#7FB8B3] flex items-center justify-center mb-4 shadow-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="white" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                </div>
                                <h3 className={`${poppins.className} text-xl font-semibold text-[#1e293b] mb-3`}>
                                    Por fin, más tiempo para tus pacientes.
                                </h3>
                                <p className={`${inter.className} text-slate-500 text-sm leading-relaxed`}>
                                    Simplifica tu consulta, elimina el desorden y dedicate a atender, mientras nosotros nos ocupamos del resto.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

function FeatureItem({ text, iconColor = "text-[#648D98]" }) {
    return (
        <div className="flex items-start gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={`w-5 h-5 flex-shrink-0 ${iconColor}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span className={`text-sm text-slate-600 ${inter.className}`}>{text}</span>
        </div>
    )
}
