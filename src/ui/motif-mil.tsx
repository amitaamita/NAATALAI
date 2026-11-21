// Motif décoratif original : épis de mil stylisés. SVG léger, aucune image à télécharger.
const EPIS = [
  { x: 40, hauteur: 210, delai: "0s" },
  { x: 95, hauteur: 260, delai: "0.6s" },
  { x: 150, hauteur: 190, delai: "1.2s" },
  { x: 205, hauteur: 240, delai: "0.3s" },
  { x: 260, hauteur: 200, delai: "0.9s" },
];

export function MotifMil({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 300" aria-hidden="true" className={className}>
      {EPIS.map(({ x, hauteur, delai }) => {
        const haut = 300 - hauteur;
        return (
          <g
            key={x}
            className="origin-bottom animate-pousser"
            style={{ animationDelay: delai, transformBox: "fill-box" }}
          >
            <path d={`M${x} 300 C ${x - 6} ${haut + 80}, ${x + 6} ${haut + 40}, ${x} ${haut + 30}`}
              stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.55" />
            <path d={`M${x} 300 Q ${x + 28} ${haut + 120} ${x + 34} ${haut + 70}`}
              stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.35" />
            <ellipse cx={x} cy={haut + 12} rx="9" ry="30" fill="var(--color-mil-400)" opacity="0.9" />
          </g>
        );
      })}
    </svg>
  );
}
