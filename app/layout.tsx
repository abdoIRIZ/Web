export const metadata = {
  title: 'Tindry - Simple Online File Tools',
  description: 'Convert, merge and compress files online with Tindry. Simple and fast tools for MP4 to MP3, PDF merging, JPG to PDF, PDF to JPG and image compression.',
  metadataBase: new URL('https://www.tindry.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Tindry - Simple Online File Tools',
    description: 'Convert, merge and compress files online with Tindry. Simple and fast tools for MP4 to MP3, PDF merging, JPG to PDF, PDF to JPG and image compression.',
    url: 'https://www.tindry.com/',
    siteName: 'Tindry',
    type: 'website',
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tindry - Simple Online File Tools',
    description: 'Convert, merge and compress files online with Tindry. Simple and fast tools for MP4 to MP3, PDF merging, JPG to PDF, PDF to JPG and image compression.',
    images: ['/opengraph-image'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2471096045634582"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
