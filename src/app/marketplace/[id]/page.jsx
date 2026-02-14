"use client";
import React from 'react';
import { Poppins, Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useParams } from 'next/navigation';
import { PROFESSIONALS } from "../data/professionals";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap" });

export default function ProfessionalProfile() {
    const params = useParams();

    // Find professional by ID that matches the URL param (some string manipulation might be needed if IDs vary, but simplicity first)
    const professional = PROFESSIONALS.find(p => p.id === params.id);
    const whatsappHref = professional?.whatsappNumber
        ? `https://wa.me/${professional.whatsappNumber}?text=${encodeURIComponent(`Hola ${professional.name}, vi tu perfil en Medify y me gustaría agendar una hora.`)}`
        : `https://wa.me/?text=${encodeURIComponent(`Hola ${professional?.name || ""}`)}`;

    if (!professional) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
                <h1 className={`${poppins.className} text-3xl font-bold text-slate-800 mb-4`}>Profesional no encontrado</h1>
                <Link href="/marketplace" className="text-teal-600 hover:text-teal-700 font-medium">Volver al Marketplace</Link>
            </div>
        );
    }

    return (
        <div className={`min-h-screen bg-[#F8FAFC] ${inter.className} py-12`}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Breadcrumb */}
                <div className="mb-8 flex items-center gap-2 text-sm text-slate-500">
                    <Link href="/marketplace" className="hover:text-teal-600 transition-colors">Marketplace</Link>
                    <span>/</span>
                    <span className="text-slate-800 font-medium">{professional.name}</span>
                </div>

                {/* Profile Header Card */}
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 mb-8">
                    {/* Image */}
                    <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden flex-shrink-0 border-4 border-slate-50 shadow-inner">
                        <Image
                            src={professional.image}
                            alt={professional.name}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Main Info */}
                    <div className="flex-grow text-center md:text-left">
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3">
                            <div className="inline-block bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm font-medium">
                                {professional.role}
                            </div>
                            <div className="inline-block bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                                Modalidad: {professional.consultationMode || "No especificada"}
                            </div>
                        </div>
                        <h1 className={`${poppins.className} text-3xl md:text-5xl font-bold text-slate-900 mb-2`}>
                            {professional.name}
                        </h1>

                        <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
                            <div className="flex text-amber-400">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-slate-600 font-medium">
                                {professional.rating} <span className="text-slate-400 font-normal">({professional.reviews} reseñas)</span>
                            </span>
                        </div>

                        <p className="text-slate-600 text-lg leading-relaxed max-w-2xl">
                            {professional.description}
                        </p>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Left Column: Bio & About */}
                    <div className="md:col-span-2 space-y-8">
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                            <h2 className={`${poppins.className} text-xl font-bold text-slate-900 mb-4`}>Sobre mí</h2>
                            <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                                {professional.fullBio || professional.description}
                            </p>
                        </div>

                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                            <h2 className={`${poppins.className} text-xl font-bold text-slate-900 mb-4`}>Especialidades</h2>
                            <div className="flex flex-wrap gap-2">
                                {professional.specialties?.map((item) => (
                                    <span key={item} className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg text-sm">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Contact & Location */}
                    <div className="space-y-6">
                        {/* Contact Card */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 sticky top-24">
                            <h3 className={`${poppins.className} text-lg font-bold text-slate-900 mb-6`}>Información de contacto</h3>

                            <div className="space-y-5">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Ubicación</p>
                                        <p className="text-slate-700 text-sm leading-snug">{professional.location}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0 text-teal-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Email</p>
                                        <p className="text-slate-700 text-sm">{professional.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0 text-indigo-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 3h14a2 2 0 012 2v8H3V5a2 2 0 012-2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Modalidad</p>
                                        <p className="text-slate-700 text-sm">{professional.consultationMode || "No especificada"}</p>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <a
                                    href={professional.personalWebsite}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex w-full items-center justify-center bg-[#648D98] hover:bg-[#53767F] text-white py-3 rounded-xl font-semibold shadow-lg shadow-teal-900/10 transition-all active:scale-[0.98] mt-2"
                                >
                                    Agendar Hora
                                </a>

                                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592z" />
                                    </svg>
                                    Escribir por WhatsApp
                                </a>

                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
