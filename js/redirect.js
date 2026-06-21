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
