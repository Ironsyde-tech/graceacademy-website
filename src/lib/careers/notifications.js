import { assertCareersConfig, getCareersConfig } from './config';
import { Resend } from 'resend';

function resolveConfig() {
  const { config, missing } = assertCareersConfig();
  if (missing.length && process.env.NODE_ENV !== 'production') {
    return { config, missing, disabled: true };
  }

  return { config, missing, disabled: false };
}

function normalizePhoneNumber(phone) {
  const digits = String(phone || '').replace(/\D/g, '');
  if (!digits) return '';

  if (digits.startsWith('233')) {
    return digits;
  }

  if (digits.startsWith('0')) {
    return `233${digits.slice(1)}`;
  }

  return digits;
}

async function sendSms({ to, message }) {
  const { config, disabled } = resolveConfig();
  if (disabled || !config.sms.apiUrl || !config.sms.apiKey || !to) {
    return { skipped: true, reason: 'SMS provider not configured' };
  }

  const response = await fetch(config.sms.apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `key ${config.sms.apiKey}`,
    },
    body: JSON.stringify({
      text: message,
      type: 0,
      sender: config.sms.senderId,
      destinations: [normalizePhoneNumber(to)],
    }),
  });

  if (!response.ok) {
    throw new Error('SMS provider request failed');
  }

  return response.json().catch(() => ({ ok: true }));
}

async function sendEmail({ to, subject, message, html }) {
  const { config, disabled } = resolveConfig();
  if (disabled || !to) {
    return { skipped: true, reason: 'Email provider not configured' };
  }

  if (config.email.resendApiKey) {
    const resend = new Resend(config.email.resendApiKey);
    const { data, error } = await resend.emails.send({
      from: config.email.from,
      to,
      subject,
      text: message,
      html,
    });

    if (error) {
      throw new Error(`Resend request failed: ${error.message || 'unknown error'}`);
    }

    return data || { ok: true };
  }

  if (!config.email.webhookUrl) {
    return { skipped: true, reason: 'Email provider not configured' };
  }

  const response = await fetch(config.email.webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ to, subject, message, html }),
  });

  if (!response.ok) {
    throw new Error('Email webhook request failed');
  }

  return response.json().catch(() => ({ ok: true }));
}

export async function notifyNewApplication(application) {
  const { config, disabled } = resolveConfig();
  if (disabled) {
    return [];
  }

  const summary = [
    `New application received from ${application.fullName}.`,
    `Role: ${application.role}.`,
    `Phone: ${application.phone}.`,
    `Email: ${application.email}.`,
    application.experience ? `Experience: ${application.experience}.` : null,
  ].filter(Boolean).join(' ');

  const smsRecipients = config.admin.phones;
  const emailRecipients = config.admin.emails;

  const smsJobs = smsRecipients.map((to) => sendSms({ to, message: `Grace Academy careers: ${summary}` }));
  const emailJobs = emailRecipients.map((to) => sendEmail({
    to,
    subject: `New application: ${application.fullName} for ${application.role}`,
    message: summary,
    html: `<p>${summary.replace(/\n/g, '<br />')}</p>`,
  }));

  return Promise.allSettled([...smsJobs, ...emailJobs]);
}

export async function notifyShortlistedApplicant(application, interview = {}) {
  const { disabled } = resolveConfig();
  if (disabled) {
    return [{ status: 'skipped' }, { status: 'skipped' }];
  }

  const interviewText = [
    `Congratulations ${application.fullName}, you have been shortlisted for the ${application.role} role at Grace Academy.`,
    'Please find your interview details below.',
    interview.date ? `Date: ${interview.date}` : null,
    interview.time ? `Time: ${interview.time}` : null,
    interview.venue ? `Venue: ${interview.venue}` : null,
    'Please reply or contact the school if you need any clarification.',
  ].filter(Boolean).join(' ');

  return Promise.allSettled([
    sendSms({ to: application.phone, message: interviewText }),
    sendEmail({
      to: application.email,
      subject: `Interview invitation for ${application.role} at Grace Academy`,
      message: interviewText,
      html: `<p>${interviewText.replace(/\n/g, '<br />')}</p>`,
    }),
  ]);
}

export function getNotificationConfig() {
  return getCareersConfig();
}
