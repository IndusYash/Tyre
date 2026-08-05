import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
import { SEED_PRODUCTS, CATEGORIES } from '@/lib/products-data';

// ---- Mongo singleton ----
let cachedClient = null;
async function getDb() {
  if (!cachedClient) {
    cachedClient = new MongoClient(process.env.MONGO_URL);
    await cachedClient.connect();
  }
  return cachedClient.db(process.env.DB_NAME || 'tyra_decor');
}

async function ensureSeed(db) {
  const products = db.collection('products');
  const count = await products.countDocuments({});
  if (count === 0) {
    const now = new Date().toISOString();
    const docs = SEED_PRODUCTS.map((p) => ({
      id: uuidv4(),
      ...p,
      createdAt: now,
      updatedAt: now,
    }));
    await products.insertMany(docs);
  }
}

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'TyraDecor';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'TyraDecor@2026';
function isAdmin(req) {
  const auth = req.headers.get('x-admin-password') || '';
  const user = req.headers.get('x-admin-username') || '';
  return auth === ADMIN_PASSWORD && user === ADMIN_USERNAME;
}

function json(data, status = 200) {
  return NextResponse.json(data, { status });
}

// ---- Route dispatcher ----
async function route(req, method, segments) {
  const db = await getDb();
  await ensureSeed(db);

  const path = segments.join('/');

  // GET /api/health
  if (method === 'GET' && path === 'health') {
    return json({ ok: true, brand: 'Tyra Decor' });
  }

  // GET /api/categories
  if (method === 'GET' && path === 'categories') {
    return json({ categories: CATEGORIES });
  }

  // GET /api/products?category=&min=&max=&search=&material=&color=&sort=
  if (method === 'GET' && path === 'products') {
    const url = new URL(req.url);
    const category = url.searchParams.get('category');
    const min = parseFloat(url.searchParams.get('min')) || 0;
    const max = parseFloat(url.searchParams.get('max')) || 1e9;
    const search = (url.searchParams.get('search') || '').toLowerCase();
    const material = url.searchParams.get('material');
    const color = url.searchParams.get('color');
    const sort = url.searchParams.get('sort') || 'default';
    const featured = url.searchParams.get('featured');

    const query = { price: { $gte: min, $lte: max } };
    if (category && category !== 'all') query.category = category;
    if (material) query.material = material;
    if (color) query.colors = color;
    if (featured === 'true') query.featured = true;

    let items = await db.collection('products').find(query).toArray();
    if (search) {
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(search) ||
          p.description.toLowerCase().includes(search) ||
          (p.sku || '').toLowerCase().includes(search) ||
          (p.tagline || '').toLowerCase().includes(search)
      );
    }
    if (sort === 'price_asc') items.sort((a, b) => a.price - b.price);
    else if (sort === 'price_desc') items.sort((a, b) => b.price - a.price);
    else if (sort === 'name') items.sort((a, b) => a.name.localeCompare(b.name));

    // strip mongo _id
    items = items.map(({ _id, ...rest }) => rest);
    return json({ products: items });
  }

  // GET /api/products/:id
  if (method === 'GET' && segments[0] === 'products' && segments[1]) {
    const item = await db.collection('products').findOne({ id: segments[1] });
    if (!item) return json({ error: 'Not found' }, 404);
    const { _id, ...rest } = item;
    return json({ product: rest });
  }

  // POST /api/products (admin)
  if (method === 'POST' && path === 'products') {
    if (!isAdmin(req)) return json({ error: 'Unauthorized' }, 401);
    const body = await req.json();
    const now = new Date().toISOString();
    const doc = {
      id: uuidv4(),
      sku: body.sku || `TD-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
      name: body.name || 'Untitled Product',
      category: body.category || 'chairs',
      tagline: body.tagline || '',
      description: body.description || '',
      dimensions: body.dimensions || '',
      material: body.material || 'Handwoven Recycled Rubber',
      colors: body.colors || ['Charcoal Black'],
      price: Number(body.price) || 0,
      originalPrice: Number(body.originalPrice) || Number(body.price) || 0,
      image: body.image || '',
      featured: !!body.featured,
      availability: body.availability || 'In Stock',
      note: body.note || '',
      createdAt: now,
      updatedAt: now,
    };
    await db.collection('products').insertOne(doc);
    const { _id, ...rest } = doc;
    return json({ product: rest }, 201);
  }

  // PUT /api/products/:id (admin)
  if (method === 'PUT' && segments[0] === 'products' && segments[1]) {
    if (!isAdmin(req)) return json({ error: 'Unauthorized' }, 401);
    const body = await req.json();
    const update = { ...body, updatedAt: new Date().toISOString() };
    delete update._id;
    delete update.id;
    if (update.price !== undefined) update.price = Number(update.price);
    if (update.originalPrice !== undefined) update.originalPrice = Number(update.originalPrice);
    await db.collection('products').updateOne({ id: segments[1] }, { $set: update });
    const item = await db.collection('products').findOne({ id: segments[1] });
    if (!item) return json({ error: 'Not found' }, 404);
    const { _id, ...rest } = item;
    return json({ product: rest });
  }

  // DELETE /api/products/:id (admin)
  if (method === 'DELETE' && segments[0] === 'products' && segments[1]) {
    if (!isAdmin(req)) return json({ error: 'Unauthorized' }, 401);
    await db.collection('products').deleteOne({ id: segments[1] });
    return json({ ok: true });
  }

  // POST /api/admin/verify
  if (method === 'POST' && path === 'admin/verify') {
    const body = await req.json();
    if (body.username === ADMIN_USERNAME && body.password === ADMIN_PASSWORD) {
      return json({ ok: true });
    }
    return json({ ok: false }, 401);
  }

  // POST /api/upload  — accepts { filename, dataUrl } and saves to /public/products/
  if (method === 'POST' && path === 'upload') {
    if (!isAdmin(req)) return json({ error: 'Unauthorized' }, 401);
    const fs = await import('fs');
    const pathMod = await import('path');
    const body = await req.json();
    if (!body.dataUrl || !body.filename) {
      return json({ error: 'filename and dataUrl required' }, 400);
    }
    const match = body.dataUrl.match(/^data:(image\/(png|jpeg|jpg|webp|gif));base64,(.+)$/);
    if (!match) return json({ error: 'Invalid image dataUrl' }, 400);
    const ext = match[2] === 'jpeg' ? 'jpg' : match[2];
    const buf = Buffer.from(match[3], 'base64');
    // Sanitise filename
    const safe = body.filename
      .toLowerCase()
      .replace(/\.[a-z0-9]+$/, '')
      .replace(/[^a-z0-9-_]/g, '-')
      .slice(0, 60);
    const finalName = `${safe || 'upload'}-${Date.now()}.${ext}`;
    const dir = pathMod.join(process.cwd(), 'public', 'products');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(pathMod.join(dir, finalName), buf);
    return json({ ok: true, url: `/products/${finalName}` }, 201);
  }

  // POST /api/reseed (admin only)
  if (method === 'POST' && path === 'reseed') {
    if (!isAdmin(req)) return json({ error: 'Unauthorized' }, 401);
    await db.collection('products').deleteMany({});
    const now = new Date().toISOString();
    const docs = SEED_PRODUCTS.map((p) => ({
      id: uuidv4(),
      ...p,
      createdAt: now,
      updatedAt: now,
    }));
    await db.collection('products').insertMany(docs);
    return json({ ok: true, count: docs.length });
  }

  return json({ error: 'Route not found', path, method }, 404);
}

function handler(method) {
  return async (req, ctx) => {
    try {
      const { path } = await ctx.params;
      const segments = Array.isArray(path) ? path : [];
      return await route(req, method, segments);
    } catch (e) {
      console.error('API error:', e);
      return NextResponse.json({ error: e.message || 'Server error' }, { status: 500 });
    }
  };
}

export const GET = handler('GET');
export const POST = handler('POST');
export const PUT = handler('PUT');
export const DELETE = handler('DELETE');
export const PATCH = handler('PATCH');
