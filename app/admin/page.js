'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import {
  Plus,
  Pencil,
  Trash2,
  LogOut,
  Star,
  Upload,
  Package,
  Tag,
  Search,
  ImageIcon,
  Percent,
} from 'lucide-react';

const emptyForm = {
  sku: '',
  name: '',
  category: 'chairs',
  tagline: '',
  description: '',
  dimensions: '',
  material: 'Handwoven Recycled Rubber',
  colors: 'Charcoal Black',
  price: 0,
  originalPrice: 0,
  image: '',
  featured: false,
  availability: 'In Stock',
  note: '',
};

const inr = (n) => `₹${Number(n).toLocaleString('en-IN')}`;

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [checking, setChecking] = useState(false);

  const [products, setProducts] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const fileRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const savedU = localStorage.getItem('td_admin_u');
    const savedP = localStorage.getItem('td_admin_p');
    if (savedU && savedP) {
      setUsername(savedU);
      setPassword(savedP);
      verify(savedU, savedP);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const verify = async (u, p) => {
    setChecking(true);
    try {
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: u, password: p }),
      });
      if (res.ok) {
        setAuthed(true);
        localStorage.setItem('td_admin_u', u);
        localStorage.setItem('td_admin_p', p);
        await loadAll();
      } else {
        toast.error('Incorrect username or password.');
        localStorage.removeItem('td_admin_u');
        localStorage.removeItem('td_admin_p');
      }
    } catch (e) {
      toast.error('Verification failed.');
    } finally {
      setChecking(false);
    }
  };

  const authHeaders = (u = username, p = password) => ({
    'x-admin-username': u,
    'x-admin-password': p,
  });

  const loadAll = async () => {
    const pRes = await fetch('/api/products');
    const pd = await pRes.json();
    setProducts(pd.products || []);
  };

  const openNew = () => {
    setEditing(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (p) => {
    setEditing(p);
    setForm({
      ...p,
      colors: (p.colors || []).join(', '),
    });
    setDialogOpen(true);
  };

  const handleFile = async (file) => {
    if (!file) return;
    if (file.size > 6 * 1024 * 1024) {
      toast.error('Please pick an image under 6 MB.');
      return;
    }
    setUploading(true);
    try {
      const reader = new FileReader();
      const dataUrl = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders(),
        },
        body: JSON.stringify({
          filename: file.name || 'upload',
          dataUrl,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      setForm((f) => ({ ...f, image: data.url }));
      toast.success('Image uploaded');
    } catch (e) {
      toast.error(e.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const save = async () => {
    if (!form.name || !form.sku) {
      toast.error('Name and SKU are required');
      return;
    }
    const payload = {
      ...form,
      price: Number(form.price),
      originalPrice: Number(form.originalPrice || form.price),
      colors: (form.colors || '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    };
    const url = editing ? `/api/products/${editing.id}` : '/api/products';
    const method = editing ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders(),
      },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      toast.success(editing ? 'Product updated' : 'Product added');
      setDialogOpen(false);
      await loadAll();
    } else {
      toast.error('Failed to save');
    }
  };

  const del = async (p) => {
    if (!confirm(`Delete "${p.name}"?`)) return;
    const res = await fetch(`/api/products/${p.id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    if (res.ok) {
      toast.success('Deleted');
      await loadAll();
    } else {
      toast.error('Failed to delete');
    }
  };

  const logout = () => {
    localStorage.removeItem('td_admin_u');
    localStorage.removeItem('td_admin_p');
    setAuthed(false);
    setUsername('');
    setPassword('');
  };

  const filteredProducts = useMemo(() => {
    let items = products;
    if (filter !== 'all') items = items.filter((p) => p.category === filter);
    if (search) {
      const s = search.toLowerCase();
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(s) ||
          (p.sku || '').toLowerCase().includes(s)
      );
    }
    return items;
  }, [products, filter, search]);

  const stats = useMemo(() => {
    const byCat = {};
    let featured = 0;
    let onOffer = 0;
    let totalRevenuePotential = 0;
    for (const p of products) {
      byCat[p.category] = (byCat[p.category] || 0) + 1;
      if (p.featured) featured++;
      if (p.originalPrice > p.price) onOffer++;
      totalRevenuePotential += Number(p.price) || 0;
    }
    return { byCat, featured, onOffer, total: products.length, totalRevenuePotential };
  }, [products]);

  const discount =
    form.originalPrice > form.price && form.originalPrice > 0
      ? Math.round(((form.originalPrice - form.price) / form.originalPrice) * 100)
      : 0;

  // ============= LOGIN SCREEN =============
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream texture-paper px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <div className="font-serif text-3xl text-charcoal">
                Tyra <span className="text-gold italic">Décor</span>
              </div>
            </Link>
            <p className="text-[11px] uppercase tracking-[0.4em] text-gold font-semibold mt-2">
              Admin Portal
            </p>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-black/5">
            <h1 className="font-serif text-2xl text-charcoal font-medium mb-1">
              Sign In
            </h1>
            <p className="text-sm text-muted-warm mb-6">
              Enter your credentials to manage the catalogue.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                verify(username, password);
              }}
              className="space-y-4"
            >
              <div>
                <Label className="text-xs uppercase tracking-widest text-muted-warm">
                  Username
                </Label>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-2 h-11 rounded-xl"
                  required
                  autoComplete="username"
                />
              </div>
              <div>
                <Label className="text-xs uppercase tracking-widest text-muted-warm">
                  Password
                </Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 h-11 rounded-xl"
                  required
                  autoComplete="current-password"
                />
              </div>
              <Button
                type="submit"
                disabled={checking}
                className="w-full bg-charcoal hover:bg-black text-white rounded-full uppercase tracking-[0.3em] text-xs h-12 mt-2 font-semibold"
              >
                {checking ? 'Verifying…' : 'Sign In'}
              </Button>
            </form>
          </div>
          <p className="text-center text-[11px] text-muted-warm mt-6 uppercase tracking-widest">
            <Link href="/" className="hover:text-gold">← Back to storefront</Link>
          </p>
        </div>
      </div>
    );
  }

  // ============= ADMIN DASHBOARD =============
  return (
    <div className="min-h-screen bg-cream texture-paper">
      {/* Top bar */}
      <header className="bg-charcoal text-white sticky top-0 z-30 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <Link href="/" className="font-serif text-xl md:text-2xl">
            Tyra <span className="text-champagne italic">Décor</span>
            <span className="hidden md:inline text-white/50 text-xs ml-3 uppercase tracking-widest">Admin</span>
          </Link>
          <div className="flex items-center gap-2 md:gap-4">
            <span className="hidden md:inline text-[11px] uppercase tracking-widest text-champagne font-semibold">
              Products
            </span>
            <button
              onClick={logout}
              className="ml-2 text-xs text-white/60 hover:text-white flex items-center gap-1"
              title="Logout"
            >
              <LogOut size={14} />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {true && (
          <>
            {/* Welcome */}
            <div className="mb-8">
              <p className="text-[11px] uppercase tracking-[0.4em] text-gold font-semibold mb-2">
                Welcome back, {username}
              </p>
              <h1 className="font-serif text-3xl md:text-4xl text-charcoal font-medium">
                Manage your catalogue
              </h1>
              <p className="text-muted-warm mt-2">
                Add products, update prices, set launch offers, and upload photos.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
              <StatCard
                icon={Package}
                label="Total Products"
                value={stats.total}
              />
              <StatCard
                icon={Star}
                label="Featured"
                value={stats.featured}
              />
              <StatCard
                icon={Percent}
                label="On Offer"
                value={stats.onOffer}
              />
              <StatCard
                icon={Tag}
                label="Categories"
                value={Object.keys(stats.byCat).length}
              />
            </div>

            {/* Filter bar */}
            <div className="bg-white rounded-2xl p-4 border border-black/5 mb-6 flex flex-col md:flex-row md:items-center gap-3">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-warm" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products by name or SKU…"
                  className="pl-10 h-10 rounded-full border-black/10"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {['all', 'chairs', 'tables', 'planters', 'suites', 'sculptures'].map((c) => (
                  <button
                    key={c}
                    onClick={() => setFilter(c)}
                    className={`px-4 h-10 text-[11px] uppercase tracking-widest rounded-full font-semibold border transition ${
                      filter === c
                        ? 'bg-charcoal text-white border-charcoal'
                        : 'bg-white text-charcoal border-black/10 hover:border-charcoal'
                    }`}
                  >
                    {c === 'all' ? 'All' : c}
                    {filter === c && c !== 'all' && stats.byCat[c] && (
                      <span className="ml-1 opacity-70">({stats.byCat[c]})</span>
                    )}
                  </button>
                ))}
              </div>
              <Button
                onClick={openNew}
                className="bg-gold hover:bg-[#7d5f34] text-white rounded-full uppercase tracking-widest text-xs h-10 font-semibold"
              >
                <Plus size={16} className="mr-2" /> Add Product
              </Button>
            </div>

            {/* Products table */}
            <div className="bg-white border border-black/5 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-cream-light hover:bg-cream-light">
                      <TableHead className="text-[10px] uppercase tracking-widest">Product</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-widest">Category</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-widest">SKU</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-widest">Price</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-widest">Offer</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-widest">Featured</TableHead>
                      <TableHead className="text-right text-[10px] uppercase tracking-widest">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((p) => {
                      const off =
                        p.originalPrice > p.price
                          ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
                          : 0;
                      return (
                        <TableRow key={p.id} className="hover:bg-cream-light">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <img
                                src={p.image}
                                alt=""
                                className="w-14 h-14 object-contain bg-cream-light rounded-lg border border-black/5"
                              />
                              <div className="min-w-0">
                                <div className="font-medium text-charcoal truncate">{p.name}</div>
                                <div className="text-xs text-muted-warm truncate italic">{p.tagline}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="capitalize text-sm">{p.category}</TableCell>
                          <TableCell className="text-xs font-mono">{p.sku}</TableCell>
                          <TableCell>
                            <div className="font-serif text-lg">{inr(p.price)}</div>
                            {p.originalPrice > p.price && (
                              <div className="text-[10px] text-muted-warm line-through">
                                {inr(p.originalPrice)}
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            {off > 0 ? (
                              <span className="bg-red-50 text-red-700 border border-red-200 text-[10px] uppercase tracking-widest rounded-full px-2 py-1 font-semibold">
                                −{off}%
                              </span>
                            ) : (
                              <span className="text-muted-warm text-xs">—</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {p.featured ? (
                              <Star size={16} className="text-gold" fill="currentColor" />
                            ) : (
                              <span className="text-muted-warm text-xs">—</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openEdit(p)}
                              className="rounded-full hover:bg-cream-dark"
                              title="Edit"
                            >
                              <Pencil size={14} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => del(p)}
                              className="rounded-full text-red-600 hover:text-red-700 hover:bg-red-50"
                              title="Delete"
                            >
                              <Trash2 size={14} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {filteredProducts.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-12 text-muted-warm">
                          No products match your search.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </>
        )}
      </main>

      {/* ============= EDIT / ADD DIALOG ============= */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl rounded-3xl max-h-[92vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl md:text-3xl">
              {editing ? 'Edit Product' : 'Add New Product'}
            </DialogTitle>
            <DialogDescription>
              {editing ? 'Update the details below and save.' : 'Fill in the product details and save.'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid md:grid-cols-5 gap-6 mt-4">
            {/* Left: image + upload */}
            <div className="md:col-span-2 space-y-4">
              <div className="aspect-square bg-cream-light rounded-2xl overflow-hidden border border-black/5 relative">
                {form.image ? (
                  <img src={form.image} alt="preview" className="w-full h-full object-contain p-4" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-muted-warm">
                    <ImageIcon size={40} className="mb-2 opacity-40" />
                    <p className="text-xs uppercase tracking-widest">No image</p>
                  </div>
                )}
                {uploading && (
                  <div className="absolute inset-0 bg-white/80 flex items-center justify-center text-xs uppercase tracking-widest">
                    Uploading…
                  </div>
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
              <Button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="w-full bg-charcoal hover:bg-black text-white rounded-full uppercase tracking-widest text-xs h-11 font-semibold"
              >
                <Upload size={14} className="mr-2" />
                {form.image ? 'Change Photo' : 'Upload Photo'}
              </Button>
              <div>
                <Label className="text-[10px] uppercase tracking-widest text-muted-warm">
                  Or paste image URL
                </Label>
                <Input
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="mt-2 rounded-full h-10 text-xs"
                  placeholder="/products/… or https://…"
                />
              </div>
            </div>

            {/* Right: form fields */}
            <div className="md:col-span-3 space-y-4">
              <div>
                <Label>Name *</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-2 rounded-xl"
                  placeholder="The Halo Armchair"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>SKU *</Label>
                  <Input
                    value={form.sku}
                    onChange={(e) => setForm({ ...form, sku: e.target.value })}
                    className="mt-2 rounded-xl"
                    placeholder="TD-CH-XXXX"
                  />
                </div>
                <div>
                  <Label>Category</Label>
                  <Select
                    value={form.category}
                    onValueChange={(v) => setForm({ ...form, category: v })}
                  >
                    <SelectTrigger className="mt-2 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chairs">Chairs</SelectItem>
                      <SelectItem value="tables">Tables</SelectItem>
                      <SelectItem value="planters">Planters</SelectItem>
                      <SelectItem value="suites">Suites</SelectItem>
                      <SelectItem value="sculptures">Sculptures</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Tagline</Label>
                <Input
                  value={form.tagline}
                  onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                  className="mt-2 rounded-xl"
                  placeholder="Short italic tagline"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="mt-2 rounded-xl"
                />
              </div>

              {/* Price + offer section */}
              <div className="bg-gold/5 border border-gold/20 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Percent size={14} className="text-gold" />
                  <span className="text-[11px] uppercase tracking-widest text-gold font-semibold">
                    Pricing & Offers
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Original Price (₹)</Label>
                    <Input
                      type="number"
                      value={form.originalPrice}
                      onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
                      className="mt-2 rounded-xl"
                      placeholder="6000"
                    />
                    <p className="text-[10px] text-muted-warm mt-1">Shown crossed-out.</p>
                  </div>
                  <div>
                    <Label>Sale Price (₹)</Label>
                    <Input
                      type="number"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      className="mt-2 rounded-xl"
                      placeholder="4500"
                    />
                    <p className="text-[10px] text-muted-warm mt-1">What customers pay.</p>
                  </div>
                </div>
                {discount > 0 && (
                  <div className="mt-3 inline-flex items-center gap-2 bg-red-100 text-red-700 rounded-full px-3 py-1 text-[11px] uppercase tracking-widest font-semibold">
                    <Percent size={11} />
                    {discount}% Off Applied
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Dimensions</Label>
                  <Input
                    value={form.dimensions}
                    onChange={(e) => setForm({ ...form, dimensions: e.target.value })}
                    className="mt-2 rounded-xl"
                    placeholder="100 (H) x 45 (Seat) cm"
                  />
                </div>
                <div>
                  <Label>Material</Label>
                  <Input
                    value={form.material}
                    onChange={(e) => setForm({ ...form, material: e.target.value })}
                    className="mt-2 rounded-xl"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Colours (comma-separated)</Label>
                  <Input
                    value={form.colors}
                    onChange={(e) => setForm({ ...form, colors: e.target.value })}
                    className="mt-2 rounded-xl"
                  />
                </div>
                <div>
                  <Label>Availability</Label>
                  <Select
                    value={form.availability}
                    onValueChange={(v) => setForm({ ...form, availability: v })}
                  >
                    <SelectTrigger className="mt-2 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="In Stock">In Stock</SelectItem>
                      <SelectItem value="Made to Order">Made to Order</SelectItem>
                      <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Note (optional)</Label>
                <Input
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                  className="mt-2 rounded-xl"
                  placeholder="e.g. Cushion sold separately"
                />
              </div>
              <div className="flex items-center gap-3 bg-cream-light rounded-2xl p-4 border border-black/5">
                <Switch
                  checked={form.featured}
                  onCheckedChange={(v) => setForm({ ...form, featured: v })}
                />
                <div>
                  <Label className="cursor-pointer">Mark as Featured</Label>
                  <p className="text-[10px] text-muted-warm mt-0.5">
                    Featured products appear in "Featured Pieces" on the home page.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-6 gap-2">
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              className="rounded-full uppercase tracking-widest text-xs h-11 font-semibold"
            >
              Cancel
            </Button>
            <Button
              onClick={save}
              className="bg-charcoal hover:bg-black text-white rounded-full uppercase tracking-widest text-xs h-11 font-semibold px-6"
            >
              {editing ? 'Save Changes' : 'Add Product'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-black/5">
      <div className="flex items-center justify-between mb-3">
        <div className="w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center">
          <Icon size={18} />
        </div>
      </div>
      <div className="font-serif text-3xl text-charcoal font-medium">{value}</div>
      <div className="text-[10px] uppercase tracking-widest text-muted-warm mt-1 font-semibold">
        {label}
      </div>
    </div>
  );
}
