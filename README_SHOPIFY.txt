================================================================================
PANDUAN INTEGRASI SHOPIFY (MANUAL PAYMENT METHOD)
================================================================================

Karena Shopify adalah platform tertutup, kita tidak bisa menginstall plugin sembarangan.
Cara paling aman dan gratis untuk integrasi QRIS adalah menggunakan metode "Manual Payment" + "API Bridge".

--------------------------------------------------------------------------------
LANGKAH 1: SETUP API BRIDGE DI SERVER ANDA
--------------------------------------------------------------------------------
1. Download kode dari `module_shopify.txt`.
2. Edit bagian `$shop_url` dan `$access_token` (Lihat cara dapat token di bawah).
3. Simpan sebagai `shopify_relay.php`.
4. Upload ke hosting Anda (satu folder dengan `callback.php`).
   URL Bridge Anda sekarang: `https://domain-anda.com/shopify_relay.php`

--------------------------------------------------------------------------------
LANGKAH 2: DAPATKAN ACCESS TOKEN SHOPIFY
--------------------------------------------------------------------------------
1. Login ke Admin Shopify -> Settings -> Apps and sales channels.
2. Klik "Develop apps" -> "Create an app".
3. Beri nama "QiosLink Integration".
4. Klik "Configure Admin API scopes".
5. Centang: `write_orders` dan `read_orders`.
6. Klik Save -> Install App.
7. Copy "Admin API access token" (dimulai dengan `shpat_...`) dan paste ke script PHP langkah 1.

--------------------------------------------------------------------------------
LANGKAH 3: SETUP PEMBAYARAN DI SHOPIFY
--------------------------------------------------------------------------------
1. Di Admin Shopify, ke Settings -> Payments.
2. Scroll ke bagian "Manual payment methods".
3. Klik "Create custom payment method".
4. Nama: "QRIS (Nobu/Gopay/OVO/Dana)".
5. Additional Details (Akan muncul saat checkout):
   "Silakan lakukan pembayaran melalui link yang akan muncul di halaman Terima Kasih / Email."
6. Payment Instructions (Muncul setelah order):
   "Terima kasih. Untuk menyelesaikan pembayaran, klik link di bawah ini:
   
   https://domain-anda.com/pay?amount={{total_price}}&note=Order-{{name}}
   
   (Ganti domain-anda.com dengan domain QiosLink Anda)"
   
--------------------------------------------------------------------------------
LANGKAH 4: MENGHUBUNGKAN SEMUANYA
--------------------------------------------------------------------------------
Saat user klik link di Langkah 3, mereka akan diarahkan ke halaman pembayaran QiosLink.
Agar QiosLink tahu harus lapor ke Shopify Bridge:

Anda harus mengedit kode Frontend React (`App.tsx`) sedikit bagian `generatePaymentLink` 
untuk menyertakan parameter `callback_url` yang mengarah ke `shopify_relay.php`.

ATAU cara manual:
Setiap order masuk di Shopify, Anda generate QR Manual di Dashboard QiosLink, 
lalu masukkan ID Order Shopify sebagai "External ID" saat generate.
