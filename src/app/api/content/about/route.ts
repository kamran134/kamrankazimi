import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const content = await prisma.aboutContent.findFirst();
    
    if (!content) {
      return NextResponse.json(null);
    }
    
    return NextResponse.json(content);
  } catch (error) {
    console.error('Error fetching about content:', error);
    return NextResponse.json({ error: 'Failed to fetch about content' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    const content = await prisma.aboutContent.findFirst();
    
    if (content) {
      const updated = await prisma.aboutContent.update({
        where: { id: content.id },
        data,
      });
      return NextResponse.json(updated);
    } else {
      const created = await prisma.aboutContent.create({ data });
      return NextResponse.json(created);
    }
  } catch {
    return NextResponse.json({ error: 'Failed to update about content' }, { status: 500 });
  }
}
