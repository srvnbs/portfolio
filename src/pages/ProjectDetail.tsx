import { useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
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

  if (!project) return <Navigate to="/projects" replace />;

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
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
        <h1 className="text-3xl font-bold mb-3">{project.title}</h1>
        <p className="text-lg" style={{ color: theme.textSecondary }}>{project.description}</p>
      </motion.div>

      <motion.div
        className="rounded-xl overflow-hidden border mb-8"
        style={{ borderColor: theme.border }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full"
        />
      </motion.div>

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
          View full case study on Behance
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
    </div>
  );
}
