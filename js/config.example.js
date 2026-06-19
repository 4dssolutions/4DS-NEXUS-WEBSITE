/* Copy to config.js and fill in your values. config.js is gitignored if you use local overrides. */
(function () {
  if (window.__4DS_CONFIG_LOADED) return;
  window.__4DS_CONFIG_LOADED = true;

  /* Public site key from Cloudflare Turnstile (safe in client-side code) */
  window.TURNSTILE_SITE_KEY = 'your-turnstile-site-key';

  window.CONTACT_EMAIL = 'you@example.com';

  window.COOKIE_SETTINGS = {
    googleAnalyticsId: '',
    metaPixelId: '',
    enableMarketing: false,
  };
})();
