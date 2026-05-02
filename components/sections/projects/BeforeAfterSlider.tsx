"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface BeforeAfterSliderProps {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfterSlider({ 
  before, 
  after, 
  beforeLabel = "Antes", 
  afterLabel = "Después" 
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };

  const onMouseDown = () => setIsDragging(true);
  const onMouseUp = () => setIsDragging(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) handleMove(e.clientX);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) handleMove(e.touches[0].clientX);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", onMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl select-none cursor-col-resize group bg-[#111]"
      onMouseDown={onMouseDown}
      onTouchStart={onMouseDown}
    >
      {/* Imagen Después (Fondo) */}
      <Image
        src={after}
        alt="Después"
        fill
        className="object-cover"
        priority
        unoptimized
      />

      {/* Imagen Antes (Capa Superior con clip-path) */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={before}
          alt="Antes"
          fill
          className="object-cover"
          priority
          unoptimized
        />
      </div>

      {/* Slider Line & Handle */}
      <div 
        className="absolute inset-y-0 z-20 w-1 bg-white/50 backdrop-blur-sm -translate-x-1/2 flex items-center justify-center"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="w-10 h-10 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.5)] flex items-center justify-center group-hover:scale-110 transition-transform">
          <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 9l-4 3 4 3m8-6l4 3-4 3" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-6 left-6 z-30 px-4 py-1.5 bg-black/60 backdrop-blur-xl rounded-full text-xs font-bold uppercase tracking-[0.2em] text-white border border-white/10 shadow-lg transition-opacity group-hover:opacity-100">
        {beforeLabel}
      </div>
      <div className="absolute top-6 right-6 z-30 px-4 py-1.5 bg-black/60 backdrop-blur-xl rounded-full text-xs font-bold uppercase tracking-[0.2em] text-white border border-white/20 shadow-lg transition-opacity group-hover:opacity-100">
        {afterLabel}
      </div>

      {/* Glassmorphism instructions overlay (fades out when interacting) */}
      {!isDragging && sliderPosition === 50 && (
        <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none transition-opacity duration-500">
          <div className="bg-black/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 text-white/70 text-sm font-medium animate-pulse">
            Desliza para comparar
          </div>
        </div>
      )}
    </div>
  );
}
