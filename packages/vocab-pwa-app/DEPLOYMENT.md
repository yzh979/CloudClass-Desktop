# Deployment Guide

This guide covers deploying the Vocab PWA App to various hosting platforms.

## Prerequisites

- Built production bundle (`yarn build`)
- HTTPS-enabled hosting (required for PWA)
- Domain name (optional but recommended)

## Quick Deploy Options

### 1. Vercel (Recommended)

**Via CLI:**
```bash
# Install Vercel CLI
npm i -g vercel

# Build and deploy
yarn build
cd dist
vercel --prod
```

**Via Git:**
1. Push code to GitHub
2. Import project on vercel.com
3. Set build command: `yarn build`
4. Set output directory: `dist`
5. Deploy

**Configuration** (`vercel.json`):
```json
{
  "buildCommand": "yarn build",
  "outputDirectory": "dist",
  "framework": null,
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

### 2. Netlify

**Via CLI:**
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build and deploy
yarn build
netlify deploy --prod --dir=dist
```

**Via Drag & Drop:**
1. Build: `yarn build`
2. Visit app.netlify.com/drop
3. Drag `dist` folder

**Configuration** (`netlify.toml`):
```toml
[build]
  command = "yarn build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 3. GitHub Pages

```bash
# Build
yarn build

# Deploy to gh-pages branch
npx gh-pages -d dist

# Or use GitHub Actions (see below)
```

**GitHub Actions** (`.github/workflows/deploy.yml`):
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: yarn install
        working-directory: packages/vocab-pwa-app
        
      - name: Build
        run: yarn build
        working-directory: packages/vocab-pwa-app
        
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: packages/vocab-pwa-app/dist
```

### 4. Firebase Hosting

```bash
# Install Firebase CLI
npm i -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting
# Choose dist as public directory
# Configure as single-page app: Yes

# Build
yarn build

# Deploy
firebase deploy
```

**Configuration** (`firebase.json`):
```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### 5. AWS S3 + CloudFront

```bash
# Build
yarn build

# Upload to S3
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

**S3 Bucket Policy:**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}
```

### 6. Cloudflare Pages

1. Connect GitHub repository
2. Set build command: `yarn build`
3. Set build output: `dist`
4. Deploy

Or via Wrangler CLI:
```bash
npx wrangler pages publish dist
```

## Pre-Deployment Checklist

### 1. Generate Real Icons
- [ ] Replace SVG placeholders with proper PNGs
- [ ] Ensure all 8 icon sizes are present
- [ ] Verify icons display correctly

### 2. Test Build
```bash
yarn build
npx serve dist
# Open http://localhost:3000
```

Verify:
- [ ] App loads correctly
- [ ] All routes work
- [ ] Service Worker registers
- [ ] Can install as PWA
- [ ] Works offline
- [ ] No console errors

### 3. Run Lighthouse Audit
```bash
lighthouse http://localhost:3000 --view
```

Target scores:
- [ ] Performance > 90
- [ ] Accessibility > 90
- [ ] Best Practices > 90
- [ ] SEO > 90
- [ ] PWA > 90

### 4. Cross-Browser Testing
- [ ] Chrome (desktop & mobile)
- [ ] Firefox
- [ ] Safari (desktop & iOS)
- [ ] Edge

### 5. Update Configuration

**manifest.json:**
```json
{
  "name": "Your App Name",
  "short_name": "YourApp",
  "start_url": "/",
  "theme_color": "#4f46e5",
  "background_color": "#ffffff"
}
```

**Update meta tags in index.html:**
```html
<meta name="description" content="Your app description">
<meta property="og:title" content="Your App">
<meta property="og:description" content="Your description">
<meta property="og:image" content="https://yoursite.com/og-image.png">
```

## Post-Deployment

### 1. Verify PWA Features

**Desktop:**
- Open site in Chrome
- Look for install icon in address bar
- Click install
- Verify app works standalone

**Mobile:**
- Open site in mobile browser
- Tap "Add to Home Screen"
- Verify icon appears
- Open from home screen
- Test offline mode (turn off internet)

### 2. Test Service Worker

```javascript
// Open DevTools Console
navigator.serviceWorker.getRegistrations().then(regs => {
  console.log('Registered:', regs.length);
  regs.forEach(reg => console.log(reg.scope));
});
```

### 3. Monitor Performance

**Tools:**
- Google Search Console
- Lighthouse CI
- Web Vitals
- Analytics (if added)

### 4. Setup Custom Domain (Optional)

**Vercel:**
```bash
vercel domains add yourdomain.com
```

**Netlify:**
```bash
netlify domains:add yourdomain.com
```

## Environment-Specific Configuration

### Development
```javascript
// webpack.config.js
mode: 'development',
devServer: {
  port: 3000,
  hot: true
}
```

### Production
```javascript
// webpack.config.js
mode: 'production',
optimization: {
  minimize: true,
  splitChunks: { chunks: 'all' }
}
```

## Troubleshooting

### Issue: Service Worker not updating
**Solution:**
```javascript
// Force update
navigator.serviceWorker.getRegistrations().then(regs => {
  regs.forEach(reg => reg.update());
});
```

Or:
- Clear browser cache
- Hard reload (Ctrl+Shift+R)
- Update Service Worker skipWaiting

### Issue: HTTPS required error
**Solution:**
- Ensure hosting provides HTTPS
- Use certbot for custom server
- CloudFlare provides free SSL

### Issue: Icons not loading
**Solution:**
- Check icon paths in manifest.json
- Verify icons exist in dist folder
- Clear cache and rebuild

### Issue: App not installable
**Solution:**
- Run Lighthouse PWA audit
- Check manifest.json is valid
- Ensure Service Worker registers
- Verify HTTPS is enabled

## Performance Optimization

### 1. Enable Compression
Most platforms enable this automatically, but verify:

**Vercel/Netlify**: Automatic
**S3**: Enable in bucket settings
**Custom Server**:
```nginx
# nginx.conf
gzip on;
gzip_types text/css application/javascript image/svg+xml;
```

### 2. Set Cache Headers

```javascript
// Service Worker (already configured)
workbox.routing.registerRoute(
  /\.(?:png|jpg|jpeg|svg|gif)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
);
```

### 3. CDN (Optional)

For audio caching:
```javascript
// src/js/audioPlayer.js
const TTS_CDN = 'https://your-cdn.com/tts';
```

## Monitoring

### Error Tracking
Consider adding:
- Sentry
- Rollbar
- LogRocket

### Analytics
Consider adding:
- Google Analytics
- Plausible
- Umami

### Example Integration:
```javascript
// src/js/app.js
if (window.location.hostname !== 'localhost') {
  // Add analytics code
}
```

## Security

### Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data:;
  connect-src 'self' https://translate.google.com;
  media-src 'self' blob:;
">
```

### HTTPS Only
Redirect HTTP to HTTPS (most platforms do this automatically)

## Scaling

For high traffic:
1. Enable CDN (CloudFlare, CloudFront)
2. Use edge caching
3. Optimize images (WebP)
4. Implement lazy loading
5. Consider server-side rendering

## Backup & Recovery

Before deploying:
```bash
# Backup current data export
# Export from app settings
# Save to safe location
```

## Rollback Plan

**Vercel:**
```bash
vercel rollback
```

**Netlify:**
- Go to Deploys
- Click previous deployment
- Click "Publish deploy"

**GitHub Pages:**
```bash
git revert HEAD
git push
```

## Maintenance

Regular tasks:
- [ ] Update dependencies monthly
- [ ] Monitor error logs
- [ ] Check PWA audit scores
- [ ] Test on new browser versions
- [ ] Renew SSL certificates (if custom)

## Cost Estimates

| Platform | Free Tier | Paid |
|----------|-----------|------|
| Vercel | 100GB bandwidth | $20/mo |
| Netlify | 100GB bandwidth | $19/mo |
| GitHub Pages | Unlimited (public) | Free |
| Firebase | 10GB/month | Pay as you go |
| Cloudflare Pages | Unlimited | Free |

## Support

- **Platform Issues**: Check platform documentation
- **App Issues**: Open GitHub issue
- **PWA Questions**: MDN Web Docs

---

**Last Updated**: October 2024
