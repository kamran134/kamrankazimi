import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

// GET site settings
export async function GET() {
  try {
    const settings = await prisma.siteSettings.findFirst();
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch site settings' },
      { status: 500 }
    );
  }
}

// PUT update site settings (protected)
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    
    // Get existing settings or create new one
    const existingSettings = await prisma.siteSettings.findFirst();
    
    let settings;
    if (existingSettings) {
      settings = await prisma.siteSettings.update({
        where: { id: existingSettings.id },
        data: {
          copyrightYear: data.copyrightYear,
          footerTextAz: data.footerTextAz || '',
          footerTextRu: data.footerTextRu || '',
          footerTextEn: data.footerTextEn || ''
        }
      });
    } else {
      settings = await prisma.siteSettings.create({
        data: {
          copyrightYear: data.copyrightYear,
          footerTextAz: data.footerTextAz || '',
          footerTextRu: data.footerTextRu || '',
          footerTextEn: data.footerTextEn || ''
        }
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error updating site settings:', error);
    return NextResponse.json(
      { error: 'Failed to update site settings' },
      { status: 500 }
    );
  }
}
