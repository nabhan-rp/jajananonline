================================================================================
PANDUAN INTEGRASI PLUGIN WOOCOMMERCE
================================================================================

Plugin ini memungkinkan toko online WordPress (WooCommerce) Anda menerima pembayaran QRIS yang diproses oleh engine QiosLink.

--------------------------------------------------------------------------------
LANGKAH 1: MEMBUAT PLUGIN
--------------------------------------------------------------------------------
1. Di komputer Anda, buat folder baru bernama: `woo-qioslink`
2. Di dalam folder itu, buat file bernama: `woo-qioslink.php`
3. Copy isi kode dari file `module_woocommerce.txt` ke dalam file php tersebut.
4. Compress/Zip folder `woo-qioslink` menjadi `woo-qioslink.zip`.

--------------------------------------------------------------------------------
LANGKAH 2: INSTALASI DI WORDPRESS
--------------------------------------------------------------------------------
1. Login ke wp-admin WordPress Anda.
2. Masuk menu Plugins -> Add New.
3. Klik "Upload Plugin".
4. Upload file `woo-qioslink.zip` yang baru dibuat.
5. Klik "Install Now" lalu "Activate Plugin".

--------------------------------------------------------------------------------
LANGKAH 3: SETTING
--------------------------------------------------------------------------------
1. Di wp-admin, masuk menu WooCommerce -> Settings.
2. Klik tab "Payments".
3. Cari "QiosLink QRIS" dan klik tombol "Manage" (atau setup).
4. Isi form:
   - Enable: Yes
   - Title: QRIS (Gopay/OVO/Dana/BCA)
   - API URL: `https://domain-qioslink-anda.com/create_payment.php`
     (Arahkan ke URL instalasi QiosLink Backend Anda)
   - Merchant ID: ID user Anda di database QiosLink.
5. Save changes.

--------------------------------------------------------------------------------
CARA KERJA (FORWARDING)
--------------------------------------------------------------------------------
Plugin ini otomatis mengirimkan parameter `callback_url` ke QiosLink saat checkout.
URL defaultnya adalah: `https://toko-anda.com/wc-api/wc_gateway_qioslink`

Saat QiosLink menerima pembayaran sukses dari Bank, dia akan menembak URL di atas.
WordPress akan menangkap tembakan tersebut dan mengubah status Order menjadi "Processing" atau "Completed".
