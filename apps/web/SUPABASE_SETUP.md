# Supabase OAuth Setup Guide

This guide will help you fix the 404 error after social login and properly configure Supabase OAuth.

## 1. Environment Variables

Add these to your `.env.local` file:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 2. Supabase Dashboard Configuration

### Enable OAuth Providers

1. Go to your Supabase Dashboard
2. Navigate to **Authentication** → **Providers**
3. Enable and configure:
   - **Google**: Add your Google OAuth client ID and secret
   - **Kakao**: Add your Kakao REST API key

### Configure Redirect URLs

1. In Supabase Dashboard, go to **Authentication** → **URL Configuration**
2. Add these to **Redirect URLs**:
   ```
   http://localhost:3000/auth/callback
   https://your-vercel-domain.vercel.app/auth/callback
   https://market.thefounder.co.kr/auth/callback
   ```

### Configure Site URL

1. Set your **Site URL** to:
   - Development: `http://localhost:3000`
   - Production: `https://market.thefounder.co.kr`

## 3. OAuth Provider Setup

### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create or select a project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   ```
   https://your-project.supabase.co/auth/v1/callback
   ```
6. Copy Client ID and Client Secret to Supabase

### Kakao OAuth

1. Go to [Kakao Developers](https://developers.kakao.com/)
2. Create an application
3. In **App Settings** → **Platform**, add:
   - Web: `http://localhost:3000`
   - Web: `https://market.thefounder.co.kr`
4. In **Product Settings** → **Kakao Login**:
   - Enable Kakao Login
   - Add Redirect URI: `https://your-project.supabase.co/auth/v1/callback`
5. Copy REST API Key to Supabase

## 4. Vercel Environment Variables

Add these environment variables in Vercel:

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

## 5. Testing

1. **Local Development**:
   ```bash
   npm run dev
   ```
   - Test login at `http://localhost:3000/auth`
   - Should redirect to `/dashboard` after successful login

2. **Production**:
   - Deploy to Vercel
   - Test at `https://market.thefounder.co.kr/auth`

## Flow Overview

1. User clicks social login button
2. Redirected to OAuth provider (Google/Kakao)
3. After authorization, redirected to `/auth/callback`
4. Callback route exchanges code for session
5. User redirected to `/dashboard` or specified `next` parameter

## Troubleshooting

- **404 Error**: Ensure `/auth/callback/route.ts` exists
- **Invalid Redirect**: Check redirect URLs in Supabase dashboard
- **Session Not Persisting**: Check middleware is refreshing session
- **OAuth Error**: Verify provider credentials in Supabase dashboard