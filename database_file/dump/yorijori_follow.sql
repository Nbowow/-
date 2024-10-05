-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: yorijori
-- ------------------------------------------------------
-- Server version	8.0.38

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `follow`
--
INSERT INTO `follow` (`follow_id`, `follower_status`, `following_status`, `follower_id`, `following_id`) 
VALUES 
(1, TRUE, TRUE, 1, 2),  -- johnny follows janey
(2, TRUE, TRUE, 2, 3),  -- janey follows alice
(3, TRUE, TRUE, 3, 1),  -- alice follows johnny
(4, TRUE, TRUE, 4, 5),  -- bobby follows charlie
(5, TRUE, TRUE, 5, 1),  -- charlie follows johnny
(6, TRUE, TRUE, 6, 7),   -- emma follows mjordan
(7, TRUE, TRUE, 7, 8),   -- mjordan follows sarah
(8, TRUE, TRUE, 8, 9),   -- sarah follows david
(9, TRUE, TRUE, 9, 10),  -- david follows lisa
(10, TRUE, TRUE, 10, 11),-- lisa follows anna
(11, TRUE, TRUE, 11, 12),-- anna follows jack
(12, TRUE, TRUE, 12, 13),-- jack follows nina
(13, TRUE, TRUE, 13, 14),-- nina follows chris
(14, TRUE, TRUE, 14, 15),-- chris follows megan
(15, TRUE, TRUE, 15, 6), -- megan follows emma
(16, TRUE, TRUE, 1, 5),  -- johnny follows charlie
(17, TRUE, TRUE, 2, 4),  -- janey follows bobby
(18, TRUE, TRUE, 3, 6),  -- alice follows emma
(19, TRUE, TRUE, 5, 7),  -- charlie follows mjordan
(20, TRUE, TRUE, 4, 8),  -- bobby follows sarah
(21, TRUE, TRUE, 7, 9),  -- mjordan follows david
(22, TRUE, TRUE, 8, 11), -- sarah follows anna
(23, TRUE, TRUE, 9, 12), -- david follows jack
(24, TRUE, TRUE, 10, 13),-- lisa follows nina
(25, TRUE, TRUE, 12, 14),-- jack follows chris
(26, TRUE, TRUE, 13, 15),-- nina follows megan
(27, TRUE, TRUE, 6, 3),  -- emma follows alice
(28, TRUE, TRUE, 15, 2), -- megan follows janey
(29, TRUE, TRUE, 14, 1), -- chris follows johnny
(30, TRUE, TRUE, 11, 9); -- anna follows david
