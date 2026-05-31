"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      setError("Ingresa tu email y contraseña.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Ingresa un email válido.");
      return;
    }
    setError("");
    setLoading(true);

    // TODO: reemplazar con Clerk / middleware real
    if (email === "admin@medify.cl" && password === "medify2026") {
      router.push("/dashboard");
    } else {
      setError("Credenciales incorrectas. Verifica e intenta de nuevo.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#000000] relative overflow-hidden w-full px-6">

      {/* Glow verde sutil */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,200,83,0.12) 0%, transparent 60%)",
        }}
      />

      {/* Glass card */}
      <div className="relative z-10 w-full max-w-sm rounded-3xl bg-gradient-to-r from-[#ffffff10] to-[#00000080] backdrop-blur-sm shadow-2xl p-8 flex flex-col items-center"
        style={{ border: "1px solid rgba(255,255,255,0.08)" }}>

        {/* Logo Medify */}
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/logonavar.png"
            alt="Medify"
            width={130}
            height={36}
            className="h-8 w-auto object-contain mb-4"
          />
          <span
            className="font-semibold uppercase tracking-[0.18em]"
            style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)" }}
          >
            Acceso interno
          </span>
        </div>

        <h2 className="text-xl font-semibold text-white mb-1 text-center"
          style={{ letterSpacing: "-0.02em" }}>
          Bienvenido de vuelta
        </h2>
        <p className="text-center font-light mb-7"
          style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)" }}>
          Panel de administración · Medify
        </p>

        {/* Form */}
        <div className="flex flex-col w-full gap-3">
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
            className="w-full px-5 py-3 rounded-xl bg-white/10 text-white placeholder-white/25 text-sm focus:outline-none focus:ring-2 transition-all"
            style={{ "--tw-ring-color": "#00C853" }}
          />
          <input
            placeholder="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
            className="w-full px-5 py-3 rounded-xl bg-white/10 text-white placeholder-white/25 text-sm focus:outline-none focus:ring-2 transition-all"
            style={{ "--tw-ring-color": "#00C853" }}
          />

          {error && (
            <p className="text-sm text-red-400 text-left px-1">{error}</p>
          )}

          <hr className="opacity-10 my-1" />

          <button
            onClick={handleSignIn}
            disabled={loading}
            className="w-full font-medium px-5 py-3 rounded-full text-white shadow transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: "#00C853" }}
          >
            {loading ? "Verificando..." : "Ingresar al dashboard"}
          </button>
        </div>
      </div>

      {/* Volver al sitio */}
      <div className="relative z-10 mt-8 text-center">
        <Link href="/"
          className="font-light hover:text-white/60 transition-colors"
          style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)" }}>
          ← Volver al sitio
        </Link>
      </div>
    </div>
  );
}
