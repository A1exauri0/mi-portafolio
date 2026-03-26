"use client";

import { useEffect } from "react";

export default function ScrollToTop() {
  useEffect(() => {
    // Al montar el componente en el cliente, fuerza el scroll hasta arriba
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return null;
}
