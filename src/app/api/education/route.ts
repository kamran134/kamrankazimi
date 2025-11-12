import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

// GET all education
export async function GET() {
  try {
    const education = await prisma.education.findMany({
      orderBy: { order: 'asc' }
    });
    return NextResponse.json(education);
  } catch (error) {
    console.error('Error fetching education:', error);
    return NextResponse.json(
      { error: 'Failed to fetch education' },
      { status: 500 }
    );
  }
}

// POST new education (protected)
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const education = await prisma.education.create({
      data: {
        degreeAz: data.degreeAz,
        degreeRu: data.degreeRu,
        degreeEn: data.degreeEn,
        institutionAz: data.institutionAz,
        institutionRu: data.institutionRu,
        institutionEn: data.institutionEn,
        year: data.year,
        order: data.order || 0
      }
    });

    return NextResponse.json(education, { status: 201 });
  } catch (error) {
    console.error('Error creating education:', error);
    return NextResponse.json(
      { error: 'Failed to create education' },
      { status: 500 }
    );
  }
}
