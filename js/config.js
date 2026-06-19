/* 4DS Nexus site config — safe to load once (boot.js + contact page) */
(function () {
  if (window.__4DS_CONFIG_LOADED) return;
  window.__4DS_CONFIG_LOADED = true;

  window.TURNSTILE_SITE_KEY = '0x4AAAAAADnaWWjh836Ut1Be';
  window.CONTACT_EMAIL = '4dssolutions@gmail.com';

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
