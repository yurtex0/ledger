const C='ledger-v14',F=['./','index.html','manifest.webmanifest','icon-180.png','icon-192.png','icon-512.png','Vazirmatn.woff2'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(F.map(u=>c.add(new Request(u,{cache:'reload'})).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;
e.respondWith((async()=>{const c=await caches.open(C);try{const ctl=new AbortController(),t=setTimeout(()=>ctl.abort(),4000);const r=await fetch(e.request,{cache:'no-cache',signal:ctl.signal});clearTimeout(t);if(r.ok)c.put(e.request,r.clone());return r}catch(x){return(await c.match(e.request,{ignoreSearch:true}))||(await c.match('index.html'))||Response.error()}})())});
