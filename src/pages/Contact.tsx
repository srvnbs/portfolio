import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Linkedin, Mail, Globe, Dribbble } from 'lucide-react';
import { useTheme } from '../components/Layout';

const contacts = [
  {
    title: 'Email',
    description: 'sravanworld95@gmail.com',
    href: 'mailto:sravanworld95@gmail.com',
    icon: Mail,
  },
  {
    title: 'LinkedIn',
    description: 'sai-sravan-biyyapu',
    href: 'https://www.linkedin.com/in/sai-sravan-biyyapu/',
    icon: Linkedin,
  },
  {
    title: 'Behance',
    description: 'saisravanbiyyapu',
    href: 'https://www.behance.net/saisravanbiyyapu',
    icon: Globe,
  },
  {
    title: 'Dribbble',
    description: 'saisravanbiyyapu',
    href: 'https://dribbble.com/saisravanbiyyapu',
    icon: Dribbble,
  },
];

export default function Contact() {
  const { theme } = useTheme();

  useEffect(() => {
    document.title = 'Contact - Sai Sravan Biyyapu';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-12 sm:py-16 pb-28">
      <Link
        to="/"
        className="inline-flex items-center gap-2 mb-12 text-sm transition-opacity hover:opacity-70"
        style={{ color: theme.textMuted }}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to home
      </Link>

      <motion.h1
        className="text-3xl font-bold mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Contact
      </motion.h1>
      <motion.p
        className="mb-10"
        style={{ color: theme.textMuted }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        Let's connect and create something great.
      </motion.p>

      <div className="flex flex-col gap-4">
        {contacts.map((contact, i) => (
          <motion.a
            key={contact.title}
            href={contact.href}
            target={contact.href.startsWith('mailto') ? undefined : '_blank'}
            rel={contact.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
            className="group flex items-center gap-4 p-5 rounded-xl border transition-all duration-200 hover:-translate-y-0.5"
            style={{
              backgroundColor: theme.cardBg,
              borderColor: theme.border,
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
          >
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: theme.bg }}
            >
              <contact.icon className="w-5 h-5" style={{ color: theme.text }} />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-sm">{contact.title}</h2>
              <p className="text-sm truncate" style={{ color: theme.textMuted }}>
                {contact.description}
              </p>
            </div>
            <svg
              className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
              style={{ color: theme.textMuted }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
