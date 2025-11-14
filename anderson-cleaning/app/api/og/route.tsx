import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

/**
 * Dynamic Open Graph Image Generation
 *
 * Generates branded OG images for pages
 *
 * Usage:
 * /api/og?title=Page%20Title&description=Page%20description
 *
 * Example:
 * /api/og?title=Office%20Cleaning%20Services&description=Professional%20cleaning
 */

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Get parameters
    const title = searchParams.get('title') || 'Anderson Cleaning'
    const description =
      searchParams.get('description') ||
      'Professional Commercial Cleaning Services in Western MA & CT'
    const type = searchParams.get('type') || 'default' // default, service, industry, blog

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #3b82f6 100%)',
            padding: '80px',
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          {/* Logo/Brand Section */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '16px',
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#1e40af',
              }}
            >
              AC
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                color: 'white',
              }}
            >
              <div
                style={{
                  fontSize: '36px',
                  fontWeight: 'bold',
                  letterSpacing: '-0.02em',
                }}
              >
                Anderson Cleaning
              </div>
              <div
                style={{
                  fontSize: '20px',
                  opacity: 0.9,
                  fontWeight: 500,
                }}
              >
                Professional Commercial Cleaning
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              maxWidth: '900px',
            }}
          >
            <div
              style={{
                fontSize: type === 'blog' ? '64px' : '72px',
                fontWeight: 'bold',
                color: 'white',
                lineHeight: 1.2,
                letterSpacing: '-0.03em',
                textShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
              }}
            >
              {title}
            </div>

            {description && (
              <div
                style={{
                  fontSize: '28px',
                  color: 'rgba(255, 255, 255, 0.95)',
                  lineHeight: 1.4,
                  fontWeight: 400,
                }}
              >
                {description}
              </div>
            )}
          </div>

          {/* Footer Section */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '32px',
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '22px',
                fontWeight: 500,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>📍</span>
                <span>Western MA & CT</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>⭐</span>
                <span>4.8/5 Rating</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>💼</span>
                <span>B2B Only</span>
              </div>
            </div>

            <div
              style={{
                fontSize: '20px',
                color: 'rgba(255, 255, 255, 0.8)',
                fontWeight: 500,
              }}
            >
              andersoncleaning.com
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (error: any) {
    console.error('Error generating OG image:', error)
    return new Response(`Failed to generate image: ${error.message}`, {
      status: 500,
    })
  }
}
