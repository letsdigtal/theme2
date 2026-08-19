import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import type { CartLine } from "../types";
import { cx, fmt } from "../lib/utils";
import { shippingFor } from "../lib/pricing";
import { IconSpinner, IconX } from "./icons";
import { resolveLines } from "./CartDrawer";

type Phase = "form" | "processing" | "done";

interface CheckoutModalProps {
  open: boolean;
  lines: CartLine[];
  subtotal: number;
  onClose: () => void;
  onComplete: () => void;
}

const EMPTY_FORM = {
  name: "",
  email: "",
  address: "",
  city: "",
  zip: "",
  card: "",
  exp: "",
  cvc: "",
};

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[13px] font-semibold">{label}</span>
      <div className="mt-1.5">{children}</div>
      {error && <span className="mt-1 block text-xs font-medium text-clay">{error}</span>}
    </label>
  );
}

export default function CheckoutModal({ open, lines, subtotal, onClose, onComplete }: CheckoutModalProps) {
  const [phase, setPhase] = useState<Phase>("form");
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [placed, setPlaced] = useState<{ no: string; total: number; count: number; firstName: string } | null>(null);

  const resolved = resolveLines(lines);
  const count = lines.reduce((s, l) => s + l.qty, 0);
  const shipping = shippingFor(subtotal);
  const total = subtotal + shipping;

  useEffect(() => {
    if (open && phase !== "processing") setPhase("form");
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && phase !== "processing") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, phase, onClose]);

  const setField = (key: keyof typeof EMPTY_FORM, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const formatCard = (v: string) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");

  const formatExp = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 4);
    return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = "Tell us who's receiving the beans.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "That email doesn't look right.";
    if (form.address.trim().length < 5) e.address = "We need a street address to ship to.";
    if (form.city.trim().length < 2) e.city = "City, please.";
    if (form.zip.trim().length < 3) e.zip = "ZIP / postcode, please.";
    if (form.card.replace(/\s/g, "").length !== 16) e.card = "Card number should be 16 digits.";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.exp)) e.exp = "Use MM/YY.";
    if (!/^\d{3,4}$/.test(form.cvc)) e.cvc = "3–4 digits.";
    return e;
  };

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setPlaced({
      no: `EO-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
      total,
      count,
      firstName: form.name.trim().split(/\s+/)[0],
    });
    setPhase("processing");
    window.setTimeout(() => setPhase("done"), 1700);
  };

  if (!open) return null;

  const inputCls = (err?: string) =>
    cx(
      "w-full rounded-xl border bg-crema px-4 py-3 text-sm outline-none transition-all duration-200 placeholder:text-fawn/60 focus:border-caramel focus:ring-4 focus:ring-caramel/20",
      err ? "border-clay" : "border-espresso/15",
    );

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Checkout"
    >
      <button
        aria-label="Close checkout"
        onClick={() => phase !== "processing" && onClose()}
        className="absolute inset-0 animate-fade cursor-default bg-espresso/75 backdrop-blur-[4px]"
      />

      <div className="relative max-h-[94vh] w-full animate-rise overflow-y-auto rounded-t-[26px] bg-paper shadow-2xl sm:max-w-xl sm:rounded-[26px]">
        {phase === "form" && (
          <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-caramel-deep">
                  Ember &amp; Oak — order draft
                </p>
                <h2 className="mt-1.5 font-display text-3xl font-bold">Checkout</h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-espresso/15 transition-all duration-300 hover:rotate-90 hover:border-clay hover:text-clay"
              >
                <IconX className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 rounded-xl border border-espresso/12 bg-crema p-4">
              <ul className="space-y-1.5">
                {resolved.map((l) => (
                  <li key={l.key} className="flex justify-between gap-3 text-sm">
                    <span className="truncate text-mocha">
                      {l.product.name} <span className="font-mono text-[11px] text-fawn">×{l.qty}</span>
                    </span>
                    <span className="shrink-0 font-semibold">{fmt(l.product.price * l.qty)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 space-y-1 border-t border-dashed border-espresso/15 pt-3 text-sm">
                <p className="flex justify-between text-mocha">
                  <span>Shipping</span>
                  <span className={cx("font-semibold", shipping === 0 && "text-sage")}>
                    {shipping === 0 ? "Free" : fmt(shipping)}
                  </span>
                </p>
                <p className="flex justify-between font-display text-lg font-bold">
                  <span>Total</span>
                  <span>{fmt(total)}</span>
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              <Field label="Email" error={errors.email}>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  placeholder="you@example.com"
                  className={inputCls(errors.email)}
                />
              </Field>
              <Field label="Full name" error={errors.name}>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setField("name", e.target.value)}
                  placeholder="Frankie Roaster"
                  className={inputCls(errors.name)}
                />
              </Field>
              <Field label="Street address" error={errors.address}>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => setField("address", e.target.value)}
                  placeholder="214 SE Ankeny St"
                  className={inputCls(errors.address)}
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="City" error={errors.city}>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => setField("city", e.target.value)}
                    placeholder="Portland"
                    className={inputCls(errors.city)}
                  />
                </Field>
                <Field label="ZIP / Postcode" error={errors.zip}>
                  <input
                    type="text"
                    value={form.zip}
                    onChange={(e) => setField("zip", e.target.value)}
                    placeholder="97214"
                    className={inputCls(errors.zip)}
                  />
                </Field>
              </div>

              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.24em] text-fawn">
                Payment — simulated
              </p>
              <Field label="Card number" error={errors.card}>
                <input
                  type="text"
                  inputMode="numeric"
                  value={form.card}
                  onChange={(e) => setField("card", formatCard(e.target.value))}
                  placeholder="4242 4242 4242 4242"
                  className={cx(inputCls(errors.card), "font-mono")}
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Expiry" error={errors.exp}>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={form.exp}
                    onChange={(e) => setField("exp", formatExp(e.target.value))}
                    placeholder="MM/YY"
                    className={cx(inputCls(errors.exp), "font-mono")}
                  />
                </Field>
                <Field label="CVC" error={errors.cvc}>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={form.cvc}
                    onChange={(e) => setField("cvc", e.target.value.replace(/\D/g, "").slice(0, 4))}
                    placeholder="123"
                    className={cx(inputCls(errors.cvc), "font-mono")}
                  />
                </Field>
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-full bg-espresso py-4 font-semibold text-crema transition-all duration-300 hover:bg-caramel-deep active:scale-[0.98]"
            >
              Place order — {fmt(total)}
            </button>
            <p className="mt-3 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-fawn">
              Simulated payment — nothing is charged
            </p>
          </form>
        )}

        {phase === "processing" && (
          <div className="flex flex-col items-center gap-5 px-8 py-20 text-center">
            <IconSpinner className="h-10 w-10 animate-spin text-caramel" />
            <p className="font-display text-2xl font-bold">Talking to the roaster…</p>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-fawn">
              Reserving your batch
            </p>
          </div>
        )}

        {phase === "done" && placed && (
          <div className="flex flex-col items-center gap-4 px-6 py-14 text-center sm:px-10">
            <span className="grid h-20 w-20 animate-pop place-items-center rounded-full border-2 border-sage bg-sage/15 text-sage">
              <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" aria-hidden>
                <path
                  d="m5 13 4.5 4.5L19 7.5"
                  stroke="currentColor"
                  strokeWidth={2.4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={52}
                  className="animate-draw"
                />
              </svg>
            </span>
            <h2 className="font-display text-3xl font-bold">Order in the queue!</h2>
            <p className="rounded-full bg-espresso px-4 py-1.5 font-mono text-xs tracking-[0.22em] text-crema">
              {placed.no}
            </p>
            <p className="max-w-sm text-[15px] leading-relaxed text-mocha/90">
              Thanks, {placed.firstName}. Your {placed.count} bag{placed.count === 1 ? "" : "s"} are
              reserved for the next roast — we&rsquo;ll email you the moment they leave the drum.
            </p>
            <p className="font-display text-xl font-bold">{fmt(placed.total)} paid</p>
            <button
              onClick={onComplete}
              className="mt-2 rounded-full bg-espresso px-8 py-3.5 font-semibold text-crema transition-all duration-300 hover:bg-caramel-deep active:scale-95"
            >
              Back to the shelf
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
