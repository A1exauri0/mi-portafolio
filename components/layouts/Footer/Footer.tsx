"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Icon } from "@iconify/react";

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/adrián-vázquez-7a665b185",
    icon: "devicon:linkedin",
    color: "hover:text-blue-500"
  },
  {
    name: "GitHub",
    href: "https://github.com/A1exauri0",
    icon: "skill-icons:github-light",
    color: "hover:text-gray-400"
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/adrianv.dev/",
    icon: "skill-icons:instagram",
    color: "hover:text-pink-500"
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/529612326716?text=Hola,%20quisiera%20información%20sobre%20sus%20servicios%20para%20desarrollo%20de%20páginas%20web%20y%20aplicaciones.",
    icon: "logos:whatsapp-icon",
    color: "hover:text-green-500"
  },
  {
    name: "Gmail",
    href: "mailto:adrianvazquez3006@outlook.com",
    icon: "logos:google-gmail",
    color: "hover:text-red-500"
  }
];

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
            {socialLinks.map((social) => (
              <motion.div
                key={social.name}
                whileHover={{ scale: 1.2, y: -4 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 transition-colors duration-300 ${social.color}`}
                  aria-label={social.name}
                >
                  <Icon icon={social.icon} width="28" height="28" />
                </Link>
              </motion.div>
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
