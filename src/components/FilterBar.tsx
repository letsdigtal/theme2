import type { Category, SortKey } from "../types";
import { CATEGORIES } from "../data/products";
import { cx } from "../lib/utils";
import { IconChevron, IconSearch, IconX } from "./icons";

interface FilterBarProps {
  query: string;
  onQuery: (value: string) => void;
  category: Category | "all";
  onCategory: (value: Category | "all") => void;
  sort: SortKey;
  onSort: (value: SortKey) => void;
  counts: Record<string, number>;
  shown: number;
  total: number;
}

const SORT_OPTIONS: Array<{ id: SortKey; label: string }> = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price · low to high" },
  { id: "price-desc", label: "Price · high to low" },
  { id: "roast", label: "Roast · dark first" },
];

export default function FilterBar({
  query,
  onQuery,
  category,
  onCategory,
  sort,
  onSort,
  counts,
  shown,
  total,
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <label className="relative min-w-0 flex-1">
          <span className="sr-only">Search the shelf</span>
          <IconSearch className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-fawn" />
          <input
            type="text"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Search beans, origins, tasting notes…"
            className="w-full rounded-full border border-espresso/15 bg-crema py-3 pl-11 pr-11 text-sm outline-none transition-all duration-300 placeholder:text-fawn/70 focus:border-caramel focus:ring-4 focus:ring-caramel/20"
          />
          {query && (
            <button
              onClick={() => onQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full bg-espresso/10 text-espresso transition-colors hover:bg-clay hover:text-crema"
            >
              <IconX className="h-3.5 w-3.5" />
            </button>
          )}
        </label>

        <label className="relative md:w-56">
          <span className="sr-only">Sort products</span>
          <select
            value={sort}
            onChange={(e) => onSort(e.target.value as SortKey)}
            className="w-full cursor-pointer appearance-none rounded-full border border-espresso/15 bg-crema py-3 pl-4 pr-10 text-sm font-medium outline-none transition-all duration-300 focus:border-caramel focus:ring-4 focus:ring-caramel/20"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
          <IconChevron className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-fawn" />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {CATEGORIES.map((c) => {
          const active = category === c.id;
          return (
            <button
              key={c.id}
              onClick={() => onCategory(c.id)}
              aria-pressed={active}
              className={cx(
                "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 active:scale-95",
                active
                  ? "border-espresso bg-espresso text-crema shadow-[0_8px_20px_-10px_rgba(33,20,16,0.7)]"
                  : "border-espresso/15 text-mocha hover:border-caramel hover:text-caramel-deep",
              )}
            >
              {c.label}
              <span className={cx("ml-1.5 font-mono text-[10px]", active ? "text-caramel" : "text-fawn/80")}>
                {counts[c.id] ?? 0}
              </span>
            </button>
          );
        })}
        <p className="ml-auto font-mono text-[11px] uppercase tracking-[0.18em] text-fawn">
          {shown} of {total} roasts
        </p>
      </div>
    </div>
  );
}
