"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Icon } from "@iconify/react";

const fieldVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * i,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

export default function FormularioContacto() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      nombre: formData.get("nombre"),
      email: formData.get("email"),
      asunto: formData.get("asunto"),
      mensaje: formData.get("mensaje"),
    };

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        const errorMessage = result.error?.message || (typeof result.error === 'string' ? result.error : JSON.stringify(result.error)) || "Error al enviar el mensaje";
        throw new Error(errorMessage);
      }

      setIsSubmitted(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-20">
      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white/5 backdrop-blur-xl border border-[#a855f7]/30 p-12 rounded-3xl text-center shadow-[0_0_50px_rgba(168,85,247,0.15)]"
          >
            <div className="w-24 h-24 bg-[#a855f7]/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <Icon icon="mdi:check-circle" className="text-6xl text-[#a855f7]" />
            </div>
            <h3 className="text-3xl font-bold mb-4 text-white uppercase tracking-tighter">¡Mensaje Enviado!</h3>
            <p className="text-gray-400 mb-8 text-lg">
              Gracias por contactarme. Te responderé lo antes posible.
            </p>
            <button 
              onClick={() => setIsSubmitted(false)}
              className="relative z-10 cursor-pointer text-[#a855f7] hover:text-[#a855f7]/80 font-bold uppercase tracking-widest text-xs transition-colors"
            >
              Enviar otro mensaje
            </button>
          </motion.div>
        ) : (
          <motion.div 
            key="form"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8 }}
            className="bg-[#111] border border-white/10 p-8 md:p-12 rounded-3xl w-full shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)]"
          >
            <div className="mb-12 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 italic tracking-tighter">TRABAJEMOS <span className="text-[#a855f7]">JUNTOS</span></h2>
              <p className="text-gray-400 text-lg">¿Tienes un proyecto en mente? Cuéntame los detalles.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nombre */}
                <motion.div custom={0} variants={fieldVariants} initial="hidden" animate="visible">
                  <label htmlFor="nombre" className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 ml-1">Nombre</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-500 group-focus-within:text-[#a855f7] transition-colors">
                      <Icon icon="mdi:account-outline" className="text-xl" />
                    </div>
                    <input 
                      id="nombre"
                      name="nombre"
                      type="text" 
                      required
                      placeholder="Ej. Juan Pérez"
                      className="w-full bg-black/40 border border-white/5 rounded-2xl py-5 pl-14 pr-4 text-white placeholder:text-gray-700 focus:outline-none focus:border-[#a855f7]/50 focus:bg-black/60 transition-all duration-300"
                    />
                  </div>
                </motion.div>

                {/* Email */}
                <motion.div custom={1} variants={fieldVariants} initial="hidden" animate="visible">
                  <label htmlFor="email" className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 ml-1">Correo Electrónico</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-500 group-focus-within:text-[#a855f7] transition-colors">
                      <Icon icon="mdi:email-outline" className="text-xl" />
                    </div>
                    <input 
                      id="email"
                      name="email"
                      type="email" 
                      required
                      placeholder="tu@email.com"
                      className="w-full bg-black/40 border border-white/5 rounded-2xl py-5 pl-14 pr-4 text-white placeholder:text-gray-700 focus:outline-none focus:border-[#a855f7]/50 focus:bg-black/60 transition-all duration-300"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Asunto */}
              <motion.div custom={2} variants={fieldVariants} initial="hidden" animate="visible">
                <label htmlFor="asunto" className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 ml-1">Asunto</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-500 group-focus-within:text-[#a855f7] transition-colors">
                    <Icon icon="mdi:bookmark-outline" className="text-xl" />
                  </div>
                  <input 
                    id="asunto"
                    name="asunto"
                    type="text" 
                    required
                    placeholder="Ej. Desarrollo de Web App"
                    className="w-full bg-black/40 border border-white/5 rounded-2xl py-5 pl-14 pr-4 text-white placeholder:text-gray-700 focus:outline-none focus:border-[#a855f7]/50 focus:bg-black/60 transition-all duration-300"
                  />
                </div>
              </motion.div>

              {/* Mensaje */}
              <motion.div custom={3} variants={fieldVariants} initial="hidden" animate="visible">
                <label htmlFor="mensaje" className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 ml-1">Mensaje</label>
                <div className="relative group">
                  <div className="absolute top-5 left-5 pointer-events-none text-gray-500 group-focus-within:text-[#a855f7] transition-colors">
                    <Icon icon="mdi:text-box-outline" className="text-xl" />
                  </div>
                  <textarea 
                    id="mensaje"
                    name="mensaje"
                    rows={5}
                    required
                    placeholder="Describe brevemente tus necesidades..."
                    className="w-full bg-black/40 border border-white/5 rounded-2xl py-5 pl-14 pr-4 text-white placeholder:text-gray-700 focus:outline-none focus:border-[#a855f7]/50 focus:bg-black/60 transition-all duration-300 resize-none"
                  />
                </div>
              </motion.div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm flex items-center gap-2"
                >
                  <Icon icon="mdi:alert-circle-outline" className="text-lg" />
                  {error}
                </motion.div>
              )}

              {/* Botón Envío */}
              <motion.div custom={4} variants={fieldVariants} initial="hidden" animate="visible" className="pt-4">
                <button 
                  type="submit" 
                  disabled={loading}
                  className={`group w-full relative z-10 h-[70px] flex items-center justify-center gap-3 cursor-pointer bg-[#a855f7] hover:bg-[#a855f7]/90 text-white font-black rounded-2xl shadow-[0_10px_30px_-10px_rgba(168,85,247,0.5)] hover:shadow-[0_15px_40px_-5px_rgba(168,85,247,0.6)] transition-all duration-300 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed`}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <Icon icon="mdi:loading" className="animate-spin text-2xl" />
                      <span className="uppercase tracking-widest text-sm">PROCESANDO...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="uppercase tracking-widest text-md">ENVIAR MENSAJE</span>
                      <Icon icon="mdi:arrow-right" className="text-2xl transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  )}
                </button>
              </motion.div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
