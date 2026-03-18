import { useState, useEffect, useRef, createContext, useContext } from 'react';
import { BottomNav } from './BottomNav';

const TRAIL_LENGTH = 12;
const TRAIL_INTERVAL = 16; // ~60fps

type TrailPoint = { x: number; y: number; id: number };

type ThemeContextType = {
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
  theme: {
    bg: string;
    text: string;
    textSecondary: string;
    textMuted: string;
    accent: string;
    cardBg: string;
    border: string;
    cursor: string;
  };
};

const ThemeContext = createContext<ThemeContextType>(null!);
export const useTheme = () => useContext(ThemeContext);

export function Layout({ children }: { children: React.ReactNode }) {
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [showCursor, setShowCursor] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const idCounter = useRef(0);
  const lastUpdate = useRef(0);

  // Initialize dark mode
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    } else if (savedTheme === null && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  // Persist dark mode
  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    let themeColorMeta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement;
    if (!themeColorMeta) {
      themeColorMeta = document.createElement('meta');
      themeColorMeta.name = 'theme-color';
      document.head.appendChild(themeColorMeta);
    }
    themeColorMeta.content = darkMode ? '#0a0a0a' : '#f5f5f5';
  }, [darkMode]);

  // Detect touch device
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Trail cursor tracking
  const idleTimer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => {
    if (isTouchDevice) return;
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastUpdate.current < TRAIL_INTERVAL) return;
      lastUpdate.current = now;

      if (!showCursor) setShowCursor(true);
      const id = ++idCounter.current;
      setTrail(prev => [...prev.slice(-(TRAIL_LENGTH - 1)), { x: e.clientX, y: e.clientY, id }]);

      // Gradually drain trail when mouse stops
      clearTimeout(idleTimer.current);
      const drainTrail = () => {
        setTrail(prev => {
          if (prev.length <= 1) return prev;
          return prev.slice(1); // remove oldest point
        });
        idleTimer.current = setTimeout(drainTrail, 18);
      };
      idleTimer.current = setTimeout(drainTrail, 80);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(idleTimer.current);
    };
  }, [showCursor, isTouchDevice]);

  const theme = {
    bg: darkMode ? '#1a1a1a' : '#f5f5f5',
    text: darkMode ? '#f5f5f5' : '#1a1a1a',
    textSecondary: darkMode ? '#b0b0b0' : '#3a3a3a',
    textMuted: darkMode ? '#888888' : '#666666',
    accent: darkMode ? '#f5f5f5' : '#2d2d2d',
    cardBg: darkMode ? '#242424' : '#ffffff',
    border: darkMode ? '#333333' : '#e5e5e5',
    cursor: darkMode ? '#f5f5f5' : '#2d2d2d',
  };

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, theme }}>
      <div className="min-h-screen relative font-['Inter',sans-serif] transition-colors duration-300" style={{ backgroundColor: theme.bg, color: theme.text }}>
        {/* Trail Cursor */}
        {showCursor && (
          <div className="hidden md:block fixed inset-0 pointer-events-none" style={{ zIndex: 9999 }}>
            {trail.map((point, i) => {
              const progress = i / (trail.length - 1 || 1); // 0 (oldest) → 1 (newest)
              const size = 3 + progress * 5; // 3px → 8px
              const opacity = 0.08 + progress * 0.92; // fades out toward tail
              return (
                <div
                  key={point.id}
                  className="fixed rounded-full"
                  style={{
                    width: size,
                    height: size,
                    backgroundColor: theme.cursor,
                    opacity,
                    left: point.x - size / 2,
                    top: point.y - size / 2,
                    transition: 'opacity 0.3s ease-out',
                  }}
                />
              );
            })}
          </div>
        )}

        {children}
        <BottomNav />
      </div>
    </ThemeContext.Provider>
  );
}
