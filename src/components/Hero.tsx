import { HERO_IMAGE } from "../data/products";
import { IconArrow, IconFlame, IconStar, LogoMark } from "./icons";
import Reveal from "./Reveal";

const STATS: Array<{ value: string; label: string; star?: boolean }> = [
  { value: "14", label: "partner farms" },
  { value: "48h", label: "roast to door" },
  { value: "4.9", label: "2,300+ reviews", star: true },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-espresso text-crema">
      <div aria-hidden className="pointer-events-none absolute -left-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-caramel/15 blur-[130px]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-52 -right-32 h-[30rem] w-[30rem] rounded-full bg-clay/20 blur-[130px]" />
      <p
        aria-hidden
        className="pointer-events-none absolute bottom-12 left-5 hidden font-mono text-[10px] uppercase tracking-[0.34em] text-crema/35 [writing-mode:vertical-rl] xl:block"
      >
        Est. 2016 — Portland, Oregon
      </p>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:py-24">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="inline-flex items-center gap-3 rounded-full border border-crema/20 px-4 py-2">
              <span className="h-2 w-2 animate-pulse-dot rounded-full bg-caramel" />
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-crema/80">
                Now roasting — Batch №214
              </span>
            </p>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="mt-7 font-display text-[2.6rem] font-bold leading-[0.98] tracking-tight sm:text-6xl xl:text-[4.6rem]">
              Twelve kilos at a time.
              <span className="mt-2 block font-medium italic text-caramel">Never a kilo more.</span>
            </h1>
          </Reveal>

          <Reveal delay={170}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-crema/75">
              Single lots bought straight from the farm, roasted on a 1962 Probat, and at
              your door within 48 hours of first crack. This week&rsquo;s shelf is below —
              when a batch sells out, it&rsquo;s gone until the next roast.
            </p>
          </Reveal>

          <Reveal delay={250}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#shelf"
                className="group inline-flex items-center gap-2.5 rounded-full bg-caramel px-7 py-3.5 font-semibold text-espresso transition-colors duration-300 hover:bg-crema"
              >
                Browse the shelf
                <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#log"
                className="inline-flex items-center gap-2.5 rounded-full border border-crema/25 px-7 py-3.5 font-semibold text-crema transition-colors duration-300 hover:border-caramel hover:text-caramel"
              >
                This week&rsquo;s roast log
              </a>
            </div>
          </Reveal>

          <Reveal delay={330}>
            <dl className="mt-12 flex flex-wrap gap-x-12 gap-y-6 border-t border-crema/15 pt-8">
              {STATS.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="flex items-baseline gap-1.5 font-display text-3xl font-bold">
                    {s.value}
                    {s.star && <IconStar className="h-4 w-4 translate-y-[-2px] text-caramel" />}
                  </dd>
                  <dd className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-crema/55">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={180} className="relative mx-auto max-w-[22rem] sm:max-w-sm lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-b-[28px] rounded-t-[999px] border border-crema/15 shadow-[0_50px_90px_-25px_rgba(0,0,0,0.65)]">
              <img
                src={HERO_IMAGE}
                alt="Freshly roasted beans turning in the cooling tray"
                className="absolute inset-0 h-full w-full animate-breathe object-cover"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-espresso/75 via-transparent to-espresso/10" />
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  aria-hidden
                  className="absolute top-10 h-12 w-1.5 animate-steam rounded-full bg-crema/45 blur-[3px]"
                  style={{ left: `${38 + i * 11}%`, animationDelay: `${i * 1.3}s` }}
                />
              ))}
            </div>

            <div className="absolute -left-3 top-12 flex animate-rise items-center gap-3 rounded-xl border border-crema/15 bg-bark/95 px-4 py-3 shadow-xl backdrop-blur-sm sm:-left-8" style={{ animationDelay: "0.45s" }}>
              <IconFlame className="h-5 w-5 text-caramel" />
              <span className="leading-tight">
                <span className="block font-mono text-[9px] uppercase tracking-[0.24em] text-crema/55">
                  In the drum
                </span>
                <span className="block text-sm font-semibold">Daybreak · Ethiopia</span>
              </span>
            </div>

            <div className="ticket-edge absolute -bottom-6 -left-2 -rotate-[4deg] animate-rise bg-parchment px-7 py-3 text-espresso shadow-lg sm:-left-10" style={{ animationDelay: "0.6s" }}>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-mocha">Roast log — Tue 06:12</p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-mocha">
                First crack 9:41 · Drop 11:58
              </p>
              <p className="mt-1 font-mono text-[11px] font-bold uppercase tracking-[0.18em]">11.8 kg · №214</p>
            </div>

            <div className="absolute -bottom-9 -right-3 grid h-28 w-28 place-items-center rounded-full bg-caramel text-espresso shadow-xl sm:-right-8 sm:h-32 sm:w-32">
              <LogoMark className="h-8 w-8" />
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-spin-slow" aria-hidden>
                <defs>
                  <path id="badge-circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" fill="none" />
                </defs>
                <text className="fill-espresso font-mono" fontSize="7.4" letterSpacing="2.1">
                  <textPath href="#badge-circle">SMALL BATCH · DIRECT TRADE · PDX ·</textPath>
                </text>
              </svg>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
