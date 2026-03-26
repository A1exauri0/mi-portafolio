"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const hobbies = [
  {
    titulo: "Mi Fe y Valores",
    subtitulo: "El pilar de mi vida",
    descripcion: "Como católico, mi fe es la brújula que guía mis acciones y decisiones. Los valores de integridad, servicio y perseverancia que aprendo en mi camino espiritual se reflejan en la dedicación y honestidad con la que abordo cada proyecto de software.",
    imagen: "/images/hobbies/fe-catolica.png",
    reverse: false
  },
  {
    titulo: "Pasión por el Gaming",
    subtitulo: "Estrategia y Acción",
    descripcion: "Desde la estrategia meticulosa en Clash Royale y Clash of Clans hasta la adrenalina de Marvel Rivals y el legado legendario de Halo. Los videojuegos son para mí una forma de desafiar el pensamiento lógico y la coordinación en equipo.",
    imagen: "/images/hobbies/games.png",
    reverse: true
  },
  {
    titulo: "Estilo de Vida y Fitness",
    subtitulo: "Disciplina y Energía",
    descripcion: "El gimnasio no es solo ejercicio físico; es el motor que mantiene mi enfoque y disciplina al máximo. Entrenar a diario me ayuda a despejar la mente y fortalecer la determinación.",
    imagen: "/images/hobbies/gym.png",
    reverse: false
  }
];

export default function SobreGustos() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto w-full overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-bold mb-20 text-center tracking-tight"
      >
        Más allá del <span className="text-purple-500">código</span>
      </motion.h2>

      <div className="space-y-32">
        {hobbies.map((hobby, i) => (
          <div
            key={i}
            className={`flex flex-col ${hobby.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-20`}
          >
            {/* Imagen con marco decorativo */}
            <motion.div 
              initial={{ opacity: 0, x: hobby.reverse ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full md:w-1/2 relative group flex justify-center"
            >
              <div className="relative w-fit overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                <Image 
                  src={hobby.imagen} 
                  alt={hobby.titulo} 
                  width={800}
                  height={450}
                  className="w-auto h-auto max-h-[500px] group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100 block" 
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/40 via-transparent to-transparent pointer-events-none" />
              </div>
              {/* Adorno estético */}
              <div className={`absolute -inset-4 border border-purple-500/20 rounded-[40px] -z-10 group-hover:border-purple-500/40 transition-colors duration-500 ${hobby.reverse ? '-rotate-2' : 'rotate-2'} hidden md:block`} />
            </motion.div>

            {/* Texto */}
            <motion.div
              initial={{ opacity: 0, x: hobby.reverse ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="w-full md:w-1/2 text-left"
            >
              <span className="text-sm font-bold uppercase tracking-[0.3em] text-purple-500 mb-4 block">
                {hobby.subtitulo}
              </span>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white leading-tight">
                {hobby.titulo}
              </h3>
              <p className="text-gray-400 text-lg font-light leading-relaxed">
                {hobby.descripcion}
              </p>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
