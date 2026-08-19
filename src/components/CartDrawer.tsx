import { useEffect } from "react";
import type { CartLine, Product } from "../types";
import { PRODUCTS } from "../data/products";
import { MAX_QTY } from "../hooks/useCart";
import { cx, fmt } from "../lib/utils";
import { FREE_SHIPPING_AT, shippingFor } from "../lib/pricing";
import {
  IconArrow,
  IconCheck,
  IconCup,
  IconMinus,
  IconPlus,
  IconTrash,
  IconTruck,
  IconX,
} from "./icons";

export interface ResolvedLine extends CartLine {
  product: Product;
}

export function resolveLines(lines: CartLine[]): ResolvedLine[] {
  return lines.flatMap((line) => {
    const product = PRODUCTS.find((p) => p.id === line.productId);
    return product ? [{ ...line, product }] : [];
  });
}

interface CartDrawerProps {
  open: boolean;
  lines: CartLine[];
  subtotal: number;
  count: number;
  onClose: () => void;
  onSetQty: (key: string, qty: number) => void;
  onRemove: (key: string) => void;
  onCheckout: () => void;
  onBrowse: () => void;
}

export default function CartDrawer({
  open,
  lines,
  subtotal,
  count,
  onClose,
  onSetQty,
  onRemove,
  onCheckout,
  onBrowse,
}: CartDrawerProps) {
  const resolved = resolveLines(lines);
  const remaining = Math.max(0, FREE_SHIPPING_AT - subtotal);
  const shipping = shippingFor(subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_AT) * 100);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <div className={cx("fixed inset-0 z-[85]", !open && "pointer-events-none")} aria-hidden={!open}>
      <button
        aria-label="Close crate"
        onClick={onClose}
        tabIndex={open ? 0 : -1}
        className={cx(
          "absolute inset-0 bg-espresso/60 backdrop-blur-[2px] transition-opacity duration-500",
          open ? "opacity-100" : "opacity-0",
        )}
      />

      <aside
        className={cx(
          "absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-paper shadow-[-30px_0_70px_-25px_rgba(23,13,8,0.5)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
        role="dialog"
        aria-label="Shopping crate"
      >
        <header className="flex items-center justify-between border-b border-espresso/10 px-6 py-5">
          <h2 className="flex items-baseline gap-2.5 font-display text-2xl font-bold">
            Your crate
            <span className="font-mono text-xs font-normal uppercase tracking-[0.14em] text-fawn">
              {count} item{count === 1 ? "" : "s"}
            </span>
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 place-items-center rounded-full border border-espresso/15 transition-all duration-300 hover:rotate-90 hover:border-clay hover:text-clay"
          >
            <IconX className="h-4 w-4" />
          </button>
        </header>

        {resolved.length > 0 && (
          <div className="border-b border-espresso/10 px-6 py-4">
            {remaining > 0 ? (
              <p className="flex items-center gap-2 text-[13px] text-mocha">
                <IconTruck className="h-4 w-4 shrink-0 text-caramel-deep" />
                <span>
                  <strong className="font-semibold text-espresso">{fmt(remaining)}</strong> away from
                  free shipping
                </span>
              </p>
            ) : (
              <p className="flex items-center gap-2 text-[13px] font-semibold text-sage">
                <IconCheck className="h-4 w-4" />
                Free shipping unlocked
              </p>
            )}
            <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-espresso/10">
              <div
                className="h-full rounded-full bg-caramel transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-6">
          {resolved.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 pb-10 text-center">
              <span className="grid h-20 w-20 place-items-center rounded-full border-2 border-dashed border-espresso/25 text-fawn">
                <IconCup className="h-9 w-9" />
              </span>
              <p className="font-display text-2xl font-bold">Your crate is empty</p>
              <p className="max-w-[250px] text-sm leading-relaxed text-mocha/80">
                The beans are waiting on the shelf — roasted Tuesday, usually gone by Friday.
              </p>
              <button
                onClick={onBrowse}
                className="mt-2 rounded-full bg-espresso px-6 py-3 text-sm font-semibold text-crema transition-colors duration-300 hover:bg-caramel-deep"
              >
                Browse the shelf
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-espresso/10">
              {resolved.map((line) => (
                <li key={line.key} className="flex animate-fade gap-4 py-5">
                  <img
                    src={line.product.image}
                    alt={line.product.name}
                    className="h-20 w-20 shrink-0 rounded-lg border border-espresso/10 bg-parchment object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold leading-tight">{line.product.name}</p>
                      <button
                        onClick={() => onRemove(line.key)}
                        aria-label={`Remove ${line.product.name}`}
                        className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-fawn transition-colors hover:bg-clay/10 hover:text-clay"
                      >
                        <IconTrash className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-fawn">
                      {line.grind} · {line.product.weightG} g
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center gap-0.5 rounded-full border border-espresso/15 bg-crema p-0.5">
                        <button
                          onClick={() => onSetQty(line.key, line.qty - 1)}
                          aria-label="Decrease quantity"
                          className="grid h-7 w-7 place-items-center rounded-full transition-colors hover:bg-paper active:scale-90"
                        >
                          <IconMinus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-bold">{line.qty}</span>
                        <button
                          onClick={() => onSetQty(line.key, line.qty + 1)}
                          disabled={line.qty >= MAX_QTY}
                          aria-label="Increase quantity"
                          className="grid h-7 w-7 place-items-center rounded-full transition-colors hover:bg-paper active:scale-90 disabled:opacity-30"
                        >
                          <IconPlus className="h-3 w-3" />
                        </button>
                      </div>
                      <p className="font-display text-[15px] font-bold">
                        {fmt(line.product.price * line.qty)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {resolved.length > 0 && (
          <footer className="border-t border-espresso/10 bg-crema/70 px-6 py-5">
            <div className="flex justify-between text-sm text-mocha">
              <span>Subtotal</span>
              <span className="font-semibold text-espresso">{fmt(subtotal)}</span>
            </div>
            <div className="mt-1.5 flex justify-between text-sm text-mocha">
              <span>Shipping</span>
              <span className={cx("font-semibold", shipping === 0 ? "text-sage" : "text-espresso")}>
                {shipping === 0 ? "Free" : fmt(shipping)}
              </span>
            </div>
            <div className="mt-3 flex items-baseline justify-between border-t border-dashed border-espresso/15 pt-3">
              <span className="font-semibold">Total</span>
              <span className="font-display text-2xl font-bold">{fmt(subtotal + shipping)}</span>
            </div>
            <button
              onClick={onCheckout}
              className="mt-4 flex w-full items-center justify-center gap-2.5 rounded-full bg-espresso py-4 font-semibold text-crema transition-all duration-300 hover:bg-caramel-deep active:scale-[0.98]"
            >
              Checkout
              <IconArrow className="h-4 w-4" />
            </button>
            <p className="mt-3 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-fawn">
              Demo checkout — no card is charged
            </p>
          </footer>
        )}
      </aside>
    </div>
  );
}
