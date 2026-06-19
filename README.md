# 4DS Nexus Website

Static website for **4DS Solutions** — CRM, operations platform, websites, and custom software.

## Deploy

This is a plain HTML/CSS/JS site. Host on any static host (GitHub Pages, Cloudflare Pages, Netlify, etc.).

- Entry point: `index.html`
- No build step required

## Configuration

Edit `js/config.js`:

- `TURNSTILE_SITE_KEY` — Cloudflare Turnstile **site** key (public, used on the contact form)
- `CONTACT_EMAIL` — enquiry email address
- `COOKIE_SETTINGS` — optional Google Analytics / Meta Pixel IDs

**Never commit Turnstile secret keys or API secrets.** Only the public site key belongs in client-side config.

See `js/config.example.js` for a template.

## Local preview

```bash
npx serve .
```

Or open `index.html` via a local server (required for some features).

## Structure

- `index.html`, `about.html`, `pricing.html`, etc. — main pages
- `services/` — service detail shells (content from `js/services-data.js`)
- `solutions/nexus.html` — platform page
- `js/main.js` — header, footer, interactions
- `css/styles.css` — design system
