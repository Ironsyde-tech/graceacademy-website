'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Phone } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import styles from '../pages.module.css';

const featuredStory = {
  tag: 'Featured',
  title: 'Grace Academy Introduces UCMAS Mental Arithmetic Program',
  date: 'March 15, 2025',
  image: '/images/abacus-program.jpeg',
  imageAlt: 'Learn Abacus and remove phobia of maths',
  summary:
    'Grace Academy is proud to announce the launch of the UCMAS (Universal Concept of Mental Arithmetic System) program. This exciting new addition to our curriculum will help students develop exceptional mental calculation skills through abacus-based training techniques, strengthening focus, memory, and analytical thinking.',
  link: '#',
};

const notices = [
  {
    id: 'cssps-self-placement',
    label: 'Official Notice',
    title: 'Grace Academy SHS Is Available on CSSPS',
    date: 'July 2026',
    image: '/images/cssps-notice.webp',
    imageAlt: 'Grace Academy CSSPS placement notice',
    intro: 'Grace Academy SHS is now available on the CSSPS Self-Placement Module.',
    body: 'Choose Grace Academy for quality Free SHS education. Our admissions team is available to guide parents and students through the placement process.',
    contacts: ['+233 54 351 0263', '+233 54 250 9780', '+233 26 226 2428'],
  },
];

export default function NewsPage() {
  return (
    <>
      <section className={styles.pageHero}>
        <div className={styles.pageHeroBg}>
          <Image src="/images/school-library-v2.png" alt="News and events" fill style={{ objectFit: 'contain', background: 'var(--off-white)' }} priority />
        </div>
        <div className={styles.pageHeroContent}>
          <span className="label label--light">News &amp; Events</span>
          <h1>What&apos;s Happening<br />at Grace Academy</h1>
          <p>Stories, updates, and upcoming events from across our vibrant campus community.</p>
        </div>
      </section>

      {/* Featured Story */}
      <section className={styles.content} style={{ background: 'var(--off-white)' }}>
        <ScrollReveal className="reveal">
          <div className={styles.contentInner}>
            <div className={styles.splitSection}>
              <div className={`${styles.splitImage} img-zoom img-reveal`} style={{ aspectRatio: '16/10' }}>
                <Image src={featuredStory.image} alt={featuredStory.imageAlt} fill style={{ objectFit: 'cover' }} />
              </div>
              <div className={styles.splitText}>
                <span style={{ background: 'var(--gold)', color: 'var(--heading)', padding: '0.3rem 0.8rem', borderRadius: 'var(--r-pill)', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'inline-block', width: 'fit-content' }}>{featuredStory.tag}</span>
                <h2>{featuredStory.title}</h2>
                <p style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{featuredStory.date}</p>
                <p>{featuredStory.summary}</p>
                <Link href={featuredStory.link} className="btn btn--primary" style={{ alignSelf: 'flex-start' }}>Read Full Story →</Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Notices */}
      {notices.map((notice) => (
        <section key={notice.id} className={styles.content}>
          <div className={styles.contentInner}>
            <ScrollReveal className="reveal">
              <div className={`${styles.sectionHead} ${styles.sectionHeadCenter}`}>
                <span className="label">School Updates</span>
                <h2>Latest Notice</h2>
              </div>
            </ScrollReveal>
            <ScrollReveal className="reveal">
              <article style={{
                maxWidth: '860px',
                margin: '0 auto',
                background: 'var(--white)',
                borderRadius: 'var(--r-lg)',
                padding: 'var(--s-xl) var(--s-2xl)',
                boxShadow: 'var(--sh-sm)',
                border: '1px solid rgba(13, 40, 24, 0.08)',
              }}>
                <div style={{
                  width: '100%',
                  borderRadius: 'var(--r-md)',
                  overflow: 'hidden',
                  marginBottom: 'var(--s-lg)',
                }}>
                  <Image
                    src={notice.image}
                    alt={notice.imageAlt}
                    width={1200}
                    height={600}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--s-md)', flexWrap: 'wrap', marginBottom: 'var(--s-md)' }}>
                  <span style={{ background: 'var(--gold)', color: 'var(--heading)', padding: '0.3rem 0.8rem', borderRadius: 'var(--r-pill)', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{notice.label}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 600 }}>{notice.date}</span>
                </div>

                <h3 style={{ fontSize: 'clamp(1.4rem, 2.2vw, 2rem)', lineHeight: 1.2, marginBottom: 'var(--s-sm)' }}>{notice.title}</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--body)', marginBottom: 'var(--s-sm)' }}>{notice.intro}</p>
                <p style={{ fontSize: '0.95rem', color: 'var(--body)', marginBottom: 'var(--s-lg)' }}>{notice.body}</p>

                <div style={{
                  background: 'var(--off-white)',
                  borderRadius: 'var(--r-md)',
                  padding: 'var(--s-md) var(--s-lg)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.6rem',
                }}>
                  <Phone size={17} color="var(--green)" strokeWidth={2.1} style={{ marginTop: '2px', flexShrink: 0 }} aria-hidden="true" />
                  <p style={{ margin: 0, color: 'var(--body)', fontSize: '0.92rem', lineHeight: 1.7 }}>
                    For placement assistance: {notice.contacts.join(' · ')}
                  </p>
                </div>
              </article>
            </ScrollReveal>
          </div>
        </section>
      ))}
    </>
  );
}
