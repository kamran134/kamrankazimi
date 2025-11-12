import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

// GET all experiences
export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { order: 'asc' }
    });
    return NextResponse.json(experiences);
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return NextResponse.json(
      { error: 'Failed to fetch experiences' },
      { status: 500 }
    );
  }
}

// POST new experience (protected)
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const experience = await prisma.experience.create({
      data: {
        companyAz: data.companyAz,
        companyRu: data.companyRu,
        companyEn: data.companyEn,
        positionAz: data.positionAz,
        positionRu: data.positionRu,
        positionEn: data.positionEn,
        periodAz: data.periodAz,
        periodRu: data.periodRu,
        periodEn: data.periodEn,
        locationAz: data.locationAz,
        locationRu: data.locationRu,
        locationEn: data.locationEn,
        responsibilitiesAz: data.responsibilitiesAz,
        responsibilitiesRu: data.responsibilitiesRu,
        responsibilitiesEn: data.responsibilitiesEn,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        current: data.current || false,
        order: data.order || 0
      }
    });

    return NextResponse.json(experience, { status: 201 });
  } catch (error) {
    console.error('Error creating experience:', error);
    return NextResponse.json(
      { error: 'Failed to create experience' },
      { status: 500 }
    );
  }
}
