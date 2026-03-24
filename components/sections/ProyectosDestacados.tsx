"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";

const projects = [
  {
    id: 1,
    title: "E-Commerce de Ropa",
    description: "Plataforma completa de comercio electrónico con carrito, pagos y panel de administración.",
    tags: ["Next.js", "Tailwind", "Stripe"],
    color: "from-blue-500/20 to-purple-500/20",
    border: "group-hover:border-blue-500/50"
  },
  {
    id: 2,
    title: "Sistema de Gestión",
    description: "Aplicación interna para gestión de inventario y personal con reportes en tiempo real.",
    tags: ["Vue.js", "Laravel", "MySQL"],
    color: "from-emerald-500/20 to-teal-500/20",
    border: "group-hover:border-emerald-500/50"
  },
  {
    id: 3,
    title: "App de Productividad",
    description: "Herramienta tipo kanban para organizar tareas y colaborar en equipos.",
    tags: ["React", "Firebase", "Framer Motion"],
    color: "from-orange-500/20 to-red-500/20",
    border: "group-hover:border-orange-500/50"
  }
];

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

export default function ProyectosDestacados() {
  return (
    <section id="proyectos" className="py-24 px-6 max-w-7xl mx-auto relative w-full text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
          Proyectos Destacados
        </h2>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          Una selección de mis trabajos recientes. Haz clic en cada uno para ver más detalles.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {projects.map((project) => (
          <motion.div key={project.id} variants={itemVariants} className="h-full">
            <Link href={`/proyectos/${project.id}`} className="block h-full">
              <div className={`group relative bg-[#111] rounded-3xl border border-white/5 p-6 h-full flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5)] overflow-hidden ${project.border}`}>
                {/* Resplandor de fondo en Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                {/* Contenido de la Tarjeta */}
                <div className="relative z-10 flex-1 flex flex-col">
                  {/* Espacio para la Imagen Pincipal */}
                  <div className="w-full h-48 bg-black/40 rounded-2xl mb-6 overflow-hidden border border-white/5 relative group-hover:border-white/10 transition-colors">
                    <div className="absolute inset-0 flex items-center justify-center text-white/20 font-mono text-sm">
                      [ Vista Previa Proyecto {project.id} ]
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 text-gray-100 group-hover:text-white transition-colors">{project.title}</h3>
                  <p className="text-gray-400 mb-6 flex-1 text-sm md:text-base">{project.description}</p>

                  {/* Etiquetas Tecnológicas */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs font-medium px-2.5 py-1 bg-white/5 text-gray-300 rounded-lg group-hover:bg-white/10 group-hover:text-white transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
