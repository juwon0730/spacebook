// ─────────────────────────────────────────────────────────────
// 스페이스 북 · Firebase 연결 정보
// Firebase 콘솔 → 프로젝트 설정(톱니바퀴) → 일반 → 내 앱(웹 앱)의
// "SDK 설정 및 구성"에 나오는 firebaseConfig 값을 아래에 붙여넣으세요.
// 이 값들은 웹 앱에 원래 공개되는 정보예요. 보안은 Firestore 보안 규칙이 지켜줘요.
// 비워두면(null) 로그인 없이 각 기기에만 저장되는 방식으로 동작해요.
// ─────────────────────────────────────────────────────────────
window.FIREBASE_CONFIG = null;
/* 예시
window.FIREBASE_CONFIG = {
  apiKey: "AIza...",
  authDomain: "spacebook-xxxx.firebaseapp.com",
  projectId: "spacebook-xxxx",
  storageBucket: "spacebook-xxxx.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef"
};
*/
