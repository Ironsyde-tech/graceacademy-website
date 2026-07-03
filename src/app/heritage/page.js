'use client';

import Image from 'next/image';
import { BookHeart, HandHeart, Lightbulb, Shield, Trophy, Users } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import styles from '../pages.module.css';

export default function HeritagePage() {
  return (
    <>
      <section className={styles.pageHero}>
        <div className={styles.pageHeroBg}>
          <Image src="/images/bg.png" alt="Grace Academy heritage" fill style={{ objectFit: 'cover' }} priority />
        </div>
        <div className={styles.pageHeroContent}>
          <span className="label label--light">Heritage &amp; Values</span>
          <h1>Rooted in Faith,<br />Reaching for Excellence</h1>
          <p>Since 2000, Grace Academy has shaped generations of leaders with unwavering values and boundless vision.</p>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className={styles.content} style={{ background: 'var(--off-white)' }}>
        <ScrollReveal className="reveal">
          <div className={styles.contentInner}>
            <div className={styles.splitSection}>
              <div className={styles.splitText}>
                <span className="label">Our Mission</span>
                <h2>To Inspire, Nurture, and Transform</h2>
                <p>Grace Academy exists to develop the whole child - academically, spiritually, socially, and physically - in a Christ-centered environment that celebrates Ghanaian culture and global citizenship.</p>
                <div className="gold-bar" />
              </div>
              <div className={styles.splitText}>
                <span className="label">Our Vision</span>
                <h2>Ghana's Beacon of Educational Excellence</h2>
                <p>We envision a school where every child discovers their God-given potential and graduates equipped to lead with integrity, compassion, and excellence in a rapidly changing world.</p>
                <div className="gold-bar" />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Core Values */}
      <section className={`${styles.content} ${styles.valuesSection}`}>
        <div className={styles.contentInner}>
          <ScrollReveal className="reveal">
            <div className={`${styles.sectionHead} ${styles.sectionHeadCenter}`}>
              <span className="label">What We Stand For</span>
              <h2>Our Core Values</h2>
              <p>These values shape every lesson, relationship, and decision on our campus.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal className="reveal stagger-children">
            <div className={styles.valuesGrid}>
              {[
                { num: '01', title: 'Faith', icon: BookHeart, desc: 'A Christ-centered approach to learning and living, grounded in love and grace.' },
                { num: '02', title: 'Excellence', icon: Trophy, desc: 'We pursue the highest standards in everything - academics, arts, athletics, and character.' },
                { num: '03', title: 'Integrity', icon: Shield, desc: 'Honesty, accountability, and doing the right thing even when no one is watching.' },
                { num: '04', title: 'Innovation', icon: Lightbulb, desc: 'We embrace creativity, technology, and bold ideas to prepare for the future.' },
                { num: '05', title: 'Community', icon: Users, desc: 'A family atmosphere where every student, parent, and teacher belongs.' },
                { num: '06', title: 'Service', icon: HandHeart, desc: 'We lead by serving - our school, our nation, our world.' },
              ].map((v) => (
                <article key={v.title} className={styles.valueCard}>
                  <div className={styles.valueTop}>
                    <div className={styles.valueIconWrap} aria-hidden="true"><v.icon size={19} strokeWidth={2.1} /></div>
                    <span className={styles.valueNum}>{v.num}</span>
                  </div>
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                </article>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Timeline */}
      <section className={styles.content} style={{ background: 'var(--off-white)' }}>
        <div className={styles.contentInner}>
          <ScrollReveal className="reveal">
            <div className={`${styles.sectionHead} ${styles.sectionHeadCenter}`}>
              <span className="label">Our Journey</span>
              <h2>25+ Years of Growth</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal className="reveal stagger-children">
            <div className={styles.timeline}>
              {[
                { year: '2000', title: 'The Beginning', desc: 'Grace Academy opens its doors in Spintex, Tema-Accra with a bold vision for educational excellence.' },
                { year: '2003', title: 'Primary Expansion', desc: 'Primary school wing completed, establishing a strong academic foundation.' },
                { year: '2008', title: 'JHS Established', desc: 'Junior High School program launches with science labs and library.' },
                { year: '2013', title: 'SHS Inauguration', desc: 'Senior High School opens with 4 elective tracks and achieves remarkable WASSCE results.' },
                { year: '2018', title: '20th Anniversary', desc: 'Campus expansion adds sports complex, auditorium, and enhanced learning facilities.' },
                { year: '2024', title: 'Today & Beyond', desc: 'Grace Academy stands as a premier institution with a growing, diverse community of learners.' },
              ].map((t) => (
                <div key={t.year} className={styles.timelineItem}>
                  <div className={styles.timelineDot} />
                  <div className={styles.timelineYear}>{t.year}</div>
                  <h3>{t.title}</h3>
                  <p>{t.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
