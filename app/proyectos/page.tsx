import ProyectosDestacados from "@/components/sections/ProyectosDestacados";

export const metadata = {
  title: "Proyectos | Adrián Vázquez",
  description: "Listado completo de proyectos y colaboraciones de Adrián Vázquez",
};

export default function ProyectosPage() {
  return (
    <main className="bg-[#050505] min-h-screen text-white overflow-hidden flex flex-col items-center w-full">
      <ProyectosDestacados isFullPage={true} />
    </main>
  );
}
