import { Suspense } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import styles from '../../pages.module.css';
import CareersApplyForm from './CareersApplyForm';

export default function CareersApplyPage() {
  return (
    <>
      <section className={styles.pageHero}>
        <div className={styles.pageHeroBg} />
        <div className={styles.pageHeroContent}>
          <span className="label label--light">Apply Now</span>
          <h1>Submit Your Application</h1>
          <p>Fill in the form, upload your CV, and our admin team will review your application for the next stage.</p>
        </div>
      </section>

      <section className={styles.content} style={{ background: 'var(--off-white)' }}>
        <div className={styles.contentInner}>
          <ScrollReveal className="reveal">
            <div className={styles.careersFormLayout}>
              <Suspense fallback={<div style={{ maxWidth: '760px', margin: '0 auto' }}>Loading application form...</div>}>
                <CareersApplyForm />
              </Suspense>

              <aside className={`${styles.careersPanel} ${styles.careersSideNote}`}>
                <span className="label">Before You Submit</span>
                <h3 style={{ marginTop: 'var(--s-sm)' }}>Please keep these ready</h3>
                <ul className={styles.careersBulletList}>
                  <li>Your current CV in PDF, DOC, or DOCX format</li>
                  <li>A working email address and mobile number</li>
                  <li>Relevant teaching or professional experience</li>
                  <li>Interview availability details if shortlisted</li>
                </ul>
              </aside>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}