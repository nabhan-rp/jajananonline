
================================================================================
LANGKAH AKTIVASI FINAL (WHMCS 8.x)
================================================================================

1. HAPUS FILE LAMA:
   Hapus `/modules/gateways/qioslink.php`
   Hapus `/modules/gateways/cek_syntax.php` (PENTING! Ini penyebab error)

2. UPLOAD FILE BARU:
   Upload kode `qiosgateway.php` (dari chat ini) ke `/modules/gateways/`.

3. CARI DI WHMCS (JELAJAHI TAB):
   - Buka: Setup > Payments > Payment Gateways
   - ATAU: Configuration > System Settings > Payment Gateways
   
   PERHATIKAN LAYAR BAGIAN ATAS:
   Biasanya ada 2 Tab di bawah judul "Payment Gateways":
   [ Manage Existing Gateways ]   [ All Payment Gateways ]
   
   Anda harus klik tab **"All Payment Gateways"** untuk melihat modul baru yang belum aktif.
   
   Jika Tab tidak terlihat (karena CSS WHMCS), coba cari di halaman tersebut (Ctrl+F) kata "QiosLink".
   
   Jika tetap tidak muncul, klik tombol/link "Visit Apps & Integrations" mungkin Anda diarahkan ke tampilan Marketplace, TAPI modul custom biasanya muncul di list paling bawah atau di tab "All".

4. AKTIVASI:
   Klik nama "QiosLink QRIS (Nobu)".
   Centang "Show on Order Form".
   Isi Merchant ID dan Secret Key.
   Save Changes.
