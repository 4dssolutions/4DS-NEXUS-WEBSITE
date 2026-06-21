/* Copy to config.js and fill in your values. config.js is gitignored if you use local overrides. */
(function () {
  if (window.__4DS_CONFIG_LOADED) return;
  window.__4DS_CONFIG_LOADED = true;

  /* Public site key from Cloudflare Turnstile (safe in client-side code) */
  window.TURNSTILE_SITE_KEY = 'your-turnstile-site-key';

  window.CONTACT_EMAIL = 'you@example.com';

  /*
   * Automatic form delivery (no mailto / email app)
   * -----------------------------------------------
   * 1. Sign up free at https://web3forms.com with your Gmail
   * 2. Create a form → copy the Access Key
   * 3. Paste it below (safe in client code — restrict domain to 4dsnexus.co.za in Web3Forms dashboard)
   * 4. Optional: add Cloudflare Turnstile secret in Web3Forms spam settings (same widget as below)
   */
  window.WEB3FORMS_ACCESS_KEY = '';

  window.COOKIE_SETTINGS = {
    googleAnalyticsId: '',
    metaPixelId: '',
    enableMarketing: false,
  };
})();
