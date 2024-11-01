-- Adminer 4.8.1 MySQL 8.0.27 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `connect_4_connection_request`;
CREATE TABLE `connect_4_connection_request` (
  `connectionID` int NOT NULL AUTO_INCREMENT,
  `userCreated` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `userRequested` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`connectionID`)
  -- FOREIGN KEY (`userCreated`) REFERENCES `connect_4_user`(`username_c4`),
  -- FOREIGN KEY (`userRequested`) REFERENCES `connect_4_user`(`username_c4`)
);


DROP TABLE IF EXISTS `connect_4_current_games`;
CREATE TABLE `connect_4_current_games` (
  `gameId` int NOT NULL AUTO_INCREMENT,
  `playerPink` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `playerYellow` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `turn` int NOT NULL,
  `winner` int NOT NULL,
  `gameboard` json NOT NULL
  PRIMARY KEY (`gameId`)
  -- FOREIGN KEY (`playerPink`) REFERENCES `connect_4_user`(`username_c4`),
  -- FOREIGN KEY (`playerYellow`) REFERENCES `connect_4_user`(`username_c4`)
);


DROP TABLE IF EXISTS `connect_4_game_message`;
CREATE TABLE `connect_4_game_message` (
  `messageId` int NOT NULL AUTO_INCREMENT,
  `timestamp` datetime NOT NULL,
  `gameId` int NOT NULL,
  `user` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `message` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`messageId`)
  -- FOREIGN KEY (`user`) REFERENCES `connect_4_user`(`username_c4`)
);


DROP TABLE IF EXISTS `connect_4_lobby_message`;
CREATE TABLE `connect_4_lobby_message` (
  `messageId` int NOT NULL AUTO_INCREMENT,
  `timestamp` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `user` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `message` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`messageId`)
  -- FOREIGN KEY (`user`) REFERENCES `connect_4_user`(`username_c4`)
);


DROP TABLE IF EXISTS `connect_4_user`;
CREATE TABLE `connect_4_user` (
  `username` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `inLobby` tinyint NOT NULL,
  PRIMARY KEY (`username_c4`)
);

DROP TABLE IF EXISTS `connect_4_registration_tokens`;
CREATE TABLE `connect_4_registration_tokens` (
  `token` varchar(100) NOT NULL,
  PRIMARY KEY (`token`)
);

-- 2024-10-07 16:08:41