import type { Localized } from "@/lib/i18n";

export type Project = {
  // Dipakai di URL: /id/projects/<slug>. Huruf kecil dan tanda hubung saja.
  slug: string;
  title: Localized;
  summary: Localized;
  role: Localized;
  year: string;
  tech: string[];
  // Gambar di public/, misalnya "/projects/nama-proyek.jpg"
  cover?: string;
  links?: { repo?: string; demo?: string };
  // Isi dokumentasi. Pisahkan paragraf di dalam body dengan baris kosong (\n\n).
  sections: { heading: Localized; body: Localized }[];
};

// Proyek paling baru taruh paling atas.
//
// Contoh:
// {
//   slug: "sistem-inventaris",
//   title: { id: "Sistem Inventaris", en: "Inventory System" },
//   summary: { id: "Ringkasan satu kalimat.", en: "One-sentence summary." },
//   role: { id: "Full-stack Developer", en: "Full-stack Developer" },
//   year: "2025",
//   tech: ["Next.js", "PostgreSQL"],
//   cover: "/projects/sistem-inventaris.jpg",
//   links: { repo: "https://github.com/nurfadilahzulfi/..." },
//   sections: [
//     { heading: { id: "Masalah", en: "Problem" }, body: { id: "...", en: "..." } },
//     { heading: { id: "Solusi", en: "Solution" }, body: { id: "...", en: "..." } },
//     { heading: { id: "Hasil", en: "Results" }, body: { id: "...", en: "..." } },
//   ],
// },
export const projects: Project[] = [];
