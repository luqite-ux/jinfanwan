import type { Metadata, Viewport } from 'next'
import { Inter, Sora } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { company } from '@/lib/site-data'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const sora = Sora({ subsets: ['latin'], variable: '--font-sora' })

export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  title: 'JINFANWAN | Food Storage Container Manufacturer',
  description:
    'Suzhou Golden Rice Bowl New Material Technology Co., Ltd. manufactures high borosilicate glass food containers, plastic food containers, silicone glass lids, and OEM/ODM food storage container solutions for global B2B buyers.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'JINFANWAN | Food Storage Container Manufacturer',
    description:
      'Plastic food containers and coordinated plastic, tempered-glass, and silicone lid structures for global B2B sourcing programs.',
    type: 'website',
    locale: 'en_US',
    url: company.siteUrl,
    siteName: 'JINFANWAN',
    images: [{ url: '/images/products/product-showcase-04.png', alt: 'JINFANWAN food storage container range' }],
  },
  icons: {
    icon: [
      {
        url: '/favicon.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/favicon.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/favicon.png',
        type: 'image/png',
      },
    ],
    apple: '/favicon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.name,
    url: company.siteUrl,
    logo: `${company.siteUrl}${company.logo}`,
    email: company.email,
    telephone: company.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address,
      addressCountry: 'CN',
    },
  }

  return (
    <html lang="en" className={`bg-background ${inter.variable} ${sora.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {process.env.NODE_ENV === 'production' && <Analytics />}
        {process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_TENANT_ID && (
          <script
            async
            src={`https://admin.globle-trade.com/api/public/analytics.js?tenantId=${encodeURIComponent(process.env.NEXT_PUBLIC_TENANT_ID)}`}
          />
        )}
      </body>
    </html>
  )
}
