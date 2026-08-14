/* Canonical URL redirects — load synchronously in <head> (no defer) */
(function () {
  var path = location.pathname;
  var suffix = location.search + location.hash;

  if (location.hostname === 'www.4dsnexus.co.za') {
    location.replace('https://4dsnexus.co.za' + path + suffix);
    return;
  }

  if (/\/index\.html$/i.test(path)) {
    location.replace(path.replace(/\/index\.html$/i, '/') + suffix);
    return;
  }

  if (/\.html$/i.test(path)) {
    location.replace(path.replace(/\.html$/i, '') + suffix);
  }
})();

/* Wi‑Fi / connectivity recovery — must run synchronously in <head> */
(function initConnectivityRecovery() {
  var RELOAD_KEY = '4ds-reload-on-online';
  var startedOffline = !navigator.onLine;
  var reloadScheduled = false;

  function markNeedsReload() {
    try { sessionStorage.setItem(RELOAD_KEY, '1'); } catch (e) {}
  }

  if (startedOffline) markNeedsReload();

  function scheduleReload() {
    if (reloadScheduled || !navigator.onLine) return;
    var shouldReload = false;
    try { shouldReload = sessionStorage.getItem(RELOAD_KEY) === '1'; } catch (e) {}
    if (!shouldReload) return;
    reloadScheduled = true;
    try { sessionStorage.removeItem(RELOAD_KEY); } catch (e) {}
    window.location.reload();
  }

  window.addEventListener('offline', markNeedsReload);
  window.addEventListener('online', scheduleReload);
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') scheduleReload();
  });

  if (startedOffline) {
    var attempts = 0;
    var probe = window.setInterval(function () {
      attempts += 1;
      if (navigator.onLine) {
        window.clearInterval(probe);
        scheduleReload();
      } else if (attempts >= 90) {
        window.clearInterval(probe);
      }
    }, 2000);
  }
})();
