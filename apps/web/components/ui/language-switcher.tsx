'use client'

import { useLocale } from '@/hooks/use-locale'

export function LanguageSwitcher() {
  const { locale, changeLocale } = useLocale()

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => changeLocale('ko')}
        className={`px-3 py-1 rounded-md text-sm ${
          locale === 'ko'
            ? 'bg-primary text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        한국어
      </button>
      <button
        onClick={() => changeLocale('en')}
        className={`px-3 py-1 rounded-md text-sm ${
          locale === 'en'
            ? 'bg-primary text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        English
      </button>
    </div>
  )
}