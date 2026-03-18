import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTheme } from '../components/Layout';
import { projects } from '../data/projects';

export default function Projects() {
  const { theme } = useTheme();

  useEffect(() => {
    document.title = 'Projects - Sai Sravan Biyyapu';
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 pb-28">
      <Link
        to="/"
        className="inline-flex items-center gap-2 mb-12 text-sm transition-opacity hover:opacity-70"
        style={{ color: theme.textMuted }}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to home
      </Link>

      <motion.h1
        className="text-3xl font-bold mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Projects
      </motion.h1>
      <motion.p
        className="mb-10"
        style={{ color: theme.textMuted }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        Selected work and case studies.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
          >
            <Link
              to={`/projects/${project.id}`}
              className="group block rounded-xl border overflow-hidden transition-all duration-200 hover:-translate-y-1"
              style={{
                backgroundColor: theme.cardBg,
                borderColor: theme.border,
                color: theme.text,
              }}
            >
              <div className="aspect-[16/10] overflow-hidden flex justify-center" style={{ backgroundColor: project.caseStudy ? '#f0f0f0' : theme.bg }}>
                {project.caseStudy ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-[55%] object-cover object-top mt-8 rounded-t-[2rem] transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                )}
              </div>
              <div className="p-4 flex items-start justify-between gap-2">
                <div>
                  <h2 className="font-semibold">{project.title}</h2>
                  <p className="text-sm mt-1" style={{ color: theme.textMuted }}>
                    {project.description}
                  </p>
                </div>
                <ArrowRight
                  className="w-4 h-4 shrink-0 mt-1 transition-transform duration-200 group-hover:translate-x-1"
                  style={{ color: theme.textMuted }}
                />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
