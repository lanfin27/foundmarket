import type { NextAuthConfig } from 'next-auth'
import Google from 'next-auth/providers/google'
import type { Provider } from 'next-auth/providers'

// Custom Kakao Provider
const Kakao: Provider = {
  id: 'kakao',
  name: 'Kakao',
  type: 'oauth',
  authorization: {
    url: 'https://kauth.kakao.com/oauth/authorize',
    params: {
      scope: 'profile_nickname profile_image account_email',
    },
  },
  token: 'https://kauth.kakao.com/oauth/token',
  userinfo: 'https://kapi.kakao.com/v2/user/me',
  profile(profile) {
    return {
      id: String(profile.id),
      name: profile.properties?.nickname ?? profile.kakao_account?.profile?.nickname,
      email: profile.kakao_account?.email,
      image: profile.properties?.profile_image ?? profile.kakao_account?.profile?.profile_image_url,
      role: 'user' as const,
    }
  },
  clientId: process.env.KAKAO_CLIENT_ID!,
  clientSecret: process.env.KAKAO_CLIENT_SECRET!,
}

// Custom Naver Provider
const Naver: Provider = {
  id: 'naver',
  name: 'Naver',
  type: 'oauth',
  authorization: 'https://nid.naver.com/oauth2.0/authorize',
  token: 'https://nid.naver.com/oauth2.0/token',
  userinfo: 'https://openapi.naver.com/v1/nid/me',
  profile(profile) {
    return {
      id: profile.response.id,
      name: profile.response.name ?? profile.response.nickname,
      email: profile.response.email,
      image: profile.response.profile_image,
      role: 'user' as const,
    }
  },
  clientId: process.env.NAVER_CLIENT_ID!,
  clientSecret: process.env.NAVER_CLIENT_SECRET!,
}

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Kakao,
    Naver,
  ],
  pages: {
    signIn: '/auth',
    error: '/auth',
  },
  callbacks: {
    async jwt({ token, account, profile, user }) {
      if (account && profile) {
        token.provider = account.provider
        token.providerId = account.providerAccountId
      }
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.provider = token.provider as string
        session.user.providerId = token.providerId as string
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Redirect to profile after sign in
      if (url === baseUrl || url === `${baseUrl}/`) {
        return `${baseUrl}/profile`
      }
      // Ensure redirects stay within the same origin
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`
      }
      // Allow redirects to the same host
      const urlObj = new URL(url)
      const baseUrlObj = new URL(baseUrl)
      if (urlObj.hostname === baseUrlObj.hostname) {
        return url
      }
      return baseUrl
    },
  },
  session: {
    strategy: 'jwt',
  },
} satisfies NextAuthConfig