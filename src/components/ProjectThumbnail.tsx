import type { Project } from '../data/projects';
import { useTheme } from './Layout';

/**
 * Project cover image. Case-study projects use tall phone screenshots, so they
 * are shown as a cropped phone on a neutral backdrop; others fill the frame.
 */
export function ProjectThumbnail({
  project,
  aspectClass = 'aspect-[20/9]',
}: {
  project: Project;
  aspectClass?: string;
}) {
  const { theme } = useTheme();
  const isPhoneShot = Boolean(project.caseStudy);

  return (
    <div
      className={`${aspectClass} overflow-hidden flex justify-center`}
      style={{ backgroundColor: isPhoneShot ? '#f0f0f0' : theme.bg }}
    >
      <img
        src={project.image}
        alt=""
        className={
          isPhoneShot
            ? 'w-[55%] object-cover object-top mt-8 rounded-t-[2rem] transition-transform duration-300 group-hover:scale-105'
            : 'w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
        }
        loading="lazy"
      />
    </div>
  );
}
