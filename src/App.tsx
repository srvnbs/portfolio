import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { useTheme } from './components/Layout';
import { ProjectThumbnail } from './components/ProjectThumbnail';
import { featuredProjects } from './data/projects';
import { usePageTitle } from './hooks/usePageTitle';
import profileImage from 'figma:asset/81f683565768878cc7a4a6d9706864377017a4e4.png';

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: 'easeOut' as const },
});

export default function App() {
  const { theme } = useTheme();
  usePageTitle();

  // Favicon and canonical link. Description, Open Graph, Twitter and JSON-LD
  // tags are static in index.html so link-preview crawlers (which don't run JS) see them.
  useEffect(() => {
    document.documentElement.lang = 'en';

    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      if (!element) {
        element = document.createElement('link');
        element.rel = rel;
        document.head.appendChild(element);
      }
      element.href = href;
    };

    setLinkTag('icon', profileImage);
    setLinkTag('apple-touch-icon', profileImage);
    setLinkTag('canonical', 'https://saisravan.netlify.app');
  }, []);

  return (
    <div>
      <main className="container mx-auto px-6 sm:px-8 max-w-[1200px] pb-32 sm:pb-36">
        {/* Hero */}
        <section className="flex flex-col items-center pt-16 sm:pt-24 pb-14 sm:pb-20">
          <div className="max-w-[800px] w-full text-center">
            <motion.div {...fadeUp(0)} className="mb-8">
              <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[150px] md:h-[150px] mx-auto rounded-full overflow-hidden">
                <ImageWithFallback
                  src={profileImage}
                  alt="Sai Sravan Biyyapu - Product Designer"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </motion.div>

            <motion.h1
              {...fadeUp(0.1)}
              className="mb-4 leading-[1.1] text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem]"
              style={{ fontFamily: "'Merriweather', serif", fontWeight: 400, color: theme.text }}
            >
              Hello, I'm Sai.
            </motion.h1>

            <motion.div {...fadeUp(0.15)} className="max-w-[750px] mx-auto text-center">
              <p className="text-[17px] sm:text-[18px] md:text-[20px]" style={{ color: theme.text }}>
                Senior Product Designer based in Bengaluru
              </p>
              <p className="mt-0 text-[17px] sm:text-[18px] md:text-[20px]" style={{ color: theme.text }}>
                Crafting digital experiences at <a href="https://www.breadfinancial.com/" target="_blank" rel="noopener noreferrer" className="relative inline-block underline decoration-1 underline-offset-2 decoration-from-left transition-[text-decoration-thickness] duration-300 hover:decoration-[1.5px]">Bread Financial</a>.
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.2)} className="mt-8">
              <Link
                to="/projects"
                className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-[15px] font-semibold transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4"
                style={{ backgroundColor: theme.text, color: theme.bg, outlineColor: theme.text }}
              >
                View work
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Featured work */}
        <motion.section aria-labelledby="featured-heading" {...fadeUp(0.25)}>
          <div className="flex items-baseline justify-between gap-4 mb-5">
            <h2 id="featured-heading" className="text-xl font-semibold">
              Featured work
            </h2>
            <Link
              to="/projects"
              className="text-sm underline-offset-2 hover:underline"
              style={{ color: theme.textMuted }}
            >
              All projects
            </Link>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <li key={project.id}>
                <Link
                  to={`/projects/${project.id}`}
                  className="group flex h-full flex-col rounded-xl border overflow-hidden transition-transform duration-200 hover:-translate-y-1"
                  style={{ backgroundColor: theme.cardBg, borderColor: theme.border, color: theme.text }}
                >
                  <ProjectThumbnail project={project} aspectClass="aspect-[4/3]" />
                  <div className="p-4 flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold">{project.title}</h3>
                      <p className="text-sm mt-1" style={{ color: theme.textMuted }}>
                        {project.outcome ?? project.description}
                      </p>
                    </div>
                    <ArrowRight
                      className="w-4 h-4 shrink-0 mt-1 transition-transform duration-200 group-hover:translate-x-1"
                      style={{ color: theme.textMuted }}
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </motion.section>
      </main>
    </div>
  );
}
