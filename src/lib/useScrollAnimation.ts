import { useEffect, useRef } from 'react';

export function useScrollAnimation(triggerClass = 'animate-on-scroll') {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = document.querySelectorAll(`.${triggerClass}`);
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
          } else {
            entry.target.classList.remove('animated');
          }
        });
      },
      { threshold: 0.2 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [triggerClass]);

  return ref;
}
