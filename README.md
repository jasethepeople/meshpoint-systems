# meshpoint-systems

Next.js marketing/storefront site bootstrapped with v0 (v0 project "v0-katachi-ho", linked at https://v0.app/chat/projects/prj_3Ne6KSXjPC4MyPIajwhoPYrpcvKj).

## Features

- **Storefront sections** — hero, featured products, collection strip, materials section, newsletter signup, footer (`components/`)
- **Product browsing** — product cards with quick-look modal (`product-card.tsx`, `quick-look-modal.tsx`)
- **Motion & presentation** — animated text, parallax images, blur panels, scroll reveal effects (`animated-text.tsx`, `parallax-image.tsx`, `reveal.tsx`)
- **Theming** — light/dark theme provider (`theme-provider.tsx`); mobile detection and toast hooks (`hooks/`)
- Product imagery in `public/` (sofas, chairs, and related lifestyle renders) suggests a furniture/home-goods catalog presentation

## Tech stack

Next.js 15, React 19, TypeScript, Tailwind CSS 4, Radix UI primitives, Framer Motion, shadcn-style `components/ui` (per `components.json`), Vercel Analytics, pnpm.

## Getting started

```bash
npm run dev     # next dev → http://localhost:3000
npm run build   # next build
npm start       # next start
npm run lint    # eslint .
```

Edit `app/page.tsx` to change the page; it auto-updates in dev.

## Project structure

```
app/              # layout.tsx, page.tsx, globals.css (Next.js App Router)
components/       # page sections + ui/ primitives
hooks/            # use-mobile, use-toast
lib/              # utils.ts
public/           # product/lifestyle imagery, icons, video
components.json   # shadcn/ui config
```

## Status

Real project. A v0-generated storefront site; the package name is still the v0 default `my-v0-project`. Continues to be developed through the linked v0 project, which pushes to this repo.
