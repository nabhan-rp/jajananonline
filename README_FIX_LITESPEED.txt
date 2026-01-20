
================================================================================
SOLUSI KHUSUS cPANEL / LITESPEED (WHMCS 8.13)
================================================================================

Jika modul masih tidak muncul, masalahnya 99% bukan di kodenya, tapi di Server Environment.

LANGKAH 1: UPLOAD & RENAME
1. Hapus file `qioslink.php` yang lama di `/modules/gateways/`.
2. Upload file `qioslink_basic_clone_php.txt`.
3. Rename menjadi `qioslink.php`. (Pastikan huruf kecil semua).

LANGKAH 2: JALANKAN DIAGNOSTIK (WAJIB)
1. Upload file `debug_gateway_php.txt` ke `/modules/gateways/`.
2. Rename menjadi `cek_syntax.php`.
3. Buka browser, akses: `https://domain-whmcs-anda.com/modules/gateways/cek_syntax.php`

LIHAT HASILNYA:
- Jika layar putih/blank: Berarti ada error PHP parah (matikan display_errors di php.ini cPanel).
- Jika ada tulisan "No syntax errors detected": Berarti kode aman.
- Jika ada tulisan "Function not found": Berarti nama fungsi salah.

LANGKAH 3: FLUSH CACHE (SANGAT PENTING DI LITESPEED)
Di cPanel LiteSpeed, perubahan file PHP kadang tidak langsung terbaca.
1. Login cPanel.
2. Cari menu "LiteSpeed Web Cache Manager" (jika ada).
3. Klik "Flush All".
4. Login Admin WHMCS -> Utilities -> System -> System Cleanup -> Go.

LANGKAH 4: PASTIKAN PHP EXTENSION
Pastikan PHP yang dipakai WHMCS memiliki ekstensi:
- json
- curl
- soap (kadang dibutuhkan whmcs)

Jika `cek_syntax.php` sukses semua (Centang Hijau) tapi di WHMCS tetap tidak muncul:
Masalahnya ada di WHMCS Gateway Cache internal.
Hapus file di folder `/templates_c/` (kecuali index.php) lewat File Manager.
