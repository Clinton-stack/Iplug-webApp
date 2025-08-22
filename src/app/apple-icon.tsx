import { ImageResponse } from 'next/og'
 
// Route segment config
export const runtime = 'edge'
 
// Image metadata
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'
 
// Image generation
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 72,
          background: 'linear-gradient(135deg, #3BA3F5 0%, #197FCF 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '22.5%', // iOS app icon rounded corners
          fontWeight: 'bold',
        }}
      >
        IP
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  )
}
