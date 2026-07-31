# Tyra Décor — Premium Catalogue Website

> **Recycled. Refined. Remarkable.**
> A luxury catalogue website for Tyra Décor — a brand that hand-weaves furniture
> and planters from recycled tyres in Kanpur, India.

This is **not** an e-commerce store. It is a beautifully-crafted catalogue that lets
customers browse products, view detailed specifications and pricing, and reach out
via WhatsApp or phone for retail, bulk and B2B orders.

---

## ✨ Features

### Storefront (`/`)
- **Immersive editorial hero** — Fraunces display font, split layout, signature-piece callout
- **Marquee strip** — rotating "Handwoven in Kanpur · Weather-proof · Made in India"
- **Our Story** — narrative of Tyra Décor's mission, craft & Kanpur roots
- **Discover our signature collections** — luxury category-first browsing:
  - Large hero card: "Explore all pieces"
  - Four category cards (Chairs · Tables · Planters · Suites) with product counts
  - Every card links to a dedicated category landing page
- **Why Tyra Décor** — 8 icon cards (quality, materials, delivery, bulk support…)
- **Featured pieces** — 8 top products from the catalogue with click-to-open modal
- **Featured Collections** — highlighted suites with cinematic hero cards
- **Testimonials** — dark-themed elegant reviews with champagne accents
- **CTA banner** — dedicated block for bulk / interior-project enquiries
- **Footer** — signature strip, quick links, catalogue links, contact, social icons
- **Floating WhatsApp** — persistent one-click chat button
- **Product Detail Modal** — click any card to open a full modal with:
  - Large image + **hover-to-zoom magnifier lens**
  - Full description, spec rows, price, availability
  - "Enquire via WhatsApp" + "Call" buttons

### Category Landing Pages (`/category/{slug}`)
Dedicated immersive pages for each category:
- `/category/all` — the complete catalogue
- `/category/chairs`
- `/category/tables`
- `/category/planters`
- `/category/suites`

Each has its own editorial hero, italic story quote, filters (material, colour, price),
search, sort, and a "Continue Exploring" section linking to the other categories.

### Admin Panel (`/admin`)
Password-protected simple CMS (default password: `tyra2025`, set via `ADMIN_PASSWORD` env var).

- Add, edit, delete products
- Toggle "Featured" flag
- Update prices, images (URL), descriptions, categories
- View all customer enquiries with one-click email or WhatsApp reply

### Backend API (Next.js API Routes)
All routes are prefixed with `/api`.

| Method | Endpoint                    | Description                          | Auth  |
|--------|-----------------------------|--------------------------------------|-------|
| GET    | `/api/health`               | Health check                         | —     |
| GET    | `/api/categories`           | List categories                      | —     |
| GET    | `/api/products`             | List products (filters, search, sort)| —     |
| GET    | `/api/products/:id`         | Get one product                      | —     |
| POST   | `/api/products`             | Create product                       | Admin |
| PUT    | `/api/products/:id`         | Update product                       | Admin |
| DELETE | `/api/products/:id`         | Delete product                       | Admin |
| POST   | `/api/enquiries`            | Submit customer enquiry              | —     |
| GET    | `/api/enquiries`            | List all enquiries                   | Admin |
| POST   | `/api/admin/verify`         | Verify admin password                | —     |
| POST   | `/api/reseed`               | Reset catalogue to seed data         | Admin |

Admin auth is done via an `x-admin-password` header.

**Query parameters** for `GET /api/products`:
`category`, `min`, `max`, `search`, `material`, `color`, `sort` (`price_asc` | `price_desc` | `name`), `featured=true`

---

## 🛠 Tech Stack

- **Next.js 15** (App Router)
- **React 18**
- **Tailwind CSS 3** + **shadcn/ui**
- **Framer Motion** for animations
- **MongoDB** (native driver) for products & enquiries
- **Lucide** icons
- **Sonner** toasts
- **Google Fonts** — Fraunces (display), Cormorant Garamond (serif), Inter (body)

Design system: warm bone/ivory palette (`#F5EEE0`), champagne highlights (`#C9A664`) and rich bronze gold (`#8F6F3F`).

---

## 📱 About WhatsApp (No API key required)

The site uses free **`wa.me/`** click-to-chat links — the public WhatsApp deep-link format that works for anyone with a WhatsApp number.

Every "Enquire via WhatsApp" button opens a chat with `+91 77040 07055` (the number configured in `components/tyra/company.js`) with the product name and SKU pre-filled. No API key, no cost, no configuration needed.

**Recommended:** install the free [WhatsApp Business app](https://business.whatsapp.com/) on the phone owning the number, for auto-greetings, quick replies and a separate business profile.

To change the number, edit `components/tyra/company.js` → `whatsapp` field (digits only, e.g. `917704007055`).

---

## 📂 Project Structure

```
/app
├── app/
│   ├── layout.js                    # Root layout, fonts, metadata, watermark hide
│   ├── page.js                      # Home page (hero, story, categories, featured…)
│   ├── globals.css                  # Design tokens + luxury utility classes
│   ├── providers.js                 # Client providers wrapper
│   ├── admin/page.js                # Admin CMS panel
│   ├── category/[slug]/page.js      # Dynamic category landing pages
│   └── api/[[...path]]/route.js     # All backend API routes (dispatcher)
├── components/
│   ├── ui/                          # shadcn/ui components
│   └── tyra/                        # Shared Tyra components
│       ├── company.js               # Brand/contact constants + helpers
│       ├── chrome.js                # Navbar, Footer, FloatingWhatsApp
│       ├── product-card.js          # Product card
│       ├── product-modal.js         # Product detail modal
│       └── zoom-image.js            # Magnifier-lens image component
├── lib/
│   ├── products-data.js             # Seed catalogue (all products from the PDF)
│   └── utils/                       # helpers
├── public/products/                 # All product images (from official PDF)
├── .env                             # MONGO_URL, DB_NAME, ADMIN_PASSWORD…
├── package.json
├── tailwind.config.js
└── README.md                        # this file
```

---

## 🚀 Running Locally

### 1. Prerequisites
- **Node.js 18+**
- **Yarn 1.x** (project is pinned to yarn 1.22)
- **MongoDB** running locally on port `27017` (or any reachable Mongo URI)

### 2. Install
```bash
cd /app
yarn install
```

### 3. Environment
Edit `/app/.env`:

```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=tyra_decor
NEXT_PUBLIC_BASE_URL=http://localhost:3000
CORS_ORIGINS=*
ADMIN_PASSWORD=change-me-to-something-strong
```

### 4. Start
```bash
yarn dev
```

The site is available at [http://localhost:3000](http://localhost:3000).
The catalogue seeds automatically on the first API call.

- Storefront: `http://localhost:3000`
- Admin: `http://localhost:3000/admin` (default password: `tyra2025` unless you changed `ADMIN_PASSWORD`)

---

## 📦 Managing the Catalogue

### Option 1 — Admin UI (recommended)
1. Go to `/admin`.
2. Sign in.
3. Add / edit / delete products, upload images by pasting a URL.

### Option 2 — Edit seed file
Products can be reset from the seed file in `lib/products-data.js`. After editing:

```bash
curl -X POST https://YOUR-DOMAIN.com/api/reseed \
  -H "x-admin-password: YOUR_PASSWORD"
```

⚠️ Reseeding **deletes all existing products** and reinstalls the seed catalogue.

### Product images
Product images live in `/app/public/products/` and are referenced as `/products/xxx.jpg`. To add new images:

1. Drop your image file(s) into `/app/public/products/`
2. Reference the path in the admin UI or `lib/products-data.js`, e.g. `/products/new-chair.jpg`
3. Redeploy (Vercel does this automatically on `git push`)

### Product schema
```json
{
  "id": "uuid (auto)",
  "sku": "TD-CH-HALO",
  "name": "The Halo Armchair",
  "category": "chairs | tables | planters | suites",
  "tagline": "Short punchy line",
  "description": "Full description",
  "dimensions": "100 (H) x 45 (Seat) x 66 (Base) cm",
  "material": "Handwoven Recycled Rubber",
  "colors": ["Charcoal Black"],
  "price": 4500,
  "originalPrice": 6000,
  "image": "/products/halo-armchair.jpg",
  "featured": true,
  "availability": "In Stock | Made to Order | Out of Stock",
  "note": "Cushion sold separately"
}
```

---

# 🌐 Deploying to Vercel — Step by Step

Vercel is built by the Next.js team and is the easiest and most reliable way to
host this site. The free "Hobby" tier is more than enough for a catalogue site.

## Overview

You'll do three things:

1. Push the code to GitHub
2. Create a free MongoDB Atlas database (for products & enquiries)
3. Import the repo into Vercel and set environment variables

Total time: **~15 minutes**.

---

## Step 1 — Push your code to GitHub

If you don't already have the code in a Git repo:

1. Create a new (empty) repository on [github.com](https://github.com/new). Name it e.g. `tyra-decor`.
   Do **not** tick "Add a README" — the folder already has one.

2. In a terminal, from the project folder:

   ```bash
   cd /app
   git init
   git branch -M main
   git add .
   git commit -m "Initial commit — Tyra Decor catalogue"
   git remote add origin https://github.com/YOUR_USERNAME/tyra-decor.git
   git push -u origin main
   ```

3. Refresh GitHub — you should see all your files there.

> 💡 If you don't want to use Git from the terminal, you can also drag-and-drop
> the whole `/app` folder into a new repo on github.com via the web uploader.

---

## Step 2 — Create a free MongoDB Atlas database

Vercel runs your code in the cloud, so it needs a database it can reach. We'll use
MongoDB Atlas's free tier.

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com) and sign up (free).

2. Click **"Build a Database"** → choose the **free M0** shared tier → any region
   (e.g. Mumbai / Singapore for India) → click **Create Deployment**.

3. When prompted for a database user:
   - **Username:** `tyra-admin` (or anything)
   - **Password:** click **Autogenerate Secure Password** and **copy it now**
   - Click **Create Database User**

4. When prompted for network access, choose **"Add My Current IP Address"** —
   but you also need to allow Vercel. Click **Add Different IP Address** and
   enter `0.0.0.0/0` (allow from anywhere). Click **Finish and Close**.

   > This is fine for a catalogue site. The database is still protected by
   > the username + password.

5. On the Atlas dashboard, click **Connect** → **Drivers** → copy the connection
   string. It looks like:

   ```
   mongodb+srv://tyra-admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

6. Replace `<password>` with the actual password you copied earlier.

   You now have your `MONGO_URL`. Save it somewhere for Step 3.

---

## Step 3 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign up (use the same GitHub account
   you pushed to in Step 1 — it makes things easier).

2. On the dashboard click **"Add New… → Project"**.

3. Under **Import Git Repository**, find your `tyra-decor` repo and click **Import**.

4. On the "Configure Project" screen:
   - **Framework Preset:** Next.js (auto-detected — leave as is)
   - **Root Directory:** `./` (leave as is)
   - **Build & Output Settings:** leave defaults

5. Expand **Environment Variables** and add these four:

   | Name                  | Value                                                                 |
   |-----------------------|-----------------------------------------------------------------------|
   | `MONGO_URL`           | your Atlas connection string from Step 2                              |
   | `DB_NAME`             | `tyra_decor`                                                          |
   | `ADMIN_PASSWORD`      | any strong password you'll remember (e.g. `TyraDecor@2025!`)          |
   | `NEXT_PUBLIC_BASE_URL`| leave blank for now — you'll fill this in after the first deploy      |

6. Click **Deploy**. Vercel will build the site (~1–2 minutes).

7. When it finishes, you'll get a URL like `tyra-decor-abc123.vercel.app`.
   Open it — the catalogue should load with all products.

8. Copy that URL, go to **Settings → Environment Variables → NEXT_PUBLIC_BASE_URL**,
   set the value, then trigger a redeploy from the **Deployments** tab.

That's it — your site is live 🎉

---

## Step 4 — (Optional) Connect a custom domain

If you own a domain (e.g. `tyradecor.com`):

1. In your Vercel project → **Settings → Domains**
2. Type your domain and click **Add**
3. Vercel will show you 1–2 DNS records to add at your registrar:
   - For the root domain (`tyradecor.com`) — usually an `A` record pointing to `76.76.21.21`
   - For `www.tyradecor.com` — a `CNAME` pointing to `cname.vercel-dns.com`
4. Add those records on your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.)
5. Wait 5–60 minutes for DNS to propagate. Vercel will auto-issue a free SSL
   certificate. Your domain now serves the site over HTTPS.

Also update `NEXT_PUBLIC_BASE_URL` to `https://tyradecor.com` and redeploy.

---

## Step 5 — First-time admin setup

1. Visit `https://YOUR-VERCEL-URL/admin`.
2. Sign in with the `ADMIN_PASSWORD` you set.
3. All 39 products should already be there (seeded automatically on the first API call).
4. Add / edit products, view enquiries.

If for some reason products didn't seed, hit this once (replace with your values):

```bash
curl -X POST https://YOUR-VERCEL-URL/api/reseed \
  -H "x-admin-password: YOUR_ADMIN_PASSWORD"
```

---

## Step 6 — Making changes after deployment

Every time you **`git push`** to the `main` branch on GitHub, Vercel **automatically
rebuilds and redeploys** the site. Usually within 60–90 seconds.

Typical workflow:

```bash
# make changes locally, then:
git add .
git commit -m "Updated the Halo Armchair description"
git push
# ...wait a minute, then refresh the live site
```

---

## Troubleshooting Vercel deployments

| Symptom                                    | Fix                                                                        |
|--------------------------------------------|----------------------------------------------------------------------------|
| Build fails on Vercel                      | Check the build logs on Vercel → the error message will point to a file    |
| Site loads but "Loading catalogue…" forever| `MONGO_URL` is wrong / missing → Atlas IP allowlist doesn't include `0.0.0.0/0` |
| Admin login says "Incorrect password"      | `ADMIN_PASSWORD` env var wasn't set → set it and redeploy                  |
| Images don't show up                       | You forgot to commit `public/products/*.jpg` to git → `git add public/ && git push` |
| Custom domain shows "Invalid Configuration"| DNS not propagated yet → wait ~30 mins, or double-check the DNS records    |

---

## Alternative hosts

If you don't want to use Vercel, the same code works on:

- **Netlify** — same flow, uses the same env vars
- **Render / Railway / Fly.io** — same flow
- **Any VPS with Docker** — see the `Dockerfile` section below

### Docker (for VPS deployments)

Create a `Dockerfile` at the project root:

```dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000
CMD ["yarn", "start"]
```

Then:

```bash
docker build -t tyra-decor .
docker run -d --name tyra -p 3000:3000 \
  -e MONGO_URL="mongodb+srv://…" \
  -e DB_NAME="tyra_decor" \
  -e ADMIN_PASSWORD="your-strong-password" \
  -e NEXT_PUBLIC_BASE_URL="https://tyradecor.com" \
  tyra-decor
```

Put nginx or Caddy in front for HTTPS.

---

## 🎨 Customisation Guide

- **Brand colours** — edit `app/globals.css` (`--accent`, `.text-gold`, `.bg-cream` etc.)
- **Fonts** — swap in `app/layout.js` (uses `next/font/google`)
- **Copy / Story** — edit `app/page.js`, `Story` and `Categories` sections
- **Contact info & WhatsApp number** — edit `components/tyra/company.js`
- **Seed catalogue** — edit `lib/products-data.js` then hit `/api/reseed`
- **Admin password** — set `ADMIN_PASSWORD` in Vercel env vars
- **Category hero copy** — edit `CATEGORY_META` in `components/tyra/company.js`

---

## 🔒 Security Notes for Production

Before going live:

1. **Change `ADMIN_PASSWORD`** in Vercel to a strong, long secret.
2. **Restrict MongoDB Atlas** network access to only Vercel's IPs (or leave `0.0.0.0/0` if you use auth).
3. **HTTPS is automatic** on Vercel (free Let's Encrypt certificates).
4. Consider swapping the header-based admin auth for a proper JWT / NextAuth setup
   if the admin panel becomes a critical business tool.

---

## 🧭 Future Expansion (already-scaffolded)

The architecture supports these next steps without major rewrites:

- **User accounts** (add NextAuth on top of `/api/users`)
- **Shopping cart & payments** (Stripe / Razorpay drop-in on the client, keep backend structure)
- **Inventory management** (add a `stock` field on products, the admin UI already generalises)
- **Dealer login & wholesale pricing** (add role field to enquiries/users)
- **Downloadable PDF catalogues** (generate from `/lib/products-data.js`)
- **Multi-language** (drop in `next-intl` or `next-i18next`)

---

## 📞 Brand Contact

- **Phone / WhatsApp:** +91 77040 07055, +91 63079 94948
- **Email:** tyra.decor@gmail.com
- **Instagram:** [@tyra.decor](https://instagram.com/tyra.decor)
- **Address:** 128/18, Y-Block, Kidwai Nagar, Kanpur, U.P. – 208011, India
- **Registered as:** A Brand by R.B. Tubes Pvt. Ltd.

---

Built with care in Kanpur, India.
