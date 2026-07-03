'use client';

import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import styles from '../pages.module.css';

const vacancies = [
  {
    slug: 'mathematics-teacher',
    title: 'Mathematics Teacher',
    department: 'Senior High School',
    type: 'Full-time',
    location: 'Spintex, Tema-Accra',
    summary: 'Teach core mathematics to SHS students and support exam preparation, mentoring, and clubs.',
  },
  {
    slug: 'preschool-assistant',
    title: 'Pre-School Assistant',
    department: 'Crèche & Nursery',
    type: 'Full-time',
    location: 'Spintex, Tema-Accra',
    summary: 'Support early years learning with play-based activities, care, and classroom organization.',
  },
  {
    slug: 'ict-coordinator',
    title: 'ICT Coordinator',
    department: 'School-wide',
    type: 'Contract',
    location: 'Spintex, Tema-Accra',
    summary: 'Maintain digital learning tools, support staff, and help integrate technology across classes.',
  },
];

export default function CareersPage() {
  return (
    <>
      <section className={styles.pageHero}>
        <div className={styles.pageHeroBg} />
        <div className={styles.pageHeroContent}>
          <span className="label label--light">Careers</span>
          <h1>Join Our Team of Builders</h1>
          <p>Explore current vacancies, apply with your CV, and step into a hiring process that is clear, organized, and mobile-friendly.</p>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.contentInner}>
          <ScrollReveal className="reveal">
            <div className={styles.careersIntroGrid}>
              <div className={styles.sectionHead}>
                <span className="label">Open Roles</span>
                <h2>Available Vacancies</h2>
                <p>Each application is reviewed by the admin team, and shortlisted applicants receive email and SMS updates.</p>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: 'var(--s-lg)' }}>
                  <Link href="/careers/apply" className="btn btn--primary">Apply Now →</Link>
                  <Link href="#process" className="btn btn--outline" style={{ color: 'var(--heading)', borderColor: 'rgba(13,40,24,0.18)' }}>How it Works</Link>
                </div>
              </div>

              <aside className={`${styles.careersPanel} ${styles.careersPanelAccent}`}>
                <span className="label">Hiring Snapshot</span>
                <div className={styles.careersStats} style={{ marginTop: 'var(--s-lg)' }}>
                  <div className={styles.careersStat}><strong>3</strong><span>Open roles</span></div>
                  <div className={styles.careersStat}><strong>2</strong><span>Review stages</span></div>
                  <div className={styles.careersStat}><strong>SMS</strong><span>Shortlist alerts</span></div>
                </div>
              </aside>
            </div>
          </ScrollReveal>

          <div className={styles.vacanciesGrid} style={{ marginTop: 'var(--s-2xl)' }}>
            {vacancies.map((vacancy) => (
              <article key={vacancy.slug} className={styles.vacancyCard}>
                <span className={styles.vacancyTag}>{vacancy.department}</span>
                <h3>{vacancy.title}</h3>
                <p>{vacancy.summary}</p>
                <div className={styles.vacancyMeta}>
                  <span>{vacancy.type}</span>
                  <span>•</span>
                  <span>{vacancy.location}</span>
                </div>
                <Link href={`/careers/apply?role=${vacancy.slug}`} className="btn btn--primary" style={{ marginTop: 'auto' }}>
                  Apply Now →
                </Link>
              </article>
            ))}
          </div>

          <ScrollReveal className="reveal" id="process">
            <div className={`${styles.sectionHead} ${styles.sectionHeadCenter}`} style={{ marginTop: 'var(--s-4xl)' }}>
              <span className="label">Hiring Process</span>
              <h2>How Applications Move Forward</h2>
              <p>Submission, review, shortlist, and interview notifications happen inside one in-app workflow.</p>
            </div>
          </ScrollReveal>

          <div className={styles.careersProcess}>
            {[
              { num: '01', title: 'Apply', text: 'Candidates submit a form with their CV, experience, and contact details.' },
              { num: '02', title: 'Review', text: 'The admin team reviews applications and updates the status in the dashboard.' },
              { num: '03', title: 'Shortlist', text: 'Shortlisted candidates receive both SMS and email interview notices.' },
              { num: '04', title: 'Interview', text: 'The interview date, time, and venue are recorded and sent to the applicant.' },
            ].map((step) => (
              <article key={step.num} className={styles.stepCard}>
                <div className={styles.stepNumber}>{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}