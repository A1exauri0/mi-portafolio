"use client";

// React
import { useState } from "react";
// Next
import Link from "next/link";
// Styles
import styles from "./Navbar.module.css";
// Framer Motion
import { motion } from "framer-motion";

export default function Navbar() {
    // Guardamos sobre que boton esta el mouse
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarLogo}>
                <Link href="/">Portafolio</Link>
            </div>
            <ul className={styles.navbarLinks}>
                {/* Recorremos los links */}
                {navLinks.map((link, index) => (
                    // Guardamos el indice del boton sobre el que esta el mouse
                    <li
                        key={link.name}
                        className={styles.navItem}
                        // Cuando el mouse entra en el boton, guardamos el indice
                        onMouseEnter={() => setHoveredIndex(index)}
                        // Cuando el mouse sale del boton, guardamos null
                        onMouseLeave={() => setHoveredIndex(null)}>
                        {/* Si el mouse esta sobre ese boton, renderiza el fondo magico blanco*/}
                        {hoveredIndex === index && (
                            <motion.div
                                layoutId="pill"
                                className={styles.hoverBackground}
                                transition={{
                                    type: "spring",
                                    bounce: 0.2,
                                    duration: 0.6,
                                }}
                            />
                        )}
                        {/* Cambiar color del texto cuando el mouse esta sobre el boton */}
                        <Link href={link.path} style={{ color: hoveredIndex === index ? "black" : "white" }}>
                            {link.name}
                        </Link>

                    </li>
                ))}
            </ul>
        </nav>
    )
}