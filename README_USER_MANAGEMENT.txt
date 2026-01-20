================================================================================
PANDUAN SISTEM USER MANAGEMENT & REGISTRASI (SaaS UPDATE)
================================================================================

Aplikasi QiosLink kini telah diupgrade menjadi platform Multi-Tenant (SaaS Style).
Artinya, sistem mendukung pendaftaran user publik dan manajemen hierarki bertingkat.

--------------------------------------------------------------------------------
A. SISTEM HIERARKI (RBAC - Role Based Access Control)
--------------------------------------------------------------------------------
Ada 4 tingkatan akses dalam sistem ini:

1. SUPERADMIN (Owner)
   - Akses penuh ke semua fitur.
   - Bisa membuat/mengedit Merchant, CS, dan User.
   - Bisa melihat konfigurasi sensitif semua merchant.

2. MERCHANT (Penjual/Mitra)
   - Memiliki konfigurasi QRIS sendiri.
   - Bisa membuat user 'CS' (Customer Service) untuk membantu operasional.
   - Bisa membuat user 'User' (Pelanggan) untuk klien mereka.
   - Tidak bisa mengedit Superadmin atau Merchant lain.

3. CS (Customer Service)
   - Dibuat oleh Merchant untuk membantu operasional.
   - Hanya bisa membuat 'User' (Pelanggan).
   - Tidak bisa mengedit Merchant atau sesama CS.

4. USER (Public/Pelanggan)
   - Role default saat seseorang mendaftar lewat halaman depan (Register).
   - Hanya bisa melihat history transaksi mereka sendiri.
   - Tidak bisa mengakses menu Terminal, Users, atau Settings.
   - Harus menghubungi Admin/Merchant untuk di-upgrade menjadi Merchant.

--------------------------------------------------------------------------------
B. REGISTRASI PUBLIK
--------------------------------------------------------------------------------
- Pengunjung yang belum login akan melihat LANDING PAGE.
- Tombol "Get Started" membuka form registrasi.
- User yang baru mendaftar otomatis mendapat role 'user'.
- Untuk menjadi merchant, user harus menghubungi admin (via WhatsApp link di dashboard) untuk diubah rolenya secara manual oleh Superadmin.

--------------------------------------------------------------------------------
C. CARA UPDATE DI PRODUCTION (PHP)
--------------------------------------------------------------------------------
Karena ada penambahan logika backend, Anda WAJIB mengupdate file PHP di hosting:

1. Gunakan file `backend_production_bundle.txt`.
2. Di dalamnya terdapat update untuk `manage_users.php` (logika hierarki) dan file baru `register.php`.
3. Upload/Update file-file tersebut ke folder `/api/` di hosting Anda.

