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
-- Table `address`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `address` ;

CREATE TABLE IF NOT EXISTS `address` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `street1` VARCHAR(100) NULL,
  `street2` VARCHAR(100) NULL,
  `city` VARCHAR(100) NULL,
  `state_province` VARCHAR(50) NOT NULL,
  `postal_code` VARCHAR(16) NULL,
  `country_code` VARCHAR(3) NOT NULL,
  `enabled` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `event`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `event` ;

CREATE TABLE IF NOT EXISTS `event` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `address_id` INT NULL,
  `name` VARCHAR(100) NOT NULL,
  `description` TEXT NULL,
  `start_date` DATE NOT NULL,
  `end_date` DATE NULL,
  `start_time` TIME NOT NULL,
  `end_time` TIME NULL,
  `capacity` INT NULL,
  `img_url` VARCHAR(5000) NULL,
  `created_on` DATETIME NOT NULL,
  `updated_on` DATETIME NULL,
  `enabled` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  INDEX `fk_event_address_idx` (`address_id` ASC),
  CONSTRAINT `fk_event_address`
    FOREIGN KEY (`address_id`)
    REFERENCES `address` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `stage`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stage` ;

CREATE TABLE IF NOT EXISTS `stage` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `event_id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_stage_event1_idx` (`event_id` ASC),
  CONSTRAINT `fk_stage_event1`
    FOREIGN KEY (`event_id`)
    REFERENCES `event` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `artist`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `artist` ;

CREATE TABLE IF NOT EXISTS `artist` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `stage_id` INT NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `bio` TEXT NULL,
  `set_time` TIME NULL,
  `img_url` VARCHAR(5000) NULL,
  `enabled` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  INDEX `fk_dj_stage1_idx` (`stage_id` ASC),
  CONSTRAINT `fk_dj_stage1`
    FOREIGN KEY (`stage_id`)
    REFERENCES `stage` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
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
-- Table `genre`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `genre` ;

CREATE TABLE IF NOT EXISTS `genre` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `subgenre` VARCHAR(45) NULL,
  `description` TEXT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `artist_of_genre`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `artist_of_genre` ;

CREATE TABLE IF NOT EXISTS `artist_of_genre` (
  `genre_id` INT NOT NULL,
  `dj_id` INT NOT NULL,
  PRIMARY KEY (`genre_id`, `dj_id`),
  INDEX `fk_genre_has_dj_dj1_idx` (`dj_id` ASC),
  INDEX `fk_genre_has_dj_genre1_idx` (`genre_id` ASC),
  CONSTRAINT `fk_genre_has_dj_genre1`
    FOREIGN KEY (`genre_id`)
    REFERENCES `genre` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_genre_has_dj_dj1`
    FOREIGN KEY (`dj_id`)
    REFERENCES `artist` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
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
-- Data for table `address`
-- -----------------------------------------------------
START TRANSACTION;
USE `trackerdb`;
INSERT INTO `address` (`id`, `street1`, `street2`, `city`, `state_province`, `postal_code`, `country_code`, `enabled`) VALUES (1, '945 Bryan Ct', NULL, 'Silverton', 'Oregon', '97381', 'USA', 1);
INSERT INTO `address` (`id`, `street1`, `street2`, `city`, `state_province`, `postal_code`, `country_code`, `enabled`) VALUES (2, 'Milovice Airfield', NULL, 'Milovice', 'Nymburk', '289 25', 'CZE', 1);
INSERT INTO `address` (`id`, `street1`, `street2`, `city`, `state_province`, `postal_code`, `country_code`, `enabled`) VALUES (3, 'Wagenweg 16', NULL, 'Oudkarspel', 'North Holland', '1724 PT', 'NLD', 1);
INSERT INTO `address` (`id`, `street1`, `street2`, `city`, `state_province`, `postal_code`, `country_code`, `enabled`) VALUES (4, 'Schijnpoortweg 119', NULL, 'Antwerp', 'Antwerp', '2170', 'BEL', 1);
INSERT INTO `address` (`id`, `street1`, `street2`, `city`, `state_province`, `postal_code`, `country_code`, `enabled`) VALUES (5, 'Lijnbaansgracht 234A', NULL, 'Amsterdam', 'North Holland', '1017 PH', 'NLD', 1);
INSERT INTO `address` (`id`, `street1`, `street2`, `city`, `state_province`, `postal_code`, `country_code`, `enabled`) VALUES (6, 'Pernerova 51', NULL, 'Prague', 'Prague', '186 00', 'CZE', 1);
INSERT INTO `address` (`id`, `street1`, `street2`, `city`, `state_province`, `postal_code`, `country_code`, `enabled`) VALUES (7, 'Petrica Glava 34', NULL, 'Tisno', 'Sibensko-kninska zupanija', '22240', 'HRV', 1);
INSERT INTO `address` (`id`, `street1`, `street2`, `city`, `state_province`, `postal_code`, `country_code`, `enabled`) VALUES (8, 'Matterly Estate', NULL, 'Temple Valley', 'Hampshire', 'SO21 1HW', 'GBR', 1);
INSERT INTO `address` (`id`, `street1`, `street2`, `city`, `state_province`, `postal_code`, `country_code`, `enabled`) VALUES (9, 'Endymion Road', NULL, 'London', 'Greater London', 'N4 1EE', 'GBR', 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `event`
-- -----------------------------------------------------
START TRANSACTION;
USE `trackerdb`;
INSERT INTO `event` (`id`, `address_id`, `name`, `description`, `start_date`, `end_date`, `start_time`, `end_time`, `capacity`, `img_url`, `created_on`, `updated_on`, `enabled`) VALUES (1, 1, 'test', 'test data', '2020-06-05', NULL, '17:00:00', NULL, NULL, NULL, '2020-06-05 17:00:00', NULL, 1);
INSERT INTO `event` (`id`, `address_id`, `name`, `description`, `start_date`, `end_date`, `start_time`, `end_time`, `capacity`, `img_url`, `created_on`, `updated_on`, `enabled`) VALUES (2, 2, 'Let It Roll Summer', 'The world\'s largest open air Drum & Bass festival, held in the Czech Republic.', '2021-08-05', '2020-08-07', '18:00:00', NULL, NULL, 'https://vps.letitroll.eu/wp-content/uploads/2017/12/letitroll2.png', '2020-06-05-17:00:00', NULL, 1);
INSERT INTO `event` (`id`, `address_id`, `name`, `description`, `start_date`, `end_date`, `start_time`, `end_time`, `capacity`, `img_url`, `created_on`, `updated_on`, `enabled`) VALUES (3, 3, 'Liquicity', 'An annual Dutch Drum & Bass festival hosted by Maduk.', '2021-07-16', '2021-07-18', '12:00:00', NULL, NULL, 'https://festival.liquicity.com/wp-content/uploads/2020/04/LF2021emblem.png', '2020-06-05-17:00:00', NULL, 1);
INSERT INTO `event` (`id`, `address_id`, `name`, `description`, `start_date`, `end_date`, `start_time`, `end_time`, `capacity`, `img_url`, `created_on`, `updated_on`, `enabled`) VALUES (4, 4, 'Rampage', 'A huge Drum & Bass and Dubstep festival held each year in the Belgian city of Antwerp.', '2021-09-18', '2021-09-19', '13:00:00', NULL, NULL, 'https://www.rampage.eu/2019/lay/140320/logo-rampage-new-date-100pxh.png', '2020-06-05-17:00:00', NULL, 1);
INSERT INTO `event` (`id`, `address_id`, `name`, `description`, `start_date`, `end_date`, `start_time`, `end_time`, `capacity`, `img_url`, `created_on`, `updated_on`, `enabled`) VALUES (5, 5, 'Innovation In The Dam', 'The original weekender Drum & Bass event in Amsterdam. Taking over Amsterdam\'s superclubs for 3 days of raving.', '2020-11-27', '2020-11-29', '18:00:00', NULL, NULL, 'https://innovationevents.co.uk/wp-content/uploads/2020/02/ITD20-SaveTheDateWeb.jpg', '2020-06-05-17:00:00', NULL, 1);
INSERT INTO `event` (`id`, `address_id`, `name`, `description`, `start_date`, `end_date`, `start_time`, `end_time`, `capacity`, `img_url`, `created_on`, `updated_on`, `enabled`) VALUES (6, 6, 'Let It Roll Winter', 'The smaller, indoor edition of the famous Let It Roll, held in the winter.', '2020-02-28', '2020-02-29', '19:00:00', NULL, NULL, 'https://letitroll.eu/wp-content/uploads/2019/10/WEBFLYER.jpg', '2020-06-06-17:00:00', NULL, 1);
INSERT INTO `event` (`id`, `address_id`, `name`, `description`, `start_date`, `end_date`, `start_time`, `end_time`, `capacity`, `img_url`, `created_on`, `updated_on`, `enabled`) VALUES (7, 7, 'Hospitality On The Beach', 'Following on from launching new festivals in London over the last couple of years, the legendary label and brand have since headed abroad. The destination: the famous resort and festival hotspot of The Garden, Tisno. And they\'re not doing it alone, taking the likes of Sun & Bass, Shogun Audio, EXIT Records and Gimme Five with them.', '2021-07-08', '2021-07-12', '12:00:00', NULL, NULL, 'https://static1.squarespace.com/static/5a16be382278e73e3d5685dd/t/5eaa875f46dc317f01375ae6/1588238923155/?format=1500w', '2020-06-06-17:00:00', NULL, 1);
INSERT INTO `event` (`id`, `address_id`, `name`, `description`, `start_date`, `end_date`, `start_time`, `end_time`, `capacity`, `img_url`, `created_on`, `updated_on`, `enabled`) VALUES (8, 8, 'Boomtown', 'Boomtown is a fictitious city set within an alternative world, populated with a plethora of curious characters roaming the streets and guiding the citizens through the labyrinth of adventures waiting to be discovered. Each chapter delves even further into the mythology of Boomtown, with endless stories for you to be part of and make your very own.', '2021-08-11', '2021-08-15', '09:00:00', NULL, NULL, 'https://www.boomtownfair.co.uk/img/splash/foreground-2020-v1.png', '2020-06-06-17:00:00', NULL, 1);
INSERT INTO `event` (`id`, `address_id`, `name`, `description`, `start_date`, `end_date`, `start_time`, `end_time`, `capacity`, `img_url`, `created_on`, `updated_on`, `enabled`) VALUES (9, 9, 'Hospitality In The Park', 'From the team behind legendary label Hospital Records and its event brand Hospitality, this festival is the UK\'s first outdoor event dedicated solely to drum and bass.', '2020-09-19', NULL, '10:00:00', NULL, NULL, 'https://media.resources.festicket.com/image/262x370/center/middle/filters:quality(70)/www/photos/4138-_poster.jpg', '2020-06-06-17:00:00', NULL, 1);
INSERT INTO `event` (`id`, `address_id`, `name`, `description`, `start_date`, `end_date`, `start_time`, `end_time`, `capacity`, `img_url`, `created_on`, `updated_on`, `enabled`) VALUES (10, 7, 'Outlook Origins', NULL, '2021-07-29', '2021-08-02', '18:00:00', NULL, NULL, 'https://static1.squarespace.com/static/5e26c9500380c52e91a7906e/t/5eab1fc6c4e3715560c375d1/1591279993393/?format=1500w', '2020-06-06-17:00:00', NULL, 1);

COMMIT;

