import type { Localized } from "@/lib/i18n";

// Data yang sama di semua bahasa. Teks antarmuka yang perlu diterjemahkan ada di
// app/[lang]/dictionaries/id.json dan en.json.

type Experience = {
  company: string;
  position: string;
  // Contoh: { id: "Jan 2024 – Sekarang", en: "Jan 2024 – Present" }
  period: Localized;
  description?: Localized;
};

type Education = {
  school: string;
  degree: Localized;
  period: string;
};

export const profile = {
  name: "Nur Fadilah Zulfi",
  email: "nurfadilahzulfi@gmail.com",
  position: "IT Specialist Staff",
  company: "Tanimas Group",
  photo: "/images/hero.jpg",
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/nurfadilahzulfi",
      icon: "/icons/github.svg",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/nur-fadilah-zulfi-43a966257",
      icon: "/icons/linkedin.svg",
    },
  ],
  experience: [
    {
      company: "Tanimas Group",
      position: "IT Specialist Staff",
      period: { id: "Sekarang", en: "Present" },
    },
  ] as Experience[],
  // Bagian Keahlian dan Pendidikan di halaman Profil baru muncul kalau ada isinya.
  skills: [] as string[],
  education: [] as Education[],
};
