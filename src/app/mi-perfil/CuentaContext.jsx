"use client";
import { createContext, useContext } from "react";

/* Cuenta del profesional/centro logueado (GET /auth/yo). La carga el layout de /mi-perfil
 * una sola vez y la comparte con las páginas; setCuenta la actualiza después de guardar. */
export const CuentaContext = createContext({ cuenta: null, setCuenta: () => {} });

export const useCuenta = () => useContext(CuentaContext);

export const nombreCuenta = (c) =>
  c?.tipo_cuenta === "profesional" ? `${c.nombres} ${c.apellidos}` : c?.nombre ?? "";

export const NOMBRE_PLAN = {
  esencial: "Esencial", profesional: "Profesional", avanzado: "Avanzado",
  "vitrina-clinica": "Vitrina Clínica", corporativo: "Corporativo", enterprise: "Enterprise",
};
