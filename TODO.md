# TODO / 향후 작업 리스트

## 🔴 High Priority

- [x] **WeatherBackground 앰비언트 그라디언트 개선**: `WeatherBackground.tsx`의 외부 Google 이미지 URL 제거 ➔ 0ms 로딩의 모던 CSS Ambient Gradient & Glow 이펙트로 대체 완료

## 🟡 Medium Priority

- [x] **날씨 API 연동**: `Dashboard.tsx`의 `currentCondition` mock 상태를 실제 날씨 API 데이터로 교체
- [ ] **SettingsPage 리팩토링**: 현재 커스텀 CSS 클래스(`settings-list`, `page-container`) 사용 중 → Tailwind 시맨틱 토큰으로 통일

## 🟢 Low Priority

- [ ] **Sidebar 프로필 이미지**: googleusercontent URL → 로컬 에셋 또는 API로 교체
- [ ] **OOTD/Chat 프로필 이미지**: `pravatar.cc` 외부 서비스 의존 → 로컬 에셋으로 교체
