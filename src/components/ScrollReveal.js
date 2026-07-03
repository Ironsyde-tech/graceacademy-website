'use client';

import { useEffect, useRef } from 'react';

export default function ScrollReveal({ children, className = '', threshold = 0.15, delay = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (delay > 0) {
      el.style.transitionDelay = `${delay}ms`;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          // Propagate visible to nested img-reveal elements
          el.querySelectorAll('.img-reveal').forEach((img) => {
            img.classList.add('visible');
          });
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
