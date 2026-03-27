import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar/Navbar";
import Footer from "@/components/layouts/Footer/Footer";
import BotonWhatsApp from "@/components/shared/BotonWhatsApp";
import { LanguageProvider } from "@/components/providers/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portafolio | Adrián Vázquez",
  description: "Desarrollador Full Stack Especialista",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <LanguageProvider>
          <Navbar />
          <main style={{ marginTop: "80px" }}>
            {children}
          </main>
          <Footer />
          <BotonWhatsApp />
        </LanguageProvider>
      </body>
    </html>
  );
}

