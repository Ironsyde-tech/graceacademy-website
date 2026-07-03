import { NextResponse } from 'next/server';
import { notifyNewApplication } from '@/lib/careers/notifications';
import { saveResume, upsertApplication } from '@/lib/careers/store';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const fullName = String(formData.get('fullName') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const role = String(formData.get('role') || '').trim();
    const experience = String(formData.get('experience') || '').trim();
    const coverLetter = String(formData.get('coverLetter') || '').trim();
    const resume = formData.get('resume');

    if (!fullName || !email || !phone || !role || !resume || typeof resume === 'string') {
      return NextResponse.json({ error: 'Missing required application fields.' }, { status: 400 });
    }

    const resumeName = `${Date.now()}-${resume.name}`.replace(/[^a-zA-Z0-9._-]/g, '_');
    const resumePath = await saveResume(resume, resumeName);

    const application = {
      id: crypto.randomUUID(),
      fullName,
      email,
      phone,
      role,
      experience,
      coverLetter,
      resumePath: `/uploads/careers/${resumeName}`,
      status: 'submitted',
      statusHistory: [
        {
          id: crypto.randomUUID(),
          status: 'submitted',
          note: 'Application received.',
          createdAt: new Date().toISOString(),
        },
      ],
      createdAt: new Date().toISOString(),
    };

    await upsertApplication(application);
    await notifyNewApplication(application);

    return NextResponse.json({ ok: true, applicationId: application.id, message: 'Application received.' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit application.' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}