import HeroInicio from "@/components/sections/home/HeroInicio";
import ProyectosDestacados from "@/components/sections/home/ProyectosDestacados";

export const metadata = {
  title: "Portafolio | Adrián Vázquez",
  description: "Desarrollador Full Stack Especialista",
};

export default function Home() {
  return (
    <main className="bg-[#050505] min-h-screen text-white overflow-hidden flex flex-col items-center w-full">
      <HeroInicio />
      <ProyectosDestacados limit={6} showAllButton={true} />
    </main>
  );
}
