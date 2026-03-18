import { useState, useEffect, createContext, useContext } from 'react';
import { motion } from 'motion/react';
import { BottomNav } from './BottomNav';

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
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });
  const [showCursor, setShowCursor] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

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

  // Custom cursor tracking
  useEffect(() => {
    if (isTouchDevice) return;
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      if (!showCursor) setShowCursor(true);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
        {/* Custom Cursor */}
        {showCursor && (
          <>
            <motion.div
              className="hidden md:block fixed w-[8px] h-[8px] rounded-full pointer-events-none"
              style={{ backgroundColor: theme.cursor, zIndex: 9999 }}
              animate={{ x: cursorPosition.x - 4, y: cursorPosition.y - 4 }}
              transition={{ type: "spring", damping: 30, stiffness: 500, mass: 0.5 }}
            />
            <motion.div
              className="hidden md:block fixed w-[40px] h-[40px] border rounded-full pointer-events-none"
              style={{ borderColor: theme.cursor, zIndex: 9999 }}
              animate={{ x: cursorPosition.x - 20, y: cursorPosition.y - 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200, mass: 0.8 }}
            />
          </>
        )}

        {children}
        <BottomNav />
      </div>
    </ThemeContext.Provider>
  );
}
