================================================================================
PANDUAN PENGATURAN ENVIRONMENT (MODE LOCAL VS PRODUCTION)
================================================================================

Aplikasi ini menggunakan konfigurasi otomatis berbasis file .env (mirip Laravel).

PENTING:
Karena batasan sistem saat pembuatan file, file environment disajikan dalam format .txt.
Mohon LAKUKAN RENAME berikut sebelum menjalankan aplikasi:

1. Rename `dot_env.txt`             menjadi `.env`
2. Rename `dot_env_development.txt` menjadi `.env.development`
3. Rename `dot_env_production.txt`  menjadi `.env.production`

--------------------------------------------------------------------------------
CARA KERJA OTOMATIS
--------------------------------------------------------------------------------

1. SAAT CODING DI LAPTOP (npm run dev)
   - Vite otomatis membaca file: `.env.development`
   - Setting: VITE_USE_DEMO_DATA=true
   - Efek: Aplikasi berjalan lancar menggunakan data palsu (Mock Data), tidak perlu XAMPP/PHP.

2. SAAT BUILD UNTUK UPLOAD (npm run build)
   - Vite otomatis membaca file: `.env.production`
   - Setting: VITE_USE_DEMO_DATA=false
   - Efek: Aplikasi hasil build (folder dist) akan mencoba menghubungi file PHP (`create_payment.php`, dll).

--------------------------------------------------------------------------------
BAGAIMANA JIKA SAYA INGIN UPLOAD VERSI DEMO (TANPA PHP)?
--------------------------------------------------------------------------------
Jika Anda ingin hasil build tetap menjadi Demo (misal untuk hosting statis seperti Vercel/Netlify/GitHub Pages):

1. Buka file `.env.production`
2. Ubah `VITE_USE_DEMO_DATA=false` menjadi `VITE_USE_DEMO_DATA=true`
3. Jalankan `npm run build`

--------------------------------------------------------------------------------
VARIABEL YANG TERSEDIA
--------------------------------------------------------------------------------
- VITE_USE_DEMO_DATA : 'true' atau 'false'
- VITE_API_BASE_URL  : Base URL untuk API. Biasanya './api' relatif terhadap domain.
