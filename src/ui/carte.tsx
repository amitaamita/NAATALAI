import type { HTMLAttributes } from "react";

export function Carte({ className = "", ...reste }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-(--radius-carte) bg-white/90 p-6 shadow-douce ring-1 ring-culture-100 ${className}`}
      {...reste}
    />
  );
}
