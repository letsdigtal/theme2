import { useCallback, useEffect, useMemo, useState } from "react";
import type { CartLine } from "../types";
import { PRODUCTS } from "../data/products";

const STORAGE_KEY = "ember-oak-crate-v1";
export const MAX_QTY = 9;

function load(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (l): l is CartLine =>
        l &&
        typeof l.key === "string" &&
        typeof l.productId === "string" &&
        typeof l.grind === "string" &&
        typeof l.qty === "number" &&
        PRODUCTS.some((p) => p.id === l.productId),
    );
  } catch {
    return [];
  }
}

export function useCart() {
  const [lines, setLines] = useState<CartLine[]>(load);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage unavailable — cart lives in memory */
    }
  }, [lines]);

  const add = useCallback((productId: string, grind: string, qty = 1) => {
    const key = `${productId}__${grind}`;
    setLines((prev) => {
      const existing = prev.find((l) => l.key === key);
      if (existing) {
        return prev.map((l) =>
          l.key === key ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) } : l,
        );
      }
      return [...prev, { key, productId, grind, qty: Math.min(MAX_QTY, qty) }];
    });
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.key !== key)
        : prev.map((l) => (l.key === key ? { ...l, qty: Math.min(MAX_QTY, qty) } : l)),
    );
  }, []);

  const remove = useCallback((key: string) => {
    setLines((prev) => prev.filter((l) => l.key !== key));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const count = useMemo(() => lines.reduce((sum, l) => sum + l.qty, 0), [lines]);

  const subtotal = useMemo(
    () =>
      lines.reduce((sum, l) => {
        const product = PRODUCTS.find((p) => p.id === l.productId);
        return sum + (product ? product.price * l.qty : 0);
      }, 0),
    [lines],
  );

  return { lines, add, setQty, remove, clear, count, subtotal };
}
