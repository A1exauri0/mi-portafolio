"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import BotonRedSocial from "../shared/BotonRedSocial";
import redes from "../../data/redes-sociales.json";

export default function HeroInicio() {
  return (
    <section className="min-h-[calc(100vh-80px)] pt-10 lg:pt-0 flex flex-col lg:flex-row items-center justify-between relative w-full px-6 lg:px-16 xl:px-24 mx-auto max-w-[1400px]">

      {/* Fondos Degradados Ambientales */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-purple-900/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[25rem] h-[25rem] bg-fuchsia-900/10 rounded-full blur-[100px]" />
      </div>

      {/* LADO IZQUIERDO: Fotografía Principal */}
      <motion.div
        className="w-full lg:w-[45%] aspect-square md:aspect-[4/5] lg:h-[70vh] max-h-[800px] relative mb-12 lg:mb-0 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.3)] hover:shadow-[0_0_60px_rgba(168,85,247,0.5)] transition-shadow duration-500 ml-0"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10 lg:hidden pointer-events-none" />
        <Image
          src="/mi-foto.png"
          alt="Adrián Vázquez - Desarrollador Full Stack"
          fill
          unoptimized
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </motion.div>

      {/* LADO DERECHO: Contenido de Texto e Íconos */}
      <motion.div
        className="w-full lg:w-[50%] flex flex-col justify-center text-left z-10"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight mb-8">
          Hola, soy <span className="text-purple-500">Adrián Vázquez</span>.
        </h1>

        <div className="space-y-5 text-gray-300 text-lg md:text-xl leading-relaxed max-w-xl">
          <p>
            Soy Ingeniero en Sistemas y desarrollador de software independiente.
          </p>
          <p>
            Me especializo en crear sistemas web y aplicaciones escalables para ayudar a empresas a resolver problemas y materializar sus ideas.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-4 items-center">
          {redes.map((red) => (
            <BotonRedSocial 
              key={red.nombre}
              nombre={red.nombre}
              url={red.url}
              icono={red.icono}
              color={red.color}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
