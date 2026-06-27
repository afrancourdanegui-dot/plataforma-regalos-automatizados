import { type ButtonHTMLAttributes } from "react";

type Variant = "primary" | "ghost" | "danger";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-terracota text-white hover:bg-[#a8431f] focus-visible:outline-[#a8431f]",
  ghost:
    "bg-white text-ciruelo border border-arena hover:border-terracota focus-visible:outline-terracota",
  danger:
    "bg-white text-terracota border border-terracota hover:bg-terracota hover:text-white focus-visible:outline-terracota",
};

const BASE_CLASSES =
  "inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

export function buttonClasses(variant: Variant = "primary", className = "") {
  return `${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className}`;
}

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: Props) {
  return <button className={buttonClasses(variant, className)} {...props} />;
}
