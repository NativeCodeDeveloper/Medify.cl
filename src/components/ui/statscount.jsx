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
        <h2 className="text-center text-sm font-semibold tracking-wider text-neutral-600 mb-8 uppercase">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="relative text-center">
            <div className="flex flex-col items-center justify-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-2">
                {counts[index]}
                {stat.suffix}
              </div>
              <p className="text-sm md:text-base text-neutral-900/70 max-w-xs">
                {stat.label}
              </p>
            </div>
            {showDividers && index < stats.length - 1 && (
              <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-16 w-px bg-white/10" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
