import { useRef } from 'react';
import { HEADER_HEIGHT } from '../components/Header';

export const useScrollToSection = () => {
  const scenesRef = useRef<HTMLDivElement>(null);
  const contributorsRef = useRef<HTMLDivElement>(null);

  const scrollToElement = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const elementTop = rect.top + window.scrollY;
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
