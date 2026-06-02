"use client";
import { useEffect, useRef } from "react";

const PROFESSIONAL_PINS = [
  { lat: -36.6065, lng: -72.1031, nombre: "Dennis Beltrán",    especialidad: "Psicóloga",              imagen: "/dennisbeltran.png",  id: "dennis-beltran"  },
  { lat: -36.6100, lng: -72.0980, nombre: "Marcelo Vilches",   especialidad: "Tecnólogo Médico",       imagen: "/marcelovilches.png", id: "marcelo-vilches" },
  { lat: -36.6050, lng: -72.1060, nombre: "Cristian Becerra",  especialidad: "Med. Complementaria",    imagen: "/cristianbecerra.png",id: "cristian-becerra"},
  { lat: -33.4372, lng: -70.6506, nombre: "Javiera Carreño",   especialidad: "Enfermera",              imagen: "/doctores1.png",      id: "javiera-carreno" },
  { lat: -33.4092, lng: -70.5783, nombre: "Pedro Suazo",       especialidad: "Psiquiatra",             imagen: "/doctores1.png",      id: "pedro-suazo"     },
  { lat: -33.0458, lng: -71.6197, nombre: "Daniel Muñoz",      especialidad: "Médico General",         imagen: "/doctores1.png",      id: "daniel-munoz"    },
];

export default function MapLeaflet({ userCoords }) {
  const containerRef  = useRef(null);
  const mapRef        = useRef(null);   // instancia Leaflet
  const userMarkerRef = useRef(null);   // marcador de ubicación del usuario

  /* ── Inicialización: solo una vez al montar ─────────────────────────── */
  useEffect(() => {
    if (!containerRef.current) return;

    let cancelled = false;

    import("leaflet").then((L) => {
      if (cancelled || !containerRef.current) return;

      /* Evita doble init si por algún motivo el efecto corre dos veces */
      if (mapRef.current) return;

      delete L.default.Icon.Default.prototype._getIconUrl;
      L.default.Icon.Default.mergeOptions({
        iconUrl:       "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl:     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.default.map(containerRef.current, {
        center: [-35.0, -71.0],
        zoom: 5,
        zoomControl: true,
        scrollWheelZoom: false,
      });

      L.default.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map);

      PROFESSIONAL_PINS.forEach((pin) => {
        const icon = L.default.divIcon({
          className: "",
          html: `
            <div style="
              width:44px;height:44px;border-radius:50%;
              border:3px solid #00C853;overflow:hidden;
              box-shadow:0 2px 10px rgba(0,0,0,.25);background:#f5f5f7;
            ">
              <img src="${pin.imagen}" alt="${pin.nombre}"
                style="width:100%;height:100%;object-fit:cover;object-position:top;"
                onerror="this.style.display='none'"
              />
            </div>`,
          iconSize: [44, 44],
          iconAnchor: [22, 22],
          popupAnchor: [0, -28],
        });

        L.default.marker([pin.lat, pin.lng], { icon })
          .addTo(map)
          .bindPopup(`
            <div style="font-family:inherit;padding:4px 2px;min-width:140px;">
              <strong style="font-size:13px;color:#1d1d1f;">${pin.nombre}</strong><br/>
              <span style="font-size:11px;color:#6e6e73;">${pin.especialidad}</span><br/>
              <a href="/marketplace/${pin.id}"
                style="display:inline-block;margin-top:6px;font-size:11px;font-weight:600;color:#00C853;">
                Ver perfil →
              </a>
            </div>`, { maxWidth: 180 });
      });

      mapRef.current = map;
    });

    /* Cleanup: destruye el mapa al desmontar el componente */
    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        userMarkerRef.current = null;
      }
    };
  }, []); // sin dependencias → corre solo al montar/desmontar

  /* ── Actualización de ubicación del usuario (sin recrear el mapa) ───── */
  useEffect(() => {
    if (!userCoords || !mapRef.current) return;

    import("leaflet").then((L) => {
      if (!mapRef.current) return;

      /* Elimina marcador anterior si existe */
      if (userMarkerRef.current) {
        userMarkerRef.current.remove();
        userMarkerRef.current = null;
      }

      const userIcon = L.default.divIcon({
        className: "",
        html: `
          <div style="position:relative;width:20px;height:20px;">
            <div style="
              position:absolute;inset:0;border-radius:50%;
              background:rgba(0,200,83,.25);
              animation:medify-ping 1.5s ease-in-out infinite;
            "></div>
            <div style="
              position:relative;width:20px;height:20px;border-radius:50%;
              background:#00C853;border:3px solid white;
              box-shadow:0 1px 6px rgba(0,0,0,.3);
            "></div>
          </div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      const marker = L.default.marker([userCoords.lat, userCoords.lng], { icon: userIcon })
        .addTo(mapRef.current)
        .bindPopup("Tu ubicación");

      userMarkerRef.current = marker;
      mapRef.current.flyTo([userCoords.lat, userCoords.lng], 12, { duration: 1.2 });
    });
  }, [userCoords]); // solo reacciona al cambio de coordenadas

  return (
    <>
      <style>{`
        @keyframes medify-ping {
          0%,100%{transform:scale(1);opacity:.6}
          50%{transform:scale(1.8);opacity:0}
        }
        .leaflet-popup-content-wrapper{
          border-radius:12px!important;
          box-shadow:0 4px 20px rgba(0,0,0,.12)!important;
        }
        .leaflet-popup-tip-container{ display:none; }
      `}</style>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        crossOrigin=""
      />
      <div ref={containerRef} style={{ height: "100%", width: "100%", minHeight: "400px" }} />
    </>
  );
}
