import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail, createContactEmailHTML } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Save to database
    const contactMessage = await prisma.contactMessage.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject?.trim() || '',
        message: message.trim(),
      },
    });

    // Send email notification
    const emailHTML = createContactEmailHTML({
      name,
      email,
      subject,
      message,
    });

    // Send to admin email
    await sendEmail({
      to: process.env.ADMIN_EMAIL || 'kazimi.dev@gmail.com',
      subject: `New Contact Message${subject ? ': ' + subject : ''} from ${name}`,
      html: emailHTML,
    });

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
      id: contactMessage.id,
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
