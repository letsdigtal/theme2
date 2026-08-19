export type Category = "single-origin" | "blend" | "decaf";

export interface Product {
  id: string;
  name: string;
  origin: string;
  region: string;
  category: Category;
  process: string;
  altitude: string;
  varietal: string;
  notes: string[];
  roast: 1 | 2 | 3 | 4 | 5;
  roastLabel: string;
  price: number;
  weightG: number;
  image: string;
  badge?: string;
  stockLeft?: number;
  description: string;
}

export interface CartLine {
  key: string;
  productId: string;
  grind: string;
  qty: number;
}

export type SortKey = "featured" | "price-asc" | "price-desc" | "roast";

export interface RoastLogEntry {
  day: string;
  time: string;
  bean: string;
  origin: string;
  roast: number;
  kg: string;
  note?: string;
}
