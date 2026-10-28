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
  // Screenshot tambahan di bawah dokumentasi. width/height = ukuran asli file.
  gallery?: { src: string; width: number; height: number; caption: Localized }[];
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
export const projects: Project[] = [
  {
    slug: "sage",
    title: {
      id: "SAGE: Smart Automated Grader for Essay",
      en: "SAGE: Smart Automated Grader for Essay",
    },
    summary: {
      id: "Aplikasi web berbasis AI yang menilai ujian esai secara otomatis dengan LLM Qwen3 8B hasil fine-tuning, dilengkapi pengawasan ujian untuk menjaga integritas ujian.",
      en: "An AI-powered web app that grades essay exams automatically with a fine-tuned Qwen3 8B LLM, with built-in proctoring to protect exam integrity.",
    },
    role: { id: "AI & Full-stack Developer", en: "AI & Full-stack Developer" },
    year: "2026",
    tech: [
      "Qwen3 8B",
      "LoRA",
      "Ollama",
      "Django REST Framework",
      "Vue.js",
      "Celery",
      "Redis",
      "PostgreSQL",
      "Docker Compose",
    ],
    cover: "/projects/sage/dashboard-dosen.jpg",
    sections: [
      {
        heading: { id: "Latar belakang", en: "Background" },
        body: {
          id: "SAGE adalah proyek pribadi yang saya bangun untuk membantu dosen di Politeknik Negeri Lhokseumawe agar penilaian ujian esai mahasiswa menjadi lebih mudah, konsisten, dan sesuai rubrik.",
          en: "SAGE is a personal project I built to help lecturers at Politeknik Negeri Lhokseumawe grade students' essay exams more easily, consistently, and in line with their rubrics.",
        },
      },
      {
        heading: { id: "Model AI", en: "AI model" },
        body: {
          id: "Penilaian esai dijalankan oleh Large Language Model Qwen3 (8B) yang telah di-fine-tune. Model di-fine-tune dengan LoRA menggunakan dataset khusus yang berisi soal esai, jawaban referensi, dan rubrik penilaian yang ditentukan dosen, sehingga hasil penilaiannya lebih konsisten dan sesuai rubrik.\n\nSetiap jawaban mendapat nilai beserta catatan AI yang menjelaskan alasan penilaiannya, lalu dirangkum dalam laporan hasil ujian berformat PDF.",
          en: "Essays are assessed by a fine-tuned Qwen3 (8B) Large Language Model. The model was fine-tuned with LoRA on a custom dataset of essay questions, reference answers, and lecturer-defined grading rubrics to produce more consistent, rubric-aligned evaluations.\n\nEvery answer receives a score along with an AI note explaining the reasoning, and the results are compiled into a PDF exam report.",
        },
      },
      {
        heading: { id: "Arsitektur", en: "Architecture" },
        body: {
          id: "Backend dibangun dengan Django REST Framework dan frontend dengan Vue.js. Inferensi AI berjalan secara lokal melalui Ollama, sementara Celery dan Redis menangani proses penilaian esai secara asinkron.\n\nSeluruh sistem dikemas dalam container dengan Docker Compose dan menggunakan PostgreSQL untuk penyimpanan data.",
          en: "The backend is built with Django REST Framework and the frontend with Vue.js. AI inference runs locally through Ollama, while Celery and Redis handle essay evaluation asynchronously.\n\nThe entire system is containerized with Docker Compose and uses PostgreSQL for persistent data storage.",
        },
      },
      {
        heading: { id: "Pengawasan ujian", en: "Exam proctoring" },
        body: {
          id: "Sistem memantau aktivitas mahasiswa selama ujian berlangsung. Lembar ujian terkunci dalam mode layar penuh, perpindahan tab atau jendela browser terdeteksi, dan fitur copy-paste dinonaktifkan pada lembar esai.\n\nTindakan yang tidak diizinkan, seperti meninggalkan halaman ujian atau mencoba menyalin dan menempel isi ujian, otomatis terdeteksi dan dicatat sebagai pelanggaran. Akun mahasiswa langsung dibatasi untuk menjaga integritas ujian, dan dosen dapat meninjaunya melalui log pelanggaran.",
          en: "The system monitors student activity throughout the exam. The exam sheet is locked in fullscreen mode, switching tabs or browser windows is detected, and copy and paste are disabled on the essay sheet.\n\nUnauthorized actions, such as leaving the exam page or trying to copy and paste exam content, are automatically detected and recorded as violations. The student's account is restricted immediately to preserve exam integrity, and lecturers can review it in the violation log.",
        },
      },
    ],
    gallery: [
      {
        src: "/projects/sage/dashboard-mahasiswa.jpg",
        width: 1600,
        height: 768,
        caption: {
          id: "Dashboard mahasiswa dengan daftar ujian yang tersedia dan aturan proctoring AI.",
          en: "Student dashboard with available exams and the AI proctoring rules.",
        },
      },
      {
        src: "/projects/sage/lembar-ujian.jpg",
        width: 1351,
        height: 762,
        caption: {
          id: "Lembar ujian esai dalam mode layar penuh terkunci, dengan copy-paste dinonaktifkan.",
          en: "Essay exam sheet in locked fullscreen mode, with copy and paste disabled.",
        },
      },
      {
        src: "/projects/sage/ujian-dihentikan.jpg",
        width: 1600,
        height: 768,
        caption: {
          id: "Ujian otomatis dihentikan dan akun dikunci saat mahasiswa keluar dari layar penuh.",
          en: "The exam stops and the account is locked as soon as a student leaves fullscreen.",
        },
      },
      {
        src: "/projects/sage/laporan-pdf.jpg",
        width: 830,
        height: 732,
        caption: {
          id: "Laporan hasil ujian dalam PDF, berisi nilai dan catatan AI untuk setiap soal (data mahasiswa diburamkan).",
          en: "PDF exam report with the score and AI note for each question (student details blurred).",
        },
      },
    ],
  },
];
