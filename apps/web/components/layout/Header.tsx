'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useSupabase } from '@/providers/supabase-provider'
import { useRouter } from 'next/navigation'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session, status } = useSession()
  const t = useTranslations('header')
  const { supabase, user } = useSupabase()
  const router = useRouter()

  const handleSignOut = async () => {
    if (user && supabase) {
      await supabase.auth.signOut()
      router.push('/')
    } else if (session) {
      await signOut()
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">파운드마켓</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/search" className="text-gray-700 hover:text-primary transition">
              {t('browse')}
            </Link>
            <Link href="/create-asset" className="text-gray-700 hover:text-primary transition">
              {t('sell')}
            </Link>
            <Link href="/profile" className="text-gray-700 hover:text-primary transition">
              {t('myAccount')}
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {status === 'loading' ? (
              <div className="text-gray-400">Loading...</div>
            ) : session || user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-700">{session?.user?.name || user?.email}</span>
                <button
                  onClick={handleSignOut}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  {t('logout')}
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/auth?mode=login"
                  className="text-gray-700 hover:text-primary transition"
                >
                  {t('login')}
                </Link>
                <Link
                  href="/auth?mode=register"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition"
                >
                  {t('signup')}
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
              >
                {t('browse')}
              </Link>
              <Link
                href="/create-asset"
                className="text-gray-700 hover:text-primary transition py-2"
              >
                {t('sell')}
              </Link>
              <Link
                href="/profile"
                className="text-gray-700 hover:text-primary transition py-2"
              >
                {t('myAccount')}
              </Link>
              <div className="pt-3 border-t border-gray-200 space-y-3">
                {session || user ? (
                  <>
                    <div className="text-sm text-gray-700 py-2">{session?.user?.name || user?.email}</div>
                    <button
                      onClick={handleSignOut}
                      className="text-sm text-gray-500 hover:text-gray-700 py-2"
                    >
                      {t('logout')}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth?mode=login"
                      className="block text-center py-2 text-gray-700 hover:text-primary transition"
                    >
                      {t('login')}
                    </Link>
                    <Link
                      href="/auth?mode=register"
                      className="block text-center py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition"
                    >
                      {t('signup')}
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