import { useEffect, useState } from "react";
import type { Product } from "../types";
import { CATEGORY_LABELS, GRINDS } from "../data/products";
import { MAX_QTY } from "../hooks/useCart";
import { cx, fmt } from "../lib/utils";
import { IconBag, IconFlame, IconMinus, IconPlus, IconX } from "./icons";
import RoastMeter from "./RoastMeter";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAdd: (product: Product, grind: string, qty: number) => void;
}

export default function ProductModal({ product, onClose, onAdd }: ProductModalProps) {
  const [grind, setGrind] = useState(GRINDS[0]);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setGrind(GRINDS[0]);
    setQty(1);
  }, [product?.id]);

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  if (!product) return null;

  const maxed = product.stockLeft !== undefined ? Math.min(MAX_QTY, product.stockLeft) : MAX_QTY;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={`${product.name} details`}>
      <button aria-label="Close details" onClick={onClose} className="absolute inset-0 animate-fade cursor-default bg-espresso/70 backdrop-blur-[3px]" />

      <div className="relative grid max-h-[92vh] w-full animate-rise overflow-y-auto rounded-t-[26px] bg-paper shadow-2xl sm:max-w-3xl sm:rounded-[26px] md:grid-cols-[0.92fr_1.08fr]">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-espresso/15 bg-crema transition-all duration-300 hover:rotate-90 hover:border-clay hover:text-clay"
        >
          <IconX className="h-4 w-4" />
        </button>

        <div className="relative flex items-center justify-center bg-parchment p-8 md:p-10">
          {product.badge && (
            <span className="absolute left-4 top-4 rounded-full bg-espresso px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-crema">
              {product.badge}
            </span>
          )}
          <img
            src={product.image}
            alt={`${product.name} coffee bag`}
            className="w-full max-w-[280px] animate-pop rounded-lg object-cover drop-shadow-[0_30px_35px_rgba(33,20,16,0.28)] md:max-w-none"
          />
        </div>

        <div className="flex flex-col gap-5 p-6 sm:p-8">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-caramel-deep">
              {CATEGORY_LABELS[product.category]} — {product.region}
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold leading-tight sm:text-4xl">{product.name}</h2>
          </div>

          <p className="text-[15px] leading-relaxed text-mocha/90">{product.description}</p>

          <ul className="flex flex-wrap gap-1.5">
            {product.notes.map((note) => (
              <li key={note} className="rounded-full border border-espresso/12 bg-crema px-3 py-1 text-xs font-medium text-mocha">
                {note}
              </li>
            ))}
          </ul>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-3 border-y border-dashed border-espresso/20 py-4">
            {[
              ["Process", product.process],
              ["Altitude", product.altitude],
              ["Varietal", product.varietal],
              ["Batch size", "12 kg max"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-[9px] uppercase tracking-[0.2em] text-fawn">{k}</dt>
                <dd className="mt-0.5 text-sm font-semibold">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fawn">Roast profile</p>
            <RoastMeter roast={product.roast} label={product.roastLabel} />
          </div>

          <div>
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fawn">
              Grind — <span className="text-espresso">{grind}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {GRINDS.map((g) => (
                <button
                  key={g}
                  onClick={() => setGrind(g)}
                  aria-pressed={grind === g}
                  className={cx(
                    "rounded-full border px-3.5 py-2 text-[13px] font-medium transition-all duration-200 active:scale-95",
                    grind === g
                      ? "border-espresso bg-espresso text-crema"
                      : "border-espresso/20 hover:border-caramel hover:text-caramel-deep",
                  )}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {product.stockLeft !== undefined && (
            <p className="flex items-center gap-2 text-[13px] font-semibold text-clay">
              <IconFlame className="h-4 w-4" />
              Only {product.stockLeft} bags left in this batch
            </p>
          )}

          <div className="flex items-center justify-between gap-4">
            <div className="inline-flex items-center gap-1 rounded-full border border-espresso/20 bg-crema p-1">
              <button
                onClick={() => setQty((q) => q - 1)}
                disabled={qty <= 1}
                aria-label="Decrease quantity"
                className="grid h-8 w-8 place-items-center rounded-full transition-colors hover:bg-paper disabled:opacity-30"
              >
                <IconMinus className="h-3.5 w-3.5" />
              </button>
              <span className="w-8 text-center font-display text-lg font-bold">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(maxed, q + 1))}
                disabled={qty >= maxed}
                aria-label="Increase quantity"
                className="grid h-8 w-8 place-items-center rounded-full transition-colors hover:bg-paper disabled:opacity-30"
              >
                <IconPlus className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="text-right">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-fawn">
                {qty} × {fmt(product.price)}
              </p>
              <p className="font-display text-2xl font-bold">{fmt(product.price * qty)}</p>
            </div>
          </div>

          <button
            onClick={() => onAdd(product, grind, qty)}
            className="flex w-full items-center justify-center gap-2.5 rounded-full bg-espresso py-4 font-semibold text-crema transition-all duration-300 hover:bg-caramel-deep active:scale-[0.98]"
          >
            <IconBag className="h-5 w-5" />
            Add to crate — {fmt(product.price * qty)}
          </button>
        </div>
      </div>
    </div>
  );
}
