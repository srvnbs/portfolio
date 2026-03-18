import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useTheme } from '../components/Layout';
import { TerminalGlitchCanvas } from '../components/terminal/TerminalGlitchCanvas';

export default function Terminal() {
  const { theme } = useTheme();

  useEffect(() => {
    document.title = 'Terminal - Sai Sravan Biyyapu';
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <Link
        to="/experiments"
        className="inline-flex items-center gap-2 mb-12 text-sm transition-opacity hover:opacity-70"
        style={{ color: theme.textMuted }}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to experiments
      </Link>

      <motion.h1
        className="text-3xl font-bold mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Terminal
      </motion.h1>
      <motion.p
        className="mb-8"
        style={{ color: theme.textMuted }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        ASCII art with decrypt animation and decoder lens. Hover to reveal.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl overflow-hidden"
        style={{ backgroundColor: '#050505' }}
      >
        {/* Terminal header */}
        <div className="flex items-start justify-between px-5 pt-4 pb-2" style={{ fontFamily: 'monospace' }}>
          <div>
            <div className="text-[10px] font-bold tracking-[0.3em]" style={{ color: 'rgba(0, 255, 65, 0.3)' }}>
              TERMINAL
            </div>
            <div className="text-[9px] mt-0.5" style={{ color: 'rgba(0, 255, 65, 0.2)' }}>
              {'>'} CONNECTED
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] tracking-widest uppercase" style={{ color: 'rgba(0, 255, 65, 0.3)' }}>Available</span>
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: 'rgba(0, 255, 65, 0.5)' }}
            />
          </div>
        </div>

        {/* Terminal body */}
        <div className="relative w-full border border-[rgba(0,255,65,0.1)] rounded-lg overflow-hidden mx-auto" style={{ height: '550px' }}>
          {/* Corner brackets */}
          <div className="absolute top-3 left-3 w-5 h-5 border-t border-l" style={{ borderColor: '#00ff41' }} />
          <div className="absolute top-3 right-3 w-5 h-5 border-t border-r" style={{ borderColor: '#00ff41' }} />
          <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l" style={{ borderColor: '#00ff41' }} />
          <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r" style={{ borderColor: '#00ff41' }} />

          <TerminalGlitchCanvas imageUrl="/images/terminal-silhouette.jpg" />
        </div>
      </motion.div>
    </div>
  );
}
