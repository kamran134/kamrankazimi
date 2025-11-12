import { ImageResponse } from 'next/og';
import { prisma } from '@/lib/prisma';

export const runtime = 'edge';
export const alt = 'Kamran Kazimi - Frontend Engineer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  try {
    // Fetch about content with avatar
    const about = await prisma.aboutContent.findFirst();
    
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontFamily: 'system-ui',
          }}
        >
          {about?.imageUrl && (
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://kamrankazimi.dev'}${about.imageUrl}`}
              alt="Avatar"
              width="200"
              height="200"
              style={{
                borderRadius: '50%',
                border: '6px solid white',
                marginBottom: '40px',
              }}
            />
          )}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: 'white',
            }}
          >
            <h1
              style={{
                fontSize: '60px',
                fontWeight: 'bold',
                margin: '0 0 20px 0',
                textAlign: 'center',
              }}
            >
              Kamran Kazimi
            </h1>
            <p
              style={{
                fontSize: '32px',
                margin: 0,
                opacity: 0.9,
              }}
            >
              Frontend Engineer
            </p>
          </div>
        </div>
      ),
      {
        ...size,
      }
    );
  } catch (error) {
    console.error('OG Image generation error:', error);
    // Fallback image
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            fontSize: '60px',
            fontWeight: 'bold',
          }}
        >
          Kamran Kazimi - Frontend Engineer
        </div>
      ),
      { ...size }
    );
  }
}
