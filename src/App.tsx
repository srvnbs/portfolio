import { useEffect } from 'react';
import { motion } from 'motion/react';
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
    setMetaTag('description', 'A Senior Product Designer creating digital experiences.');
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
                A Senior Product Designer based in Bengaluru
              </p>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              className="max-w-[750px] mx-auto text-center mb-14"
            >
              <p className="text-[15px] sm:text-[17px] md:text-[18px] leading-relaxed" style={{ color: theme.textSecondary }}>
                Crafting human-centered, accessible, and beautiful digital experiences. <br />Currently at <a href="https://www.breadfinancial.com/" target="_blank" rel="noopener noreferrer" className="relative inline-block underline decoration-1 underline-offset-2 decoration-from-left transition-[text-decoration-thickness] duration-300 hover:decoration-[1.5px]">Bread Financial</a>
              </p>
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