import React from 'react'
import Link from 'next/link'

interface FooterProps {
  className?: string
}

export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={`bg-gray-900 text-gray-300 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">파운드마켓</h3>
            <p className="text-sm">
              국내 최고의 M&A 자산 거래 플랫폼
            </p>
            <p className="text-sm mt-2">
              신뢰할 수 있는 비즈니스 거래의 시작
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">빠른 링크</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/search" className="text-sm hover:text-white transition">
                  자산 검색
                </Link>
              </li>
              <li>
                <Link href="/create-asset" className="text-sm hover:text-white transition">
                  자산 등록
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-sm hover:text-white transition">
                  마이페이지
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm hover:text-white transition">
                  회사 소개
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-4">카테고리</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/search?type=SAAS" className="text-sm hover:text-white transition">
                  SaaS
                </Link>
              </li>
              <li>
                <Link href="/search?type=ECOMMERCE" className="text-sm hover:text-white transition">
                  이커머스
                </Link>
              </li>
              <li>
                <Link href="/search?type=APP" className="text-sm hover:text-white transition">
                  모바일 앱
                </Link>
              </li>
              <li>
                <Link href="/search?type=OTHER" className="text-sm hover:text-white transition">
                  기타
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">고객센터</h4>
            <ul className="space-y-2 text-sm">
              <li>평일 09:00 - 18:00</li>
              <li>
                <a href="mailto:support@appweb.co.kr" className="hover:text-white transition">
                  support@foundmarket.co.kr
                </a>
              </li>
              <li>
                <a href="tel:02-1234-5678" className="hover:text-white transition">
                  02-1234-5678
                </a>
              </li>
            </ul>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm">
              © {currentYear} 파운드마켓. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <Link href="/terms" className="text-sm hover:text-white transition">
                이용약관
              </Link>
              <Link href="/privacy" className="text-sm hover:text-white transition">
                개인정보처리방침
              </Link>
              <Link href="/cookies" className="text-sm hover:text-white transition">
                쿠키정책
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}