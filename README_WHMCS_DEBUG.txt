
================================================================================
PANDUAN DEBUGGING WHMCS (JIKA MODUL TIDAK MUNCUL)
================================================================================

Jika modul "QiosLink QRIS" tidak muncul di daftar Payment Gateways, ikuti ini:

LANGKAH 1: COBA MODUL TEST
1. Download `qioslink_debug_php.txt`.
2. Rename jadi `qioslink_test.php`.
3. Upload ke `/modules/gateways/`.
4. Refresh halaman Admin WHMCS.
   - Apakah muncul "QiosLink DEBUG Mode"?
   - JIKA YA: Berarti masalah ada di kode `qioslink.php` yang lama (mungkin corrupt saat copy-paste).
   - JIKA TIDAK: Berarti masalah ada di folder hosting Anda. Cek permission folder harus 755 dan file 644.

LANGKAH 2: GUNAKAN KODE FINAL FIX
1. Jika langkah 1 berhasil, hapus file `qioslink.php` yang lama.
2. Download `qioslink_final_fix_php.txt`.
3. Rename jadi `qioslink.php`.
4. Upload ulang. Kode ini sudah disesuaikan agar kompatibel penuh dengan PHP 8.x.

LANGKAH 3: HAPUS FOLDER SAMPAH
Pastikan struktur folder Anda bersih:
/modules/gateways/qioslink.php        (FILE)
/modules/gateways/qioslink_test.php   (FILE - Hapus nanti jika sudah sukses)
/modules/gateways/qioslink/           (FOLDER - HAPUS folder ini jika ada! Ini sering bikin konflik)

