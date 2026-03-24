"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function BotonWhatsApp() {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 origin-center"
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.8 }}
    >
      <Link
        href="https://wa.me/529612326716?text=Hola,%20quisiera%20preguntar%20por%20sus%20servicios."
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-white p-3.5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-shadow duration-300"
        aria-label="Contactar por WhatsApp"
      >
        <Icon icon="ic:baseline-whatsapp" color="#2596be" width="36" height="36" />
      </Link>
    </motion.div>
  );
}
