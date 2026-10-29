"use client";
import { useState } from "react";
import Image from "next/image";
import FotoPerfil from "./FotoPerfil";

const N = 96; // resolución de la muestra para analizar la imagen

const MASCARA = "linear-gradient(to right, transparent, #000 4%, #000 96%, transparent), linear-gradient(to bottom, transparent, #000 4%, #000 96%, transparent)";
const BORDE_DIFUMINADO = { maskImage: MASCARA, maskComposite: "intersect", WebkitMaskImage: MASCARA, WebkitMaskComposite: "source-in" };

/* Analiza la imagen ya cargada. Si el borde es casi todo de un color (logo sobre fondo liso), devuelve
 * ese color y el recuadro donde está el dibujo (en fracciones 0..1), para centrarlo con aire parejo
 * aunque el archivo traiga mucho margen propio o venga pegado al borde. Si es una foto, o el navegador
 * no deja leer los píxeles, devuelve null y se muestra como foto. */
function analizarLogo(img) {
  try {
    const canvas = document.createElement("canvas");
    canvas.width = N;
    canvas.height = N;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(img, 0, 0, N, N);
    const { data } = ctx.getImageData(0, 0, N, N);
    const px = (x, y) => { const i = (y * N + x) * 4; return [data[i], data[i + 1], data[i + 2], data[i + 3]]; };

    const borde = [];
    let transparentes = 0;
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        if (x > 2 && x < N - 3 && y > 2 && y < N - 3) continue; // solo el anillo exterior de 3 px
        const p = px(x, y);
        if (p[3] < 200) transparentes++;
        else borde.push(p);
      }
    }
    let fondo;
    if (transparentes > borde.length) {
      fondo = [255, 255, 255]; // PNG con fondo transparente: va sobre blanco
    } else {
      fondo = [0, 1, 2].map((c) => borde.map((p) => p[c]).sort((a, b) => a - b)[borde.length >> 1]);
      const parecidos = borde.filter((p) => fondo.every((v, c) => Math.abs(p[c] - v) <= 18)).length;
      if (parecidos / borde.length < 0.85) return null; // foto
    }

    // Recuadro del dibujo: píxeles opacos que se distinguen del fondo. Se ignora el anillo de 3 px,
    // donde algunos archivos traen líneas o sombras en el canto.
    let x0 = N, y0 = N, x1 = -1, y1 = -1;
    for (let y = 3; y < N - 3; y++) {
      for (let x = 3; x < N - 3; x++) {
        const p = px(x, y);
        if (p[3] < 120 || fondo.every((v, c) => Math.abs(p[c] - v) <= 40)) continue;
        if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
      }
    }
    if (x1 < 0) return null; // no se encontró dibujo: mejor mostrarla tal cual
    // Holgura de 4 px por lado: la muestra es más chica que la imagen real, y ese margen es la franja
    // que se difumina para que el recuadro se funda con el fondo
    x0 = Math.max(0, x0 - 4); y0 = Math.max(0, y0 - 4); x1 = Math.min(N - 1, x1 + 4); y1 = Math.min(N - 1, y1 + 4);
    return {
      fondo: `rgb(${fondo.join(",")})`,
      x: x0 / N, y: y0 / N, w: (x1 - x0 + 1) / N, h: (y1 - y0 + 1) / N,
    };
  } catch {
    return null;
  }
}

/* Imagen de la tarjeta del marketplace. Las fotos subidas van de cuadradas a apaisadas, así que:
 * - logo sobre fondo liso: se recorta a su dibujo y se centra con el mismo aire en todas las tarjetas,
 *   sobre el color de su propio fondo (sin uniones ni franjas visibles);
 * - foto: llena el recuadro, priorizando la parte de arriba (la cara).
 * Aparece con un fundido corto una vez analizada, para que no salte de un modo al otro. */
export default function FotoTarjeta({ src, alt, sizes, className = "" }) {
  const [vista, setVista] = useState(null); // { logo, proporcion } una vez cargada

  if (!src) return <FotoPerfil src={src} alt={alt} sizes={sizes} />;

  const alCargar = (e) => {
    const img = e.currentTarget;
    // Solo la primera carga: al ampliar un logo se pide una versión más grande y onLoad vuelve a correr
    setVista((v) => v ?? { logo: analizarLogo(img), proporcion: img.naturalWidth / img.naturalHeight });
  };

  const logo = vista?.logo;
  if (!logo) {
    return (
      <div className={`absolute inset-0 transition-opacity duration-300 ${vista ? "opacity-100" : "opacity-0"}`}>
        <div className={`absolute inset-0 ${className}`}>
          <Image src={src} alt={alt} fill sizes={sizes} onLoad={alCargar} className="object-cover object-[50%_25%]" />
        </div>
      </div>
    );
  }

  // Proporción real del dibujo (en píxeles de la imagen original) y cuánto se amplía respecto del archivo
  const proporcionDibujo = (logo.w / logo.h) * vista.proporcion;
  const ampliacion = 1 / Math.max(logo.w, logo.h);
  return (
    <div className="absolute inset-0" style={{ background: logo.fondo }}>
      <div className={`absolute inset-[11%] ${className}`}>
        {/* Caja con la proporción del dibujo, lo más grande posible dentro del área con aire */}
        {/* Los bordes se desvanecen: el blanco de los archivos comprimidos no es parejo y dejaría ver un recuadro */}
        <div className="absolute left-1/2 top-1/2 max-h-full max-w-full -translate-x-1/2 -translate-y-1/2 overflow-hidden"
          style={{ aspectRatio: proporcionDibujo, [proporcionDibujo >= 5 / 4 ? "width" : "height"]: "100%", ...BORDE_DIFUMINADO }}>
          {/* La imagen completa, desplazada y ampliada para que solo el dibujo quede dentro de la caja */}
          <div className="absolute"
            style={{ width: `${100 / logo.w}%`, height: `${100 / logo.h}%`, left: `${(-logo.x / logo.w) * 100}%`, top: `${(-logo.y / logo.h) * 100}%` }}>
            <Image src={src} alt={alt} fill onLoad={alCargar}
              sizes={ampliacion > 1.3 ? "(max-width:768px) 200vw, 70vw" : sizes} />
          </div>
        </div>
      </div>
    </div>
  );
}
