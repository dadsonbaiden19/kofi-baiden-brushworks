# Kofi Baiden Brushworks

Production-ready Next.js portfolio for Kofi Baiden Brushworks.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Commands

```bash
npm run build
npm run start
```

## Environment Variables

Copy `.env.example` to `.env.local` for local development and set these in the production host dashboard:

```bash
NEXT_PUBLIC_SITE_URL=https://kofibaidenbrushworks.com
NEXT_PUBLIC_IMAGE_BASE_URL=
NEXT_PUBLIC_INSTAGRAM_URL=
NEXT_PUBLIC_WHATSAPP_URL=
```

- `NEXT_PUBLIC_SITE_URL`: Production site URL used for canonical URLs, sitemap, robots, and structured data.
- `NEXT_PUBLIC_IMAGE_BASE_URL`: Optional remote image/CDN base URL. Leave blank to serve images from `public/`. Example: `https://cdn.example.com/kofi-baiden-brushworks`.
- `NEXT_PUBLIC_INSTAGRAM_URL`: Final Instagram profile URL. Leave blank until confirmed.
- `NEXT_PUBLIC_WHATSAPP_URL`: Final WhatsApp URL, such as a `https://wa.me/...` link. The site appends a polite pre-filled artwork inquiry message.

## Artwork And Image Data

Current works live in `data/works.ts`.

Historical gallery works live in `data/gallery.ts`.

Artwork data stores relative image paths such as `/artworks/ochre-field.svg`. The app combines those paths with `NEXT_PUBLIC_IMAGE_BASE_URL` through `lib/images.ts`. This keeps the project ready for Hostinger file storage, Cloudinary, Uploadcare, ImageKit, or a future CDN without scattering full image URLs through components.

When moving images to a CDN:

1. Upload images while preserving paths like `/artworks/file-name.jpg`.
2. Set `NEXT_PUBLIC_IMAGE_BASE_URL` to the CDN folder URL.
3. Add the CDN hostname to `next.config.ts` under `images.remotePatterns` if it is not already covered.
4. Replace placeholder SVG paths with final artwork image filenames in the data files.

The current Open Graph preview image is `public/og-image.jpg`. Replace it with a production artwork-based preview image when available.

## SEO

Site-wide configuration lives in `data/site.ts`.

Reusable metadata helpers live in `lib/seo.ts`.

Page metadata lives in:

- `app/page.tsx`
- `app/works/page.tsx`
- `app/gallery/page.tsx`
- `app/about/page.tsx`
- `app/contact/page.tsx`
- `app/works/[slug]/page.tsx`

Sitemap and robots files live in:

- `app/sitemap.ts`
- `app/robots.ts`

Structured data is added through `components/JsonLd.tsx`.

## Hostinger Deployment Notes

Deployment assumptions for a standard Node.js Next.js app on Hostinger:

1. Connect the GitHub repository if available.
2. Set the environment variables from `.env.example` in the Hostinger dashboard.
3. Use build command: `npm run build`.
4. Use start command: `npm run start`.
5. Confirm the Hostinger Node.js version supports the installed Next.js version.
6. Point `kofibaidenbrushworks.com` to the deployed app.
7. Enable SSL for the domain.
8. Test the production site, sitemap, robots file, artwork detail pages, and contact/social links after deployment.

## Vercel Deployment Notes

1. Import the GitHub repository into Vercel.
2. Set environment variables from `.env.example` in the Vercel dashboard (Production).
3. Build command: `npm run build`
4. Output directory: leave blank (Next.js default).
5. Deploy and then test:
   - `/sitemap.xml`
   - `/robots.txt`
   - `/og-image.jpg`
   - a detail route like `/works/ochre-field-no-3`
