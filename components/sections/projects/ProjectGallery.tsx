"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface MediaItem {
  url: string;
  caption?: string;
}

interface ProjectGalleryProps {
  gallery: MediaItem[];
  projectTitle: string;
}

export default function ProjectGallery({ gallery, projectTitle }: ProjectGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 0.5, y: 0.5 });

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : dir < 0 ? "-100%" : 0,
      y: dir === 0 ? 30 : 0,
      opacity: 0,
      scale: dir === 0 ? 0.95 : 1
    }),
    center: {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "100%" : dir > 0 ? "-100%" : 0,
      opacity: 0,
      scale: dir === 0 ? 0.95 : 1
    })
  };

  // Reiniciar el zoom al cambiar de foto
  useEffect(() => {
    setZoomLevel(1);
  }, [selectedIndex]);

  // Bloquear el scroll del body cuando el modal está abierto
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setZoomLevel(1); // Reiniciar zoom al cerrar
    }
  }, [selectedIndex]);

  if (!gallery || gallery.length === 0) return null;

  const closeLightbox = () => setSelectedIndex(null);

  return (
    <section className="mt-24">
      {/* Listado de una columna centrada */}
      <div className="flex flex-col items-center gap-16 max-w-4xl mx-auto">
        {gallery.map((media, index) => {
          const isVideo = media.url.match(/\.(mp4|webm|ogg)$/i);
          return (
            <figure
              key={index}
              className="group flex flex-col gap-4 w-full cursor-pointer"
              onClick={() => {
                setDirection(0);
                setSelectedIndex(index);
              }}
            >
              <div className="relative w-full flex justify-center group">
                {isVideo ? (
                  <video
                    src={media.url}
                    title={media.caption || `Video ${index + 1} de ${projectTitle}`}
                    controls preload="metadata" playsInline
                    className="w-full max-h-[85vh] h-auto object-contain rounded-3xl border border-white/10 shadow-xl transition-all duration-700 ease-out group-hover:border-white/30 group-hover:scale-[1.02]"
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <Image
                    src={media.url}
                    alt={media.caption || `Imagen ${index + 1} de ${projectTitle}`}
                    width={1600}
                    height={900}
                    className="w-full max-h-[85vh] h-auto object-contain rounded-3xl border border-white/10 shadow-xl transition-all duration-700 ease-out group-hover:border-white/30 group-hover:scale-[1.02] pointer-events-none"
                  />
                )}

                {/* Ícono de ampliación flotante al hacer hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 flex items-center justify-center">
                  <div className="transform scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 bg-white/10 backdrop-blur-md p-4 rounded-full">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>

              {media.caption && (
                <figcaption className="text-gray-400 text-base md:text-lg font-light text-center px-6">
                  {media.caption}
                </figcaption>
              )}
            </figure>
          );
        })}
      </div>

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
            onClick={() => {
              setDirection(0);
              closeLightbox();
            }}
          >
          {/* Botón X de cerrado (siempre visible sobre el contenido) */}
          <button
            className="absolute top-6 right-6 md:top-8 md:right-8 text-white/70 hover:text-white bg-black/50 hover:bg-white/20 backdrop-blur-md rounded-full p-2.5 transition-colors z-[10000] border border-white/10 shadow-lg cursor-pointer"
            onClick={() => {
              setDirection(0);
              closeLightbox();
            }}
            title="Cerrar"
          >
            <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div
            className="relative w-full max-w-7xl max-h-[90vh] aspect-video flex flex-col items-center justify-center gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Visualizador Principal */}
            <div className="relative w-full h-[75vh] flex items-center justify-center overflow-hidden rounded-xl border border-white/5 shadow-2xl bg-[#0a0a0a]">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={selectedIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                  className="absolute inset-0 flex items-center justify-center p-2 md:p-6"
                >
                  {(() => {
                    const currentMedia = gallery[selectedIndex as number];
                    const isVideo = currentMedia.url.match(/\.(mp4|webm|ogg)$/i);
                    return (
                      <motion.div
                        animate={zoomLevel === 1 ? { scale: 1, x: 0, y: 0 } : { scale: zoomLevel }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        drag={zoomLevel > 1}
                        dragConstraints={{ top: -500, bottom: 500, left: -500, right: 500 }}
                        className="relative w-full h-full flex items-center justify-center"
                        style={{ 
                          cursor: isVideo ? "default" : zoomLevel > 1 ? "zoom-out" : "zoom-in",
                          transformOrigin: `${zoomOrigin.x * 100}% ${zoomOrigin.y * 100}%`
                        }}
                        onClick={(e) => {
                          if (isVideo) return;
                          
                          if (zoomLevel === 1) {
                            // Calcular origen relativo del clic en base a la caja de la imagen
                            const rect = e.currentTarget.getBoundingClientRect();
                            const x = (e.clientX - rect.left) / rect.width;
                            const y = (e.clientY - rect.top) / rect.height;
                            setZoomOrigin({ x, y });
                            setZoomLevel(2.5);
                          } else {
                            setZoomLevel(1);
                          }
                        }}
                      >
                        {isVideo ? (
                          <video
                            src={currentMedia.url}
                            autoPlay loop controls playsInline
                            className="max-h-full max-w-full object-contain shadow-2xl rounded-md"
                            onClick={(e) => e.stopPropagation()} // Previene que el clic cierre o altere zoom en videos
                          />
                        ) : (
                          <Image
                            src={currentMedia.url}
                            alt={currentMedia.caption || `Imagen ampliada`}
                            fill
                            className="object-contain pointer-events-none drop-shadow-2xl"
                            unoptimized
                          />
                        )}
                      </motion.div>
                    );
                  })()}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pie de imagen del modal */}
            {gallery[selectedIndex].caption && (
              <div className="absolute -bottom-12 md:-bottom-16 left-0 right-0 text-center text-white/80 text-lg md:text-xl font-light">
                {gallery[selectedIndex].caption}
              </div>
            )}

            {/* Botones de navegación Anterior/Siguiente */}
            {gallery.length > 1 && (
              <>
                <button
                  className="absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 text-white/50 hover:text-white bg-black/60 hover:bg-white/20 p-2.5 rounded-full backdrop-blur-md transition-all shadow-xl z-50 hover:scale-110 cursor-pointer"
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    setDirection(-1);
                    setSelectedIndex((selectedIndex - 1 + gallery.length) % gallery.length); 
                  }}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  className="absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 text-white/50 hover:text-white bg-black/60 hover:bg-white/20 p-2.5 rounded-full backdrop-blur-md transition-all shadow-xl z-50 hover:scale-110 cursor-pointer"
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    setDirection(1);
                    setSelectedIndex((selectedIndex + 1) % gallery.length); 
                  }}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Indicador de contador */}
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-4 py-1.5 rounded-full text-white/70 text-sm font-mono tracking-widest">
              {selectedIndex + 1} / {gallery.length}
            </div>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </section>
  );
}
