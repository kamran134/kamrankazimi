import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const content = await prisma.heroContent.findFirst();
    
    if (!content) {
      return NextResponse.json(null);
    }
    
    return NextResponse.json(content);
  } catch (error) {
    console.error('Error fetching hero content:', error);
    return NextResponse.json({ error: 'Failed to fetch hero content' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    const content = await prisma.heroContent.findFirst();
    
    if (content) {
      const updated = await prisma.heroContent.update({
        where: { id: content.id },
        data,
      });
      return NextResponse.json(updated);
    } else {
      const created = await prisma.heroContent.create({ data });
      return NextResponse.json(created);
    }
  } catch {
    return NextResponse.json({ error: 'Failed to update hero content' }, { status: 500 });
  }
}
