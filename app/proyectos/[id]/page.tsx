"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";
import TechTag from "@/components/shared/TechTag";
import EtiquetaEstadoProyecto from "@/components/shared/EtiquetaEstadoProyecto";
import ScrollToTop from "@/components/shared/ScrollToTop";
import ProjectFeatures from "@/components/sections/projects/ProjectFeatures";
import ProjectGallery from "@/components/sections/projects/ProjectGallery";
import BeforeAfterSlider from "@/components/sections/projects/BeforeAfterSlider";
import { useLanguage } from "@/components/providers/LanguageContext";
import colaboradoresDic from "@/data/colaboradores.json";

export default function ProyectoPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const { t, proyectos } = useLanguage();
  const project = proyectos.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <ScrollToTop />
      {/* Botón de volver */}
      <div className="pt-8 px-6 max-w-5xl mx-auto">
        <Link 
          href="/#proyectos" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full backdrop-blur-md"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {t("projects.backToPortfolio")}
        </Link>
      </div>

      <article className="max-w-5xl mx-auto px-6 py-10">
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <EtiquetaEstadoProyecto 
              status={project.status as string} 
              className="px-3 py-1 text-xs" 
            />
            <span className="text-sm font-mono text-gray-500 tracking-widest uppercase bg-[#111] px-3 py-1 rounded-full border border-white/5">
              {project.date}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 leading-tight">
            {project.title}
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl">
            {project.subtitle}
          </h2>
          
          {/* Botón de Enlace Externo (Opcional) */}
          {/* @ts-ignore */}
          {project.link && project.link.trim() !== "" && (
            <div className="mt-8">
              <a 
                /* @ts-ignore */
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-3.5 bg-white text-black font-bold rounded-full hover:scale-105 hover:bg-gray-100 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 group"
              >
                <span>{t("projects.visitProject")}</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          )}
        </header>

        {/* Hero Image */}
        {project.previewImage && project.previewImage !== "" && (
          <div className="w-full relative mb-16 flex justify-center group pointer-events-none">
            <Image 
              src={project.previewImage} 
              alt={`${project.title}`}
              width={1600}
              height={900}
              priority
              className="w-full h-auto rounded-3xl border border-white/10 shadow-2xl transition-transform duration-700 ease-out group-hover:scale-[1.02] object-contain pointer-events-auto"
            />
          </div>
        )}

        <div className="max-w-4xl mx-auto space-y-16">
          <div className="space-y-16">
            <section>
              <h3 className="text-2xl font-bold mb-4 text-white flex items-center gap-3">
                <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {t("projects.aboutProject")}
              </h3>
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light mb-12">
                {project.description}
              </p>

              <div className="bg-[#111] border border-white/5 rounded-3xl p-8 shadow-xl">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  {t("projects.techUsed")}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {project.tags.map(tag => (
                    <TechTag key={tag} name={tag} size="lg" />
                  ))}
                </div>
              </div>
            </section>

            {/* Sección Antes y Después */}
            {/* @ts-ignore */}
            {project.beforeAfter && (
              <section className="mt-16">
                <h3 className="text-2xl font-bold mb-8 text-white flex items-center gap-3">
                  <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  {t("projects.beforeAfter")}
                </h3>
                <div className="relative group">
                  <BeforeAfterSlider 
                    /* @ts-ignore */
                    before={project.beforeAfter.before} 
                    /* @ts-ignore */
                    after={project.beforeAfter.after} 
                    beforeLabel={t("projects.before")}
                    afterLabel={t("projects.after")}
                  />
                  <p className="mt-4 text-center text-gray-500 text-sm italic">
                    {t("projects.comparePrompt")}
                  </p>
                </div>
              </section>
            )}

            {/* Sección de Colaboradores */}
            {project.collaborators && project.collaborators.length > 0 && (
              <section className="mb-16">
                <h3 className="text-2xl font-bold mb-8 text-white flex items-center gap-3">
                  <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {t("projects.collaborators")}
                </h3>
                <div className={`grid gap-6 ${project.collaborators.length === 1 ? 'grid-cols-1 max-w-sm' : 'grid-cols-1 sm:grid-cols-2'}`}>
                  {project.collaborators.map((collab: any, idx: number) => {
                    const data = (colaboradoresDic as Record<string, {name: string, photo: string}>)[collab.id] 
                      || { name: collab.id, photo: '' };
                    return (
                      <div key={idx} className="flex items-center gap-4 bg-[#111] border border-white/5 rounded-2xl p-5 hover:border-white/20 transition-colors">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 flex-shrink-0">
                          {data.photo ? (
                            <Image src={data.photo} alt={data.name} fill className="object-cover" />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-bold text-2xl uppercase">
                              {data.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 className="text-white font-medium text-lg">{data.name}</h4>
                          <p className="text-gray-400 text-sm mt-1">{collab.role}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            <section>
              <h3 className="text-2xl font-bold mb-8 text-white flex items-center gap-3">
                <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
                {t("projects.keyFeatures")}
              </h3>
              <ProjectFeatures features={project.features} />
            </section>
          </div>
        </div>

        {/* Galería de imágenes extra interactiva */}
        <ProjectGallery gallery={project.gallery as any} projectTitle={project.title} />
      </article>
    </main>
  );
}
