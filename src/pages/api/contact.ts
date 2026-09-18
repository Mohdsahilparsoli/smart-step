import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

// This route sends mail on the server, so it must not be prerendered as
// static HTML — it needs to run on every request.
export const prerender = false;

const REQUIREMENT_LABELS: Record<string, string> = {
  'residential-buy': 'Residential — Buying',
  'residential-sell': 'Residential — Selling',
  'commercial-buy': 'Commercial — Buying',
  'commercial-sell': 'Commercial — Selling',
  'plot-land': 'Plot / Land',
  other: 'Other'
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const name = String(body.name ?? '').trim();
    const phone = String(body.phone ?? '').trim();
    const email = String(body.email ?? '').trim();
    const requirement = String(body.requirement ?? '').trim();
    const message = String(body.message ?? '').trim();

    // Basic server-side validation — mirrors the required fields in the form.
    if (!name || !phone || !requirement) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Name, phone and property requirement are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_SECURE,
      SMTP_USER,
      SMTP_PASS,
      CONTACT_FROM_EMAIL,
      CONTACT_TO_EMAIL
    } = process.env;

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_TO_EMAIL) {
      console.error('Contact form: missing SMTP configuration in environment variables.');
      return new Response(
        JSON.stringify({ ok: false, error: 'Email is not configured yet on the server.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: SMTP_SECURE === 'true',
      auth: { user: SMTP_USER, pass: SMTP_PASS }
    });

    const requirementLabel = REQUIREMENT_LABELS[requirement] ?? requirement;

    const textBody = [
      'New property enquiry from the Smart Steps Siddhart Vihar website',
      '',
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email || 'Not provided'}`,
      `Requirement: ${requirementLabel}`,
      '',
      'Message:',
      message || '(No message provided)'
    ].join('\n');

    const htmlBody = `
      <h2>New property enquiry — Smart Steps Siddhart Vihar</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email || 'Not provided')}</p>
      <p><strong>Requirement:</strong> ${escapeHtml(requirementLabel)}</p>
      <p><strong>Message:</strong><br>${escapeHtml(message || '(No message provided)').replace(/\n/g, '<br>')}</p>
    `;

    await transporter.sendMail({
      from: CONTACT_FROM_EMAIL || SMTP_USER,
      to: CONTACT_TO_EMAIL,
      replyTo: email || undefined,
      subject: `New property enquiry from ${name}`,
      text: textBody,
      html: htmlBody
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Contact form submission failed:', error);
    return new Response(
      JSON.stringify({ ok: false, error: 'Something went wrong while sending your enquiry.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
