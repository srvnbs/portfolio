import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '../components/Layout';
import { projects } from '../data/projects';

export default function Projects() {
  const { theme } = useTheme();

  useEffect(() => {
    document.title = 'Work - Sai Sravan Biyyapu';
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 pb-28">
      <motion.h1
        className="text-3xl font-bold mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Work
      </motion.h1>
      <motion.div
        className="mb-8 space-y-4 leading-relaxed"
        style={{ color: theme.textMuted }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <p>
          I’m driven by understanding people’s challenges and designing experiences that make things better.
        </p>
        <p>
          Previously, I designed mobile and web lending products that help banks, NBFCs, MFIs and fintechs manage the lending journey from borrower onboarding through loan servicing. I worked as a solo designer at one startup and later partnered with product and engineering teams at another.
        </p>
        <p>
          My work on a core lending platform included loan origination, workflow tools, business rules, back-office portals and mobile apps for DSAs and field officers.
        </p>
      </motion.div>
      <motion.p
        className="mb-10"
        style={{ color: theme.textMuted }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        Selected projects and case studies.
      </motion.p>

      <div className="grid grid-cols-1 gap-6">
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
              <div className="aspect-[20/9] overflow-hidden flex justify-center" style={{ backgroundColor: project.caseStudy ? '#f0f0f0' : theme.bg }}>
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
