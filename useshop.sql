-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: shoppingmall
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `cId` int NOT NULL AUTO_INCREMENT,
  `mId` int DEFAULT NULL,
  `cQuantity` int NOT NULL,
  `pId` int DEFAULT NULL,
  PRIMARY KEY (`cId`),
  KEY `mId` (`mId`),
  KEY `pId` (`pId`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`mId`) REFERENCES `member` (`mId`),
  CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`pId`) REFERENCES `product` (`pId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `mId` int NOT NULL AUTO_INCREMENT,
  `mEmail` varchar(255) NOT NULL,
  `mPwd` varchar(255) NOT NULL,
  `mName` varchar(255) NOT NULL,
  `mPhone` varchar(13) NOT NULL,
  `mPostnum` varchar(5) DEFAULT NULL,
  `mAddr1` varchar(255) DEFAULT NULL,
  `mAddr2` varchar(255) DEFAULT NULL,
  `mPoint` int DEFAULT '3000',
  `mAuth` varchar(10) DEFAULT 'user',
  `mRegdate` date DEFAULT (curdate()),
  PRIMARY KEY (`mId`),
  UNIQUE KEY `mEmail` (`mEmail`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (1,'admin','$2b$10$JYYJ.MRewCACLUmRKCji2uRBd8o88A5sUd.K5xkAa9en2z.PraaPm','관리자','010-0000-0000','13494','경기 성남시 분당구 판교역로 235','판교역',3000,'admin','2022-11-30'),(2,'user@user.com','$2b$10$GiYN0.gedrLt.7YsxJcUxOXeFeC0nrRIh/zpdNZ2w5irlJJQUSeOe','사용자','010-1234-1234','48307','부산 수영구 광남로 2','하이마트',3000,'user','2022-11-30'),(3,'test@test.com','$2b$10$LV62vVYwVYD1J3gfxGCMCOqeITntJyGnAFEuJWw4WprxFNgwJotca','테스트','010-1111-1111','48307','부산 수영구 광남로 12','광남로 12',1500,'user','2022-11-30');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notice`
--

DROP TABLE IF EXISTS `notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notice` (
  `nId` int NOT NULL AUTO_INCREMENT,
  `mId` int DEFAULT NULL,
  `nTitle` varchar(100) NOT NULL,
  `nContent` text NOT NULL,
  `nImage1` varchar(255) DEFAULT NULL,
  `nImage2` varchar(255) DEFAULT NULL,
  `nImage3` varchar(255) DEFAULT NULL,
  `nHit` int DEFAULT NULL,
  `nRegdate` date DEFAULT (curdate()),
  PRIMARY KEY (`nId`),
  KEY `mId` (`mId`),
  CONSTRAINT `notice_ibfk_1` FOREIGN KEY (`mId`) REFERENCES `member` (`mId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notice`
--

LOCK TABLES `notice` WRITE;
/*!40000 ALTER TABLE `notice` DISABLE KEYS */;
INSERT INTO `notice` VALUES (1,1,'[라이프 포 어스] 공지사항','공지사항 입니다. (이미지)','1669771029860_qna_MenShoes1-removebg-preview.png','1669771029860_qna_MenShoes2-removebg-preview.png','1669771029861_qna_MenShoes3-removebg-preview.png',NULL,'2022-11-30'),(2,1,'배송 공지','배송 문의 게시글',NULL,NULL,NULL,NULL,'2022-11-30'),(3,1,'공지3','공지 3',NULL,NULL,NULL,NULL,'2022-11-30');
/*!40000 ALTER TABLE `notice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderdetails`
--

DROP TABLE IF EXISTS `orderdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderdetails` (
  `odId` int NOT NULL AUTO_INCREMENT,
  `oId` int DEFAULT NULL,
  `oQuantity` int DEFAULT NULL,
  `pId` int DEFAULT NULL,
  `pName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`odId`),
  KEY `oId` (`oId`),
  KEY `pId` (`pId`),
  CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`oId`) REFERENCES `orders` (`oId`),
  CONSTRAINT `orderdetails_ibfk_2` FOREIGN KEY (`pId`) REFERENCES `product` (`pId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdetails`
--

LOCK TABLES `orderdetails` WRITE;
/*!40000 ALTER TABLE `orderdetails` DISABLE KEYS */;
INSERT INTO `orderdetails` VALUES (1,1,1,2,'남성 울 팬츠'),(2,1,1,1,'남성 로고 니트'),(3,2,1,6,'여성 스니커즈');
/*!40000 ALTER TABLE `orderdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `oId` int NOT NULL AUTO_INCREMENT,
  `mId` int DEFAULT NULL,
  `oName` varchar(255) DEFAULT NULL,
  `oPostnum` varchar(5) DEFAULT NULL,
  `oAddr1` varchar(255) DEFAULT NULL,
  `oAddr2` varchar(255) DEFAULT NULL,
  `oPhone` varchar(13) DEFAULT NULL,
  `oPoint` int DEFAULT NULL,
  `oPrice` int DEFAULT NULL,
  `oPayment` varchar(10) DEFAULT NULL,
  `oDate` date DEFAULT NULL,
  PRIMARY KEY (`oId`),
  KEY `mId` (`mId`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`mId`) REFERENCES `member` (`mId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,2,'사용자','48307','부산 수영구 광남로 2','하이마트','010-1234-1234',0,178000,'무통장입금','2022-11-30'),(2,3,'테스트','48307','부산 수영구 광남로 12','광남로 12','010-1111-1111',1500,119000,'무통장입금','2022-11-30');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `pId` int NOT NULL AUTO_INCREMENT,
  `pName` varchar(100) NOT NULL,
  `pGender` varchar(5) NOT NULL,
  `pCaregory` varchar(20) NOT NULL,
  `pStock` int NOT NULL,
  `pPrice` int NOT NULL,
  `pImage1` varchar(255) NOT NULL,
  `pImage2` varchar(255) DEFAULT NULL,
  `pImage3` varchar(255) DEFAULT NULL,
  `pContent` text NOT NULL,
  `regdate` varchar(255) NOT NULL,
  PRIMARY KEY (`pId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'남성 로고 니트','MEN','상의',19,99000,'1669770881523_productImage_MenTop1-removebg-preview.png','1669770881525_productImage_MenTop2-removebg-preview.png','1669770881530_productImage_MenTop3-removebg-preview.png','루즈핏 실루엣으로 편안한 착용감을 제공하며, 전면에 배색 포인트 된 로고와 부드러운 울 혼방 소재를 사용하여 데일리로 착용하기 좋습니다.','2022-11-30 10:14:41'),(2,'남성 울 팬츠','MEN','하의',20,79000,'1669770908940_productImage_MenPants1-removebg-preview.png','1669770908942_productImage_MenPants2-removebg-preview.png','1669770908947_productImage_MenPants3-removebg-preview.png','원턱이 들어간 부담스럽지 않은 와이드 핏 연출로 어디에나 손쉽게 매치할 수 있어 데일리로 착용하기 좋습니다.','2022-11-30 10:15:08'),(3,'남성 스니커즈','MEN','기타',20,119000,'1669770927772_productImage_MenShoes1-removebg-preview.png','1669770927772_productImage_MenShoes2-removebg-preview.png','1669770927773_productImage_MenShoes3-removebg-preview.png','적당한 두께의 패딩심 삽입으로 편안한 움직임을 제공하며 심플하면서 안정적인 그립력을 제공하여 데일리로 착용하기 좋습니다.','2022-11-30 10:15:27'),(4,'여성 로고 니트','WOMEN','상의',20,89000,'1669770951508_productImage_WomenTop1-removebg-preview.png','1669770951510_productImage_WomenTop2-removebg-preview.png','1669770951514_productImage_WomenTop3-removebg-preview.png','루즈핏 실루엣으로 편안한 착용감을 제공하며, 전면에 배색 포인트 된 로고와 부드러운 울 혼방 소재를 사용하여 데일리로 착용하기 좋습니다.','2022-11-30 10:15:51'),(5,'여성 숏 팬츠','WOMEN','하의',20,69000,'1669770975093_productImage_WomenPants1-removebg-preview.png','1669770975095_productImage_WomenPants2-removebg-preview.png','1669770975098_productImage_WomenPants3-removebg-preview.png','두꺼운 두께감의 울 소재로 안감이 있어 편안한 착용감을 제공하며 하프 기장감으로 데일리로 착용하기 좋습니다.','2022-11-30 10:16:15'),(6,'여성 스니커즈','WOMEN','기타',19,119000,'1669770998873_productImage_WomenShoes1-removebg-preview.png','1669770998874_productImage_WomenShoes2-removebg-preview.png','1669770998877_productImage_WomenShoes3-removebg-preview.png','적당한 두께의 패딩심 삽입으로 편안한 움직임을 제공하며 심플하면서 안정적인 그립력을 제공하여 데일리로 착용하기 좋습니다.','2022-11-30 10:16:38');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `qna`
--

DROP TABLE IF EXISTS `qna`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `qna` (
  `qId` int NOT NULL AUTO_INCREMENT,
  `qCategory` varchar(20) NOT NULL,
  `pId` int DEFAULT NULL,
  `mId` int DEFAULT NULL,
  `qTitle` varchar(100) NOT NULL,
  `qContent` text NOT NULL,
  `qImage1` varchar(255) DEFAULT NULL,
  `qImage2` varchar(255) DEFAULT NULL,
  `qImage3` varchar(255) DEFAULT NULL,
  `qSecret` tinyint(1) DEFAULT NULL,
  `qHit` int DEFAULT '0',
  `qRegdate` date DEFAULT (now()),
  PRIMARY KEY (`qId`),
  KEY `pId` (`pId`),
  KEY `mId` (`mId`),
  CONSTRAINT `qna_ibfk_1` FOREIGN KEY (`pId`) REFERENCES `product` (`pId`),
  CONSTRAINT `qna_ibfk_2` FOREIGN KEY (`mId`) REFERENCES `member` (`mId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qna`
--

LOCK TABLES `qna` WRITE;
/*!40000 ALTER TABLE `qna` DISABLE KEYS */;
INSERT INTO `qna` VALUES (1,'상품',3,2,'상품 문의','상품 문의 + 이미지','1669771137880_qna_WomenShoes1-removebg-preview.png0','1669771137881_qna_WomenShoes2-removebg-preview.png0','1669771137882_qna_WomenShoes3-removebg-preview.png0',0,0,'2022-11-30'),(2,'주문 / 결제',NULL,2,'주문 결제 문의','주문 결제 문의',NULL,NULL,NULL,0,0,'2022-11-30'),(3,'배송',NULL,2,'배송 문의','배송 문의',NULL,NULL,NULL,1,0,'2022-11-30'),(4,'반품 / 교환',NULL,2,'반품 교환 문의','반품 교환 문의',NULL,NULL,NULL,0,0,'2022-11-30'),(5,'기타',NULL,2,'기타 문의','기타 문의','1669771198721_qna_MenTop1-removebg-preview.png0',NULL,NULL,0,0,'2022-11-30');
/*!40000 ALTER TABLE `qna` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `qna_comment`
--

DROP TABLE IF EXISTS `qna_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `qna_comment` (
  `qcId` int NOT NULL AUTO_INCREMENT,
  `qId` int DEFAULT NULL,
  `qcWriter` varchar(200) DEFAULT NULL,
  `qcContent` text,
  `qcRegdate` date DEFAULT (now()),
  PRIMARY KEY (`qcId`),
  KEY `qId` (`qId`),
  CONSTRAINT `qna_comment_ibfk_1` FOREIGN KEY (`qId`) REFERENCES `qna` (`qId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qna_comment`
--

LOCK TABLES `qna_comment` WRITE;
/*!40000 ALTER TABLE `qna_comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `qna_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `rId` int NOT NULL AUTO_INCREMENT,
  `pId` int DEFAULT NULL,
  `mId` int DEFAULT NULL,
  `rTitle` varchar(100) NOT NULL,
  `rContent` text NOT NULL,
  `rImage1` varchar(255) DEFAULT NULL,
  `rImage2` varchar(255) DEFAULT NULL,
  `rImage3` varchar(255) DEFAULT NULL,
  `rStar` varchar(5) DEFAULT NULL,
  `rHit` int DEFAULT NULL,
  `rRegdate` date DEFAULT (curdate()),
  PRIMARY KEY (`rId`),
  KEY `pId` (`pId`),
  KEY `mId` (`mId`),
  CONSTRAINT `review_ibfk_1` FOREIGN KEY (`pId`) REFERENCES `product` (`pId`),
  CONSTRAINT `review_ibfk_2` FOREIGN KEY (`mId`) REFERENCES `member` (`mId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (1,2,2,'남성 울 팬츠 리뷰','이미지 파일까지','1669771258402_qna_MenPants3-removebg-preview.png0',NULL,NULL,'★★★★★',NULL,'2022-11-30'),(2,1,2,'남성 로고 니트 리뷰','별점 ','1669771273772_qna_MenTop2-removebg-preview.png0',NULL,NULL,'★☆☆☆☆',NULL,'2022-11-30'),(3,6,3,'사진 없는 리뷰','사진 없는 리뷰',NULL,NULL,NULL,'★★★★★',NULL,'2022-11-30');
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-30 10:24:07
