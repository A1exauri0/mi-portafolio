import SobreHero from "../../components/sections/about/SobreHero";
import SobreHabilidades from "../../components/sections/about/SobreHabilidades";
import SobreTrayectoria from "../../components/sections/about/SobreTrayectoria";
import SobreCertificados from "../../components/sections/about/SobreCertificados";
import SobreGustos from "../../components/sections/about/SobreGustos";
import ScrollToTop from "../../components/shared/ScrollToTop";

export const metadata = {
  title: "Sobre mí | Adrián Vázquez",
  description: "Conoce más sobre mi trayectoria, habilidades y pasiones como desarrollador Full Stack.",
};

export default function AboutPage() {
  return (
    <main className="bg-[#050505] min-h-screen text-white overflow-hidden flex flex-col items-center w-full pt-20 pb-20">
      <ScrollToTop />
      
      {/* Fondos Decorativos */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[40%] bg-blue-900/10 rounded-full blur-[100px]" />
      </div>

      <SobreHero />
      
      {/* Separador sutil */}
      <div className="w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-white/5 to-transparent my-10" />
      
      <SobreHabilidades />
      <SobreTrayectoria />
      <SobreCertificados />
      <SobreGustos />
    </main>
  );
}
