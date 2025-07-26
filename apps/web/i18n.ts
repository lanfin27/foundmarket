import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async () => {
  // You can read the locale from headers, cookies, or your authentication system
  const locale = 'ko' // Default to Korean
  
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  }
})