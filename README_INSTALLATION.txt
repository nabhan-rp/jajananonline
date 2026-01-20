
================================================================================
JAJANAN ONLINE - INSTALLATION GUIDE (v1.0)
================================================================================

Platform Marketplace & Produk Digital dengan QRIS Otomatis.

SYSTEM REQUIREMENTS:
- PHP 7.4 or 8.x
- MySQL / MariaDB
- cPanel / Hosting (Shared ok)

--------------------------------------------------------------------------------
1. DATABASE SETUP
--------------------------------------------------------------------------------
1. Buat Database baru di cPanel.
2. Import file `database.sql` (yang disediakan di dalam bundle ini).
3. Ini akan membuat tabel: users, products, product_licenses, orders, reviews, transactions.

--------------------------------------------------------------------------------
2. BACKEND SETUP (PHP)
--------------------------------------------------------------------------------
1. Buat folder `api` di `public_html`.
2. Upload semua file .php yang berawalan `api_` (rename hilangkan prefixnya) ke folder `/api`.
   Contoh: `api_manage_store_php.txt` -> `/api/manage_store.php`.
   File wajib:
   - db_connect.php (Edit password database disini!)
   - manage_store.php
   - process_order.php
   - manage_reviews.php
   - login.php
   - register.php
   - qris_utils.php
3. Upload `backend_callback.txt` sebagai `callback.php` di folder root (`public_html/callback.php`).

--------------------------------------------------------------------------------
3. FRONTEND SETUP (React)
--------------------------------------------------------------------------------
1. Di komputer lokal: `npm install` lalu `npm run build`.
2. Upload isi folder `dist` ke `public_html`.

--------------------------------------------------------------------------------
4. INTEGRASI QRIS (QIOSLINK ENGINE)
--------------------------------------------------------------------------------
1. Login sebagai Admin (user: admin, pass: admin).
2. Masuk menu Pengaturan.
3. Masukkan String QRIS Nobu/Qiospay Anda.
4. Di Dashboard Qiospay, set Callback URL ke: `https://jajanan.online/callback.php`

SELESAI.
