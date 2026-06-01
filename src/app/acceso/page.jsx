"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

/* Validación básica de RUT chileno */
const validateRUT = (rut) => {
  const clean = rut.replace(/[^0-9kK]/g, "").toUpperCase();
  if (clean.length < 8 || clean.length > 9) return false;
  const body = clean.slice(0, -1);
  const dv = clean.slice(-1);
  let sum = 0, multiplier = 2;
  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }
  const rem = 11 - (sum % 11);
  const expected = rem === 11 ? "0" : rem === 10 ? "K" : String(rem);
  return expected === dv;
};

export default function AccesoPage() {
  const router = useRouter();
  const [form, setForm] = useState({ rut: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const formatRUT = (val) => {
    const clean = val.replace(/[^0-9kK]/g, "").toUpperCase();
    if (!clean) return "";
    if (clean.length === 1) return clean;
    const body = clean.slice(0, -1);
    const dv = clean.slice(-1);
    let formatted = "";
    for (let i = body.length - 1, c = 0; i >= 0; i--, c++) {
      if (c > 0 && c % 3 === 0) formatted = "." + formatted;
      formatted = body[i] + formatted;
    }
    return `${formatted}-${dv}`;
  };

  const handleSignIn = async () => {
    if (!form.rut || !form.password) {
      setError("Ingresa tu RUT y contraseña.");
      return;
    }
    if (!validateRUT(form.rut)) {
      setError("El RUT ingresado no es válido.");
      return;
    }
    setError("");
    setLoading(true);

    // TODO: reemplazar con validación real contra Clerk + backend Java
    // El RUT actúa como identificador único del profesional
    // Clerk valida el token y el backend confirma el profesional activo
    await new Promise(r => setTimeout(r, 500));
    router.push("/mi-perfil");

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#000000] relative overflow-hidden px-6">

      {/* Glow */}
      <div aria-hidden className="pointer-events-none fixed inset-0"
        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,200,83,0.1) 0%, transparent 60%)" }} />

      <div className="relative z-10 w-full max-w-[380px]">

        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <Image src="/logonavar.png" alt="Medify" width={140} height={38}
            className="h-9 w-auto object-contain mb-5" />
          <span className="font-semibold uppercase tracking-[0.18em] text-white/30"
            style={{ fontSize: "10px" }}>
            Acceso profesional
          </span>
        </div>

        {/* Card */}
        <div className="rounded-3xl p-8"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}>

          <h1 className="font-semibold text-white mb-1" style={{ fontSize: "21px", letterSpacing: "-0.02em" }}>
            Ingresa a tu perfil
          </h1>
          <p className="font-light mb-8" style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)" }}>
            Red Medify — Panel del profesional
          </p>

          <div className="space-y-4">
            {/* RUT */}
            <div>
              <label className="block font-semibold uppercase mb-2"
                style={{ fontSize: "10px", letterSpacing: "0.08em", color: "rgba(255,255,255,0.4)" }}>
                RUT
              </label>
              <input
                type="text"
                placeholder="12.345.678-9"
                value={form.rut}
                maxLength={12}
                onChange={e => setForm(p => ({ ...p, rut: formatRUT(e.target.value) }))}
                onKeyDown={e => e.key === "Enter" && handleSignIn()}
                className="w-full rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none transition-all"
                style={{ fontSize: "15px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                onFocus={e => (e.target.style.borderColor = "#00C853")}
                onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
              />
            </div>

            {/* Contraseña */}
            <div>
              <label className="block font-semibold uppercase mb-2"
                style={{ fontSize: "10px", letterSpacing: "0.08em", color: "rgba(255,255,255,0.4)" }}>
                Contraseña
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                onKeyDown={e => e.key === "Enter" && handleSignIn()}
                className="w-full rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none transition-all"
                style={{ fontSize: "15px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                onFocus={e => (e.target.style.borderColor = "#00C853")}
                onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
              />
            </div>

            {error && (
              <p className="text-red-400" style={{ fontSize: "13px" }}>{error}</p>
            )}

            <hr className="opacity-10" />

            <button onClick={handleSignIn} disabled={loading}
              className="w-full rounded-full text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontSize: "15px", padding: "14px", background: "#00C853" }}>
              {loading ? "Verificando..." : "Ingresar"}
            </button>
          </div>
        </div>

        <div className="text-center mt-8 space-y-2">
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)" }}>
            ¿Aún no estás en Red Medify?{" "}
            <Link href="/unirse" className="text-[#00C853] hover:underline underline-offset-4">
              Únete aquí
            </Link>
          </p>
          <p>
            <Link href="/" className="hover:text-white/40 transition-colors"
              style={{ fontSize: "12px", color: "rgba(255,255,255,0.2)" }}>
              ← Volver al sitio
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
