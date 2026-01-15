import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Code2, GraduationCap, Briefcase, Target } from 'lucide-react';
import { personalInfo, education } from '../data/portfolio';

const highlights = [
  {
    icon: GraduationCap,
    title: "Formación Académica",
    description: education.degree,
  },
  {
    icon: Code2,
    title: "Desarrollo Full Stack",
    description: "Frontend y Backend con React, Node.js, Python y más",
  },
  {
    icon: Target,
    title: "Enfoque en Resultados",
    description: "Código limpio, escalable y orientado a la experiencia de usuario",
  },
  {
    icon: Briefcase,
    title: "Listo para el Desafío",
    description: "Motivado por aprender y contribuir en proyectos innovadores",
  },
];

export default function About() {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="sobre-mi" className="py-20 md:py-32 relative">
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
              Sobre <span className="gradient-text">Mí</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Conoce un poco más sobre mi perfil profesional y lo que me motiva
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text Content */}
            <motion.div variants={itemVariants} className="space-y-6">
              <p className="text-dark-200 text-lg leading-relaxed">
                Soy <span className="text-white font-semibold">{personalInfo.name}</span>,
                egresado de <span className="text-primary-400">{education.degree}</span>.
                Mi pasión por la tecnología me ha llevado a especializarme en el desarrollo
                de aplicaciones web completas, desde la interfaz de usuario hasta la
                arquitectura del servidor.
              </p>
              <p className="text-dark-300 leading-relaxed">
                Me caracterizo por mi capacidad de aprendizaje rápido, atención al detalle
                y compromiso con la calidad. Disfruto resolviendo problemas complejos y
                transformando ideas en productos digitales funcionales y atractivos.
              </p>
              <p className="text-dark-300 leading-relaxed">
                Estoy en búsqueda de oportunidades donde pueda aportar mis conocimientos,
                seguir creciendo profesionalmente y ser parte de un equipo que impulse
                la innovación tecnológica.
              </p>

              {/* Quick info */}
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="glass-light px-4 py-2 rounded-lg">
                  <span className="text-dark-400 text-sm">Ubicación</span>
                  <p className="text-white font-medium">{personalInfo.location}</p>
                </div>
                <div className="glass-light px-4 py-2 rounded-lg">
                  <span className="text-dark-400 text-sm">Formación</span>
                  <p className="text-white font-medium">Ingeniero de Sistemas</p>
                </div>
                <div className="glass-light px-4 py-2 rounded-lg">
                  <span className="text-dark-400 text-sm">Disponibilidad</span>
                  <p className="text-primary-400 font-medium">Inmediata</p>
                </div>
              </div>
            </motion.div>

            {/* Right - Highlights Grid */}
            <motion.div
              variants={containerVariants}
              className="grid sm:grid-cols-2 gap-4"
            >
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="card group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-4 group-hover:bg-primary-500/20 transition-colors">
                    <item.icon className="text-primary-400" size={24} />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-dark-400 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
