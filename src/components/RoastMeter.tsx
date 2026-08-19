import { cx } from "../lib/utils";

interface RoastMeterProps {
  roast: number;
  label: string;
  dark?: boolean;
}

function fillColor(roast: number, dark?: boolean): string {
  if (dark) return "bg-caramel";
  if (roast <= 2) return "bg-caramel";
  if (roast === 3) return "bg-caramel-deep";
  return "bg-mocha";
}

export default function RoastMeter({ roast, label, dark }: RoastMeterProps) {
  return (
    <span className="flex flex-col items-end gap-1.5">
      <span className="flex items-center gap-1" aria-label={`Roast level: ${label}`} role="img">
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className={cx(
              "h-1.5 w-3.5 rounded-full transition-colors",
              i <= roast ? fillColor(roast, dark) : dark ? "bg-crema/20" : "bg-espresso/12",
            )}
          />
        ))}
      </span>
      <span
        className={cx(
          "font-mono text-[9px] uppercase tracking-[0.18em]",
          dark ? "text-crema/55" : "text-fawn",
        )}
      >
        {label}
      </span>
    </span>
  );
}
