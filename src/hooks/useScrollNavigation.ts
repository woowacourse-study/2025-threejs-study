import { useRef } from 'react';

export const useScrollNavigation = () => {
  const scenesRef = useRef<HTMLDivElement>(null);
  const contributorsRef = useRef<HTMLDivElement>(null);

  const HEADER_HEIGHT = 91;

  const scrollToScenes = () => {
    if (scenesRef.current) {
      const elementTop = scenesRef.current.offsetTop;
      window.scrollTo({
        top: elementTop - HEADER_HEIGHT,
        behavior: 'smooth',
      });
    }
  };

  const scrollToContributors = () => {
    if (contributorsRef.current) {
      const elementTop = contributorsRef.current.offsetTop;
      window.scrollTo({
        top: elementTop - HEADER_HEIGHT,
        behavior: 'smooth',
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    scenesRef,
    contributorsRef,
    scrollToScenes,
    scrollToContributors,
    scrollToTop,
  };
};
