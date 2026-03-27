"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageContext";

export default function BotonWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            className="mr-4 bg-white/95 backdrop-blur-md text-[#a855f7] px-5 py-2.5 rounded-xl text-sm font-black tracking-widest shadow-[0_4px_20px_rgba(0,0,0,0.15)] border-2 border-[#a855f7]/20 whitespace-nowrap pointer-events-none italic"
          >
            {t("whatsapp.tooltip")}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        onHoverStart={() => setShowTooltip(true)}
        onHoverEnd={() => setShowTooltip(false)}
        whileHover={{ scale: 1.1, rotate: 3 }}
        whileTap={{ scale: 0.95 }}
        className="origin-center"
      >
        <Link
          href={`https://wa.me/529612326716?text=${t("whatsapp.message")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block w-14 h-14 rounded-full shadow-[0_4px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)] transition-all duration-300 overflow-hidden bg-white"
          aria-label={t("whatsapp.ariaLabel")}
        >
          <Image
            src="/images/icons/whatsapp.png"
            alt="WhatsApp"
            fill
            sizes="64px"
            className="object-cover"
            style={{ transform: 'scale(1.1)' }}
            priority
          />
        </Link>
      </motion.div>
    </div>
  );
}
