"use client";

import { useEffect } from "react";

// Active le service worker (application installable, écran disponible hors connexion).
export function EnregistrerServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Sans service worker l'application fonctionne quand même, en ligne.
    });
  }, []);

  return null;
}
