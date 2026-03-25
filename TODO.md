# TODO / 향후 작업 리스트

## 🔴 High Priority

- [ ] **WeatherBackground 이미지 로컬화**: `WeatherBackground.tsx`에서 `lh3.googleusercontent.com` 외부 URL로 배경 이미지를 불러오는 중 → 로딩 느림
  - SVG 애니메이션 또는 CSS gradient로 대체 검토
  - 또는 이미지를 로컬 `/public/assets/` 에 다운로드하여 사용
  - 현재 7개 날씨 상태 × 2 테마(라이트/다크) = 14개 이미지 URL

## 🟡 Medium Priority

- [ ] **날씨 API 연동**: `Dashboard.tsx`의 `currentCondition` mock 상태를 실제 날씨 API 데이터로 교체
- [ ] **SettingsPage 리팩토링**: 현재 커스텀 CSS 클래스(`settings-list`, `page-container`) 사용 중 → Tailwind 시맨틱 토큰으로 통일

## 🟢 Low Priority

- [ ] **Sidebar 프로필 이미지**: googleusercontent URL → 로컬 에셋 또는 API로 교체
- [ ] **OOTD/Chat 프로필 이미지**: `pravatar.cc` 외부 서비스 의존 → 로컬 에셋으로 교체
