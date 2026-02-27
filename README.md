# Entry Admission

Entry Admission은 EntryDSM 입학 전형 서비스를 위한 Nx 모노레포입니다.
공개 안내 페이지, 원서 제출 플로우, 인증, 관리자 기능을 하나의 저장소에서 관리합니다.

## 저장소 소개

- `entry-user`: 대외 사용자 포털 (랜딩, 공지, FAQ, 성적 산출, 마이페이지)
- `Admission-LTS`: 지원자 원서 작성/제출 플로우 (다단계 입력 + 최종 제출)
- `entry-auth`: 사용자/관리자 인증 및 계정 관련 기능
- `entry-admin`: 관리자 대시보드 (지원자 조회, 일정/공지 관리, 산식, 파일 내보내기)
- `libs/*`: 디자인 토큰, 공통 UI, API/유틸 설정 등 공유 모듈

## 아키텍처 개요

이 저장소는 프론트엔드 중심 구조이며, 백엔드는 외부 API를 통해 연동됩니다.
실제 API 인스턴스와 인터셉터 로직은 `libs/util-config/src/apis/instance.tsx`에 있습니다.

- 모노레포: Nx + Yarn Workspaces
- 프론트엔드: React 18 + Vite + TypeScript
- 스타일링: Emotion
- 데이터 페칭: TanStack Query
- 라우팅: React Router 6 (`react-router-dom`)
- 빌드/CI: Nx 타겟 + GitHub Actions

## 프로젝트 구조

```text
apps/
  entry-user/
  entry-auth/
  entry-admin/
  Admission-LTS/
libs/
  design-token/
  ui/
  util-config/
  hooks/
```

## 업무 흐름 (요약)

지원자 주요 플로우 (`apps/Admission-LTS`):

1. 랜딩 및 상태 확인
2. 성적 입력 (졸업자 / 졸업예정자 / 검정고시 분기)
3. 전형 분류 선택
4. 지원자/보호자/학교 정보 입력
5. 자기소개서/학업계획서 입력
6. 최종 검토 및 제출

관리자 주요 플로우 (`apps/entry-admin`):

1. 지원자 목록/상세 조회
2. 모집 일정 및 공지 관리
3. 산식(계산 관련) 관리
4. 엑셀/수험표/점검표 파일 다운로드

## 환경 변수

루트 `.env` 기준으로 Vite 환경 변수를 사용합니다.

```env
VITE_STATUS_BASE_URL=https://casper-status.entrydsm.hs.kr
VITE_USER_BASE_URL=https://casper-user.entrydsm.hs.kr
VITE_SCHEDULE_BASE_URL=https://casper-schedule.entrydsm.hs.kr
VITE_APPLICATION_BASE_URL=https://casper-application.entrydsm.hs.kr
VITE_BASE_URL=https://api.entrydsm.hs.kr
```

## 개발 환경

- Node.js 20.x
- Yarn 1.x (`.yarn/releases/yarn-1.22.22.cjs`)

## 시작하기

```bash
yarn install
```

앱은 개별적으로 실행합니다.

```bash
yarn nx dev entry-user
yarn nx dev entry-auth
yarn nx dev entry-admin
yarn nx dev admission-lts
```

## 빌드

개별 앱 빌드:

```bash
yarn nx build entry-user
yarn nx build entry-auth
yarn nx build entry-admin
yarn nx build admission-lts
```

전체 앱 빌드:

```bash
yarn build:apps
```

## 린트/타입체크

```bash
yarn nx lint entry-user
yarn nx lint entry-auth
yarn nx lint entry-admin
yarn nx lint admission-lts

yarn nx typecheck entry-user
yarn nx typecheck entry-auth
yarn nx typecheck entry-admin
yarn nx typecheck admission-lts
```

## 테스트

워크스페이스에 Vitest 설정은 포함되어 있으나, 현재 테스트 커버리지는 제한적입니다.

```bash
yarn nx test <project-name>
```

예시:

```bash
yarn nx test entry-user
```

## CI/CD

- PR 빌드 워크플로우: `.github/workflows/pr-build.yml`
  - `entry-user`, `entry-admin`, `entry-auth` 빌드 검증
- 배포 워크플로우: `.github/workflows/no-xquare.yml`
  - `entry-user`, `entry-admin`, `entry-auth`, `admission-lts` 빌드 후 Cloudflare Pages 배포

현재 CI는 Nx 기반 앱 빌드를 검증하고, 배포는 Cloudflare Pages를 사용합니다.

## 핵심 공통 모듈

- API 인스턴스 및 인증/토큰 인터셉터 로직
  - `libs/util-config/src/apis/instance.tsx`
- 공통 UI 컴포넌트 엔트리
  - `libs/ui/src/index.ts`
- 공통 테마/디자인 토큰
  - `libs/design-token/src/theme/*`

## 참고 사항

- 이 저장소에는 백엔드 소스코드가 포함되어 있지 않습니다. 실제 동작은 외부 API 상태에 의존합니다.
- 실행/빌드 타겟의 기준 정보는 Nx 프로젝트 메타데이터입니다.
  - `npx nx show project <project>`
