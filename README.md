# Tyra Décor — Premium Catalogue Website

> **Recycled. Refined. Remarkable.**
> A modern, premium catalogue website for Tyra Décor — a luxury home décor brand
> making handwoven furniture and planters from recycled tyres in Kanpur, India.

This is **not** an e-commerce store. It is a beautifully-crafted catalogue that lets
customers browse products, view detailed specifications and pricing, and reach out
via an enquiry form / WhatsApp for orders (retail, bulk & B2B).

---

## ✨ Features

### Storefront (`/`)
- **Immersive hero** with brand tagline and CTAs
- **Our Story** — narrative of Tyra Décor's mission, craft & Kanpur roots
- **Why Tyra Décor** — 8 icon cards (quality, materials, delivery, bulk support…)
- **Product Catalogue** — full grid with:
  - Category tabs (Chairs / Tables / Planters / Suites)
  - Search by name, SKU, description
  - Filters: material, colour, price range (slider)
  - Sort by price, name, featured
  - Elegant hover-lift product cards with dimensions, SKU, material, price
  - "Enquire Now" per product → modal form
- **Price Catalogue** — sortable table (name, code, size, material, price, availability)
- **Featured Collections** — highlighted suites with cinematic hero cards
- **Testimonials** — dark-themed elegant reviews
- **Contact** — form + phone + email + address + WhatsApp button + Google Maps embed
- **Footer** — quick links, catalogue links, contact, social icons
- **Floating WhatsApp** — persistent chat button
- **Fully responsive**, mobile-first, smooth Framer Motion animations

### Admin Panel (`/admin`)
Password-protected simple CMS (default password: `tyra2025`).

- Add, edit, delete products
- Toggle "Featured" flag
- Update prices, images (URL), descriptions, categories
- View all customer enquiries
- One-click reply via email or WhatsApp

### Backend API (Next.js API Routes)
All routes are prefixed with `/api`.

| Method | Endpoint                    | Description                          | Auth |
|--------|-----------------------------|--------------------------------------|------|
| GET    | `/api/health`               | Health check                         | —    |
| GET    | `/api/categories`           | List categories                      | —    |
| GET    | `/api/products`             | List products (filters, search, sort)| —    |
| GET    | `/api/products/:id`         | Get one product                      | —    |
| POST   | `/api/products`             | Create product                       | Admin |
| PUT    | `/api/products/:id`         | Update product                       | Admin |
| DELETE | `/api/products/:id`         | Delete product                       | Admin |
| POST   | `/api/enquiries`            | Submit customer enquiry              | —    |
| GET    | `/api/enquiries`            | List all enquiries                   | Admin |
| POST   | `/api/admin/verify`         | Verify admin password                | —    |
| POST   | `/api/reseed`               | Reset catalogue to seed data         | Admin |

**Admin auth** is done via an `x-admin-password` header (kept simple by design).

**Query parameters** for `GET /api/products`:
`category`, `min`, `max`, `search`, `material`, `color`, `sort` (`price_asc` | `price_desc` | `name`), `featured=true`

---

## 🛠 Tech Stack

- **Next.js 15** (App Router)
- **React 18**
- **Tailwind CSS 3** + **shadcn/ui**
- **Framer Motion** for animations
- **MongoDB** (native driver) for products + enquiries
- **Lucide** icons
- **Sonner** toasts
- **Google Fonts** — Playfair Display (serif headings) + Inter (body)

Design system: soft neutral palette (cream `#FAF7F2`, charcoal `#1A1A1A`, soft gold `#B08D57`, warm ivory `#E7C692`).

---

## 📂 Project Structure

```
/app
├── app/
│   ├── layout.js                    # Root layout, fonts, metadata, hides watermarks
│   ├── page.js                      # Landing page (all storefront sections)
│   ├── globals.css                  # Design tokens + utility classes
│   ├── providers.js                 # Client providers wrapper
│   ├── admin/page.js                # Admin CMS panel
│   └── api/[[...path]]/route.js     # All backend API routes (dispatcher)
├── components/ui/                   # shadcn/ui components (pre-installed)
├── lib/
│   ├── products-data.js             # Seed catalogue (all products from the PDF)
│   └── utils/                       # helpers
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

```
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
# Log in as admin, then click "reseed" or:
curl -X POST http://localhost:3000/api/reseed -H "x-admin-password: YOUR_PASSWORD"
```

⚠️ Reseeding **deletes all existing products** and reinstalls the seed catalogue.

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
  "image": "https://…",
  "featured": true,
  "availability": "In Stock | Made to Order | Out of Stock",
  "note": "Cushion sold separately"
}
```

---

## 🌐 Deployment — Step by Step

You have three great options. All are shown below.

### Option A — Vercel (recommended, easiest, free tier available)

Vercel is built by the Next.js team and is the most seamless choice.

1. **Push your code to GitHub / GitLab / Bitbucket.**
   ```bash
   cd /app
   git init
   git add .
   git commit -m "Initial commit — Tyra Decor catalogue"
   git remote add origin git@github.com:YOUR_USERNAME/tyra-decor.git
   git push -u origin main
   ```

2. **Set up a hosted MongoDB.**
   Sign up for a free cluster at [MongoDB Atlas](https://cloud.mongodb.com):
   - Create a free-tier `M0` cluster.
   - Add a database user (username + password).
   - Under **Network Access**, add IP `0.0.0.0/0` (allow from anywhere) or Vercel's IPs.
   - Copy the connection string. It looks like:
     `mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

3. **Deploy on Vercel.**
   - Go to [https://vercel.com](https://vercel.com) → **New Project** → **Import** your Git repo.
   - Framework preset will auto-detect **Next.js**.
   - Under **Environment Variables**, add:
     | Name                  | Value                                                             |
     |-----------------------|-------------------------------------------------------------------|
     | `MONGO_URL`           | your Atlas URI                                                    |
     | `DB_NAME`             | `tyra_decor`                                                      |
     | `ADMIN_PASSWORD`      | a strong password                                                 |
     | `NEXT_PUBLIC_BASE_URL`| your Vercel domain (set after first deploy, e.g. `https://tyra-decor.vercel.app`) |
   - Click **Deploy**.

4. **Custom domain.**
   In Vercel → Project → **Settings** → **Domains**, add `tyradecor.com` (or any domain you own). Vercel will show you the DNS records to update at your registrar.

5. **Done.** Every push to `main` will trigger an automatic re-deploy.

---

### Option B — Docker + any VPS (DigitalOcean, AWS EC2, Hetzner, Linode…)

1. Add a `Dockerfile` at the project root:

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

2. Build and run:
   ```bash
   docker build -t tyra-decor .
   docker run -d --name tyra -p 3000:3000 \
     -e MONGO_URL="mongodb+srv://…" \
     -e DB_NAME="tyra_decor" \
     -e ADMIN_PASSWORD="your-strong-password" \
     -e NEXT_PUBLIC_BASE_URL="https://tyradecor.com" \
     tyra-decor
   ```

3. Put **nginx** (or Caddy) in front for HTTPS. Sample nginx block:

   ```nginx
   server {
     listen 443 ssl http2;
     server_name tyradecor.com www.tyradecor.com;

     ssl_certificate     /etc/letsencrypt/live/tyradecor.com/fullchain.pem;
     ssl_certificate_key /etc/letsencrypt/live/tyradecor.com/privkey.pem;

     location / {
       proxy_pass http://127.0.0.1:3000;
       proxy_http_version 1.1;
       proxy_set_header Host $host;
       proxy_set_header X-Real-IP $remote_addr;
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       proxy_set_header X-Forwarded-Proto $scheme;
     }
   }
   ```

4. Issue an SSL cert with Let's Encrypt:
   ```bash
   sudo certbot --nginx -d tyradecor.com -d www.tyradecor.com
   ```

---

### Option C — Render / Railway / Fly.io (fully-managed alternatives)

All three work identically:
1. Create an account and connect your Git repo.
2. Select **Node / Next.js**.
3. Build command: `yarn build` — Start command: `yarn start`.
4. Set the same environment variables as Option A.
5. Attach or link a MongoDB Atlas cluster.
6. Deploy.

---

## 🎨 Customisation Guide

- **Brand colours** — edit `app/globals.css` (`--accent`, `.text-gold`, `.bg-cream` etc.).
- **Fonts** — swap in `app/layout.js` (uses `next/font/google`).
- **Copy / Story** — edit `app/page.js`, `Story` and `WhyChoose` components.
- **Contact info** — edit the `COMPANY` object at the top of `app/page.js`.
- **Seed catalogue** — edit `lib/products-data.js` then reseed via API.
- **Admin password** — set `ADMIN_PASSWORD` in `.env`.

---

## 🔒 Security Notes for Production

Before going live:

1. **Change `ADMIN_PASSWORD`** to a strong, long secret.
2. **Restrict Mongo Atlas** network access to only your deployment IPs.
3. **Use HTTPS** (Vercel, Render, Fly do this automatically).
4. **Rate-limit** the enquiries endpoint (add Vercel Edge middleware or nginx `limit_req`).
5. Consider swapping the header-based admin auth for a proper JWT / NextAuth setup
   when you're ready to scale.

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

Built with ❤ in Kanpur, India.
