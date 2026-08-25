-- MySQL dump 10.13  Distrib 8.0.46, for Linux (x86_64)
--
-- Host: localhost    Database: FormaFantasiaDB
-- ------------------------------------------------------
-- Server version	8.0.46-0ubuntu0.24.04.3

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
-- Table structure for table `AspNetRoleClaims`
--

DROP TABLE IF EXISTS `AspNetRoleClaims`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AspNetRoleClaims` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `RoleId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ClaimType` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `ClaimValue` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`Id`),
  KEY `IX_AspNetRoleClaims_RoleId` (`RoleId`),
  CONSTRAINT `FK_AspNetRoleClaims_AspNetRoles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `AspNetRoles` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AspNetRoleClaims`
--

LOCK TABLES `AspNetRoleClaims` WRITE;
/*!40000 ALTER TABLE `AspNetRoleClaims` DISABLE KEYS */;
/*!40000 ALTER TABLE `AspNetRoleClaims` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AspNetRoles`
--

DROP TABLE IF EXISTS `AspNetRoles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AspNetRoles` (
  `Id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `NormalizedName` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `ConcurrencyStamp` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `RoleNameIndex` (`NormalizedName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AspNetRoles`
--

LOCK TABLES `AspNetRoles` WRITE;
/*!40000 ALTER TABLE `AspNetRoles` DISABLE KEYS */;
INSERT INTO `AspNetRoles` VALUES ('9aca994e-a376-4a42-8b96-1ab2302d4296','Cliente','CLIENTE','c9950e73-71f7-4db3-9199-63badfb5f3dd'),('b67307fb-d7c0-49e5-81ec-8132374c072a','Admin','ADMIN','9319ea14-af63-4cf3-af7e-325f057a5b12');
/*!40000 ALTER TABLE `AspNetRoles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AspNetUserClaims`
--

DROP TABLE IF EXISTS `AspNetUserClaims`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AspNetUserClaims` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `UserId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ClaimType` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `ClaimValue` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`Id`),
  KEY `IX_AspNetUserClaims_UserId` (`UserId`),
  CONSTRAINT `FK_AspNetUserClaims_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `AspNetUsers` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AspNetUserClaims`
--

LOCK TABLES `AspNetUserClaims` WRITE;
/*!40000 ALTER TABLE `AspNetUserClaims` DISABLE KEYS */;
/*!40000 ALTER TABLE `AspNetUserClaims` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AspNetUserLogins`
--

DROP TABLE IF EXISTS `AspNetUserLogins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AspNetUserLogins` (
  `LoginProvider` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ProviderKey` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ProviderDisplayName` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `UserId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`LoginProvider`,`ProviderKey`),
  KEY `IX_AspNetUserLogins_UserId` (`UserId`),
  CONSTRAINT `FK_AspNetUserLogins_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `AspNetUsers` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AspNetUserLogins`
--

LOCK TABLES `AspNetUserLogins` WRITE;
/*!40000 ALTER TABLE `AspNetUserLogins` DISABLE KEYS */;
/*!40000 ALTER TABLE `AspNetUserLogins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AspNetUserRoles`
--

DROP TABLE IF EXISTS `AspNetUserRoles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AspNetUserRoles` (
  `UserId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `RoleId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`UserId`,`RoleId`),
  KEY `IX_AspNetUserRoles_RoleId` (`RoleId`),
  CONSTRAINT `FK_AspNetUserRoles_AspNetRoles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `AspNetRoles` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_AspNetUserRoles_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `AspNetUsers` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AspNetUserRoles`
--

LOCK TABLES `AspNetUserRoles` WRITE;
/*!40000 ALTER TABLE `AspNetUserRoles` DISABLE KEYS */;
INSERT INTO `AspNetUserRoles` VALUES ('e75fafb1-cba6-4e04-b03f-82403f8fd3d1','9aca994e-a376-4a42-8b96-1ab2302d4296'),('8fb8c95e-3603-46b7-92e0-75d412d88bad','b67307fb-d7c0-49e5-81ec-8132374c072a'),('c2cf3869-60c4-4083-8511-0a145dd97398','b67307fb-d7c0-49e5-81ec-8132374c072a');
/*!40000 ALTER TABLE `AspNetUserRoles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AspNetUserTokens`
--

DROP TABLE IF EXISTS `AspNetUserTokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AspNetUserTokens` (
  `UserId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `LoginProvider` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Value` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`UserId`,`LoginProvider`,`Name`),
  CONSTRAINT `FK_AspNetUserTokens_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `AspNetUsers` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AspNetUserTokens`
--

LOCK TABLES `AspNetUserTokens` WRITE;
/*!40000 ALTER TABLE `AspNetUserTokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `AspNetUserTokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AspNetUsers`
--

DROP TABLE IF EXISTS `AspNetUsers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AspNetUsers` (
  `Id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Morada` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `NIF` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `UserName` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `NormalizedUserName` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Email` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `NormalizedEmail` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `EmailConfirmed` tinyint(1) NOT NULL,
  `PasswordHash` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `SecurityStamp` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `ConcurrencyStamp` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `PhoneNumber` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `PhoneNumberConfirmed` tinyint(1) NOT NULL,
  `TwoFactorEnabled` tinyint(1) NOT NULL,
  `LockoutEnd` datetime(6) DEFAULT NULL,
  `LockoutEnabled` tinyint(1) NOT NULL,
  `AccessFailedCount` int NOT NULL,
  `Apelido` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Nome` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `UserNameIndex` (`NormalizedUserName`),
  KEY `EmailIndex` (`NormalizedEmail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AspNetUsers`
--

LOCK TABLES `AspNetUsers` WRITE;
/*!40000 ALTER TABLE `AspNetUsers` DISABLE KEYS */;
INSERT INTO `AspNetUsers` VALUES ('8fb8c95e-3603-46b7-92e0-75d412d88bad','Rua da Fantasia, 1','123456789','admin@formafantasia.pt','ADMIN@FORMAFANTASIA.PT','admin@formafantasia.pt','ADMIN@FORMAFANTASIA.PT',1,'AQAAAAIAAYagAAAAECa9VVH1hcI0qRp9XuHbXdQlm+GFzY3KoWRNodZdO3aHqKX3iAYIw1Pd8kPW8Bw9Hw==','CIAJEJZSHSVMKNJSHE7FKRHF5X2ULWYB','88f7f13a-01a8-439d-8a8c-016af87d0e23',NULL,0,0,NULL,1,0,'',''),('c2cf3869-60c4-4083-8511-0a145dd97398','Rua de Peniche, N17, 2Dto','255314191','rafaelvieira2105@gmail.com','RAFAELVIEIRA2105@GMAIL.COM','rafaelvieira2105@gmail.com','RAFAELVIEIRA2105@GMAIL.COM',0,'AQAAAAIAAYagAAAAENuctSAI13DVRAOGHTSJSDM/UYbNXRzOGg+Kh8Nep0RuQLf/AxOQtQTOxweT3YMQDA==','3WGB4AMKYPBYJGPB2ZKTVYRWTE5QMEL7','33f70829-312f-4bab-9307-454e7e69d00a',NULL,0,0,NULL,1,0,'',''),('e75fafb1-cba6-4e04-b03f-82403f8fd3d1','','','contateste@gmail.com','CONTATESTE@GMAIL.COM','contateste@gmail.com','CONTATESTE@GMAIL.COM',0,'AQAAAAIAAYagAAAAEBrqpVvXGiBAh5dF8tsComvpGIKCaCdLhqqKNdrSuORON79Le+GXKt6WQFKvFbjSNQ==','KZKEDACMVY5U42LRGORKFZKU4GKYOFEE','d09c0d92-0a40-4100-a92f-e04b28877ec0',NULL,0,0,NULL,1,0,'Teste','Conta');
/*!40000 ALTER TABLE `AspNetUsers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Avaliacao`
--

DROP TABLE IF EXISTS `Avaliacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Avaliacao` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `ProdutoId` int NOT NULL,
  `UtilizadorId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Estrelas` int NOT NULL,
  `Comentario` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Data` datetime(6) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_Avaliacao_ProdutoId` (`ProdutoId`),
  KEY `IX_Avaliacao_UtilizadorId` (`UtilizadorId`),
  CONSTRAINT `FK_Avaliacao_AspNetUsers_UtilizadorId` FOREIGN KEY (`UtilizadorId`) REFERENCES `AspNetUsers` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_Avaliacao_Produtos_ProdutoId` FOREIGN KEY (`ProdutoId`) REFERENCES `Produtos` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Avaliacao`
--

LOCK TABLES `Avaliacao` WRITE;
/*!40000 ALTER TABLE `Avaliacao` DISABLE KEYS */;
/*!40000 ALTER TABLE `Avaliacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Categorias`
--

DROP TABLE IF EXISTS `Categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Categorias` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Nome` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Descricao` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CategoriaPaiId` int DEFAULT NULL,
  `Slug` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `EmDestaque` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`),
  KEY `IX_Categorias_CategoriaPaiId` (`CategoriaPaiId`),
  CONSTRAINT `FK_Categorias_Categorias_CategoriaPaiId` FOREIGN KEY (`CategoriaPaiId`) REFERENCES `Categorias` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Categorias`
--

LOCK TABLES `Categorias` WRITE;
/*!40000 ALTER TABLE `Categorias` DISABLE KEYS */;
INSERT INTO `Categorias` VALUES (1,'Papel de Parede','Papeis decorativos para paredes interiores',NULL,'papel-de-parede',0),(2,'Calhas ','Calhas para cortinas',NULL,'calhas',0),(3,'Vinil Decorativo','Vinil decorativo para paredes',NULL,'vinil-decorativo',0);
/*!40000 ALTER TABLE `Categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Encomendas`
--

DROP TABLE IF EXISTS `Encomendas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Encomendas` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Data` datetime(6) NOT NULL,
  `Estado` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `UtilizadorId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CodigoPostal` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `EmailCliente` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Localidade` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `MoradaEntrega` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `NomeCliente` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Notas` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Pais` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Telefone` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Total` decimal(65,30) NOT NULL DEFAULT '0.000000000000000000000000000000',
  `CustoEnvio` decimal(65,30) NOT NULL DEFAULT '0.000000000000000000000000000000',
  `MetodoEnvio` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`Id`),
  KEY `IX_Encomendas_UtilizadorId` (`UtilizadorId`),
  CONSTRAINT `FK_Encomendas_AspNetUsers_UtilizadorId` FOREIGN KEY (`UtilizadorId`) REFERENCES `AspNetUsers` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Encomendas`
--

LOCK TABLES `Encomendas` WRITE;
/*!40000 ALTER TABLE `Encomendas` DISABLE KEYS */;
INSERT INTO `Encomendas` VALUES (1,'2026-06-22 20:11:37.355801','Pendente','8fb8c95e-3603-46b7-92e0-75d412d88bad',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0.000000000000000000000000000000,0.000000000000000000000000000000,NULL),(2,'2026-06-22 20:15:01.479639','Pendente','8fb8c95e-3603-46b7-92e0-75d412d88bad',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0.000000000000000000000000000000,0.000000000000000000000000000000,NULL),(3,'2026-06-22 20:16:00.397983','Pendente','8fb8c95e-3603-46b7-92e0-75d412d88bad',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0.000000000000000000000000000000,0.000000000000000000000000000000,NULL);
/*!40000 ALTER TABLE `Encomendas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FotosProduto`
--

DROP TABLE IF EXISTS `FotosProduto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FotosProduto` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `CaminhoFicheiro` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Principal` tinyint(1) NOT NULL,
  `ProdutoId` int NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_FotosProduto_ProdutoId` (`ProdutoId`),
  CONSTRAINT `FK_FotosProduto_Produtos_ProdutoId` FOREIGN KEY (`ProdutoId`) REFERENCES `Produtos` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FotosProduto`
--

LOCK TABLES `FotosProduto` WRITE;
/*!40000 ALTER TABLE `FotosProduto` DISABLE KEYS */;
INSERT INTO `FotosProduto` VALUES (1,'/uploads/produtos/310f4b4f-d3b4-4680-86c5-9bbe597190c6.webp',1,2);
/*!40000 ALTER TABLE `FotosProduto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ItensEncomenda`
--

DROP TABLE IF EXISTS `ItensEncomenda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ItensEncomenda` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `EncomendaId` int NOT NULL,
  `ProdutoId` int NOT NULL,
  `Quantidade` int NOT NULL,
  `PrecoUnitario` decimal(65,30) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_ItensEncomenda_EncomendaId` (`EncomendaId`),
  KEY `IX_ItensEncomenda_ProdutoId` (`ProdutoId`),
  CONSTRAINT `FK_ItensEncomenda_Encomendas_EncomendaId` FOREIGN KEY (`EncomendaId`) REFERENCES `Encomendas` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_ItensEncomenda_Produtos_ProdutoId` FOREIGN KEY (`ProdutoId`) REFERENCES `Produtos` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ItensEncomenda`
--

LOCK TABLES `ItensEncomenda` WRITE;
/*!40000 ALTER TABLE `ItensEncomenda` DISABLE KEYS */;
INSERT INTO `ItensEncomenda` VALUES (1,3,2,1,74.900000000000000000000000000000);
/*!40000 ALTER TABLE `ItensEncomenda` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Produtos`
--

DROP TABLE IF EXISTS `Produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Produtos` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Nome` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Descricao` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Preco` decimal(65,30) NOT NULL,
  `Stock` int NOT NULL,
  `CategoriaId` int NOT NULL,
  `FotoUrl` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `PrecoOriginal` decimal(65,30) DEFAULT NULL,
  `Referencia` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Tag` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`Id`),
  KEY `IX_Produtos_CategoriaId` (`CategoriaId`),
  CONSTRAINT `FK_Produtos_Categorias_CategoriaId` FOREIGN KEY (`CategoriaId`) REFERENCES `Categorias` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Produtos`
--

LOCK TABLES `Produtos` WRITE;
/*!40000 ALTER TABLE `Produtos` DISABLE KEYS */;
INSERT INTO `Produtos` VALUES (2,'Sintesi','Papel de parede Sintesi',74.900000000000000000000000000000,80,1,NULL,NULL,NULL,NULL),(3,'Produto Teste 2','Descrição Teste',45.000000000000000000000000000000,50,1,NULL,NULL,'REF-002','new'),(4,'Produto Teste 3','Descrição Teste',89.000000000000000000000000000000,30,1,NULL,NULL,'REF-003','promo'),(5,'Produto Teste 4','Produto Teste',25.990000000000000000000000000000,100,2,NULL,NULL,'CAL-001',NULL);
/*!40000 ALTER TABLE `Produtos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `__EFMigrationsHistory`
--

DROP TABLE IF EXISTS `__EFMigrationsHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `__EFMigrationsHistory` (
  `MigrationId` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ProductVersion` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`MigrationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `__EFMigrationsHistory`
--

LOCK TABLES `__EFMigrationsHistory` WRITE;
/*!40000 ALTER TABLE `__EFMigrationsHistory` DISABLE KEYS */;
INSERT INTO `__EFMigrationsHistory` VALUES ('20260621142251_Inicial','9.0.9'),('20260626101642_AddNomeApelido','9.0.9'),('20260720203148_AdicionarCamposComecriais','9.0.9'),('20260725180914_AdicionarEmDestaqueCategorias','9.0.9'),('20260808140540_AdicionarCamposEncomenda','9.0.9'),('20260812201855_AdicionarCamposUtilizador','9.0.9'),('20260818191213_AdicionarAvaliacoes','9.0.9'),('20260823152507_AdicionarCamposEnvio','9.0.9');
/*!40000 ALTER TABLE `__EFMigrationsHistory` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-24 12:29:59
