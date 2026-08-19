import type { Category, Product, RoastLogEntry } from "../types";

const IMG = {
  hero: "https://image.qwenlm.ai/generated-images/7327e332-0018-431a-8f7f-ea3ea998a03e/_result.png",
  daybreak:
    "https://image.qwenlm.ai/generated-images/57e628da-2acf-464d-92ef-e17f20d2013c/_result.png",
  nightshift:
    "https://image.qwenlm.ai/generated-images/3fc9c65f-0313-4184-a526-0bb84d3c1552/_result.png",
  cloudeforest:
    "https://image.qwenlm.ai/generated-images/92502b59-9247-4312-9863-a309e580cf82/_result.png",
  silkroute:
    "https://image.qwenlm.ai/generated-images/eef025c7-10e2-4e6c-98a1-ee476a493ccd/_result.png",
  moonless:
    "https://image.qwenlm.ai/generated-images/46ba6f9c-a7f2-44dc-9fd6-b838c2b425af/_result.png",
  highwire:
    "https://image.qwenlm.ai/generated-images/f532163f-fe8f-4380-9a7a-09099e210b5e/_result.png",
};

export const HERO_IMAGE = IMG.hero;

export const GRINDS = ["Whole bean", "Filter", "Espresso", "French press", "Cold brew"];

export const CATEGORIES: Array<{ id: Category | "all"; label: string }> = [
  { id: "all", label: "All beans" },
  { id: "single-origin", label: "Single origin" },
  { id: "blend", label: "Blends" },
  { id: "decaf", label: "Decaf" },
];

export const PRODUCTS: Product[] = [
  {
    id: "daybreak",
    name: "Daybreak",
    origin: "Ethiopia",
    region: "Yirgacheffe, Gedeo Zone",
    category: "single-origin",
    process: "Washed",
    altitude: "1,900–2,200 m",
    varietal: "Heirloom",
    notes: ["bergamot", "apricot", "blossom honey"],
    roast: 2,
    roastLabel: "Light",
    price: 19.5,
    weightG: 250,
    image: IMG.daybreak,
    badge: "Bestseller",
    description:
      "A morning coffee that tastes the way morning should — jasmine-lifted and citrus-bright, with a honeyed sweetness that hangs around well past the last sip.",
  },
  {
    id: "night-shift",
    name: "Night Shift",
    origin: "Brazil & Colombia",
    region: "Cerrado + Huila blend",
    category: "blend",
    process: "Natural & washed",
    altitude: "1,100–1,600 m",
    varietal: "Mundo Novo, Caturra",
    notes: ["dark chocolate", "molasses", "toasted hazelnut"],
    roast: 5,
    roastLabel: "Dark",
    price: 18.0,
    weightG: 250,
    image: IMG.nightshift,
    badge: "Staff pick",
    description:
      "Built for milk and built to cut through it. Syrupy body, bittersweet cocoa, and a molasses backbone that stands up to any machine you throw at it.",
  },
  {
    id: "cloud-forest",
    name: "Cloud Forest",
    origin: "Colombia",
    region: "Huila, San Agustín",
    category: "single-origin",
    process: "Washed",
    altitude: "1,650–1,850 m",
    varietal: "Caturra, Pink Bourbon",
    notes: ["caramel", "red apple", "panela"],
    roast: 3,
    roastLabel: "Medium",
    price: 19.0,
    weightG: 250,
    image: IMG.cloudeforest,
    description:
      "The comfort pour. Round and sweet with orchard-fruit acidity and a caramelised-sugar finish — the bag we reach for whenever company comes over.",
  },
  {
    id: "silk-route",
    name: "Silk Route",
    origin: "Guatemala",
    region: "Antigua Valley",
    category: "single-origin",
    process: "Washed",
    altitude: "1,500–1,700 m",
    varietal: "Bourbon",
    notes: ["cocoa nib", "orange peel", "browned butter"],
    roast: 4,
    roastLabel: "Medium-dark",
    price: 18.5,
    weightG: 250,
    image: IMG.silkroute,
    description:
      "Grown in volcanic soil between three volcanoes. Deep, velvety and gently spiced — a cup that reads the way an old map smells.",
  },
  {
    id: "moonless",
    name: "Moonless",
    origin: "Indonesia",
    region: "Sumatra, Mandheling",
    category: "decaf",
    process: "Wet-hulled, Swiss Water® decaf",
    altitude: "1,200–1,500 m",
    varietal: "Ateng, Jember",
    notes: ["maple", "walnut", "dried fig"],
    roast: 3,
    roastLabel: "Medium",
    price: 17.5,
    weightG: 250,
    image: IMG.moonless,
    badge: "New",
    stockLeft: 4,
    description:
      "A Swiss Water® decaf nobody clocks as decaf. Full-bodied and earthy-sweet, made for the 10 p.m. craving that refuses to negotiate.",
  },
  {
    id: "high-wire",
    name: "High Wire",
    origin: "Kenya",
    region: "Nyeri, AA lot 214",
    category: "single-origin",
    process: "Washed, double-fermented",
    altitude: "1,700–1,900 m",
    varietal: "SL28, SL34",
    notes: ["blackcurrant", "pink grapefruit", "brown sugar"],
    roast: 2,
    roastLabel: "Light",
    price: 21.0,
    weightG: 250,
    image: IMG.highwire,
    badge: "Limited lot",
    description:
      "One factory in Nyeri, thirty-eight bags total. Electric blackcurrant acidity, grapefruit sparkle, a brown-sugar landing. When it's gone, it's gone.",
  },
];

export const CATEGORY_LABELS: Record<Category, string> = {
  "single-origin": "Single origin",
  blend: "Blend",
  decaf: "Decaf",
};

export const ROAST_LOG: RoastLogEntry[] = [
  { day: "TUE", time: "06:12", bean: "Daybreak", origin: "Ethiopia", roast: 2, kg: "11.8" },
  { day: "TUE", time: "07:40", bean: "Cloud Forest", origin: "Colombia", roast: 3, kg: "12.0" },
  { day: "TUE", time: "09:05", bean: "Night Shift", origin: "Blend", roast: 5, kg: "11.2" },
  { day: "FRI", time: "06:30", bean: "High Wire", origin: "Kenya", roast: 2, kg: "9.6", note: "small lot" },
  { day: "FRI", time: "08:00", bean: "Silk Route", origin: "Guatemala", roast: 4, kg: "12.0" },
  { day: "FRI", time: "09:15", bean: "Moonless", origin: "Sumatra", roast: 3, kg: "10.4" },
];

export const TICKER_ITEMS = [
  "Roasted every Tuesday & Friday",
  "Free shipping on orders over $40",
  "12 kg batches — never more",
  "Direct trade with 14 farms",
  "Ships within 48 hours of the roast",
  "Cupping bar open Fridays, 10:00",
];
