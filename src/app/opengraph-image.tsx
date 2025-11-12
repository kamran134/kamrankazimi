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
    
    const imageUrl = about?.imageUrl 
      ? `https://kamrankazimi.dev${about.imageUrl}`
      : null;

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
            fontFamily: 'system-ui',
            padding: '60px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '60px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '30px',
              padding: '60px',
              backdropFilter: 'blur(10px)',
            }}
          >
            {/* Avatar */}
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Avatar"
                width="280"
                height="280"
                style={{
                  borderRadius: '50%',
                  border: '8px solid white',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                }}
              />
            ) : (
              <div
                style={{
                  width: '280px',
                  height: '280px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #9333ea 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '100px',
                  fontWeight: 'bold',
                  color: 'white',
                  border: '8px solid white',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                }}
              >
                KK
              </div>
            )}

            {/* Text Content */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                maxWidth: '650px',
                color: 'white',
              }}
            >
              <h1
                style={{
                  fontSize: '64px',
                  fontWeight: 'bold',
                  margin: 0,
                  lineHeight: 1.1,
                }}
              >
                {about?.titleAz || 'Kamran Kazimi'}
              </h1>
              <p
                style={{
                  fontSize: '32px',
                  margin: 0,
                  opacity: 0.95,
                  fontWeight: '600',
                }}
              >
                Frontend Engineer
              </p>
              <p
                style={{
                  fontSize: '22px',
                  margin: 0,
                  opacity: 0.85,
                  lineHeight: 1.5,
                }}
              >
                {about?.para1Az?.substring(0, 140) || '7+ il əməli təcrübəyə malik Frontend Developer olaraq, miqyaslana bilən, adaptiv və əlçatan veb tətbiqlər qurmaq üzrə ixtisaslaşıram'}...
              </p>
            </div>
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
