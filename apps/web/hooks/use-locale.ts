'use client'

import { useState, useEffect } from 'react'

export function useLocale() {
  const [locale, setLocale] = useState('ko')

  useEffect(() => {
    // Get locale from localStorage or browser language
    const savedLocale = localStorage.getItem('locale')
    if (savedLocale && ['ko', 'en'].includes(savedLocale)) {
      setLocale(savedLocale)
    } else {
      const browserLang = navigator.language.split('-')[0]
      setLocale(browserLang === 'ko' ? 'ko' : 'en')
    }
  }, [])

  const changeLocale = (newLocale: 'ko' | 'en') => {
    setLocale(newLocale)
    localStorage.setItem('locale', newLocale)
    // Reload to apply new locale
    window.location.reload()
  }

  return { locale, changeLocale }
}