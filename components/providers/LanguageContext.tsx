"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

// Import UI translations
import esUI from "@/data/es/ui.json";
import enUI from "@/data/en/ui.json";

// Import data translations
import esProyectos from "@/data/es/proyectos.json";
import enProyectos from "@/data/en/proyectos.json";
import esCertificados from "@/data/es/certificados.json";
import enCertificados from "@/data/en/certificados.json";

export type Locale = "es" | "en";

const translations = {
  es: esUI,
  en: enUI,
} as const;

const projectData = {
  es: esProyectos,
  en: enProyectos,
};

const certificateData = {
  es: esCertificados,
  en: enCertificados,
};

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  proyectos: typeof esProyectos;
  certificados: typeof esCertificados;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * Accesses a nested key in the translations object.
 * Example: getNestedValue(obj, "nav.home") => "Inicio"
 */
function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split(".");
  let current: unknown = obj;

  for (const key of keys) {
    if (current && typeof current === "object" && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return path; // Return key as fallback if path not found
    }
  }

  return typeof current === "string" ? current : path;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("es");
  const [isHydrated, setIsHydrated] = useState(false);

  // On mount, read saved preference or detect browser language
  useEffect(() => {
    const saved = localStorage.getItem("portfolio-locale") as Locale | null;
    if (saved && (saved === "es" || saved === "en")) {
      setLocaleState(saved);
    } else {
      // Detect browser language
      const browserLang = navigator.language.slice(0, 2);
      if (browserLang === "en") {
        setLocaleState("en");
      }
    }
    setIsHydrated(true);
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("portfolio-locale", newLocale);
  }, []);

  const t = useCallback(
    (key: string): string => {
      return getNestedValue(translations[locale] as unknown as Record<string, unknown>, key);
    },
    [locale]
  );

  const proyectos = projectData[locale];
  const certificados = certificateData[locale];

  // Prevent hydration mismatch by rendering with default locale until mounted
  if (!isHydrated) {
    return (
      <LanguageContext.Provider
        value={{
          locale: "es",
          setLocale,
          t: (key: string) => getNestedValue(translations.es as unknown as Record<string, unknown>, key),
          proyectos: projectData.es,
          certificados: certificateData.es,
        }}
      >
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, proyectos, certificados }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
