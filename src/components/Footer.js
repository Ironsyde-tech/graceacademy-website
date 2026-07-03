import Link from 'next/link';
import Image from 'next/image';
import { BriefcaseBusiness, Camera, Globe, Mail, MapPin, MessagesSquare, Phone, PlayCircle } from 'lucide-react';
import styles from './Footer.module.css';

const ADMISSIONS_URL = 'https://admission.graceacademysch.com/';
const ERP_URL = 'https://erp.graceacademysch.com';

export default function Footer() {
  return (
    <footer className={styles.footer} id="footer">
      {/* Wave divider top */}
      <div className={styles.waveTop}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,20 1440,30 L1440,60 L0,60 Z" fill="#0D2818" />
        </svg>
      </div>

      <div className={styles.inner}>
        <div className={styles.top}>
          {/* Brand */}
          <div className={styles.brand}>
            <div className={styles.logoRow}>
              <div className={styles.logoMark}>
                <Image src="/images/logo.png" alt="Grace Academy Crest" width={48} height={48} style={{ borderRadius: '50%', objectFit: 'cover' }} />
              </div>
              <div>
                <span className={styles.logoName}>Grace Academy</span>
                <span className={styles.logoLocation}>Spintex, Tema-Accra</span>
              </div>
            </div>
            <p className={styles.motto}>
              &ldquo;The Fear of the Lord is the Beginning of Wisdom.&rdquo;
            </p>
            <div className={styles.socials}>
              {[
                { label: 'Facebook', icon: MessagesSquare },
                { label: 'Twitter', icon: Globe },
                { label: 'Instagram', icon: Camera },
                { label: 'YouTube', icon: PlayCircle },
                { label: 'LinkedIn', icon: BriefcaseBusiness },
              ].map((s) => (
                <a key={s.label} href="#" className={styles.socialLink} aria-label={s.label}>
                  <s.icon size={17} strokeWidth={2} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.column}>
            <h4 className={styles.colTitle}>Navigate</h4>
            <ul>
              <li><Link href="/academics">Academics</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/admin/login">Admin Login</Link></li>
              <li><a href={ADMISSIONS_URL} target="_blank" rel="noreferrer">Admissions</a></li>
              <li><Link href="/student-life">Student Life</Link></li>
              <li><Link href="/gallery">Gallery</Link></li>
              <li><Link href="/news">News &amp; Events</Link></li>
              <li><a href={ERP_URL} target="_blank" rel="noreferrer">ERP Portal</a></li>
            </ul>
          </div>

          {/* Programs */}
          <div className={styles.column}>
            <h4 className={styles.colTitle}>Programs</h4>
            <ul>
              <li><Link href="/academics">Crèche &amp; Nursery</Link></li>
              <li><Link href="/academics">Primary School</Link></li>
              <li><Link href="/academics">Junior High (JHS)</Link></li>
              <li><Link href="/academics">Senior High (SHS)</Link></li>
              <li><a href={ADMISSIONS_URL} target="_blank" rel="noreferrer">Scholarships</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className={styles.column}>
            <h4 className={styles.colTitle}>Get in Touch</h4>
            <div className={styles.contactList}>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}><MapPin size={16} strokeWidth={2.1} aria-hidden="true" /></span>
                <span>Spintex Road, Tema-Accra<br />P.O. Box SR 169, Spintex Road - Tema</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}><Phone size={16} strokeWidth={2.1} aria-hidden="true" /></span>
                <span>+233 54 351 0263 / +233 26 226 2428</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}><Mail size={16} strokeWidth={2.1} aria-hidden="true" /></span>
                <span>graceacademy233@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Grace Academy. Excellence in Education since 2000.
          </p>
          <div className={styles.bottomLinks}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
