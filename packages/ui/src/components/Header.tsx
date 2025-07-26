'use client'

import React, { useState } from 'react'
import Link from 'next/link'

interface HeaderProps {
  className?: string
  user?: {
    name: string
    role: string
  } | null
}

export const Header: React.FC<HeaderProps> = ({ className = '', user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className={`sticky top-0 z-50 bg-white border-b border-gray-200 ${className}`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">파운드마켓</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/search" className="text-gray-700 hover:text-primary transition">
              자산 검색
            </Link>
            <Link href="/create-asset" className="text-gray-700 hover:text-primary transition">
              자산 등록
            </Link>
            <Link href="/profile" className="text-gray-700 hover:text-primary transition">
              내 프로필
            </Link>
            {user?.role === 'ADMIN' && (
              <Link href="/admin" className="text-gray-700 hover:text-primary transition">
                관리자
              </Link>
            )}
          </div>

          {/* Desktop Auth/User */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-700">{user.name}님</span>
                <button className="text-sm text-gray-500 hover:text-gray-700">
                  로그아웃
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/auth?mode=login"
                  className="text-gray-700 hover:text-primary transition"
                >
                  로그인
                </Link>
                <Link
                  href="/auth?mode=register"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition"
                >
                  회원가입
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
            aria-label="메뉴"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              <Link
                href="/search"
                className="text-gray-700 hover:text-primary transition py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                자산 검색
              </Link>
              <Link
                href="/create-asset"
                className="text-gray-700 hover:text-primary transition py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                자산 등록
              </Link>
              <Link
                href="/profile"
                className="text-gray-700 hover:text-primary transition py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                내 프로필
              </Link>
              {user?.role === 'ADMIN' && (
                <Link
                  href="/admin"
                  className="text-gray-700 hover:text-primary transition py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  관리자
                </Link>
              )}
              <div className="pt-3 border-t border-gray-200 space-y-3">
                {user ? (
                  <>
                    <div className="text-sm text-gray-700 py-2">{user.name}님</div>
                    <button className="text-sm text-gray-500 hover:text-gray-700 py-2">
                      로그아웃
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth?mode=login"
                      className="block text-center py-2 text-gray-700 hover:text-primary transition"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      로그인
                    </Link>
                    <Link
                      href="/auth?mode=register"
                      className="block text-center py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      회원가입
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}