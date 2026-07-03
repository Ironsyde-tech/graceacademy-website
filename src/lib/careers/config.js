function required(name, fallback = '') {
  return process.env[name] || fallback;
}

function splitList(value) {
  return value
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeFromAddress(value) {
  const raw = String(value || '').trim();
  if (!raw) return '';

  // Allows passing only a local-part prefix like "noreply@".
  if (raw.endsWith('@')) {
    const domain = required('CAREERS_EMAIL_DOMAIN', 'graceacademy.com').trim();
    return `${raw}${domain}`;
  }

  return raw;
}

export function getCareersConfig() {
  const adminEmails = splitList(
    required('CAREERS_ADMIN_EMAILS', required('CAREERS_ADMIN_EMAIL', '')),
  );
  const adminPhones = splitList(
    required('CAREERS_ADMIN_PHONES', required('CAREERS_ADMIN_PHONE', '')),
  );

  return {
    sms: {
      apiUrl: required('SMSONLINEGH_API_URL', 'https://api.smsonlinegh.com/v5/message/sms/send'),
      apiKey: required('SMSONLINEGH_API_KEY', required('SMSONLINEGH_USERNAME', '')),
      username: required('SMSONLINEGH_USERNAME'),
      password: required('SMSONLINEGH_PASSWORD'),
      senderId: required('SMSONLINEGH_SENDER_ID', 'GRACEACAD'),
    },
    email: {
      webhookUrl: required('CAREERS_EMAIL_WEBHOOK_URL'),
      resendApiKey: required('RESEND_API_KEY', required('CAREERS_RESEND_API_KEY', '')),
      from: normalizeFromAddress(required('CAREERS_EMAIL_FROM', 'noreply@graceacademy.com')),
    },
    admin: {
      username: required('CAREERS_ADMIN_USERNAME', 'admin'),
      password: required('CAREERS_ADMIN_PASSWORD', 'change-me'),
      emails: adminEmails,
      phones: adminPhones,
    },
  };
}

export function assertCareersConfig() {
  const config = getCareersConfig();
  const missing = [];

  if (!config.sms.apiUrl) missing.push('SMSONLINEGH_API_URL');
  if (!config.sms.apiKey) missing.push('SMSONLINEGH_API_KEY');
  if (!config.email.resendApiKey && !config.email.webhookUrl) {
    missing.push('RESEND_API_KEY or CAREERS_EMAIL_WEBHOOK_URL');
  }
  if (!config.admin.emails.length) missing.push('CAREERS_ADMIN_EMAILS');
  if (!config.admin.phones.length) missing.push('CAREERS_ADMIN_PHONES');

  if (missing.length && process.env.NODE_ENV === 'production') {
    throw new Error(`Missing careers configuration: ${missing.join(', ')}`);
  }

  return { config, missing };
}