import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

// PUT update experience (protected)
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const experience = await prisma.experience.update({
      where: { id: params.id },
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

    return NextResponse.json(experience);
  } catch (error) {
    console.error('Error updating experience:', error);
    return NextResponse.json(
      { error: 'Failed to update experience' },
      { status: 500 }
    );
  }
}

// DELETE experience (protected)
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.experience.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: 'Experience deleted successfully' });
  } catch (error) {
    console.error('Error deleting experience:', error);
    return NextResponse.json(
      { error: 'Failed to delete experience' },
      { status: 500 }
    );
  }
}
