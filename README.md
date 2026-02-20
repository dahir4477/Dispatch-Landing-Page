# Suprihub Logistics & Dispatch Solutions — Landing Page

A high-converting SaaS landing page for **Suprihub Logistics & Dispatch Solutions** (AI dispatch for owner-operators & small trucking companies). Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, ShadCN-style UI, and Supabase for lead capture.

## Features

- **Hero** — Bold headline, subheadline, primary + secondary CTAs, mock dashboard placeholder, animated grid/glow
- **Pain points** — Emotional hook with bullet list and closing statement
- **Solution / Features** — AI dispatcher value prop and feature cards
- **How it works** — 3-step flow with icons
- **Results / Testimonials** — Metrics and testimonial placeholder
- **Trust badges** — Placeholder section
- **Email capture form** — First name, email, phone (optional), trucks, weekly revenue; submits to Supabase
- **FAQ** — Is this legal? Dispatcher? Cost? Launch?
- **Mobile** — Sticky bottom CTA, large tap targets, responsive layout
- **SEO** — Meta title/description, Open Graph, Twitter card
- **Dark mode** — Default dark theme with yellow/green accent

## Tech Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Radix-based UI (Button, Input, Label, Card, Select)
- **Backend:** Supabase (table `early_access_leads`), API route `/api/lead`
- **Deploy:** Vercel-ready

## Quick Start

1. **Clone and install**
   ```bash
   cd Dispatch-Landing-Page-Website
   npm install
   ```

2. **Environment variables**
   - Copy `.env.example` to `.env.local`
   - Add your Supabase URL and anon key from [Supabase Dashboard](https://app.supabase.com) → Project Settings → API

3. **Supabase setup**
   - Create a project at [supabase.com](https://supabase.com)
   - In SQL Editor, run the migration: `supabase/migrations/001_early_access_leads.sql`

4. **Run locally**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

5. **Build**
   ```bash
   npm run build
   npm run start
   ```
   If `npm install` or `npm run build` fails with permission errors (e.g. on Windows), run them in a normal terminal outside the sandbox.

## Deployment

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for Vercel deployment steps, env vars, and best practices.

## Project Structure

```
/app
  layout.tsx       # Root layout, metadata, mobile CTA
  page.tsx         # Landing page composition
  globals.css      # Tailwind + CSS variables
  /api/lead
    route.ts       # POST handler for form → Supabase
/components
  Hero.tsx
  PainPoints.tsx
  Features.tsx
  HowItWorks.tsx
  Testimonials.tsx
  TrustBadges.tsx
  LeadForm.tsx
  FAQ.tsx
  MobileCTA.tsx
  /ui               # Button, Input, Label, Card, Select
/lib
  utils.ts          # cn()
  supabaseClient.ts # Supabase client + types
/supabase/migrations
  001_early_access_leads.sql
```

## License

Private / as per your project.
