"use client";

import { Icon } from "@iconify/react";
import { useLanguage } from "@/components/providers/LanguageContext";

interface EtiquetaEstadoProyectoProps {
  status: string;
  className?: string;
}

export default function EtiquetaEstadoProyecto({ status, className = "" }: EtiquetaEstadoProyectoProps) {
  const { t } = useLanguage();
  
  // Check against both Spanish and English status values
  const isEnCurso = status === 'En Curso' || status === 'In Progress';

  return (
    <span className={`inline-flex items-center gap-1.5 font-bold uppercase tracking-wider rounded-full backdrop-blur-md border shadow-[0_2px_10px_rgba(0,0,0,0.5)] ${
      isEnCurso 
        ? 'bg-amber-600/90 text-white border-amber-400' 
        : 'bg-emerald-600/90 text-white border-emerald-400'
    } ${className}`}>
      {isEnCurso ? (
        <>
          <Icon icon="lucide:hourglass" className="w-3.5 h-3.5" />
          {t("status.inProgress")}
        </>
      ) : (
        <>
          <Icon icon="lucide:check-circle-2" className="w-3.5 h-3.5" />
          {t("status.completed")}
        </>
      )}
    </span>
  );
}
