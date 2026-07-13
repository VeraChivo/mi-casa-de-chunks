/* 最小 service worker：只負責讓網站可安裝到主畫面＋顯示通知，不做任何快取 */
self.addEventListener('install', (e) => { self.skipWaiting(); });
self.addEventListener('activate', (e) => { e.waitUntil(self.clients.claim()); });

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const action = (e.notification.data && e.notification.data.action) || '';
  const targetUrl = action ? `./?action=${action}` : './';
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (action && 'navigate' in client) {
          return client.navigate(targetUrl).then(c => c.focus()).catch(() => client.focus());
        }
        if ('focus' in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow(targetUrl);
    })
  );
});
