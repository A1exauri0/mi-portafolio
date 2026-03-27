"use client";

import { motion } from "framer-motion";

export default function SobreMi() {
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto relative z-10 w-full text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-fuchsia-500">
          Sobre Mí
        </h2>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          Conoce un poco más sobre mi experiencia y las herramientas que utilizo para transformar ideas en realidades digitales.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tarjeta de Biografía - Ocupa 2 columnas en pantallas grandes */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="md:col-span-2 bg-[#111] border border-white/10 rounded-3xl p-8 hover:border-purple-500/30 transition-colors shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-purple-500/20 transition-all duration-700" />
          <h3 className="text-2xl font-bold mb-4 text-purple-300">Mi Trayectoria</h3>
          <p className="text-gray-300 leading-relaxed">
            Soy un desarrollador Full Stack apasionado por construir interfaces atractivas y sistemas robustos. 
            Me enfoco en crear soluciones eficientes, escalables y con una gran atención al detalle tanto en el frontend como en el backend.
            Disfruto resolviendo problemas complejos y aprendiendo nuevas tecnologías constantemente.
          </p>
        </motion.div>

        {/* Tarjeta de Stack Tecnológico Principal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gradient-to-br from-purple-900/40 to-[#111] border border-purple-500/20 rounded-3xl p-8 hover:border-purple-400/50 transition-colors flex flex-col justify-center items-center text-center shadow-2xl"
        >
          <h3 className="text-xl font-bold mb-6 text-white">Stack Principal</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {['Vue.js', 'React', 'Next.js', 'Laravel', 'Tailwind CSS'].map((tech) => (
              <span key={tech} className="px-3 py-1.5 bg-black/50 border border-white/5 rounded-full text-sm font-medium text-gray-300">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Tarjeta de Experiencia y Filosofía */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="md:col-span-3 bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 hover:border-fuchsia-500/20 transition-all shadow-xl"
        >
          <h3 className="text-xl font-bold mb-4 text-fuchsia-300 text-center md:text-left">Enfoque y Filosofía</h3>
          <p className="text-gray-400 text-center md:text-left">
            Creo en el desarrollo de software que no solo cumple con los requisitos técnicos, sino que también ofrece una experiencia de usuario excepcional. Cada línea de código es una oportunidad para optimizar, innovar y dejar una huella de calidad.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
