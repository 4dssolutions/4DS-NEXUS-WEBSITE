/* Service page content data */
const SERVICE_PAGES = {
  crm: {
    title: 'CRM',
    icon: 'users',
    subtitle: 'Customer Relationship Management',
    seoDescription: 'CRM software for South African businesses — manage leads, customers, quotes, and invoices in Sandton, Pretoria, Cape Town, Durban, and nationwide. Part of 4DS Nexus.',
    description: 'Manage leads, customers, quotations, invoices, and support tickets from one connected system, with the visibility growing businesses need today.',
    features: [
      'Customer database management', 'Lead management', 'Sales pipeline tracking',
      'Quotation management', 'Invoice management', 'Job card management',
      'Task and calendar scheduling', 'Customer communication history',
      'Customer support ticketing', 'Document management', 'Contact management',
      'Customer activity timeline', 'Basic reporting', 'Multi-user access control'
    ],
    benefits: [
      'Improve customer relationships', 'Increase sales conversion rates',
      'Track opportunities more effectively', 'Provide better customer service',
      'Gain visibility into customer activity'
    ],
    outcomes: ['Higher conversion', 'Better retention', 'Organised follow-ups', 'Full customer visibility'],
    related: ['inventory', 'mobile', 'custom-solutions']
  },
  inventory: {
    title: 'Inventory Management',
    icon: 'box',
    subtitle: 'Real-Time Stock Control',
    seoDescription: 'Inventory management software for SA businesses — real-time stock tracking across locations in Johannesburg, Cape Town, Durban, Pretoria, and beyond.',
    description: 'Track stock across multiple locations in real time with low-stock alerts, movement tracking, and clear reporting.',
    features: [
      'Real-time stock tracking', 'Inventory movement tracking', 'Low stock alerts',
      'Supplier management', 'Purchase order management', 'Warehouse management',
      'Barcode support', 'Multi-location inventory', 'Asset management',
      'Stock valuation reports', 'Stock transfer management'
    ],
    benefits: [
      'Reduce stock shortages', 'Improve inventory accuracy',
      'Reduce waste', 'Improve procurement planning'
    ],
    outcomes: ['Accurate stock levels', 'Fewer stockouts', 'Better procurement', 'Multi-site visibility'],
    related: ['crm', 'mobile', 'custom-solutions']
  },
  pos: {
    title: 'Point of Sale',
    icon: 'cart',
    subtitle: 'Retail Sales Processing',
    seoDescription: 'POS systems for South African retail — offline sales, inventory sync, and reporting for shops in Sandton, Cape Town, Durban, Pretoria, and nationwide.',
    description: 'Fast, reliable point of sale with offline support, integrated inventory updates, and full sales reporting.',
    features: [
      'Retail sales processing', 'Offline transaction support', 'Integrated inventory updates',
      'Receipt generation', 'Multi-user support', 'Discount management',
      'Returns processing', 'Customer purchase history', 'Sales reporting', 'Cash-up reports'
    ],
    benefits: [
      'Faster transactions', 'Improved reporting',
      'Real-time stock updates', 'Reduced manual work'
    ],
    outcomes: ['Faster checkout', 'Real-time stock sync', 'Reliable offline sales', 'Cleaner reporting'],
    related: ['inventory', 'crm', 'custom-solutions']
  },
  dispatch: {
    title: 'Dispatch & Logistics',
    icon: 'truck',
    subtitle: 'Custom Solution',
    customScoped: true,
    description: 'Delivery scheduling, route planning, and proof of delivery, scoped as a custom solution based on your operation, hardware, and integrations.',
    features: [
      'Delivery scheduling', 'Route planning', 'Driver allocation', 'Proof of delivery',
      'Delivery status tracking', 'Job assignment management', 'Real-time dispatch monitoring',
      'Client notifications', 'Delivery reporting'
    ],
    benefits: [
      'Improved delivery efficiency', 'Reduced delays', 'Better operational visibility'
    ],
    outcomes: ['Fewer delays', 'Live delivery visibility', 'Better route efficiency', 'Happier customers'],
    related: ['mobile', 'inventory', 'custom-solutions']
  },
  fleet: {
    title: 'Fleet Tracking',
    icon: 'pin',
    subtitle: 'Custom Solution',
    customScoped: true,
    description: 'Vehicle tracking, maintenance records, and fleet reporting, delivered as a custom solution when your operation requires GPS hardware or deep integrations.',
    features: [
      'Live vehicle tracking', 'Vehicle status monitoring', 'Trip history',
      'Driver assignment', 'Maintenance reminders', 'Fuel tracking',
      'Route history', 'Asset utilisation reporting', 'Compliance tracking'
    ],
    benefits: [
      'Better fleet visibility', 'Reduced operational costs', 'Improved vehicle utilisation'
    ],
    outcomes: ['Full fleet visibility', 'Lower running costs', 'Better utilisation', 'Safer operations'],
    related: ['mobile', 'dispatch', 'custom-solutions']
  },
  mobile: {
    title: 'Mobile Applications',
    icon: 'phone',
    subtitle: 'Field & Workforce Apps',
    seoDescription: 'Mobile app development South Africa — Android, iOS, and PWA apps for field teams in Gauteng, Western Cape, KZN, and across SA.',
    description: 'Purpose-built mobile apps for field staff, drivers, and managers, with offline mode, GPS, and digital forms.',
    features: [
      'Field staff applications', 'Driver applications', 'Manager dashboards',
      'Task management', 'GPS-enabled operations', 'Offline functionality',
      'Push notifications', 'Photo uploads', 'Digital forms'
    ],
    benefits: [
      'Improved workforce mobility', 'Real-time information access',
      'Increased operational efficiency'
    ],
    outcomes: ['Connected field teams', 'Works without signal', 'Less paperwork', 'Faster updates'],
    related: ['crm', 'inventory', 'custom-solutions']
  },
  kiosks: {
    title: 'Self-Service Kiosks',
    icon: 'monitor',
    subtitle: 'Customer Self-Service',
    description: 'Reduce queues and improve customer experience with self-service ordering, payments, and queue management.',
    features: [
      'Customer ordering', 'Service requests', 'Product browsing',
      'Queue management', 'Digital payments', 'Information displays'
    ],
    benefits: [
      'Reduced queues', 'Improved customer experience', 'Higher operational efficiency'
    ],
    outcomes: ['Shorter queues', 'Better in-store flow', 'Higher throughput', 'Modern customer experience'],
    related: ['pos', 'inventory', 'crm']
  },
  'ai-assistant': {
    title: 'AI Business Assistant',
    icon: 'robot',
    subtitle: 'Coming Soon',
    comingSoon: true,
    description: 'An AI assistant for plain-language queries, operational insights, and automated workflows, currently on our roadmap, not yet available as a live module.',
    features: [
      'Natural language reporting', 'Business performance summaries', 'Operational alerts',
      'Workflow suggestions', 'Trend analysis support', 'Forecasting support',
      'Business intelligence dashboards'
    ],
    benefits: [
      'Faster decision-making when available', 'Reduced administrative workload',
      'Plain-language access to your data'
    ],
    outcomes: ['On our roadmap', 'Join the waitlist', 'Clear delivery timeline'],
    related: ['crm', 'inventory', 'custom-solutions']
  }
};

const SERVICE_THEMES = {
  crm: {
    hero: 'ph-purple',
    bp: 'bp-purple',
    label: 'label-purple',
    eyebrow: 'Customer lifecycle',
    chips: ['Leads & contacts', 'Quotes & invoices', 'Support tickets'],
    chipLinks: ['#overview', '#features', '#features'],
    highlight: 'From first enquiry to repeat business, every interaction stays connected in one CRM.',
    showcase: 'showcase--rings',
    introClass: 'service-intro--crm'
  },
  inventory: {
    hero: 'ph-blue',
    bp: 'bp-blue',
    label: 'label-blue',
    eyebrow: 'Stock & supply chain',
    chips: ['Multi-location', 'Low-stock alerts', 'Barcode ready'],
    chipLinks: ['#overview', '#features', '#features'],
    highlight: 'Know what you have, where it is, and when to reorder, without spreadsheet chaos.',
    showcase: 'showcase--grid-dense',
    introClass: 'service-intro--inventory'
  },
  pos: {
    hero: 'ph-amber',
    bp: 'bp-amber',
    label: 'label-amber',
    eyebrow: 'Retail checkout',
    chips: ['Offline sales', 'Stock-linked', 'Cash-up reports'],
    chipLinks: ['#overview', '#features', '#features'],
    highlight: 'Checkout that stays fast at the till and keeps inventory accurate behind the scenes.',
    showcase: 'showcase--receipt',
    introClass: 'service-intro--pos'
  },
  dispatch: {
    hero: 'ph-terracotta',
    bp: 'bp-terracotta',
    label: 'label-amber',
    eyebrow: 'Delivery operations',
    chips: ['Route planning', 'Driver allocation', 'Proof of delivery'],
    chipLinks: ['#overview', '#features', '#features'],
    highlight: 'Schedule, dispatch, and track deliveries with live visibility for your team and customers.',
    showcase: 'showcase--routes',
    introClass: 'service-intro--dispatch',
    reverse: true
  },
  fleet: {
    hero: 'ph-rosewood',
    bp: 'bp-rosewood',
    label: 'label-charcoal',
    eyebrow: 'Vehicle operations',
    chips: ['Live tracking', 'Trip history', 'Maintenance'],
    chipLinks: ['#overview', '#features', '#features'],
    highlight: 'See where vehicles are, how they are used, and what needs attention before it becomes costly.',
    showcase: 'showcase--map',
    introClass: 'service-intro--fleet'
  },
  mobile: {
    hero: 'ph-sage',
    bp: 'bp-sage',
    label: 'label-forest',
    eyebrow: 'Field & workforce',
    chips: ['Works offline', 'GPS enabled', 'Digital forms'],
    chipLinks: ['#overview', '#features', '#features'],
    highlight: 'Give field teams, drivers, and managers the same live data, even when signal drops.',
    showcase: 'showcase--signal',
    introClass: 'service-intro--mobile',
    reverse: true
  },
  kiosks: {
    hero: 'ph-oak',
    bp: 'bp-oak',
    label: 'label-sepia',
    eyebrow: 'Self-service front desk',
    chips: ['Queue management', 'Digital payments', 'Product browsing'],
    chipLinks: ['#overview', '#features', '#features'],
    highlight: 'Let customers help themselves while your team focuses on service, not queues.',
    showcase: 'showcase--kiosk',
    introClass: 'service-intro--kiosks'
  },
  'ai-assistant': {
    hero: 'ph-slate',
    bp: 'bp-slate',
    label: 'label-slate',
    eyebrow: 'On the roadmap',
    chips: ['Plain-language queries', 'Operational insights', 'Workflow support'],
    chipLinks: ['#overview', '#features', '#related'],
    highlight: 'Ask questions in everyday language and get answers drawn from your connected business data.',
    showcase: 'showcase--pulse',
    introClass: 'service-intro--ai'
  }
};

const SERVICE_HERO_NAV = [
  { label: 'Overview', href: '#overview' },
  { label: 'Features', href: '#features' },
  { label: 'Related', href: '#related' },
];

function renderHeroBlueprintNav(items) {
  return `<nav class="hero-blueprint-nav reveal" aria-label="Page sections">${items.map(item =>
    `<a href="${item.href}">${item.label}</a>`
  ).join('')}</nav>`;
}

function renderServiceHeroChips(chips, chipLinks) {
  return chips.map((label, index) => {
    const href = chipLinks?.[index] || (index === 0 ? '#overview' : '#features');
    return `<a href="${href}" class="service-hero-chip">${label}</a>`;
  }).join('');
}

function renderServicePage() {
  const slug = document.body.dataset.service;
  const data = SERVICE_PAGES[slug];
  if (!data) return;

  const theme = SERVICE_THEMES[slug] || { hero: 'ph-blue', bp: 'bp-blue', label: 'label-blue', chips: [], showcase: '', introClass: '' };

  document.title = `${data.title} – 4DS`;
  if (data.seoDescription) {
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = data.seoDescription;
  }
  document.body.classList.add('service-page', `service-${slug}`);

  const base = '../';
  const relatedMeta = {
    'custom-solutions': { title: 'Custom Solutions', icon: 'puzzle', subtitle: 'Scoped industry builds', href: `${base}custom-solutions.html` },
  };
  const relatedCards = (data.related || []).map(key => {
    if (relatedMeta[key]) {
      const r = relatedMeta[key];
      return `<a href="${r.href}" class="card"><div class="card-icon">${iconSvg(r.icon)}</div><h3>${r.title}</h3><p>${r.subtitle}</p><span class="card-link">Learn more</span></a>`;
    }
    const r = SERVICE_PAGES[key];
    if (!r) return '';
    const href = key === 'ai-assistant' ? 'ai-assistant.html' : `${key}.html`;
    return `<a href="${href}" class="card"><div class="card-icon">${iconSvg(r.icon)}</div><h3>${r.title}</h3><p>${r.subtitle}</p><span class="card-link">Learn more</span></a>`;
  }).join('');

  const featuresHtml = data.features.map(f => `<li>${f}</li>`).join('');
  const benefitsHtml = data.benefits.map(b => `<li>${b}</li>`).join('');
  const outcomesHtml = (data.outcomes || []).map(o => `<li>${o}</li>`).join('');
  const comingSoonBanner = data.comingSoon ? `
    <section class="content-section alt">
      <div class="container">
        <div class="coming-soon-banner reveal">
          <span class="coming-soon-badge">Coming Soon</span>
          <p>This capability is on our roadmap. <a href="${base}future-platforms.html">View the roadmap</a> or <a href="${base}contact.html">join the waitlist</a>.</p>
        </div>
      </div>
    </section>` : '';
  const customScopedBanner = data.customScoped ? `
    <section class="content-section alt">
      <div class="container">
        <div class="coming-soon-banner reveal">
          <span class="coming-soon-badge">Custom Solution</span>
          <p>This is scoped and quoted per client, not a standard bundled module. <a href="${base}custom-solutions.html">Learn about custom solutions</a> or <a href="${base}contact.html">request a quote</a>.</p>
        </div>
      </div>
    </section>` : '';

  const heroChips = renderServiceHeroChips(
    theme.chips || ['Part of 4DS Nexus', 'Modular', 'Integrated'],
    theme.chipLinks
  );
  const heroNav = renderHeroBlueprintNav(SERVICE_HERO_NAV);
  const twoColReverse = theme.reverse ? ' two-col--reverse' : '';
  const showcaseClass = theme.showcase ? ` ${theme.showcase}` : '';

  document.getElementById('service-content').innerHTML = `
    <section class="page-hero ${theme.hero} service-hero">
      <div class="container">
        <nav class="breadcrumb"><a href="${base}index.html">Home</a> / <a href="${base}solutions/nexus.html">Solutions</a> / <span>${data.title}</span></nav>
        ${data.comingSoon ? '<span class="coming-soon-badge" style="margin-bottom:12px;display:inline-block">Coming Soon</span>' : ''}
        ${theme.eyebrow ? `<p class="service-hero-eyebrow">${theme.eyebrow}</p>` : ''}
        <h1><span class="h1-icon">${iconSvg(data.icon)}</span>${data.title}</h1>
        <p>${data.description}</p>
        <div class="service-hero-chips">${heroChips}</div>
        ${heroNav}
        <div class="service-hero-actions">
          <a href="${base}contact.html" class="btn btn-primary btn-lg">Request a Demo</a>
          <a href="${base}solutions/nexus.html" class="btn btn-ghost btn-lg">View Full Platform</a>
        </div>
      </div>
    </section>

    ${comingSoonBanner}
    ${customScopedBanner}

    <section class="content-section service-intro ${theme.introClass || ''}" id="overview">
      <div class="container">
        <div class="two-col${twoColReverse} reveal">
          <div class="service-intro-copy">
            <p class="section-label ${theme.label}">${data.subtitle}</p>
            <h2>Built for real business operations</h2>
            ${theme.highlight ? `<p class="service-highlight">${theme.highlight}</p>` : ''}
            <p>${data.description}</p>
            <p>${data.customScoped ? 'We scope and deliver this as a custom solution, configured for your sites, integrations, and operational requirements.' : 'This capability connects to the 4DS Nexus platform so your data stays in one place across your organisation.'}</p>
          </div>
          <div class="visual-block service-visual">
            <div class="showcase ${theme.bp}${showcaseClass}">
              <div class="showcase-emblem">${iconSvg(data.icon)}</div>
              <div class="showcase-foot">
                <div>
                  <p class="showcase-name">${data.title}</p>
                  <p class="showcase-sub">A 4DS Nexus module</p>
                </div>
                <span class="dots"><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i></span>
              </div>
            </div>
            <div class="spec-chip spec-chip--tl">
              <span class="spec-label">Integration</span>
              <span class="spec-value">Native</span>
            </div>
            <div class="spec-chip spec-chip--br">
              <span class="spec-label">Data</span>
              <span class="spec-value">Shared</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="content-section alt" id="features">
      <div class="container">
        <div class="module-header reveal">
          <div class="module-header-icon">${iconSvg(data.icon)}</div>
          <div>
            <h2>${data.subtitle}</h2>
            <p>${data.description}</p>
          </div>
        </div>
        <div class="module-columns reveal">
          <div class="module-column-card module-column-card--features">
            <h3>Features</h3>
            <ul class="module-feature-list">${featuresHtml}</ul>
          </div>
          <div class="module-column-card module-column-card--benefits">
            <h3>Benefits</h3>
            <ul class="feature-list module-benefits">${benefitsHtml}</ul>
          </div>
        </div>
        ${outcomesHtml ? `<div class="benefits-box reveal"><h4>Key Outcomes</h4><ul>${outcomesHtml}</ul></div>` : ''}
        ${data.comingSoon
          ? `<a href="${base}contact.html" class="btn btn-primary" style="margin-top:24px">Join the Waitlist</a>`
          : `<a href="${base}pricing.html" class="btn btn-primary" style="margin-top:24px">View Pricing</a>`}
      </div>
    </section>

    <section class="content-section" id="related">
      <div class="container">
        <p class="section-label label-teal reveal">Related Modules</p>
        <h2 class="section-title reveal">Works with</h2>
        <div class="card-grid reveal">${relatedCards}</div>
      </div>
    </section>

    <section class="cta-band service-cta service-cta--${slug}">
      <div class="container cta-inner reveal">
        <h2>Ready to add ${data.title} to your operations?</h2>
        <p>Speak to our team about configuring 4DS Nexus for your business.</p>
        <a href="${base}contact.html" class="btn btn-primary btn-lg">Get in Touch</a>
      </div>
    </section>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  renderServicePage();
  if (typeof reinitPageInteractions === 'function') reinitPageInteractions();
});
