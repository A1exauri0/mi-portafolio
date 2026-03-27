import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import proyectos from "@/data/proyectos.json";
import TechTag from "@/components/shared/TechTag";
import EtiquetaEstadoProyecto from "@/components/shared/EtiquetaEstadoProyecto";
import ScrollToTop from "@/components/shared/ScrollToTop";
import ProjectFeatures from "@/components/sections/projects/ProjectFeatures";
import ProjectGallery from "@/components/sections/projects/ProjectGallery";

export async function generateStaticParams() {
  return proyectos.map((project) => ({
    id: project.id,
  }));
}

export default async function ProyectoPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
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
          Volver al portafolio
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
                <span>Visitar Proyecto</span>
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
              alt={`Pantalla del proyecto ${project.title}`}
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
                Sobre el proyecto
              </h3>
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light mb-12">
                {project.description}
              </p>

              <div className="bg-[#111] border border-white/5 rounded-3xl p-8 shadow-xl">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Tecnologías Utilizadas
                </h3>
                <div className="flex flex-wrap gap-3">
                  {project.tags.map(tag => (
                    <TechTag key={tag} name={tag} size="lg" />
                  ))}
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-8 text-white flex items-center gap-3">
                <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
                Características Clave
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
