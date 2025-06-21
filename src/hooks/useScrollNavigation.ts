import { useRef } from 'react';

export const useScrollNavigation = () => {
  const scenesRef = useRef<HTMLDivElement>(null);
  const contributorsRef = useRef<HTMLDivElement>(null);

  const HEADER_HEIGHT = 91;

  const scrollToElement = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      const elementTop = ref.current.offsetTop;
      window.scrollTo({
        top: elementTop - HEADER_HEIGHT,
        behavior: 'smooth',
      });
    }
  };

  const scrollToScenes = () => scrollToElement(scenesRef);
  const scrollToContributors = () => scrollToElement(contributorsRef);

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
