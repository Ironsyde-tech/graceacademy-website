'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from '../../pages.module.css';

const vacancyOptions = [
  { value: 'mathematics-teacher', label: 'Mathematics Teacher' },
  { value: 'preschool-assistant', label: 'Pre-School Assistant' },
  { value: 'ict-coordinator', label: 'ICT Coordinator' },
];

export default function CareersApplyForm() {
  const searchParams = useSearchParams();
  const roleFromQuery = searchParams.get('role') || '';
  const [state, setState] = useState('idle');
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: roleFromQuery,
    experience: '',
    coverLetter: '',
  });

  const selectedRoleLabel = useMemo(() => vacancyOptions.find((option) => option.value === formData.role)?.label || 'Select a role', [formData.role]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setState('submitting');
    setMessage('');

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => form.append(key, value));
    const resumeInput = event.currentTarget.elements.resume;
    if (resumeInput.files[0]) form.append('resume', resumeInput.files[0]);

    try {
      const response = await fetch('/api/careers/apply', { method: 'POST', body: form });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || 'Submission failed');
      setState('success');
      setMessage('Application submitted. You will receive an SMS and email confirmation shortly.');
      setFormData({ fullName: '', email: '', phone: '', role: roleFromQuery, experience: '', coverLetter: '' });
      event.currentTarget.reset();
    } catch (error) {
      setState('error');
      setMessage(error.message || 'Something went wrong.');
    } finally {
      setTimeout(() => setState('idle'), 4500);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" style={{ maxWidth: '760px', margin: '0 auto', background: 'var(--white)', padding: 'var(--s-xl)', borderRadius: 'var(--r-lg)', boxShadow: 'var(--sh-sm)', border: '1px solid rgba(13, 40, 24, 0.08)' }}>
      <div className={styles.sectionHead} style={{ marginBottom: 'var(--s-xl)' }}>
        <span className="label">Application Form</span>
        <h2>Tell Us About Yourself</h2>
        <p>Fill in your details carefully so the admin review team can process your application quickly.</p>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="fullName">Full Name</label>
        <input id="fullName" name="fullName" required value={formData.fullName} onChange={handleChange} />
      </div>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange} />
        </div>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="role">Role</label>
        <select id="role" name="role" required value={formData.role} onChange={handleChange}>
          <option value="">Select a role</option>
          {vacancyOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="experience">Years of Experience</label>
        <input id="experience" name="experience" placeholder="e.g. 3 years" value={formData.experience} onChange={handleChange} />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="coverLetter">Cover Letter</label>
        <textarea id="coverLetter" name="coverLetter" rows={6} value={formData.coverLetter} onChange={handleChange} />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="resume">Upload CV</label>
        <input id="resume" name="resume" type="file" accept=".pdf,.doc,.docx" required />
      </div>
      <button type="submit" className="btn btn--primary" style={{ width: '100%', justifyContent: 'center' }} disabled={state === 'submitting'}>
        {state === 'submitting' ? 'Submitting...' : `Submit Application for ${selectedRoleLabel}`}
      </button>
      {message ? (
        <p style={{ marginTop: 'var(--s-md)', color: state === 'error' ? '#B91C1C' : 'var(--green)' }}>{message}</p>
      ) : null}
    </form>
  );
}