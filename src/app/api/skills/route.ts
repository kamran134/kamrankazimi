import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(skills);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    const skill = await prisma.skill.create({ data });
    return NextResponse.json(skill);
  } catch {
    return NextResponse.json({ error: 'Failed to create skill' }, { status: 500 });
  }
}
