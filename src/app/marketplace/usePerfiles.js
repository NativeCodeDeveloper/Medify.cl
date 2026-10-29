"use client";
import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "@/lib/api";
import { PROFESSIONALS } from "./data/professionals";

/* Perfiles del marketplace = los cargados a mano en data/professionals.js + las cuentas
 * registradas en /unirse y aprobadas por un admin (GET /public/perfiles).
 * Los estáticos se muestran al tiro; los de la API se agregan arriba cuando llegan. Si la API no
 * responde, el marketplace sigue funcionando solo con los estáticos. */
export function usePerfiles() {
  const [registrados, setRegistrados] = useState([]);
  // Estrellas de los perfiles estáticos: /public/perfiles solo trae el resumen de los registrados,
  // así que se pide el de cada estático a su ruta de reseñas (la misma que usa su página de perfil).
  const [resumenesEstaticos, setResumenesEstaticos] = useState({});

  useEffect(() => {
    let activo = true;
    apiFetch("/public/perfiles")
      .then(data => { if (activo) setRegistrados(data); })
      .catch(err => console.warn("[Marketplace] No se pudieron cargar perfiles registrados:", err.message));
    Promise.allSettled(PROFESSIONALS.map(p => apiFetch(`/public/perfiles/${p.id}/resenas`)))
      .then(resultados => {
        if (!activo) return;
        const resumenes = {};
        resultados.forEach((r, i) => {
          if (r.status === "fulfilled") resumenes[PROFESSIONALS[i].id] = { calificacion: r.value.promedio, total_resenas: r.value.total };
        });
        setResumenesEstaticos(resumenes);
      });
    return () => { activo = false; };
  }, []);

  // Orden: primero los registrados reales (la API ya los entrega por más estrellas y luego por orden de registro),
  // después los cargados a mano en el código. Si un slug choca con uno estático, gana el estático.
  return useMemo(() => {
    const idsEstaticos = new Set(PROFESSIONALS.map(p => p.id));
    const estaticos = PROFESSIONALS.map(p => ({ ...p, ...resumenesEstaticos[p.id] }));
    return [...registrados.filter(p => !idsEstaticos.has(p.id)), ...estaticos];
  }, [registrados, resumenesEstaticos]);
}
