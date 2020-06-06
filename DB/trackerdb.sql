-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema trackerdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `trackerdb` ;

-- -----------------------------------------------------
-- Schema trackerdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `trackerdb` DEFAULT CHARACTER SET utf8 ;
USE `trackerdb` ;

-- -----------------------------------------------------
-- Table `event`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `event` ;

CREATE TABLE IF NOT EXISTS `event` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `description` TEXT NULL,
  `start_date` DATE NOT NULL,
  `end_date` DATE NULL,
  `start_time` TIME NOT NULL,
  `end_time` TIME NULL,
  `img_url` VARCHAR(5000) NULL,
  `created_on` DATETIME NOT NULL,
  `updated_on` DATETIME NULL,
  `enabled` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dj`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dj` ;

CREATE TABLE IF NOT EXISTS `dj` (
  `id` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `address`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `address` ;

CREATE TABLE IF NOT EXISTS `address` (
  `id` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `account`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `account` ;

CREATE TABLE IF NOT EXISTS `account` (
  `id` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `comment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `comment` ;

CREATE TABLE IF NOT EXISTS `comment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `stage`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stage` ;

CREATE TABLE IF NOT EXISTS `stage` (
  `id` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `set`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `set` ;

CREATE TABLE IF NOT EXISTS `set` (
  `id` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `subgenre`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `subgenre` ;

CREATE TABLE IF NOT EXISTS `subgenre` (
  `id` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS junglist@localhost;
SET SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';
CREATE USER 'junglist'@'localhost' IDENTIFIED BY 'bigup';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'junglist'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `event`
-- -----------------------------------------------------
START TRANSACTION;
USE `trackerdb`;
INSERT INTO `event` (`id`, `name`, `description`, `start_date`, `end_date`, `start_time`, `end_time`, `img_url`, `created_on`, `updated_on`, `enabled`) VALUES (1, 'test', 'test data', '2020-06-05', NULL, '17:00:00', NULL, NULL, '2020-06-05 17:00:00', NULL, 1);
INSERT INTO `event` (`id`, `name`, `description`, `start_date`, `end_date`, `start_time`, `end_time`, `img_url`, `created_on`, `updated_on`, `enabled`) VALUES (2, 'Let It Roll', 'The world\'s largest Drum & Bass festival.', '2021-08-05', '2020-08-07', '18:00:00', NULL, 'https://vps.letitroll.eu/wp-content/uploads/2017/12/letitroll2.png', '2020-06-05-17:00:00', NULL, 1);
INSERT INTO `event` (`id`, `name`, `description`, `start_date`, `end_date`, `start_time`, `end_time`, `img_url`, `created_on`, `updated_on`, `enabled`) VALUES (3, 'Liquicity', 'An annual Dutch Drum & Bass festival hosted by Maduk.', '2021-07-16', '2021-07-18', '12:00:00', NULL, 'https://festival.liquicity.com/wp-content/uploads/2020/04/LF2021emblem.png', '2020-06-05-17:00:00', NULL, 1);
INSERT INTO `event` (`id`, `name`, `description`, `start_date`, `end_date`, `start_time`, `end_time`, `img_url`, `created_on`, `updated_on`, `enabled`) VALUES (4, 'Rampage', 'A huge Drum & Bass and Dubstep festival held each year in the Belgian city of Antwerp.', '2021-09-18', '2021-09-19', '13:00:00', NULL, 'https://www.rampage.eu/2019/lay/140320/logo-rampage-new-date-100pxh.png', '2020-06-05-17:00:00', NULL, 1);
INSERT INTO `event` (`id`, `name`, `description`, `start_date`, `end_date`, `start_time`, `end_time`, `img_url`, `created_on`, `updated_on`, `enabled`) VALUES (5, 'Innovation In The Dam', 'The original weekender Drum & Bass event in Amsterdam. Taking over Amsterdam\'s superclubs for 3 days of raving.', '2020-11-27', '2020-11-29', '18:00:00', NULL, 'https://innovationevents.co.uk/wp-content/uploads/2020/02/ITD20-SaveTheDateWeb.jpg', '2020-06-05-17:00:00', NULL, 1);

COMMIT;

