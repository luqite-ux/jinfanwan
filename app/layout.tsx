import type { Metadata, Viewport } from 'next'
import { Inter, Sora } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const sora = Sora({ subsets: ['latin'], variable: '--font-sora' })

export const metadata: Metadata = {
  title: 'JINFANWAN | Premium Food Storage Container Manufacturer',
  description:
    'Suzhou Golden Rice Bowl New Material Technology Co., Ltd. manufactures high borosilicate glass food containers, plastic food containers, silicone glass lids, and OEM/ODM food storage container solutions for global B2B buyers.',
  generator: 'v0.app',
  openGraph: {
    title: 'JINFANWAN | Premium Food Storage Container Manufacturer',
    description:
      'High borosilicate glass, plastic, and silicone-lid food storage container manufacturing for global B2B buyers. OEM/ODM programs, export-ready production.',
    type: 'website',
    locale: 'en_US',
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
  return (
    <html lang="en" className={`bg-background ${inter.variable} ${sora.variable}`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
