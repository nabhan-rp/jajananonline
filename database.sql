
-- DATABASE SCHEMA V1.1 (JAJANAN ONLINE SaaS)

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+07:00";

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) NOT NULL, -- Di production gunakan password_hash
  `role` enum('superadmin','merchant','cs','user') NOT NULL DEFAULT 'user',
  `merchant_config` text, -- JSON: { merchantName, qrisString, integrationMode, bridgeUrl... }
  `creator_id` int(11) DEFAULT 1,
  `is_verified` tinyint(1) DEFAULT 1,
  `verification_code` varchar(6) DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `price` decimal(15,2) NOT NULL,
  `type` enum('physical','digital_static','digital_license') NOT NULL,
  `image` text,
  `digital_content` text,
  `weight` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- 3. LICENSES TABLE
CREATE TABLE IF NOT EXISTS `product_licenses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `license_key` text NOT NULL,
  `status` enum('available','sold','locked') DEFAULT 'available',
  `order_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_status` (`product_id`,`status`)
);

-- 4. TRANSACTIONS TABLE (Core Engine)
CREATE TABLE IF NOT EXISTS `transactions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `trx_id` varchar(50) NOT NULL,
  `merchant_id` int(11) NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` enum('pending','paid','expired','cancelled') NOT NULL DEFAULT 'pending',
  `qr_string` text,
  `payment_token` varchar(64) DEFAULT NULL,
  `payment_url` text DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  `is_single_use` tinyint(1) DEFAULT 0,
  
  -- Columns for Gateway/Forwarding Feature
  `external_ref_id` varchar(100) DEFAULT NULL, -- ID Invoice dari WHMCS/Toko Lain
  `external_callback_url` text DEFAULT NULL,   -- URL untuk ditembak balik saat sukses
  
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `trx_id` (`trx_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. ORDERS TABLE (Storefront Logic)
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `trx_id` varchar(50) NOT NULL,
  `product_id` int(11) NOT NULL,
  `customer_name` varchar(100),
  `customer_email` varchar(100),
  `amount` decimal(15,2) NOT NULL,
  `status` enum('pending','paid','shipped','completed','cancelled') DEFAULT 'pending',
  `payment_token` varchar(64),
  `delivered_content` text,
  `shipping_address` text,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- 6. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS `reviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `rating` int(1) NOT NULL,
  `comment` text,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- DEFAULT DATA
-- User: admin / admin
INSERT INTO `users` (`username`, `email`, `password`, `role`, `merchant_config`) VALUES
('admin', 'admin@jajanan.online', 'admin', 'superadmin', '{"merchantName":"Jajanan Official","integrationMode":"native","merchantCode":"QP001","qrisString":""}');
COMMIT;
