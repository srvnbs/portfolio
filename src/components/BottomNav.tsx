import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './Layout';

function NavIcon({ to, active, theme, children }: {
  to: string;
  active: boolean;
  theme: Record<string, string>;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <Link
        to={to}
        className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border transition-all duration-200 hover:scale-105"
        style={{
          borderColor: theme.border,
          color: theme.text,
        }}
      >
        {children}
      </Link>
      <span
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-opacity duration-200"
        style={{
          backgroundColor: theme.text,
          opacity: active ? 1 : 0,
        }}
      />
    </div>
  );
}

export function BottomNav() {
  const { pathname } = useLocation();
  const { darkMode, setDarkMode, theme } = useTheme();

  const isHome = pathname === '/';
  const isProjects = pathname.startsWith('/projects');
  const isExperiments = pathname.startsWith('/experiments');

  return (
    <nav className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[calc(100vw-2rem)]">
      <div
        className="flex items-center gap-2 sm:gap-3 p-3 rounded-full shadow-lg border"
        style={{
          backgroundColor: theme.cardBg,
          borderColor: theme.border,
          boxShadow: darkMode
            ? '0 8px 32px rgba(0,0,0,0.4)'
            : '0 8px 32px rgba(0,0,0,0.12)',
        }}
      >
        <NavIcon to="/" active={isHome} theme={theme}>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </NavIcon>

        <NavIcon to="/projects" active={isProjects} theme={theme}>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <rect x="2" y="2" width="9" height="9" rx="2" />
            <rect x="13" y="2" width="9" height="9" rx="2" />
            <rect x="2" y="13" width="9" height="9" rx="2" />
            <rect x="13" y="13" width="9" height="9" rx="2" />
          </svg>
        </NavIcon>

        <NavIcon to="/experiments" active={isExperiments} theme={theme}>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 448 512">
            <path d="M288 0H160 128C110.3 0 96 14.3 96 32s14.3 32 32 32V196.8c0 11.8-3.3 23.5-9.5 33.5L10.3 406.2C3.6 417.2 0 429.7 0 442.6C0 480.9 31.1 512 69.4 512H378.6c38.3 0 69.4-31.1 69.4-69.4c0-12.8-3.6-25.4-10.3-36.4L329.5 230.4c-6.2-10.1-9.5-21.7-9.5-33.5V64c17.7 0 32-14.3 32-32s-14.3-32-32-32H288zM192 196.8V64h64V196.8c0 23.7 6.6 46.9 19 67.1L309.5 320h-171L173 263.9c12.4-20.2 19-43.4 19-67.1z"/>
          </svg>
        </NavIcon>

        <Link
          to="/contact"
          className="h-11 sm:h-12 flex items-center justify-center px-5 sm:px-6 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 whitespace-nowrap"
          style={{
            backgroundColor: theme.text,
            color: theme.bg,
          }}
        >
          Contact Me
        </Link>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border transition-all duration-200 hover:scale-105"
          style={{
            borderColor: theme.border,
            color: theme.text,
          }}
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </nav>
  );
}
