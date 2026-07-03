'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Brain, Globe, Handshake, Lightbulb, Monitor, Shield } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import styles from '../pages.module.css';

export default function AcademicsPage() {
  return (
    <>
      {/* Hero */}
      <section className={styles.pageHero}>
        <div className={styles.pageHeroBg}>
          <Image src="/images/photo_2022-07-27_08-15-37-YKbJkq3XrVHprKBR.avif" alt="Academic excellence" fill style={{ objectFit: 'cover' }} priority />
        </div>
        <div className={styles.pageHeroContent}>
          <span className="label label--light">Academics</span>
          <h1>A Curriculum That<br />Goes Beyond Grades</h1>
          <p>From nursery rhymes to university-level preparation — every stage is thoughtfully designed to unlock potential.</p>
        </div>
      </section>

      {/* Programs */}
      {[
        {
          title: 'Crèche & Nursery',
          ages: 'Ages 6 months – 5 years',
          body: 'Our early years program cultivates curiosity through play-based learning, sensory exploration, and gentle structure. Children develop motor skills, emotional intelligence, and social bonds in a warm, joyful atmosphere.',
          highlights: ['Play-based Curriculum', 'Montessori Methods', 'Native Language Support', 'Creative Arts'],
          img: '/images/Gemini_Generated_Image_i2onx8i2onx8i2on.png',
          bg: 'var(--green-pale)',
          reverse: false,
        },
        {
          title: 'Primary School',
          ages: 'Ages 6 – 11',
          body: 'Strong foundations in literacy, numeracy, and critical thinking. Our GES-aligned curriculum ensures students develop globally competitive skills while staying rooted in Ghanaian identity.',
          highlights: ['GES Curriculum', 'Newly Introduced UCMAS', 'French & ICT', 'Library Program'],
          img: '/images/primary-school.png',
          bg: 'var(--white)',
          reverse: true,
        },
        {
          title: 'Junior High School',
          ages: 'JHS 1 – JHS 3',
          body: 'Transitioning adolescents into disciplined scholars. Rigorous BECE preparation paired with leadership and service programs sculpt well-rounded young people.',
          highlights: ['BECE Excellence Track', 'UCMAS & Science Lab', 'Student Council', 'Career Guidance'],
          img: '/images/junior-high-school.png',
          bg: 'var(--blue-pale)',
          reverse: false,
        },
        {
          title: 'Senior High School',
          ages: 'SHS 1 – SHS 3',
          body: 'University-bound and beyond. With tracks in Science, Business, General Arts, and Visual Arts, our SHS program produces top WASSCE performers and future leaders.',
          highlights: ['4 Elective Tracks', 'WASSCE Mastery', 'University Counseling', 'Entrepreneurship Club'],
          img: '/images/students-sports.png',
          bg: 'var(--off-white)',
          reverse: true,
        },
      ].map((prog, i) => (
        <section key={i} className={styles.content} style={{ background: prog.bg }}>
          <ScrollReveal className="reveal">
            <div className={styles.contentInner}>
              <div className={prog.reverse ? styles.splitSectionReverse : styles.splitSection}>
                <div className={`${styles.splitImage} img-zoom img-reveal`}>
                  <Image src={prog.img} alt={prog.title} fill style={{ objectFit: 'cover' }} />
                </div>
                <div className={styles.splitText}>
                  <span className="label">{prog.ages}</span>
                  <h2>{prog.title}</h2>
                  <p>{prog.body}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {prog.highlights.map((h) => (
                      <span
                        key={h}
                        style={{
                          background: 'var(--green)',
                          color: 'white',
                          padding: '0.4rem 0.9rem',
                          borderRadius: 'var(--r-pill)',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          letterSpacing: '0.02em',
                        }}
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>
      ))}

      {/* Teaching Philosophy */}
      <section className={styles.content} style={{ background: 'var(--green)', paddingTop: 'var(--s-5xl)', paddingBottom: 'var(--s-5xl)' }}>
        <div className={styles.contentInner}>
          <ScrollReveal className="reveal">
            <div className={styles.sectionHead} style={{ textAlign: 'center' }}>
              <span className="label label--light">Our Philosophy</span>
              <h2 style={{ color: 'white' }}>How We Teach</h2>
              <p style={{ color: 'rgba(255,255,255,0.75)', margin: '0 auto' }}>Every classroom at Grace Academy is designed around six core principles.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal className="reveal stagger-children">
            <div className={styles.featureGrid}>
              {[
                { num: '01', icon: Lightbulb, title: 'Inquiry-Based Learning', desc: 'Students ask, explore, and discover — not just memorize.' },
                { num: '02', icon: Globe, title: 'Global Perspective', desc: 'We connect Ghanaian identity with an international worldview.' },
                { num: '03', icon: Brain, title: 'Critical Thinking', desc: 'Every student learns to question, analyze, and form reasoned arguments.' },
                { num: '04', icon: Handshake, title: 'Collaborative Spirit', desc: 'Projects, debates, and team challenges build cooperation skills.' },
                { num: '05', icon: Monitor, title: 'Technology Integration', desc: 'Smart boards and digital literacy integrated across all levels.' },
                { num: '06', icon: Shield, title: 'Character Formation', desc: 'Academics paired with integrity, compassion, and service.' },
              ].map((f) => (
                <div key={f.title} className={styles.featureCard}>
                  <div className={styles.featureMeta}>
                    <span className={styles.featureNum}>{f.num}</span>
                    <span className={styles.featureIcon} aria-hidden="true"><f.icon size={18} strokeWidth={2.1} /></span>
                  </div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
