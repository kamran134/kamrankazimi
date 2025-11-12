import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

// GET all languages
export async function GET() {
  try {
    const languages = await prisma.language.findMany({
      orderBy: { order: 'asc' }
    });
    return NextResponse.json(languages);
  } catch (error) {
    console.error('Error fetching languages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch languages' },
      { status: 500 }
    );
  }
}

// POST new language (protected)
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const language = await prisma.language.create({
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

    return NextResponse.json(language, { status: 201 });
  } catch (error) {
    console.error('Error creating language:', error);
    return NextResponse.json(
      { error: 'Failed to create language' },
      { status: 500 }
    );
  }
}
