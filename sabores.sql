-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 27-03-2024 a las 23:26:11
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sabores`
--
DROP DATABASE IF EXISTS `sabores`;
CREATE DATABASE IF NOT EXISTS `sabores` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `sabores`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Vestimenta'),
(2, 'Bebidas'),
(3, 'Comidas'),
(4, 'Dulces'),
(5, 'Artesanias');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `payment_methods`
--

CREATE TABLE `payment_methods` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persons`
--

CREATE TABLE `persons` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `image` varchar(200) DEFAULT NULL,
  `phonenumber` varchar(15) DEFAULT NULL,
  `address` varchar(150) DEFAULT NULL,
  `zipcode` varchar(10) DEFAULT NULL,
  `state_id` int(11) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `persons`
--

INSERT INTO `persons` (`id`, `name`, `email`, `image`, `phonenumber`, `address`, `zipcode`, `state_id`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(4, 'Jose Gomez', 'moe@email.com', 'image-1705517580125.png', '3835520577', '', '4700', 1, NULL, NULL, NULL),
(5, 'Juan Antonio Perez', 'jperez@gmail.com', 'image-1705533471211.jpeg', '3835963623', NULL, NULL, 1, NULL, NULL, NULL),
(9, 'Margareth Simpson', 'maggie.cimpson@email.com', 'image-1711495673567.jpg', '123456', '', '', 1, NULL, NULL, '2024-03-27 19:50:13'),
(10, 'Juan Perez', 'juan@email.com', 'image-1711496187833.jpg', '78451245', '', '', 1, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` mediumtext NOT NULL,
  `image` varchar(200) DEFAULT NULL,
  `category_id` int(11) NOT NULL,
  `stock` int(11) DEFAULT 0,
  `price` float DEFAULT 0,
  `last_price_change_date` date DEFAULT NULL,
  `weight` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `image`, `category_id`, `stock`, `price`, `last_price_change_date`, `weight`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(3, 'Mate de Palo Santo', 'Mate de Palo Santo con insertos de plata', 'image-1707837263129.jpg', 4, 7, 7000, NULL, 190, '2024-03-17 23:47:36', '2024-03-17 23:47:36', '2024-03-18 17:08:19'),
(7, 'Queso de cabra de los Valles Calchaquíes', 'Delicioso queso de cabra artesanal, elaborado en los Valles Calchaquíes con métodos tradicionales. Su sabor único y suave textura lo convierten en un deleite para los amantes del queso.', 'image-1710729871259.png', 1, 50, 350, NULL, 3000, '2024-03-17 23:47:36', '2024-03-18 02:44:31', NULL),
(8, 'Dulce de cayote', 'El dulce de cayote es un producto típico del norte argentino, elaborado con cayotes frescos y azúcar. Su sabor dulce y suave lo convierten en un postre delicioso y tradicional.', 'https://ejemplo.com/dulce-de-cayote.jpg', 1, 30, 200, NULL, 0, '2024-03-17 23:47:36', NULL, NULL),
(9, 'Empanadas salteñas', 'Las empanadas salteñas son un clásico de la gastronomía del norte argentino. Rellenas de carne, papa, huevo y condimentos, son perfectas para disfrutar en cualquier momento del día.', 'https://ejemplo.com/empanadas-saltenas.jpg', 1, 100, 30, NULL, 0, '2024-03-17 23:47:36', NULL, NULL),
(10, 'Vino torrontés', 'El vino torrontés es una variedad emblemática de la región norteña argentina. Con su aroma floral y su sabor frutado, es ideal para acompañar comidas o disfrutar en una tarde soleada.', 'image-1711403349914.png', 2, 20, 111, NULL, 750, '2024-03-17 23:47:36', '2024-03-25 21:49:09', NULL),
(11, 'Mermelada de tuna', 'La mermelada de tuna es una delicia típica del norte argentino, elaborada con frutas frescas y azúcar. Su sabor agridulce y su textura suave la hacen irresistible.', 'https://ejemplo.com/mermelada-de-tuna.jpg', 1, 40, 150, NULL, 0, '2024-03-17 23:47:36', NULL, NULL),
(12, 'Dulce de leche regional', 'El dulce de leche regional es un producto emblemático del norte argentino, elaborado con leche de vaca y azúcar. Su sabor cremoso y dulce lo convierte en un favorito de todos.', 'https://ejemplo.com/dulce-de-leche-regional.jpg', 1, 60, 250, NULL, 0, '2024-03-17 23:47:36', NULL, NULL),
(13, '', 'Los alfajores de dulce de leche son un clásico de la repostería del norte argentino. Dos galletas suaves rellenas con abundante dulce de leche, ideales para disfrutar en cualquier ocasión.', 'https://ejemplo.com/alfajores-dulce-de-leche.jpg', 1, 80, 100, NULL, 1000, '2024-03-17 23:47:36', '2024-03-25 19:33:07', '2024-03-25 19:46:05'),
(14, 'Harina de maíz morado', 'La harina de maíz morado es un producto tradicional del norte argentino, obtenida de maíz morado cultivado en la región. Ideal para preparar platos típicos como la humita o la polenta.', 'https://ejemplo.com/harina-maiz-morado.jpg', 1, 25, 80, NULL, 0, '2024-03-17 23:47:36', NULL, NULL),
(15, 'Miel de caña', 'La miel de caña es un producto típico del norte argentino, obtenida del jugo de la caña de azúcar. Con su sabor dulce y su textura suave, es perfecta para endulzar cualquier postre.', 'https://ejemplo.com/miel-de-cana.jpg', 1, 35, 180, NULL, 0, '2024-03-17 23:47:36', NULL, NULL),
(16, 'Locro criollo', 'El locro criollo es un plato típico del norte argentino, elaborado con maíz, porotos, carne y verduras. Su sabor único y reconfortante lo convierte en un clásico de la cocina regional.', 'https://ejemplo.com/locro-criollo.jpg', 1, 15, 300, NULL, 0, '2024-03-17 23:47:36', NULL, NULL),
(17, 'Poncho de vicuña', 'It is a long established fact that a reader will be distracted by the readable. Many desktop publishing packages and web page editors now use Lorem Ipsum as ', 'image-1710977368857.png', 1, 0, 0, NULL, 0, '2024-03-20 23:29:28', '2024-03-20 23:29:28', NULL),
(18, 'Poncho de vicuña', 'It is a long established fact that a reader will be distracted by the readable. Many desktop publishing packages and web page editors now use Lorem Ipsum as ', 'image-1710977368857.png', 1, 0, 0, NULL, NULL, '2024-03-20 23:29:28', '2024-03-20 23:29:28', '2024-03-27 20:37:57'),
(19, 'Poncho de vicuña', 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.', 'image-1710984689064.png', 1, 0, 0, NULL, 0, '2024-03-21 01:31:29', '2024-03-21 01:31:29', '2024-03-27 20:37:54'),
(20, 'Producto de prueba', 'probando probandoprobando probandoprobando probandoprobando probandoprobando probandoprobando probandoprobando probandoprobando probandoprobando probandoprobando probandoprobando probando', 'image-1710985664629.png', 4, 0, 0, NULL, 0, '2024-03-21 01:47:44', '2024-03-21 01:47:44', NULL),
(21, 'Quesillo de Cabra', 'Este es el mejor queso de cabra que probe', 'image-1710986098168.png', 4, 10, 6000, NULL, 600, '2024-03-21 01:54:58', '2024-03-21 02:06:04', '2024-03-21 02:07:34'),
(22, 'Mate Imperial', 'Mate imperial calabaza y alpaca mediano. Incluye bombilla', 'image-1711052978646.png', 5, 0, 0, NULL, 0, '2024-03-21 20:29:38', '2024-03-21 20:29:38', NULL),
(23, 'Alfajor de dulce de leche', 'Los alfajores de dulce de leche son un clásico de la repostería del norte argentino. Dos galletas suaves rellenas con abundante dulce de leche, ideales para disfrutar en cualquier ocasión.', 'image-1711405918779.png', 3, 80, 400, NULL, 60, '2024-03-25 19:44:20', '2024-03-25 22:31:58', NULL),
(24, 'Mate Camionero edit', 'Mate camionero con virola de alpaca edit', 'image-1711401150650.png', 4, 160, 1600, NULL, 160, '2024-03-25 21:06:22', '2024-03-25 21:12:30', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'admin'),
(2, 'client');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sales`
--

CREATE TABLE `sales` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `user_id` int(11) NOT NULL,
  `state` tinyint(4) DEFAULT 1,
  `invoice_number` varchar(20) NOT NULL,
  `payment_method_id` int(11) DEFAULT NULL,
  `total` float DEFAULT NULL,
  `sales_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sale_detail`
--

CREATE TABLE `sale_detail` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `sale_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `states`
--

CREATE TABLE `states` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `states`
--

INSERT INTO `states` (`id`, `name`) VALUES
(1, 'Catamarca'),
(2, 'La Rioja');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(25) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `rol_id` int(11) NOT NULL,
  `person_id` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `rol_id`, `person_id`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'admin', '$2a$10$JdPHvGIyIr6QbbY9cO6VEeQWKyh/MtXYLdkt1zD//drrrdzuUgpDq', 1, 4, NULL, NULL, NULL),
(2, 'cliente', '$2a$10$mQAm318sqhE.nX3xeKjb4uRaaM1juGrcVffM21S0BIhNRAdHge2Jq', 2, 5, NULL, NULL, NULL),
(5, 'maggie', '$2a$10$xscjiI9M9qojQNADOhybc.mihQPskkTaK6pYyGSP/.dB/AevknlZq', 1, 9, '2024-03-26 23:27:53', '2024-03-26 23:27:53', '2024-03-27 19:50:13'),
(6, 'jperez', '$2a$10$xscjiI9M9qojQNADOhybc.mihQPskkTaK6pYyGSP/.dB/AevknlZq', 1, 10, '2024-03-26 23:36:27', '2024-03-26 23:36:27', '2024-03-27 14:37:26');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `payment_methods`
--
ALTER TABLE `payment_methods`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `persons`
--
ALTER TABLE `persons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `persons_states_FK` (`state_id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_products_categories_idx` (`category_id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sales_payment_methods_FK` (`payment_method_id`),
  ADD KEY `sales_users_FK` (`user_id`);

--
-- Indices de la tabla `sale_detail`
--
ALTER TABLE `sale_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_sale_detail_products1_idx` (`product_id`),
  ADD KEY `fk_sale_detail_sales1_idx` (`sale_id`);

--
-- Indices de la tabla `states`
--
ALTER TABLE `states`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_users_roles1_idx` (`rol_id`),
  ADD KEY `fk_users_persons1_idx` (`person_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `payment_methods`
--
ALTER TABLE `payment_methods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `persons`
--
ALTER TABLE `persons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `sale_detail`
--
ALTER TABLE `sale_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `states`
--
ALTER TABLE `states`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `persons`
--
ALTER TABLE `persons`
  ADD CONSTRAINT `persons_states_FK` FOREIGN KEY (`state_id`) REFERENCES `states` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_products_categories` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `sales`
--
ALTER TABLE `sales`
  ADD CONSTRAINT `sales_payment_methods_FK` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_methods` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `sales_users_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `sale_detail`
--
ALTER TABLE `sale_detail`
  ADD CONSTRAINT `fk_sale_detail_products1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_sale_detail_sales1` FOREIGN KEY (`sale_id`) REFERENCES `sales` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_users_persons1` FOREIGN KEY (`person_id`) REFERENCES `persons` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_users_roles1` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
