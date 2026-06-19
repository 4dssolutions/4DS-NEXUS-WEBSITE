/* 4DS Nexus — theme + fonts (defer in <head>) */
(function bootEarly() {
  const src = document.currentScript?.getAttribute('src') || '';
  const base = src.includes('../') ? '../' : '';

  const storedTheme = localStorage.getItem('4ds-theme');
  document.documentElement.setAttribute(
    'data-theme',
    storedTheme === 'dark' ? 'dark' : 'light'
  );
  document.documentElement.classList.add('is-page-ready');

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
    headLink('icon', `${base}assets/favicon-32.png`, { type: 'image/png', sizes: '32x32' });
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

  function loadCookieScripts() {
    const loadCookies = () => {
      if (document.querySelector('script[src*="cookies.js"]')) return;
      const cookies = document.createElement('script');
      cookies.src = `${base}js/cookies.js`;
      cookies.defer = true;
      document.head.appendChild(cookies);
    };

    const loadSeo = () => {
      if (document.querySelector('script[src*="seo.js"]')) return;
      const seo = document.createElement('script');
      seo.src = `${base}js/seo.js`;
      seo.defer = true;
      document.head.appendChild(seo);
    };

    if (window.__4DS_CONFIG_LOADED) {
      loadSeo();
      loadCookies();
      return;
    }

    const config = document.createElement('script');
    config.src = `${base}js/config.js`;
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

  loadCookieScripts();
})();
