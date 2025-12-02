"use client"
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function CarruselInfinito({ especialidades }) {
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carruselRef = useRef(null);

  // Duplicamos el array para crear el efecto infinito sin cortes
  const itemsDuplicados = [...especialidades, ...especialidades, ...especialidades];

  // Centrar el carrusel al inicio para que se vea completo
  useEffect(() => {
    if (carruselRef.current) {
      // Scroll inicial para centrar el contenido
      const scrollPosition = carruselRef.current.scrollWidth / 3;
      carruselRef.current.scrollLeft = scrollPosition;
    }
  }, []);

  // Auto-scroll suave
  useEffect(() => {
    if (isPaused || !carruselRef.current) return;

    const scrollSpeed = 0.5; // píxeles por frame
    let animationId;

    const autoScroll = () => {
      if (carruselRef.current && !isPaused) {
        carruselRef.current.scrollLeft += scrollSpeed;
        
        // Reset cuando llegamos al final del segundo grupo
        const maxScroll = carruselRef.current.scrollWidth / 3 * 2;
        if (carruselRef.current.scrollLeft >= maxScroll) {
          carruselRef.current.scrollLeft = carruselRef.current.scrollWidth / 3;
        }
      }
      animationId = requestAnimationFrame(autoScroll);
    };

    animationId = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  // Manejar inicio del arrastre
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setIsPaused(true);
    setStartX(e.pageX - carruselRef.current.offsetLeft);
    setScrollLeft(carruselRef.current.scrollLeft);
    carruselRef.current.style.cursor = 'grabbing';
  };

  // Manejar fin del arrastre
  const handleMouseUp = () => {
    setIsDragging(false);
    carruselRef.current.style.cursor = 'grab';
    // Reanudar después de 2 segundos
    setTimeout(() => setIsPaused(false), 2000);
  };

  // Manejar movimiento del arrastre
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carruselRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Multiplicador para velocidad de arrastre
    carruselRef.current.scrollLeft = scrollLeft - walk;
  };

  // Manejar cuando el mouse sale del área
  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      carruselRef.current.style.cursor = 'grab';
    }
    if (!isDragging) {
      setIsPaused(false);
    }
  };

  return (
    <div className="w-full py-8">
      {/* Carrusel Principal - Una sola fila */}
      <div 
        className="relative overflow-hidden -mx-6 sm:-mx-8 md:-mx-12 lg:-mx-16"
        onMouseEnter={() => !isDragging && setIsPaused(true)}
        onMouseLeave={handleMouseLeave}
      >
        <div 
          ref={carruselRef}
          className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide px-6 sm:px-8 md:px-12 lg:px-16"
          style={{ 
            cursor: 'grab', 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            willChange: 'transform',
            transform: 'translateZ(0)'
          }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {itemsDuplicados.map((especialidad, index) => (
            <div
              key={`especialidad-${index}`}
              className="flex-shrink-0 w-80 md:w-96 lg:w-[450px] group"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_50px_rgba(37,99,235,0.15)] transition-all duration-500 hover:scale-[1.02]">
                {/* Imagen */}
                <Image
                  src={especialidad.imagen}
                  alt={especialidad.nombre}
                  fill
                  sizes="(min-width: 1024px) 450px, (min-width: 768px) 384px, 320px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  quality={85}
                />
                
                {/* Gradient overlay - Oscuro y sutil */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

                {/* Contenido */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  {/* Título */}
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 tracking-tight">
                    {especialidad.nombre}
                  </h3>
                  
                  {/* Descripción */}
                  <p className="text-blue-100/90 text-base md:text-lg mb-4 leading-relaxed">
                    {especialidad.descripcion}
                  </p>
                  
                  {/* Tecnologías - Pills profesionales */}
                  {especialidad.tecnologias && especialidad.tecnologias.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {especialidad.tecnologias.slice(0, 3).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-lg bg-blue-600/30 backdrop-blur-md text-white text-xs md:text-sm font-medium shadow-lg hover:bg-blue-500/40 transition-all duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {especialidad.tecnologias.length > 3 && (
                        <span className="px-3 py-1.5 rounded-lg bg-blue-600/30 backdrop-blur-md text-white text-xs md:text-sm font-medium shadow-lg">
                          +{especialidad.tecnologias.length - 3} más
                        </span>
                      )}
                    </div>
                  )}

                  {/* Barra de acento inferior */}
                  <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Efecto de brillo al hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-400/0 to-transparent group-hover:via-blue-400/10 transition-all duration-700 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>

        {/* Fade gradients en los bordes - Sutiles y profesionales */}
        <div className="absolute top-0 left-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-white via-white/60 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-white via-white/60 to-transparent z-10 pointer-events-none" />
      </div>

      {/* Indicador profesional */}
      <div className="text-center mt-8 text-blue-400/60 text-sm font-medium tracking-wider uppercase">
        {isDragging ? "↔ Arrastrando" : isPaused ? "◼ Arrastra para explorar" : "▶ Desplazamiento automático"}
      </div>

      {/* CSS para scrollbar oculto */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
