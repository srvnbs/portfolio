import { useEffect, useState, useCallback } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ExternalLink, X } from 'lucide-react';
import { useTheme } from '../components/Layout';
import { projects } from '../data/projects';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const { theme } = useTheme();

  const project = projects.find(p => p.id === id);
  const projectIndex = projects.findIndex(p => p.id === id);
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  useEffect(() => {
    if (project) {
      document.title = `${project.title} - Sai Sravan Biyyapu`;
    }
    window.scrollTo(0, 0);
  }, [project]);

  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const closeLightbox = useCallback(() => setLightboxImg(null), []);

  useEffect(() => {
    if (!lightboxImg) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeLightbox(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', handleKey); };
  }, [lightboxImg, closeLightbox]);

  if (!project) return <Navigate to="/projects" replace />;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 pb-28">
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 mb-8 text-sm transition-opacity hover:opacity-70"
        style={{ color: theme.textMuted }}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to projects
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-bold mb-3">{project.title}</h1>
        <p className="text-base sm:text-lg" style={{ color: theme.textSecondary }}>{project.description}</p>
      </motion.div>

      {!project.caseStudy && (
        <motion.div
          className="rounded-xl overflow-hidden border mb-8 cursor-pointer"
          style={{ borderColor: theme.border }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => setLightboxImg(project.image)}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full"
          />
        </motion.div>
      )}

      {project.caseStudy && (
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <p className="text-lg mb-10 leading-relaxed" style={{ color: theme.textSecondary }}>
            {project.caseStudy.overview}
          </p>

          {project.caseStudy.heroImages && (
            <div className="flex gap-3 sm:gap-4 mb-12 justify-center overflow-x-auto px-2">
              {project.caseStudy.heroImages.map((img, i) => (
                <div
                  key={i}
                  className="rounded-2xl overflow-hidden p-3 sm:p-6 cursor-pointer shrink-0"
                  style={{ backgroundColor: '#f0f0f0' }}
                  onClick={() => setLightboxImg(img)}
                >
                  <img
                    src={img}
                    alt={`${project.title} screen ${i + 1}`}
                    className="h-[280px] sm:h-[432px] w-auto rounded-lg object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-col gap-12">
            {project.caseStudy.sections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
              >
                <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
                <div className="flex flex-col gap-3">
                  {section.content.map((paragraph, j) => (
                    <p key={j} className="leading-relaxed" style={{ color: theme.textSecondary }}>
                      {paragraph}
                    </p>
                  ))}
                </div>
                {section.images && (
                  <div className="flex flex-wrap gap-3 sm:gap-4 mt-6 justify-center">
                    {section.images.map((img, j) => (
                      <div
                        key={j}
                        className="rounded-2xl overflow-hidden p-3 sm:p-6 cursor-pointer"
                        style={{ backgroundColor: '#f0f0f0' }}
                        onClick={() => setLightboxImg(img)}
                      >
                        <img
                          src={img}
                          alt={`${section.title} illustration ${j + 1}`}
                          className="max-w-full rounded-lg object-contain"
                          style={{ maxHeight: '400px' }}
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all hover:opacity-80"
          style={{ backgroundColor: theme.text, color: theme.bg }}
        >
          {project.caseStudy ? 'View on Behance' : 'View full case study on Behance'}
          <ExternalLink className="w-4 h-4" />
        </a>
      </motion.div>

      {/* Prev / Next navigation */}
      <motion.div
        className="flex justify-between items-center pt-8 border-t"
        style={{ borderColor: theme.border }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
      >
        {prevProject ? (
          <Link
            to={`/projects/${prevProject.id}`}
            className="flex flex-col gap-1 transition-opacity hover:opacity-70"
          >
            <span className="text-xs" style={{ color: theme.textMuted }}>Previous</span>
            <span className="text-sm font-medium">{prevProject.title}</span>
          </Link>
        ) : <div />}
        {nextProject ? (
          <Link
            to={`/projects/${nextProject.id}`}
            className="flex flex-col gap-1 items-end transition-opacity hover:opacity-70"
          >
            <span className="text-xs" style={{ color: theme.textMuted }}>Next</span>
            <span className="text-sm font-medium">{nextProject.title}</span>
          </Link>
        ) : <div />}
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button
              className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors"
              onClick={closeLightbox}
              aria-label="Close"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img
              src={lightboxImg}
              alt="Enlarged view"
              className="max-w-[90vw] max-h-[90vh] rounded-xl object-contain"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
