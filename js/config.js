/* 4DS Nexus site config — safe to load once (boot.js + contact page) */
(function () {
  if (window.__4DS_CONFIG_LOADED) return;
  window.__4DS_CONFIG_LOADED = true;

  /*
   * Cloudflare Turnstile — optional fallback only (Web3Forms + Turnstile needs Web3Forms Pro).
   * Contact form uses Web3Forms hCaptcha (free) + honeypots when WEB3FORMS_HCAPTCHA is true.
   */
  window.TURNSTILE_SITE_KEY = '';

  window.CONTACT_EMAIL = '4dssolutions@gmail.com';

  /* Web3Forms — free delivery to Gmail: https://web3forms.com */
  window.WEB3FORMS_ACCESS_KEY = '4c826155-7721-4766-99e4-4f16ba4f13af';

  /* hCaptcha via Web3Forms free sitekey — enable hCaptcha in Web3Forms dashboard */
  window.WEB3FORMS_HCAPTCHA = true;
  window.WEB3FORMS_HCAPTCHA_SITEKEY = '50b2fe65-b00b-4b9e-ad62-3ba471098be2';

  /*
   * Cookie & analytics — fill in when you go live
   * --------------------------------------------
   * googleAnalyticsId: https://analytics.google.com Admin Data Streams Web
   *   Copy the Measurement ID (starts with G-). Leave empty until ready.
   *
   * metaPixelId: Optional Meta Pixel ID for Facebook/Instagram ads.
   * enableMarketing: false hides marketing cookies even if metaPixelId is set.
   */
  window.COOKIE_SETTINGS = {
    googleAnalyticsId: '',
    metaPixelId: '',
    enableMarketing: false,
  };
})();
