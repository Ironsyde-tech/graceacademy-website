'use client';

import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import CountUp from '@/components/CountUp';
import styles from '../pages.module.css';

export default function AdmissionsPage() {
  return (
    <>
      <section className={styles.pageHero}>
        <div className={styles.pageHeroBg}>
          <Image src="/images/bg.png" alt="Grace Academy entrance" fill style={{ objectFit: 'cover' }} priority />
        </div>
        <div className={styles.pageHeroContent}>
          <span className="label label--light">Admissions 2025/2026</span>
          <h1>Begin Your Child&apos;s<br />Journey With Us</h1>
          <p>Our admissions process is warm, transparent, and designed to welcome every family into the Grace Academy community.</p>
        </div>
      </section>

      {/* Steps */}
      <section className={styles.content} style={{ background: 'var(--off-white)' }}>
        <div className={styles.contentInner}>
          <ScrollReveal className="reveal">
            <div className={`${styles.sectionHead} ${styles.sectionHeadCenter}`}>
              <span className="label">How to Apply</span>
              <h2>Four Simple Steps</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal className="reveal stagger-children">
            <div className={styles.stepsGrid}>
              {[
                { num: '01', title: 'Submit Inquiry', desc: 'Fill out our online inquiry form or visit our admissions office. It takes just 5 minutes.' },
                { num: '02', title: 'Campus Visit', desc: 'Schedule a personalized tour to experience our campus, meet teachers, and ask questions.' },
                { num: '03', title: 'Assessment', desc: 'Age-appropriate assessment to understand your child\'s strengths and learning needs.' },
                { num: '04', title: 'Welcome!', desc: 'Receive your acceptance letter, complete enrollment, and join the Grace Academy family.' },
              ].map((s) => (
                <div key={s.num} className={styles.stepCard}>
                  <div className={styles.stepNumber}>{s.num}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Requirements */}
      <section className={styles.content}>
        <ScrollReveal className="reveal">
          <div className={styles.contentInner}>
            <div className={styles.splitSection}>
              <div className={`${styles.splitImage} img-zoom img-reveal`}>
                <Image src="/images/school-library-v2.png" alt="Students in library" fill style={{ objectFit: 'contain', background: 'var(--off-white)' }} />
              </div>
              <div className={styles.splitText}>
                <span className="label">Requirements</span>
                <h2>What You&apos;ll Need</h2>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    'Completed application form',
                    'Birth certificate (certified copy)',
                    'Previous school report card',
                    '4 passport-sized photographs',
                    'Immunization records',
                    'Parent/guardian ID',
                  ].map((item) => (
                    <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem' }}>
                      <span style={{ color: 'var(--green)', fontWeight: 700 }}>✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Tuition */}
      <section className={styles.content} style={{ background: 'var(--green-pale)' }}>
        <div className={styles.contentInner}>
          <ScrollReveal className="reveal">
            <div className={`${styles.sectionHead} ${styles.sectionHeadCenter}`}>
              <span className="label">Investment in Excellence</span>
              <h2>Tuition &amp; Scholarships</h2>
              <p>We believe exceptional education should be within reach. Grace Academy offers merit-based and need-based scholarships.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal className="reveal stagger-children">
            <div className={styles.featureGrid}>
              {[
                { num: '01', title: 'Crèche & Nursery', price: 'GHS 3,500/term', note: 'Includes meals & materials' },
                { num: '02', title: 'Primary School', price: 'GHS 4,200/term', note: 'Includes textbooks & ICT' },
                { num: '03', title: 'Junior High', price: 'GHS 5,000/term', note: 'Includes lab fees & exams' },
                { num: '04', title: 'Senior High', price: 'GHS 6,500/term', note: 'Includes boarding option' },
                { num: '05', title: 'Scholarships', price: 'Up to 50% off', note: 'Merit & need-based available' },
                { num: '06', title: 'Sibling Discount', price: '10% off', note: 'For 2nd & 3rd children enrolled' },
              ].map((t) => (
                <div key={t.title} className={styles.featureCard}>
                  <div className={styles.featureNum}>{t.num}</div>
                  <h3>{t.title}</h3>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--green)', margin: '0.5rem 0' }}>{t.price}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{t.note}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--green)', padding: 'var(--s-4xl) 0', textAlign: 'center' }}>
        <ScrollReveal className="reveal">
          <div className={styles.contentInner}>
            <h2 style={{ color: 'white', marginBottom: 'var(--s-md)' }}>Ready to Join Grace Academy?</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '500px', margin: '0 auto var(--s-xl)' }}>
              Applications for 2025–2026 are now open. Begin the journey today.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--s-md)', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn btn--gold">Start Application →</Link>
              <Link href="/contact" className="btn btn--outline">Schedule a Visit</Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
