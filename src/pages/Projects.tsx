import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '../components/Layout';
import { projects } from '../data/projects';

const experience = [
  {
    dates: 'March 2026 to Present',
    title: 'Senior Product Designer',
    company: 'Bread Financial',
    companyLogo: '/images/company-logos/bread-financial.svg',
    companyLogoWidth: 'w-10',
    companyUrl: 'https://www.breadfinancial.com/',
    current: true,
  },
  {
    dates: 'September 2024 to March 2026',
    title: 'Specialist - Product Design',
    company: 'M2P Fintech',
    companyLogo: '/images/company-logos/m2p.svg',
    companyLogoWidth: 'w-10',
    companyUrl: 'https://m2pfintech.com/',
  },
  {
    dates: 'June 2022 to August 2024',
    title: 'Associate Manager - Product Design',
    company: 'M2P Fintech',
    companyLogo: '/images/company-logos/m2p.svg',
    companyLogoWidth: 'w-10',
    companyUrl: 'https://m2pfintech.com/',
  },
  {
    dates: 'January 2021 to June 2022',
    title: 'Product Designer',
    company: 'Finflux - an M2P company',
    companyLogo: '/images/company-logos/finflux-icon.png',
    companyLogoWidth: 'w-10',
    companyUrl: 'https://m2pfintech.com/loan-management-system/',
  },
  {
    dates: 'July 2018 to January 2021',
    title: 'ML Data Associate',
    company: 'Amazon - Alexa',
    companyLogo: '/images/company-logos/amazon.png',
    companyLogoWidth: 'w-10',
    companyUrl: 'https://www.amazon.com/',
  },
];

export default function Projects() {
  const { theme } = useTheme();

  useEffect(() => {
    document.title = 'Work - Sai Sravan Biyyapu';
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 pb-28">
      <motion.h1
        className="text-3xl font-bold mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Work
      </motion.h1>
      <motion.div
        className="mb-8 space-y-4 leading-relaxed"
        style={{ color: theme.textMuted }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <p>
          I’m driven by understanding people’s challenges and designing experiences that make things better.
        </p>
        <p>
          Previously, I designed mobile and web lending products that help banks, NBFCs, MFIs and fintechs manage the lending journey from borrower onboarding through loan servicing. I worked as a solo designer at one startup and later partnered with product and engineering teams at another.
        </p>
        <p>
          My work on a core lending platform included loan origination, workflow tools, business rules, back-office portals and mobile apps for DSAs and field officers.
        </p>
      </motion.div>

      <motion.section
        aria-labelledby="experience-heading"
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 id="experience-heading" className="text-xl font-semibold mb-4">
          Experience
        </h2>
        <div className="relative">
          <span
            aria-hidden="true"
            className="absolute bottom-2 left-[3px] top-2 border-l-2"
            style={{ borderColor: theme.border }}
          />
          {experience.map((role) => (
            <article key={`${role.company}-${role.title}`} className="relative pb-4 pl-5 last:pb-0">
              <span
                aria-hidden="true"
                className="absolute left-0 top-1.5 h-2 w-2 rounded-full"
                style={{
                  backgroundColor: role.current
                    ? theme.accent
                    : `color-mix(in srgb, ${theme.border} 70%, ${theme.textMuted} 30%)`,
                }}
              />
              <p className="mb-1.5 text-[13px] leading-5" style={{ color: theme.textMuted }}>{role.dates}</p>
              <div className="flex items-stretch gap-2">
                <a
                  href={role.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${role.company} website`}
                  className={`relative shrink-0 self-stretch ${role.companyLogoWidth}`}
                >
                  <img
                    src={role.companyLogo}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-contain"
                    loading="lazy"
                  />
                </a>
                <div className="flex min-w-0 flex-col justify-center">
                  {role.companyUrl ? (
                    <a
                      href={role.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[15px] font-semibold leading-5 transition-colors hover:underline hover:underline-offset-2"
                    >
                      {role.company}
                    </a>
                  ) : (
                    <h3 className="text-[15px] font-semibold leading-5">{role.company}</h3>
                  )}
                  <p className="text-sm leading-5" style={{ color: theme.textMuted }}>{role.title}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </motion.section>

      <motion.p
        className="mb-10"
        style={{ color: theme.textMuted }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        Selected projects and case studies.
      </motion.p>

      <div className="grid grid-cols-1 gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
          >
            <Link
              to={`/projects/${project.id}`}
              className="group block rounded-xl border overflow-hidden transition-all duration-200 hover:-translate-y-1"
              style={{
                backgroundColor: theme.cardBg,
                borderColor: theme.border,
                color: theme.text,
              }}
            >
              <div className="aspect-[20/9] overflow-hidden flex justify-center" style={{ backgroundColor: project.caseStudy ? '#f0f0f0' : theme.bg }}>
                {project.caseStudy ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-[55%] object-cover object-top mt-8 rounded-t-[2rem] transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                )}
              </div>
              <div className="p-4 flex items-start justify-between gap-2">
                <div>
                  <h2 className="font-semibold">{project.title}</h2>
                  <p className="text-sm mt-1" style={{ color: theme.textMuted }}>
                    {project.description}
                  </p>
                </div>
                <ArrowRight
                  className="w-4 h-4 shrink-0 mt-1 transition-transform duration-200 group-hover:translate-x-1"
                  style={{ color: theme.textMuted }}
                />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
