# Tyra Décor — Premium Catalogue Website

> **Recycled. Refined. Remarkable.**
> A luxury catalogue website for Tyra Décor — a brand that hand-weaves furniture
> and planters from recycled tyres in Kanpur, India.

This is a **catalogue-only** site (not e-commerce). Visitors browse products, view
details and prices, and reach out via **WhatsApp** or **phone** for orders.

---

## ✨ What's inside

### Storefront (`/`)
- Editorial hero with a signature-piece callout
- "Our Story" section
- **Shop by Category** grid — click any category card to open its dedicated page
- Why Tyra Décor (8-benefit grid)
- **Featured Pieces** — click any card to open a full detail modal with:
  - Large product image + **hover-to-zoom magnifier lens**
  - Full description, specs, price
  - "Enquire via WhatsApp" and "Call" buttons
- Featured Collections showcase
- Testimonials
- Bulk-order CTA banner
- Footer with contact info + floating WhatsApp button

### Category landing pages
`/category/all` · `/category/chairs` · `/category/tables` · `/category/planters` · `/category/suites`

Each has its own editorial hero, italic story quote, search, filters (material, colour,
price range), sort, and "Continue Exploring" section.

### Admin dashboard (`/admin`)
Sign in with a **username + password**:

- **Username:** `TyraDecor`
- **Password:** `TyraDecor@2026`

Once inside you can:
- See 4 stat cards (Total Products / Featured / On Offer / Categories)
- Search and filter products by category
- **Add new products** with the full form
- **Edit prices** and set launch offers (original price vs sale price, with live discount %)
- **Upload product photos** directly from your computer
- Toggle **Featured** to promote a product on the home page
- Delete products

### WhatsApp — no API key needed
Every WhatsApp button uses free `wa.me/` deep-links. Clicking them opens a chat
with **+91 63079 94944** with the product name and SKU pre-filled. Zero cost,
zero setup. If you want to change the number, edit `components/tyra/company.js`.

---

## 🛠 Tech stack

- **Next.js 15** (App Router)
- **React 18** + **Tailwind CSS 3** + **shadcn/ui**
- **Framer Motion** for animations
- **MongoDB** for products
- **Lucide** icons · **Sonner** toasts
- Fonts: Fraunces (display), Cormorant Garamond (serif), Inter (body)

---

## 📂 Project structure

```
/app
├── app/
│   ├── layout.js                     # Root layout, fonts, metadata
│   ├── page.js                       # Home page
│   ├── globals.css                   # Design tokens + utilities
│   ├── admin/page.js                 # Admin dashboard (login + product CMS)
│   ├── category/[slug]/page.js       # Category landing pages
│   └── api/[[...path]]/route.js      # All backend API routes
├── components/
│   ├── ui/                           # shadcn/ui components
│   └── tyra/                         # Tyra-specific components
│       ├── company.js                # Brand info + WhatsApp helpers
│       ├── chrome.js                 # Navbar + Footer + Floating WhatsApp
│       ├── product-card.js
│       ├── product-modal.js          # Product detail modal w/ zoom
│       └── zoom-image.js
├── lib/products-data.js              # Seed catalogue (39 products)
├── public/products/                  # Product photos
├── .env                              # Environment variables
├── package.json
└── README.md                         # this file
```

---

## 🚀 Running locally

```bash
cd /app
yarn install
```

Create `/app/.env`:

```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=tyra_decor
NEXT_PUBLIC_BASE_URL=http://localhost:3000
CORS_ORIGINS=*
ADMIN_USERNAME=TyraDecor
ADMIN_PASSWORD=TyraDecor@2026
```

Then:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000). Products auto-seed into
MongoDB on the first API call.

---

# 🌐 Deploying to Vercel with MongoDB Atlas

Follow these steps in order. Total time: **~15 minutes**.

## Step 1 — Create a MongoDB Atlas database (5 min)

1. Sign up for free at **[cloud.mongodb.com](https://cloud.mongodb.com)**.
2. On the dashboard click **"+ Create"** → **"Cluster"** → **"M0 FREE"**.
3. Pick a region close to your users (Mumbai / Singapore for India).
4. Cluster name: leave as default (`Cluster0` or `M0`). Click **"Create Deployment"**.
5. When it asks to create a database user:
   - Enter a **username** (e.g. `tyra_admin`).
   - Click **"Autogenerate Secure Password"** → **Copy** and save it somewhere safe.
   - Click **"Create Database User"**.
6. When it asks for network access, click **"Add IP Address"** → **"Allow access from anywhere"**. This fills in `0.0.0.0/0`. Click **"Confirm"**.
7. Click **"Choose a Connection Method"** → **"Drivers"** → **Node.js**. Copy the connection string. It looks like:

   ```
   mongodb+srv://tyra_admin:<db_password>@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
   ```

8. Replace `<db_password>` with the actual password you copied earlier. Save this final string — you'll paste it into Vercel in Step 3.

> **Why `0.0.0.0/0`?** Vercel uses dynamic IPs across many regions. The database is
> still protected by the username + password. This is what 99% of Vercel + Atlas
> setups use.

## Step 2 — Push the code to GitHub (3 min)

1. Create a **new empty repository** at [github.com/new](https://github.com/new).
   - Name it e.g. `tyra-decor`.
   - Do **NOT** tick "Initialize with README".
2. In your project folder, run:

   ```bash
   cd /app
   git init
   git branch -M main
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/tyra-decor.git
   git push -u origin main
   ```

3. Refresh GitHub — all your files should now be there.

> Don't want to use the terminal? On GitHub click **"Add file"** → **"Upload files"**
> and drag-and-drop the whole `/app` folder contents.

## Step 3 — Deploy on Vercel (5 min)

1. Go to **[vercel.com](https://vercel.com)** and sign up with the **same GitHub account** from Step 2.
2. On the dashboard, click **"Add New…"** → **"Project"**.
3. Under **"Import Git Repository"** find your `tyra-decor` repo → **"Import"**.
4. On the *Configure Project* screen:
   - Framework Preset: **Next.js** (auto-detected — leave as is)
   - Root Directory: `./` (default)
   - Build & Output Settings: default
5. Expand **"Environment Variables"** and add these five, one at a time:

   | Name                   | Value                                                                 |
   |------------------------|-----------------------------------------------------------------------|
   | `MONGO_URL`            | The Atlas connection string from Step 1.8                             |
   | `DB_NAME`              | `tyra_decor`                                                          |
   | `ADMIN_USERNAME`       | `TyraDecor`                                                           |
   | `ADMIN_PASSWORD`       | `TyraDecor@2026` (change this to something stronger for production)   |
   | `NEXT_PUBLIC_BASE_URL` | Leave blank for now — you'll set it after the first deploy            |

6. Click **"Deploy"**. Vercel builds the site (~1–2 min).
7. When it's done, click the preview URL (e.g. `tyra-decor-abc123.vercel.app`). The catalogue should load with all 39 products.
8. Copy that URL. Go to **Project Settings → Environment Variables → `NEXT_PUBLIC_BASE_URL`**, paste it in, click **Save**. Then in the **Deployments** tab click **⋯ → Redeploy** on the latest deployment.

Your site is live. 🎉

## Step 4 — Test everything (2 min)

Visit these URLs on your Vercel domain to make sure everything works:

- `/` — homepage should load with 39 products
- `/category/chairs` — 6 chairs should show
- `/category/tables` — 4 tables
- `/category/planters` — 13 planters
- `/category/suites` — 16 suites
- `/admin` — sign in with `TyraDecor` / `TyraDecor@2026` (or whatever you set)

Try clicking a product card — the detail modal should open with the zoom-lens image.

## Step 5 — (Optional) Custom domain

1. In Vercel → **Project Settings → Domains** → **Add** → type your domain (e.g. `tyradecor.com`).
2. Vercel will show you 1–2 DNS records to add at your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.):
   - For root (`tyradecor.com`): **`A`** record → `76.76.21.21`
   - For `www.tyradecor.com`: **`CNAME`** → `cname.vercel-dns.com`
3. Add those records. Wait ~30 minutes for DNS to propagate.
4. Vercel auto-issues a free HTTPS certificate. Your custom domain is now live.
5. Update `NEXT_PUBLIC_BASE_URL` in Vercel to your custom domain and redeploy.

## Step 6 — Ongoing changes

Any time you push to `main` on GitHub, Vercel auto-rebuilds and redeploys within 60–90 seconds:

```bash
git add .
git commit -m "Updated the Halo Armchair description"
git push
```

Or edit products live via `/admin` — those changes save to the database instantly, no rebuild needed.

---

## 🔧 Troubleshooting Vercel

| Symptom                                    | Fix                                                                                    |
|--------------------------------------------|----------------------------------------------------------------------------------------|
| Build fails                                | Open the Vercel build log — error will point to the file. Usually a typo or missing env var. |
| Site loads but "Loading catalogue…" stays  | `MONGO_URL` is wrong OR the Atlas IP allowlist doesn't include `0.0.0.0/0`             |
| Admin login says "Incorrect username or password" | `ADMIN_USERNAME` / `ADMIN_PASSWORD` env vars aren't set on Vercel                |
| Product images broken                      | You forgot to commit `public/products/*.jpg` — `git add public/ && git push`           |
| Custom domain shows "Invalid Configuration"| DNS not propagated yet — wait 30 min or re-check the DNS records                       |
| Uploaded photos in admin disappear         | On Vercel, uploaded files reset on each deploy. Use image URLs from a CDN (e.g. Cloudinary) for production photos, or commit images to `/public/products/` |

> **Important note about photo uploads**: The admin "Upload Photo" button saves files
> to `/public/products/`. On Vercel this works during the current deployment but
> resets on the next `git push`. For long-term persistence, either commit the
> uploaded photos to your repo, or set up an image CDN (Cloudinary / imgbb / S3).

---

## 🎨 Customisation

- **Brand colours** — edit `app/globals.css` (`.text-gold`, `.bg-cream`, etc.)
- **Fonts** — swap in `app/layout.js` (uses `next/font/google`)
- **Story / copy** — edit `app/page.js`
- **Contact info & WhatsApp number** — edit `components/tyra/company.js`
- **Seed catalogue** — edit `lib/products-data.js` then hit `POST /api/reseed` with the admin headers
- **Admin credentials** — set `ADMIN_USERNAME` and `ADMIN_PASSWORD` in Vercel env vars
- **Category hero copy** — edit `CATEGORY_META` in `components/tyra/company.js`

---

## 🔒 Security notes

1. **Change `ADMIN_PASSWORD`** on Vercel to something strong — never use the default in production.
2. Never commit real credentials to git — always use Vercel env vars.
3. Rotate your MongoDB Atlas password if it's ever been shared publicly (screenshots, logs).
4. HTTPS is automatic on Vercel — every domain gets a free Let's Encrypt cert.

---

## 📡 API endpoints (reference)

All routes are prefixed with `/api`.

| Method | Endpoint             | Description                          | Auth   |
|--------|----------------------|--------------------------------------|--------|
| GET    | `/api/health`        | Health check                         | —      |
| GET    | `/api/categories`    | List categories                      | —      |
| GET    | `/api/products`      | List products (filters, search, sort)| —      |
| GET    | `/api/products/:id`  | Get one product                      | —      |
| POST   | `/api/products`      | Create a product                     | Admin  |
| PUT    | `/api/products/:id`  | Update a product                     | Admin  |
| DELETE | `/api/products/:id`  | Delete a product                     | Admin  |
| POST   | `/api/upload`        | Upload a product photo (base64)      | Admin  |
| POST   | `/api/admin/verify`  | Verify admin credentials             | —      |
| POST   | `/api/reseed`        | Reset catalogue to seed data         | Admin  |

Admin auth uses two HTTP headers: `x-admin-username: TyraDecor` and `x-admin-password: TyraDecor@2026`.

---

## 📞 Brand contact

- **Phone / WhatsApp:** +91 63079 94944
- **Email:** tyra.decor@gmail.com
- **Instagram:** [@tyra.decor](https://instagram.com/tyra.decor)
- **Address:** 128/18, Y-Block, Kidwai Nagar, Kanpur, U.P. – 208011, India
- **Registered as:** A Brand by R.B. Tubes Pvt. Ltd.

---

Built with care in Kanpur, India.
