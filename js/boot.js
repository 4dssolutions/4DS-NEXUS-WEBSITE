/* 4DS Nexus — early loader, theme + fonts (defer in <head>) */
(function bootEarly() {
  const asset = (path) => (path.startsWith('/') ? path : `/${path}`);

  const storedTheme = localStorage.getItem('4ds-theme');
  document.documentElement.setAttribute(
    'data-theme',
    storedTheme === 'light' ? 'light' : 'dark'
  );
  document.documentElement.classList.add('is-loading');

  function headLink(rel, href, attrs) {
    const sel = attrs?.id ? `#${attrs.id}` : `link[rel="${rel}"][href="${href}"]`;
    if (document.querySelector(sel)) return;
    const link = document.createElement('link');
    link.rel = rel;
    link.href = href;
    if (attrs) Object.entries(attrs).forEach(([k, v]) => link.setAttribute(k, v));
    document.head.appendChild(link);
  }

  if (!document.querySelector('link[rel="icon"]')) {
    headLink('icon', asset('assets/favicon-32.png'), { type: 'image/png', sizes: '32x32' });
  }

  headLink('preconnect', 'https://fonts.googleapis.com');
  headLink('preconnect', 'https://fonts.gstatic.com', { crossorigin: '' });

  if (!document.querySelector('link[data-4ds-fonts]')) {
    const fonts = document.createElement('link');
    fonts.rel = 'stylesheet';
    fonts.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Playfair+Display:wght@600;700;800&display=swap';
    fonts.setAttribute('data-4ds-fonts', '1');
    document.head.appendChild(fonts);
  }

  function mountPageLoader() {
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
      cookies.src = asset('js/cookies.js');
      cookies.defer = true;
      document.head.appendChild(cookies);
    };

    const loadSeo = () => {
      if (document.querySelector('script[src*="seo.js"]')) return;
      const seo = document.createElement('script');
      seo.src = asset('js/seo.js');
      seo.defer = true;
      document.head.appendChild(seo);
    };

    if (window.__4DS_CONFIG_LOADED) {
      loadSeo();
      loadCookies();
      return;
    }

    const config = document.createElement('script');
    config.src = asset('js/config.js');
    config.defer = true;
    config.onload = () => {
      loadSeo();
      loadCookies();
    };
    config.onerror = () => {
      loadSeo();
      loadCookies();
    };
    document.head.appendChild(config);
  }

  function boot() {
    mountPageLoader();
    loadCookieScripts();
  }

  if (document.body) boot();
  else document.addEventListener('DOMContentLoaded', boot, { once: true });
})();
