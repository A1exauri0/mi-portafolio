import FormularioContacto from "@/components/sections/contact/FormularioContacto";

export const metadata = {
  title: "Contacto | Adrián Vázquez",
  description: "¿Tienes un proyecto en mente? Ponte en contacto conmigo y trabajemos juntos.",
};

export default function ContactPage() {
  return (
    <main className="bg-[#050505] min-h-screen text-white overflow-hidden flex flex-col items-center w-full pt-20">
      <FormularioContacto />
    </main>
  );
}
