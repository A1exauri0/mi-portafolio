"use client";

import ProyectosDestacados from "@/components/sections/home/ProyectosDestacados";

export default function ProyectosPage() {
  return (
    <main className="bg-[#050505] min-h-screen text-white overflow-hidden flex flex-col items-center w-full">
      <ProyectosDestacados isFullPage={true} />
    </main>
  );
}
