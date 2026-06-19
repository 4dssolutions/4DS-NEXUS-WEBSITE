# 4DS Nexus Website

Static website for **4DS Solutions** — CRM, operations platform, websites, and custom software.

## Deploy on GitHub Pages

### 1. Enable Pages (one-time, in GitHub)

1. Open [4DS-NEXUS-WEBSITE → Settings → Pages](https://github.com/4dssolutions/4DS-NEXUS-WEBSITE/settings/pages)
2. Under **Build and deployment** → **Source**, choose **GitHub Actions**
3. Push to `main` — the **Deploy GitHub Pages** workflow runs automatically

Default URL (before custom domain):  
`https://4dssolutions.github.io/4DS-NEXUS-WEBSITE/`

### 2. Custom domain (`4dsnexus.co.za`)

The repo includes a `CNAME` file for **4dsnexus.co.za**. Configure DNS at your registrar:

| Type | Name / Host | Value |
|------|-------------|--------|
| `A` | `@` (apex / root) | `185.199.108.153` |
| `A` | `@` | `185.199.109.153` |
| `A` | `@` | `185.199.110.153` |
| `A` | `@` | `185.199.111.153` |

Optional — if you also want **www**:

| Type | Name / Host | Value |
|------|-------------|--------|
| `CNAME` | `www` | `4dssolutions.github.io` |

In GitHub **Pages** settings, enter `4dsnexus.co.za` under **Custom domain** and enable **Enforce HTTPS** once DNS has propagated (can take up to 24 hours).

### 3. After going live

- Add the live URL to [Cloudflare Turnstile](https://dash.cloudflare.com/?to=/:account/turnstile) allowed hostnames
- Add `googleAnalyticsId` in `js/config.js` when ready


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
