/* 4DS Nexus — SEO: canonical, Open Graph, JSON-LD */
(function initSeo() {
  const SITE_URL = 'https://4dsnexus.co.za';
  const SITE_NAME = '4DS Nexus';
  const COMPANY = '4DS Solutions (Pty) Ltd';
  const DEFAULT_IMAGE = `${SITE_URL}/assets/4ds-og.png`;
  const PHONE = '+27646552995';
  const EMAIL = window.CONTACT_EMAIL || '4dssolutions@gmail.com';

  const SERVICE_KEYWORDS = [
    'business websites',
    'website development',
    'website upgrades',
    'e-commerce stores',
    'CRM software',
    'client portals',
    'inventory management',
    'POS systems',
    'mobile apps',
    'custom software',
    'business automation',
    'operations platform',
  ];

  const MAJOR_CITIES = [
    'Pretoria', 'Johannesburg', 'Midrand', 'Centurion', 'Sandton', 'Menlyn',
    'Cape Town', 'Stellenbosch', 'Durban', 'Umhlanga', 'Musgrave', 'Ballito',
    'Pietermaritzburg', 'Greytown', 'Hillcrest',
    'Mbombela', 'Nelspruit', 'White River', 'Secunda', 'eMalahleni', 'Middelburg',
    'Gqeberha', 'East London', 'Bloemfontein', 'Polokwane',
    'Rustenburg', 'Kimberley', 'George',
  ];

  function getCanonicalUrl() {
    let path = window.location.pathname || '/';
    if (path.endsWith('/index.html')) path = path.slice(0, -'/index.html'.length) || '/';
    if (path !== '/' && path.endsWith('/')) path = path.slice(0, -1);
    return SITE_URL + (path === '/' ? '/' : path);
  }

  function upsertMeta(attr, key, content) {
    if (!content) return;
    let el = document.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.content = content;
  }

  function upsertLink(rel, href) {
    if (!href) return;
    let el = document.querySelector(`link[rel="${rel}"]`);
    if (!el) {
      el = document.createElement('link');
      el.rel = rel;
      document.head.appendChild(el);
    }
    el.href = href;
  }

  function injectJsonLd(data) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }

  const canonical = getCanonicalUrl();
  const title = document.title || `${SITE_NAME} – 4DS`;
  const descEl = document.querySelector('meta[name="description"]');
  const description = descEl?.content
    || `CRM, business websites, and custom software for South African businesses. Serving ${MAJOR_CITIES.slice(0, 4).join(', ')}, and nationwide.`;

  upsertLink('canonical', canonical);
  upsertMeta('name', 'robots', 'index, follow, max-image-preview:large');
  upsertMeta('name', 'author', COMPANY);
  upsertMeta('name', 'geo.region', 'ZA');
  upsertMeta('name', 'geo.placename', 'South Africa');
  upsertMeta('name', 'keywords', SERVICE_KEYWORDS.join(', '));

  upsertMeta('property', 'og:type', 'website');
  upsertMeta('property', 'og:site_name', SITE_NAME);
  upsertMeta('property', 'og:title', title);
  upsertMeta('property', 'og:description', description);
  upsertMeta('property', 'og:url', canonical);
  upsertMeta('property', 'og:image', DEFAULT_IMAGE);
  upsertMeta('property', 'og:image:alt', '4DS Nexus logo');
  upsertMeta('property', 'og:locale', 'en_ZA');

  upsertMeta('name', 'twitter:card', 'summary_large_image');
  upsertMeta('name', 'twitter:title', title);
  upsertMeta('name', 'twitter:description', description);
  upsertMeta('name', 'twitter:image', DEFAULT_IMAGE);

  const areaServed = MAJOR_CITIES.map((city) => ({
    '@type': 'City',
    name: city,
    containedInPlace: { '@type': 'Country', name: 'South Africa' },
  }));

  injectJsonLd({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: COMPANY,
        alternateName: SITE_NAME,
        url: SITE_URL,
        logo: DEFAULT_IMAGE,
        email: EMAIL,
        telephone: PHONE,
        sameAs: [
          'https://www.linkedin.com/in/4ds-solutions-33ab62417',
          'https://www.instagram.com/4dssolutions/',
        ],
        areaServed: { '@type': 'Country', name: 'South Africa' },
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/#business`,
        name: SITE_NAME,
        description,
        url: SITE_URL,
        image: DEFAULT_IMAGE,
        telephone: PHONE,
        email: EMAIL,
        priceRange: 'R1299–R25000+',
        parentOrganization: { '@id': `${SITE_URL}/#organization` },
        areaServed,
        serviceType: SERVICE_KEYWORDS,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: '4DS Solutions Services',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Business Website Development' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'CRM & Client Management Software' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Business Software' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Inventory & POS Systems' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mobile App Development' } },
          ],
        },
      },
      ...(canonical === `${SITE_URL}/` || canonical === SITE_URL ? [{
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'en-ZA',
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE_URL}//areas-served?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      }] : []),
    ],
  });
})();
