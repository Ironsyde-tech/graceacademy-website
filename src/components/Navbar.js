'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { BookOpen, GraduationCap, House, Newspaper, Phone } from 'lucide-react';
import styles from './Navbar.module.css';

const ADMISSIONS_URL = 'https://admission.graceacademysch.com/';
const ERP_URL = 'https://erp.graceacademysch.com';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/academics', label: 'Academics' },
  { href: '/heritage', label: 'Heritage' },
  { href: '/student-life', label: 'Student Life' },
  { href: '/careers', label: 'Careers' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/news', label: 'News' },
  { href: '/contact', label: 'Contact' },
];

const mobileNav = [
  { href: '/', label: 'Home', icon: House },
  { href: '/academics', label: 'Learn', icon: BookOpen },
  { href: '/careers', label: 'Jobs', icon: GraduationCap },
  { href: '/news', label: 'News', icon: Newspaper },
  { href: ADMISSIONS_URL, label: 'Apply', icon: GraduationCap, external: true },
  { href: '/contact', label: 'Call', icon: Phone },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* ── Desktop / Main Nav ── */}
      <nav className={`${styles.nav} ${scrolled ? styles.navSolid : ''}`} id="main-nav">
        <div className={styles.inner}>
          <Link href="/" className={styles.logo}>
            <div className={styles.logoMark}>
              <Image src="/images/logo.png" alt="Grace Academy Crest" width={44} height={44} style={{ borderRadius: '50%', objectFit: 'cover' }} />
            </div>
            <div className={styles.logoText}>
              <span className={styles.logoName}>Grace Academy</span>
              <span className={styles.logoSub}>Spintex, Tema-Accra</span>
            </div>
          </Link>

          <ul className={`${styles.links} ${isOpen ? styles.linksOpen : ''}`}>
            {navLinks.map((link, i) => (
              <li key={link.href} style={{ animationDelay: isOpen ? `${i * 60}ms` : '0ms' }}>
                {link.external ? (
                  <a href={link.href} target="_blank" rel="noreferrer" className={styles.link}>
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className={`${styles.link} ${pathname === link.href ? styles.linkActive : ''}`}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
            <li style={{ animationDelay: isOpen ? `${navLinks.length * 60}ms` : '0ms' }}>
              <a href={ERP_URL} target="_blank" rel="noreferrer" className={`${styles.applyBtn} ${styles.erpBtn}`}>
                ERP Portal
              </a>
            </li>
            <li style={{ animationDelay: isOpen ? `${(navLinks.length + 1) * 60}ms` : '0ms' }}>
              <a href={ADMISSIONS_URL} target="_blank" rel="noreferrer" className={styles.applyBtn}>
                Apply Now →
              </a>
            </li>
          </ul>

          <button
            className={`${styles.burger} ${isOpen ? styles.burgerOpen : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ── Mobile Overlay ── */}
      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)} />
      )}

      {/* ── Mobile Bottom Nav ── */}
      <nav className={styles.bottomNav}>
        {mobileNav.map((item) => (
          item.external ? (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className={styles.bottomItem}
            >
              <span className={styles.bottomIcon}><item.icon size={17} strokeWidth={2.1} aria-hidden="true" /></span>
              <span className={styles.bottomLabel}>{item.label}</span>
            </a>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.bottomItem} ${pathname === item.href ? styles.bottomItemActive : ''}`}
            >
              <span className={styles.bottomIcon}><item.icon size={17} strokeWidth={2.1} aria-hidden="true" /></span>
              <span className={styles.bottomLabel}>{item.label}</span>
            </Link>
          )
        ))}
      </nav>

      {/* ── Mobile Sticky Apply Button ── */}
      <div className={styles.stickyApply}>
        <a href={ADMISSIONS_URL} target="_blank" rel="noreferrer" className="btn btn--primary btn--pulse" style={{ width: '100%', justifyContent: 'center' }}>
          Apply Now — 2025/2026
        </a>
      </div>
    </>
  );
}
