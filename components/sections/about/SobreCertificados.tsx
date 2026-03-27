"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Icon } from "@iconify/react";
import certificados from "@/data/certificados.json";

export default function SobreCertificados() {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % certificados.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + certificados.length) % certificados.length);
  };

  return (
    <section className="py-24 px-6 max-w-6xl mx-auto w-full overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
          Mis <span className="text-purple-500">Certificaciones</span>
        </h2>
        <p className="text-gray-400 font-light max-w-2xl mx-auto italic">
          Validación continua de mis conocimientos y compromiso con la excelencia profesional.
        </p>
      </div>

      <div className="relative group max-w-5xl mx-auto">
        {/* Contenedor del Carrusel - Altura Reducida */}
        <div className="relative h-[320px] md:h-[400px] w-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={certificados[index].id}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.9 }}
              transition={{ duration: 0.5, ease: "anticipate" }}
              className="absolute inset-0 flex flex-col md:flex-row items-center gap-8 md:gap-12 p-4"
            >
              {/* Imagen del Certificado - Proporción Ajustada */}
              <div className="w-full md:w-[45%] h-full relative group/img overflow-hidden rounded-2xl border border-white/5 shadow-xl bg-[#111]">
                <Image
                  src={certificados[index].imagen}
                  alt={certificados[index].titulo}
                  fill
                  className="object-contain p-2 group-hover/img:scale-105 transition-transform duration-700"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>

              {/* Información del Certificado */}
              <div className="w-full md:w-1/2 flex flex-col justify-center text-left">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-purple-500 mb-4 block">
                  {certificados[index].emisor} • {certificados[index].fecha}
                </span>
                <h3 className="text-2xl md:text-4xl font-bold mb-6 text-white leading-tight">
                  {certificados[index].titulo}
                </h3>
                <p className="text-gray-400 text-lg font-light leading-relaxed mb-8 italic">
                  "{certificados[index].descripcion}"
                </p>
                
                {/* Indicadores de posición */}
                <div className="flex gap-2">
                  {certificados.map((_, i) => (
                    <div 
                      key={i}
                      className={`h-1 rounded-full transition-all duration-500 ${i === index ? 'w-8 bg-purple-500' : 'w-2 bg-white/10'}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controles de Navegación - Reposicionados y con efecto de click */}
        <motion.button
          onClick={prev}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-[#111]/80 border border-white/10 text-white backdrop-blur-md hover:border-purple-500/50 transition-all opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center shadow-lg cursor-pointer"
          aria-label="Anterior"
        >
          <Icon icon="material-symbols:chevron-left-rounded" width="28" height="28" />
        </motion.button>
        <motion.button
          onClick={next}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-[#111]/80 border border-white/10 text-white backdrop-blur-md hover:border-purple-500/50 transition-all opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center shadow-lg cursor-pointer"
          aria-label="Siguiente"
        >
          <Icon icon="material-symbols:chevron-right-rounded" width="28" height="28" />
        </motion.button>
        
        {/* Controles Mobile */}
        <div className="flex justify-center gap-4 mt-8 md:hidden">
          <button onClick={prev} className="p-3 rounded-full bg-white/5 border border-white/10"><Icon icon="material-symbols:chevron-left-rounded" width="24" height="24" /></button>
          <button onClick={next} className="p-3 rounded-full bg-white/5 border border-white/10"><Icon icon="material-symbols:chevron-right-rounded" width="24" height="24" /></button>
        </div>
      </div>
    </section>
  );
}
