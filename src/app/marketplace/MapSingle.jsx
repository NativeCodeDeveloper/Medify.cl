"use client";
import { useEffect, useRef } from "react";

export default function MapSingle({ lat, lng, nombre, imagen_url, direccion }) {
  const containerRef = useRef(null);
  const mapRef       = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !lat || !lng) return;

    let cancelled = false;

    import("leaflet").then((L) => {
      if (cancelled || !containerRef.current || mapRef.current) return;

      delete L.default.Icon.Default.prototype._getIconUrl;
      L.default.Icon.Default.mergeOptions({
        iconUrl:       "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl:     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.default.map(containerRef.current, {
        center: [lat, lng],
        zoom: 15,
        zoomControl: true,
        scrollWheelZoom: false,
      });

      L.default.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map);

      /* Marcador circular con foto del profesional */
      const icon = L.default.divIcon({
        className: "",
        html: `
          <div style="
            width:52px;height:52px;border-radius:50%;
            border:3px solid #00C853;overflow:hidden;
            box-shadow:0 3px 12px rgba(0,0,0,.25);background:#f5f5f7;
          ">
            <img
              src="${imagen_url || "/doctores1.png"}"
              alt="${nombre}"
              style="width:100%;height:100%;object-fit:cover;object-position:top;"
              onerror="this.style.display='none'"
            />
          </div>`,
        iconSize: [52, 52],
        iconAnchor: [26, 26],
        popupAnchor: [0, -32],
      });

      L.default.marker([lat, lng], { icon })
        .addTo(map)
        .bindPopup(`
          <div style="font-family:inherit;padding:4px 2px;min-width:140px;">
            <strong style="font-size:13px;color:#1d1d1f;">${nombre}</strong><br/>
            <span style="font-size:11px;color:#6e6e73;">${direccion || ""}</span>
          </div>`, { maxWidth: 200 })
        .openPopup();

      mapRef.current = map;
    });

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [lat, lng, nombre, imagen_url, direccion]);

  if (!lat || !lng) return null;

  return (
    <>
      <style>{`
        .leaflet-popup-content-wrapper{border-radius:12px!important;box-shadow:0 4px 20px rgba(0,0,0,.12)!important;}
        .leaflet-popup-tip-container{display:none;}
      `}</style>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" crossOrigin="" />
      <div ref={containerRef} style={{ height: "100%", width: "100%", minHeight: "320px" }} />
    </>
  );
}
