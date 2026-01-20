
================================================================================
SOLUSI MODUL TIDAK MUNCUL (WHMCS 8.x)
================================================================================

Jika modul tidak muncul, penyebab utamanya adalah "Byte Order Mark" (BOM) atau Permission.

LANGKAH 1: PERBAIKI PERMISSION FILE
1. Buka File Manager cPanel.
2. Masuk ke `/modules/gateways/`.
3. Klik kanan pada file `qioslink.php` -> Pilih "Permissions".
4. Pastikan angkanya **644** (User: Read/Write, Group: Read, World: Read).
5. Cek folder `/modules/gateways/` itu sendiri, permission harus **755**.

LANGKAH 2: HINDARI COPY-PASTE DARI WINDOWS
Windows sering menambahkan karakter tersembunyi. Lakukan ini:
1. Hapus file `qioslink.php` yang lama.
2. Di cPanel, buat file baru: `qioslink.php`.
3. Edit file tersebut menggunakan Editor cPanel.
4. Copy kode dari `whmcs_minimal_v8_php.txt`.
5. Simpan.

LANGKAH 3: BERSIHKAN CACHE WHMCS
Terkadang WHMCS mengingat daftar modul yang lama.
1. Login Admin WHMCS.
2. Ke menu: Utilities > System > System Cleanup.
3. Klik "Empty Template Cache".
4. Kembali ke System Settings > Payment Gateways.

LANGKAH 4: JIKA SUDAH MUNCUL
Jika modul "QiosLink QRIS (Nobu)" sudah muncul dengan langkah di atas:
1. Aktifkan (Klik modulnya).
2. Save Changes.
3. Baru setelah itu, edit kembali file `qioslink.php` di cPanel.
4. Ganti isinya dengan kode lengkap dari `qioslink_final_fix_php.txt` (yang ada di chat sebelumnya).
5. Save.

PENTING:
Pastikan file berada di:
/public_html/whmcs/modules/gateways/qioslink.php

BUKAN DI:
/public_html/whmcs/modules/gateways/qioslink/qioslink.php (SALAH FOLDER)
