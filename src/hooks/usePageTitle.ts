import { useEffect } from 'react';

export const SITE_NAME = 'Sai Sravan Biyyapu';

/**
 * Sets the tab title using one format site-wide: "<Page> – Sai Sravan Biyyapu".
 * Call with no argument on the home page to show just the name.
 */
export function usePageTitle(page?: string) {
  useEffect(() => {
    document.title = page ? `${page} – ${SITE_NAME}` : SITE_NAME;
  }, [page]);
}
