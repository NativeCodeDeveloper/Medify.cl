"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

export function FeatureSteps({
  features,
  className,
  title = "Cómo Empezar",
  autoPlayInterval = 3000,
  imageHeight = "h-[400px]",
  // corners accepts an object to set each corner's radius individually
  // e.g. { tl: '12px', tr: '0px', br: '24px', bl: '0px' }
  corners = { tl: '224px', tr: '0px', br: '0px', bl: '0px' },
  // textCorners for the text container (steps list)
  textCorners = { tl: '0px', tr: '0px', br: '0px', bl: '0px' },
}) {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [progress, setProgress] = useState(0)

  const borderRadius = `${corners.tl} ${corners.tr} ${corners.br} ${corners.bl}`
  const textBorderRadius = `${textCorners.tl} ${textCorners.tr} ${textCorners.br} ${textCorners.bl}`

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (autoPlayInterval / 100))
      } else {
        setCurrentFeature((prev) => (prev + 1) % features.length)
        setProgress(0)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [progress, features.length, autoPlayInterval])

  return (
    <div className={cn("p-8 md:p-12", className)}>
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10 text-center">
          {title}
        </h2>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 relative">
          <div 
            className="order-2 md:order-1 space-y-6 p-4 md:p-6 lg:p-8 bg-white"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-6 md:gap-8"
                initial={{ opacity: 0.3 }}
                animate={{ opacity: index === currentFeature ? 1 : 0.3 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className={cn(
                    "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2",
                    index === currentFeature
                      ? "bg-white-900 border-blue-800 text-blue-400 scale-110"
                      : "bg-white/10 border-white/30 text-white/60",
                  )}
                >
                  {index <= currentFeature ? (
                    <span className="text-lg font-bold">✓</span>
                  ) : (
                    <span className="text-lg font-semibold">{index + 1}</span>
                  )}
                </motion.div>

                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-semibold text-blue-900">
                    {feature.title || feature.step}
                  </h3>
                  <p className="text-sm md:text-lg text-neutral-900/70">
                    {feature.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div
            className={cn(
              "order-1 md:order-2 relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[450px] overflow-hidden rounded-2xl md:rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_50px_rgba(37,99,235,0.12)] transition-all duration-500"
            )}
          >
            <AnimatePresence mode="wait">
              {features.map(
                (feature, index) =>
                  index === currentFeature && (
                    <motion.div
                      key={index}
                      className="absolute inset-0 overflow-hidden rounded-2xl md:rounded-3xl"
                      initial={{ y: 100, opacity: 0, rotateX: -20 }}
                      animate={{ y: 0, opacity: 1, rotateX: 0 }}
                      exit={{ y: -100, opacity: 0, rotateX: 20 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <Image
                        src={feature.image}
                        alt={feature.step}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                        className="object-cover transition-transform duration-700 hover:scale-105 rounded-2xl md:rounded-3xl"
                        priority={index === 0}
                        quality={90}
                      />
                      <div 
                        className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-white/100 via-white/30 to-transparent rounded-b-2xl md:rounded-b-3xl" 
                      />
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
