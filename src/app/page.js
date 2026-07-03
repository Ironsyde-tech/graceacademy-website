'use client';

import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import CountUp from '@/components/CountUp';
import Marquee from '@/components/Marquee';
import TestimonialCarousel from '@/components/Testimonials';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <>
      {/* ═══════════ 1. HERO ═══════════ */}
      <section className={styles.hero} id="hero">
        <div className={styles.heroBg}>
          <Image
            src="/images/bg.png"
            alt="Grace Academy campus aerial view"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>

        {/* Floating geometric shapes */}
        <div className={styles.heroShapes}>
          <div className={styles.heroShape} />
          <div className={styles.heroShape} />
          <div className={styles.heroShape} />
          <div className={styles.heroShape} />
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroTextBlock}>
            <span className={styles.heroLabel}>Spintex, Tema-Accra · Since 2000</span>

            <h1 className={styles.heroTitle}>
              {['Where', 'Every', 'Child'].map((word, i) => (
                <span
                  key={word}
                  className={styles.heroTitleWord}
                  style={{ animationDelay: `${300 + i * 150}ms` }}
                >
                  {word}{' '}
                </span>
              ))}
              <span className={styles.heroTitleAccent}>
                {['Finds', 'Their', 'Greatness.'].map((word, i) => (
                  <span
                    key={word}
                    className={styles.heroTitleWord}
                    style={{ animationDelay: `${750 + i * 150}ms` }}
                  >
                    {word}{' '}
                  </span>
                ))}
              </span>
            </h1>

            <p className={styles.heroDesc}>
              From Crèche to SHS&nbsp;3, Grace Academy nurtures academic excellence,
              bold character, and joyful faith in the heart of Accra.
            </p>

            <div className={styles.heroBtns}>
              <Link href="https://admission.graceacademysch.com/" className="btn btn--gold btn--pulse" id="hero-apply" target="_blank" rel="noreferrer">
                Apply for 2025/2026 →
              </Link>
              <Link href="/student-life" className="btn btn--outline" id="hero-tour">
                Explore Student Life
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={styles.scrollDown}>
          <span>Scroll</span>
          <div className={styles.scrollArrow} />
        </div>

        {/* Stats bar — overlaps into next section */}
        <div className={styles.heroStats}>
          {[
            { num: 1200, suffix: '+', label: 'Students Natured' },
            { num: 25, suffix: '+', label: 'Years Strong' },
            { num: 85, suffix: '%', label: 'BECE / WASSCE Pass Rate' },
            { num: 9, suffix: '+', label: 'Nationalities' },
          ].map((s) => (
            <div key={s.label} className={styles.statItem}>
              <div className={styles.statNumber}>
                <CountUp end={s.num} suffix={s.suffix} />
              </div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ 2. MARQUEE ═══════════ */}
      <Marquee />

      {/* ═══════════ 3. ABOUT SNAPSHOT ═══════════ */}
      <section className={styles.about} id="about">
        <div className={styles.aboutGrid}>
          <ScrollReveal className="reveal--left">
            <div className={styles.aboutLeft}>
              <div className={styles.aboutYears}>
                <CountUp end={25} suffix="+" />
              </div>
              <div className={styles.aboutYearsLabel}>Years of Excellence</div>
            </div>
          </ScrollReveal>

          <ScrollReveal className="reveal--right">
            <div className={styles.aboutRight}>
              <span className="label">About Grace Academy</span>
              <h2>More Than a School.<br />A Community.</h2>
              <p>
                Founded in 2000, Grace Academy has grown from a small crèche in
                Spintex to one of Ghana&apos;s most respected K&#8209;12 institutions.
                We blend rigorous academics with the warmth of Ghanaian culture and
                the strength of Christian values.
              </p>
              <p>
                Our students don&apos;t just pass exams — they become leaders, thinkers,
                and changemakers who carry the spirit of excellence into everything they do.
              </p>
              <Link href="/heritage" className="btn btn--primary" id="about-cta">
                Our Story →
              </Link>

              <div className={`${styles.aboutImage} img-zoom img-reveal`}>
                <Image
                  src="/images/photo_2022-07-27_08-15-37-YKbJkq3XrVHprKBR.avif"
                  alt="Students engaged in classroom"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════ 4. SCHOOL LEVELS — Asymmetric ═══════════ */}
      <section className={styles.levels} id="levels">
        <div className="container">
          <ScrollReveal className="reveal">
            <div className={`${styles.sectionHead} ${styles.sectionHeadCenter}`}>
              <span className="label">Crèche → SHS 3</span>
              <h2>One Campus, Every Stage</h2>
              <p>A seamless educational journey from your child&apos;s first steps to university preparation.</p>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal className="reveal stagger-children">
          <div className={styles.levelGrid}>
            {[
              { initial: 'C', badge: 'Play', title: 'Crèche & Nursery', ages: 'Ages 6 months – 5 years', desc: 'A warm, play-based environment where curiosity blooms through sensory exploration, creative arts, and joyful discovery.', focus: ['Play Lab', 'Creative Arts', 'Language Basics'] },
              { initial: 'P', badge: 'Core', title: 'Primary School', ages: 'Ages 6 – 11 years', desc: 'Strong foundations in literacy, numeracy, and critical thinking with our GES-aligned curriculum.', focus: ['Literacy', 'Numeracy', 'ICT Skills'] },
              { initial: 'J', badge: 'STEM', title: 'Junior High', ages: 'JHS 1 – JHS 3', desc: 'Empowering adolescents with BECE preparation, science labs, and leadership development.', focus: ['Science Lab', 'BECE Prep', 'Leadership'] },
              { initial: 'S', badge: 'Lead', title: 'Senior High', ages: 'SHS 1 – SHS 3', desc: 'Rigorous WASSCE preparation across Science, Business, General Arts, and Visual Arts tracks. University-bound.', focus: ['WASSCE Track', 'University Prep', 'Career Path'] },
            ].map((l, i) => (
              <div key={l.title} className={styles.levelCard}>
                <div className={styles.levelDecor} aria-hidden="true">
                  <span className={styles.levelOrb} />
                  <span className={`${styles.levelOrb} ${styles.levelOrbSmall}`} />
                  <span className={styles.levelStamp}>{l.badge}</span>
                </div>
                <div className={styles.levelCardInner}>
                  <div className={styles.levelInitial}>{l.initial}</div>
                  <span className={styles.levelAges}>{l.ages}</span>
                  <h3>{l.title}</h3>
                  <p>{l.desc}</p>
                  <div className={styles.levelTags}>
                    {l.focus.map((item) => (
                      <span key={item} className={styles.levelTag}>{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ═══════════ 5. WHY GRACE ACADEMY ═══════════ */}
      <section className={styles.why} id="why-grace" style={{ background: 'var(--off-white)' }}>
        <div className="container">
          <ScrollReveal className="reveal">
            <div className={styles.sectionHead}>
              <span className="label">Why Choose Us</span>
              <h2>Why Grace Academy?</h2>
            </div>
          </ScrollReveal>
        </div>

        {/* Block 1: Image left, text right */}
        <ScrollReveal className="reveal">
          <div className={styles.whyBlock}>
            <div className={`${styles.whyImage} img-zoom img-reveal`}>
              <Image src="/images/photo_2022-07-27_08-15-37-YKbJkq3XrVHprKBR.avif" alt="Dedicated teachers" fill style={{ objectFit: 'cover' }} />
            </div>
            <div className={styles.whyText}>
              <span className={styles.whyNumber}>01</span>
              <h3>Teachers Who Pour Their Hearts In</h3>
              <p>Our educators don&apos;t clock in and clock out — they mentor, guide, and inspire. With a 20 :1 student-teacher ratio, every child is truly known and deeply supported.</p>
              <Link href="/heritage" className="btn btn--primary" style={{ alignSelf: 'flex-start' }}>Learn More About Us →</Link>
            </div>
          </div>
        </ScrollReveal>

        {/* Block 2: Text left, image right */}
        <ScrollReveal className="reveal">
          <div className={`${styles.whyBlock} ${styles.whyBlockReverse}`}>
            <div className={`${styles.whyImage} img-zoom img-reveal`}>
              <Image src="/images/school-library-v2.png" alt="Students in a simple school library" fill style={{ objectFit: 'contain', background: 'var(--off-white)' }} />
            </div>
            <div className={styles.whyText}>
              <span className={styles.whyNumber}>02</span>
              <h3>World-Class Facilities, Right Here in Accra</h3>
              <p>From our simple school library to the multi-purpose sports field — Grace Academy invests in facilities that support every learner.</p>
              <Link href="/student-life" className="btn btn--primary" style={{ alignSelf: 'flex-start' }}>Explore Student Life →</Link>
            </div>
          </div>
        </ScrollReveal>

        {/* Block 3: Image left, text right */}
        <ScrollReveal className="reveal">
          <div className={styles.whyBlock}>
            <div className={`${styles.whyImage} img-zoom img-reveal`}>
              <Image src="/images/Gemini_Generated_Image_6rcap96rcap96rca.png" alt="Student athletics" fill style={{ objectFit: 'cover' }} />
            </div>
            <div className={styles.whyText}>
              <span className={styles.whyNumber}>03</span>
              <h3>Character That Outlasts Any Exam</h3>
              <p>Faith, integrity, and compassion aren&apos;t slogans here — they&apos;re lived daily. Through community service, chapel, and mentorship, we grow humans first, scholars second.</p>
              <Link href="/heritage" className="btn btn--primary" style={{ alignSelf: 'flex-start' }}>Our Values →</Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ═══════════ 6. STATS BAR ═══════════ */}
      <section className={styles.stats} id="stats-bar">
        <ScrollReveal className="reveal stagger-children">
          <div className={styles.statsGrid}>
            {[
              { num: 1200, suffix: '+', label: 'Students Natured' },
              { num: 25, suffix: '+', label: 'Years Strong' },
              { num: 85, suffix: '%', label: 'BECE / WASSCE Pass Rate' },
              { num: 9, suffix: '+', label: 'Nationalities' },
            ].map((s) => (
              <div key={s.label} className={styles.statsItem}>
                <div className={styles.statsNumber}>
                  <CountUp end={s.num} suffix={s.suffix} />
                </div>
                <div className={styles.statsLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ═══════════ 7. GALLERY — Masonry ═══════════ */}
      <section className={styles.gallery} id="gallery">
        <div className="container">
          <ScrollReveal className="reveal">
            <div className={`${styles.sectionHead} ${styles.sectionHeadCenter}`}>
              <span className="label">Campus Life</span>
              <h2>Moments That Matter</h2>
              <p>A glimpse into the energy, joy, and purpose that fills Grace Academy every single day.</p>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal className="reveal">
          <div className={styles.masonryGrid}>
            {[
              { src: '/images/students-lab.png', caption: 'Science & Learning Lab' },
              { src: '/images/photo_2022-07-27_08-15-37-YKbJkq3XrVHprKBR.avif', caption: 'Interactive learning', tall: true },
              { src: '/images/Gemini_Generated_Image_6rcap96rcap96rca.png', caption: 'Inter-house athletics' },
              { src: '/images/school-library-v2.png', caption: 'Library & media center' },
              { src: '/images/bg.png', caption: 'Welcome to Grace' },
            ].map((item, i) => (
              <div key={i} className={`${styles.masonryItem} img-zoom`}>
                <Image
                  src={item.src}
                  alt={item.caption}
                  width={600}
                  height={item.tall ? 500 : 350}
                  style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                />
                <div className={styles.masonryCaption}>{item.caption}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ═══════════ 8. TESTIMONIALS ═══════════ */}
      <section className={styles.testimonials} id="testimonials-section">
        <div className="container">
          <ScrollReveal className="reveal">
            <div className={`${styles.sectionHead} ${styles.sectionHeadCenter}`}>
              <span className="label">Parent Voices</span>
              <h2>What Families Say</h2>
              <p>Don&apos;t take our word for it — hear from the families who call Grace Academy home.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal className="reveal">
            <TestimonialCarousel />
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════ 9. ADMISSIONS CTA ═══════════ */}
      <section className={styles.ctaBanner} id="admissions-cta">
        <div className={styles.ctaDecor} />
        <div className={styles.ctaDecor} />
        <ScrollReveal className="reveal">
          <div className={styles.ctaInner}>
            <h2>Your Child&apos;s Future<br />Starts Here.</h2>
            <p>
              Applications for the 2025–2026 academic year are now open.
              Secure your child&apos;s place at Ghana&apos;s premier institution for
              academic excellence and character formation.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--s-md)', flexWrap: 'wrap' }}>
              <Link href="https://admission.graceacademysch.com/" className="btn btn--gold" id="cta-apply" target="_blank" rel="noreferrer">
                Begin Application →
              </Link>
              <Link href="/contact" className="btn btn--outline" id="cta-contact">
                Talk to Admissions
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
