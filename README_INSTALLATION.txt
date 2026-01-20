
================================================================================
JAJANAN ONLINE SaaS - COMPLETE INSTALLATION GUIDE (v1.1)
================================================================================

Aplikasi ini memiliki 2 bagian:
1. FRONTEND (React/Vite) - Tampilan antarmuka.
2. BACKEND (PHP Native) - Logika server, database, dan koneksi ke Qiospay.

--------------------------------------------------------------------------------
OPSI 1: MODE DEMO (LOCALHOST / STATIC HOSTING)
--------------------------------------------------------------------------------
Cocok untuk preview UI tanpa install database/PHP. Data tersimpan di browser.

1. Buka file `.env` (atau rename `env_demo.txt` jadi `.env`).
   Pastikan isinya:
   VITE_USE_DEMO_DATA=true
   VITE_API_BASE_URL=./api

2. Buka terminal di folder project:
   npm install
   npm run dev

3. Buka browser di http://localhost:5173
   Login: admin / admin

--------------------------------------------------------------------------------
OPSI 2: MODE PRODUCTION (LIVE DI CPANEL/VPS)
--------------------------------------------------------------------------------
Wajib punya Hosting dengan PHP 7.4+ dan MySQL.

TAHAP A: PERSIAPAN FRONTEND
1. Ubah file `.env` menjadi:
   VITE_USE_DEMO_DATA=false
   VITE_API_BASE_URL=./api
2. Jalankan perintah: `npm run build`
3. Hasil build ada di folder `dist`.

TAHAP B: PERSIAPAN DATABASE
1. Buka cPanel -> MySQL Databases.
2. Buat Database baru (misal: `toko_online`).
3. Import file `database.sql` ke database tersebut via phpMyAdmin.

TAHAP C: UPLOAD FILE
1. Buka File Manager di cPanel -> `public_html`.
2. Upload SEMUA isi folder `dist` (index.html, assets/).
3. Buat folder baru bernama `api`.
4. Upload file-file PHP berikut ke dalam folder `api`:
   - db_connect.php (EDIT FILE INI: Masukkan user/pass DB Anda)
   - api_process_order_php.txt -> rename jadi `process_order.php`
   - api_create_payment_php.txt -> rename jadi `create_payment.php`
   - api_manage_users_php.txt -> rename jadi `manage_users.php`
   - api_manage_store_php.txt -> rename jadi `manage_store.php`
   - backend_qris_utils.txt -> rename jadi `qris_utils.php`
   - backend_login.txt -> rename jadi `login.php`
   - backend_register.txt -> rename jadi `register.php`
5. Upload file `api_callback_php.txt` ke ROOT folder (`public_html/callback.php`) -> Rename jadi `callback.php`.

TAHAP D: INTEGRASI
1. Login ke website Anda (admin/admin).
2. Masuk menu Settings -> Profile.
3. Ubah password default.
4. Masuk tab "Merchant Config".
5. Pilih Mode "Native" dan masukkan String QRIS dari Qiospay/Nobu.
6. Simpan.
7. Di Dashboard Qiospay, set Callback URL ke: `https://domain-anda.com/callback.php`

SELESAI.
