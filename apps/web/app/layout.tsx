import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { getMessages } from 'next-intl/server'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { AuthProvider } from '@/providers/auth-provider'
import { IntlProvider } from '@/providers/intl-provider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: '파운드마켓 - 원클릭 매물 등록, 국세청 재무연동으로 더 믿을 수 있게',
    template: '%s | 파운드마켓',
  },
  description: '클릭 한 번으로 매물 등록, 자동으로 불러오는 재무정보로 거래의 신뢰를 높였습니다.',
  keywords: ['M&A', '자산 거래', '비즈니스 매매', 'SaaS', '이커머스', '국세청 연동', '재무정보'],
  authors: [{ name: '파운드마켓' }],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://market.thefounder.co.kr',
    siteName: '파운드마켓',
    title: '파운드마켓 - 원클릭 매물 등록, 국세청 재무연동으로 더 믿을 수 있게',
    description: '클릭 한 번으로 매물 등록, 자동으로 불러오는 재무정보로 거래의 신뢰를 높였습니다.',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = 'ko' // Default to Korean
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <IntlProvider messages={messages} locale={locale}>
          <AuthProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </AuthProvider>
        </IntlProvider>
      </body>
    </html>
  )
}
