import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { currentPassword, newEmail, newPassword } = body;

    if (!currentPassword) {
      return NextResponse.json({ error: 'Current password is required' }, { status: 400 });
    }

    // Find admin user
    const admin = await prisma.admin.findUnique({
      where: { email: session.user.email },
    });

    if (!admin) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, admin.password);
    
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Current password is incorrect' }, { status: 401 });
    }

    // Prepare update data
    const updateData: {
      email?: string;
      password?: string;
      updatedAt: Date;
    } = {
      updatedAt: new Date(),
    };

    // Update email if provided and different
    if (newEmail && newEmail !== session.user.email) {
      // Check if email already exists
      const existingUser = await prisma.admin.findUnique({
        where: { email: newEmail },
      });

      if (existingUser && existingUser.id !== admin.id) {
        return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
      }

      updateData.email = newEmail;
    }

    // Update password if provided
    if (newPassword) {
      if (newPassword.length < 6) {
        return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      updateData.password = hashedPassword;
    }

    // Update admin
    await prisma.admin.update({
      where: { id: admin.id },
      data: updateData,
    });

    return NextResponse.json({ 
      success: true,
      message: 'Credentials updated successfully'
    });
  } catch (error) {
    console.error('Error updating credentials:', error);
    return NextResponse.json({ error: 'Failed to update credentials' }, { status: 500 });
  }
}
