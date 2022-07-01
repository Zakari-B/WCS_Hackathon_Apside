-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: apsidea
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `agency`
--

DROP TABLE IF EXISTS `agency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agency` (
  `id` int NOT NULL AUTO_INCREMENT,
  `city` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `lat` float DEFAULT NULL,
  `long` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agency`
--

LOCK TABLES `agency` WRITE;
/*!40000 ALTER TABLE `agency` DISABLE KEYS */;
INSERT INTO `agency` VALUES (1,'Paris','France',48.5,2.2),(2,'Lyon','France',45.45,4.5),(3,'Strasbourg','France',48.57,7.75),(4,'Bordeaux','France',44.83,-0.58),(5,'Marseille','France',43.29,5.37),(6,'Bruxelles','Belgium',50.85,4.35),(7,'Munich','Germany',48.14,11.58),(8,'Casablanca','Morocco',33.57,-7.59),(9,'Tours','France',47.39,0.68);
/*!40000 ALTER TABLE `agency` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bubble`
--

DROP TABLE IF EXISTS `bubble`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bubble` (
  `id` int NOT NULL AUTO_INCREMENT,
  `creator` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deadline` date DEFAULT NULL,
  `gitlab_link` varchar(255) DEFAULT NULL,
  `trello_link` varchar(255) DEFAULT NULL,
  `workforce` int DEFAULT NULL,
  `likes` int DEFAULT NULL,
  `workflow_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_bubble_workflow1_idx` (`workflow_id`),
  KEY `fk_bubble_user1_idx` (`creator`),
  CONSTRAINT `fk_bubble_user1` FOREIGN KEY (`creator`) REFERENCES `user` (`id`),
  CONSTRAINT `fk_bubble_workflow1` FOREIGN KEY (`workflow_id`) REFERENCES `workflow` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bubble`
--

LOCK TABLES `bubble` WRITE;
/*!40000 ALTER TABLE `bubble` DISABLE KEYS */;
INSERT INTO `bubble` VALUES (1,1,'Hotline Web App','We develop some small web app for association to handle their hotline. It is made with love and magic','2022-01-14 23:00:00','2022-05-15','https://trello.com/','https://gitlab.com/',3,40,3),(2,10,'Skills Management Platform','We are developping a skills management platform for internal purpose. Other purpose : to save the world','2022-04-14 22:00:00','2022-08-15','https://trello.com/','https://gitlab.com/',4,50,5),(3,2,'Save the kittens','We are developping a new to help stray cats on the street. Miaw.','2022-06-14 22:00:00','2022-09-15','https://trello.com/','https://gitlab.com/',3,22,1),(4,5,'Movie Wars','We are developping a game to go from one movie to another, going through the actors.','2022-05-14 22:00:00','2022-08-15','https://trello.com/','https://gitlab.com/',3,12,2),(5,5,'Phone Crypto App','The Crypto is dying but we still believe in it. Lets invest into Bicoins again.','2021-12-14 23:00:00','2022-07-15','https://trello.com/','https://gitlab.com/',2,36,1),(6,28,'Music Database','We want to create a music modules databases for a client who manage musicians.','2022-05-14 22:00:00','2022-10-15','https://trello.com/','https://gitlab.com/',5,31,1),(7,29,'IA Chatbot','We dont really know what we do here, our client neither. I guess its not gonna be IA in the end.','2022-04-14 22:00:00','2022-10-15','https://trello.com/','https://gitlab.com/',3,42,3),(8,15,'Coworking managing website','Another platform to allow freelancers to find a coworking space.','2021-09-14 22:00:00','2021-12-15','https://trello.com/','https://gitlab.com/',3,23,5),(9,15,'Online Library','Does it already exists, yes. Is it a bad idea, yes. Does our client care, no.','2022-06-14 22:00:00','2021-12-15','https://trello.com/','https://gitlab.com/',3,37,4),(30,1,'Hotline Web App','We develop some small web app for association to handle their hotline. It is made with love and magic','2022-01-14 23:00:00','2022-05-15','https://trello.com/','https://gitlab.com/',4,30,5),(32,11,'Skills Management Platform','We are developping a skills management platform for internal purpose. Other purpose : to save the world','2022-04-14 22:00:00','2022-08-15','https://trello.com/','https://gitlab.com/',1,4,2),(33,12,'Save the kittens','We are developping a new to help stray cats on the street. Miaw.','2022-06-14 22:00:00','2022-09-15','https://trello.com/','https://gitlab.com/',2,1,3),(34,13,'Movie Wars','We are developping a game to go from one movie to another, going through the actors.','2022-05-14 22:00:00','2022-08-15','https://trello.com/','https://gitlab.com/',3,2,4),(35,14,'Phone Crypto App','The Crypto is dying but we still believe in it. Lets invest into Bicoins again.','2021-12-14 23:00:00','2022-07-15','https://trello.com/','https://gitlab.com/',3,5,5),(36,15,'Music Database','We want to create a music modules databases for a client who manage musicians.','2022-05-14 22:00:00','2022-10-15','https://trello.com/','https://gitlab.com/',4,6,1),(37,16,'IA Chatbot','We dont really know what we do here, our client neither. I guess its not gonna be IA in the end.','2022-04-14 22:00:00','2022-10-15','https://trello.com/','https://gitlab.com/',2,4,2),(38,17,'Coworking managing website','Another platform to allow freelancers to find a coworking space.','2021-09-14 22:00:00','2021-12-15','https://trello.com/','https://gitlab.com/',1,4,3),(39,18,'Online Library','Does it already exists, yes. Is it a bad idea, yes. Does our client care, no.','2022-06-14 22:00:00','2021-12-15','https://trello.com/','https://gitlab.com/',2,7,4),(40,19,'Making Bubbles','The hackathon couldnt create only unique bubbles so only 20 are fake projets, try and find them :)','2022-06-14 22:00:00','2022-09-15','https://trello.com/','https://gitlab.com/',2,1,1),(41,20,'Making Bubbles','The hackathon couldnt create only unique bubbles so only 20 are fake projets, try and find them :)','2022-07-14 22:00:00','2022-09-15','https://trello.com/','https://gitlab.com/',3,3,2),(42,21,'Making Bubbles','The hackathon couldnt create only unique bubbles so only 20 are fake projets, try and find them :)','2022-07-14 22:00:00','2022-09-15','https://trello.com/','https://gitlab.com/',2,2,3),(43,22,'Making Bubbles','The hackathon couldnt create only unique bubbles so only 20 are fake projets, try and find them :)','2022-07-14 22:00:00','2022-09-15','https://trello.com/','https://gitlab.com/',2,4,3),(44,23,'Making Bubbles','The hackathon couldnt create only unique bubbles so only 20 are fake projets, try and find them :)','2022-07-14 22:00:00','2022-09-15','https://trello.com/','https://gitlab.com/',3,2,4),(45,24,'Making Bubbles','The hackathon couldnt create only unique bubbles so only 20 are fake projets, try and find them :)','2022-07-14 22:00:00','2022-09-15','https://trello.com/','https://gitlab.com/',3,1,5),(46,25,'Making Bubbles','The hackathon couldnt create only unique bubbles so only 20 are fake projets, try and find them :)','2022-07-14 22:00:00','2022-09-15','https://trello.com/','https://gitlab.com/',3,1,2),(47,26,'Making Bubbles','The hackathon couldnt create only unique bubbles so only 20 are fake projets, try and find them :)','2022-07-14 22:00:00','2022-09-15','https://trello.com/','https://gitlab.com/',2,3,1),(48,27,'Making Bubbles','The hackathon couldnt create only unique bubbles so only 20 are fake projets, try and find them :)','2022-07-14 22:00:00','2022-09-15','https://trello.com/','https://gitlab.com/',2,1,3),(49,28,'Making Bubbles','The hackathon couldnt create only unique bubbles so only 20 are fake projets, try and find them :)','2022-07-14 22:00:00','2022-09-15','https://trello.com/','https://gitlab.com/',2,1,3),(50,29,'Making Bubbles','The hackathon couldnt create only unique bubbles so only 20 are fake projets, try and find them :)','2022-07-14 22:00:00','2022-09-15','https://trello.com/','https://gitlab.com/',3,3,5),(51,30,'Making Bubbles','The hackathon couldnt create only unique bubbles so only 20 are fake projets, try and find them :)','2022-07-14 22:00:00','2022-09-15','https://trello.com/','https://gitlab.com/',2,1,5),(52,1,'Making Bubbles','The hackathon couldnt create only unique bubbles so only 20 are fake projets, try and find them :)','2022-07-14 22:00:00','2022-09-15','https://trello.com/','https://gitlab.com/',3,4,2),(53,2,'Making Bubbles','The hackathon couldnt create only unique bubbles so only 20 are fake projets, try and find them :)','2022-07-14 22:00:00','2022-09-15','https://trello.com/','https://gitlab.com/',2,1,4),(54,3,'Making Bubbles','The hackathon couldnt create only unique bubbles so only 20 are fake projets, try and find them :)','2022-07-14 22:00:00','2022-09-15','https://trello.com/','https://gitlab.com/',5,1,1),(55,4,'Making Bubbles','The hackathon couldnt create only unique bubbles so only 20 are fake projets, try and find them :)','2022-07-14 22:00:00','2022-09-15','https://trello.com/','https://gitlab.com/',2,3,4),(56,2,'Making Bubbles','The hackathon couldnt create only unique bubbles so only 20 are fake projets, try and find them :)','2022-07-14 22:00:00','2022-09-15','https://trello.com/','https://gitlab.com/',2,1,2),(57,3,'Making Bubbles','The hackathon couldnt create only unique bubbles so only 20 are fake projets, try and find them :)','2022-07-14 22:00:00','2022-09-15','https://trello.com/','https://gitlab.com/',4,1,1),(58,5,'Making Bubbles','The hackathon couldnt create only unique bubbles so only 20 are fake projets, try and find them :)','2022-07-14 22:00:00','2022-09-15','https://trello.com/','https://gitlab.com/',4,6,1),(59,8,'Making Bubbles','The hackathon couldnt create only unique bubbles so only 20 are fake projets, try and find them :)','2022-07-14 22:00:00','2022-09-15','https://trello.com/','https://gitlab.com/',2,1,5),(60,12,'Making Bubbles','The hackathon couldnt create only unique bubbles so only 20 are fake projets, try and find them :)','2022-07-14 22:00:00','2022-09-15','https://trello.com/','https://gitlab.com/',5,2,2),(61,15,'Making Bubbles','The hackathon couldnt create only unique bubbles so only 20 are fake projets, try and find them :)','2022-07-14 22:00:00','2022-09-15','https://trello.com/','https://gitlab.com/',3,4,1),(62,19,'Making Bubbles','The hackathon couldnt create only unique bubbles so only 20 are fake projets, try and find them :)','2022-07-14 22:00:00','2022-09-15','https://trello.com/','https://gitlab.com/',2,5,4),(63,20,'Making Bubbles','The hackathon couldnt create only unique bubbles so only 20 are fake projets, try and find them :)','2022-07-14 22:00:00','2022-09-15','https://trello.com/','https://gitlab.com/',2,1,3);
/*!40000 ALTER TABLE `bubble` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bubble_has_keyword`
--

DROP TABLE IF EXISTS `bubble_has_keyword`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bubble_has_keyword` (
  `bubble_id` int NOT NULL,
  `keyword_id` int NOT NULL,
  PRIMARY KEY (`bubble_id`,`keyword_id`),
  KEY `fk_bubble_has_keyword_keyword1_idx` (`keyword_id`),
  KEY `fk_bubble_has_keyword_bubble1_idx` (`bubble_id`),
  CONSTRAINT `fk_bubble_has_keyword_bubble1` FOREIGN KEY (`bubble_id`) REFERENCES `bubble` (`id`),
  CONSTRAINT `fk_bubble_has_keyword_keyword1` FOREIGN KEY (`keyword_id`) REFERENCES `keyword` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bubble_has_keyword`
--

LOCK TABLES `bubble_has_keyword` WRITE;
/*!40000 ALTER TABLE `bubble_has_keyword` DISABLE KEYS */;
INSERT INTO `bubble_has_keyword` VALUES (1,1),(1,2),(1,3),(2,2),(2,3),(2,4),(2,5),(3,3),(3,4),(3,5),(4,4),(4,5),(4,6),(5,5),(5,6),(5,7),(6,6),(6,7),(6,8),(7,7),(7,8),(7,9),(8,8),(8,9),(8,10),(9,9),(9,10),(9,11),(30,10),(30,11),(31,12),(31,11),(32,12),(32,11),(33,12),(33,11),(34,12),(34,11),(35,12),(35,11),(36,12),(36,11),(37,12),(37,11),(38,12),(38,11),(39,12),(39,11),(40,12),(40,11),(41,12),(41,11),(42,12),(42,11),(43,12),(43,11),(44,12),(44,11),(45,12),(45,11),(46,12),(46,11),(47,12),(47,11),(48,12),(48,11),(49,12),(49,11),(50,12),(50,11),(51,12),(51,11),(52,12);
/*!40000 ALTER TABLE `bubble_has_keyword` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bubble_needs_skills`
--

DROP TABLE IF EXISTS `bubble_needs_skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bubble_needs_skills` (
  `bubble_id` int NOT NULL,
  `skill_id` int NOT NULL,
  PRIMARY KEY (`bubble_id`,`skill_id`),
  KEY `fk_bubble_has_skills_skills1_idx` (`skill_id`),
  KEY `fk_bubble_has_skills_bubble1_idx` (`bubble_id`),
  CONSTRAINT `fk_bubble_has_skills_bubble1` FOREIGN KEY (`bubble_id`) REFERENCES `bubble` (`id`),
  CONSTRAINT `fk_bubble_has_skills_skills1` FOREIGN KEY (`skill_id`) REFERENCES `skill` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bubble_needs_skills`
--

LOCK TABLES `bubble_needs_skills` WRITE;
/*!40000 ALTER TABLE `bubble_needs_skills` DISABLE KEYS */;
INSERT INTO `bubble_needs_skills` VALUES (1,1),(1,2),(1,3),(2,2),(2,3),(2,4),(2,5),(3,3),(3,4),(3,5),(4,4),(4,5),(4,6),(5,5),(5,6),(5,7),(6,6),(6,7),(6,8),(7,7),(7,8),(7,9),(8,8),(8,9),(8,10),(9,9),(9,10),(9,11),(30,10),(30,11),(31,12),(31,11),(32,12),(32,11),(33,12),(33,11),(34,12),(34,11),(35,12),(35,11),(36,12),(36,11),(37,12),(37,11),(38,12),(38,11),(39,12),(39,11),(40,12),(40,11),(41,12),(41,11),(42,12),(42,11),(43,12),(43,11),(44,12),(44,11),(45,12),(45,11),(46,12),(46,11),(47,12),(47,11),(48,12),(48,11),(49,12),(49,11),(50,12),(50,11),(51,12),(51,11),(52,12);
/*!40000 ALTER TABLE `bubble_needs_skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `keyword`
--

DROP TABLE IF EXISTS `keyword`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `keyword` (
  `id` int NOT NULL AUTO_INCREMENT,
  `keyword` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `keyword`
--

LOCK TABLES `keyword` WRITE;
/*!40000 ALTER TABLE `keyword` DISABLE KEYS */;
INSERT INTO `keyword` VALUES (1,'IA'),(2,'Linux'),(3,'Platform'),(4,'Fullstack'),(5,'Music'),(6,'Crypto'),(7,'HR'),(8,'Finance'),(9,'Javascript'),(10,'Game'),(11,'WebApp'),(12,'Education'),(13,'Chatbot'),(14,'ELearning'),(15,'Saas'),(16,'Smartphone'),(17,'Chrome'),(18,'Git'),(19,'Security'),(20,'Hacking'),(21,'Mac'),(22,'Android');
/*!40000 ALTER TABLE `keyword` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `position`
--

DROP TABLE IF EXISTS `position`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `position` (
  `id` int NOT NULL AUTO_INCREMENT,
  `position` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `position`
--

LOCK TABLES `position` WRITE;
/*!40000 ALTER TABLE `position` DISABLE KEYS */;
INSERT INTO `position` VALUES (1,'Tech Lead'),(2,'Product Owner'),(3,'Dev Web'),(4,'Dev Mobile'),(5,'Business Developer'),(6,'Sales Manager'),(7,'Talent Manager'),(8,'Intern'),(9,'CEO');
/*!40000 ALTER TABLE `position` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skill`
--

DROP TABLE IF EXISTS `skill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skill` (
  `id` int NOT NULL AUTO_INCREMENT,
  `skill` varchar(255) NOT NULL,
  `category` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skill`
--

LOCK TABLES `skill` WRITE;
/*!40000 ALTER TABLE `skill` DISABLE KEYS */;
INSERT INTO `skill` VALUES (1,'PHP','Tech'),(2,'Typescript','Tech'),(3,'Android','Tech'),(4,'React','Tech'),(5,'Fullstack','Tech'),(6,'Node','Tech'),(7,'Git','Tech'),(8,'Laravel','Tech'),(9,'Coordination','Social'),(10,'Marketing','Social'),(11,'Redaction','Social'),(12,'Agile','Organisation'),(13,'Scrum','Organisation'),(14,'Trello','Organisation'),(15,'DevOps','Organisation'),(16,'Angular','Tech'),(17,'Vue','Tech'),(18,'Symfony','Tech'),(19,'Next','Tech'),(20,'Nest','Tech'),(21,'MongoDb','Tech'),(22,'MySql','Tech');
/*!40000 ALTER TABLE `skill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(55) NOT NULL,
  `lastname` varchar(55) NOT NULL,
  `email` varchar(255) NOT NULL,
  `hashedpassword` varchar(255) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `is_admin` tinyint DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `agency_id` int NOT NULL,
  `position_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `fk_user_position1_idx` (`position_id`),
  KEY `fk_user_agency` (`agency_id`),
  CONSTRAINT `fk_user_agency` FOREIGN KEY (`agency_id`) REFERENCES `agency` (`id`),
  CONSTRAINT `fk_user_position1` FOREIGN KEY (`position_id`) REFERENCES `position` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Tudor','Goodlatt','tgoodlatt0@parallels.com','xOu2dL8Gf','https://randomuser.me/api/portraits/men/10.jpg',NULL,'2018-09-14 22:00:00',1,1),(2,'Jeramie','Lebreton','jlebreton1@flickr.com','SdspwOOieA','https://randomuser.me/api/portraits/men/18.jpg',NULL,'2018-09-14 22:00:00',3,1),(3,'Bevin','Hallgarth','bhallgarth2@si.edu','xYDZX6Z','https://randomuser.me/api/portraits/women/22.jpg',NULL,'2018-09-14 22:00:00',2,1),(4,'Edwin','Virgoe','evirgoe3@yolasite.com','Pe9l6EW','https://randomuser.me/api/portraits/men/11.jpg',NULL,'2018-09-14 22:00:00',5,1),(5,'Cynde','Deaconson','cdeaconson4@wikispaces.com','iQ3zhD','https://randomuser.me/api/portraits/women/23.jpg',NULL,'2018-09-14 22:00:00',1,1),(6,'Caryn','Donnell','cdonnell5@yahoo.com','eAKIYXFhuDi','https://randomuser.me/api/portraits/women/25.jpg',NULL,'2018-09-14 22:00:00',5,1),(7,'Jermayne','Milleton','jmilleton6@dropbox.com','5WetQ1exf6i','https://randomuser.me/api/portraits/women/24.jpg',NULL,'2018-09-14 22:00:00',8,1),(8,'Ellerey','Mackett','emackett7@ebay.com','TH0Dkx4qj','https://randomuser.me/api/portraits/women/21.jpg',NULL,'2018-09-14 22:00:00',6,1),(9,'Leigh','Flament','lflament8@biblegateway.com','0GuQ0ahUB','https://randomuser.me/api/portraits/women/19.jpg',NULL,'2018-09-14 22:00:00',1,2),(10,'Lucian','Hardisty','lhardisty9@ucoz.ru','q3xFMqaEaCK','https://randomuser.me/api/portraits/women/26.jpg',NULL,'2018-09-14 22:00:00',5,2),(11,'Dolores','Layus','dlayusa@lulu.com','1LpUMk6C','https://randomuser.me/api/portraits/women/27.jpg',NULL,'2018-09-14 22:00:00',6,2),(12,'Marlee','Colwill','mcolwillb@phpbb.com','PAsmC0T','https://randomuser.me/api/portraits/women/20.jpg',NULL,'2018-09-14 22:00:00',3,2),(13,'Rurik','Guest','rguestc@bigcartel.com','epxy5aextkr','https://randomuser.me/api/portraits/women/17.jpg',NULL,'2018-09-14 22:00:00',1,3),(14,'Kelsey','Whyley','kwhyleyd@geocities.jp','bJCkBKNC','https://randomuser.me/api/portraits/women/16.jpg',NULL,'2018-09-14 22:00:00',8,3),(15,'Ario','Dwyer','adwyere@sciencedirect.com','8Uchhmv','https://randomuser.me/api/portraits/men/12.jpg',NULL,'2018-09-14 22:00:00',3,3),(16,'Romonda','Darington','rdaringtonf@cloudflare.com','LJ0XmW','https://randomuser.me/api/portraits/women/28.jpg',NULL,'2018-09-14 22:00:00',7,3),(17,'Leroi','Crickmer','lcrickmerg@google.fr','YAtFhkQ8vo3m','https://randomuser.me/api/portraits/women/18.jpg',NULL,'2018-09-14 22:00:00',2,4),(18,'Corbin','Shailer','cshailerh@1und1.de','nShUI71Uea2Y','https://randomuser.me/api/portraits/men/13.jpg',NULL,'2018-09-14 22:00:00',3,4),(19,'Nick','Tumilson','ntumilsoni@sohu.com','aiZKGV6kZ','https://randomuser.me/api/portraits/women/15.jpg',NULL,'2018-09-14 22:00:00',1,5),(20,'Perri','Hawes','phawesj@51.la','GZkiCZIcZm9','https://randomuser.me/api/portraits/men/19.jpg',NULL,'2018-09-14 22:00:00',4,5),(21,'Darill','Geill','dgeillk@plala.or.jp','yqUFVNLvMsk','https://randomuser.me/api/portraits/men/14.jpg',NULL,'2018-09-14 22:00:00',1,6),(22,'Tessie','Alliker','tallikerl@mapquest.com','GKdTvIo4','https://randomuser.me/api/portraits/women/29.jpg',NULL,'2018-09-14 22:00:00',7,6),(23,'Darius','Chipman','dchipmanm@toplist.cz','LOina4bPA0','https://randomuser.me/api/portraits/men/17.jpg',NULL,'2018-09-14 22:00:00',4,7),(24,'Hermy','Braidon','hbraidonn@ca.gov','sOrU9EBS','https://randomuser.me/api/portraits/men/20.jpg',NULL,'2018-09-14 22:00:00',2,7),(25,'Carlin','Brislen','cbrisleno@blinklist.com','fuZA4i6g','https://randomuser.me/api/portraits/women/14.jpg',NULL,'2018-09-14 22:00:00',3,7),(26,'Sheffield','Winskill','swinskillp@indiegogo.com','WmCJFJHRgQ9x','https://randomuser.me/api/portraits/men/15.jpg',NULL,'2018-09-14 22:00:00',5,8),(27,'Michaela','Drohane','mdrohaneq@noaa.gov','BM16eo','https://randomuser.me/api/portraits/men/21.jpg',NULL,'2018-09-14 22:00:00',4,8),(28,'Norah','Pentycross','npentycrossr@cloudflare.com','UF3JHodisYM','https://randomuser.me/api/portraits/men/22.jpg',NULL,'2018-09-14 22:00:00',6,9),(29,'Felix','Dmiterko','fdmiterkos@weebly.com','1L15CS2','https://randomuser.me/api/portraits/women/31.jpg',NULL,'2018-09-14 22:00:00',2,9),(30,'Parker','Calterone','pcalteronet@github.com','PjR5rCV131','https://randomuser.me/api/portraits/men/16.jpg',NULL,'2018-09-14 22:00:00',5,9),(31,'Gregory','Petit','gregory.petit@apside.com','$argon2id$v=19$m=65536,t=5,p=1$o+FltaPorEnFS1SylE2vyQ$G74jO1iB2+/ACU84Qx686ss9u4WIjVV98dy6+ExKUJ4','https://randomuser.me/api/portraits/men/56.jpg',1,'2018-09-14 22:00:00',5,5),(32,'Régis','Jambois','regis.jambois@apside.com','$argon2id$v=19$m=65536,t=5,p=1$o+FltaPorEnFS1SylE2vyQ$G74jO1iB2+/ACU84Qx686ss9u4WIjVV98dy6+ExKUJ4','https://randomuser.me/api/portraits/men/57.jpg',1,'2018-09-14 22:00:00',4,4),(33,'Myriam','Hajji','myriam.hajji@apside.com','$argon2id$v=19$m=65536,t=5,p=1$o+FltaPorEnFS1SylE2vyQ$G74jO1iB2+/ACU84Qx686ss9u4WIjVV98dy6+ExKUJ4','https://randomuser.me/api/portraits/women/57.jpg',1,'2018-09-14 22:00:00',3,3),(34,'Baptiste','Bech','baptiste.bech@apside.com','$argon2id$v=19$m=65536,t=5,p=1$o+FltaPorEnFS1SylE2vyQ$G74jO1iB2+/ACU84Qx686ss9u4WIjVV98dy6+ExKUJ4','https://randomuser.me/api/portraits/men/58.jpg',1,'2018-09-14 22:00:00',2,2);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_has_bubble`
--

DROP TABLE IF EXISTS `user_has_bubble`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_has_bubble` (
  `user_id` int NOT NULL,
  `bubble_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`bubble_id`),
  KEY `fk_user_has_bubble_bubble1_idx` (`bubble_id`),
  KEY `fk_user_has_bubble_user1_idx` (`user_id`),
  CONSTRAINT `fk_user_has_bubble_bubble1` FOREIGN KEY (`bubble_id`) REFERENCES `bubble` (`id`),
  CONSTRAINT `fk_user_has_bubble_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_has_bubble`
--

LOCK TABLES `user_has_bubble` WRITE;
/*!40000 ALTER TABLE `user_has_bubble` DISABLE KEYS */;
INSERT INTO `user_has_bubble` VALUES (8,2),(10,2),(12,2),(14,2),(16,8),(18,8),(32,2),(32,3),(31,4),(34,5),(33,6),(32,7),(7,8),(8,9),(9,30),(30,32),(32,33),(33,34),(34,35),(7,36),(8,37),(9,38),(10,39),(11,40),(12,41),(12,42),(14,43),(14,44),(13,45),(13,46),(14,47),(15,48),(16,49),(17,51),(18,52),(19,53),(20,54),(21,55),(22,56),(23,57),(24,58),(25,59),(26,60),(27,61),(28,62),(29,63);
/*!40000 ALTER TABLE `user_has_bubble` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_has_skill`
--

DROP TABLE IF EXISTS `user_has_skill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_has_skill` (
  `user_id` int NOT NULL,
  `skill_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`skill_id`),
  KEY `fk_user_has_skills_skills1_idx` (`skill_id`),
  KEY `fk_user_has_skills_user1_idx` (`user_id`),
  CONSTRAINT `fk_user_has_skills_skills1` FOREIGN KEY (`skill_id`) REFERENCES `skill` (`id`),
  CONSTRAINT `fk_user_has_skills_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_has_skill`
--

LOCK TABLES `user_has_skill` WRITE;
/*!40000 ALTER TABLE `user_has_skill` DISABLE KEYS */;
INSERT INTO `user_has_skill` VALUES (31,1),(31,2),(1,1),(2,1),(20,1),(30,1),(3,2),(4,2),(25,2),(30,2),(5,3),(6,3),(28,3),(29,3),(7,4),(27,4),(1,5),(2,5),(3,6),(4,6),(5,7),(6,7),(7,8),(9,8),(26,8),(10,9),(11,9),(12,10),(13,10),(14,11),(15,11),(17,12),(18,12),(24,12),(19,13),(21,13),(22,14),(23,14),(32,20),(33,19),(33,18),(34,17),(34,16),(34,15);
/*!40000 ALTER TABLE `user_has_skill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workflow`
--

DROP TABLE IF EXISTS `workflow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workflow` (
  `id` int NOT NULL AUTO_INCREMENT,
  `workflow` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workflow`
--

LOCK TABLES `workflow` WRITE;
/*!40000 ALTER TABLE `workflow` DISABLE KEYS */;
INSERT INTO `workflow` VALUES (1,'Idea'),(2,'Team Building'),(3,'Coding'),(4,'Review'),(5,'Finished');
/*!40000 ALTER TABLE `workflow` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;