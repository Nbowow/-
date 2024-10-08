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
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_email`, `user_nickname`, `user_image`, `user_summary`, `user_name`, `user_score`, `user_social_id`, `user_social_type`, `user_password`, `user_refresh_token`, `user_role`, `user_status`, `created_date`, `modified_date`) 
VALUES 
(2, 'jane.smith@example.com', 'janey', 'profile2.jpg', 'Loves baking', 'Jane Smith', 150, NULL, NULL, 'password456', NULL, 'USER', TRUE, NOW(), NOW()),
(3, 'alice.jones@example.com', 'alice', 'profile3.jpg', 'Recipe creator', 'Alice Jones', 200, NULL, NULL, 'password789', NULL, 'USER', TRUE, NOW(), NOW()),
(4, 'bob.brown@example.com', 'bobby', 'profile4.jpg', 'Food critic', 'Bob Brown', 80, NULL, NULL, 'password101', NULL, 'USER', TRUE, NOW(), NOW()),
(5, 'charlie.white@example.com', 'charlie', 'profile5.jpg', 'Vegan recipes lover', 'Charlie White', 120, NULL, NULL, 'password202', NULL, 'USER', TRUE, NOW(), NOW()),
(6, 'emma.davis@example.com', 'emma', 'profile6.jpg', 'Loves vegetarian recipes', 'Emma Davis', 180, NULL, NULL, 'password303', NULL, 'USER', TRUE, NOW(), NOW()),
(7, 'michael.jordan@example.com', 'mjordan', 'profile7.jpg', 'Grill master', 'Michael Jordan', 250, NULL, NULL, 'password404', NULL, 'USER', TRUE, NOW(), NOW()),
(8, 'sarah.connor@example.com', 'sarah', 'profile8.jpg', 'Food blogger', 'Sarah Connor', 210, NULL, NULL, 'password505', NULL, 'USER', TRUE, NOW(), NOW()),
(9, 'david.bowie@example.com', 'david', 'profile9.jpg', 'Professional chef', 'David Bowie', 300, NULL, NULL, 'password606', NULL, 'USER', TRUE, NOW(), NOW()),
(10, 'lisa.simpson@example.com', 'lisa', 'profile10.jpg', 'Vegan chef', 'Lisa Simpson', 220, NULL, NULL, 'password707', NULL, 'USER', TRUE, NOW(), NOW()),
(11, 'anna.johnson@example.com', 'anna', 'profile11.jpg', 'Healthy meals advocate', 'Anna Johnson', 140, NULL, NULL, 'password808', NULL, 'USER', TRUE, NOW(), NOW()),
(12, 'jack.smith@example.com', 'jack', 'profile12.jpg', 'Loves Italian food', 'Jack Smith', 170, NULL, NULL, 'password909', NULL, 'USER', TRUE, NOW(), NOW()),
(13, 'nina.williams@example.com', 'nina', 'profile13.jpg', 'Pasta lover', 'Nina Williams', 130, NULL, NULL, 'password1010', NULL, 'USER', TRUE, NOW(), NOW()),
(14, 'chris.evans@example.com', 'chris', 'profile14.jpg', 'BBQ expert', 'Chris Evans', 240, NULL, NULL, 'password1111', NULL, 'USER', TRUE, NOW(), NOW()),
(15, 'megan.fox@example.com', 'megan', 'profile15.jpg', 'Food photographer', 'Megan Fox', 160, NULL, NULL, 'password1212', NULL, 'USER', TRUE, NOW(), NOW());
