'use client';

import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';
import styles from '../pages.module.css';

export default function StudentLifePage() {
  return (
    <>
      <section className={styles.pageHero}>
        <div className={styles.pageHeroBg}>
          <Image src="/images/Gemini_Generated_Image_6rcap96rcap96rca.png" alt="Student life at Grace Academy" fill style={{ objectFit: 'cover' }} priority />
        </div>
        <div className={styles.pageHeroContent}>
          <span className="label label--light">Student Life</span>
          <h1>Beyond the Classroom,<br />Beyond the Ordinary</h1>
          <p>At Grace Academy, life outside the classroom is just as rich, challenging, and joyful as the learning inside it.</p>
        </div>
      </section>

      {/* A Day at Grace */}
      <section className={styles.content} style={{ background: 'var(--off-white)' }}>
        <ScrollReveal className="reveal">
          <div className={styles.contentInner}>
            <div className={styles.splitSection}>
              <div className={`${styles.splitImage} img-zoom img-reveal`}>
                <Image src="/images/photo_2022-07-27_08-15-37-YKbJkq3XrVHprKBR.avif" alt="A day at Grace" fill style={{ objectFit: 'cover' }} />
              </div>
              <div className={styles.splitText}>
                <span className="label">Daily Life</span>
                <h2>A Day in the Life of a Grace Student</h2>
                <p>From morning chapel to afternoon clubs, every moment is designed to grow the mind, body, and spirit. Our structured but flexible schedule balances academics with creative play and physical activity.</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {['Morning Devotion', 'Core Academics', 'Creative Arts', 'Lunch & Fellowship', 'Clubs & Societies', 'Sports & Recreation'].map((item) => (
                    <span key={item} style={{ background: 'var(--green-pale)', color: 'var(--green)', padding: '0.4rem 0.9rem', borderRadius: 'var(--r-pill)', fontSize: '0.75rem', fontWeight: 700 }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Clubs & Activities */}
      <section className={styles.content}>
        <div className={styles.contentInner}>
          <ScrollReveal className="reveal">
            <div className={`${styles.sectionHead} ${styles.sectionHeadCenter}`}>
              <span className="label">Clubs &amp; Activities</span>
              <h2>Find Your Passion</h2>
              <p>With a wide range of clubs and activities, every student finds their spark.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal className="reveal stagger-children">
            <div className={styles.featureGrid}>
              {[
                { num: '01', title: 'UCMAS Club', desc: 'Our newly introduced mental arithmetic program using abacus techniques to sharpen focus and calculation skills.' },
                { num: '02', title: 'Drama & Theater', desc: 'From Shakespeare to African folklore — perform, direct, and create.' },
                { num: '03', title: 'Sports Academy', desc: 'Football, basketball, table tennis, athletics, and inter-school competitions.' },
                { num: '04', title: 'Visual Arts Studio', desc: 'Painting, sculpture, digital design, and annual exhibitions.' },
                { num: '05', title: 'Music & Choir', desc: 'Learn instruments, sing in our award-winning choir, and perform live.' },
                { num: '06', title: 'Debate Society', desc: 'Sharpen rhetoric, logic, and public speaking at national tournaments.' },
                { num: '07', title: 'Environmental Club', desc: 'Campus garden, recycling programs, and community clean-up drives.' },
                { num: '08', title: 'School Journal', desc: 'Student-run newspaper covering campus news, opinions, and features.' },
                { num: '09', title: 'Science Olympiad', desc: 'Advanced experiments, research projects, and regional science fairs.' },
              ].map((c) => (
                <div key={c.title} className={styles.featureCard}>
                  <div className={styles.featureNum}>{c.num}</div>
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Facilities (moved from Campus Tour) */}
      <section className={styles.content} style={{ background: 'var(--off-white)' }}>
        <div className={styles.contentInner}>
          <ScrollReveal className="reveal">
            <div className={`${styles.sectionHead} ${styles.sectionHeadCenter}`}>
              <span className="label">Our Facilities</span>
              <h2>Where Excellence Lives</h2>
              <p>Every space on campus is designed with intention - to inspire curiosity, build character, and spark joy.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal className="reveal stagger-children">
            <div className={styles.featureGrid}>
              {[
                { num: '01', title: 'Smart Classrooms', desc: 'Interactive smart boards, ergonomic furniture, and natural lighting in every room.' },
                { num: '02', title: 'Science Laboratories', desc: 'Full physics, chemistry, and biology labs with modern equipment and safety standards.' },
                { num: '03', title: 'UCMAS Center', desc: 'Our newly introduced mental arithmetic program with dedicated training room, abacus stations, and practice areas.' },
                { num: '04', title: 'Library & Media Hub', desc: 'Extensive book collection, digital archives, reading nooks, and group study areas.' },
                { num: '05', title: 'Sports Complex', desc: 'Football pitch, basketball courts, table tennis, and athletics track.' },
                { num: '06', title: 'Auditorium', desc: 'Performance hall with professional sound and lighting systems.' },
                { num: '07', title: 'Arts Studio', desc: 'Dedicated spaces for visual arts, ceramics, and digital design.' },
                { num: '08', title: 'Dining Hall', desc: 'Nutritionist-planned meals served daily. Fresh, local, and delicious.' },
                { num: '09', title: 'Green Spaces', desc: 'Gardens, play areas, and shaded courtyards for relaxation and outdoor learning.' },
              ].map((f) => (
                <div key={f.title} className={styles.featureCard}>
                  <div className={styles.featureNum}>{f.num}</div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* House System */}
      <section className={styles.content} style={{ background: 'var(--green)', padding: 'var(--s-5xl) 0' }}>
        <div className={styles.contentInner}>
          <ScrollReveal className="reveal">
            <div className={`${styles.sectionHead} ${styles.sectionHeadCenter}`}>
              <span className="label label--light">House System</span>
              <h2 style={{ color: 'white' }}>Four Houses, One Family</h2>
              <p style={{ color: 'rgba(255,255,255,0.75)', margin: '0 auto' }}>Every student belongs to a house — building bonds, friendly rivalry, and school spirit.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal className="reveal stagger-children">
            <div className={styles.stepsGrid}>
              {[
                { letter: 'D', title: 'Duke House', desc: 'Strength and wisdom. A legacy of academic and moral excellence.', color: '#2563EB' },
                { letter: 'E', title: 'Edwin House', desc: 'Radiance and ambition. Shining bright in every endeavor.', color: '#EAB308' },
                { letter: 'P', title: 'Paul House', desc: 'Growth and perseverance. Rooted in faith, reaching for greatness.', color: '#16A34A' },
                { letter: 'N', title: 'Natalie House', desc: 'Passion and courage. Bold hearts leading the way forward.', color: '#DC2626' },
              ].map((h) => (
                <div key={h.title} className={styles.stepCard}>
                  <div className={styles.houseLetter} style={{ background: h.color }}>{h.letter}</div>
                  <h3>{h.title}</h3>
                  <p>{h.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
