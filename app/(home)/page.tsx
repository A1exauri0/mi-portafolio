"use client";

import HeroInicio from "@/components/sections/home/HeroInicio";
import ProyectosDestacados from "@/components/sections/home/ProyectosDestacados";

export default function Home() {
  return (
    <main className="bg-[#050505] min-h-screen text-white overflow-hidden flex flex-col items-center w-full">
      <HeroInicio />
      <ProyectosDestacados limit={6} showAllButton={true} />
    </main>
  );
}
