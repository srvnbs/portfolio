import { useEffect } from 'react';
import { ArrowRight, CloudRain } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../components/Layout';

export default function Playground() {
  const { theme } = useTheme();

  useEffect(() => {
    document.title = 'Playground - Sai Sravan Biyyapu';
  }, []);

  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-16 pb-28">
      <p
        className="text-xs tracking-[0.18em] uppercase mb-3"
        style={{ color: theme.textMuted }}
      >
        Local preview
      </p>
      <h1 className="text-3xl font-bold mb-2">Playground</h1>
      <p className="mb-10" style={{ color: theme.textMuted }}>
        Small ideas in progress. This page is available in the local development preview.
      </p>

      <Link
        to="/playground/letter-rain"
        className="group flex items-center gap-5 p-5 rounded-xl border transition-all duration-200 hover:-translate-y-0.5"
        style={{
          backgroundColor: theme.cardBg,
          borderColor: theme.border,
          color: theme.text,
        }}
      >
        <div
          className="flex items-center justify-center w-14 h-14 rounded-lg shrink-0"
          style={{ backgroundColor: theme.bg, color: theme.text }}
        >
          <CloudRain className="w-8 h-8" strokeWidth={1.5} />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold">Letter Rain</h2>
          <p className="text-sm" style={{ color: theme.textMuted }}>
            A poem that scatters into rain and gathers on an umbrella.
          </p>
        </div>
        <ArrowRight
          className="w-5 h-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
          style={{ color: theme.textMuted }}
        />
      </Link>
    </main>
  );
}
