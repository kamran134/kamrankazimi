import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const contact = await prisma.contactInfo.findFirst();
    return NextResponse.json(contact || {});
  } catch {
    return NextResponse.json({ error: 'Failed to fetch contact info' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    const contact = await prisma.contactInfo.findFirst();
    
    if (contact) {
      const updated = await prisma.contactInfo.update({
        where: { id: contact.id },
        data,
      });
      return NextResponse.json(updated);
    } else {
      const created = await prisma.contactInfo.create({ data });
      return NextResponse.json(created);
    }
  } catch {
    return NextResponse.json({ error: 'Failed to update contact info' }, { status: 500 });
  }
}
