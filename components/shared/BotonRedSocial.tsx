"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Icon } from "@iconify/react";

interface BotonRedSocialProps {
  nombre: string;
  url: string;
  icono: string;
  color?: string; // Clase de Tailwind para el hover (ej: hover:text-blue-500)
  size?: number;
}

export default function BotonRedSocial({ nombre, url, icono, color = "hover:text-purple-400", size = 32 }: BotonRedSocialProps) {
  return (
    <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`p-2 flex items-center justify-center opacity-80 hover:opacity-100 transition-all duration-300 ${color}`}
        aria-label={nombre}
      >
        <Icon icon={icono} width={size} height={size} />
      </Link>
    </motion.div>
  );
}
