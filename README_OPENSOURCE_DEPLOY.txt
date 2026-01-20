
================================================================================
QIOSLINK - SELF HOSTED DEPLOYMENT GUIDE
================================================================================

QiosLink is a Dynamic QRIS Engine designed for Nobu/Qiospay integration.
This is a self-hosted solution (White Label), meaning you have full control over the data and server.

Requirements:
- Web Hosting (cPanel/DirectAdmin/CyberPanel)
- PHP 7.4 or 8.x
- MySQL / MariaDB
- Node.js (Only for building the frontend locally)

--------------------------------------------------------------------------------
STEP 1: FRONTEND BUILD (Local Machine)
--------------------------------------------------------------------------------
Before uploading to hosting, you must compile the React code.

1. Install Node.js (https://nodejs.org).
2. Open terminal in the project folder.
3. Run `npm install` to download dependencies.
4. Open the file `.env.production` (rename `dot_env_production.txt` if needed).
   Ensure the content is:
   VITE_USE_DEMO_DATA=false
   VITE_API_BASE_URL=./api
5. Run `npm run build`.
6. A folder named `dist` will be created. This contains your website files.

--------------------------------------------------------------------------------
STEP 2: HOSTING PREPARATION
--------------------------------------------------------------------------------
1. Login to your Hosting Control Panel.
2. Create a MySQL Database (e.g., `qioslink_db`).
3. Create a Database User and assign it to the database with All Privileges.
4. Open phpMyAdmin, select your database, and Import the `file_sql.txt` (rename to database.sql first).

--------------------------------------------------------------------------------
STEP 3: UPLOAD FILES
--------------------------------------------------------------------------------
1. Go to File Manager -> `public_html` (or your subdomain folder).
2. Upload ALL files from the `dist` folder (Step 1) here.
   (You should see index.html and an assets folder).
3. Create a new folder named `api`.
4. Inside the `api` folder, you need to create PHP files for the backend logic.
   
   REFER TO: `backend_universal_bundle.txt`
   
   Create these files inside `/api/`:
   - `db_connect.php`  (Edit this file: Enter your DB Name, User, and Password)
   - `simple_smtp.php` (Copy code from Bundle)
   - `register.php`    (Copy code from Bundle)
   - `login.php`       (Copy code from backend_api_folder.txt)
   - `create_payment.php`
   - `manage_users.php`
   - ... and other PHP files provided in the documentation.

   IMPORTANT: 
   Also create a `callback.php` file in the ROOT folder (outside api folder, same level as index.html).
   This is for Qiospay Webhook.

--------------------------------------------------------------------------------
STEP 4: CONFIGURATION
--------------------------------------------------------------------------------
1. Open your website in a browser.
2. Login with default Superadmin:
   User: admin
   Pass: admin
3. Go to Settings & Profile -> Merchant Config.
4. Enter your Qiospay/Nobu credentials.
5. Go to Settings & Profile -> SMTP (Optional).
   Configure your email server to enable OTP features.

--------------------------------------------------------------------------------
STEP 5: INTEGRATION
--------------------------------------------------------------------------------
To connect QiosLink with Qiospay:
1. Login to Qiospay Dashboard.
2. Go to Integration Menu.
3. Set Callback URL to: `https://your-domain.com/callback.php`

Done! You now have your own Payment Gateway.
