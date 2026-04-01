"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { useLanguage } from "@/components/providers/LanguageContext";
import colaboradoresDic from "@/data/colaboradores.json";

export interface Colaborador {
  id: string;
  role: string;
}

interface ModalColaboradoresProps {
  isOpen: boolean;
  onClose: () => void;
  colaboradores: Colaborador[];
}

export default function ModalColaboradores({ isOpen, onClose, colaboradores }: ModalColaboradoresProps) {
  const { t } = useLanguage();

  // Bloquear el scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-pointer"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`relative w-full ${colaboradores.length === 1 ? 'max-w-md' : 'max-w-2xl'} bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden cursor-default`}
          onClick={(e) => e.stopPropagation()} // Evita que se cierre al hacer click dentro del modal
        >
          {/* Encabezado del Modal */}
          <div className="relative border-b border-white/5 bg-white/[0.02] px-8 py-6 flex items-center justify-between">
            <h3 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 flex items-center gap-3">
              <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {t("projects.collaborators")}
            </h3>
            
            {/* Botón de cierre */}
            <button
              className="text-gray-500 hover:text-white bg-transparent hover:bg-white/10 rounded-full p-2 transition-colors"
              onClick={onClose}
              title={t("gallery.close") || "Cerrar"}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cuadrícula de Contenido */}
          <div className="p-8 pb-10">
            {colaboradores.length > 0 ? (
              <div className={`grid gap-6 ${colaboradores.length === 1 ? 'grid-cols-1 max-w-sm mx-auto' : 'grid-cols-1 sm:grid-cols-2'}`}>
                {colaboradores.map((colaborador, idx) => {
                  const data = (colaboradoresDic as Record<string, {name: string, photo: string}>)[colaborador.id] 
                    || { name: colaborador.id, photo: '' };
                  
                  return (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-4 bg-white/5 border border-white/5 rounded-2xl p-4 hover:bg-white/10 transition-colors group"
                    >
                      <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 flex-shrink-0">
                        {data.photo ? (
                          <Image
                            src={data.photo}
                            alt={data.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-bold text-xl uppercase">
                            {data.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="text-white font-medium group-hover:text-amber-300 transition-colors">{data.name}</h4>
                        <p className="text-gray-400 text-sm mt-0.5">{colaborador.role}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No hay colaboradores registrados para este proyecto.</p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
