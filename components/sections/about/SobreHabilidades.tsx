"use client";

import { motion } from "framer-motion";
import TechTag from "@/components/shared/TechTag";
import techMap from "@/data/tech-tags.json";
import { useLanguage } from "@/components/providers/LanguageContext";

export default function SobreHabilidades() {
  const { t } = useLanguage();
  const allTags = Object.keys(techMap);

  return (
    <section className="py-20 px-6 max-w-5xl mx-auto w-full">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">{t("about.techStackTitle")}</h2>
        <p className="text-gray-400 font-light">{t("about.techStackSubtitle")}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {allTags.map((tag, i) => (
          <motion.div
            key={tag}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.03 }}
          >
            <TechTag name={tag} size="lg" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
