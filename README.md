# Influencer Rate Card

[@kimwood.zip](https://www.instagram.com/kimwood.zip/) 계정 소개, 광고 단가 공개, 광고비 계산기 페이지입니다.

- React 19 + Vite 8 + Swiper 14
- Node.js 24 LTS

## 개발

```bash
npm install
npm run dev
```

| 명령 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 |
| `npm run build` | 배포용 빌드 (`dist/`) |
| `npm run lint` | oxlint 검사 |
| `npm run format` | Prettier 포맷 |

## 폴더 구조

```
src/
├─ data/          내용(계정 정보 · 인사이트 수치 · 단가)
├─ lib/           계산 로직(지표 계산 · 광고비 계산)
├─ components/    화면
│  ├─ sections/   섹션별 컴포넌트
│  └─ calculator/ 광고비 계산기
└─ styles/        영역별 CSS
```

## 내용 수정

| 수정할 내용 | 파일 |
| --- | --- |
| 계정 소개 · 타깃 · 첫 화면 사진 · 진행 절차 · 문의처 | `src/data/profile.js` |
| 인스타그램 인사이트 수치 (최근 릴스 · 계정 전체 90일 · 홍보 콘텐츠) | `src/data/insights.js` |
| 광고 상품 · 단가 · 유지 기간 · 추가 옵션 · 진행 조건 | `src/data/pricing.js` |
| 지표 계산 규칙 (평균 · 중앙값 · 참여율) | `src/lib/insights.js` |
| 광고비 계산 규칙 | `src/lib/estimate.js` |

`insights.js`의 숫자만 바꾸면 지표 카드, 콘텐츠 강점, 단가 산정 근거 문구가 모두 다시 계산됩니다.
단가는 `min`과 `max`를 다르게 두면 범위 단가로 표시되고, 계산기도 범위로 계산합니다.

## 첫 화면 사진

`public/home/01~05.jpg` — 화면에 보이는 정사각형(800×800)으로 미리 잘라 둔 파일입니다.
사진을 바꿀 때는 같은 이름으로 넣고, 설명(alt)은 `src/data/profile.js`의 `homePhotos`에서 수정합니다.

## 배포 (GitHub Pages)

`main` 브랜치에 푸시하면 `.github/workflows/deploy.yml`이 빌드 후 GitHub Pages로 배포합니다.

1. GitHub 레포 → Settings → Pages → Source를 **GitHub Actions**로 설정
2. `main`에 푸시
3. https://ire4564.github.io/influencer-rate-card/ 에서 확인

레포 이름을 바꾸면 `vite.config.js`의 `base`도 함께 바꿔야 합니다.
