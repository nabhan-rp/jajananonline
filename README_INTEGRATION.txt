PANDUAN INTEGRASI UTAMA (CORE SERVER)
=====================================

File ini menjelaskan cara setup SERVER UTAMA QiosLink. 
Jika Anda ingin mengintegrasikan ke WHMCS atau WooCommerce, baca file terpisah:
- Lihat: README_WHMCS.txt (Untuk WHMCS)
- Lihat: README_WOO.txt (Untuk WordPress/WooCommerce)
- Lihat: README_SHOPIFY.txt (Untuk Shopify - Teknik Relay)
- Lihat: README_SYSTEM_FLOW.txt (PENTING: Baca ini untuk paham logika kerjanya)

1. SETUP SERVER UTAMA (QiosLink Core)
   ----------------------------------
   A. Upload File Frontend (React)
      - Build project (`npm run build`) -> Upload folder `dist` ke `public_html`.
   
   B. Upload File Backend (PHP)
      - Download kode dari `backend_php.txt`.
      - Buat database MySQL di cPanel.
      - Edit `db_connect.php` sesuai user/pass database.
      - Upload `create_payment.php` dan `callback.php` ke `public_html`.

   C. Koneksi ke Qiospay
      - Login qiospay.id -> Integrasi.
      - URL Callback: `https://domain-anda.com/callback.php`
      - Ini adalah "Gerbang Utama" masuknya uang.

--------------------------------------------------------------------------------
F.A.Q (PERTANYAAN UMUM)
--------------------------------------------------------------------------------

Q: Apa bedanya Server QiosLink dengan Modul WHMCS?
A: 
   - Server QiosLink (Web ini) adalah PUSAT pengolah data & QRIS.
   - Modul WHMCS adalah CLIENT yang merequest QRIS ke Server QiosLink.
   
Q: Saya punya WHMCS dan WooCommerce, apakah bisa pakai 1 QiosLink?
A: SANGAT BISA. Itulah fungsi fitur "Forwarding". QiosLink akan menjadi pusat gateway
   untuk banyak website Anda sekaligus.

Q: Dimana saya dapat kode Modul WHMCS?
A: Ada di file `module_whmcs.txt`. Baca `README_WHMCS.txt` cara pasangnya.

Q: Apakah saya perlu modul CPulsa/OtomaX?
A: TIDAK. Anda sedang membangun sistem sendiri (QiosLink) yang menggantikan fungsi modul tersebut.
