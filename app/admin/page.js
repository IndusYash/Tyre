'use client';

import { useEffect, useState } from 'react';
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
import { Plus, Pencil, Trash2, LogOut, Star, Mail } from 'lucide-react';

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

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [checking, setChecking] = useState(false);

  const [tab, setTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    const saved = typeof window !== 'undefined' && localStorage.getItem('td_admin_pw');
    if (saved) {
      setPassword(saved);
      verify(saved);
    }
  }, []);

  const verify = async (pw) => {
    setChecking(true);
    try {
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pw }),
      });
      if (res.ok) {
        setAuthed(true);
        localStorage.setItem('td_admin_pw', pw);
        await loadAll(pw);
      } else {
        toast.error('Incorrect password.');
        localStorage.removeItem('td_admin_pw');
      }
    } catch (e) {
      toast.error('Verification failed.');
    } finally {
      setChecking(false);
    }
  };

  const loadAll = async (pw) => {
    const headers = { 'x-admin-password': pw || password };
    const [pRes, eRes] = await Promise.all([
      fetch('/api/products'),
      fetch('/api/enquiries', { headers }),
    ]);
    const p = await pRes.json();
    const e = await eRes.json();
    setProducts(p.products || []);
    setEnquiries(e.enquiries || []);
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

  const save = async () => {
    const payload = {
      ...form,
      price: Number(form.price),
      originalPrice: Number(form.originalPrice || form.price),
      colors: form.colors
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
        'x-admin-password': password,
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
      headers: { 'x-admin-password': password },
    });
    if (res.ok) {
      toast.success('Deleted');
      await loadAll();
    } else {
      toast.error('Failed to delete');
    }
  };

  const logout = () => {
    localStorage.removeItem('td_admin_pw');
    setAuthed(false);
    setPassword('');
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2] px-4">
        <div className="w-full max-w-md bg-white p-8 border border-black/10">
          <div className="text-center mb-8">
            <div className="font-serif text-2xl text-charcoal">
              Tyra <span className="text-gold">Décor</span> Admin
            </div>
            <p className="text-sm text-muted-warm mt-1">Sign in to manage catalogue</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              verify(password);
            }}
            className="space-y-4"
          >
            <div>
              <Label className="text-xs uppercase tracking-widest">Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 rounded-none"
                required
              />
              <p className="text-[11px] text-muted-warm mt-2">
                Default: <code className="font-mono">tyra2025</code> (change via <code>ADMIN_PASSWORD</code> env var)
              </p>
            </div>
            <Button
              type="submit"
              disabled={checking}
              className="w-full bg-charcoal hover:bg-black text-white rounded-none uppercase tracking-widest text-xs h-11"
            >
              {checking ? 'Verifying…' : 'Sign In'}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <header className="bg-charcoal text-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="font-serif text-xl">
            Tyra <span className="text-[#E7C692]">Décor</span>
            <span className="text-white/50 text-xs ml-2">Admin</span>
          </a>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTab('products')}
              className={`px-3 py-1.5 text-xs uppercase tracking-widest ${
                tab === 'products' ? 'bg-white text-charcoal' : 'text-white/70 hover:text-white'
              }`}
            >
              Products ({products.length})
            </button>
            <button
              onClick={() => setTab('enquiries')}
              className={`px-3 py-1.5 text-xs uppercase tracking-widest ${
                tab === 'enquiries' ? 'bg-white text-charcoal' : 'text-white/70 hover:text-white'
              }`}
            >
              Enquiries ({enquiries.length})
            </button>
            <button
              onClick={logout}
              className="ml-4 text-xs text-white/60 hover:text-white flex items-center gap-1"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {tab === 'products' && (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="font-serif text-3xl text-charcoal">Product Catalogue</h1>
                <p className="text-sm text-muted-warm">Add, edit or remove products.</p>
              </div>
              <Button
                onClick={openNew}
                className="bg-charcoal hover:bg-black text-white rounded-none uppercase tracking-widest text-xs h-11"
              >
                <Plus size={16} className="mr-2" /> Add Product
              </Button>
            </div>
            <div className="bg-white border border-black/10 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Featured</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            alt=""
                            className="w-12 h-12 object-cover"
                          />
                          <div>
                            <div className="font-medium">{p.name}</div>
                            <div className="text-xs text-muted-warm line-clamp-1">
                              {p.tagline}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="capitalize">{p.category}</TableCell>
                      <TableCell className="text-xs">{p.sku}</TableCell>
                      <TableCell>₹{Number(p.price).toLocaleString('en-IN')}</TableCell>
                      <TableCell>
                        {p.featured && <Star size={16} className="text-gold fill-current" />}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEdit(p)}
                          className="rounded-none"
                        >
                          <Pencil size={14} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => del(p)}
                          className="rounded-none text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )}

        {tab === 'enquiries' && (
          <>
            <h1 className="font-serif text-3xl text-charcoal mb-2">Customer Enquiries</h1>
            <p className="text-sm text-muted-warm mb-6">
              All customer messages sent through the site.
            </p>
            <div className="grid gap-4">
              {enquiries.length === 0 && (
                <div className="text-center py-16 bg-white border border-black/10 text-muted-warm">
                  No enquiries yet.
                </div>
              )}
              {enquiries.map((e) => (
                <div key={e.id} className="bg-white border border-black/10 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-medium text-charcoal">{e.name}</div>
                      <div className="text-xs text-muted-warm">
                        {e.email}
                        {e.phone && ` • ${e.phone}`}
                      </div>
                    </div>
                    <div className="text-xs text-muted-warm">
                      {new Date(e.createdAt).toLocaleString('en-IN')}
                    </div>
                  </div>
                  {e.productName && (
                    <div className="inline-block bg-[#F3EEE5] text-xs px-2 py-1 mb-3">
                      About: {e.productName} ({e.productSku})
                    </div>
                  )}
                  <p className="text-sm text-charcoal/90 whitespace-pre-wrap">
                    {e.message}
                  </p>
                  <div className="mt-4 flex gap-3">
                    <a
                      href={`mailto:${e.email}`}
                      className="text-xs uppercase tracking-widest text-gold hover:underline flex items-center gap-1"
                    >
                      <Mail size={12} /> Reply by Email
                    </a>
                    {e.phone && (
                      <a
                        href={`https://wa.me/${e.phone.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs uppercase tracking-widest text-gold hover:underline"
                      >
                        WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl rounded-none max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">
              {editing ? 'Edit Product' : 'Add New Product'}
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label>Name</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-2 rounded-none"
              />
            </div>
            <div>
              <Label>SKU</Label>
              <Input
                value={form.sku}
                onChange={(e) => setForm({ ...form, sku: e.target.value })}
                className="mt-2 rounded-none"
              />
            </div>
            <div>
              <Label>Category</Label>
              <Select
                value={form.category}
                onValueChange={(v) => setForm({ ...form, category: v })}
              >
                <SelectTrigger className="mt-2 rounded-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="chairs">Chairs</SelectItem>
                  <SelectItem value="tables">Tables</SelectItem>
                  <SelectItem value="planters">Planters</SelectItem>
                  <SelectItem value="suites">Suites</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2">
              <Label>Tagline</Label>
              <Input
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                className="mt-2 rounded-none"
              />
            </div>
            <div className="col-span-2">
              <Label>Description</Label>
              <Textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="mt-2 rounded-none"
              />
            </div>
            <div>
              <Label>Dimensions</Label>
              <Input
                value={form.dimensions}
                onChange={(e) => setForm({ ...form, dimensions: e.target.value })}
                className="mt-2 rounded-none"
              />
            </div>
            <div>
              <Label>Material</Label>
              <Input
                value={form.material}
                onChange={(e) => setForm({ ...form, material: e.target.value })}
                className="mt-2 rounded-none"
              />
            </div>
            <div>
              <Label>Colours (comma-separated)</Label>
              <Input
                value={form.colors}
                onChange={(e) => setForm({ ...form, colors: e.target.value })}
                className="mt-2 rounded-none"
              />
            </div>
            <div>
              <Label>Availability</Label>
              <Select
                value={form.availability}
                onValueChange={(v) => setForm({ ...form, availability: v })}
              >
                <SelectTrigger className="mt-2 rounded-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="In Stock">In Stock</SelectItem>
                  <SelectItem value="Made to Order">Made to Order</SelectItem>
                  <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Price (₹)</Label>
              <Input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="mt-2 rounded-none"
              />
            </div>
            <div>
              <Label>Original Price (₹)</Label>
              <Input
                type="number"
                value={form.originalPrice}
                onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
                className="mt-2 rounded-none"
              />
            </div>
            <div className="col-span-2">
              <Label>Image URL</Label>
              <Input
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                className="mt-2 rounded-none"
                placeholder="https://…"
              />
              {form.image && (
                <img
                  src={form.image}
                  alt="preview"
                  className="mt-3 w-32 h-32 object-cover border border-black/10"
                />
              )}
            </div>
            <div className="col-span-2">
              <Label>Note (e.g. Cushion sold separately)</Label>
              <Input
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                className="mt-2 rounded-none"
              />
            </div>
            <div className="col-span-2 flex items-center gap-3">
              <Switch
                checked={form.featured}
                onCheckedChange={(v) => setForm({ ...form, featured: v })}
              />
              <Label className="cursor-pointer">Mark as Featured</Label>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              className="rounded-none"
            >
              Cancel
            </Button>
            <Button
              onClick={save}
              className="bg-charcoal hover:bg-black text-white rounded-none uppercase tracking-widest text-xs"
            >
              {editing ? 'Save Changes' : 'Add Product'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
