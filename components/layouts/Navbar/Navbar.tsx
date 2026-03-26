"use client";

// React
import { useState } from "react";
// Next
import Link from "next/link";
import Image from "next/image";
// Framer Motion
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    // Guardamos sobre que boton esta el mouse
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    // Links de la barra de navegacion
    const navLinks = [
        {
            name: "Inicio",
            path: "/",
        },
        {
            name: "Sobre mí",
            path: "/about",
        },
        {
            name: "Proyectos",
            path: "/projects",
        },
        {
            name: "Contacto",
            path: "/contact",
        },
    ];

    // Variantes para el ícono de hamburguesa
    const topVariants = {
        closed: { rotate: 0, translateY: 0 },
        open: { rotate: 45, translateY: 8 },
    };
    const middleVariants = {
        closed: { opacity: 1 },
        open: { opacity: 0 },
    };
    const bottomVariants = {
        closed: { rotate: 0, translateY: 0 },
        open: { rotate: -45, translateY: -8 },
    };

    return (
        <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-8 md:px-16 py-4 z-[1000] bg-linear-to-b from-black/90 to-transparent backdrop-blur-[2px]">
            <div className="relative z-50 mt-3 md:mt-0">
                <Link href="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 shrink-0 flex items-center justify-center">
                        <Image 
                            src="/mi-foto.png" 
                            alt="Adrián Vázquez" 
                            width={40} 
                            height={40} 
                            className="w-full h-full object-cover"
                            unoptimized
                        />
                    </div>
                    <span className="font-semibold text-white tracking-wide">Adrián Vázquez</span>
                </Link>
            </div>

            {/* Desktop Links */}
            <ul className="hidden md:flex list-none gap-2 m-0 p-0 relative">
                {/* Recorremos los links */}
                {navLinks.map((link, index) => (
                    // Guardamos el indice del boton sobre el que esta el mouse
                    <li
                        key={link.name}
                        className="relative z-10 px-5 py-2 flex items-center justify-center"
                        // Cuando el mouse entra en el boton, guardamos el indice
                        onMouseEnter={() => setHoveredIndex(index)}
                        // Cuando el mouse sale del boton, guardamos null
                        onMouseLeave={() => setHoveredIndex(null)}>
                        {/* Si el mouse esta sobre ese boton, renderiza el fondo magico blanco*/}
                        {hoveredIndex === index && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-white rounded-full -z-10"
                                transition={{ duration: 0.2 }}
                            />
                        )}
                        {/* Cambiar color del texto cuando el mouse esta sobre el boton */}
                        <Link 
                            href={link.path} 
                            className={`text-base font-semibold transition-all duration-300 hover:scale-110 active:scale-95 ${
                                hoveredIndex === index ? "text-black" : "text-white/90"
                            }`}
                        >
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Botón Hamburguesa Mobile */}
            <button
                className="md:hidden relative z-50 w-8 h-8 flex flex-col justify-center items-center gap-[6px] focus:outline-none cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Menu"
            >
                <motion.div
                    variants={topVariants}
                    animate={isOpen ? "open" : "closed"}
                    className="w-6 h-[2px] bg-white rounded-full origin-center"
                />
                <motion.div
                    variants={middleVariants}
                    animate={isOpen ? "open" : "closed"}
                    className="w-6 h-[2px] bg-white rounded-full"
                />
                <motion.div
                    variants={bottomVariants}
                    animate={isOpen ? "open" : "closed"}
                    className="w-6 h-[2px] bg-white rounded-full origin-center"
                />
            </button>

            {/* Menú Móvil Desplegable (Simple) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-[85%] left-0 w-full bg-[#111] border-t border-white/10 md:hidden z-[99] shadow-xl"
                    >
                        <ul className="flex flex-col px-6 py-4 gap-4">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link 
                                        href={link.path} 
                                        className="block text-lg font-medium text-white/80 hover:text-white transition-colors py-2"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}