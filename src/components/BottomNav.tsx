import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Moon, Sparkles, Sun } from 'lucide-react';
import { useTheme } from './Layout';

function NavIcon({ to, active, theme, children, ariaLabel }: {
  to: string;
  active: boolean;
  theme: Record<string, string>;
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  return (
    <div className="relative">
      <Link
        to={to}
        aria-label={ariaLabel}
        className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border transition-colors duration-200 hover:scale-105"
        style={{
          backgroundColor: active ? theme.text : 'transparent',
          borderColor: active ? theme.text : theme.border,
          color: active ? theme.bg : theme.text,
        }}
      >
        <motion.span
          className="flex items-center justify-center"
          animate={active ? { scale: [1, 1.15, 1] } : { scale: 1 }}
          transition={active ? { duration: 0.35, ease: 'easeInOut' } : {}}
        >
          {children}
        </motion.span>
      </Link>
      <motion.span
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
        initial={false}
        animate={{
          opacity: active ? 1 : 0,
          scale: active ? 1 : 0.5,
          backgroundColor: active ? theme.accent : theme.text,
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      />
    </div>
  );
}

function NavText({ to, active, theme, children }: {
  to: string;
  active: boolean;
  theme: Record<string, string>;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <Link
        to={to}
        className="h-11 sm:h-12 flex items-center justify-center px-5 sm:px-6 rounded-full border-[1.5px] text-sm font-semibold transition-colors duration-200 hover:scale-105 whitespace-nowrap"
        style={{
          backgroundColor: active ? theme.text : 'transparent',
          borderColor: active ? theme.text : theme.border,
          color: active ? theme.bg : theme.text,
        }}
      >
        <motion.span
          animate={active ? { scale: [1, 1.05, 1] } : { scale: 1 }}
          transition={active ? { duration: 0.35, ease: 'easeInOut' } : {}}
        >
          {children}
        </motion.span>
      </Link>
      <motion.span
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
        initial={false}
        animate={{
          opacity: active ? 1 : 0,
          scale: active ? 1 : 0.5,
          backgroundColor: active ? theme.accent : theme.text,
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      />
    </div>
  );
}

export function BottomNav() {
  const { pathname } = useLocation();
  const { darkMode, toggleDarkMode, theme } = useTheme();

  const isHome = pathname === '/';
  const isProjects = pathname.startsWith('/projects');
  const isExperiments = pathname.startsWith('/experiments');
  const isPlayground = pathname.startsWith('/playground');
  const isContact = pathname === '/contact';

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
          <svg className="w-5 h-5" viewBox="0 0 576 512" fill="currentColor">
            <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V400 336c0-26.5-21.5-48-48-48H272c-26.5 0-48 21.5-48 48v64 72c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/>
          </svg>
        </NavIcon>

        <NavIcon to="/projects" active={isProjects} theme={theme} ariaLabel="Work">
          <svg className="w-5 h-5" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true">
            <path d="M48 160a32 32 0 0 1 32-32h352a32 32 0 0 1 32 32v256a32 32 0 0 1-32 32H80a32 32 0 0 1-32-32V160zm112-32V96a48 48 0 0 1 48-48h96a48 48 0 0 1 48 48v32h-48V96h-96v32h-48z" />
            <path d="M64 240h384" fill="none" stroke={theme.cardBg} strokeWidth="24" />
          </svg>
        </NavIcon>

        <NavIcon to="/experiments" active={isExperiments} theme={theme}>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 448 512">
            <path d="M288 0H160 128C110.3 0 96 14.3 96 32s14.3 32 32 32V196.8c0 11.8-3.3 23.5-9.5 33.5L10.3 406.2C3.6 417.2 0 429.7 0 442.6C0 480.9 31.1 512 69.4 512H378.6c38.3 0 69.4-31.1 69.4-69.4c0-12.8-3.6-25.4-10.3-36.4L329.5 230.4c-6.2-10.1-9.5-21.7-9.5-33.5V64c17.7 0 32-14.3 32-32s-14.3-32-32-32H288zM192 196.8V64h64V196.8c0 23.7 6.6 46.9 19 67.1L309.5 320h-171L173 263.9c12.4-20.2 19-43.4 19-67.1z"/>
          </svg>
        </NavIcon>

        {import.meta.env.DEV && (
          <NavIcon to="/playground" active={isPlayground} theme={theme} ariaLabel="Playground">
            <Sparkles className="w-5 h-5" />
          </NavIcon>
        )}

        <NavText to="/contact" active={isContact} theme={theme}>
          Contact
        </NavText>

        <button
          onClick={(event) => {
            const bounds = event.currentTarget.getBoundingClientRect();
            toggleDarkMode({
              x: bounds.left + bounds.width / 2,
              y: bounds.top + bounds.height / 2,
            });
          }}
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
