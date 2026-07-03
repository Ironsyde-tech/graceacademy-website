'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../pages.module.css';

function formatRole(role = 'Unspecified Role') {
  return String(role)
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function formatDateTime(value) {
  if (!value) return 'Not set';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

function getStatusLabel(status = 'unknown') {
  if (status === 'submitted') return 'Pending';
  if (status === 'reviewed') return 'Reviewed';
  if (status === 'shortlisted') return 'Shortlisted';
  if (status === 'rejected') return 'Rejected';
  return String(status).replace(/_/g, ' ');
}

function getStatusClass(status = 'unknown') {
  if (status === 'submitted') return styles.statusChipPending;
  if (status === 'reviewed') return styles.statusChipReviewed;
  if (status === 'shortlisted') return styles.statusChipShortlisted;
  if (status === 'rejected') return styles.statusChipRejected;
  return styles.statusChipNeutral;
}

const ROLE_ACCENTS = ['#1b6b3a', '#d4a017', '#0f766e', '#7c3aed'];

export default function AdminCareersPage() {
  const router = useRouter();
  const [applications, setApplications] = useState([]);
  const [status, setStatus] = useState('loading');
  const [drafts, setDrafts] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const statusCounts = applications.reduce(
    (counts, application) => {
      const key = application.status || 'unknown';
      counts[key] = (counts[key] || 0) + 1;
      return counts;
    },
    { reviewed: 0, shortlisted: 0, rejected: 0, pending: 0 },
  );

  const filteredApplications = applications.filter((application) => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const matchesSearch = !normalizedSearch
      || [application.fullName, application.email, application.phone, application.role]
        .filter(Boolean)
        .some((field) => String(field).toLowerCase().includes(normalizedSearch));

    const matchesStatus = statusFilter === 'all' || (application.status || 'unknown') === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const groupedApplications = filteredApplications.reduce((groups, application) => {
    const roleKey = application.role || 'Unspecified Role';
    if (!groups[roleKey]) {
      groups[roleKey] = [];
    }

    groups[roleKey].push(application);
    return groups;
  }, {});

  const roleGroups = Object.entries(groupedApplications);

  const loadApplications = async () => {
    setStatus('loading');
    try {
      const response = await fetch('/api/admin/careers');
      if (response.status === 401) {
        router.push('/admin/login');
        return;
      }
      const payload = await response.json();
      setApplications(payload.applications || []);
      setStatus('ready');
    } catch {
      setStatus('error');
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const setDraft = (id, key, value) => {
    setDrafts((prev) => ({
      ...prev,
      [id]: {
        ...(prev[id] || {}),
        [key]: value,
      },
    }));
  };

  const updateApplication = async (id, nextStatus) => {
    const draft = drafts[id] || {};
    const response = await fetch('/api/admin/careers', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id,
        status: nextStatus,
        interviewDate: draft.interviewDate || '',
        interviewTime: draft.interviewTime || '',
        interviewVenue: draft.interviewVenue || '',
      }),
    });

    if (response.status === 401) {
      router.push('/admin/login');
      return;
    }

    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || 'Update failed');
    }

    await loadApplications();
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  return (
    <main className={styles.adminShell}>
      <header className={styles.adminHero}>
        <div className={styles.adminToolbar}>
          <div className={styles.adminHeroCopy}>
            <span className={styles.adminSectionEyebrow}>Admissions Workflow</span>
            <h1>Careers Admin</h1>
            <p>Review incoming applications, shortlist candidates, and schedule interviews.</p>
          </div>

          <div className={styles.adminTopActions}>
            <button type="button" className={styles.adminTopActionSecondary} onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </header>

      <section className={styles.adminSummaryGrid}>
        <article className={styles.adminSummaryCard}>
          <span>Total Applications</span>
          <strong>{applications.length}</strong>
        </article>
        <article className={styles.adminSummaryCard}>
          <span>Pending Review</span>
          <strong>{statusCounts.pending}</strong>
        </article>
        <article className={styles.adminSummaryCard}>
          <span>Shortlisted</span>
          <strong>{statusCounts.shortlisted}</strong>
        </article>
        <article className={styles.adminSummaryCard}>
          <span>Reviewed</span>
          <strong>{statusCounts.reviewed}</strong>
        </article>
      </section>

      <section className={styles.adminFilterBar}>
        <div className={styles.adminFilterField}>
          <label htmlFor="admin-search">Search</label>
          <input
            id="admin-search"
            type="search"
            placeholder="Search by name, email, phone, or role"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
        <div className={styles.adminFilterField}>
          <label htmlFor="admin-status-filter">Status</label>
          <select
            id="admin-status-filter"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="all">All statuses</option>
            <option value="submitted">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div className={styles.adminFilterMeta}>
          Showing {filteredApplications.length} of {applications.length} applications
        </div>
      </section>

      {status === 'loading' ? <p>Loading applications...</p> : null}
      {status === 'error' ? <p>Could not load applications.</p> : null}
      {filteredApplications.length === 0 && status === 'ready' ? (
        <section className={styles.adminEmptyState}>
          <h2>{applications.length === 0 ? 'No applications yet' : 'No matches found'}</h2>
          <p>
            {applications.length === 0
              ? 'When candidates apply, their details, CVs, and interview history will appear here.'
              : 'Try changing the search term or status filter to see matching applications.'}
          </p>
        </section>
      ) : null}

      {filteredApplications.length > 0 ? (
        <div className={styles.adminRoleGroups}>
          {roleGroups.map(([role, roleApplications]) => (
            <section
              key={role}
              className={styles.adminRoleGroup}
              style={{ '--role-accent': ROLE_ACCENTS[roleGroups.findIndex(([groupRole]) => groupRole === role) % ROLE_ACCENTS.length] }}
            >
              <header className={styles.adminRoleGroupHeader}>
                <div>
                  <span className={styles.adminSectionEyebrow}>Application Queue</span>
                  <h2>{formatRole(role)}</h2>
                </div>
                <div className={styles.adminRoleCount}>{roleApplications.length} candidate{roleApplications.length === 1 ? '' : 's'}</div>
              </header>

              <div className={styles.adminCardGrid}>
                {roleApplications.map((application) => (
                  <article key={application.id} className={styles.adminCard}>
                    <div className={styles.adminCardHeader}>
                      <div className={styles.adminCardTitleRow}>
                        <span className={`${styles.statusChip} ${getStatusClass(application.status)}`}>{getStatusLabel(application.status)}</span>
                        <div className={styles.adminCandidateBlock}>
                          <h3>{application.fullName}</h3>
                          <p>{formatRole(role)}</p>
                        </div>
                      </div>
                      <div className={styles.adminCvPanel}>
                        <span>CV</span>
                        <a href={application.resumePath} target="_blank" rel="noreferrer">Open file</a>
                      </div>
                    </div>

                    <div className={styles.adminCardLayout}>
                      <section className={styles.adminCardMain}>
                        <div className={styles.adminMetaGrid}>
                          <div>
                            <span>Email</span>
                            <strong>{application.email}</strong>
                          </div>
                          <div>
                            <span>Phone</span>
                            <strong>{application.phone}</strong>
                          </div>
                          <div>
                            <span>Submitted</span>
                            <strong>{formatDateTime(application.createdAt)}</strong>
                          </div>
                        </div>

                        <section className={styles.adminCardSection}>
                          <header className={styles.adminCardSectionHeader}>
                            <h4>Interview Details</h4>
                            <p>Record the interview schedule before shortlist notifications are sent.</p>
                          </header>
                          <div className={styles.interviewGrid}>
                            <input placeholder="Interview date" value={drafts[application.id]?.interviewDate || application.interviewDate || ''} onChange={(event) => setDraft(application.id, 'interviewDate', event.target.value)} />
                            <input placeholder="Interview time" value={drafts[application.id]?.interviewTime || application.interviewTime || ''} onChange={(event) => setDraft(application.id, 'interviewTime', event.target.value)} />
                            <input placeholder="Interview venue" value={drafts[application.id]?.interviewVenue || application.interviewVenue || ''} onChange={(event) => setDraft(application.id, 'interviewVenue', event.target.value)} />
                          </div>
                        </section>

                        <section className={styles.adminCardSection}>
                          <header className={styles.adminCardSectionHeader}>
                            <h4>Actions</h4>
                            <p>Move the candidate through the hiring workflow.</p>
                          </header>
                          <div className={styles.actionRow}>
                            <button type="button" className={styles.actionButton} onClick={() => updateApplication(application.id, 'reviewed')}>Mark Reviewed</button>
                            <button type="button" className={`${styles.actionButton} ${styles.actionButtonSecondary}`} onClick={() => updateApplication(application.id, 'shortlisted')}>Shortlist + Notify</button>
                            <button type="button" className={`${styles.actionButton} ${styles.actionButtonDanger}`} onClick={() => updateApplication(application.id, 'rejected')}>Reject</button>
                          </div>
                        </section>
                      </section>

                      <aside className={styles.adminCardRail}>
                        <section className={styles.adminCardSection}>
                          <header className={styles.adminCardSectionHeader}>
                            <h4>Candidate Snapshot</h4>
                            <p>Quick reference for reviewers.</p>
                          </header>
                          <div className={styles.adminRailList}>
                            <div>
                              <span>Email</span>
                              <strong>{application.email}</strong>
                            </div>
                            <div>
                              <span>Phone</span>
                              <strong>{application.phone}</strong>
                            </div>
                            <div>
                              <span>Applied For</span>
                              <strong>{formatRole(role)}</strong>
                            </div>
                          </div>
                        </section>

                        <section className={styles.adminCardSection}>
                          <header className={styles.adminCardSectionHeader}>
                            <h4>Status History</h4>
                            <p>Every review action is recorded here.</p>
                          </header>
                          <div className={styles.historyList}>
                            {(application.statusHistory || []).slice().reverse().map((entry) => (
                              <div key={entry.id} className={styles.historyItem}>
                                <span className={`${styles.statusChip} ${getStatusClass(entry.status)}`}>{getStatusLabel(entry.status)}</span>
                                <p>{entry.note}</p>
                                <span>{formatDateTime(entry.createdAt)}</span>
                              </div>
                            ))}
                          </div>
                        </section>
                      </aside>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : null}
    </main>
  );
}