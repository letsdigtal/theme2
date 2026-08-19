import type { Product } from "../types";
import { fmt } from "../lib/utils";
import { IconPlus } from "./icons";
import RoastMeter from "./RoastMeter";

interface ProductCardProps {
  product: Product;
  onOpen: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

function badgeColor(badge: string): string {
  switch (badge) {
    case "Bestseller":
      return "bg-caramel text-espresso";
    case "New":
      return "bg-sage text-crema";
    case "Limited lot":
      return "bg-clay text-crema";
    default:
      return "bg-espresso text-crema";
  }
}

export default function ProductCard({ product, onOpen, onQuickAdd }: ProductCardProps) {
  return (
    <article
      onClick={() => onOpen(product)}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-espresso/10 bg-crema transition-all duration-300 hover:-translate-y-1.5 hover:border-caramel/60 hover:shadow-[0_28px_55px_-20px_rgba(33,20,16,0.4)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-parchment">
        <img
          src={product.image}
          alt={`${product.name} — ${product.origin} coffee bag`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:-rotate-1 group-hover:scale-[1.06]"
        />
        {product.badge && (
          <span
            className={`absolute left-3.5 top-3.5 rounded-full px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] ${badgeColor(product.badge)}`}
          >
            {product.badge}
          </span>
        )}
        {product.stockLeft !== undefined && (
          <span className="absolute bottom-3.5 left-3.5 rounded-full bg-espresso/85 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-crema backdrop-blur-sm">
            Only {product.stockLeft} left
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-fawn">{product.origin}</p>
            <h3 className="mt-1 font-display text-2xl font-bold leading-tight transition-colors duration-300 group-hover:text-caramel-deep">
              {product.name}
            </h3>
          </div>
          <RoastMeter roast={product.roast} label={product.roastLabel} />
        </div>

        <ul className="flex flex-wrap gap-1.5">
          {product.notes.map((note) => (
            <li
              key={note}
              className="rounded-full border border-espresso/12 bg-paper px-2.5 py-1 text-xs text-mocha"
            >
              {note}
            </li>
          ))}
        </ul>

        <p className="line-clamp-2 text-sm leading-relaxed text-mocha/85">{product.description}</p>

        <div className="mt-auto flex items-end justify-between border-t border-dashed border-espresso/15 pt-4">
          <p>
            <span className="font-display text-xl font-bold">{fmt(product.price)}</span>{" "}
            <span className="font-mono text-[10px] text-fawn">/ {product.weightG} g</span>
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpen(product);
            }}
            className="flex-1 rounded-full border border-espresso/20 py-2.5 text-sm font-semibold transition-all duration-200 hover:border-espresso hover:bg-paper active:scale-95"
          >
            Details
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickAdd(product);
            }}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-espresso py-2.5 text-sm font-semibold text-crema transition-all duration-200 hover:bg-caramel-deep active:scale-95"
          >
            <IconPlus className="h-4 w-4" />
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
