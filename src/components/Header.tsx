import { useEffect, useState } from "react";
import { TICKER_ITEMS } from "../data/products";
import { cx } from "../lib/utils";
import { IconBag, IconBeanSmall, LogoMark } from "./icons";

export function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="marquee overflow-hidden border-b border-crema/10 bg-espresso py-2 text-crema/85">
      <div className="marquee-track flex w-max items-center gap-8 animate-marquee">
        {items.map((item, i) => (
          <span
            key={i}
            aria-hidden={i >= TICKER_ITEMS.length}
            className="flex items-center gap-8 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.22em]"
          >
            {item}
            <IconBeanSmall className="h-3 w-3 text-caramel" />
          </span>
        ))}
      </div>
    </div>
  );
}

interface HeaderProps {
  count: number;
  onOpenCart: () => void;
}

export default function Header({ count, onOpenCart }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cx(
        "sticky top-0 z-50 border-b border-espresso/10 bg-paper/85 backdrop-blur-md transition-shadow duration-300",
        scrolled && "shadow-[0_10px_30px_-18px_rgba(33,20,16,0.45)]",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-[72px] sm:px-6">
        <a href="#top" className="group flex items-center gap-2.5" aria-label="Ember & Oak — back to top">
          <LogoMark className="h-9 w-9 text-caramel transition-transform duration-500 group-hover:rotate-[25deg]" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-bold tracking-tight">Ember &amp; Oak</span>
            <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.28em] text-fawn">
              Roastworks · PDX
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {[
            ["The Shelf", "#shelf"],
            ["Roast Log", "#log"],
            ["Visit", "#visit"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="relative font-mono text-[11px] uppercase tracking-[0.2em] text-mocha transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-caramel after:transition-all after:duration-300 hover:text-espresso hover:after:w-full"
            >
              {label}
            </a>
          ))}
        </nav>

        <button
          onClick={onOpenCart}
          className="relative inline-flex items-center gap-2.5 rounded-full bg-espresso py-2.5 pl-4 pr-5 text-sm font-semibold text-crema transition-all duration-300 hover:bg-caramel-deep active:scale-95"
          aria-label={`Open crate, ${count} item${count === 1 ? "" : "s"}`}
        >
          <IconBag className="h-[18px] w-[18px]" />
          <span className="hidden sm:inline">Crate</span>
          {count > 0 && (
            <span
              key={count}
              className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 animate-pop place-items-center rounded-full bg-caramel px-1 font-mono text-[11px] font-bold text-espresso"
            >
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
