import type { Localized } from "@/lib/i18n";

// Data yang sama di semua bahasa. Teks antarmuka yang perlu diterjemahkan ada di
// app/[lang]/dictionaries/id.json dan en.json.

type Experience = {
  company: string;
  position: string;
  // Contoh: { id: "Jan 2024 – Sekarang", en: "Jan 2024 – Present" }
  period: Localized;
  // Label kecil di samping periode, misalnya Magang / Internship.
  type?: Localized;
  description?: Localized;
  // Daftar tugas, tampil sebagai poin-poin.
  highlights?: Localized[];
};

type Education = {
  school: string;
  program: Localized;
  degree: Localized;
  period: string;
  gpa?: Localized;
};

export const profile = {
  name: "Nur Fadilah Zulfi",
  email: "nurfadilahzulfi@gmail.com",
  position: "IT Specialist Staff",
  company: "Tanimas Group",
  // Gambar di hero halaman utama.
  photo: "/images/hero.jpg",
  // Foto profil di halaman Profil (rasio 4:5).
  avatar: "/images/profile.jpg",
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
  // Paling baru di atas.
  experience: [
    {
      company: "Tanimas Group",
      position: "IT Specialist Staff",
      period: { id: "Agu 2026 – Sekarang", en: "Aug 2026 – Present" },
      highlights: [
        {
          id: "Mengintegrasikan SAP Business One dengan add-on aplikasi desktop Weighbridge (jembatan timbang).",
          en: "Integrating SAP Business One with an add-on for the Weighbridge desktop app.",
        },
        {
          id: "Membangun aplikasi E-Visitor berbasis web untuk tamu Tanimas Group.",
          en: "Building a web-based E-Visitor app for Tanimas Group guests.",
        },
        {
          id: "Membangun sistem inventaris IT yang terintegrasi dengan SAP Business One.",
          en: "Building an IT inventory system integrated with SAP Business One.",
        },
        {
          id: "Menangani dan melakukan troubleshooting jaringan serta data center.",
          en: "Handling and troubleshooting the network and data center.",
        },
        {
          id: "Memastikan perangkat pengguna berjalan lancar dan membantu mereka dalam proses bisnis teknologi informasi.",
          en: "Keeping users' devices running smoothly and assisting them with IT business processes.",
        },
        {
          id: "Menangani SOP dan regulasi terkait teknologi informasi.",
          en: "Handling IT-related SOPs and regulations.",
        },
      ],
    },
    {
      company: "PT. Industri Nabati Lestari",
      position: "Artificial Intelligence Engineer & IT Support",
      period: { id: "Jul 2025 – Jan 2026", en: "Jul 2025 – Jan 2026" },
      type: { id: "Magang", en: "Internship" },
      highlights: [
        {
          id: "Mengembangkan AI Assistant dan analisis insight produksi berbasis AI untuk dashboard manajemen.",
          en: "Developed an AI assistant and AI-driven production insight analysis for the management dashboard.",
        },
        {
          id: "Membantu pengguna menyelesaikan kendala terkait teknologi informasi dalam pekerjaan mereka.",
          en: "Assisted users with information technology issues in their work.",
        },
        {
          id: "Memastikan kinerja jaringan tetap lancar dan menganalisis permasalahan terkait internet.",
          en: "Ensured smooth network performance and analyzed internet-related issues.",
        },
      ],
    },
  ] as Experience[],
  // Bagian Keahlian di halaman Profil baru muncul kalau ada isinya.
  skills: [] as string[],
  education: [
    {
      school: "Politeknik Negeri Lhokseumawe",
      program: { id: "D4 Teknik Informatika", en: "Informatics Engineering (D4)" },
      degree: {
        id: "Sarjana Terapan Komputer (S.Tr.Kom)",
        en: "Bachelor of Applied Computer Science (S.Tr.Kom)",
      },
      period: "2022 – 2026",
      gpa: { id: "IPK 3,76", en: "GPA 3.76" },
    },
  ] as Education[],
};
