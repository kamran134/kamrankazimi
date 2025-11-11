import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: [{ featured: 'desc' }, { order: 'asc' }],
    });
    return NextResponse.json(projects);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    const project = await prisma.project.create({ data });
    return NextResponse.json(project);
  } catch {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
