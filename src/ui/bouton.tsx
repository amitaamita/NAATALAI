import type { ButtonHTMLAttributes } from "react";

type Variante = "primaire" | "secondaire" | "fantome";
type Taille = "normale" | "grande";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition " +
  "duration-200 ease-(--ease-naatal) active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50";

const VARIANTES: Record<Variante, string> = {
  primaire: "bg-culture-700 text-creme-50 shadow-douce hover:bg-culture-800 hover:shadow-relief",
  secondaire: "bg-mil-400 text-culture-900 shadow-douce hover:bg-mil-300",
  fantome: "bg-transparent text-culture-700 ring-1 ring-culture-200 hover:bg-culture-50",
};

// Le producteur a de gros boutons (§4.5) ; les espaces pro restent compacts.
const TAILLES: Record<Taille, string> = {
  normale: "h-11 px-5 text-sm",
  grande: "min-h-14 px-7 text-base",
};

export function classesBouton(variante: Variante = "primaire", taille: Taille = "normale"): string {
  return `${BASE} ${VARIANTES[variante]} ${TAILLES[taille]}`;
}

type ProprietesBouton = ButtonHTMLAttributes<HTMLButtonElement> & {
  variante?: Variante;
  taille?: Taille;
};

export function Bouton({ variante, taille, className = "", type = "button", ...reste }: ProprietesBouton) {
  return <button type={type} className={`${classesBouton(variante, taille)} ${className}`} {...reste} />;
}
