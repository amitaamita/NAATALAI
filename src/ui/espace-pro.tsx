import Link from "next/link";
import type { ReactNode } from "react";

type LienNavigation = { href: string; libelle: string };

// Coquille des espaces conseiller, expert et admin : dense et professionnelle.
export function EspacePro({
  titre,
  navigation,
  children,
}: {
  titre: string;
  navigation: LienNavigation[];
  children: ReactNode;
}) {
  return (
    <div className="min-h-dvh md:grid md:grid-cols-[16rem_1fr]">
      <aside className="bg-culture-900 px-5 py-6 text-creme-100 md:min-h-dvh">
        <Link href="/" className="font-titre text-xl font-semibold text-creme-50">
          NAATAL <span className="text-mil-400">AI</span>
        </Link>
        <nav className="mt-8 flex gap-2 overflow-x-auto md:flex-col">
          {navigation.map((lien) => (
            <Link
              key={lien.libelle}
              href={lien.href}
              className="whitespace-nowrap rounded-lg px-3 py-2 text-sm text-creme-100/80 transition hover:bg-culture-800 hover:text-creme-50"
            >
              {lien.libelle}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="px-6 py-8 md:px-10">
        <h1 className="animate-monter text-3xl font-semibold text-culture-900">{titre}</h1>
        <div className="mt-8 animate-monter [animation-delay:120ms]">{children}</div>
      </main>
    </div>
  );
}
