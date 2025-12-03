import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface SocialLinkProps {
  href: string;
  ariaLabel: string;
  tooltipText: string;
  icon: ReactNode;
  theme: {
    text: string;
    tooltip: string;
    tooltipText: string;
  };
  external?: boolean;
}

export function SocialLink({ 
  href, 
  ariaLabel, 
  tooltipText, 
  icon, 
  theme, 
  external = false 
}: SocialLinkProps) {
  return (
    <motion.a
      href={href}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      className="group relative transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded"
      style={{ color: theme.text, '--tw-ring-color': theme.text } as React.CSSProperties}
      aria-label={ariaLabel}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {icon}
      
      {/* Tooltip */}
      <span 
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[11px] px-3 py-2 rounded text-sm whitespace-nowrap opacity-0 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:mb-[14px] group-focus-visible:opacity-100 group-focus-visible:mb-[14px]"
        style={{ backgroundColor: theme.tooltip, color: theme.tooltipText }}
      >
        {tooltipText}
      </span>
      <span 
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[5px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] opacity-0 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:mb-[8px] group-focus-visible:opacity-100 group-focus-visible:mb-[8px]"
        style={{ borderTopColor: theme.tooltip }}
      ></span>
    </motion.a>
  );
}
