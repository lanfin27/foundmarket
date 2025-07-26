# 파운드마켓 Vercel 배포 가이드

## 🚀 배포 준비 체크리스트

### 1. 환경 변수 설정
Vercel 대시보드에서 다음 환경 변수를 설정하세요:

```env
# Database
DATABASE_URL="your-production-database-url"

# NextAuth
NEXTAUTH_URL="https://market.thefounder.co.kr"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# OAuth - Google
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# OAuth - Kakao
KAKAO_CLIENT_ID="your-kakao-client-id"
KAKAO_CLIENT_SECRET="your-kakao-client-secret"

# OAuth - Naver
NAVER_CLIENT_ID="your-naver-client-id"
NAVER_CLIENT_SECRET="your-naver-client-secret"
```

### 2. OAuth 리다이렉트 URL 업데이트
각 OAuth 제공자 대시보드에서 리다이렉트 URL을 업데이트하세요:

- **Google**: `https://market.thefounder.co.kr/api/auth/callback/google`
- **Kakao**: `https://market.thefounder.co.kr/api/auth/callback/kakao`
- **Naver**: `https://market.thefounder.co.kr/api/auth/callback/naver`

### 3. Vercel 프로젝트 설정

1. Vercel에 GitHub 저장소 연결
2. 프로젝트 설정:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (monorepo root)
   - **Build Command**: `npm run build:web`
   - **Output Directory**: `apps/web/.next`
   - **Install Command**: `npm install`

### 4. 커스텀 도메인 설정

1. Vercel 프로젝트 Settings > Domains
2. `market.thefounder.co.kr` 추가
3. DNS 설정:
   - Type: CNAME
   - Name: market
   - Value: cname.vercel-dns.com

### 5. 데이터베이스 마이그레이션

프로덕션 데이터베이스에 스키마 적용:
```bash
DATABASE_URL="your-production-db-url" npm run db:push -w @appweb/database
```

### 6. 배포

```bash
git push origin main
```

Vercel이 자동으로 빌드하고 배포합니다.

## 🔍 배포 후 확인사항

1. [ ] 홈페이지 접속 확인
2. [ ] OAuth 로그인 테스트 (Google, Kakao, Naver)
3. [ ] 자산 검색/등록 기능 확인
4. [ ] 모바일 반응형 확인
5. [ ] HTTPS 인증서 확인

## 🛠 트러블슈팅

### Prisma Client 에러
- Vercel 빌드 설정에서 `prisma generate` 포함 확인
- postinstall 스크립트 확인

### OAuth 로그인 실패
- 환경 변수 확인
- OAuth 제공자 리다이렉트 URL 확인
- NEXTAUTH_URL이 올바른지 확인

### 빌드 실패
- Node.js 버전 확인 (18.x 이상)
- 종속성 설치 확인
- 타입스크립트 에러 확인