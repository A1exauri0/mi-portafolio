"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import TechTag from "@/components/shared/TechTag";
import EtiquetaEstadoProyecto from "@/components/shared/EtiquetaEstadoProyecto";
import ModalColaboradores from "@/components/shared/ModalColaboradores";
import { useLanguage } from "@/components/providers/LanguageContext";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, type: "spring", stiffness: 100 } }
};

interface ProyectosDestacadosProps {
  limit?: number;
  showAllButton?: boolean;
  isFullPage?: boolean;
}

export default function ProyectosDestacados({
  limit,
  showAllButton = false,
  isFullPage = false
}: ProyectosDestacadosProps) {
  const { t, proyectos } = useLanguage();
  const [modalProject, setModalProject] = useState<any | null>(null);

  const displayedProjects = limit ? proyectos.slice(0, limit) : proyectos;
  const hasMore = limit ? proyectos.length > limit : false;

  return (
    <section id="proyectos" className={`py-24 px-6 max-w-7xl mx-auto relative w-full text-white ${isFullPage ? 'pt-32' : ''}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
          {isFullPage ? t("projects.titleFull") : t("projects.title")}
        </h2>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          {isFullPage ? t("projects.subtitleFull") : t("projects.subtitle")}
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {displayedProjects.map((project, index) => (
          <motion.div key={project.id} variants={itemVariants} className="h-full">
            <Link href={`/proyectos/${project.id}`} className="block h-full">
              <div className={`group relative bg-[#111] rounded-3xl border border-white/5 p-6 h-full flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5)] overflow-hidden ${project.border}`}>
                {/* Resplandor de fondo en Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                {/* Contenido de la Tarjeta */}
                <div className="relative z-10 flex-1 flex flex-col">
                  {/* Espacio para la Imagen Principal */}
                  <div className="w-full h-48 bg-black/40 rounded-2xl mb-5 overflow-hidden border border-white/5 relative group-hover:border-white/10 transition-colors">

                    {/* Botones Flotantes Card */}
                    <div className="absolute top-3 right-3 z-30 flex items-center gap-2">
                      {project.collaborators && project.collaborators.length > 0 && (
                        <div className="relative">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setModalProject(project);
                            }}
                            className="peer bg-black/50 hover:bg-black/80 text-white p-1.5 rounded-md backdrop-blur-md transition-all border border-white/10"
                            aria-label={t("projects.collaboratorsTooltip") || "Ver Colaboradores"}
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </button>

                          {/* Tooltip Personalizado */}
                          <div className="absolute top-full mt-1.5 right-0 px-2.5 py-1.5 bg-[#0a0a0a] border border-white/10 text-gray-300 text-[10px] font-medium uppercase tracking-wider whitespace-nowrap rounded-md opacity-0 peer-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 shadow-2xl">
                            {t("projects.collaboratorsTooltip") || "Ver Colaboradores"}
                          </div>
                        </div>
                      )}

                      <EtiquetaEstadoProyecto
                        status={project.status as string}
                        className="px-2.5 py-1 text-[11px]"
                      />
                    </div>

                    {project.previewImage && project.previewImage !== "" ? (
                      <Image
                        src={project.previewImage}
                        alt={`${project.title}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index < 3}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col gap-2 items-center justify-center text-white/20 font-mono text-sm px-6 text-center">
                        <svg className="w-8 h-8 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{t("projects.noImage")}</span>
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold mb-1 text-gray-100 group-hover:text-white transition-colors leading-tight">
                    {project.title}
                  </h3>

                  <div className="text-[11px] text-gray-500 uppercase tracking-widest font-mono mb-4 flex justify-between items-center">
                    <span>{project.date}</span>
                  </div>

                  <p className="text-gray-400 mb-6 flex-1 text-sm leading-relaxed">{project.description}</p>

                  {/* Etiquetas Tecnológicas */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.slice(0, 3).map(tag => (
                      <TechTag key={tag} name={tag} />
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-xs font-medium px-2.5 py-1 text-gray-500 bg-white/5 border border-white/5 rounded-lg flex items-center justify-center">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {showAllButton && hasMore && (
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link
            href="/proyectos"
            className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-full border border-white/10 transition-all duration-300 font-medium group"
          >
            {t("projects.viewAll")}
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      )}
      {/* Modal de Colaboradores */}
      <ModalColaboradores
        isOpen={modalProject !== null}
        onClose={() => setModalProject(null)}
        colaboradores={modalProject?.collaborators || []}
      />
    </section>
  );
}
