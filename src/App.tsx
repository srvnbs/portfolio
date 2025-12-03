import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Moon, Sun } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import profileImage from 'figma:asset/81f683565768878cc7a4a6d9706864377017a4e4.png';

export default function App() {
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });
  const [showCursor, setShowCursor] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Set page title and meta tags
  useEffect(() => {
    document.title = 'Sai Sravan Biyyapu - Product Designer';
    
    // Set lang attribute on HTML element
    document.documentElement.lang = 'en';
    
    // Set or update meta tags
    const setMetaTag = (property: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${property}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    // Set or update link tags
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      if (!element) {
        element = document.createElement('link');
        element.rel = rel;
        document.head.appendChild(element);
      }
      element.href = href;
    };

    const siteUrl = 'https://saisravan.netlify.app';
    const imageUrl = `${siteUrl}${profileImage}`;

    // Set favicon and apple touch icon
    setLinkTag('icon', profileImage);
    setLinkTag('apple-touch-icon', profileImage);
    setLinkTag('canonical', siteUrl);

    // Standard meta tags
    setMetaTag('description', 'A Product Designer creating digital experiences.');
    setMetaTag('author', 'Sai Sravan Biyyapu');
    
    // Open Graph tags for social sharing
    setMetaTag('og:title', 'Sai Sravan Biyyapu - Product Designer', true);
    setMetaTag('og:description', 'A Product Designer creating digital experiences.', true);
    setMetaTag('og:type', 'website', true);
    setMetaTag('og:url', siteUrl, true);
    setMetaTag('og:image', imageUrl, true);
    setMetaTag('og:site_name', 'Sai Sravan Biyyapu Portfolio', true);
    
    // Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', 'Sai Sravan Biyyapu - Product Designer');
    setMetaTag('twitter:description', 'A Product Designer creating digital experiences.');
    setMetaTag('twitter:image', imageUrl);

    // Add structured data (JSON-LD)
    let structuredData = document.querySelector('script[type="application/ld+json"]');
    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.type = 'application/ld+json';
      document.head.appendChild(structuredData);
    }
    
    const schema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Sai Sravan Biyyapu",
      "jobTitle": "Product Designer",
      "description": "A Product Designer creating digital experiences.",
      "image": imageUrl,
      "url": siteUrl,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Bengaluru",
        "addressCountry": "IN"
      },
      "sameAs": [
        "https://www.linkedin.com/in/saisravanbiyyapu",
        "https://dribbble.com/saisravanbiyyapu",
        "https://www.behance.net/saisravanbiyyapu",
        "mailto:saisravan.biyyapu@gmail.com"
      ]
    };
    
    structuredData.textContent = JSON.stringify(schema);
  }, []);

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    } else if (savedTheme === null && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  // Save theme preference to localStorage and update DOM class
  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    
    // Add or remove the 'dark' class on the document element
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Update theme-color meta tag based on dark mode
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
    textMuted: darkMode ? '#888888' : '#999999',
    accent: darkMode ? '#f5f5f5' : '#2d2d2d',
    cardBg: darkMode ? '#242424' : '#ffffff',
    border: darkMode ? '#333333' : '#e5e5e5',
    cursor: darkMode ? '#f5f5f5' : '#2d2d2d',
    tooltip: darkMode ? '#f5f5f5' : '#2d2d2d',
    tooltipText: darkMode ? '#1a1a1a' : '#f5f5f5',
    availableBg: darkMode ? '#10b98133' : '#10b98120',
    availableText: darkMode ? '#10b981' : '#059669',
  };

  return (
    <div 
      className="min-h-screen relative font-['Inter',sans-serif] transition-colors duration-300"
      style={{ backgroundColor: theme.bg, color: theme.text }}
    >
      {/* Custom Cursor */}
      {showCursor && (
        <>
          <motion.div
            className="hidden md:block fixed w-[8px] h-[8px] rounded-full pointer-events-none"
            style={{
              backgroundColor: theme.cursor,
              zIndex: 9999,
            }}
            animate={{
              x: cursorPosition.x - 4,
              y: cursorPosition.y - 4,
            }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 500,
              mass: 0.5,
            }}
          />
          <motion.div
            className="hidden md:block fixed w-[40px] h-[40px] border rounded-full pointer-events-none"
            style={{
              borderColor: theme.cursor,
              zIndex: 9999,
            }}
            animate={{
              x: cursorPosition.x - 20,
              y: cursorPosition.y - 20,
            }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 200,
              mass: 0.8,
            }}
          />
        </>
      )}

      {/* Dark Mode Toggle */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-8 right-8 z-50 p-3 rounded-full transition-all duration-300 hover:scale-110"
        style={{ backgroundColor: theme.cardBg, color: theme.text }}
        aria-label="Toggle dark mode"
      >
        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </motion.button>

      <main className="container mx-auto px-8 max-w-[1200px]">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center min-h-screen py-12">
          <div className="max-w-[800px] w-full text-center">
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
              className="mb-8"
            >
              <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[150px] md:h-[150px] mx-auto rounded-full overflow-hidden">
                <ImageWithFallback
                  src={profileImage}
                  alt="Sai Sravan Biyyapu - Product Designer"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </motion.div>

            {/* Hero Title */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="mb-4 leading-[1.1] text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem]"
              style={{ fontFamily: "'Merriweather', serif", fontWeight: 400, color: theme.text }}
            >
              Hello, I'm Sai.
            </motion.h1>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              className="max-w-[750px] mx-auto text-center mb-4"
            >
              <p className="pb-4 text-[17px] sm:text-[18px] md:text-[20px] mt-[-8px]" style={{ color: theme.text }}>
                A Product Designer based in Bengaluru
              </p>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              className="max-w-[750px] mx-auto text-center mb-8"
            >
              <p className="text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed" style={{ color: theme.textSecondary }}>
                Crafting human-centered, accessible, and beautiful digital experiences. <br />Currently, at M2P Fintech
              </p>
            </motion.div>

            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg mb-12 border-[3px]"
              style={{ 
                backgroundColor: darkMode ? '#10b981' : '#10b981',
                color: '#ffffff',
                borderColor: darkMode ? '#0ea672' : '#059669',
                transform: 'rotate(-1.5deg)',
                boxShadow: darkMode 
                  ? '0 2px 8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
                  : '0 2px 8px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                fontFamily: "'Inter', sans-serif",
                letterSpacing: '0.02em'
              }}
            >
              <span 
                className="w-2 h-2 rounded-full animate-pulse" 
                style={{ backgroundColor: '#ffffff' }}
              ></span>
              <span className="text-sm font-semibold uppercase tracking-wide">Open to opportunities</span>
            </motion.div>

            {/* Social Links Title */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
              className="mb-4 text-[16px]"
              style={{ color: theme.text }}
            >
              Let's connect
            </motion.h2>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
              className="flex gap-8 justify-center items-center"
            >
              <motion.a
                href="mailto:sravanworld95@gmail.com"
                className="group relative transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded"
                style={{ color: theme.text }}
                aria-label="Email Sai"
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                  <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/>
                </svg>
                
                {/* Tooltip */}
                <span 
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[11px] px-3 py-2 rounded text-sm whitespace-nowrap opacity-0 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:mb-[14px] group-focus-visible:opacity-100 group-focus-visible:mb-[14px]"
                  style={{ backgroundColor: theme.tooltip, color: theme.tooltipText }}
                >
                  Email Sai
                </span>
                <span 
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[5px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] opacity-0 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:mb-[8px] group-focus-visible:opacity-100 group-focus-visible:mb-[8px]"
                  style={{ borderTopColor: theme.tooltip }}
                ></span>
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/sai-sravan-biyyapu/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded"
                style={{ color: theme.text }}
                aria-label="Connect on LinkedIn"
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                  <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/>
                </svg>
                
                {/* Tooltip */}
                <span 
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[11px] px-3 py-2 rounded text-sm whitespace-nowrap opacity-0 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:mb-[14px] group-focus-visible:opacity-100 group-focus-visible:mb-[14px]"
                  style={{ backgroundColor: theme.tooltip, color: theme.tooltipText }}
                >
                  Connect on LinkedIn
                </span>
                <span 
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[5px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] opacity-0 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:mb-[8px] group-focus-visible:opacity-100 group-focus-visible:mb-[8px]"
                  style={{ borderTopColor: theme.tooltip }}
                ></span>
              </motion.a>

              <motion.a
                href="https://www.behance.net/saisravan"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded"
                style={{ color: theme.text }}
                aria-label="View work on Behance"
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg">
                  <path d="M232 237.2c31.8-15.2 48.4-38.2 48.4-74 0-70.6-52.6-87.8-113.3-87.8H0v354.4h171.8c64.4 0 124.9-30.9 124.9-102.9 0-44.5-21.1-77.4-64.7-89.7zM77.9 135.9H151c28.1 0 53.4 7.9 53.4 40.5 0 30.1-19.7 42.2-47.5 42.2h-79v-82.7zm83.3 233.7H77.9V272h84.9c34.3 0 56 14.3 56 50.6 0 35.8-25.9 47-57.6 47zm358.5-240.7H376V94h143.7v34.9zM576 305.2c0-75.9-44.4-139.2-124.9-139.2-78.2 0-131.3 58.8-131.3 135.8 0 79.9 50.3 134.7 131.3 134.7 61.3 0 101-27.6 120.1-86.3H509c-6.7 21.9-34.3 33.5-55.7 33.5-41.3 0-63-24.2-63-65.3h185.1c.3-4.2 .6-8.7 .6-13.2zM390.4 274c2.3-33.7 24.7-54.8 58.5-54.8 35.4 0 53.2 20.8 56.2 54.8H390.4z"/>
                </svg>
                
                {/* Tooltip */}
                <span 
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[11px] px-3 py-2 rounded text-sm whitespace-nowrap opacity-0 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:mb-[14px] group-focus-visible:opacity-100 group-focus-visible:mb-[14px]"
                  style={{ backgroundColor: theme.tooltip, color: theme.tooltipText }}
                >
                  See work samples
                </span>
                <span 
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[5px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] opacity-0 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:mb-[8px] group-focus-visible:opacity-100 group-focus-visible:mb-[8px]"
                  style={{ borderTopColor: theme.tooltip }}
                ></span>
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* Skills Section - Temporarily hidden */}
        {/* 
        <motion.section
          initial={{ opacity: 0, y: 20 }}
        >
          <h2 className="text-center mb-8 text-[2rem]" style={{ fontFamily: "'Merriweather', serif", fontWeight: 400 }}>
            Specializations
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {['UX Research', 'Interaction Design', 'Design Systems', 'Prototyping', 'User Testing', 'Accessibility', 'Fintech', 'Mobile Design'].map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 rounded-full text-sm transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: theme.cardBg, color: theme.text, border: `1px solid ${theme.border}` }}
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.section>
        */}
      </main>
    </div>
  );
}