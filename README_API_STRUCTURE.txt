
================================================================================
PANDUAN STRUKTUR FILE: DEVELOPMENT VS PRODUCTION
================================================================================

Dokumen ini menjawab kebingungan tentang:
1. Kemana hilangnya folder 'api' saat build?
2. Bagaimana menyusun file di cPanel/Hosting?
3. Apa perbedaan struktur Localhost (Node.js) dengan Hosting (PHP)?

--------------------------------------------------------------------------------
1. KONSEP DASAR (PENTING)
--------------------------------------------------------------------------------
Aplikasi ini terpisah menjadi dua "Alam":

A. ALAM FRONTEND (React + Vite)
   - Dijalankan oleh Node.js saat coding.
   - Hasil akhirnya (`npm run build`) adalah folder `dist` yang isinya HANYA HTML, JS, dan CSS.
   - TIDAK ADA file PHP di dalam folder `dist`.

B. ALAM BACKEND (PHP Native)
   - Dijalankan oleh Web Server (Apache/Nginx) di hosting.
   - File PHP ini (seperti `login.php`, `register.php`) harus Anda buat/upload manual.
   - Vite TIDAK memproses file PHP.

--------------------------------------------------------------------------------
2. STRUKTUR DEVELOPMENT (DI LAPTOP / VS CODE)
--------------------------------------------------------------------------------
Saat Anda coding di laptop (`npm run dev`), strukturnya seperti ini:

/qioslink-project
├── node_modules/       (Folder library Node.js)
├── public/             (Aset statis)
├── src/                (Kodingan React Anda ada disini)
│   ├── App.tsx
│   ├── index.tsx
│   └── ...
├── index.html          (Pintu masuk React)
├── package.json
├── vite.config.ts
├── .env.development    (Isinya: VITE_USE_DEMO_DATA=true)
│
└── (TIDAK ADA FOLDER API YANG AKTIF DISINI)
    *Karena saat dev mode, kita pakai Mock Data (Memory Browser).
    *Kalaupun Anda simpan file PHP disini, itu cuma buat backup kode.

--------------------------------------------------------------------------------
3. STRUKTUR PRODUCTION (DI CPANEL / HOSTING)
--------------------------------------------------------------------------------
Saat Anda mau online-kan, Anda harus MENGGABUNGKAN hasil build React dengan file PHP manual.

Langkah Kerjanya:
1. `npm run build` -> Menghasilkan folder `dist`.
2. Anda buat folder `api` manual.
3. Upload keduanya ke `public_html`.

Maka, struktur di File Manager cPanel Anda WAJIB seperti ini:

/public_html            <-- Root Domain Anda
│
├── index.html          (Berasal dari folder 'dist' hasil build)
├── assets/             (Berasal dari folder 'dist' hasil build)
│   ├── index-x823.js
│   └── index-x823.css
│
├── api/                <-- FOLDER INI BIKIN MANUAL (Klik New Folder)
│   │                       (Isinya adalah file dari backend_production_bundle.txt)
│   ├── db_connect.php
│   ├── login.php
│   ├── register.php
│   ├── create_payment.php
│   ├── get_data.php
│   ├── get_payment_details.php
│   ├── revoke_link.php
│   ├── manage_users.php
│   ├── update_config.php
│   └── test_smtp.php
│
├── callback.php        (File Callback Qiospay, taruh di luar folder api)
└── .htaccess           (Opsional, jika butuh pengaturan server)

--------------------------------------------------------------------------------
4. MENJAWAB KEHERANAN "KENAPA ./api?"
--------------------------------------------------------------------------------
Di file `.env.production` atau `.env`, kita set:
`VITE_API_BASE_URL=./api`

Artinya:
Saat user membuka `https://domain-anda.com` (yang memuat `index.html`),
Jika user klik Login, React akan menembak URL: `Current URL` + `/api/login.php`.

Hasilnya: `https://domain-anda.com/api/login.php`

Inilah kenapa struktur foldernya harus sejajar seperti pohon di atas (poin nomor 3).

--------------------------------------------------------------------------------
5. CHECKLIST SAAT UPLOAD
--------------------------------------------------------------------------------
[ ] Build React (`npm run build`).
[ ] Upload isi `dist` ke `public_html`.
[ ] Buat folder `api` di `public_html`.
[ ] Upload file PHP (dari `backend_production_bundle.txt`) ke dalam folder `api`.
[ ] Upload `callback.php` ke `public_html` (sejajar index.html).
[ ] Edit `api/db_connect.php` sesuaikan user/pass database hosting.
