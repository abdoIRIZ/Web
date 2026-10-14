import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Tindry - 100% Private File Tools';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
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
          backgroundColor: '#000',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #333',
            borderRadius: 16,
            padding: 30,
            backgroundColor: '#111',
            width: 900,
          }}
        >
          <div style={{ fontSize: 24, color: '#888' }}>app.tindry.com/convert</div>
          <div
            style={{
              fontSize: 36,
              color: 'white',
              fontWeight: 700,
              marginTop: 15,
            }}
          >
            File Converter - 100% Private
          </div>
          <div style={{ display: 'flex', gap: 15, marginTop: 20 }}>
            <div
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                backgroundColor: '#222',
                color: '#fff',
                fontSize: 16,
                border: '1px solid #333',
              }}
            >
              MP4 to MP3
            </div>
            <div
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                backgroundColor: '#222',
                color: '#fff',
                fontSize: 16,
                border: '1px solid #333',
              }}
            >
              PDF Tools
            </div>
            <div
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                backgroundColor: '#222',
                color: '#fff',
                fontSize: 16,
                border: '1px solid #333',
              }}
            >
              Image Tools
            </div>
            <div
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                backgroundColor: '#222',
                color: '#fff',
                fontSize: 16,
                border: '1px solid #333',
              }}
            >
              Video Tools
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
