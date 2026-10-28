# Portfolio

Next.js 16 + Tailwind CSS 4 + TypeScript, dua bahasa (Indonesia & Inggris).

## Menjalankan

```bash
npm install
npm run dev
```

Buka http://localhost:3000. Pengunjung otomatis diarahkan ke `/id` atau `/en`
sesuai bahasa browser, atau sesuai pilihan terakhir mereka (disimpan di cookie).

## Mengubah konten

| Apa                                  | File                                                         |
| ------------------------------------ | ------------------------------------------------------------ |
| Nama, email, sosmed, pengalaman, keahlian, pendidikan | `content/profile.ts`                        |
| Daftar proyek & dokumentasinya       | `content/projects.ts` (ada contoh format di dalamnya)        |
| Teks bahasa Indonesia                | `app/[lang]/dictionaries/id.json`                            |
| Teks bahasa Inggris                  | `app/[lang]/dictionaries/en.json`                            |
| Gambar utama di hero                 | `public/images/hero.jpg` (ganti file dengan nama sama)       |

`en.json` jadi acuan struktur. Kalau menambah key baru di `en.json`, tambahkan
juga di `id.json`, kalau tidak build akan gagal.

## Deploy ke Vercel

Push repo ke GitHub, lalu import di https://vercel.com/new. Tidak perlu
setting tambahan.
