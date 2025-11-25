"use client";
import React from 'react';
import CardNav from './CardNav';

// Configuración médica para CardNav
const medicalNavItems = [
  {
    label: "Servicios Médicos",
    bgColor: "transparent", // Se aplicará via CSS
    textColor: "#0066cc",
    className: "medical-services",
    links: [
      {
        label: "Consultas Virtuales",
        href: "/servicios/consultas-virtuales",
        ariaLabel: "Acceder a consultas médicas virtuales"
      },
      {
        label: "Telemedicina",
        href: "/servicios/telemedicina",
        ariaLabel: "Servicios de telemedicina"
      },
      {
        label: "Historiales Clínicos",
        href: "/servicios/historiales",
        ariaLabel: "Gestión de historiales clínicos"
      },
      {
        label: "Monitoreo Remoto",
        href: "/servicios/monitoreo",
        ariaLabel: "Monitoreo remoto de pacientes"
      }
    ]
  },
  {
    label: "Soluciones Digitales",
    bgColor: "transparent",
    textColor: "#28a745",
    className: "medical-solutions",
    links: [
      {
        label: "Plataforma de Gestión",
        href: "/soluciones/gestion",
        ariaLabel: "Plataforma de gestión hospitalaria"
      },
      {
        label: "Análisis de Datos",
        href: "/soluciones/analytics",
        ariaLabel: "Análisis de datos médicos"
      },
      {
        label: "IA Diagnóstica",
        href: "/soluciones/ia-diagnostica",
        ariaLabel: "Inteligencia artificial para diagnósticos"
      },
      {
        label: "Integración APIs",
        href: "/soluciones/apis",
        ariaLabel: "Integración con APIs médicas"
      }
    ]
  },
  {
    label: "Soporte & Ayuda",
    bgColor: "transparent",
    textColor: "#0d9488",
    className: "medical-support",
    links: [
      {
        label: "Centro de Ayuda",
        href: "/soporte/ayuda",
        ariaLabel: "Centro de ayuda y documentación"
      },
      {
        label: "Soporte Técnico",
        href: "/soporte/tecnico",
        ariaLabel: "Soporte técnico especializado"
      },
      {
        label: "Capacitación",
        href: "/soporte/capacitacion",
        ariaLabel: "Programas de capacitación"
      },
      {
        label: "Contactar Expert@",
        href: "/soporte/contacto",
        ariaLabel: "Contactar con un experto médico"
      }
    ]
  }
];

const CardNavMedical = ({ 
  logo = "/logomedify.png", // Logo existente de Medify
  logoAlt = "Medify - Plataforma Médica Digital",
  className = "medical-nav",
  buttonText = "Solicitar Demo"
}) => {
  return (
    <CardNav
      logo={logo}
      logoAlt={logoAlt}
      items={medicalNavItems}
      className={className}
      ease="power3.out"
      baseColor="rgba(255, 255, 255, 0.95)"
      menuColor="#0066cc"
      buttonBgColor="#0066cc"
      buttonTextColor="#ffffff"
    />
  );
};

export default CardNavMedical;