'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';
import styles from '../pages.module.css';

const categories = ['All', 'Classrooms', 'Sports'];

export default function GalleryPage() {
  const [active, setActive] = useState('All');
  const [lightbox, setLightbox] = useState(null);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const res = await fetch('/api/gallery');
        const data = await res.json();
        if (Array.isArray(data.photos)) {
          setPhotos(data.photos);
        }
      } catch {
        setPhotos([]);
      }
    };

    loadPhotos();
  }, []);

  const visiblePhotos = photos.filter((p) => categories.includes(p.cat));
  const filtered = active === 'All' ? visiblePhotos : visiblePhotos.filter((p) => p.cat === active);

  return (
    <>
      <section className={styles.pageHero}>
        <div className={styles.pageHeroBg}>
          <Image src="/images/gallery-hero.jpeg" alt="Grace Academy sports gallery" fill style={{ objectFit: 'cover' }} priority />
        </div>
        <div className={styles.pageHeroContent}>
          <span className="label label--light">Gallery</span>
          <h1>Life at<br />Grace Academy</h1>
          <p>A visual journey through our classrooms, events, sports, and the moments that define the Grace Academy experience.</p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className={styles.content} style={{ background: 'var(--off-white)' }}>
        <div className={styles.contentInner}>
          <ScrollReveal className="reveal">
            <div className={`${styles.sectionHead} ${styles.sectionHeadCenter}`}>
              <span className="label">Photo Gallery</span>
              <h2>Capturing Every Moment</h2>
            </div>
          </ScrollReveal>

          {/* Filter Bar */}
          <ScrollReveal className="reveal">
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '0.5rem',
              marginBottom: 'var(--s-2xl)',
            }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  style={{
                    padding: '0.5rem 1.2rem',
                    borderRadius: 'var(--r-pill)',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    letterSpacing: '0.02em',
                    transition: 'all 0.3s ease',
                    background: active === cat ? 'var(--green)' : 'white',
                    color: active === cat ? 'white' : 'var(--body)',
                    boxShadow: active === cat ? 'var(--sh-md)' : 'var(--sh-sm)',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Photo Grid */}
          <ScrollReveal className="reveal stagger-children">
            {filtered.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: 'var(--s-3xl) var(--s-xl)',
                background: 'var(--white)',
                borderRadius: 'var(--r-lg)',
                boxShadow: 'var(--sh-sm)',
              }}>
                <h3 style={{ marginBottom: 'var(--s-sm)' }}>Gallery will be updated soon</h3>
                <p style={{ color: 'var(--body)', margin: 0 }}>No images available right now. New photos will be added shortly.</p>
              </div>
            ) : (
              <div className={styles.galleryGrid}>
                {filtered.map((item, i) => (
                  <div
                    key={i}
                    className={`${styles.galleryItem} img-zoom`}
                    onClick={() => setLightbox(item)}
                    style={{ cursor: 'pointer' }}
                  >
                    <Image src={item.src} alt={item.label} fill style={{ objectFit: 'cover' }} />
                    <div className={styles.galleryItemLabel}>{item.label}</div>
                  </div>
                ))}
              </div>
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0,0,0,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 'var(--s-md)',
            cursor: 'pointer',
            animation: 'fadeIn 0.3s ease',
          }}
        >
          <div style={{
            position: 'relative',
            width: '90vw',
            maxWidth: '900px',
            aspectRatio: '16/10',
            borderRadius: 'var(--r-lg)',
            overflow: 'hidden',
          }}>
            <Image src={lightbox.src} alt={lightbox.label} fill style={{ objectFit: 'cover' }} />
          </div>
          <p style={{
            color: 'white',
            fontFamily: 'var(--font-display)',
            fontSize: '1.1rem',
            textAlign: 'center',
          }}>
            {lightbox.label}
          </p>
          <span style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '0.75rem',
          }}>
            Click anywhere to close
          </span>
        </div>
      )}
    </>
  );
}
