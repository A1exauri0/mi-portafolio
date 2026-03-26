"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function SobreHero() {
  return (
    <section className="py-20 flex flex-col items-center text-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden border-2 border-purple-500/30 rotate-3 hover:rotate-0 transition-transform duration-500 mb-10 shadow-[0_0_40px_rgba(168,85,247,0.15)]"
      >
        <Image 
          src="/mi-foto.png" 
          alt="Adrián Vázquez" 
          fill
          className="object-cover"
          unoptimized
        />
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-6xl font-bold tracking-tighter mb-6"
      >
        Hola, soy <span className="text-purple-500">Adrián Vázquez</span>
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed font-light"
      >
        Un desarrollador <span className="text-white font-medium">Full Stack</span> apasionado por la tecnología 
        y los retos complejos. Me especializo en crear aplicaciones web escalables, intuitivas 
        y con un enfoque obsesivo por los detalles y la experiencia de usuario.
      </motion.p>
    </section>
  );
}
