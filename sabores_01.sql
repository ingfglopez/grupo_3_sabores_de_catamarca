-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.32-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para sabores
DROP DATABASE IF EXISTS `sabores`;
CREATE DATABASE IF NOT EXISTS `sabores` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `sabores`;

-- Volcando estructura para tabla sabores.categories
DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla sabores.categories: ~5 rows (aproximadamente)
DELETE FROM `categories`;
INSERT INTO `categories` (`id`, `name`) VALUES
	(1, 'Vestimenta'),
	(2, 'Bebidas'),
	(3, 'Comidas'),
	(4, 'Dulces'),
	(5, 'Artesanias');

-- Volcando estructura para tabla sabores.payment_methods
DROP TABLE IF EXISTS `payment_methods`;
CREATE TABLE IF NOT EXISTS `payment_methods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla sabores.payment_methods: ~0 rows (aproximadamente)
DELETE FROM `payment_methods`;

-- Volcando estructura para tabla sabores.persons
DROP TABLE IF EXISTS `persons`;
CREATE TABLE IF NOT EXISTS `persons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `image` varchar(200) DEFAULT NULL,
  `phonenumber` varchar(15) DEFAULT NULL,
  `address` varchar(150) DEFAULT NULL,
  `zipcode` varchar(10) DEFAULT NULL,
  `state_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_persons_states1_idx` (`state_id`),
  CONSTRAINT `fk_persons_states1` FOREIGN KEY (`state_id`) REFERENCES `states` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla sabores.persons: ~2 rows (aproximadamente)
DELETE FROM `persons`;
INSERT INTO `persons` (`id`, `name`, `email`, `image`, `phonenumber`, `address`, `zipcode`, `state_id`) VALUES
	(4, 'Jose Gomez', 'josegomez@gmail.com', 'image-1705517580125.png', '3835520577', NULL, NULL, 1),
	(5, 'Juan Antonio Perez', 'jperez@gmail.com', 'image-1705533471211.jpeg', '3835963623', NULL, NULL, 1);

-- Volcando estructura para tabla sabores.products
DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` mediumtext NOT NULL,
  `image` varchar(200) DEFAULT NULL,
  `category_id` int(11) NOT NULL,
  `stock` int(11) DEFAULT 0,
  `price` float DEFAULT 0,
  `last_price_change_date` date DEFAULT NULL,
  `weight` int(11) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `fk_products_categories_idx` (`category_id`),
  CONSTRAINT `fk_products_categories` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla sabores.products: ~2 rows (aproximadamente)
DELETE FROM `products`;
INSERT INTO `products` (`id`, `name`, `description`, `image`, `category_id`, `stock`, `price`, `last_price_change_date`, `weight`) VALUES
	(1, 'Vino Patero', 'Vino elaborado con uvas de la zona', NULL, 3, 10, 3000, NULL, 0),
	(3, 'Mate de Palo Santo', 'Mate de Palo Santo con insertos de plata', 'image-1707837263129.jpg', 5, 7, 7000, NULL, 270);

-- Volcando estructura para tabla sabores.roles
DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla sabores.roles: ~2 rows (aproximadamente)
DELETE FROM `roles`;
INSERT INTO `roles` (`id`, `name`) VALUES
	(1, 'admin'),
	(2, 'client');

-- Volcando estructura para tabla sabores.sales
DROP TABLE IF EXISTS `sales`;
CREATE TABLE IF NOT EXISTS `sales` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `user_id` int(11) NOT NULL,
  `state` tinyint(4) DEFAULT 1,
  `invoice_number` varchar(20) NOT NULL,
  `payment_method_id` int(11) DEFAULT NULL,
  `total` float DEFAULT NULL,
  `sales_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sales_payment_methods1_idx` (`payment_method_id`),
  KEY `fk_sales_users1_idx` (`user_id`),
  CONSTRAINT `fk_sales_payment_methods1` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_methods` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_sales_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla sabores.sales: ~0 rows (aproximadamente)
DELETE FROM `sales`;

-- Volcando estructura para tabla sabores.sale_detail
DROP TABLE IF EXISTS `sale_detail`;
CREATE TABLE IF NOT EXISTS `sale_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `sale_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sale_detail_products1_idx` (`product_id`),
  KEY `fk_sale_detail_sales1_idx` (`sale_id`),
  CONSTRAINT `fk_sale_detail_products1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_sale_detail_sales1` FOREIGN KEY (`sale_id`) REFERENCES `sales` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla sabores.sale_detail: ~0 rows (aproximadamente)
DELETE FROM `sale_detail`;

-- Volcando estructura para tabla sabores.states
DROP TABLE IF EXISTS `states`;
CREATE TABLE IF NOT EXISTS `states` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla sabores.states: ~2 rows (aproximadamente)
DELETE FROM `states`;
INSERT INTO `states` (`id`, `name`) VALUES
	(1, 'Catamarca'),
	(2, 'La Rioja');

-- Volcando estructura para tabla sabores.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(25) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `rol_id` int(11) NOT NULL,
  `person_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_users_roles1_idx` (`rol_id`),
  KEY `fk_users_persons1_idx` (`person_id`),
  CONSTRAINT `fk_users_persons1` FOREIGN KEY (`person_id`) REFERENCES `persons` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_users_roles1` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla sabores.users: ~2 rows (aproximadamente)
DELETE FROM `users`;
INSERT INTO `users` (`id`, `username`, `password`, `rol_id`, `person_id`) VALUES
	(1, 'admin', '$2a$10$JdPHvGIyIr6QbbY9cO6VEeQWKyh/MtXYLdkt1zD//drrrdzuUgpDq', 1, 4),
	(2, 'cliente', '$2a$10$mQAm318sqhE.nX3xeKjb4uRaaM1juGrcVffM21S0BIhNRAdHge2Jq', 2, 5);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
