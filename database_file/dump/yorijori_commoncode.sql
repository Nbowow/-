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
-- Dumping data for table `commoncode`
--

INSERT INTO `commoncode` (`common_code_id`, `common_code_type`, `common_code_num`, `common_code_name`)
VALUES
-- 알러지 목록 (A)
(1, 'A', 'A_0001', '알류'),
(2, 'A', 'A_0002', '우유'),
(3, 'A', 'A_0003', '메밀'),
(4, 'A', 'A_0004', '땅콩'),
(5, 'A', 'A_0005', '대두'),
(6, 'A', 'A_0006', '밀'),
(7, 'A', 'A_0007', '잣'),
(8, 'A', 'A_0008', '호두'),
(9, 'A', 'A_0009', '게'),
(10, 'A', 'A_0010', '새우'),
(11, 'A', 'A_0011', '오징어'),
(12, 'A', 'A_0012', '고등어'),
(13, 'A', 'A_0013', '조개류'),
(14, 'A', 'A_0014', '복숭아'),
(15, 'A', 'A_0015', '토마토'),
(16, 'A', 'A_0016', '닭고기'),
(17, 'A', 'A_0017', '돼지고기'),
(18, 'A', 'A_0018', '쇠고기'),
(19, 'A', 'A_0019', '아황산류'),

-- 종류별 (B)
(20, 'B', 'B_0001', '전체'),
(21, 'B', 'B_0002', '밑반찬'),
(22, 'B', 'B_0003', '메인반찬'),
(23, 'B', 'B_0004', '국/탕'),
(24, 'B', 'B_0005', '찌개'),
(25, 'B', 'B_0006', '디저트'),
(26, 'B', 'B_0007', '면/만두'),
(27, 'B', 'B_0008', '밥/죽/떡'),
(28, 'B', 'B_0009', '퓨전'),
(29, 'B', 'B_0010', '김치/젓갈/장류'),
(30, 'B', 'B_0011', '양념/소스/잼'),
(31, 'B', 'B_0012', '양식'),
(32, 'B', 'B_0013', '샐러드'),
(33, 'B', 'B_0014', '스프'),
(34, 'B', 'B_0015', '빵'),
(35, 'B', 'B_0016', '과자'),
(36, 'B', 'B_0017', '차/음료/술'),
(37, 'B', 'B_0018', '기타'),

-- 상황별 (C)
(38, 'C', 'C_0001', '전체'),
(39, 'C', 'C_0002', '일상'),
(40, 'C', 'C_0003', '초스피드'),
(41, 'C', 'C_0004', '손님접대'),
(42, 'C', 'C_0005', '술안주'),
(43, 'C', 'C_0006', '다이어트'),
(44, 'C', 'C_0007', '도시락'),
(45, 'C', 'C_0008', '영양식'),
(46, 'C', 'C_0009', '간식'),
(47, 'C', 'C_0010', '야식'),
(48, 'C', 'C_0011', '푸드스타일링'),
(49, 'C', 'C_0012', '해장'),
(50, 'C', 'C_0013', '명절'),
(51, 'C', 'C_0014', '이유식'),
(52, 'C', 'C_0015', '기타'),

-- 재료별 (D)
(53, 'D', 'D_0001', '전체'),
(54, 'D', 'D_0002', '소고기'),
(55, 'D', 'D_0003', '돼지고기'),
(56, 'D', 'D_0004', '닭고기'),
(57, 'D', 'D_0005', '육류'),
(58, 'D', 'D_0006', '채소류'),
(59, 'D', 'D_0007', '해물류'),
(60, 'D', 'D_0008', '달걀/유제품'),
(61, 'D', 'D_0009', '가공식품류'),
(62, 'D', 'D_0010', '쌀'),
(63, 'D', 'D_0011', '밀가루'),
(64, 'D', 'D_0012', '건어물류'),
(65, 'D', 'D_0013', '버섯류'),
(66, 'D', 'D_0014', '과일류'),
(67, 'D', 'D_0015', '콩/견과류'),
(68, 'D', 'D_0016', '곡류'),
(69, 'D', 'D_0017', '기타'),

-- 방법별 (E)
(70, 'E', 'E_0001', '전체'),
(71, 'E', 'E_0002', '볶음'),
(72, 'E', 'E_0003', '끓이기'),
(73, 'E', 'E_0004', '부침'),
(74, 'E', 'E_0005', '조림'),
(75, 'E', 'E_0006', '무침'),
(76, 'E', 'E_0007', '비빔'),
(77, 'E', 'E_0008', '찜'),
(78, 'E', 'E_0009', '절임'),
(79, 'E', 'E_0010', '튀김'),
(80, 'E', 'E_0011', '삶기'),
(81, 'E', 'E_0012', '굽기'),
(82, 'E', 'E_0013', '데치기'),
(83, 'E', 'E_0014', '회'),
(84, 'E', 'E_0015', '기타');
