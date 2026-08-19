import { ROAST_LOG } from "../data/products";
import Reveal from "./Reveal";
import RoastMeter from "./RoastMeter";

function roastName(roast: number): string {
  switch (roast) {
    case 1:
      return "Very light";
    case 2:
      return "Light";
    case 3:
      return "Medium";
    case 4:
      return "Medium-dark";
    default:
      return "Dark";
  }
}

export default function RoastLog() {
  return (
    <section id="log" className="scroll-mt-24 bg-bark text-crema">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:py-28">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-caramel">The roast log</p>
            <h2 className="mt-3 font-display text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl">
              This week at the drum.
            </h2>
            <p className="mt-5 leading-relaxed text-crema/70">
              Every batch is logged by hand — charge time, first crack, drop temperature. If your
              bag&rsquo;s batch number is on this page, it was roasted within the last four days.
            </p>
          </Reveal>

          <Reveal delay={130}>
            <div className="mt-9 rounded-xl border border-crema/15 bg-espresso/40 p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-caramel">Open cupping</p>
              <p className="mt-2.5 font-display text-xl font-bold leading-snug">
                Fridays, 10:00 — all six beans on the table.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-crema/60">
                Free, no booking needed. Bring a friend and a palate.
              </p>
            </div>
          </Reveal>

          <Reveal delay={220}>
            <p className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-crema/20 px-4 py-2">
              <span className="h-2 w-2 animate-pulse-dot rounded-full bg-caramel" />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-crema/75">
                Next roast — Tuesday 06:00
              </span>
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-8">
          <div className="hidden grid-cols-[70px_1fr_120px_150px_70px] gap-x-3 border-b border-crema/20 px-3 pb-3 font-mono text-[9px] uppercase tracking-[0.24em] text-crema/45 sm:grid">
            <span>Day</span>
            <span>Batch</span>
            <span>Origin</span>
            <span className="text-right">Roast</span>
            <span className="text-right">Kg</span>
          </div>
          <ul>
            {ROAST_LOG.map((entry, i) => (
              <Reveal key={`${entry.day}-${entry.time}`} delay={i * 70}>
                <li className="grid grid-cols-[64px_1fr_auto] items-center gap-x-3 gap-y-1 border-b border-crema/10 px-3 py-4 transition-colors duration-300 hover:bg-crema/5 sm:grid-cols-[70px_1fr_120px_150px_70px]">
                  <span className="flex flex-col">
                    <span className="font-mono text-xs font-bold text-caramel">{entry.day}</span>
                    <span className="font-mono text-[10px] text-crema/50">{entry.time}</span>
                  </span>
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-display text-lg font-bold leading-tight">{entry.bean}</span>
                    {entry.note && (
                      <span className="rounded-full bg-clay px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-crema">
                        {entry.note}
                      </span>
                    )}
                    <span className="w-full font-mono text-[10px] uppercase tracking-[0.16em] text-crema/50 sm:hidden">
                      {entry.origin}
                    </span>
                  </span>
                  <span className="hidden font-mono text-[11px] uppercase tracking-[0.16em] text-crema/55 sm:block">
                    {entry.origin}
                  </span>
                  <span className="hidden sm:flex sm:justify-end">
                    <RoastMeter dark roast={entry.roast} label={roastName(entry.roast)} />
                  </span>
                  <span className="text-right font-mono text-sm text-crema/85">{entry.kg}</span>
                </li>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={450}>
            <p className="mt-5 px-3 font-mono text-[10px] uppercase tracking-[0.2em] text-crema/45">
              * All batches rested 24 h before sealing · drum: 1962 Probat UG15
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
