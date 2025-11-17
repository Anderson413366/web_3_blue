export default function SimplePage() {
  return (
    <html>
      <head>
        <title>Simple Test</title>
      </head>
      <body style={{
        margin: 0,
        padding: '50px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f0f0f0'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{ color: '#2563eb', marginBottom: '20px' }}>
            ✅ Success! The Server is Working
          </h1>
          <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#374151' }}>
            If you can see this page, your Next.js development server is running correctly.
          </p>
          <p style={{ fontSize: '16px', color: '#6b7280', marginTop: '20px' }}>
            The main page has a React Server Components issue that needs to be resolved.
          </p>
          <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#fef3c7', borderRadius: '5px' }}>
            <strong>Next Steps:</strong>
            <ul>
              <li>The server and routing are working</li>
              <li>The issue is with RSC module resolution</li>
              <li>This needs deeper investigation of the page components</li>
            </ul>
          </div>
        </div>
      </body>
    </html>
  )
}
