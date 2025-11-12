import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

// PUT update language (protected)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const data = await request.json();
    const language = await prisma.language.update({
      where: { id },
      data: {
        languageAz: data.languageAz,
        languageRu: data.languageRu,
        languageEn: data.languageEn,
        proficiencyAz: data.proficiencyAz,
        proficiencyRu: data.proficiencyRu,
        proficiencyEn: data.proficiencyEn,
        order: data.order || 0
      }
    });

    return NextResponse.json(language);
  } catch (error) {
    console.error('Error updating language:', error);
    return NextResponse.json(
      { error: 'Failed to update language' },
      { status: 500 }
    );
  }
}

// DELETE language (protected)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await prisma.language.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Language deleted successfully' });
  } catch (error) {
    console.error('Error deleting language:', error);
    return NextResponse.json(
      { error: 'Failed to delete language' },
      { status: 500 }
    );
  }
}
