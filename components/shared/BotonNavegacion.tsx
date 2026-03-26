"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface BotonNavegacionProps {
  nombre: string;
  path: string;
  onClick?: () => void;
  variant?: "desktop" | "mobile";
}

export default function BotonNavegacion({ nombre, path, onClick, variant = "desktop" }: BotonNavegacionProps) {
  const [isHovered, setIsHovered] = useState(false);

  if (variant === "mobile") {
    return (
      <li>
        <Link 
          href={path} 
          className="block text-lg font-medium text-white/80 hover:text-white transition-colors py-2"
          onClick={onClick}
        >
          {nombre}
        </Link>
      </li>
    );
  }

  return (
    <li
      className="relative z-10 px-5 py-2 flex items-center justify-center cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white rounded-full -z-10"
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
      <Link 
        href={path} 
        onClick={onClick}
        className={`text-base font-semibold transition-all duration-300 hover:scale-110 active:scale-95 ${
          isHovered ? "text-black" : "text-white/90"
        }`}
      >
        {nombre}
      </Link>
    </li>
  );
}
