import HeroInicio from "../components/sections/HeroInicio";
import ProyectosDestacados from "../components/sections/ProyectosDestacados";

export const metadata = {
  title: "Portafolio | Adrián Vázquez",
  description: "Desarrollador Full Stack Especialista",
};

export default function Home() {
  return (
    <main className="bg-[#050505] min-h-screen text-white overflow-hidden flex flex-col items-center w-full">
      <HeroInicio />
      <ProyectosDestacados />
    </main>
  );
}
