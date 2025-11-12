import { ImageResponse } from 'next/og';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';
export const alt = 'Kamran Kazimi - Frontend Engineer';
export const size = {
  width: 1200,
  height: 1200,
};
export const contentType = 'image/png';

export default async function Image() {
  // Read the image file
  const imagePath = path.join(process.cwd(), 'public', 'og-image.jpg');
  const imageBuffer = fs.readFileSync(imagePath);
  const imageBase64 = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          fontFamily: 'system-ui',
          padding: '80px',
        }}
      >
        {/* Photo on the left */}
        <div
          style={{
            width: '480px',
            height: '480px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '8px solid white',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            display: 'flex',
          }}
        >
          <img
            src={imageBase64}
            alt="Kamran Kazimi"
            width="480"
            height="480"
            style={{
              objectFit: 'cover',
            }}
          />
        </div>

        {/* Text on the right */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            maxWidth: '580px',
            color: 'white',
          }}
        >
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            Kamran Kazimi
          </h1>
          <p
            style={{
              fontSize: '38px',
              margin: 0,
              opacity: 0.95,
              fontWeight: '600',
            }}
          >
            Frontend Engineer
          </p>
          <p
            style={{
              fontSize: '26px',
              margin: 0,
              opacity: 0.85,
              lineHeight: 1.5,
            }}
          >
            7+ years building scalable, responsive, and accessible web applications
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
