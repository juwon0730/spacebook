// 스페이스 북 · 오프라인에서도 열리도록 앱 파일만 저장해요 (노트 내용은 저장하지 않아요)
const CACHE='spacebook-1.2';
const SHELL=['./','./index.html','./manifest.webmanifest','./firebase-config.js','./icons/icon-192.png','./icons/icon-512.png','./icons/apple-touch-icon.png','./icons/favicon-32.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const req=e.request;if(req.method!=='GET')return;
  const url=new URL(req.url);
  // 로그인·데이터 요청은 절대 저장하지 않고 그대로 보내요
  if(/googleapis\.com|firebaseio\.com|firebaseapp\.com|accounts\.google\.com|apis\.google\.com/.test(url.host))return;
  // 버전 확인 파일은 항상 최신으로
  if(url.origin===location.origin&&/version\.json$/.test(url.pathname))return;
  if(req.mode==='navigate'){e.respondWith(fetch(req).then(r=>{const cp=r.clone();caches.open(CACHE).then(c=>c.put('./index.html',cp));return r;}).catch(()=>caches.match('./index.html')));return;}
  if(url.origin===location.origin&&/firebase-config\.js$/.test(url.pathname)){e.respondWith(fetch(req).then(r=>{const cp=r.clone();caches.open(CACHE).then(c=>c.put(req,cp));return r;}).catch(()=>caches.match(req)));return;}
  const lib=/cdnjs\.cloudflare\.com|fonts\.(googleapis|gstatic)\.com/.test(url.host)||(url.host==='www.gstatic.com'&&url.pathname.startsWith('/firebasejs/'));
  if(url.origin===location.origin||lib){
    e.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(r=>{if(r&&(r.ok||r.type==='opaque')){const cp=r.clone();caches.open(CACHE).then(c=>c.put(req,cp));}return r;})));
  }
});
