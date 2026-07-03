'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AlertTriangle, CheckCircle2, Clock3, Mail, MapPin, Phone } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import styles from '../pages.module.css';

export default function ContactPage() {
  const [formState, setFormState] = useState('idle'); // idle | sending | sent | error
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', subject: '', message: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState('sending');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          subject: `Grace Academy — ${formData.subject || 'Contact Form'}`,
          from_name: `${formData.firstName} ${formData.lastName}`,
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setFormState('sent');
        setFormData({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' });
        setTimeout(() => setFormState('idle'), 5000);
      } else {
        throw new Error('Submission failed');
      }
    } catch {
      setFormState('error');
      setTimeout(() => setFormState('idle'), 4000);
    }
  };

  return (
    <>
      <section className={styles.pageHero}>
        <div className={styles.pageHeroBg}>
          <Image src="/images/bg.png" alt="Contact Grace Academy" fill style={{ objectFit: 'cover' }} priority />
        </div>
        <div className={styles.pageHeroContent}>
          <span className="label label--light">Get in Touch</span>
          <h1>We&apos;d Love to<br />Hear From You</h1>
          <p>Whether you have a question, want to schedule a visit, or are ready to apply — our doors are always open.</p>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className={styles.content} style={{ background: 'var(--off-white)' }}>
        <ScrollReveal className="reveal">
          <div className={styles.contentInner}>
            <div className={styles.contactGrid}>
              {/* Form */}
              <div>
                <h2 style={{ marginBottom: 'var(--s-xl)' }}>Send Us a Message</h2>

                {formState === 'sent' && (
                  <div style={{
                    background: 'var(--green-pale)', border: '2px solid var(--green)',
                    borderRadius: 'var(--r-md)', padding: 'var(--s-lg)',
                    marginBottom: 'var(--s-xl)', display: 'flex', alignItems: 'center', gap: 'var(--s-sm)',
                  }}>
                    <CheckCircle2 size={22} color="var(--green)" strokeWidth={2.3} aria-hidden="true" />
                    <div>
                      <strong style={{ color: 'var(--green)' }}>Message Sent!</strong>
                      <p style={{ color: 'var(--body)', fontSize: '0.85rem', margin: 0 }}>Thank you for reaching out. We&apos;ll respond within 24 hours.</p>
                    </div>
                  </div>
                )}

                {formState === 'error' && (
                  <div style={{
                    background: '#FEF2F2', border: '2px solid #EF4444',
                    borderRadius: 'var(--r-md)', padding: 'var(--s-lg)',
                    marginBottom: 'var(--s-xl)', display: 'flex', alignItems: 'center', gap: 'var(--s-sm)',
                  }}>
                    <AlertTriangle size={22} color="#DC2626" strokeWidth={2.3} aria-hidden="true" />
                    <div>
                      <strong style={{ color: '#DC2626' }}>Something went wrong</strong>
                      <p style={{ color: 'var(--body)', fontSize: '0.85rem', margin: 0 }}>Please try again or call us directly at +233 54 351 0263.</p>
                    </div>
                  </div>
                )}

                <form id="contact-form" onSubmit={handleSubmit}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="firstName">First Name</label>
                      <input type="text" id="firstName" name="firstName" placeholder="Kofi" required value={formData.firstName} onChange={handleChange} />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="lastName">Last Name</label>
                      <input type="text" id="lastName" name="lastName" placeholder="Mensah" required value={formData.lastName} onChange={handleChange} />
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" name="email" placeholder="kofi@example.com" required value={formData.email} onChange={handleChange} />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone" placeholder="+233 54 351 0263" value={formData.phone} onChange={handleChange} />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="subject">Subject</label>
                    <select id="subject" name="subject" required value={formData.subject} onChange={handleChange}>
                      <option value="">Select a topic...</option>
                      <option value="admissions">Admissions Inquiry</option>
                      <option value="tour">Schedule a Campus Tour</option>
                      <option value="fees">Tuition &amp; Fees</option>
                      <option value="general">General Question</option>
                      <option value="career">Career Opportunities</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" placeholder="Tell us how we can help..." required value={formData.message} onChange={handleChange} />
                  </div>
                  <button
                    type="submit"
                    className="btn btn--primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                    disabled={formState === 'sending'}
                  >
                    {formState === 'sending' ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span className="spinner" style={{
                          width: '18px', height: '18px',
                          border: '2px solid rgba(255,255,255,0.3)',
                          borderTop: '2px solid white',
                          borderRadius: '50%',
                          animation: 'spin 0.8s linear infinite',
                          display: 'inline-block',
                        }} />
                        Sending...
                      </span>
                    ) : 'Send Message →'}
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div className={styles.contactInfo}>
                <h3 style={{ marginBottom: 'var(--s-md)' }}>Other Ways to Reach Us</h3>

                {[
                  { icon: MapPin, title: 'Visit Us', text: 'Spintex Road, Tema-Accra\nP.O. Box SR 169, Spintex Road - Tema' },
                  { icon: Phone, title: 'Call Us', text: '+233 54 351 0263\n+233 26 226 2428' },
                  { icon: Mail, title: 'Email Us', text: 'graceacademy233@gmail.com' },
                  { icon: Clock3, title: 'Office Hours', text: 'Mon – Fri: 7:30 AM – 4:30 PM\nSat: 8:00 AM – 12:00 PM' },
                ].map((item) => (
                  <div key={item.title} className={styles.contactInfoItem}>
                    <div className={styles.contactInfoIcon}><item.icon size={18} strokeWidth={2.1} aria-hidden="true" /></div>
                    <div className={styles.contactInfoText}>
                      <h4>{item.title}</h4>
                      <p style={{ whiteSpace: 'pre-line' }}>{item.text}</p>
                    </div>
                  </div>
                ))}

                {/* Live Google Map */}
                <div style={{
                  borderRadius: 'var(--r-lg)',
                  overflow: 'hidden',
                  aspectRatio: '16/10',
                  marginTop: 'var(--s-md)',
                  boxShadow: 'var(--sh-md)',
                }}>
                  <iframe
                    title="Grace Academy Location — Spintex Road, Tema-Accra"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.5!2d-0.05!3d5.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMzknMDAuMCJOIDDCsDAzJzAwLjAiVw!5e0!3m2!1sen!2sgh!4v1700000000000!5m2!1sen!2sgh"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* FAQ */}
      <section className={styles.content}>
        <div className={styles.contentInner}>
          <ScrollReveal className="reveal">
            <div className={`${styles.sectionHead} ${styles.sectionHeadCenter}`}>
              <span className="label">FAQ</span>
              <h2>Common Questions</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal className="reveal stagger-children">
            <div style={{ maxWidth: '720px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--s-lg)' }}>
              {[
                { q: 'What ages do you accept?', a: 'We welcome children from 6 months (crèche) through SHS 3 (age 18). Our campus serves every stage of a child\'s educational journey.' },
                { q: 'Is Grace Academy a boarding school?', a: 'We offer both day and boarding options for SHS students. Crèche through JHS is day-school only.' },
                { q: 'What curriculum do you follow?', a: 'We follow the Ghana Education Service (GES) curriculum, now enriched with our newly introduced UCMAS mental arithmetic program and modern teaching methods to ensure both local relevance and academic excellence.' },
                { q: 'Are scholarships available?', a: 'Yes! We offer merit-based scholarships (up to 50% tuition) and need-based financial aid. Contact our admissions office for details.' },
                { q: 'Can I visit the campus before applying?', a: 'Absolutely! We encourage all prospective families to schedule a campus tour. You can book one through this page or call our admissions office.' },
              ].map((faq, i) => (
                <div key={i} style={{
                  background: 'var(--white)',
                  borderRadius: 'var(--r-lg)',
                  padding: 'var(--s-xl)',
                  boxShadow: 'var(--sh-sm)',
                }}>
                  <h4 style={{ marginBottom: 'var(--s-sm)', color: 'var(--heading)' }}>{faq.q}</h4>
                  <p style={{ color: 'var(--body)', fontSize: '0.9rem', lineHeight: '1.7' }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
