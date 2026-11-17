import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '../components/Layout';
import { ProjectThumbnail } from '../components/ProjectThumbnail';
import { projects } from '../data/projects';
import { usePageTitle } from '../hooks/usePageTitle';

type Role = { title: string; dates: string };

type Company = {
  company: string;
  logo: string;
  url: string;
  /** Overall span at the company; shown next to the company name. */
  dates: string;
  /** Most recent first. A single role is shown without its own dates. */
  roles: Role[];
  current?: boolean;
};

const experience: Company[] = [
  {
    company: 'Bread Financial',
    logo: '/images/company-logos/bread-financial.svg',
    url: 'https://www.breadfinancial.com/',
    dates: 'Mar 2026 – Present',
    roles: [{ title: 'Senior Product Designer', dates: 'Mar 2026 – Present' }],
    current: true,
  },
  {
    company: 'M2P Fintech',
    logo: '/images/company-logos/m2p.svg',
    url: 'https://m2pfintech.com/',
    dates: 'Jun 2022 – Mar 2026',
    roles: [
      { title: 'Specialist – Product Design', dates: 'Sep 2024 – Mar 2026' },
      { title: 'Associate Manager – Product Design', dates: 'Jun 2022 – Aug 2024' },
    ],
  },
  {
    company: 'Finflux (an M2P company)',
    logo: '/images/company-logos/finflux-icon.png',
    url: 'https://m2pfintech.com/loan-management-system/',
    dates: 'Jan 2021 – Jun 2022',
    roles: [{ title: 'Product Designer', dates: 'Jan 2021 – Jun 2022' }],
  },
  {
    company: 'Amazon – Alexa',
    logo: '/images/company-logos/amazon.png',
    url: 'https://www.amazon.com/',
    dates: 'Jul 2018 – Jan 2021',
    roles: [{ title: 'ML Data Associate', dates: 'Jul 2018 – Jan 2021' }],
  },
];

export default function Projects() {
  const { theme } = useTheme();
  usePageTitle('Work');

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-32 sm:pb-36">
      <motion.h1
        className="text-3xl font-bold mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Work
      </motion.h1>
      <motion.p
        className="mb-10 leading-relaxed"
        style={{ color: theme.textMuted }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        I'm a Senior Product Designer at Bread Financial. Before that, I spent five years designing
        lending products for banks, NBFCs and fintechs, from loan origination and business-rules tools
        to back-office portals and field-officer apps.
      </motion.p>

      {/* Projects */}
      <section aria-labelledby="projects-heading" className="mb-14">
        <h2 id="projects-heading" className="text-xl font-semibold mb-4">
          Selected projects
        </h2>
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
                <ProjectThumbnail project={project} />
                <div className="p-4 flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold">{project.title}</h3>
                    <p className="text-sm mt-1" style={{ color: theme.textMuted }}>
                      {project.description}
                    </p>
                  </div>
                  <ArrowRight
                    className="w-4 h-4 shrink-0 mt-1 transition-transform duration-200 group-hover:translate-x-1"
                    style={{ color: theme.textMuted }}
                    aria-hidden="true"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <motion.section
        aria-labelledby="experience-heading"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
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
          <ol>
          {experience.map((job) => {
            const multiRole = job.roles.length > 1;
            return (
              <li key={job.company} className="relative pb-5 pl-5 last:pb-0">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-2 h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: job.current
                      ? theme.accent
                      : `color-mix(in srgb, ${theme.border} 70%, ${theme.textMuted} 30%)`,
                  }}
                />
                <div className="flex items-start gap-3">
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-hidden="true"
                    tabIndex={-1}
                    className="mt-0.5 h-8 w-8 shrink-0"
                  >
                    <img src={job.logo} alt="" className="h-full w-full object-contain" loading="lazy" />
                  </a>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                      <h3 className="text-[15px] font-semibold leading-6">
                        <a
                          href={job.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline hover:underline-offset-2"
                        >
                          {job.company}
                        </a>
                      </h3>
                      <p className="text-[13px] leading-5 whitespace-nowrap" style={{ color: theme.textMuted }}>
                        {job.dates}
                      </p>
                    </div>
                    {multiRole ? (
                      <ul className="mt-1 space-y-0.5">
                        {job.roles.map((role) => (
                          <li
                            key={role.title}
                            className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 text-sm leading-5"
                          >
                            <span style={{ color: theme.textSecondary }}>{role.title}</span>
                            <span className="text-[13px] whitespace-nowrap" style={{ color: theme.textMuted }}>
                              {role.dates}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm leading-5" style={{ color: theme.textSecondary }}>
                        {job.roles[0].title}
                      </p>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
          </ol>
        </div>
      </motion.section>
    </div>
  );
}
