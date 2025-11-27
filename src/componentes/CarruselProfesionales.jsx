"use client"
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

export default function CarruselProfesionales({ images, autoPlayInterval = 4000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Navegación
  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [images.length, isTransitioning]);

  const goToPrevious = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [images.length, isTransitioning]);

  const goToSlide = useCallback((index) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [currentIndex, isTransitioning]);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      goToNext();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, autoPlayInterval, goToNext]);

  // Teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === " ") {
        e.preventDefault();
        setIsAutoPlaying((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrevious]);

  return (
    <div 
      className="relative w-full group"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Carrusel Principal */}
      <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-2xl md:rounded-3xl ring-1 ring-white/10 shadow-2xl">
        {/* Imágenes */}
        <div className="relative w-full h-full">
          {images.map((img, index) => {
            const isActive = index === currentIndex;
            const isPrev = index === (currentIndex - 1 + images.length) % images.length;
            const isNext = index === (currentIndex + 1) % images.length;

            return (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  isActive
                    ? "opacity-100 scale-100 z-20"
                    : isPrev || isNext
                    ? "opacity-0 scale-95 z-10"
                    : "opacity-0 scale-90 z-0"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 1024px) 1200px, 100vw"
                  className={`object-cover transition-transform duration-700 ${
                    isActive ? "scale-100" : "scale-110"
                  }`}
                  priority={index === 0}
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Información */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 lg:p-14">
                  <div className={`transform transition-all duration-700 delay-150 ${
                    isActive ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                      {img.name}
                    </h3>
                    <p className="text-base md:text-lg lg:text-xl text-white/90 mb-1">
                      {img.role}
                    </p>
                    {img.description && (
                      <p className="text-sm md:text-base text-white/75 max-w-2xl">
                        {img.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Controles de Navegación */}
        <button
          onClick={goToPrevious}
          disabled={isTransitioning}
          className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 md:p-4 rounded-full ring-1 ring-white/20 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <button
          onClick={goToNext}
          disabled={isTransitioning}
          className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 md:p-4 rounded-full ring-1 ring-white/20 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Control Play/Pause */}
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="absolute top-4 md:top-6 right-4 md:right-6 z-30 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-2.5 md:p-3 rounded-full ring-1 ring-white/20 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95"
          aria-label={isAutoPlaying ? "Pausar" : "Reproducir"}
        >
          {isAutoPlaying ? (
            <Pause className="w-4 h-4 md:w-5 md:h-5" />
          ) : (
            <Play className="w-4 h-4 md:w-5 md:h-5" />
          )}
        </button>
      </div>

      {/* Indicadores (Dots) */}
      <div className="flex justify-center items-center gap-2 md:gap-3 mt-6">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? "w-8 md:w-10 h-2 md:h-2.5 bg-blue-400"
                : "w-2 md:w-2.5 h-2 md:h-2.5 bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Ir a imagen ${index + 1}`}
          />
        ))}
      </div>

      {/* Contador */}
      <div className="text-center mt-4 text-neutral-900/60 text-sm md:text-base">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
