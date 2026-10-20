/* Playground service worker: push reminders */
self.addEventListener("install",()=>self.skipWaiting());
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("push",e=>{let d={};try{d=e.data?e.data.json():{}}catch(_){d={body:e.data&&e.data.text()}}
  e.waitUntil(self.registration.showNotification(d.title||"פלייגראונד",{body:d.body||"",icon:"icon-192.png",badge:"icon-192.png",dir:"rtl",lang:"he",tag:d.tag||"pg",data:{url:d.url||"./"}}))});
self.addEventListener("notificationclick",e=>{e.notification.close();const url=new URL(e.notification.data&&e.notification.data.url||"./",self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({type:"window",includeUncontrolled:true}).then(cs=>{for(const c of cs){if(c.url.startsWith(self.registration.scope)){if(url.includes("?")&&"navigate" in c)return c.navigate(url).then(x=>(x||c).focus()).catch(()=>c.focus());return c.focus()}}return self.clients.openWindow(url)}))});
