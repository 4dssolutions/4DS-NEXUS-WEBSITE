/* 4DS Nexus shared site interactions */

(function initThemeEarly() {
  const stored = localStorage.getItem('4ds-theme');
  document.documentElement.setAttribute(
    'data-theme',
    stored === 'dark' ? 'dark' : 'light'
  );
})();

/* ─── Hand-drawn / pencil-sketch line icons ───
   Simple stroke icons rendered with a turbulence displacement filter
   (#pencil) so they read as sketched rather than generated. */
const ICON_PATHS = {
  users: '<circle cx="9" cy="8" r="3.2"/><path d="M3.5 19c0-3 2.6-5 5.5-5s5.5 2 5.5 5"/><path d="M15.5 5.3a3 3 0 0 1 0 5.4"/><path d="M18.7 19c0-2.2-1-3.9-2.6-4.7"/>',
  box: '<path d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5z"/><path d="M3.7 7.6 12 12l8.3-4.4"/><path d="M12 12v8.7"/>',
  cart: '<circle cx="9.5" cy="20" r="1.3"/><circle cx="17" cy="20" r="1.3"/><path d="M2.5 3.5h2.2l2.3 11.2h10.2l1.8-7H6.5"/>',
  truck: '<path d="M2.5 6.5h11v9h-11z"/><path d="M13.5 9.5h3.6l3.4 3.3v2.7h-7z"/><circle cx="7" cy="17.5" r="1.7"/><circle cx="17" cy="17.5" r="1.7"/>',
  pin: '<path d="M12 21c4-4.6 6.5-7.7 6.5-11A6.5 6.5 0 0 0 5.5 10c0 3.3 2.5 6.4 6.5 11z"/><circle cx="12" cy="10" r="2.3"/>',
  phone: '<rect x="6.5" y="2.5" width="11" height="19" rx="2.2"/><path d="M10 18.5h4"/>',
  monitor: '<rect x="3" y="4.5" width="18" height="12" rx="1.6"/><path d="M9 20.5h6M12 16.5v4"/>',
  robot: '<rect x="5" y="8" width="14" height="10.5" rx="2.4"/><circle cx="9.6" cy="13" r="1.1"/><circle cx="14.4" cy="13" r="1.1"/><path d="M12 8V5.5"/><circle cx="12" cy="4.4" r="1.1"/><path d="M3.7 12.2v3.3M20.3 12.2v3.3"/>',
  bolt: '<path d="M13 2.5 5 13.2h6l-1 8.3L19 10.2h-6z"/>',
  chart: '<path d="M4 4v16h16"/><path d="M8.5 16v-4M12.5 16V9M16.5 16v-6.5"/>',
  link: '<path d="m9.7 14.3 4.6-4.6"/><path d="M8.2 11 6.2 13a3.6 3.6 0 0 0 5.1 5.1l2-2"/><path d="M15.8 13l2-2a3.6 3.6 0 0 0-5.1-5.1l-2 2"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2.2"/><path d="m4.2 7 7.8 6 7.8-6"/>',
  clock: '<circle cx="12" cy="12" r="8.4"/><path d="M12 7.4V12l3.2 2"/>',
  bag: '<path d="M6 8h12l-1 12.2H7z"/><path d="M9 8V6.6a3 3 0 0 1 6 0V8"/>',
  shield: '<path d="M12 3 5 6v5c0 4 3 7.6 7 9 4-1.4 7-5 7-9V6z"/><path d="m9 12 2 2 4-4.2"/>',
  briefcase: '<rect x="3.5" y="7.5" width="17" height="11.5" rx="1.8"/><path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5"/><path d="M3.7 12.5h16.6"/>',
  wrench: '<path d="M15.5 6.2a3.6 3.6 0 0 0-4.8 4.3l-6 6 1.8 1.8 6-6a3.6 3.6 0 0 0 4.3-4.8l-2.1 2.1-2-1.4z"/>',
  building: '<path d="M5 21V5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v16"/><path d="M14 9.5h4a1 1 0 0 1 1 1V21"/><path d="M3.5 21h17"/><path d="M8 8h3M8 12h3M8 16h3"/>',
  megaphone: '<path d="M5 9.5 14 6v12l-9-3.4z"/><path d="M5 9.5H4v5h1"/><path d="M8.5 14.7V19h2.6"/><path d="M16.5 9.5a3 3 0 0 1 0 5"/>',
  puzzle: '<path d="M5 5.5h4.5V7a1.6 1.6 0 0 0 3.2 0V5.5H17v4.3h1.5a1.6 1.6 0 0 1 0 3.2H17v5.5h-4.3v-1.5a1.6 1.6 0 0 0-3.2 0v1.5H5z"/>',
  search: '<circle cx="11" cy="11" r="6.4"/><path d="m15.8 15.8 4 4"/>',
  refresh: '<path d="M19.5 8.5A8 8 0 0 0 5.5 6.7"/><path d="M5 3.5v4h4"/><path d="M4.5 15.5a8 8 0 0 0 14 1.8"/><path d="M19 20.5v-4h-4"/>',
  cap: '<path d="m12 4 9 4-9 4-9-4z"/><path d="M7 10.2V14c0 1.6 2.5 3 5 3s5-1.4 5-3v-3.8"/><path d="M21 8.2v5"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 3v2.6M12 18.4V21M21 12h-2.6M5.6 12H3M18 6l-1.8 1.8M7.8 16.2 6 18M18 18l-1.8-1.8M7.8 7.8 6 6"/>',
  'trending-up': '<path d="M4 16 10 10l3 3 7-7"/><path d="M15 6h5v5"/>',
  'trending-down': '<path d="M4 8 10 14l3-3 7 7"/><path d="M15 18h5v-5"/>',
  handshake: '<path d="m3.5 11.5 3-2.8 3.5 1 2-1 2 1 3.5-1 3 2.8"/><path d="M6.5 11v4.2l4 2.3 2-1.1 2 1.1 4-2.3V11"/><path d="m10 9.7 2 1.6 2-1.6"/>',
  spark: '<path d="M12 3v5M12 16v5M3 12h5M16 12h5M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3"/>',
  doc: '<path d="M6.5 3.5h7l4 4v13h-11z"/><path d="M13.5 3.5v4h4"/><path d="M9 12h6M9 15.5h6"/>',
  leaf: '<path d="M12 21c-4.5-5.5-7-9-7-12.5a6 6 0 0 1 10.5-4A6 6 0 0 1 19 8.5c0 3.5-2.5 7-7 12.5z"/><path d="M12 21V9"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.5 3 4 6.5 4 9s-1.5 6-4 9"/><path d="M12 3c-2.5 3-4 6.5-4 9s1.5 6 4 9"/>',
};

function iconSvg(name) {
  const path = ICON_PATHS[name] || ICON_PATHS.bolt;
  return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
}

function initIcons() {
  if (!document.getElementById('pencilFilter')) {
    const holder = document.createElement('div');
    holder.id = 'pencilFilter';
    holder.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
    holder.setAttribute('aria-hidden', 'true');
    holder.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg">
        <filter id="pencil" x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="3" seed="7" result="n"/>
          <feDisplacementMap in="SourceGraphic" in2="n" scale="2.1" xChannelSelector="R" yChannelSelector="G"/>
        </filter>
      </svg>`;
    document.body.appendChild(holder);
  }
  document.querySelectorAll('[data-icon]').forEach(el => {
    el.innerHTML = iconSvg(el.dataset.icon);
  });
}

const CAPABILITIES = [
  {
    icon: 'users', title: 'CRM & Customer Management', theme: 'crm',
    desc: 'Unify leads, customers, support tickets, and communication history in one reliable system.',
    tags: ['CRM', 'Client Management', 'Support Tickets', 'Contact Management'],
    href: 'services/crm.html', specs: [['Coverage', 5], ['Usability', 5], ['Support', 4]]
  },
  {
    icon: 'monitor', title: 'Website & Portal Development', theme: 'sync',
    desc: 'Custom websites, upgrades, and secure client portals that represent your brand and connect to your operations.',
    tags: ['Websites', 'Client Portals', 'Landing Pages', 'Responsive Design'],
    href: 'consulting.html#web', specs: [['Design', 5], ['Performance', 4], ['Integration', 4]]
  },
  {
    icon: 'gear', title: 'Business Process Automation', theme: 'intel',
    desc: 'Replace manual steps with workflows, document handling, and connected business processes.',
    tags: ['Workflows', 'Document Management', 'Automation', 'Integrations'],
    href: 'consulting.html', specs: [['Efficiency', 5], ['Accuracy', 4], ['Control', 4]]
  },
  {
    icon: 'shield', title: 'Security Operations Management', theme: 'ops',
    desc: 'Guard scheduling, incident reporting, patrol records, and client management for security companies.',
    tags: ['Guard Management', 'Incident Reporting', 'Site Management', 'Workforce'],
    href: 'industries.html', specs: [['Operations', 5], ['Visibility', 4], ['Compliance', 4]]
  },
  {
    icon: 'box', title: 'Fleet & Asset Management', theme: 'mobile',
    desc: 'Track vehicles, equipment, and assets across sites, scoped and delivered as a custom solution.',
    tags: ['Asset Tracking', 'Field Service', 'Maintenance', 'Multi-site'],
    href: 'custom-solutions.html', specs: [['Visibility', 5], ['Control', 4], ['Scale', 4]]
  },
  {
    icon: 'wrench', title: 'Custom Software Development', theme: 'sync',
    desc: 'Custom cloud systems, API integrations, and modules built around how your business runs.',
    tags: ['Custom Builds', 'API Integrations', 'Cloud Systems', 'Industry-specific'],
    href: 'consulting.html', specs: [['Fit', 5], ['Flexibility', 5], ['Support', 4]]
  },
];

function dotsHtml(on, total = 5) {
  let s = '';
  for (let i = 0; i < total; i++) s += `<i class="${i < on ? 'on' : ''}"></i>`;
  return s;
}

function renderCapDiagram(theme) {
  const diagrams = {
    crm: `
      <svg class="cap-diagram" viewBox="0 0 240 140" aria-hidden="true">
        <line x1="120" y1="70" x2="48" y2="32" class="cap-line"/>
        <line x1="120" y1="70" x2="192" y2="32" class="cap-line"/>
        <line x1="120" y1="70" x2="40" y2="108" class="cap-line"/>
        <line x1="120" y1="70" x2="200" y2="108" class="cap-line"/>
        <circle cx="48" cy="32" r="10" class="cap-node cap-orbit-a"/>
        <circle cx="192" cy="32" r="10" class="cap-node cap-orbit-b"/>
        <circle cx="40" cy="108" r="10" class="cap-node cap-orbit-c"/>
        <circle cx="200" cy="108" r="10" class="cap-node cap-orbit-d"/>
        <circle cx="120" cy="70" r="16" class="cap-node cap-node-core"/>
        <circle cx="120" cy="70" r="28" class="cap-ring"/>
      </svg>`,
    ops: `
      <svg class="cap-diagram" viewBox="0 0 240 140" aria-hidden="true">
        <path d="M24 100 Q80 20 120 70 T216 40" class="cap-route" fill="none"/>
        <circle cx="24" cy="100" r="6" class="cap-node"/>
        <circle cx="120" cy="70" r="6" class="cap-node"/>
        <circle cx="216" cy="40" r="6" class="cap-node"/>
        <circle r="7" class="cap-runner">
          <animateMotion dur="4s" repeatCount="indefinite" path="M24 100 Q80 20 120 70 T216 40"/>
        </circle>
      </svg>`,
    intel: `
      <svg class="cap-diagram cap-diagram-bars" viewBox="0 0 240 140" aria-hidden="true">
        <rect x="36" y="90" width="22" height="40" class="cap-bar" style="--h:40"/>
        <rect x="72" y="70" width="22" height="60" class="cap-bar" style="--h:60"/>
        <rect x="108" y="50" width="22" height="80" class="cap-bar" style="--h:80"/>
        <rect x="144" y="62" width="22" height="68" class="cap-bar" style="--h:68"/>
        <rect x="180" y="38" width="22" height="92" class="cap-bar" style="--h:92"/>
        <line x1="20" y1="130" x2="220" y2="130" class="cap-axis"/>
      </svg>`,
    mobile: `
      <div class="cap-diagram cap-diagram-gps" aria-hidden="true">
        <span class="cap-pulse cap-pulse-1"></span>
        <span class="cap-pulse cap-pulse-2"></span>
        <span class="cap-pulse cap-pulse-3"></span>
        <span class="cap-pin"></span>
      </div>`,
    sync: `
      <svg class="cap-diagram" viewBox="0 0 240 140" aria-hidden="true">
        <line x1="60" y1="40" x2="180" y2="40" class="cap-line cap-flow"/>
        <line x1="60" y1="100" x2="180" y2="100" class="cap-line cap-flow cap-flow-rev"/>
        <line x1="60" y1="40" x2="60" y2="100" class="cap-line"/>
        <line x1="180" y1="40" x2="180" y2="100" class="cap-line"/>
        <rect x="44" y="24" width="32" height="32" rx="6" class="cap-block"/>
        <rect x="164" y="24" width="32" height="32" rx="6" class="cap-block"/>
        <rect x="44" y="84" width="32" height="32" rx="6" class="cap-block"/>
        <rect x="164" y="84" width="32" height="32" rx="6" class="cap-block"/>
        <rect x="104" y="54" width="32" height="32" rx="6" class="cap-block cap-block-core"/>
      </svg>`,
    ai: `
      <svg class="cap-diagram" viewBox="0 0 240 140" aria-hidden="true">
        <line x1="40" y1="70" x2="100" y2="40" class="cap-line"/>
        <line x1="100" y1="40" x2="160" y2="70" class="cap-line"/>
        <line x1="160" y1="70" x2="200" y2="100" class="cap-line"/>
        <line x1="100" y1="40" x2="100" y2="100" class="cap-line"/>
        <circle cx="40" cy="70" r="8" class="cap-node cap-blink-a"/>
        <circle cx="100" cy="40" r="10" class="cap-node cap-node-core cap-blink-b"/>
        <circle cx="160" cy="70" r="8" class="cap-node cap-blink-c"/>
        <circle cx="200" cy="100" r="8" class="cap-node cap-blink-d"/>
        <circle cx="100" cy="100" r="8" class="cap-node cap-blink-e"/>
      </svg>`,
  };
  return diagrams[theme] || diagrams.crm;
}

const WHATSAPP_URL = 'https://wa.me/27646552995';
const MOBILE_NAV_BREAKPOINT = 768;
const LINKEDIN_URL = 'https://www.linkedin.com/in/4ds-solutions-33ab62417';
const SITE_CONTACT_EMAIL = '4dssolutions@gmail.com';
const PRICING_URL = 'pricing.html';
const NEXUS_URL = 'solutions/nexus.html';
const CUSTOM_SOLUTIONS_URL = 'custom-solutions.html';

const SERVICE_CATEGORIES = [
  { label: 'Software Solutions', links: [
    { title: '4DS Nexus CRM & ERP', href: 'solutions/nexus.html' },
    { title: 'Custom Business Systems', href: 'consulting.html#software' },
    { title: 'Fleet Management Systems', href: 'custom-solutions.html' },
    { title: 'Security Management Systems', href: 'industries.html' },
    { title: 'Asset Tracking Solutions', href: 'services/inventory.html' },
  ]},
  { label: 'Web Development', links: [
    { title: 'Business Websites', href: 'consulting.html#web' },
    { title: 'Website Upgrades', href: 'consulting.html#web' },
    { title: 'E-commerce Websites', href: 'pricing.html#professional-services' },
    { title: 'Customer Portals', href: 'consulting.html#web' },
    { title: 'Web Applications', href: 'consulting.html#web' },
    { title: 'Website Maintenance', href: 'consulting.html#web' },
  ]},
  { label: 'Mobile Development', links: [
    { title: 'Android Apps', href: 'services/mobile.html' },
    { title: 'iOS Apps', href: 'services/mobile.html' },
    { title: 'Progressive Web Apps', href: 'services/mobile.html' },
    { title: 'Field Service Apps', href: 'services/mobile.html' },
    { title: 'Tracking Applications', href: 'custom-solutions.html' },
  ]},
  { label: 'Business Automation', links: [
    { title: 'Workflow Automation', href: 'consulting.html#automation' },
    { title: 'Document Automation', href: 'consulting.html#automation' },
    { title: 'Email Automation', href: 'consulting.html#automation' },
    { title: 'Reporting Automation', href: 'consulting.html#automation' },
    { title: 'Client Onboarding Automation', href: 'consulting.html#automation' },
  ]},
  { label: 'Business Operations', links: [
    { title: 'POS Systems', href: 'pricing.html#pos' },
    { title: 'Inventory Management', href: 'services/inventory.html' },
    { title: 'Dispatch Systems', href: 'custom-solutions.html' },
    { title: 'Employee Management', href: 'services/crm.html' },
    { title: 'Visitor Management', href: 'industries.html' },
  ]},
  { label: 'Tracking & Security', links: [
    { title: 'Vehicle Tracking', href: 'custom-solutions.html' },
    { title: 'Fleet Tracking', href: 'custom-solutions.html' },
    { title: 'Patrol Monitoring', href: 'industries.html' },
    { title: 'Incident Reporting', href: 'industries.html' },
    { title: 'Access Control Systems', href: 'industries.html' },
  ]},
  { label: 'Consulting & Integration', links: [
    { title: 'Digital Transformation', href: 'consulting.html#consulting' },
    { title: 'Cloud Migration', href: 'consulting.html#consulting' },
    { title: 'API Integration', href: 'consulting.html#consulting' },
    { title: 'System Integration', href: 'consulting.html#consulting' },
    { title: 'Technology Consulting', href: 'consulting.html#consulting' },
  ]},
];

const SERVICES = [
  { id: 'nexus', icon: 'bolt', title: '4DS Nexus CRM & ERP', desc: 'Connected platform for CRM and operations', href: 'solutions/nexus.html' },
  { id: 'custom', icon: 'wrench', title: 'Custom Software Development', desc: 'Custom systems for your operation', href: 'consulting.html#software' },
  { id: 'websites', icon: 'monitor', title: 'Website Development', desc: 'New sites, upgrades, e-commerce, and portals', href: 'consulting.html#web' },
  { id: 'mobile', icon: 'phone', title: 'Mobile App Development', desc: 'Android, iOS, and cross-platform apps', href: 'services/mobile.html' },
  { id: 'pos', icon: 'cart', title: 'POS Systems', desc: 'Retail checkout and inventory-linked sales', href: 'pricing.html#pos' },
  { id: 'fleet', icon: 'truck', title: 'Vehicle & Fleet Tracking', desc: 'GPS, dispatch, and asset visibility', href: 'custom-solutions.html' },
  { id: 'automation', icon: 'gear', title: 'Business Automation', desc: 'Workflows, documents, and notifications', href: 'consulting.html#automation' },
  { id: 'security', icon: 'shield', title: 'Security Management Systems', desc: 'Guards, patrols, incidents, and sites', href: 'industries.html' },
];

const MODULE_EXPLORER = [
  { id: 'nexus', tab: 'Nexus', icon: 'bolt', title: '4DS Nexus CRM & ERP', desc: 'Core platform from R599/month, with add-on modules and bundles from R1,299/month.', features: ['Central dashboard & reporting', 'User & role management', 'Inventory & employee modules', 'Customer portal access', 'Fleet & visitor add-ons', 'AI automation add-on'], outcomes: ['One shared database', 'Operational visibility', 'Scalable from startup to enterprise', 'South African support'], href: 'solutions/nexus.html' },
  { id: 'custom', tab: 'Custom', icon: 'wrench', title: 'Custom Software Development', desc: 'Cloud-based business systems and integrations built around your workflows, quoted and delivered properly.', features: ['Custom module development', 'CRM and ERP builds', 'API and system integrations', 'Cloud deployment', 'Industry-specific workflows', 'Internal business platforms'], outcomes: ['Built for your process', 'Scalable foundation', 'Practical delivery', 'Long-term partnership'], href: 'consulting.html#software' },
  { id: 'websites', tab: 'Websites', icon: 'monitor', title: 'Website Development', desc: 'Professional business websites, upgrades, landing pages, and client portals, mobile-responsive, on-brand, and ready to grow.', features: ['Business and corporate websites', 'Website redesigns and upgrades', 'Landing pages and portfolios', 'E-commerce stores', 'SEO setup and maintenance', 'Hosting and domain setup', 'Contact and enquiry forms'], outcomes: ['Stronger online presence', 'Professional client experience', 'Mobile-ready design', 'Clear starting prices'], href: 'pricing.html#professional-services' },
  { id: 'mobile', tab: 'Mobile', icon: 'phone', title: 'Mobile App Development', desc: 'Android, iOS, and cross-platform apps for field teams, clients, and employees, connected to your operations.', features: ['Android and iOS applications', 'Business management apps', 'Client and employee portals', 'Field service apps', 'Tracking applications', 'Progressive web apps (PWA)'], outcomes: ['Field teams stay connected', 'Real-time data capture', 'Better client experience', 'Apps that match your brand'], href: 'services/mobile.html' },
  { id: 'pos', tab: 'POS', icon: 'cart', title: 'POS Systems', desc: 'Retail POS, inventory-linked checkout, multi-branch sales, and reporting, easy for clients to understand and adopt.', features: ['Retail POS systems', 'Inventory and stock tracking', 'Barcode scanning', 'Sales reporting', 'Multi-branch POS', 'Customer loyalty programs'], outcomes: ['Faster checkout', 'Stock linked to sales', 'Multi-site visibility', 'Clear operational reporting'], href: 'pricing.html#pos' },
  { id: 'fleet', tab: 'Fleet', icon: 'truck', title: 'Vehicle & Fleet Tracking', desc: 'Vehicle tracking, fleet management, dispatch, and asset visibility, scoped as custom solutions for your operation.', features: ['Vehicle and asset records', 'GPS tracking integration', 'Dispatch management', 'Maintenance tracking', 'Multi-site visibility', 'Custom reporting'], outcomes: ['Asset visibility', 'Better dispatch control', 'Scoped delivery', 'Industry-fit setup'], href: 'custom-solutions.html' },
  { id: 'automation', tab: 'Automation', icon: 'gear', title: 'Business Automation', desc: 'Workflow, document, email, and reporting automation, less manual admin and faster response times.', features: ['Workflow automation', 'Document automation', 'Email and notification flows', 'Reporting automation', 'Client onboarding automation', 'WhatsApp and SMS notifications'], outcomes: ['Less manual admin', 'Faster response times', 'Consistent follow-ups', 'Reliable notifications'], href: 'consulting.html#automation' },
  { id: 'security', tab: 'Security', icon: 'shield', title: 'Security Management Systems', desc: 'Systems for guard scheduling, patrol monitoring, incident reporting, visitor management, and client contracts.', features: ['Guard and shift scheduling', 'Patrol monitoring', 'Incident reporting', 'Visitor management', 'Site and contract management', 'Workforce visibility'], outcomes: ['Better site coverage', 'Documented incidents', 'Organised operations', 'Client transparency'], href: 'industries.html' },
];

const CONNECT_ACCORDION = [
  { title: 'CRM ↔ Inventory & Sales', body: 'Customer records, sales activity, and stock levels stay in sync, no duplicate entry across spreadsheets and systems.' },
  { title: 'Client Portals ↔ CRM', body: 'Clients view documents, tickets, and updates through a secure portal connected to your central customer records.' },
  { title: 'Mobile ↔ Field Operations', body: 'Field teams capture jobs, forms, and status updates on mobile, synced back to your dashboard in real time.' },
  { title: 'Reporting ↔ Every Module', body: 'Dashboards and reports draw from one connected data layer, giving leadership a clear view across the business.' },
];

function getBasePath() {
  const path = window.location.pathname;
  if (path.includes('/services/') || path.includes('/solutions/')) return '../';
  return '';
}

function renderHeader() {
  const base = getBasePath();
  const current = window.location.pathname.split('/').pop() || 'index.html';

  const isActive = (pages) => pages.some(p => current === p || current.includes(p));

  const servicesMega = SERVICE_CATEGORIES.map(cat => `
    <div class="mega-menu-category">
      <p class="mega-category-label">${cat.label}</p>
      <div class="mega-category-links">
        ${cat.links.map(l => `<a href="${base}${l.href}">${l.title}</a>`).join('')}
      </div>
    </div>
  `).join('');

  const mobileServicesPanel = SERVICE_CATEGORIES.map(cat => `
    <div class="mobile-dropdown-group">
      <p class="mobile-dropdown-label">${cat.label}</p>
      ${cat.links.map(l => `<a href="${base}${l.href}" class="mobile-dropdown-link">${l.title}</a>`).join('')}
    </div>
  `).join('');

  return `
    <header class="site-header" id="siteHeader">
      <div class="container">
        <div class="header-inner">
        <a href="${base}index.html" class="logo" aria-label="4DS Nexus home">
          <span class="logo-mark-wrap">
            <img class="logo-mark" src="${base}assets/4ds-logo-wordmark.png" width="847" height="334" alt="4DS">
          </span>
          <span class="logo-text">
            <span class="logo-suffix">Nexus</span>
          </span>
        </a>
        <nav class="main-nav" id="mainNav">
          <div class="nav-item" data-nav-priority="1">
            <a href="${base}index.html" class="nav-link ${current === 'index.html' || current === '' ? 'active' : ''}">Home</a>
            <template class="nav-overflow-template"><a href="${base}index.html" class="mobile-nav-link">Home</a></template>
          </div>
          <div class="nav-item" data-nav-priority="2">
            <a href="${base}about.html" class="nav-link ${current === 'about.html' ? 'active' : ''}">About</a>
            <template class="nav-overflow-template"><a href="${base}about.html" class="mobile-nav-link">About</a></template>
          </div>
          <div class="nav-item" data-nav-priority="3">
            <a href="${base}consulting.html" class="nav-link ${isActive(SERVICES.map(s => s.href.split('/').pop())) ? 'active' : ''}">
              Services
              <svg viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5"/></svg>
            </a>
            <div class="mega-menu">
              <div class="mega-menu-categories">${servicesMega}</div>
              <div class="mega-menu-footer">
                <a href="${base}consulting.html#web">Website development →</a>
                <a href="${base}solutions/nexus.html">View all modules on 4DS Nexus →</a>
                <a href="${base}${PRICING_URL}">View pricing →</a>
              </div>
            </div>
            <template class="nav-overflow-template">
              <div class="mobile-dropdown">
                <button type="button" class="mobile-dropdown-toggle" aria-expanded="false">
                  <span>Services</span>
                  <svg class="mobile-dropdown-chevron" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </button>
                <div class="mobile-dropdown-panel">
                  <div class="mobile-dropdown-panel-inner">${mobileServicesPanel}</div>
                </div>
              </div>
            </template>
          </div>
          <div class="nav-item" data-nav-priority="4">
            <a href="${base}${NEXUS_URL}" class="nav-link ${current === 'nexus.html' ? 'active' : ''}">
              Solutions
              <svg viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5"/></svg>
            </a>
            <div class="mega-menu" style="min-width:320px">
              <div class="mega-menu-grid" style="grid-template-columns:1fr">
                <a href="${base}${NEXUS_URL}#modules" class="mega-link">
                  <div class="mega-icon">${iconSvg('bolt')}</div>
                  <div>
                    <h4>4DS Nexus Platform</h4>
                    <p>CRM, business websites, client portals, inventory, and mobile apps, one company, connected systems.</p>
                  </div>
                </a>
                <a href="${base}consulting.html#web" class="mega-link">
                  <div class="mega-icon">${iconSvg('monitor')}</div>
                  <div>
                    <h4>Website Development</h4>
                    <p>Business websites, upgrades, landing pages, and e-commerce, built by the same team as 4DS Nexus.</p>
                  </div>
                </a>
                <a href="${base}${PRICING_URL}" class="mega-link">
                  <div class="mega-icon">${iconSvg('chart')}</div>
                  <div>
                    <h4>Modular Pricing</h4>
                    <p>Core from R599/month, bundles from R1,299/month, and enterprise plans from R4,999/month.</p>
                  </div>
                </a>
                <a href="${base}future-platforms.html" class="mega-link">
                  <div class="mega-icon">${iconSvg('robot')}</div>
                  <div>
                    <h4>Coming Soon <span class="coming-soon-badge coming-soon-badge--inline">Roadmap</span></h4>
                    <p>AI assistant, predictive analytics, and advanced BI, on our roadmap, not live yet.</p>
                  </div>
                </a>
                <a href="${base}${CUSTOM_SOLUTIONS_URL}" class="mega-link">
                  <div class="mega-icon">${iconSvg('puzzle')}</div>
                  <div>
                    <h4>Custom Solutions</h4>
                    <p>Fleet tracking, dispatch, GPS monitoring, and industry-specific builds, scoped per client.</p>
                  </div>
                </a>
              </div>
            </div>
            <template class="nav-overflow-template">
              <div class="mobile-dropdown">
                <button type="button" class="mobile-dropdown-toggle" aria-expanded="false">
                  <span>Solutions</span>
                  <svg class="mobile-dropdown-chevron" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </button>
                <div class="mobile-dropdown-panel">
                  <div class="mobile-dropdown-panel-inner">
                    <a href="${base}${NEXUS_URL}#modules" class="mobile-dropdown-link">4DS Nexus Platform</a>
                    <a href="${base}consulting.html#web" class="mobile-dropdown-link">Website Development</a>
                    <a href="${base}digital-transformation.html" class="mobile-dropdown-link">Digital Transformation</a>
                    <a href="${base}${CUSTOM_SOLUTIONS_URL}" class="mobile-dropdown-link">Custom Solutions</a>
                    <a href="${base}future-platforms.html" class="mobile-dropdown-link">Coming Soon</a>
                    <a href="${base}${PRICING_URL}" class="mobile-dropdown-link">Pricing</a>
                  </div>
                </div>
              </div>
            </template>
          </div>
          <div class="nav-item" data-nav-priority="5">
            <a href="${base}industries.html" class="nav-link ${current === 'industries.html' ? 'active' : ''}">Industries</a>
            <template class="nav-overflow-template"><a href="${base}industries.html" class="mobile-nav-link">Industries</a></template>
          </div>
          <div class="nav-item" data-nav-priority="6">
            <a href="${base}${PRICING_URL}" class="nav-link ${current === 'pricing.html' ? 'active' : ''}">Pricing</a>
            <template class="nav-overflow-template"><a href="${base}${PRICING_URL}" class="mobile-nav-link">Pricing</a></template>
          </div>
        </nav>
        <div class="header-tools">
          <button type="button" class="theme-toggle" id="themeToggle" aria-label="Switch to dark mode" title="Toggle theme">
            <svg class="theme-icon theme-icon-sun" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.8"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
            <svg class="theme-icon theme-icon-moon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M21 14.5A8.5 8.5 0 0 1 9.5 3 7 7 0 1 0 21 14.5z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>
          </button>
          <div class="header-actions">
            <a href="${base}solutions/nexus.html" class="btn btn-outline">Explore Nexus</a>
            <a href="${base}contact.html?interest=demo#contact-form" class="btn btn-primary">Book a Demo</a>
          </div>
          <button type="button" class="mobile-toggle" id="mobileToggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobileNav">
            <span class="mobile-toggle-box" aria-hidden="true">
              <span class="mobile-toggle-line"></span>
              <span class="mobile-toggle-line"></span>
              <span class="mobile-toggle-line"></span>
            </span>
          </button>
        </div>
        </div>
      </div>
    </header>
    <button type="button" class="mobile-nav-backdrop" id="mobileNavBackdrop" aria-label="Close menu" tabindex="-1"></button>
    <nav class="mobile-nav" id="mobileNav" aria-hidden="true">
      <div class="mobile-nav-inner">
        <div class="mobile-nav-scroll">
          <div class="mobile-nav-full" id="mobileNavFull">
          <a href="${base}index.html" class="mobile-nav-link">Home</a>
          <a href="${base}about.html" class="mobile-nav-link">About</a>
          <div class="mobile-dropdown">
            <button type="button" class="mobile-dropdown-toggle" aria-expanded="false">
              <span>Services</span>
              <svg class="mobile-dropdown-chevron" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <div class="mobile-dropdown-panel">
              <div class="mobile-dropdown-panel-inner">
                ${mobileServicesPanel}
              </div>
            </div>
          </div>
          <div class="mobile-dropdown">
            <button type="button" class="mobile-dropdown-toggle" aria-expanded="false">
              <span>Solutions</span>
              <svg class="mobile-dropdown-chevron" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <div class="mobile-dropdown-panel">
              <div class="mobile-dropdown-panel-inner">
                <a href="${base}${NEXUS_URL}#modules" class="mobile-dropdown-link">4DS Nexus Platform</a>
                <a href="${base}consulting.html#web" class="mobile-dropdown-link">Website Development</a>
                <a href="${base}digital-transformation.html" class="mobile-dropdown-link">Digital Transformation</a>
                <a href="${base}${CUSTOM_SOLUTIONS_URL}" class="mobile-dropdown-link">Custom Solutions</a>
                <a href="${base}future-platforms.html" class="mobile-dropdown-link">Coming Soon</a>
                <a href="${base}${PRICING_URL}" class="mobile-dropdown-link">Pricing</a>
              </div>
            </div>
          </div>
          <a href="${base}industries.html" class="mobile-nav-link">Industries</a>
          <a href="${base}${PRICING_URL}" class="mobile-nav-link">Pricing</a>
          <a href="${base}contact.html" class="mobile-nav-link">Contact</a>
          </div>
          <div class="mobile-nav-overflow" id="mobileNavOverflow" hidden>
            <p class="mobile-nav-overflow-label">More</p>
          </div>
        </div>
        <div class="mobile-nav-actions">
          <a href="${base}${PRICING_URL}" class="btn btn-outline">View Pricing</a>
          <a href="${base}contact.html" class="btn btn-primary">Request Information</a>
        </div>
      </div>
    </nav>
  `;
}

function renderFooter() {
  const base = getBasePath();
  return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-website-callout">
          <div class="footer-website-callout-copy">
            <strong>We build &amp; upgrade websites too.</strong>
            <span>New sites, redesigns, landing pages &amp; e-commerce, scoped and quoted per project.</span>
          </div>
          <div class="footer-website-callout-actions">
            <a href="${base}contact.html?interest=website#contact-form" class="btn btn-outline btn-sm">Get a Quote</a>
          </div>
        </div>
        <div class="footer-grid">
          <div class="footer-col">
            <h4>Explore</h4>
            <a href="${base}about.html">About</a>
            <a href="${base}solutions/nexus.html">Platform</a>
            <a href="${base}${PRICING_URL}">Pricing</a>
            <a href="${base}industries.html">Industries</a>
            <a href="${base}areas-served.html">Areas We Serve</a>
            <a href="${base}contact.html">Contact</a>
          </div>
          <div class="footer-col">
            <h4>Solutions</h4>
            <a href="${base}solutions/nexus.html">4DS Nexus</a>
            <a href="${base}${PRICING_URL}">Pricing</a>
            <a href="${base}${CUSTOM_SOLUTIONS_URL}">Custom Solutions</a>
            <a href="${base}industries.html">Industry Solutions</a>
            <a href="${base}consulting.html">Consulting</a>
          </div>
          <div class="footer-col">
            <h4>Services</h4>
            <a href="${base}solutions/nexus.html">4DS Nexus CRM &amp; ERP</a>
            <a href="${base}consulting.html#web">Website Development</a>
            <a href="${base}services/mobile.html">Mobile App Development</a>
            <a href="${base}${PRICING_URL}#pos">POS Systems</a>
            <a href="${base}${CUSTOM_SOLUTIONS_URL}">Fleet &amp; Tracking</a>
            <a href="${base}contact.html#contact-form">Request a Quote</a>
          </div>
          <div class="footer-col">
            <h4>Company</h4>
            <a href="${base}about.html">4DS Solutions (Pty) Ltd</a>
            <a href="${base}solutions/nexus.html">4DS Nexus</a>
            <a href="${base}partnerships.html">Partnerships</a>
            <a href="${base}privacy.html">Privacy Policy</a>
            <a href="${base}terms.html">Terms &amp; Conditions</a>
            <a href="#" data-cookie-settings>Cookie settings</a>
          </div>
          <div class="footer-col">
            <h4>Connect</h4>
            <a href="mailto:${SITE_CONTACT_EMAIL}">${SITE_CONTACT_EMAIL}</a>
            <a href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer">+27 64 655 2995</a>
            <a href="${base}contact.html">Contact Form</a>
            <p class="footer-meta">Mon–Fri, 08:00–17:00 SAST</p>
            <p class="footer-meta">Quotes based on your modules and operation</p>
            <div class="footer-socials">
              <a href="${LINKEDIN_URL}" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="4DS Nexus on LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>
              </a>
              <a href="${WHATSAPP_URL}" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="Chat with 4DS Nexus on WhatsApp">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M.06 24l1.68-6.16a11.87 11.87 0 0 1-1.59-5.95C.15 5.32 5.5 0 12.06 0a11.82 11.82 0 0 1 8.41 3.49 11.76 11.76 0 0 1 3.48 8.4c0 6.55-5.35 11.88-11.93 11.88a11.95 11.95 0 0 1-5.7-1.45L.06 24zm6.6-3.81c1.68.99 3.28 1.59 5.4 1.59 5.45 0 9.89-4.42 9.89-9.87 0-2.64-1.03-5.12-2.9-6.99a9.82 9.82 0 0 0-6.98-2.9c-5.46 0-9.9 4.43-9.9 9.88 0 2.22.65 3.89 1.74 5.62l-.99 3.62 3.74-.95zm11.3-5.49c-.07-.12-.27-.2-.56-.34-.29-.15-1.71-.85-1.98-.94-.27-.1-.46-.15-.65.14-.19.29-.74.94-.91 1.13-.17.19-.34.22-.62.07-.29-.14-1.22-.45-2.33-1.43-.86-.77-1.44-1.72-1.61-2-.17-.29-.02-.45.12-.59.13-.13.29-.34.43-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.14-.65-1.57-.89-2.15-.24-.56-.47-.48-.65-.49l-.55-.01c-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.38 0 1.41 1.02 2.77 1.17 2.96.14.19 2.01 3.07 4.88 4.3.68.29 1.21.47 1.63.6.68.22 1.31.19 1.8.12.55-.08 1.71-.7 1.95-1.37.24-.67.24-1.25.17-1.37z"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <div class="footer-bottom-brand">
            <strong>4DS Nexus</strong>
            <span class="footer-tagline">Digital Blueprint · Platform · Websites · Upgrades · Custom Software</span>
            <span>Made in South Africa · Expanding across Africa</span>
            <span>Eco-conscious cloud operations · A division of 4DS Solutions (Pty) Ltd</span>
          </div>
          <span class="footer-copy">© 2025 4DS Nexus. All rights reserved.</span>
        </div>
      </div>
    </footer>
  `;
}

function initFavicon() {
  const base = getBasePath();
  const icons = [
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: `${base}assets/favicon-32.png` },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: `${base}assets/favicon-16.png` },
    { rel: 'apple-touch-icon', sizes: '180x180', href: `${base}assets/apple-touch-icon.png` },
  ];

  icons.forEach(({ rel, type, sizes, href }) => {
    const selector = rel === 'apple-touch-icon'
      ? 'link[rel="apple-touch-icon"]'
      : `link[rel="icon"][sizes="${sizes}"]`;
    let link = document.querySelector(selector);
    if (!link) {
      link = document.createElement('link');
      link.rel = rel;
      document.head.appendChild(link);
    }
    if (type) link.type = type;
    if (sizes) link.sizes = sizes;
    link.href = href;
  });
}

function getTheme() {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('4ds-theme', theme);
  const toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    toggle.setAttribute('title', theme === 'dark' ? 'Light mode' : 'Dark mode');
  }
  const turnstileEl = document.getElementById('turnstileWidget');
  if (turnstileEl && typeof turnstile !== 'undefined' && turnstileWidgetId !== null) {
    turnstile.remove(turnstileWidgetId);
    turnstileWidgetId = null;
    captchaVerified = false;
    initTurnstile();
  }
}

function initTheme() {
  const stored = localStorage.getItem('4ds-theme');
  if (stored === 'dark' || stored === 'light') {
    applyTheme(stored);
  } else if (document.documentElement.getAttribute('data-theme') === 'dark') {
    applyTheme('dark');
  } else {
    applyTheme('light');
  }

  if (document._themeBound) return;
  document._themeBound = true;

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#themeToggle')) return;
    applyTheme(getTheme() === 'dark' ? 'light' : 'dark');
  });
}

function initLayout() {
  initFavicon();
  const headerEl = document.getElementById('header-placeholder');
  const footerEl = document.getElementById('footer-placeholder');
  if (headerEl) {
    headerEl.innerHTML = renderHeader();
    document.body.appendChild(headerEl);
  }
  if (footerEl) footerEl.innerHTML = renderFooter();
}

function initHeader() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const toggle = document.getElementById('mobileToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileBackdrop = document.getElementById('mobileNavBackdrop');
  if (toggle && mobileNav) {
    const setMenuOpen = (open) => {
      mobileNav.classList.toggle('open', open);
      mobileBackdrop?.classList.toggle('open', open);
      toggle.classList.toggle('is-active', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      mobileNav.setAttribute('aria-hidden', String(!open));
      document.documentElement.classList.toggle('mobile-nav-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
      if (!open) {
        mobileNav.querySelectorAll('.mobile-dropdown.open').forEach(d => {
          d.classList.remove('open');
          d.querySelector('.mobile-dropdown-toggle')?.setAttribute('aria-expanded', 'false');
        });
      }
    };

    const closeMenu = () => setMenuOpen(false);

    if (!toggle.dataset.bound) {
      toggle.dataset.bound = '1';
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        setMenuOpen(!mobileNav.classList.contains('open'));
      });
      mobileBackdrop?.addEventListener('click', closeMenu);
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav.classList.contains('open')) closeMenu();
      });
      if (!mobileNav.dataset.interactionsBound) {
        mobileNav.dataset.interactionsBound = '1';
        mobileNav.addEventListener('click', (e) => {
          const dropdownBtn = e.target.closest('.mobile-dropdown-toggle');
          if (dropdownBtn) {
            e.preventDefault();
            const item = dropdownBtn.closest('.mobile-dropdown');
            const willOpen = !item.classList.contains('open');
            mobileNav.querySelectorAll('.mobile-dropdown.open').forEach(d => {
              d.classList.remove('open');
              d.querySelector('.mobile-dropdown-toggle')?.setAttribute('aria-expanded', 'false');
            });
            if (willOpen) {
              item.classList.add('open');
              dropdownBtn.setAttribute('aria-expanded', 'true');
            }
            return;
          }
          if (e.target.closest('a[href]')) closeMenu();
        });
      }
    }
  }

  initResponsiveNav();
  initMegaMenus();
}

function initResponsiveNav() {
  const header = document.getElementById('siteHeader');
  const headerInner = header?.querySelector('.header-inner');
  const mainNav = document.getElementById('mainNav');
  const mobileNavFull = document.getElementById('mobileNavFull');
  const mobileNavOverflow = document.getElementById('mobileNavOverflow');
  const mobileNav = document.getElementById('mobileNav');
  if (!header || !headerInner || !mainNav || !mobileNavOverflow) return;

  const navItems = [...mainNav.querySelectorAll('.nav-item')];
  const overflowLabel = mobileNavOverflow.querySelector('.mobile-nav-overflow-label');
  let frame = 0;

  const scheduleUpdate = () => {
    if (frame) cancelAnimationFrame(frame);
    frame = requestAnimationFrame(updateNavOverflow);
  };

  const updateNavOverflow = () => {
    frame = 0;
    const isMobile = window.innerWidth <= MOBILE_NAV_BREAKPOINT;

    if (isMobile) {
      header.classList.remove('header-has-overflow');
      document.documentElement.classList.remove('nav-overflow-active');
      mobileNav?.classList.remove('mobile-nav--overflow-only');
      navItems.forEach(item => item.classList.remove('nav-item--hidden'));
      mainNav.style.removeProperty('max-width');
      mobileNavFull?.removeAttribute('hidden');
      mobileNavOverflow.setAttribute('hidden', '');
      while (overflowLabel.nextSibling) {
        overflowLabel.nextSibling.remove();
      }
      return;
    }

    navItems.forEach(item => item.classList.remove('nav-item--hidden'));
    mainNav.style.removeProperty('max-width');

    const logo = headerInner.querySelector('.logo');
    const tools = headerInner.querySelector('.header-tools');
    const gap = parseFloat(getComputedStyle(headerInner).columnGap || getComputedStyle(headerInner).gap) || 12;
    const available = headerInner.clientWidth - (logo?.offsetWidth || 0) - (tools?.offsetWidth || 0) - gap * 2;
    mainNav.style.maxWidth = `${Math.max(120, available)}px`;

    const navGap = parseFloat(getComputedStyle(mainNav).columnGap || getComputedStyle(mainNav).gap) || 2;
    const navWidth = () => {
      const visible = navItems.filter(item => !item.classList.contains('nav-item--hidden'));
      if (!visible.length) return 0;
      return visible.reduce((sum, item) => sum + item.offsetWidth, 0) + navGap * (visible.length - 1);
    };
    const fits = () => navWidth() <= mainNav.clientWidth + 1;
    const hidden = [];

    if (!fits()) {
      const hideOrder = [...navItems].sort(
        (a, b) => Number(b.dataset.navPriority || 0) - Number(a.dataset.navPriority || 0)
      );
      for (const item of hideOrder) {
        if (fits()) break;
        item.classList.add('nav-item--hidden');
        hidden.push(item);
      }
      hidden.sort(
        (a, b) => Number(a.dataset.navPriority || 0) - Number(b.dataset.navPriority || 0)
      );
    }

    const hasOverflow = hidden.length > 0;
    header.classList.toggle('header-has-overflow', hasOverflow);
    document.documentElement.classList.toggle('nav-overflow-active', hasOverflow);
    mobileNav?.classList.toggle('mobile-nav--overflow-only', hasOverflow);

    mobileNavFull?.toggleAttribute('hidden', hasOverflow);
    mobileNavOverflow.toggleAttribute('hidden', !hasOverflow);

    while (overflowLabel.nextSibling) {
      overflowLabel.nextSibling.remove();
    }

    if (hasOverflow) {
      hidden.forEach(item => {
        const tpl = item.querySelector('.nav-overflow-template');
        if (tpl?.content) {
          mobileNavOverflow.appendChild(tpl.content.cloneNode(true));
        }
      });
    }
  };

  if (!header.dataset.overflowBound) {
    header.dataset.overflowBound = '1';
    const observer = new ResizeObserver(scheduleUpdate);
    observer.observe(headerInner);
    window.addEventListener('resize', scheduleUpdate, { passive: true });
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    if (document.fonts?.ready) document.fonts.ready.then(scheduleUpdate);
  }

  scheduleUpdate();
}

function initMegaMenus() {
  const navItems = document.querySelectorAll('.main-nav .nav-item');
  if (!navItems.length) return;

  const closeAll = () => {
    navItems.forEach(item => {
      item.classList.remove('open');
      item.querySelector('.nav-link')?.setAttribute('aria-expanded', 'false');
    });
  };

  navItems.forEach(item => {
    const menu = item.querySelector('.mega-menu');
    const trigger = item.querySelector('.nav-link');
    if (!menu || !trigger) return;

    trigger.setAttribute('aria-haspopup', 'true');
    trigger.setAttribute('aria-expanded', 'false');

    trigger.addEventListener('click', (e) => {
      if (window.matchMedia(`(max-width: ${MOBILE_NAV_BREAKPOINT}px)`).matches) return;
      e.preventDefault();
      const isOpen = item.classList.contains('open');
      closeAll();
      if (!isOpen) {
        item.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item')) closeAll();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAll();
  });
}

function initHeroCarousel() {
  const hero = document.querySelector('.hero');
  const track = document.querySelector('.hero-slides');
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  if (!slides.length) return;

  const AUTOPLAY_MS = 6000;
  const RESUME_DELAY_MS = 4000;
  const SWIPE_THRESHOLD = 50;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let current = 0;
  let interval;
  let resumeTimer;
  const pause = { hidden: false, interacting: false };

  function isPaused() {
    return reducedMotion || pause.hidden || pause.interacting;
  }

  function syncAutoplay() {
    clearInterval(interval);
    interval = null;
    if (!isPaused()) {
      interval = setInterval(() => goTo(current + 1), AUTOPLAY_MS);
    }
  }

  function markManualUse() {
    pause.interacting = true;
    syncAutoplay();
    scheduleResume();
  }

  function scheduleResume() {
    clearTimeout(resumeTimer);
    resumeTimer = setTimeout(() => {
      pause.interacting = false;
      syncAutoplay();
    }, RESUME_DELAY_MS);
  }

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    dots[current]?.setAttribute('aria-selected', 'false');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
    dots[current]?.setAttribute('aria-selected', 'true');
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      goTo(i);
      markManualUse();
    });
  });

  if (hero) {
    hero.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goTo(current - 1);
        markManualUse();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goTo(current + 1);
        markManualUse();
      }
    });
  }

  document.addEventListener('visibilitychange', () => {
    pause.hidden = document.hidden;
    syncAutoplay();
  });

  if (track) {
    let startX = 0;
    let startY = 0;
    let dragged = false;

    track.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      startX = e.clientX;
      startY = e.clientY;
      dragged = false;
      markManualUse();
      track.classList.add('is-dragging');
    });

    track.addEventListener('pointermove', (e) => {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (Math.abs(dx) > 8 || Math.abs(dy) > 8) dragged = true;
    });

    track.addEventListener('pointerup', (e) => {
      track.classList.remove('is-dragging');
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (dragged && Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > SWIPE_THRESHOLD) {
        goTo(current + (dx < 0 ? 1 : -1));
      }
      scheduleResume();
    });

    track.addEventListener('pointercancel', () => {
      track.classList.remove('is-dragging');
      scheduleResume();
    });
  }

  syncAutoplay();
}

function initTabs(containerSelector, tabSelector, panelSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const tabs = container.querySelectorAll(tabSelector);
  const panels = container.querySelectorAll(panelSelector);

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      panels[i]?.classList.add('active');
    });
  });
}

function initModuleTabs() {
  const tabs = document.querySelectorAll('.module-tab');
  const panels = document.querySelectorAll('.module-panel');
  if (!tabs.length) return;

  function activateModule(moduleId) {
    const tab = document.querySelector(`.module-tab[data-module="${moduleId}"]`);
    if (!tab || tab.classList.contains('active')) return;

    tabs.forEach(t => {
      t.classList.remove('active', 'is-loading', 'is-pressing', 'module-tab--snap');
    });
    panels.forEach(p => p.classList.remove('active', 'module-panel-enter'));
    tab.classList.add('active', 'is-loading', 'module-tab--snap');
    const panel = document.getElementById(moduleId);
    window.setTimeout(() => {
      tab.classList.remove('is-loading');
      if (panel) {
        panel.classList.add('active', 'module-panel-enter');
        panel.addEventListener('animationend', () => panel.classList.remove('module-panel-enter'), { once: true });
      }
    }, 160);
  }

  function syncFromHash() {
    const id = location.hash.replace('#', '');
    if (id.startsWith('mod-')) activateModule(id);
  }

  tabs.forEach(tab => {
    const releasePress = () => tab.classList.remove('is-pressing');

    tab.addEventListener('mousedown', () => {
      if (!tab.classList.contains('active')) tab.classList.add('is-pressing');
    });
    tab.addEventListener('mouseup', releasePress);
    tab.addEventListener('mouseleave', releasePress);
    tab.addEventListener('touchstart', () => {
      if (!tab.classList.contains('active')) tab.classList.add('is-pressing');
    }, { passive: true });
    tab.addEventListener('touchend', releasePress);

    tab.addEventListener('click', () => {
      if (tab.classList.contains('active')) return;
      activateModule(tab.dataset.module);
      history.replaceState(null, '', `#${tab.dataset.module}`);
    });
  });

  syncFromHash();
  window.addEventListener('hashchange', syncFromHash);
}

function initNexusFlow() {
  const flow = document.querySelector('.nexus-flow--interactive');
  if (!flow) return;
  const items = flow.querySelectorAll('.nexus-flow-item');
  items.forEach(item => {
    item.addEventListener('click', () => {
      items.forEach(el => {
        el.classList.remove('active');
        el.setAttribute('aria-pressed', 'false');
      });
      item.classList.add('active');
      item.setAttribute('aria-pressed', 'true');
    });
  });
}

function initStaggerReveal() {
  const groups = document.querySelectorAll('.reveal-stagger');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });
  groups.forEach(el => observer.observe(el));
}

function renderHomeModuleExplorer() {
  const root = document.getElementById('homeModuleExplorer');
  if (!root) return;
  const base = getBasePath();

  const tabs = MODULE_EXPLORER.map((m, i) =>
    `<button type="button" class="module-tab${i === 0 ? ' active' : ''}" data-module="home-mod-${m.id}">${m.tab}</button>`
  ).join('');

  const panels = MODULE_EXPLORER.map((m, i) => {
    const features = m.features.map(f => `<li>${f}</li>`).join('');
    const outcomes = m.outcomes.map(o => `<li>${o}</li>`).join('');
    return `
      <div class="module-panel${i === 0 ? ' active' : ''}" id="home-mod-${m.id}">
        <div class="module-header">
          <div class="module-header-icon">${iconSvg(m.icon)}</div>
          <div>
            <h2><a href="${base}${m.href}" class="module-panel-title-link">${m.title}</a></h2>
            <p>${m.desc}</p>
          </div>
        </div>
        <div class="module-columns">
          <div class="module-column-card module-column-card--features">
            <h3>Features</h3>
            <ul class="module-feature-list">${features}</ul>
          </div>
          <div class="module-column-card module-column-card--benefits">
            <h3>Benefits</h3>
            <ul class="feature-list module-benefits">${m.outcomes.map(o => `<li>${o}</li>`).join('')}</ul>
          </div>
        </div>
        <div class="benefits-box">
          <h4>Key Outcomes</h4>
          <ul>${outcomes}</ul>
        </div>
        <a href="${base}${m.href}" class="card-link module-explorer-link">Full ${m.tab} details →</a>
      </div>`;
  }).join('');

  root.innerHTML = `
    <div class="module-nav reveal">${tabs}</div>
    <div class="module-explorer-panels reveal">${panels}</div>
    <p class="module-explorer-pricing reveal"><a href="${base}${PRICING_URL}" class="btn btn-outline">View modular pricing →</a></p>`;

  initIcons();
}

function renderConnectAccordion() {
  const root = document.getElementById('connectAccordion');
  if (!root) return;
  root.innerHTML = CONNECT_ACCORDION.map((item, i) => `
    <div class="accordion-item${i === 0 ? ' open' : ''}">
      <button type="button" class="accordion-trigger">${item.title}
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M5 8l5 5 5-5" stroke="currentColor" stroke-width="2"/></svg>
      </button>
      <div class="accordion-content"><div class="accordion-body">${item.body}</div></div>
    </div>`).join('');
}

function initAccordions() {
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      const wasOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });
}

function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));
}

let turnstileWidgetId = null;
let captchaVerified = false;
let turnstileUnavailable = false;

function getContactEmail() {
  return window.CONTACT_EMAIL || SITE_CONTACT_EMAIL;
}

function buildContactMailto(form) {
  const fd = new FormData(form);
  const interest = fd.get('interest') || 'General enquiry';
  const subject = encodeURIComponent(`4DS Nexus enquiry: ${interest}`);
  const body = encodeURIComponent(
    `Name: ${fd.get('firstName')} ${fd.get('lastName')}\n` +
    `Email: ${fd.get('email')}\n` +
    `Phone: ${fd.get('phone') || 'Not provided'}\n` +
    `Company: ${fd.get('company') || 'Not provided'}\n` +
    `Interest: ${interest}\n` +
    `Contact method: ${fd.get('contactMethod') || 'Not specified'}\n` +
    `Timeline: ${fd.get('priority') || 'Not specified'}\n\n` +
    `${fd.get('message') || ''}`
  );
  return `mailto:${getContactEmail()}?subject=${subject}&body=${body}`;
}

function waitForTurnstile(callback, attempts = 50) {
  if (typeof turnstile !== 'undefined') {
    callback();
  } else if (attempts > 0) {
    setTimeout(() => waitForTurnstile(callback, attempts - 1), 100);
  } else {
    turnstileUnavailable = true;
    const err = document.getElementById('captchaError');
    const btn = document.getElementById('submitBtn');
    if (err) {
      err.innerHTML = `Security check could not load. You can still email us at <a href="mailto:${getContactEmail()}">${getContactEmail()}</a> or use WhatsApp.`;
      err.classList.add('show');
    }
    if (btn) {
      btn.disabled = false;
      btn.textContent = 'Open Email to Send';
    }
  }
}

function initTurnstile() {
  const container = document.getElementById('turnstileWidget');
  if (!container || typeof turnstile === 'undefined') return;
  if (!window.TURNSTILE_SITE_KEY) return;
  if (turnstileWidgetId !== null) return;

  turnstileWidgetId = turnstile.render(container, {
    sitekey: window.TURNSTILE_SITE_KEY,
    theme: getTheme() === 'dark' ? 'dark' : 'light',
    callback: () => {
      captchaVerified = true;
      document.getElementById('captchaError')?.classList.remove('show');
      const btn = document.getElementById('submitBtn');
      if (btn) {
        btn.disabled = false;
        btn.textContent = 'Send Message';
      }
    },
    'expired-callback': () => {
      captchaVerified = false;
      const btn = document.getElementById('submitBtn');
      if (btn) btn.disabled = true;
    },
    'error-callback': () => {
      captchaVerified = false;
      const err = document.getElementById('captchaError');
      if (err) {
        err.textContent = 'Security check failed to load. Use reload below or email us directly.';
        err.classList.add('show');
      }
    },
  });
}

function setSelectValue(select, value) {
  if (!select) return false;
  const idx = [...select.options].findIndex(o => o.value === value);
  if (idx < 0) return false;
  select.selectedIndex = idx;
  select._syncCustomSelect?.();
  select.dispatchEvent(new Event('change', { bubbles: true }));
  return true;
}

const PLAN_LABELS = {
  core: '4DS Nexus Core Platform (build your own)',
  starter: 'Starter Plan',
  professional: 'Professional Plan',
  enterprise: 'Enterprise Plan',
  'starter-operations': 'Starter Plan',
  'business-operations': 'Professional Plan',
  'enterprise-operations': 'Enterprise Plan',
  setup: 'Setup & Onboarding',
};

const MODULE_LABELS = {
  'asset-management': 'Asset Management module',
  inventory: 'Inventory Management module',
  employee: 'Employee Management module',
  'customer-portal': 'Customer Portal module',
  visitor: 'Visitor Management module',
  fleet: 'Fleet Tracking module',
  'ai-automation': 'AI Automation module',
};

const SERVICE_LABELS = {
  pos: 'POS system project',
  website: 'website project',
  ecommerce: 'e-commerce project',
  'mobile-app': 'mobile app project',
  'custom-software': 'custom software project',
};

function initContactPrefill() {
  const params = new URLSearchParams(window.location.search);
  const plan = params.get('plan');
  const module = params.get('module');
  const service = params.get('service');
  const interestParam = params.get('interest');
  const interest = document.getElementById('interest');
  const message = document.getElementById('message');

  if (plan && PLAN_LABELS[plan]) {
    if (!setSelectValue(interest, plan)) return;

    if (message && !message.value.trim()) {
      message.value = `Hi, I'm interested in the ${PLAN_LABELS[plan]}. Please send me more information.`;
    }
  } else if (module && MODULE_LABELS[module]) {
    if (!setSelectValue(interest, 'pricing')) return;

    if (message && !message.value.trim()) {
      message.value = `Hi, I'm interested in adding the ${MODULE_LABELS[module]} to 4DS Nexus. Please send me more information.`;
    }
  } else if (service && SERVICE_LABELS[service]) {
    if (!setSelectValue(interest, service === 'website' || service === 'ecommerce' ? 'website' : 'other')) return;

    if (message && !message.value.trim()) {
      message.value = `Hi, I'm interested in a ${SERVICE_LABELS[service]}. Please get in touch to discuss scope and pricing.`;
    }
  } else if (interestParam === 'website') {
    if (!setSelectValue(interest, 'website')) return;

    if (message && !message.value.trim()) {
      message.value = "Hi, I'm interested in a custom website for my business. Please get in touch to discuss.";
    }
  } else if (interestParam === 'demo') {
    if (!setSelectValue(interest, 'demo')) return;

    if (message && !message.value.trim()) {
      message.value = "Hi, I'd like to book a demo of 4DS Nexus. Please let me know your available times.";
    }
  } else {
    return;
  }

  if (window.location.hash === '#contact-form') {
    requestAnimationFrame(() => {
      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn) submitBtn.disabled = true;

  const priorityFields = form.querySelectorAll('.form-priority input[required]');

  function validateField(input) {
    const valid = input.checkValidity() && input.value.trim() !== '';
    input.classList.toggle('is-invalid', !valid && input.dataset.touched === '1');
    input.setAttribute('aria-invalid', valid ? 'false' : 'true');
    return valid;
  }

  priorityFields.forEach(input => {
    const errorId = input.id + 'Error';
    if (document.getElementById(errorId)) {
      input.setAttribute('aria-describedby', errorId);
    }
    input.addEventListener('blur', () => {
      input.dataset.touched = '1';
      validateField(input);
    });
    input.addEventListener('input', () => {
      if (input.dataset.touched === '1') validateField(input);
    });
  });

  waitForTurnstile(initTurnstile);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    priorityFields.forEach(f => { f.dataset.touched = '1'; });
    const allValid = [...priorityFields].every(validateField);
    if (!allValid) {
      const firstInvalid = [...priorityFields].find(f => !validateField(f));
      firstInvalid?.focus();
      return;
    }

    const honeypot = form.querySelector('[name="website"]');
    if (honeypot?.value) return;

    const token = form.querySelector('[name="cf-turnstile-response"]')?.value;
    const captchaError = document.getElementById('captchaError');

    if (!turnstileUnavailable && (!captchaVerified || !token)) {
      if (captchaError) {
        captchaError.textContent = 'Please complete the security check before submitting.';
        captchaError.classList.add('show');
      }
      return;
    }

    captchaError?.classList.remove('show');
    setButtonLoading(submitBtn, true, turnstileUnavailable ? 'Opening email…' : 'Sending…');

    window.setTimeout(() => {
      setButtonLoading(submitBtn, false);
      if (turnstileUnavailable) {
        window.location.href = buildContactMailto(form);
        return;
      }
      form.style.display = 'none';
      const success = document.getElementById('formSuccess');
      if (success) {
        success.innerHTML = `<h3>Thank you!</h3><p>Your message is ready to send. If your email app did not open, contact us at <a href="mailto:${getContactEmail()}">${getContactEmail()}</a>.</p>`;
        success.classList.add('show');
      }
      window.location.href = buildContactMailto(form);
    }, 600);
  });
}

function initCounterAnimation() {
  const counters = document.querySelectorAll('[data-count]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      let current = 0;
      const step = Math.ceil(target / 40);
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = current + suffix;
      }, 30);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

function initCapabilities() {
  const list = document.getElementById('capList');
  const preview = document.getElementById('capPreview');
  if (!list || !preview) return;

  const base = getBasePath();
  const total = String(CAPABILITIES.length).padStart(2, '0');

  list.innerHTML = CAPABILITIES.map((c, i) => `
    <button class="cap-item ${i === 0 ? 'active' : ''}" data-index="${i}" type="button">
      <div class="cap-item-head">
        <span class="cap-num">${String(i + 1).padStart(2, '0')}</span>
        <span class="cap-title">${c.title}</span>
        <svg class="cap-arrow" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <div class="cap-desc">${c.desc}</div>
    </button>
  `).join('');

  function renderPreview(i) {
    const c = CAPABILITIES[i];
    const specs = c.specs.map(([label, on]) =>
      `<div class="cap-spec"><span class="cap-spec-label">${label}</span><span class="dots">${dotsHtml(on)}</span></div>`
    ).join('');
    const tags = c.tags.map(t => `<span>${t}</span>`).join('');

    preview.className = `cap-preview cap-theme-${c.theme}`;
    preview.innerHTML = `
      <div class="cap-blueprint-stage">
        <div class="cap-bp-scan" aria-hidden="true"></div>
        ${renderCapDiagram(c.theme)}
        <div class="cap-preview-top">
          <div class="cap-preview-icon">${iconSvg(c.icon)}</div>
          <span class="cap-counter">${String(i + 1).padStart(2, '0')} / ${total}</span>
        </div>
        <div class="cap-spec-list">${specs}</div>
      </div>
      <div class="cap-preview-body cap-fade">
        <h3>${c.title}</h3>
        <p>${c.desc}</p>
        <div class="cap-preview-tags">${tags}</div>
        <a href="${base}${c.href}" class="card-link" style="margin-top:18px;display:inline-flex">Explore capability →</a>
      </div>
    `;
  }

  function select(i) {
    list.querySelectorAll('.cap-item').forEach(el => el.classList.remove('active'));
    list.querySelector(`.cap-item[data-index="${i}"]`)?.classList.add('active');
    renderPreview(i);
  }

  list.querySelectorAll('.cap-item').forEach(item => {
    item.addEventListener('click', () => select(parseInt(item.dataset.index, 10)));
    item.addEventListener('mouseenter', () => select(parseInt(item.dataset.index, 10)));
  });

  renderPreview(0);
}

function closeAllSelects(except) {
  document.querySelectorAll('.cselect.open').forEach(c => {
    if (c !== except) {
      c.classList.remove('open');
      c.querySelector('.cselect-trigger')?.setAttribute('aria-expanded', 'false');
    }
  });
}

function initCustomSelects() {
  document.querySelectorAll('select').forEach(sel => {
    if (sel.dataset.enhanced) return;
    sel.dataset.enhanced = '1';

    const wrap = document.createElement('div');
    wrap.className = 'cselect';
    sel.parentNode.insertBefore(wrap, sel);
    wrap.appendChild(sel);
    sel.classList.add('cselect-native');
    sel.tabIndex = -1;

    const options = Array.from(sel.options);
    const isPlaceholder = (opt) => opt.value === '';

    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'cselect-trigger';
    trigger.setAttribute('aria-haspopup', 'listbox');
    trigger.setAttribute('aria-expanded', 'false');

    const label = document.createElement('span');
    label.className = 'cselect-label';

    trigger.appendChild(label);
    trigger.insertAdjacentHTML('beforeend',
      '<svg viewBox="0 0 20 20" fill="none"><path d="M5 8l5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>');

    const panel = document.createElement('div');
    panel.className = 'cselect-panel';
    panel.setAttribute('role', 'listbox');

    const optionEls = options.map((opt, i) => {
      const o = document.createElement('div');
      o.className = 'cselect-option';
      o.textContent = opt.text;
      o.setAttribute('role', 'option');
      if (isPlaceholder(opt)) o.classList.add('is-placeholder');
      o.addEventListener('click', (e) => {
        e.stopPropagation();
        choose(i);
        closeSelect();
      });
      panel.appendChild(o);
      return o;
    });

    wrap.appendChild(trigger);
    wrap.appendChild(panel);

    function render() {
      const opt = sel.options[sel.selectedIndex];
      label.textContent = opt ? opt.text : '';
      trigger.classList.toggle('placeholder', !opt || isPlaceholder(opt));
      optionEls.forEach((el, idx) => el.classList.toggle('selected', idx === sel.selectedIndex));
    }

    function choose(i) {
      sel.selectedIndex = i;
      render();
      sel.dispatchEvent(new Event('change', { bubbles: true }));
    }

    function openSelect() {
      closeAllSelects(wrap);
      wrap.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
      const sel2 = panel.querySelector('.selected');
      if (sel2) sel2.scrollIntoView({ block: 'nearest' });
    }

    function closeSelect() {
      wrap.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
    }

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      wrap.classList.contains('open') ? closeSelect() : openSelect();
    });

    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeSelect();
      if ((e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') && !wrap.classList.contains('open')) {
        e.preventDefault();
        openSelect();
      }
    });

    render();
    sel._syncCustomSelect = render;
  });

  if (!document._cselectBound) {
    document._cselectBound = true;
    document.addEventListener('click', () => closeAllSelects());
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAllSelects(); });
  }
}

function initScrollProgress() {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.appendChild(bar);
  const update = () => {
    const h = document.documentElement;
    const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
    bar.style.width = `${Math.min(scrolled * 100, 100)}%`;
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ─── LOADING STATES ─── */
const LOADER_SPINNER_SVG = `<svg class="loader-icon loader-icon--spin" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" opacity="0.2"/><path d="M12 3a9 9 0 0 1 9 9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;

const LOADER_RELOAD_SVG = `<svg class="loader-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M19.5 8.5A8 8 0 0 0 5.5 6.7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M5 3.5v4h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.5 15.5a8 8 0 0 0 14 1.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M19 20.5v-4h-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

let pageLoaderHidden = false;
let pageLoaderMinUntil = 0;

function setPageLoaderStatus(text) {
  const el = document.querySelector('.page-loader-status');
  if (el && text) el.textContent = text;
}

function hidePageLoader() {
  if (pageLoaderHidden) return;
  const run = () => {
    const loader = document.getElementById('pageLoader');
    const root = document.documentElement;
    loader?.classList.remove('is-active');
    loader?.classList.add('page-loader--hide');
    loader?.style.removeProperty('opacity');
    window.setTimeout(() => {
      pageLoaderHidden = true;
      root.classList.remove('is-loading', 'is-page-leaving');
      root.classList.add('is-page-ready');
      loader?.setAttribute('aria-hidden', 'true');
    }, 560);
  };
  const wait = Math.max(0, pageLoaderMinUntil - Date.now());
  if (wait) window.setTimeout(run, wait);
  else run();
}

function showPageLoader(status = 'Loading…') {
  pageLoaderHidden = false;
  const root = document.documentElement;
  root.classList.add('is-loading');
  root.classList.remove('is-page-ready');
  setPageLoaderStatus(status);
  const loader = document.getElementById('pageLoader');
  if (!loader) return;
  loader.style.removeProperty('opacity');
  loader.classList.remove('page-loader--hide');
  loader.setAttribute('aria-hidden', 'false');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => loader.classList.add('is-active'));
  });
}

function initPageLoader() {
  pageLoaderMinUntil = Date.now() + 650;
  const done = () => hidePageLoader();
  if (document.readyState === 'complete') done();
  else window.addEventListener('load', done, { once: true });
  window.setTimeout(done, 3500);
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) hidePageLoader();
  });
}

function shouldSkipLoaderLink(link) {
  if (!link || link.target === '_blank' || link.hasAttribute('download')) return true;
  const href = link.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return true;
  try {
    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin) return true;
    if (url.pathname === location.pathname && url.hash) return true;
  } catch { return true; }
  return false;
}

function initNavigationLoader() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const navDelay = reducedMotion ? 0 : 340;

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (shouldSkipLoaderLink(link)) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    e.preventDefault();
    const href = link.href;
    const root = document.documentElement;
    root.classList.add('is-page-leaving');
    root.classList.remove('is-page-ready');
    setPageLoaderStatus('Loading…');
    showPageLoader();

    window.setTimeout(() => {
      window.location.href = href;
    }, navDelay);
  });
}

function wrapButtonLabel(btn) {
  if (btn.querySelector('.btn-label')) return;
  const label = document.createElement('span');
  label.className = 'btn-label';
  const spinner = btn.querySelector('.btn-spinner');
  [...btn.childNodes].forEach(node => {
    if (node !== spinner) label.appendChild(node);
  });
  btn.appendChild(label);
}

function setButtonLoading(btn, loading, loadingText) {
  if (!btn) return;
  wrapButtonLabel(btn);
  if (!btn.querySelector('.btn-spinner')) {
    btn.insertAdjacentHTML('afterbegin', `<span class="btn-spinner">${LOADER_SPINNER_SVG}</span>`);
  }
  const label = btn.querySelector('.btn-label');
  if (loading) {
    if (label && loadingText) {
      if (!label.dataset.originalText) label.dataset.originalText = label.textContent;
      label.textContent = loadingText;
    }
    btn.classList.add('is-loading');
    btn.disabled = true;
    btn.setAttribute('aria-busy', 'true');
  } else {
    if (label?.dataset.originalText) {
      label.textContent = label.dataset.originalText;
      delete label.dataset.originalText;
    }
    btn.classList.remove('is-loading');
    btn.removeAttribute('aria-busy');
  }
}

function initReloadControls() {
  document.querySelectorAll('[data-reload]').forEach(el => {
    if (!el.querySelector('.loader-icon')) {
      el.insertAdjacentHTML('afterbegin', LOADER_RELOAD_SVG);
    }
    if (el.dataset.reloadBound) return;
    el.dataset.reloadBound = '1';
    el.addEventListener('click', () => {
      setPageLoaderStatus('Reloading…');
      showPageLoader();
      window.location.reload();
    });
  });
}

function reinitPageInteractions() {
  initIcons();
  initAccordions();
  initScrollReveal();
  initStaggerReveal();
  initNexusFlow();
  initCounterAnimation();
  initReloadControls();
  hidePageLoader();
}

document.addEventListener('DOMContentLoaded', () => {
  initPageLoader();
  initNavigationLoader();
  initLayout();
  initTheme();
  initIcons();
  initHeader();
  initScrollProgress();
  initHeroCarousel();
  renderHomeModuleExplorer();
  renderConnectAccordion();
  initModuleTabs();
  initCapabilities();
  initAccordions();
  initScrollReveal();
  initStaggerReveal();
  initNexusFlow();
  initContactForm();
  initCustomSelects();
  initContactPrefill();
  initCounterAnimation();
  initReloadControls();
});
