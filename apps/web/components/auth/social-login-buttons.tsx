'use client'

import { signIn } from 'next-auth/react'

interface SocialLoginButtonsProps {
  mode?: 'login' | 'register'
}

export function SocialLoginButtons({ mode = 'login' }: SocialLoginButtonsProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">
            {mode === 'login' ? '간편 로그인' : '간편 회원가입'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {/* Google */}
        <button
          type="button"
          onClick={() => signIn('google')}
          className="relative w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition"
          aria-label="Google로 로그인"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span className="sr-only">Google</span>
        </button>

        {/* Naver */}
        <button
          type="button"
          onClick={() => signIn('naver')}
          className="relative w-full inline-flex justify-center items-center py-3 px-4 bg-[#03C75A] hover:bg-[#02b351] text-white font-medium rounded-lg shadow-sm transition"
          aria-label="네이버로 로그인"
        >
          <span className="text-white font-bold text-xl">N</span>
          <span className="sr-only">네이버</span>
        </button>

        {/* Kakao */}
        <button
          type="button"
          onClick={() => signIn('kakao')}
          className="relative w-full inline-flex justify-center items-center py-3 px-4 bg-[#FEE500] hover:bg-[#fdd800] rounded-lg shadow-sm transition"
          aria-label="카카오로 로그인"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 3C6.477 3 2 6.404 2 10.5c0 2.727 1.945 5.106 4.839 6.395-.21.863-.805 3.292-.822 3.372-.021.1.038.199.13.247a.263.263 0 00.255.005c.113-.036 2.76-1.873 3.2-2.192.463.067.939.101 1.398.101 5.523 0 10-3.404 10-7.599C22 6.733 17.523 3 12 3z"
              fill="#000000"
            />
          </svg>
          <span className="sr-only">카카오</span>
        </button>
      </div>

      <p className="text-xs text-center text-gray-500">
        소셜 로그인 시 파운드마켓의 
        <a href="/terms" className="text-primary hover:underline mx-1">이용약관</a>
        및
        <a href="/privacy" className="text-primary hover:underline mx-1">개인정보처리방침</a>
        에 동의하게 됩니다.
      </p>
    </div>
  )
}