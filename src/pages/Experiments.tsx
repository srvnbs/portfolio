import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTheme } from '../components/Layout';

const experiments = [
  {
    id: 'carroms',
    title: 'Carroms',
    description: 'A carrom board game with physics engine and AI opponent.',
    path: '/experiments/carroms',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="2" />
        <circle cx="12" cy="12" r="2" />
        <circle cx="7" cy="7" r="1" />
        <circle cx="17" cy="7" r="1" />
        <circle cx="7" cy="17" r="1" />
        <circle cx="17" cy="17" r="1" />
      </svg>
    ),
  },
{
    id: 'marble-solitaire',
    title: 'Marble Solitaire',
    description: 'Classic peg solitaire with emerald marbles on a marble board.',
    path: '/experiments/marble-solitaire',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" fill="currentColor" opacity="0.3" />
        <circle cx="12" cy="6" r="1.5" fill="currentColor" />
        <circle cx="12" cy="18" r="1.5" fill="currentColor" />
        <circle cx="6" cy="12" r="1.5" fill="currentColor" />
        <circle cx="18" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
];

export default function Experiments() {
  const { theme } = useTheme();

  useEffect(() => {
    document.title = 'Experiments - Sai Sravan Biyyapu';
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
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
        Experiments
      </motion.h1>
      <motion.p
        className="mb-10"
        style={{ color: theme.textMuted }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        Side projects and creative explorations.
      </motion.p>

      <div className="flex flex-col gap-4">
        {experiments.map((exp, i) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
          >
            <Link
              to={exp.path}
              className="group flex items-center gap-5 p-5 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
              style={{
                backgroundColor: theme.cardBg,
                borderColor: theme.border,
                color: theme.text,
              }}
            >
              <div
                className="flex items-center justify-center w-14 h-14 rounded-lg shrink-0"
                style={{ backgroundColor: theme.bg }}
              >
                {exp.icon}
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{exp.title}</h2>
                <p className="text-sm" style={{ color: theme.textMuted }}>
                  {exp.description}
                </p>
              </div>
              <ArrowRight
                className="w-5 h-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                style={{ color: theme.textMuted }}
              />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
