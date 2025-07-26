import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
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
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">고객센터</h4>
            <ul className="space-y-2 text-sm">
              <li>평일 09:00 - 18:00</li>
              <li>support@appweb.co.kr</li>
              <li>02-1234-5678</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm">
              © 2024 파운드마켓. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <Link href="/terms" className="text-sm hover:text-white transition">
                이용약관
              </Link>
              <Link href="/privacy" className="text-sm hover:text-white transition">
                개인정보처리방침
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}