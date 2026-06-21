/* 4DS Nexus — cookie consent (POPIA-friendly) */
(function initCookieConsent() {
  const STORAGE_KEY = '4ds-cookie-consent';
  const CONSENT_VERSION = 1;

  const settings = window.COOKIE_SETTINGS || {};
  const gaId = settings.googleAnalyticsId || '';
  const marketingId = settings.metaPixelId || '';
  const hasAnalytics = Boolean(gaId);
  const hasMarketing = Boolean(marketingId) && settings.enableMarketing !== false;

  function readConsent() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (data.version !== CONSENT_VERSION) return null;
      return data;
    } catch {
      return null;
    }
  }

  function saveConsent(prefs) {
    const data = {
      version: CONSENT_VERSION,
      essential: true,
      analytics: Boolean(prefs.analytics),
      marketing: Boolean(prefs.marketing),
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return data;
  }

  function loadGoogleAnalytics(id) {
    if (!id || window.__4dsGaLoaded) return;
    window.__4dsGaLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', id, { anonymize_ip: true });

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    document.head.appendChild(script);
  }

  function loadMetaPixel(id) {
    if (!id || window.__4dsFbLoaded) return;
    window.__4dsFbLoaded = true;
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = true;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', id);
    window.fbq('track', 'PageView');
  }

  function applyConsent(consent) {
    if (consent.analytics && hasAnalytics) loadGoogleAnalytics(gaId);
    if (consent.marketing && hasMarketing) loadMetaPixel(marketingId);
    window.dispatchEvent(new CustomEvent('4ds:cookie-consent', { detail: consent }));
  }

  function mountUI() {
    const existing = document.getElementById('cookieConsent');
    if (existing) existing.remove();

    const root = document.createElement('div');
    root.id = 'cookieConsent';
    root.innerHTML = `
      <div class="cookie-banner" id="cookieBanner" role="dialog" aria-labelledby="cookieBannerTitle" aria-describedby="cookieBannerDesc" aria-hidden="true">
        <div class="cookie-banner-inner">
          <p class="cookie-banner-label">Cookies</p>
          <h2 id="cookieBannerTitle">We value your privacy</h2>
          <p id="cookieBannerDesc">We use essential cookies to run this site (theme and security). With your permission, we also use analytics cookies to understand how visitors use 4DS Nexus. Read our <a href="/privacy#cookies">Privacy Policy</a>.</p>
          <div class="cookie-banner-actions">
            <button type="button" class="btn btn-primary btn-sm" data-cookie-accept-all>Accept all</button>
            <button type="button" class="btn btn-outline btn-sm" data-cookie-reject>Essential only</button>
            <button type="button" class="btn btn-ghost btn-sm cookie-banner-manage" data-cookie-manage>Manage preferences</button>
          </div>
        </div>
      </div>
      <div class="cookie-modal" id="cookieModal" role="dialog" aria-labelledby="cookieModalTitle" aria-modal="true" aria-hidden="true">
        <div class="cookie-modal-backdrop" data-cookie-close></div>
        <div class="cookie-modal-panel">
          <button type="button" class="cookie-modal-close" data-cookie-close aria-label="Close cookie preferences">&times;</button>
          <h2 id="cookieModalTitle">Cookie preferences</h2>
          <p class="cookie-modal-intro">Choose which cookies we may use. Essential cookies are required for the site to work and cannot be turned off.</p>
          <ul class="cookie-pref-list">
            <li class="cookie-pref">
              <div class="cookie-pref-copy">
                <strong>Essential</strong>
                <span>Theme, consent choice, and Cloudflare Turnstile on the contact form.</span>
              </div>
              <span class="cookie-pref-badge">Always on</span>
            </li>
            ${hasAnalytics ? `
            <li class="cookie-pref">
              <div class="cookie-pref-copy">
                <strong>Analytics</strong>
                <span>Google Analytics — anonymous usage stats (pages visited, device type).</span>
              </div>
              <label class="cookie-toggle">
                <input type="checkbox" id="cookiePrefAnalytics">
                <span class="cookie-toggle-ui" aria-hidden="true"></span>
                <span class="sr-only">Allow analytics cookies</span>
              </label>
            </li>` : ''}
            ${hasMarketing ? `
            <li class="cookie-pref">
              <div class="cookie-pref-copy">
                <strong>Marketing</strong>
                <span>Meta Pixel — measure ad performance if you arrived from a campaign.</span>
              </div>
              <label class="cookie-toggle">
                <input type="checkbox" id="cookiePrefMarketing">
                <span class="cookie-toggle-ui" aria-hidden="true"></span>
                <span class="sr-only">Allow marketing cookies</span>
              </label>
            </li>` : ''}
          </ul>
          <div class="cookie-modal-actions">
            <button type="button" class="btn btn-primary btn-sm" data-cookie-save>Save preferences</button>
            <button type="button" class="btn btn-outline btn-sm" data-cookie-accept-all>Accept all</button>
          </div>
        </div>
      </div>`;

    document.body.appendChild(root);

    const banner = document.getElementById('cookieBanner');
    const modal = document.getElementById('cookieModal');
    const analyticsInput = document.getElementById('cookiePrefAnalytics');
    const marketingInput = document.getElementById('cookiePrefMarketing');

    function showBanner() {
      banner.classList.add('is-visible');
      banner.setAttribute('aria-hidden', 'false');
    }

    function hideBanner() {
      banner.classList.remove('is-visible');
      banner.setAttribute('aria-hidden', 'true');
    }

    function openModal() {
      const saved = readConsent();
      if (analyticsInput) analyticsInput.checked = saved?.analytics ?? false;
      if (marketingInput) marketingInput.checked = saved?.marketing ?? false;
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      hideBanner();
      document.getElementById('cookieModalTitle')?.focus();
    }

    function closeModal() {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
    }

    function acceptAll() {
      const consent = saveConsent({ analytics: hasAnalytics, marketing: hasMarketing });
      applyConsent(consent);
      hideBanner();
      closeModal();
    }

    function rejectOptional() {
      const consent = saveConsent({ analytics: false, marketing: false });
      applyConsent(consent);
      hideBanner();
      closeModal();
    }

    function savePreferences() {
      const consent = saveConsent({
        analytics: analyticsInput?.checked ?? false,
        marketing: marketingInput?.checked ?? false,
      });
      applyConsent(consent);
      hideBanner();
      closeModal();
    }

    root.querySelectorAll('[data-cookie-accept-all]').forEach(btn => {
      btn.addEventListener('click', acceptAll);
    });
    root.querySelector('[data-cookie-reject]')?.addEventListener('click', rejectOptional);
    root.querySelector('[data-cookie-manage]')?.addEventListener('click', openModal);
    root.querySelector('[data-cookie-save]')?.addEventListener('click', savePreferences);
    root.querySelectorAll('[data-cookie-close]').forEach(el => {
      el.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
    });

    document.addEventListener('click', (e) => {
      const link = e.target.closest('[data-cookie-settings]');
      if (!link) return;
      e.preventDefault();
      openModal();
    });

    window.openCookieSettings = openModal;

    return { showBanner, openModal };
  }

  function boot() {
    const saved = readConsent();
    const ui = mountUI();

    if (saved) {
      applyConsent(saved);
      return;
    }

    window.setTimeout(() => ui.showBanner(), 800);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
