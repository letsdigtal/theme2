import { useState, type FormEvent } from "react";
import { IconArrow, IconCheck, LogoMark } from "./icons";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError(true);
      return;
    }
    setError(false);
    setJoined(true);
  };

  return (
    <footer id="visit" className="relative scroll-mt-24 overflow-hidden bg-espresso text-crema">
      <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <a href="#top" className="group inline-flex items-center gap-3">
              <LogoMark className="h-10 w-10 text-caramel transition-transform duration-500 group-hover:rotate-[25deg]" />
              <span className="font-display text-2xl font-bold tracking-tight">Ember &amp; Oak</span>
            </a>
            <p className="mt-5 max-w-sm leading-relaxed text-crema/65">
              A two-drum roastery in a former firehouse on SE Ankeny. Come for the pour-over, stay
              for the smell of first crack drifting down the street.
            </p>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.24em] text-caramel">The firehouse</p>
            <address className="mt-3 space-y-1 text-sm not-italic leading-relaxed text-crema/75">
              <p>214 SE Ankeny St, Portland, OR 97214</p>
              <p>hello@emberandoak.coffee</p>
              <p>(503) 555-0214</p>
            </address>
          </div>

          <div className="lg:col-span-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-caramel">Cupping bar hours</p>
            <ul className="mt-3 space-y-2 text-sm text-crema/75">
              <li className="flex justify-between gap-4 border-b border-crema/10 pb-2">
                <span>Mon – Fri</span>
                <span className="font-mono text-xs text-crema/60">7:00 – 15:00</span>
              </li>
              <li className="flex justify-between gap-4 border-b border-crema/10 pb-2">
                <span>Sat – Sun</span>
                <span className="font-mono text-xs text-crema/60">8:00 – 16:00</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Roasting days</span>
                <span className="font-mono text-xs text-crema/60">Tue &amp; Fri, 06:00</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="font-display text-2xl font-bold">First Crack Club</p>
            <p className="mt-2.5 text-sm leading-relaxed text-crema/65">
              One email per roast day: what&rsquo;s in the drum, what&rsquo;s dropping, and a
              subscriber-only micro-lot every month.
            </p>
            {joined ? (
              <p className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-sage/50 bg-sage/15 px-4 py-3 text-sm font-semibold">
                <IconCheck className="h-4 w-4 text-sage" />
                You&rsquo;re on the list — see you Tuesday.
              </p>
            ) : (
              <>
                <form onSubmit={handleSubmit} className="mt-5 flex gap-2" noValidate>
                  <label className="min-w-0 flex-1">
                    <span className="sr-only">Email address</span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-full border border-crema/20 bg-bark px-5 py-3 text-sm outline-none transition-all duration-300 placeholder:text-crema/35 focus:border-caramel focus:ring-4 focus:ring-caramel/20"
                    />
                  </label>
                  <button
                    type="submit"
                    aria-label="Join the First Crack Club"
                    className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-full bg-caramel text-espresso transition-all duration-300 hover:bg-crema active:scale-90"
                  >
                    <IconArrow className="h-4 w-4" />
                  </button>
                </form>
                {error && (
                  <p className="mt-2 text-xs font-medium text-clay">
                    That address doesn&rsquo;t look right — try again?
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        <p
          aria-hidden
          className="pointer-events-none mt-10 select-none whitespace-nowrap text-center font-display text-[17vw] font-bold leading-[0.8] text-crema/5 lg:text-[11rem]"
        >
          Ember &amp; Oak
        </p>

        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-crema/12 pt-6 sm:flex-row">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-crema/45">
            © 2026 Ember &amp; Oak Roastworks
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-crema/45">
            Roasted with fire in Portland, OR
          </p>
          <a
            href="#top"
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-crema/60 transition-colors hover:text-caramel"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
