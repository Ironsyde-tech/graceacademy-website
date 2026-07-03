import { NextResponse } from 'next/server';
import { notifyShortlistedApplicant } from '@/lib/careers/notifications';
import { addApplicationHistoryEntry, getApplicationById, readApplications, updateApplicationById } from '@/lib/careers/store';

function isAuthed(request) {
  return request.cookies.get('careers_admin_session')?.value === 'authenticated';
}

export async function GET(request) {
  if (!isAuthed(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const applications = await readApplications();
  return NextResponse.json({ applications });
}

export async function PATCH(request) {
  if (!isAuthed(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { id, status, interviewDate, interviewTime, interviewVenue } = body;

  if (!id || !status) {
    return NextResponse.json({ error: 'Missing application id or status.' }, { status: 400 });
  }

  const existingApplication = await getApplicationById(id);
  if (!existingApplication) {
    return NextResponse.json({ error: 'Application not found.' }, { status: 404 });
  }

  const updatedApplication = await updateApplicationById(id, (application) => ({
    ...application,
    status,
    interviewDate: interviewDate || application.interviewDate || '',
    interviewTime: interviewTime || application.interviewTime || '',
    interviewVenue: interviewVenue || application.interviewVenue || '',
    updatedAt: new Date().toISOString(),
  }));

  await addApplicationHistoryEntry(id, {
    status,
    note:
      status === 'shortlisted'
        ? 'Candidate shortlisted and interview details recorded.'
        : status === 'rejected'
          ? 'Candidate rejected by admin.'
          : 'Application reviewed by admin.',
  });

  const applicationWithHistory = await getApplicationById(id);

  if (status === 'shortlisted') {
    await notifyShortlistedApplicant(applicationWithHistory, {
      date: applicationWithHistory.interviewDate,
      time: applicationWithHistory.interviewTime,
      venue: applicationWithHistory.interviewVenue,
    });
  }

  return NextResponse.json({ ok: true, application: applicationWithHistory });
}