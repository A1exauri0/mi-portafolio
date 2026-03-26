"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Icon } from "@iconify/react";
import BotonRedSocial from "../../shared/BotonRedSocial";
import redes from "../../../data/redes-sociales.json";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#050505] border-t border-white/5 pt-16 pb-8 px-6 lg:px-16 xl:px-24 relative overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-900/5 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        {/* Lado Izquierdo: Branding/Nombre */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Link href="/" className="text-2xl font-bold tracking-tighter text-white mb-2">
            Adrián Vázquez<span className="text-purple-500">.</span>
          </Link>
          <p className="text-gray-400 font-light max-w-xs">
            Desarrollador Full Stack apasionado por construir soluciones digitales excepcionales.
          </p>
        </div>

        {/* Centro/Derecha: Redes Sociales */}
        <div className="flex flex-col items-center md:items-end gap-6">
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500">Conéctate conmigo</h3>
          <div className="flex items-center gap-6">
            {redes.map((social) => (
              <BotonRedSocial 
                key={social.nombre}
                nombre={social.nombre}
                url={social.url}
                icono={social.icono}
                color={social.color}
                size={28}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Barra Inferior: Copyright */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 font-light">
        <p>© {currentYear} Adrián Vázquez.</p>
        <div className="flex gap-8">
          <span className="hover:text-white transition-colors cursor-default">Chiapas, México</span>
          <span className="hover:text-white transition-colors cursor-default">Full Stack Developer</span>
        </div>
      </div>
    </footer>
  );
}
