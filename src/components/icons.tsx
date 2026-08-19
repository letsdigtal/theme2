import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export function LogoMark(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" {...props}>
      <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="2" />
      <path
        d="M16 6.5c-5 0-8 4.3-8 9.5s3 9.5 8 9.5 8-4.3 8-9.5-3-9.5-8-9.5Zm0 1.8c1.9 2.6 2.5 5.1 1.7 8-.8 2.7-2.7 5-5.5 6.4A8.9 8.9 0 0 1 9.8 16c0-4.3 2.4-7.7 6.2-7.7Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function IconSearch(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.2-3.2" />
    </svg>
  );
}

export function IconBag(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 8h14l-1.2 12.2a1.6 1.6 0 0 1-1.6 1.3H7.8a1.6 1.6 0 0 1-1.6-1.3L5 8Z" />
      <path d="M8.5 10V6.8a3.5 3.5 0 0 1 7 0V10" />
    </svg>
  );
}

export function IconPlus(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function IconMinus(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function IconX(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export function IconTrash(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12.2A1.6 1.6 0 0 0 8.6 20.5h6.8a1.6 1.6 0 0 0 1.6-1.3L18 7M9 7V5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 5v2" />
    </svg>
  );
}

export function IconArrow(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12h16M13 5l7 7-7 7" />
    </svg>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m5 13 4.5 4.5L19 7.5" />
    </svg>
  );
}

export function IconStar(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.4l-5.8 3.1 1.1-6.5L2.6 9.4l6.5-.9L12 2.6Z" />
    </svg>
  );
}

export function IconFlame(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21c3.9 0 6.5-2.6 6.5-6.2 0-2.5-1.4-4.4-2.7-5.9C14.5 7.4 13 5.5 13 3c-3 1.5-4.2 4-4 6.5-.9-.3-1.6-1-1.9-2.1-1.2 1.4-1.6 3.1-1.6 4.9C5.5 18.4 8.1 21 12 21Z" />
      <path d="M12 21c1.7 0 3-1.3 3-3.1 0-1.6-1.1-2.6-3-4.4-1.9 1.8-3 2.8-3 4.4 0 1.8 1.3 3.1 3 3.1Z" />
    </svg>
  );
}

export function IconChevron(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function IconTruck(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 6h11v10H3zM14 9h4l3 3v4h-7" />
      <circle cx="7" cy="17.5" r="1.8" />
      <circle cx="17.5" cy="17.5" r="1.8" />
    </svg>
  );
}

export function IconCup(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 9h11v6a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5V9Z" />
      <path d="M16 10h1.5a2.5 2.5 0 0 1 0 5H16M7 5.5c.8-.8.8-1.7 0-2.5M11 5.5c.8-.8.8-1.7 0-2.5" />
    </svg>
  );
}

export function IconSpinner(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3a9 9 0 1 0 9 9" />
    </svg>
  );
}

export function IconBeanSmall(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 3c-4.4 0-7 3.9-7 9s2.6 9 7 9 7-3.9 7-9-2.6-9-7-9Zm.4 2.1c1.5 2.2 2 4.4 1.3 6.9-.6 2.3-2.2 4.3-4.6 5.6A7.6 7.6 0 0 1 7 12c0-3.9 2.2-6.9 5.4-6.9Z" />
    </svg>
  );
}
