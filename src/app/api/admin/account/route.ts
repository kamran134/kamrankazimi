import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { currentPassword, newPassword, newEmail } = body as { currentPassword?: string; newPassword?: string; newEmail?: string };

    if (!currentPassword) {
      return NextResponse.json({ error: 'Current password is required' }, { status: 400 });
    }

    // Find admin by session user email
    const admin = await prisma.admin.findUnique({ where: { email: session.user?.email as string } });
    if (!admin) {
      return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
    }

    // Verify current password
    const passwordMatches = await bcrypt.compare(currentPassword, admin.password);
    if (!passwordMatches) {
      return NextResponse.json({ error: 'Current password is incorrect' }, { status: 403 });
    }

  const updates: { email?: string; password?: string } = {};

    if (newPassword) {
      if (newPassword.length < 8) {
        return NextResponse.json({ error: 'New password must be at least 8 characters' }, { status: 400 });
      }
      const hashed = await bcrypt.hash(newPassword, 10);
      updates.password = hashed;
    }

    if (newEmail) {
      // Check if new email already exists
      const existing = await prisma.admin.findUnique({ where: { email: newEmail } });
      if (existing && existing.id !== admin.id) {
        return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
      }
      updates.email = newEmail;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'Nothing to update' }, { status: 400 });
    }

    const updated = await prisma.admin.update({ where: { id: admin.id }, data: updates });

    // If email changed, consider logging out sessions or updating session — here we just return success
    return NextResponse.json({ success: true, email: updated.email });
  } catch (error) {
    console.error('Admin account update error:', error);
    return NextResponse.json({ error: 'Failed to update account' }, { status: 500 });
  }
}
