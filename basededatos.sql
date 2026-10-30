-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`DESBLOQUEO`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`DESBLOQUEO` ;

CREATE TABLE IF NOT EXISTS `mydb`.`DESBLOQUEO` (
  `ID_Desbloqueo` INT NOT NULL AUTO_INCREMENT,
  `Código_Desbloqueo` VARCHAR(45) NOT NULL,
  `Fecha_Envio` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID_Desbloqueo`),
  UNIQUE INDEX `ID_Desbloqueo_UNIQUE` (`ID_Desbloqueo` ASC) VISIBLE,
  UNIQUE INDEX `Código_Desbloqueo_UNIQUE` (`Código_Desbloqueo` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`NETBOOK`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`NETBOOK` ;

CREATE TABLE IF NOT EXISTS `mydb`.`NETBOOK` (
  `ID_Netbook` INT NOT NULL,
  `Código_Hardware` VARCHAR(45) NOT NULL,
  `Estado` VARCHAR(45) NOT NULL,
  `DESBLOQUEO_ID_Desbloqueo` INT NOT NULL,
  PRIMARY KEY (`ID_Netbook`, `DESBLOQUEO_ID_Desbloqueo`),
  UNIQUE INDEX `ID_Netbook_UNIQUE` (`ID_Netbook` ASC) VISIBLE,
  UNIQUE INDEX `Código_Hardware_UNIQUE` (`Código_Hardware` ASC) VISIBLE,
  INDEX `fk_NETBOOK_DESBLOQUEO1_idx` (`DESBLOQUEO_ID_Desbloqueo` ASC) VISIBLE,
  CONSTRAINT `fk_NETBOOK_DESBLOQUEO1`
    FOREIGN KEY (`DESBLOQUEO_ID_Desbloqueo`)
    REFERENCES `mydb`.`DESBLOQUEO` (`ID_Desbloqueo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`SOLICITUD_NUEVA_NOTEBOOK`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`SOLICITUD_NUEVA_NOTEBOOK` ;

CREATE TABLE IF NOT EXISTS `mydb`.`SOLICITUD_NUEVA_NOTEBOOK` (
  `ID_Solicitud` INT UNSIGNED NOT NULL,
  `Motivo` VARCHAR(45) NOT NULL,
  `Descripción` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID_Solicitud`),
  UNIQUE INDEX `ID_Solicitud_UNIQUE` (`ID_Solicitud` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`SOLICITUD`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`SOLICITUD` ;

CREATE TABLE IF NOT EXISTS `mydb`.`SOLICITUD` (
  `ID_Solucitud` INT NOT NULL AUTO_INCREMENT,
  `Tipo` VARCHAR(45) NOT NULL,
  `Fecha` VARCHAR(45) NOT NULL,
  `Estado` VARCHAR(45) NOT NULL,
  `SOLICITUD_NUEVA_NOTEBOOK_ID_Solicitud` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`ID_Solucitud`, `SOLICITUD_NUEVA_NOTEBOOK_ID_Solicitud`),
  UNIQUE INDEX `ID_Solucitud_UNIQUE` (`ID_Solucitud` ASC) VISIBLE,
  INDEX `fk_SOLICITUD_SOLICITUD_NUEVA_NOTEBOOK1_idx` (`SOLICITUD_NUEVA_NOTEBOOK_ID_Solicitud` ASC) VISIBLE,
  CONSTRAINT `fk_SOLICITUD_SOLICITUD_NUEVA_NOTEBOOK1`
    FOREIGN KEY (`SOLICITUD_NUEVA_NOTEBOOK_ID_Solicitud`)
    REFERENCES `mydb`.`SOLICITUD_NUEVA_NOTEBOOK` (`ID_Solicitud`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`CERTIFICADO`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`CERTIFICADO` ;

CREATE TABLE IF NOT EXISTS `mydb`.`CERTIFICADO` (
  `ID_Certificado` INT NOT NULL,
  `Archivo` VARCHAR(45) NOT NULL,
  `Fecha_Subida` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID_Certificado`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`ALUMNO`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`ALUMNO` ;

CREATE TABLE IF NOT EXISTS `mydb`.`ALUMNO` (
  `DNI` INT NOT NULL,
  `Nombre` VARCHAR(45) NOT NULL,
  `Apellido` VARCHAR(45) NOT NULL,
  `Curso` VARCHAR(45) NOT NULL,
  `Año` VARCHAR(45) NOT NULL,
  `Email` VARCHAR(45) NOT NULL,
  `NETBOOK_ID_Netbook` INT NOT NULL,
  `SOLICITUD_ID_Solucitud` INT NOT NULL,
  `CERTIFICADO_ID_Certificado` INT NOT NULL,
  PRIMARY KEY (`DNI`, `NETBOOK_ID_Netbook`, `SOLICITUD_ID_Solucitud`, `CERTIFICADO_ID_Certificado`),
  UNIQUE INDEX `DNI_UNIQUE` (`DNI` ASC) VISIBLE,
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC) VISIBLE,
  INDEX `fk_ALUMNO_NETBOOK1_idx` (`NETBOOK_ID_Netbook` ASC) VISIBLE,
  INDEX `fk_ALUMNO_SOLICITUD1_idx` (`SOLICITUD_ID_Solucitud` ASC) VISIBLE,
  INDEX `fk_ALUMNO_CERTIFICADO1_idx` (`CERTIFICADO_ID_Certificado` ASC) VISIBLE,
  CONSTRAINT `fk_ALUMNO_NETBOOK1`
    FOREIGN KEY (`NETBOOK_ID_Netbook`)
    REFERENCES `mydb`.`NETBOOK` (`ID_Netbook`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ALUMNO_SOLICITUD1`
    FOREIGN KEY (`SOLICITUD_ID_Solucitud`)
    REFERENCES `mydb`.`SOLICITUD` (`ID_Solucitud`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ALUMNO_CERTIFICADO1`
    FOREIGN KEY (`CERTIFICADO_ID_Certificado`)
    REFERENCES `mydb`.`CERTIFICADO` (`ID_Certificado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`ADMINISTRADOR`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`ADMINISTRADOR` ;

CREATE TABLE IF NOT EXISTS `mydb`.`ADMINISTRADOR` (
  `ID_Admin` INT NOT NULL,
  `Nombre` VARCHAR(45) NOT NULL,
  `Apellido` VARCHAR(45) NOT NULL,
  `Email` VARCHAR(45) NOT NULL,
  `Contraseña` VARCHAR(45) NOT NULL,
  `ALUMNO_DNI` INT NOT NULL,
  PRIMARY KEY (`ID_Admin`, `ALUMNO_DNI`),
  UNIQUE INDEX `ID_Admin_UNIQUE` (`ID_Admin` ASC) VISIBLE,
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC) VISIBLE,
  UNIQUE INDEX `Contraseña_UNIQUE` (`Contraseña` ASC) VISIBLE,
  INDEX `fk_ADMINISTRADOR_ALUMNO1_idx` (`ALUMNO_DNI` ASC) VISIBLE,
  CONSTRAINT `fk_ADMINISTRADOR_ALUMNO1`
    FOREIGN KEY (`ALUMNO_DNI`)
    REFERENCES `mydb`.`ALUMNO` (`DNI`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
