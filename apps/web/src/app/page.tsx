import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-20">
      <h1 className="font-display text-3xl text-ciruelo">Siempre Presente</h1>
      <Link href="/login" className="text-sm text-terracota">
        Iniciar sesión
      </Link>
    </div>
  );
}
