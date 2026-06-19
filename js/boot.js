/* 4DS Nexus early page loader (defer in <head>) */
(function bootPageLoader() {
  const src = document.currentScript?.getAttribute('src') || '';
  const base = src.includes('../') ? '../' : '';

  if (!document.querySelector('link[rel="icon"]')) {
    const icon = document.createElement('link');
    icon.rel = 'icon';
    icon.type = 'image/png';
    icon.sizes = '32x32';
    icon.href = `${base}assets/favicon-32.png`;
    document.head.appendChild(icon);
  }

  document.documentElement.classList.add('is-loading');

  const storedTheme = localStorage.getItem('4ds-theme');
  if (storedTheme === 'dark' || storedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', storedTheme);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  function mount() {
    if (document.getElementById('pageLoader')) return;

    const loader = document.createElement('div');
    loader.id = 'pageLoader';
    loader.className = 'page-loader';
    loader.setAttribute('role', 'status');
    loader.setAttribute('aria-live', 'polite');
    loader.setAttribute('aria-label', 'Loading 4DS Nexus');

    loader.innerHTML = `
      <div class="page-loader-inner">
        <div class="page-loader-emblem" aria-hidden="true">
          <svg class="loader-blueprint" viewBox="0 0 80 80" fill="none">
            <rect x="8" y="8" width="64" height="64" rx="4" stroke="currentColor" stroke-width="1" opacity="0.25"/>
            <path class="loader-blueprint-spin" d="M20 20h12M20 20v12M60 20h-12M60 20v12M20 60h12M20 60v-12M60 60h-12M60 60v-12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <circle cx="40" cy="40" r="14" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 6" opacity="0.5" class="loader-blueprint-orbit"/>
          </svg>
        </div>
        <div class="page-loader-bar" aria-hidden="true"><span class="page-loader-bar-fill"></span></div>
        <p class="page-loader-status">Loading…</p>
      </div>`;

    document.body.insertBefore(loader, document.body.firstChild);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => loader.classList.add('is-active'));
    });
  }

  function loadCookieScripts() {
    const loadCookies = () => {
      if (document.querySelector('script[src*="cookies.js"]')) return;
      const cookies = document.createElement('script');
      cookies.src = `${base}js/cookies.js`;
      document.head.appendChild(cookies);
    };

    if (window.__4DS_CONFIG_LOADED) {
      loadCookies();
      return;
    }

    const config = document.createElement('script');
    config.src = `${base}js/config.js`;
    config.onload = loadCookies;
    config.onerror = loadCookies;
    document.head.appendChild(config);
  }

  if (document.body) {
    mount();
    loadCookieScripts();
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      mount();
      loadCookieScripts();
    }, { once: true });
  }
})();
