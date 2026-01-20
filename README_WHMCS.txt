
================================================================================
PANDUAN INTEGRASI MODUL WHMCS (MANUAL UPLOAD)
================================================================================

MASALAH UMUM: Modul tidak muncul di WHMCS.
PENYEBAB: Salah copy-paste (mengcopy teks instruksi ke dalam file PHP).

--------------------------------------------------------------------------------
INSTRUKSI YANG BENAR
--------------------------------------------------------------------------------
1. Download/Buka file `whmcs_gateway_clean_php.txt` yang baru disediakan.
2. File tersebut berisi kode PHP murni tanpa teks instruksi yang mengganggu.
3. Rename file tersebut menjadi `qioslink.php`.
4. Upload file tersebut ke direktori `/modules/gateways/` di hosting WHMCS Anda.

--------------------------------------------------------------------------------
STRUKTUR FOLDER DI CPANEL (WAJIB SEPERTI INI)
--------------------------------------------------------------------------------
/public_html
  └── modules
      └── gateways
          ├── qioslink.php           <-- File Gateway Utama (Dari whmcs_gateway_clean_php.txt)
          └── callback
              └── qioslink.php       <-- File Callback (Ambil kode dari module_whmcs.txt FILE 2)

--------------------------------------------------------------------------------
LANGKAH AKTIVASI
--------------------------------------------------------------------------------
1. Login Admin WHMCS.
2. System Settings -> Payment Gateways.
3. Klik tab "All Payment Gateways".
4. Cari "QiosLink QRIS (Nobu)".
5. Klik nama modul untuk mengaktifkan (warna jadi hijau).
6. Isi API URL: `https://domain-dashboard-anda.com/api/create_payment.php`
7. Isi Merchant ID & Secret Key.
8. Save Changes.
