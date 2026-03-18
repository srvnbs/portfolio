import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const MotionLink = motion.create(Link);
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { useTheme } from './components/Layout';
import profileImage from 'figma:asset/81f683565768878cc7a4a6d9706864377017a4e4.png';

export default function App() {
  const { darkMode, theme } = useTheme();

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
    let structuredData = document.querySelector<HTMLScriptElement>('script[type="application/ld+json"]');
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


  return (
    <div>
      <main className="container mx-auto px-8 max-w-[1200px]">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center min-h-screen py-12">
          <div className="max-w-[800px] w-full text-center">
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0, ease: 'easeOut' }}
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
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              className="mb-4 leading-[1.1] text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem]"
              style={{ fontFamily: "'Merriweather', serif", fontWeight: 400, color: theme.text }}
            >
              Hello, I'm Sai.
            </motion.h1>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
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
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              className="max-w-[750px] mx-auto text-center mb-8"
            >
              <p className="text-[15px] sm:text-[17px] md:text-[18px] leading-relaxed" style={{ color: theme.textSecondary }}>
                Crafting human-centered, accessible, and beautiful digital experiences. <br />Currently at M2P Fintech
              </p>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
              className="flex justify-center items-start"
            >
              <MotionLink
                to="/projects"
                className="w-[100px] flex flex-col items-center gap-2 transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded"
                style={{ color: theme.text }}
                aria-label="View projects"
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="9" height="9" rx="2" />
                  <rect x="13" y="2" width="9" height="9" rx="2" />
                  <rect x="2" y="13" width="9" height="9" rx="2" />
                  <rect x="13" y="13" width="9" height="9" rx="2" />
                </svg>
                <span className="text-xs" style={{ color: theme.textMuted }}>Projects</span>
              </MotionLink>

              <MotionLink
                to="/experiments"
                className="w-[100px] flex flex-col items-center gap-2 transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded"
                style={{ color: theme.text }}
                aria-label="View experiments"
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                  <path d="M288 0H160 128C110.3 0 96 14.3 96 32s14.3 32 32 32V196.8c0 11.8-3.3 23.5-9.5 33.5L10.3 406.2C3.6 417.2 0 429.7 0 442.6C0 480.9 31.1 512 69.4 512H378.6c38.3 0 69.4-31.1 69.4-69.4c0-12.8-3.6-25.4-10.3-36.4L329.5 230.4c-6.2-10.1-9.5-21.7-9.5-33.5V64c17.7 0 32-14.3 32-32s-14.3-32-32-32H288zM192 196.8V64h64V196.8c0 23.7 6.6 46.9 19 67.1L309.5 320h-171L173 263.9c12.4-20.2 19-43.4 19-67.1z"/>
                </svg>
                <span className="text-xs" style={{ color: theme.textMuted }}>Experiments</span>
              </MotionLink>

              <motion.a
                href="https://www.linkedin.com/in/sai-sravan-biyyapu/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[100px] flex flex-col items-center gap-2 transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded"
                style={{ color: theme.text }}
                aria-label="Connect on LinkedIn"
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                  <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/>
                </svg>
                <span className="text-xs" style={{ color: theme.textMuted }}>LinkedIn</span>
              </motion.a>

              <motion.a
                href="mailto:sravanworld95@gmail.com"
                className="w-[100px] flex flex-col items-center gap-2 transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded"
                style={{ color: theme.text }}
                aria-label="Email Sai"
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                  <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/>
                </svg>
                <span className="text-xs" style={{ color: theme.textMuted }}>Email</span>
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