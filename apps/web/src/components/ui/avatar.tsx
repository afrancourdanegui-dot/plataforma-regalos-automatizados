export function Avatar({
  inicial,
  size = "md",
}: {
  inicial: string;
  size?: "sm" | "md";
}) {
  const dimensions = size === "sm" ? "h-10 w-10 text-base" : "h-12 w-12 text-xl";

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-arena font-display italic text-terracota ${dimensions}`}
    >
      {inicial}
    </div>
  );
}
