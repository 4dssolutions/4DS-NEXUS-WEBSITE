/* 4DS Nexus site config — safe to load once (boot.js + contact page) */
(function () {
  if (window.__4DS_CONFIG_LOADED) return;
  window.__4DS_CONFIG_LOADED = true;

  /*
   * Cloudflare Turnstile — widget name: turnstile4dssolutions
   * https://dash.cloudflare.com → Turnstile → Add widget
   * Hostnames: 4dsnexus.co.za, www.4dsnexus.co.za, localhost
   * Paste your new Site Key below (public — safe in client code)
   */
  window.TURNSTILE_SITE_KEY = '0x4AAAAAADoom-w3pZl7_Jyz';

  window.CONTACT_EMAIL = '4dssolutions@gmail.com';

  /* Paste your Web3Forms access key here — https://web3forms.com (free, delivers to Gmail) */
  window.WEB3FORMS_ACCESS_KEY = '4c826155-7721-4766-99e4-4f16ba4f13af';

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
