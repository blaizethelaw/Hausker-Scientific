import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.hauskersci.com'),
  title: {
    default: 'Hausker Scientific — Accelerating Your Science',
    template: '%s | Hausker Scientific'
  },
  description: 'Expert laboratory services for preclinical discovery and AAV gene therapy CMC in Greater Philadelphia.',
  openGraph: {
    title: 'Hausker Scientific — Accelerating Your Science',
    description: 'Specialized, flexible, rapid-response lab services for early-stage biotech and academic labs.',
    url: 'https://www.hauskersci.com',
    siteName: 'Hausker Scientific',
    images: [
      { url: '/og.png', width: 1200, height: 630 }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: { card: 'summary_large_image' }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-900 text-white`}>{children}</body>
    </html>
  )
}
