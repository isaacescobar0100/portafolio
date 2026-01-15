import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { experience } from '../data/portfolio';

export default function Experience() {
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
    <section id="experiencia" className="py-20 md:py-32 relative">
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
              <span className="gradient-text">Experiencia</span> Profesional
            </h2>
            <p className="section-subtitle mx-auto">
              Mi trayectoria y experiencia en el desarrollo de software
            </p>
          </motion.div>

          {/* Experience Timeline */}
          <div className="max-w-3xl mx-auto">
            {experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                className="relative pl-8 pb-12 last:pb-0"
              >
                {/* Timeline line */}
                {index < experience.length - 1 && (
                  <div className="absolute left-[11px] top-12 bottom-0 w-0.5 bg-dark-700" />
                )}

                {/* Timeline dot */}
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-primary-500/20 border-2 border-primary-500 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary-500" />
                </div>

                {/* Content Card */}
                <div className="card group ml-4">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-primary-400 transition-colors">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 text-primary-400 font-medium mt-1">
                        <Briefcase size={16} />
                        {exp.company}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-dark-400 bg-dark-800 px-3 py-1 rounded-full text-sm">
                      <Calendar size={14} />
                      {exp.period}
                    </div>
                  </div>

                  <p className="text-dark-300 mb-4 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium bg-dark-800 text-dark-300 rounded-full border border-dark-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-12"
          >
            <p className="text-dark-400 mb-4">
              ¿Interesado en conocer más sobre mi perfil?
            </p>
            <a
              href="#contacto"
              className="btn-primary inline-flex items-center gap-2"
            >
              Contáctame
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
