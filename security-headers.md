# Security Headers Reference

This project demonstrates a vanilla frontend showcase with strong security practices.

## Content Security Policy (CSP)

### Meta Tag (Development / Static Hosting)

When CSP is delivered via `<meta http-equiv="Content-Security-Policy">`, certain directives are ignored by browsers (notably `frame-ancestors` and `report-uri`). The project uses a meta CSP as a baseline defense:

```html
<meta http-equiv="Content-Security-Policy"
  content="default-src 'self';
    script-src 'self' 'unsafe-inline' wasm-unsafe-eval https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://unpkg.com;
    style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://unpkg.com https://fonts.googleapis.com;
    img-src 'self' data: blob: https://images.unsplash.com https://tile.openstreetmap.org https://*.tile.openstreetmap.org https://*.tile.opentopomap.org https://*.basemaps.cartocdn.com https://interactive-examples.mdn.mozilla.net https://cdn.jsdelivr.net https://unpkg.com;
    font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net;
    connect-src 'self' https://api.github.com https://api.ipify.org https://*.openstreetmap.org https://cdn.jsdelivr.net https://cdn.plyr.io https://demo.webtransport.dev https://tfhub.dev;
    media-src 'self' blob:;
    worker-src 'self' blob:;
    object-src 'none';
    base-uri 'self';" />
```

### HTTP Header (Production — Recommended)

For full protection, serve CSP as an HTTP response header. This enables directives that are ignored in meta tags:

```
Content-Security-Policy: default-src 'self';
  script-src 'self' 'unsafe-inline' wasm-unsafe-eval https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://unpkg.com;
  style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://unpkg.com https://fonts.googleapis.com;
  img-src 'self' data: blob: https://images.unsplash.com https://tile.openstreetmap.org https://*.tile.openstreetmap.org https://*.tile.opentopomap.org https://*.basemaps.cartocdn.com https://interactive-examples.mdn.mozilla.net https://cdn.jsdelivr.net https://unpkg.com;
  font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net;
  connect-src 'self' https://api.github.com https://api.ipify.org https://*.openstreetmap.org https://cdn.jsdelivr.net https://cdn.plyr.io https://demo.webtransport.dev https://tfhub.dev;
  media-src 'self' blob:;
  worker-src 'self' blob:;
  object-src 'none';
  base-uri 'self';
  frame-ancestors 'none';
  report-uri /csp-report-endpoint;
```

### Platform-Specific Header Configuration

**Netlify** (`_headers` file):
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' wasm-unsafe-eval https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://unpkg.com; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://unpkg.com https://fonts.googleapis.com; img-src 'self' data: blob: https://images.unsplash.com https://tile.openstreetmap.org https://*.tile.openstreetmap.org https://*.tile.opentopomap.org https://*.basemaps.cartocdn.com https://interactive-examples.mdn.mozilla.net https://cdn.jsdelivr.net https://unpkg.com; font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net; connect-src 'self' https://api.github.com https://api.ipify.org https://*.openstreetmap.org https://cdn.jsdelivr.net https://cdn.plyr.io https://demo.webtransport.dev https://tfhub.dev; media-src 'self' blob:; worker-src 'self' blob:; object-src 'none'; base-uri 'self'; frame-ancestors 'none'
```

**Vercel** (`vercel.json`):
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Content-Security-Policy", "value": "default-src 'self'; script-src 'self' 'unsafe-inline' wasm-unsafe-eval https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://unpkg.com; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://unpkg.com https://fonts.googleapis.com; img-src 'self' data: blob: https://images.unsplash.com https://tile.openstreetmap.org https://*.tile.openstreetmap.org https://*.tile.opentopomap.org https://*.basemaps.cartocdn.com https://interactive-examples.mdn.mozilla.net https://cdn.jsdelivr.net https://unpkg.com; font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net; connect-src 'self' https://api.github.com https://api.ipify.org https://*.openstreetmap.org https://cdn.jsdelivr.net https://cdn.plyr.io https://demo.webtransport.dev https://tfhub.dev; media-src 'self' blob:; worker-src 'self' blob:; object-src 'none'; base-uri 'self'; frame-ancestors 'none'" }
      ]
    }
  ]
}
```

**GitHub Pages**: Not configurable via headers. Use the meta tag as a baseline and consider a Cloudflare Worker for header injection.

## Subresource Integrity (SRI)

All dynamically injected scripts and styles should use exact versioned CDN URLs plus an `integrity` hash and `crossorigin="anonymous"`.

Example:

```html
<script src="https://cdn.jsdelivr.net/npm/apexcharts@4.4.0/dist/apexcharts.min.js"
        integrity="sha384-..."
        crossorigin="anonymous"></script>
```

If an integrity check fails, the resource is blocked by the browser and the app should surface the failure through the same error/toast pipeline used for network failures.

## Service Worker Security

- The service worker only intercepts `GET` requests.
- HTML pages use **network-first** strategy to ensure fresh content.
- Static assets (CSS, JS, images) use **cache-first** strategy for offline support.
- All cached responses are scoped to the same origin.
- The SW scope is restricted to `/` (root).

## XSS Prevention

- **DOMPurify** sanitizes all dynamic HTML (Markdown preview, user-generated content).
- No `eval()` or `innerHTML` with untrusted data.
- All user input in the Browser API lab is escaped or sanitized before rendering.
