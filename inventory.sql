-- Adminer 4.8.1 MySQL 10.9.2-MariaDB-log dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `items`;
CREATE TABLE `items` (
  `item` varchar(50) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_type` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=Aria DEFAULT CHARSET=utf8mb4 PAGE_CHECKSUM=1;

INSERT INTO `items` (`item`, `id`, `item_type`) VALUES
('Pen',	1,	1),
('Printer',	2,	2),
('Marker',	3,	1),
('Scanner',	4,	2),
('Clear Tape',	5,	1),
('Standing Table',	6,	2),
('Shredder',	7,	2),
('Thumbtack',	8,	1),
('Paper Clip',	9,	1),
(' A4 Sheet',	10,	1),
(' Notebook',	11,	1),
('Chair',	12,	3),
('Stool',	13,	3);

DROP TABLE IF EXISTS `item_type`;
CREATE TABLE `item_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=Aria DEFAULT CHARSET=utf8mb4 PAGE_CHECKSUM=1;

INSERT INTO `item_type` (`id`, `type`) VALUES
(1,	'Office Supply'),
(2,	'Equipment'),
(3,	'Furniture');

DROP TABLE IF EXISTS `requests`;
CREATE TABLE `requests` (
  `req_id` int(11) NOT NULL AUTO_INCREMENT,
  `requested_by` varchar(50) NOT NULL,
  `requested_on` date DEFAULT NULL,
  `items` varchar(50) NOT NULL,
  PRIMARY KEY (`req_id`)
) ENGINE=Aria DEFAULT CHARSET=utf8mb4 PAGE_CHECKSUM=1;


DROP TABLE IF EXISTS `summary`;
CREATE TABLE `summary` (
  `req_id` int(11) NOT NULL AUTO_INCREMENT,
  `requested_by` varchar(200) DEFAULT NULL,
  `items` longtext DEFAULT NULL,
  PRIMARY KEY (`req_id`)
) ENGINE=Aria DEFAULT CHARSET=utf8mb4 PAGE_CHECKSUM=1;


DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=Aria DEFAULT CHARSET=utf8mb4 PAGE_CHECKSUM=1;

INSERT INTO `users` (`id`, `user`) VALUES
(1,	'Maya'),
(2,	'Kie'),
(3,	'Ron'),
(4,	'John'),
(5,	'Smith'),
(6,	'Lily');

-- 2024-01-24 20:26:47
