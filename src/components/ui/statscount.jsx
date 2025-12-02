"use client";

import { useEffect, useRef, useState } from "react";

export default function StatsCount({ stats, title, showDividers = true, className = "" }) {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            stats.forEach((stat, index) => {
              animateCount(stat.value, index);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated, stats]);

  const animateCount = (target, index) => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(current + increment, target);

      setCounts((prev) => {
        const newCounts = [...prev];
        newCounts[index] = Math.floor(current);
        return newCounts;
      });

      if (step >= steps || current >= target) {
        clearInterval(timer);
        setCounts((prev) => {
          const newCounts = [...prev];
          newCounts[index] = target;
          return newCounts;
        });
      }
    }, duration / steps);
  };

  return (
    <div ref={sectionRef} className={`w-full ${className}`}>
      {title && (
        <h2 className="text-center text-sm font-bold tracking-widest text-blue-600/80 mb-12 uppercase">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-12">
        {stats.map((stat, index) => (
          <div key={index} className="relative text-center group">
            <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-gradient-to-br from-white via-blue-50/30 to-teal-50/20 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105">
              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Counter */}
              <div className="relative text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent mb-3">
                {counts[index]}
                {stat.suffix}
              </div>
              
              {/* Label */}
              <p className="relative text-sm md:text-base lg:text-lg text-neutral-700 font-medium max-w-xs leading-relaxed">
                {stat.label}
              </p>
              
              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            
            {showDividers && index < stats.length - 1 && (
              <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-20 w-px bg-gradient-to-b from-transparent via-blue-200 to-transparent" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
