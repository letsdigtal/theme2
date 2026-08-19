import { useEffect, useMemo, useRef, useState } from "react";
import type { Category, Product, SortKey } from "./types";
import { PRODUCTS } from "./data/products";
import { useCart } from "./hooks/useCart";
import Header, { Ticker } from "./components/Header";
import Hero from "./components/Hero";
import FilterBar from "./components/FilterBar";
import ProductCard from "./components/ProductCard";
import ProductModal from "./components/ProductModal";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import RoastLog from "./components/RoastLog";
import Footer from "./components/Footer";
import Reveal from "./components/Reveal";
import { IconCheck, IconSearch } from "./components/icons";

interface ToastState {
  id: number;
  message: string;
  withAction: boolean;
}

export default function App() {
  const cart = useCart();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "all">("all");
  const [sort, setSort] = useState<SortKey>("featured");
  const [selected, setSelected] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);
  const toastTimer = useRef<number | null>(null);

  const showToast = (message: string, withAction = false) => {
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    setToast({ id: Date.now(), message, withAction });
    toastTimer.current = window.setTimeout(() => setToast(null), 3400);
  };

  useEffect(
    () => () => {
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
    },
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = PRODUCTS.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (!q) return true;
      const haystack = [p.name, p.origin, p.region, p.roastLabel, p.process, ...p.notes]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "roast":
        list = [...list].sort((a, b) => b.roast - a.roast);
        break;
      default:
        break;
    }
    return list;
  }, [query, category, sort]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: PRODUCTS.length, "single-origin": 0, blend: 0, decaf: 0 };
    PRODUCTS.forEach((p) => {
      c[p.category] += 1;
    });
    return c;
  }, []);

  const handleQuickAdd = (p: Product) => {
    cart.add(p.id, "Whole bean", 1);
    showToast(`${p.name} — whole bean added to your crate`, true);
  };

  const handleModalAdd = (p: Product, grind: string, qty: number) => {
    cart.add(p.id, grind, qty);
    setSelected(null);
    showToast(`${qty} × ${p.name} (${grind.toLowerCase()}) in your crate`, true);
  };

  const handleCheckoutComplete = () => {
    cart.clear();
    setCheckoutOpen(false);
    showToast("Order placed — confirmation on its way");
  };

  return (
    <div className="min-h-screen">
      <div className="grain" aria-hidden />
      <Ticker />
      <Header count={cart.count} onOpenCart={() => setCartOpen(true)} />

      <main>
        <Hero />

        <section id="shelf" className="scroll-mt-24">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
            <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
              <Reveal>
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-caramel-deep">The shelf</p>
                <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
                  Six beans. This week only.
                </h2>
              </Reveal>
              <Reveal delay={120} className="max-w-xs">
                <p className="text-sm leading-relaxed text-mocha/80 sm:text-right">
                  Roasted Tuesday &amp; Friday, shipped the same day. When a batch sells out,
                  it&rsquo;s gone until the next drum.
                </p>
              </Reveal>
            </div>

            <Reveal delay={160}>
              <FilterBar
                query={query}
                onQuery={setQuery}
                category={category}
                onCategory={setCategory}
                sort={sort}
                onSort={setSort}
                counts={counts}
                shown={filtered.length}
                total={PRODUCTS.length}
              />
            </Reveal>

            {filtered.length > 0 ? (
              <div className="mt-9 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((p, i) => (
                  <Reveal key={p.id} delay={(i % 3) * 90} className="h-full">
                    <ProductCard product={p} onOpen={setSelected} onQuickAdd={handleQuickAdd} />
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="mt-9 flex animate-fade flex-col items-center gap-4 rounded-xl border-2 border-dashed border-espresso/15 bg-crema/60 px-6 py-16 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-espresso/5 text-fawn">
                  <IconSearch className="h-7 w-7" />
                </span>
                <p className="font-display text-2xl font-bold">Nothing in the drum matches that</p>
                <p className="max-w-sm text-sm leading-relaxed text-mocha/80">
                  Try a tasting note like &ldquo;chocolate&rdquo; or an origin like
                  &ldquo;Kenya&rdquo; — or clear everything and start fresh.
                </p>
                <button
                  onClick={() => {
                    setQuery("");
                    setCategory("all");
                  }}
                  className="mt-1 rounded-full bg-espresso px-6 py-3 text-sm font-semibold text-crema transition-colors duration-300 hover:bg-caramel-deep"
                >
                  Clear search &amp; filters
                </button>
              </div>
            )}
          </div>
        </section>

        <RoastLog />
      </main>

      <Footer />

      <ProductModal product={selected} onClose={() => setSelected(null)} onAdd={handleModalAdd} />

      <CartDrawer
        open={cartOpen}
        lines={cart.lines}
        subtotal={cart.subtotal}
        count={cart.count}
        onClose={() => setCartOpen(false)}
        onSetQty={cart.setQty}
        onRemove={cart.remove}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
        onBrowse={() => {
          setCartOpen(false);
          window.setTimeout(() => document.getElementById("shelf")?.scrollIntoView({ behavior: "smooth" }), 80);
        }}
      />

      <CheckoutModal
        open={checkoutOpen}
        lines={cart.lines}
        subtotal={cart.subtotal}
        onClose={() => setCheckoutOpen(false)}
        onComplete={handleCheckoutComplete}
      />

      {toast && (
        <div key={toast.id} className="fixed bottom-5 left-1/2 z-[95] -translate-x-1/2 animate-pop" role="status">
          <div className="flex items-center gap-3 rounded-full border border-crema/10 bg-espresso py-2 pl-3 pr-2 text-crema shadow-[0_24px_50px_-18px_rgba(23,13,8,0.7)]">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-caramel text-espresso">
              <IconCheck className="h-4 w-4" strokeWidth={2.4} />
            </span>
            <p className="max-w-[58vw] truncate text-sm font-medium">{toast.message}</p>
            {toast.withAction && (
              <button
                onClick={() => {
                  setToast(null);
                  setCartOpen(true);
                }}
                className="shrink-0 rounded-full bg-crema/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] transition-colors duration-200 hover:bg-caramel hover:text-espresso"
              >
                View crate
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
