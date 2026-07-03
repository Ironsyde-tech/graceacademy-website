'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../pages.module.css';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || 'Login failed');

      router.push('/admin/careers');
      router.refresh();
    } catch (loginError) {
      setError(loginError.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.adminAuthShell}>
      <div className={styles.adminAuthGrid}>
        <section className={styles.adminAuthIntro}>
          <span className={styles.adminAuthEyebrow}>Careers Admin</span>
          <h1>Review applicants with a clean, private dashboard</h1>
          <p>
            Sign in to review applications, record interview details, and send shortlist updates without leaving the site.
          </p>

          <ul className={styles.adminAuthList}>
            <li>Review incoming applications and open CV files.</li>
            <li>Track reviewed, shortlisted, and rejected status changes.</li>
            <li>Capture interview date, time, and venue for each candidate.</li>
          </ul>
        </section>

        <section className={styles.adminAuthCard}>
          <div>
            <span className={styles.adminAuthEyebrow}>Secure Sign In</span>
            <h2>Admin Login</h2>
            <p>Use the credentials provided to the hiring team.</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.adminAuthForm}>
            <label className={styles.adminAuthField}>
              <span>Username</span>
              <input
                autoComplete="username"
                placeholder="Enter username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </label>

            <label className={styles.adminAuthField}>
              <span>Password</span>
              <input
                autoComplete="current-password"
                placeholder="Enter password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>

            <button type="submit" className={styles.adminAuthButton} disabled={loading}>
              {loading ? 'Logging in...' : 'Login to Dashboard'}
            </button>

            {error ? <p className={styles.adminAuthError}>{error}</p> : null}
          </form>
        </section>
      </div>
    </main>
  );
}