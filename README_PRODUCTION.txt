================================================================================
PANDUAN MIGRASI KE PRODUCTION (LIVE SERVER) - VERSI 3.0
================================================================================

Aplikasi telah diupdate dengan fitur Registrasi Publik dan User Management.
Anda wajib mengupdate file PHP di server Anda agar fitur ini berjalan.

--------------------------------------------------------------------------------
LANGKAH 1: PERSIAPAN DATABASE (cPanel)
--------------------------------------------------------------------------------
1. Login cPanel -> MySQL Databases.
2. Buat Database baru (misal: `u123_qioslink`).
3. Buat User Database baru (misal: `u123_admin`, pass: `rahasia`).
4. Add User To Database -> Centang "All Privileges".
5. Buka phpMyAdmin -> Pilih database tadi.
6. Klik menu "Import" -> Upload file `database.sql` (atau `file_sql.txt`) yang ada di project ini.

--------------------------------------------------------------------------------
LANGKAH 2: PERSIAPAN BACKEND (PHP)
--------------------------------------------------------------------------------
1. Buka file `backend_production_bundle.txt`.
2. Ambil kode `db_connect.php`, edit $host, $user, $pass, $dbname sesuai Langkah 1.
3. Ambil kode file PHP lainnya (register.php, manage_users.php, dll).
4. Upload SEMUA file PHP tersebut ke folder `public_html/api/` di Hosting Anda.

--------------------------------------------------------------------------------
LANGKAH 3: UPDATE FRONTEND (REACT)
--------------------------------------------------------------------------------
1. Di terminal local: `npm run build`.
2. Akan muncul folder `dist`.
3. Upload SEMUA isi folder `dist` (index.html, assets, dll) ke `public_html` hosting Anda.

--------------------------------------------------------------------------------
STRUKTUR FILE DI HOSTING (PUBLIC_HTML) HARUS SEPERTI INI:
--------------------------------------------------------------------------------
/public_html
  ├── index.html          (Dari folder dist)
  ├── assets/             (Dari folder dist)
  ├── api/                (Folder API PHP)
      ├── db_connect.php
      ├── register.php
      ├── login.php
      ├── manage_users.php
      ├── create_payment.php
      ├── get_data.php
      ├── update_config.php
      └── qris_utils.php
  ├── callback.php        (Untuk Webhook Qiospay, taruh di root public_html)
