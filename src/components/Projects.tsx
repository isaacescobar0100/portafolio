import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { ExternalLink, Github, Folder, AlertTriangle, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { projects } from '../data/portfolio';
import { socialLinks } from '../data/portfolio';

// Lightbox Modal para ver imágenes a pantalla completa
function ImageLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
  setIndex
}: {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  setIndex: (index: number) => void;
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-dark-950/95 backdrop-blur-md"
          onClick={onClose}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors z-10"
            aria-label="Cerrar"
          >
            <X size={28} />
          </button>

          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-dark-800/70 rounded-full text-white hover:bg-dark-700 transition-colors z-10"
                aria-label="Imagen anterior"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-dark-800/70 rounded-full text-white hover:bg-dark-700 transition-colors z-10"
                aria-label="Siguiente imagen"
              >
                <ChevronRight size={28} />
              </button>
            </>
          )}

          {/* Image */}
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Imagen ${currentIndex + 1}`}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          />

          {/* Dots indicator */}
          {images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIndex(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-primary-500' : 'bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Ir a imagen ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-6 right-6 text-white/70 text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface WarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
  warning: string;
  projectTitle: string;
}

function WarningModal({ isOpen, onClose, onContinue, warning, projectTitle }: WarningModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-dark-900 border border-dark-700 rounded-2xl p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1 text-dark-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            {/* Warning icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center">
                <AlertTriangle size={32} className="text-yellow-500" />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-white text-center mb-2">
              Aviso sobre {projectTitle}
            </h3>

            {/* Warning message */}
            <p className="text-dark-300 text-center mb-6">
              {warning}
            </p>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-dark-600 text-dark-300 rounded-lg hover:bg-dark-800 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={onContinue}
                className="flex-1 px-4 py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition-colors"
              >
                Continuar de igual manera
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ImageCarousel({
  images,
  alt,
  onOpenLightbox
}: {
  images: string[];
  alt: string;
  onOpenLightbox: (index: number) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-full group/carousel">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${alt} - ${currentIndex + 1}`}
          className="w-full h-full object-cover cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => onOpenLightbox(currentIndex)}
        />
      </AnimatePresence>

      {/* Zoom icon overlay */}
      <div
        className="absolute inset-0 bg-dark-950/40 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none"
      >
        <ZoomIn size={32} className="text-white/80" />
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevImage}
        className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-dark-900/70 rounded-full text-white hover:bg-dark-800 transition-colors z-10"
        aria-label="Imagen anterior"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={nextImage}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-dark-900/70 rounded-full text-white hover:bg-dark-800 transition-colors z-10"
        aria-label="Siguiente imagen"
      >
        <ChevronRight size={18} />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-primary-500' : 'bg-white/50'
            }`}
            aria-label={`Ir a imagen ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [warningModal, setWarningModal] = useState<{
    isOpen: boolean;
    warning: string;
    projectTitle: string;
    demoUrl: string;
  }>({
    isOpen: false,
    warning: '',
    projectTitle: '',
    demoUrl: '',
  });

  // Estado para el lightbox de imágenes
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    images: string[];
    currentIndex: number;
  }>({
    isOpen: false,
    images: [],
    currentIndex: 0,
  });

  const openLightbox = (images: string[], index: number) => {
    setLightbox({ isOpen: true, images, currentIndex: index });
  };

  const closeLightbox = () => {
    setLightbox({ ...lightbox, isOpen: false });
  };

  const nextLightboxImage = () => {
    setLightbox((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.images.length,
    }));
  };

  const prevLightboxImage = () => {
    setLightbox((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length,
    }));
  };

  const handleDemoClick = (e: React.MouseEvent, project: typeof projects[0]) => {
    if (project.warning) {
      e.preventDefault();
      setWarningModal({
        isOpen: true,
        warning: project.warning,
        projectTitle: project.title,
        demoUrl: project.demo,
      });
    }
  };

  const handleContinue = () => {
    window.open(warningModal.demoUrl, '_blank');
    setWarningModal({ ...warningModal, isOpen: false });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <>
      <section id="proyectos" className="py-20 md:py-32 bg-dark-900/30">
        <div className="container mx-auto px-6">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Section Header */}
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2 className="section-title">
                Mis <span className="gradient-text">Proyectos</span>
              </h2>
              <p className="section-subtitle mx-auto">
                Una selección de proyectos que demuestran mis habilidades y experiencia
              </p>
            </motion.div>

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <motion.article
                  key={project.id}
                  variants={itemVariants}
                  className="card group overflow-hidden"
                >
                  {/* Project Image / Placeholder */}
                  <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden bg-dark-800">
                    {/* Background image or carousel */}
                    {'images' in project && project.images && project.images.length > 1 ? (
                      <ImageCarousel
                        images={project.images}
                        alt={project.title}
                        onOpenLightbox={(index) => openLightbox(project.images!, index)}
                      />
                    ) : (
                      <div className="relative w-full h-full group/single">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                          onClick={() => openLightbox([project.image], 0)}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement?.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                        {/* Zoom icon overlay */}
                        <div className="absolute inset-0 bg-dark-950/40 opacity-0 group-hover/single:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
                          <ZoomIn size={32} className="text-white/80" />
                        </div>
                      </div>
                    )}
                    <div className="hidden absolute inset-0 bg-gradient-to-br from-primary-600/20 to-primary-800/20 flex items-center justify-center">
                      <Folder size={48} className="text-primary-500/50" />
                    </div>
                    {/* Overlay on hover - only for links */}
                    {(project.github !== "#" || project.demo !== "#") && (
                      <div className="absolute bottom-2 right-2 flex gap-2 z-20">
                        {project.github !== "#" && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-dark-900/80 rounded-full text-white hover:text-primary-400 hover:bg-dark-800 transition-all"
                            aria-label="Ver código en GitHub"
                          >
                            <Github size={18} />
                          </a>
                        )}
                        {project.demo !== "#" && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => handleDemoClick(e, project)}
                            className="p-2 bg-dark-900/80 rounded-full text-white hover:text-primary-400 hover:bg-dark-800 transition-all"
                            aria-label="Ver demo"
                          >
                            <ExternalLink size={18} />
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-semibold text-white group-hover:text-primary-400 transition-colors">
                        {project.title}
                      </h3>
                      {project.featured && (
                        <span className="px-2 py-1 text-xs bg-primary-500/10 text-primary-400 rounded-md">
                          Destacado
                        </span>
                      )}
                    </div>

                    <p className="text-dark-400 text-sm mb-4">
                      {project.description}
                    </p>

                    {/* Warning badge */}
                    {project.warning && (
                      <div className="flex items-center gap-2 mb-3 text-yellow-500 text-xs">
                        <AlertTriangle size={14} />
                        <span>Demo con limitaciones</span>
                      </div>
                    )}

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs bg-dark-800 text-dark-300 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* View More Button */}
            <motion.div variants={itemVariants} className="text-center mt-12">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2"
              >
                Ver más proyectos en GitHub
                <Github size={18} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Warning Modal */}
      <WarningModal
        isOpen={warningModal.isOpen}
        onClose={() => setWarningModal({ ...warningModal, isOpen: false })}
        onContinue={handleContinue}
        warning={warningModal.warning}
        projectTitle={warningModal.projectTitle}
      />

      {/* Image Lightbox */}
      <ImageLightbox
        images={lightbox.images}
        currentIndex={lightbox.currentIndex}
        isOpen={lightbox.isOpen}
        onClose={closeLightbox}
        onNext={nextLightboxImage}
        onPrev={prevLightboxImage}
        setIndex={(index) => setLightbox({ ...lightbox, currentIndex: index })}
      />
    </>
  );
}
