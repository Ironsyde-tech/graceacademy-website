import { promises as fs } from 'node:fs';
import path from 'node:path';

const DATA_DIR = path.join(process.cwd(), 'data/careers');
const UPLOAD_DIR = path.join(process.cwd(), 'public/uploads/careers');
const APPLICATIONS_FILE = path.join(DATA_DIR, 'applications.json');

async function ensureStorage() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  try {
    await fs.access(APPLICATIONS_FILE);
  } catch {
    await fs.writeFile(APPLICATIONS_FILE, '[]', 'utf8');
  }
}

export async function readApplications() {
  await ensureStorage();
  const raw = await fs.readFile(APPLICATIONS_FILE, 'utf8');
  return JSON.parse(raw);
}

export async function saveApplications(applications) {
  await fs.writeFile(APPLICATIONS_FILE, JSON.stringify(applications, null, 2), 'utf8');
}

export async function saveResume(file, resumeName) {
  await ensureStorage();
  const resumePath = path.join(UPLOAD_DIR, resumeName);
  const resumeBuffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(resumePath, resumeBuffer);
  return `/uploads/careers/${resumeName}`;
}

export async function upsertApplication(nextApplication) {
  const applications = await readApplications();
  const index = applications.findIndex((application) => application.id === nextApplication.id);

  if (index >= 0) {
    applications[index] = nextApplication;
  } else {
    applications.unshift(nextApplication);
  }

  await saveApplications(applications);
  return nextApplication;
}

export async function addApplicationHistoryEntry(id, entry) {
  return updateApplicationById(id, (application) => ({
    ...application,
    statusHistory: [
      ...(application.statusHistory || []),
      {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        ...entry,
      },
    ],
  }));
}

export async function updateApplicationById(id, updater) {
  const applications = await readApplications();
  const index = applications.findIndex((application) => application.id === id);

  if (index < 0) {
    return null;
  }

  const updatedApplication = updater({ ...applications[index] });
  applications[index] = updatedApplication;
  await saveApplications(applications);
  return updatedApplication;
}

export async function getApplicationById(id) {
  const applications = await readApplications();
  return applications.find((application) => application.id === id) || null;
}