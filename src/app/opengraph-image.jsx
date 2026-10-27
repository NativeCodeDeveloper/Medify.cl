import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/* Imagen al compartir el sitio (WhatsApp, Facebook, LinkedIn, X): 1200×630, generada en el build */
export const alt = "Medify — Encuentra profesionales de la salud en Chile";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/logonavar.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{
        width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between",
        padding: "72px 80px", background: "#000000",
        backgroundImage: "radial-gradient(ellipse 70% 60% at 85% 0%, rgba(0,200,83,0.28), transparent 60%)",
      }}>
        <img src={logoSrc} width={300} height={68} style={{ objectFit: "contain" }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 68, fontWeight: 700, color: "#ffffff", lineHeight: 1.05, letterSpacing: "-2px" }}>
            Encuentra profesionales
          </div>
          <div style={{ fontSize: 68, fontWeight: 700, color: "#00C853", lineHeight: 1.05, letterSpacing: "-2px" }}>
            de la salud en Chile.
          </div>
          <div style={{ marginTop: 28, fontSize: 30, color: "rgba(255,255,255,0.6)" }}>
            Psicología · Kinesiología · Nutrición · Odontología y más
          </div>
        </div>
        <div style={{ fontSize: 26, color: "rgba(255,255,255,0.45)" }}>www.medifyclinic.cl</div>
      </div>
    ),
    size,
  );
}
