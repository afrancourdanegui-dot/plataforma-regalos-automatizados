export function Badge({
  children,
  urgent = false,
}: {
  children: React.ReactNode;
  urgent?: boolean;
}) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide ${
        urgent ? "bg-terracota text-white" : "bg-durazno text-ciruelo"
      }`}
    >
      {children}
    </span>
  );
}
