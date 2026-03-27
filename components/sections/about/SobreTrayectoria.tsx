"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageContext";

export default function SobreTrayectoria() {
  const { t, proyectos } = useLanguage();

  // Encontrar proyectos específicos en el JSON
  const incubadora = proyectos.find(p => p.id === "plataforma-incubadora");
  const sitec = proyectos.find(p => p.id === "tablero-estrategico");
  const freelancers = proyectos.filter(p => ["estetica-ciam-bela", "erp-mueblerias", "gym-project-fit"].includes(p.id));

  const secciones = [
    {
      tituloPrincipal: t("about.educationTitle"),
      items: [
        {
          tipo: t("about.careerType"),
          titulo: t("about.careerTitle"),
          institucion: t("about.careerInstitution"),
          periodo: t("about.careerPeriod"),
          descripcion: t("about.careerDescription"),
          icon: "material-symbols:school-outline"
        },
        {
          tipo: t("about.socialServiceType"),
          titulo: incubadora?.title || "Plataforma Incubadora",
          institucion: incubadora?.subtitle || "TecNM Campus Tuxtla Gutiérrez",
          periodo: incubadora?.date || "2023 - 2024",
          descripcion: incubadora?.description || "",
          icon: "material-symbols:volunteer-activism-outline",
          href: `/proyectos/${incubadora?.id}`
        },
        {
          tipo: t("about.residencyType"),
          titulo: sitec?.title || "SITEC",
          institucion: sitec?.subtitle || "Secretaría de Finanzas, Chiapas",
          periodo: sitec?.date || "2025",
          descripcion: sitec?.description || "",
          icon: "uil:suitcase",
          href: `/proyectos/${sitec?.id}`
        }
      ]
    },
    {
      tituloPrincipal: t("about.experienceTitle"),
      items: freelancers.map((f) => ({
        tipo: t("about.freelancerType"),
        titulo: f.title,
        institucion: f.subtitle || "Cliente Freelance",
        periodo: f.date || "",
        descripcion: f.description || "",
        icon: "material-symbols:code-blocks-outline",
        href: `/proyectos/${f.id}`
      }))
    }
  ];

  return (
    <section className="py-20 px-6 max-w-5xl mx-auto w-full">
      <h2 className="text-3xl md:text-5xl font-bold mb-20 text-center uppercase tracking-tight">{t("about.trajectoryTitle")} <span className="text-purple-500">{t("about.trajectoryTitleHighlight")}</span></h2>

      <div className="space-y-24">
        {secciones.map((seccion, idxSeccion) => (
          <div key={idxSeccion}>
            <h3 className="text-xl md:text-2xl font-bold mb-10 text-gray-400 flex items-center gap-4">
              <span className="uppercase tracking-widest">{seccion.tituloPrincipal}</span>
              <div className="flex-grow h-px bg-white/5" />
            </h3>

            <div className="relative border-l border-purple-500/20 ml-4 md:ml-10 pl-8 space-y-12">
              {seccion.items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative"
                >
                  <div className="absolute -left-[45px] top-0 w-8 h-8 rounded-full bg-[#050505] border-2 border-purple-500 flex items-center justify-center text-purple-400 z-10 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                    <Icon icon={item.icon} width="16" height="16" />
                  </div>

                  <div className="bg-[#111] border border-white/5 p-8 rounded-3xl hover:border-purple-500/20 transition-all group overflow-hidden relative">
                    {item.href && (
                      <Link
                        href={item.href}
                        className="absolute inset-0 z-20 cursor-pointer"
                        title={`${item.titulo}`}
                      />
                    )}

                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="text-[10px] font-black uppercase tracking-widest text-white bg-purple-500 px-3 py-1 rounded-sm">
                        {item.tipo}
                      </span>
                      <span className="text-gray-500 text-xs font-light">{item.periodo}</span>
                    </div>

                    <div className="flex justify-between items-start gap-4">
                      <h4 className="text-xl md:text-2xl font-bold mb-1 text-white group-hover:text-purple-400 transition-colors tracking-tight leading-none">
                        {item.titulo}
                      </h4>
                      {item.href && (
                        <div className="text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
                          <Icon icon="material-symbols:arrow-outward-rounded" width="24" height="24" />
                        </div>
                      )}
                    </div>

                    <p className="text-gray-400 text-sm font-medium mb-4 italic">{item.institucion}</p>
                    <p className="text-gray-500 text-base font-light leading-relaxed">
                      {item.descripcion}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
