"use client";
import React, { useState } from "react";
import { Poppins, Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { PROFESSIONALS } from "./data/professionals";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap" });

export default function Marketplace() {
    const [searchTerm, setSearchTerm] = useState("");
    const [specialty, setSpecialty] = useState("");
    const [city, setCity] = useState("");
    const [consultationMode, setConsultationMode] = useState("");
    const [sort, setSort] = useState("Experiencia");
    const [availableNow, setAvailableNow] = useState(false);
    const sortOptions = ["Experiencia", "Valoración", "Precio"];

    // Get unique values for filters
    const specialties = [...new Set(PROFESSIONALS.map(p => p.role))];
    const cities = [...new Set(PROFESSIONALS.map(p => p.location))];
    const consultationModes = ["Online", "Presencial", "Ambas"].filter((mode) =>
        PROFESSIONALS.some((p) => p.consultationMode === mode)
    );

    // Filter + sort logic
    const visibleProfessionals = PROFESSIONALS.filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.role.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSpecialty = specialty ? p.role === specialty : true;
        const matchesCity = city ? p.location === city : true;
        const matchesConsultationMode = consultationMode ? p.consultationMode === consultationMode : true;
        const matchesAvailable = availableNow ? p.available : true;

        return matchesSearch && matchesSpecialty && matchesCity && matchesConsultationMode && matchesAvailable;
    }).sort((a, b) => {
        if (sort === "Experiencia") {
            return (b.yearsExperience ?? 0) - (a.yearsExperience ?? 0);
        }

        if (sort === "Valoración") {
            if (b.rating === a.rating) {
                return (b.reviews ?? 0) - (a.reviews ?? 0);
            }

            return (b.rating ?? 0) - (a.rating ?? 0);
        }

        if (sort === "Precio") {
            return (a.price ?? Number.MAX_SAFE_INTEGER) - (b.price ?? Number.MAX_SAFE_INTEGER);
        }

        return 0;
    });

    return (
        <div className={`min-h-screen bg-[#F0F4F8] ${inter.className} pb-20`}>
            {/* Header Section */}
            <div className="bg-gradient-to-b from-[#F0F4F8] to-white/50 pt-24 pb-12 px-4 text-center">
                <h1 className={`${poppins.className} text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1e293b] mb-4`}>
                    Encuentra a los mejores profesionales de la salud
                </h1>
                <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                    Conoce y agenda con especialistas confiables en diversos campos de la salud, listos para atenderte.
                </p>
            </div>

            {/* Filters Bar */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-wrap gap-4 items-center justify-between">

                    {/* Search */}
                    <div className="relative flex-grow md:flex-grow-0 md:w-1/3 min-w-[200px]">
                        <input
                            type="text"
                            placeholder="Buscar profesional..."
                            className="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    {/* Dropdowns Group */}
                    <div className="flex flex-wrap gap-3 flex-grow md:flex-grow-0">
                        <FilterDropdown
                            label="Especialidad"
                            options={specialties}
                            value={specialty}
                            onChange={setSpecialty}
                        />
                        <FilterDropdown
                            label="Modalidad"
                            options={consultationModes}
                            value={consultationMode}
                            onChange={setConsultationMode}
                        />
                        <FilterDropdown
                            label="Ciudad"
                            options={cities}
                            value={city}
                            onChange={setCity}
                        />
                        <FilterDropdown
                            label="Ordenar por"
                            options={sortOptions}
                            value={sort}
                            onChange={setSort}
                            allowAll={false}
                        />
                    </div>

                    {/* Toggle Available */}
                    <div className="flex items-center gap-3 bg-[#E0F2F1] rounded-full px-4 py-2 border border-teal-100">
                        <span className="text-sm font-medium text-teal-700">Disponibles ahora</span>
                        <button
                            onClick={() => setAvailableNow(!availableNow)}
                            className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 focus:outline-none ${availableNow ? 'bg-teal-500' : 'bg-slate-300'}`}
                        >
                            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${availableNow ? 'translate-x-6' : 'translate-x-0'}`} />
                        </button>
                    </div>

                </div>
            </div>

            {/* Main Content: Sidebar + Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8">

                {/* Sidebar (Optional Filters - imitating the design which shows filters on left in card style) */}
                <div className="hidden lg:block w-64 space-y-6 flex-shrink-0">
                    <div className="bg-[#E0F2F1] rounded-xl p-4 flex items-center gap-3 text-teal-800 font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <span>{visibleProfessionals.length} Profesionales disponibles</span>
                    </div>

                    {/* Sidebar Filters Accordion Style */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                        <SidebarFilterItem
                            label="Especialidad"
                            options={specialties}
                            selected={specialty}
                            onChange={setSpecialty}
                            defaultOpen={true}
                        />
                        <SidebarFilterItem
                            label="Ciudad"
                            options={cities}
                            selected={city}
                            onChange={setCity}
                        />
                        <SidebarFilterItem
                            label="Modalidad"
                            options={consultationModes}
                            selected={consultationMode}
                            onChange={setConsultationMode}
                        />
                        <SidebarFilterItem
                            label="Ordenar por"
                            options={sortOptions}
                            selected={sort}
                            onChange={setSort}
                            allowAll={false}
                        />

                        {(specialty || city || consultationMode || sort !== "Experiencia") && (
                            <button
                                onClick={() => {
                                    setSpecialty("");
                                    setCity("");
                                    setConsultationMode("");
                                    setSort("Experiencia");
                                    setAvailableNow(false);
                                }}
                                className="w-full py-3 text-sm text-teal-600 font-medium hover:bg-teal-50 transition-colors border-t border-slate-100"
                            >
                                Limpiar filtros
                            </button>
                        )}
                    </div>
                </div>

                {/* Results Grid */}
                <div className="flex-grow">
                    {visibleProfessionals.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {visibleProfessionals.map((prof) => (
                                <ProfessionalCard key={prof.id} professional={prof} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
                            <p className="text-slate-500 mb-2">No encontramos profesionales con esos filtros.</p>
                            <button
                                onClick={() => {
                                    setSearchTerm("");
                                    setSpecialty("");
                                    setCity("");
                                    setConsultationMode("");
                                    setSort("Experiencia");
                                    setAvailableNow(false);
                                }}
                                className="text-teal-600 font-medium hover:underline"
                            >
                                Limpiar filtros
                            </button>
                        </div>
                    )}

                    {/* Pagination / Load More */}
                    {visibleProfessionals.length > 0 && (
                        <div className="mt-12 text-center">
                            <button className="bg-[#648D98] hover:bg-[#53767F] text-white px-8 py-3 rounded-full font-medium shadow-md transition-colors inline-flex items-center gap-2">
                                Ver más profesionales
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Sub-components
function FilterDropdown({ label, options, value, onChange, allowAll = true }) {
    const [open, setOpen] = useState(false);

    // Close on click outside could be implemented with refs, keeping it simple for now

    return (
        <div className="relative">
            <div
                onClick={() => setOpen(!open)}
                className={`flex items-center justify-between gap-4 bg-slate-50 border ${open || value ? 'border-teal-400 bg-teal-50/50' : 'border-slate-200'} rounded-lg px-4 py-2.5 text-sm ${value ? 'text-teal-800 font-medium' : 'text-slate-700'} min-w-[140px] cursor-pointer hover:bg-slate-100 transition-colors select-none`}
            >
                <span>{value || label}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            {open && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                    {allowAll && (
                        <div
                            className="px-4 py-2 hover:bg-slate-50 cursor-pointer text-sm text-slate-500 border-b border-slate-50 mb-1"
                            onClick={() => { onChange(""); setOpen(false); }}
                        >
                            Todas
                        </div>
                    )}
                    {options.map(opt => (
                        <div
                            key={opt}
                            className={`px-4 py-2 hover:bg-teal-50 hover:text-teal-700 cursor-pointer text-sm ${value === opt ? 'bg-teal-50 text-teal-700 font-medium' : 'text-slate-700'}`}
                            onClick={() => { onChange(opt); setOpen(false); }}
                        >
                            {opt}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

function SidebarFilterItem({ label, options = [], selected, onChange, defaultOpen = false, allowAll = true }) {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <div className="border-b border-slate-100">
            <div
                className={`p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 ${open ? 'bg-slate-50' : ''}`}
                onClick={() => setOpen(!open)}
            >
                <div className="flex items-center gap-3">
                    {label === "Especialidad" && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    )}
                    {label === "Ciudad" && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    )}
                    {label === "Modalidad" && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 3h14a2 2 0 012 2v8H3V5a2 2 0 012-2z" />
                        </svg>
                    )}
                    {label === "Ordenar por" && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                        </svg>
                    )}

                    <span className={`${poppins.className} text-slate-700 font-medium`}>{label}</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 text-slate-400 transition-transform ${open ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            {open && (
                <div className="px-4 pb-4 pt-1 flex flex-col gap-2">
                    {allowAll && (
                        <button
                            onClick={() => onChange("")}
                            className={`text-left text-sm px-3 py-2 rounded-lg transition-colors ${selected ? 'text-slate-500 hover:bg-slate-50' : 'bg-teal-50 text-teal-700 font-medium'}`}
                        >
                            Todas
                        </button>
                    )}
                    {options.map((opt) => (
                        <button
                            key={opt}
                            onClick={() => onChange(opt)}
                            className={`text-left text-sm px-3 py-2 rounded-lg transition-colors ${selected === opt ? 'bg-teal-50 text-teal-700 font-medium' : 'text-slate-600 hover:bg-slate-50'}`}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

function ProfessionalCard({ professional }) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col h-full">
            <div className="flex items-start gap-4 mb-4">
                <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
                    <Image
                        src={professional.image}
                        alt={professional.name}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="flex-grow">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className={`${poppins.className} text-lg font-bold text-slate-900 leading-tight mb-1`}>{professional.name}</h3>
                            <p className="text-slate-500 text-sm font-medium">{professional.role}</p>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-medium">
                                    {professional.consultationMode}
                                </span>
                                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium">
                                    ${professional.price?.toLocaleString("es-CL")}
                                </span>
                            </div>
                        </div>
                        {/* Heart icon could go here */}
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                        <div className="flex text-amber-400">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <span className="text-xs text-slate-500 font-medium ml-1">
                            {professional.rating} <span className="text-slate-400">({professional.reviews})</span>
                        </span>
                    </div>
                </div>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                {professional.description}
            </p>
            {professional.specialties?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                    {professional.specialties.slice(0, 2).map((item) => (
                        <span key={item} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-xs">
                            {item}
                        </span>
                    ))}
                    {professional.specialties.length > 2 && (
                        <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-lg text-xs">
                            +{professional.specialties.length - 2}
                        </span>
                    )}
                </div>
            )}

            <Link href={`/marketplace/${professional.id}`} className="w-full bg-[#648D98] hover:bg-[#53767F] text-white py-2.5 rounded-lg font-medium text-sm transition-colors text-center flex items-center justify-center gap-2">
                Ver perfil
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </Link>
        </div>
    )
}
