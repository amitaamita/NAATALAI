import type { MetadataRoute } from "next";

// Application installable sur smartphone (cahier §5.1 : pas de magasin d'applications au départ).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NAATAL AI",
    short_name: "NAATAL",
    description: "Assistant agricole du Sénégal",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#fdfbf6",
    theme_color: "#1f5c3a",
    lang: "fr",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
