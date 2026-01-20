
-- DATABASE SCHEMA V1.0 (JAJANAN ONLINE)

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('superadmin','merchant','cs','user') NOT NULL DEFAULT 'user',
  `merchant_config` text,
  `creator_id` int(11) DEFAULT 1,
  `is_verified` tinyint(1) DEFAULT 1,
  `verification_code` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
);

CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `price` decimal(15,2) NOT NULL,
  `type` enum('physical','digital_static','digital_license') NOT NULL,
  `image` text,
  `digital_content` text, -- For Static Link
  `weight` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `product_licenses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `license_key` text NOT NULL,
  `status` enum('available','sold','locked') DEFAULT 'available',
  `order_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_status` (`product_id`,`status`)
);

CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `trx_id` varchar(50) NOT NULL, -- Links to Transaction Table
  `product_id` int(11) NOT NULL,
  `customer_name` varchar(100),
  `customer_email` varchar(100),
  `amount` decimal(15,2) NOT NULL,
  `status` enum('pending','paid','shipped','completed','cancelled') DEFAULT 'pending',
  `payment_token` varchar(64),
  `delivered_content` text, -- Stores the key/link after payment
  `shipping_address` text,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

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
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `trx_id` (`trx_id`)
);

INSERT INTO `users` (`username`, `email`, `password`, `role`, `merchant_config`) VALUES
('admin', 'admin@jajanan.online', 'admin', 'superadmin', '{"merchantName":"Jajanan Official","merchantCode":"QP040887","qrisString":"00020101021126670016COM.NOBUBANK.WWW01189360050300000907180214905487390387780303UMI51440014ID.CO.QRIS.WWW0215ID20254619920700303UMI5204581753033605802ID5914Narpra Digital6009INDRAMAYU61054521162070703A016304D424"}');
