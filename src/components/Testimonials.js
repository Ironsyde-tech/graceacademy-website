'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Testimonials.module.css';

const testimonials = [
  { quote: 'The transformation in my daughter since joining Grace Academy has been nothing short of miraculous. Her confidence, her grades, her character — everything.', name: 'Kofi Mensah', role: 'SHS Parent', stars: 5 },
  { quote: "The teachers here don't just teach — they pour their hearts into every child. My son wakes up excited to go to school every single morning.", name: 'Akosua Boateng', role: 'Primary Parent', stars: 5 },
  { quote: "Grace Academy balances rigorous academics with genuine spiritual growth. It's the best investment we've ever made in our children's future.", name: 'David Appiah', role: 'JHS Parent', stars: 5 },
  { quote: "From crèche to JHS, both our children have thrived here. The community of parents and teachers feels like an extended family.", name: 'Ama Owusu-Adjei', role: 'Crèche & JHS Parent', stars: 5 },
];

export default function TestimonialCarousel() {
  const [active, setActive] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef(null);

  const goTo = useCallback((idx) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActive(idx);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating]);

  const next = useCallback(() => {
    goTo((active + 1) % testimonials.length);
  }, [active, goTo]);

  useEffect(() => {
    timeoutRef.current = setTimeout(next, 5000);
    return () => clearTimeout(timeoutRef.current);
  }, [active, next]);

  return (
    <div className={styles.carousel} id="testimonials">
      <div className={styles.track}>
        {testimonials.map((t, i) => (
          <div
            key={i}
            className={`${styles.card} ${i === active ? styles.cardActive : ''}`}
          >
            <div className={styles.stars}>
              {Array.from({ length: t.stars }).map((_, s) => (
                <span
                  key={s}
                  className={styles.star}
                  style={{ animationDelay: `${s * 150}ms` }}
                >
                  ★
                </span>
              ))}
            </div>
            <blockquote className={styles.quote}>&ldquo;{t.quote}&rdquo;</blockquote>
            <div className={styles.author}>
              <div className={styles.avatar}>{t.name.charAt(0)}</div>
              <div>
                <span className={styles.name}>{t.name}</span>
                <span className={styles.role}>{t.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.dots}>
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
