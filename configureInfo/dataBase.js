/**
 * Created by lyy on 14-2-16.
 */
exports.dataBase = {
    "config": {
        "host": "localhost",
        "port": "3306",
        "database": "",
        "multipleStatements": "true",
        "user": "root",
        "password": "root"
    },
    "dataTable": {
        "name": "machinemanage",
        "create": "create database if not exists `machinemanage` DEFAULT CHARACTER SET utf8 ;"
    },
    "table": {
        "create" : "CREATE TABLE if not exists `machinetype` (                "+
            "    `idmachinetype` INT NOT NULL AUTO_INCREMENT,                        "+
            "    `typename` VARCHAR(45) NULL,                                        "+
            "    PRIMARY KEY (`idmachinetype`),                                      "+
            "    UNIQUE INDEX `typename_UNIQUE` (`idmachinetype` ASC)                "+
            ");                                                                      " +
            "CREATE TABLE if not exists `department` (                 "+
            "    `iddepartment` INT NOT NULL AUTO_INCREMENT,                         "+
            "    `departmentname` VARCHAR(45) NULL,                                  "+
            "    PRIMARY KEY (`iddepartment`),                                       "+
            "    UNIQUE INDEX `departmentname_UNIQUE` (`departmentname` ASC)           "+
            ");                                                                      "+
            "CREATE TABLE if not exists `machinebarcode` (             "+
            "    `idmachinebarcode` INT NOT NULL AUTO_INCREMENT,                     "+
            "    `machinebarcode` varchar(45) NOT NULL,                              "+
            "    `machinemsic` varchar(255) DEFAULT NULL,                            "+
            "    PRIMARY KEY (`idmachinebarcode`),                                   "+
            "    UNIQUE INDEX `machinebarcode_UNIQUE` (`machinebarcode` ASC)       "+
            ");                                                                      "+
            "CREATE  TABLE if not exists `department_barcode` (                  "+
            "  `iddepartment_barcode` INT NOT NULL AUTO_INCREMENT ,                "+
            "  `department_id` INT NOT NULL ,                                      "+
            "  `barcode_id` INT NOT NULL ,                                         "+
            "  PRIMARY KEY (`iddepartment_barcode`) ,                              "+
            "  UNIQUE INDEX `barcode_id_UNIQUE` (`barcode_id` ASC) ,               "+
            "  INDEX `department_barcode-departmnet_idx` (`department_id` ASC) ,   "+
            "  CONSTRAINT `department_barcode-barcode`                             "+
            "    FOREIGN KEY (`barcode_id` )                                       "+
            "    REFERENCES `machinebarcode` (`idmachinebarcode` ) "+
            "    ON DELETE NO ACTION                                               "+
            "    ON UPDATE NO ACTION,                                              "+
            "  CONSTRAINT `department_barcode-departmnet`                          "+
            "    FOREIGN KEY (`department_id` )                                    "+
            "    REFERENCES `department` (`iddepartment` )         "+
            "    ON DELETE NO ACTION                                               "+
            "    ON UPDATE NO ACTION);                                             "+
            "CREATE TABLE if not exists `operatestatus` (              "+
            "    `idoperatestatus` INT NOT NULL AUTO_INCREMENT,                      "+
            "    `operatestatusname` VARCHAR(45) NULL,                               "+
            "    PRIMARY KEY (`idoperatestatus`),                                    "+
            "    UNIQUE INDEX `operatestatusname_UNIQUE` (`idoperatestatus` ASC)     "+
            ");                                                                      "+
            "CREATE  TABLE if not exists `barcode_type` (                     "+
            "`idbarcode_type` INT NOT NULL AUTO_INCREMENT , "+
            "`barcode_id` INT NOT NULL , "+
            "`type_id` INT NOT NULL , "+
            "    PRIMARY KEY (`idbarcode_type`) , "+
            "UNIQUE INDEX `barcode_id_UNIQUE` (`barcode_id` ASC) , "+
            "INDEX `barcode_type-type_idx` (`type_id` ASC) , "+
            "CONSTRAINT `barcode_type-barcode` "+
            "FOREIGN KEY (`barcode_id` ) "+
            "REFERENCES `machinebarcode` (`idmachinebarcode` ) "+
            "ON DELETE NO ACTION "+
            "ON UPDATE NO ACTION, "+
            "    CONSTRAINT `barcode_type-type` "+
            "FOREIGN KEY (`type_id` ) "+
            "REFERENCES `machinetype` (`idmachinetype` ) "+
            "ON DELETE NO ACTION "+
            "ON UPDATE NO ACTION);"+

            "CREATE TABLE `recordhistory` (                                         "+
            "    `idrecordhistory` INT NOT NULL AUTO_INCREMENT,                     "+
            "    `barcode_id` INT NOT NULL,                                         "+
            "    `department_id` INT NOT NULL,                                      "+
            "    `type_id` INT NOT NULL,                                            "+
            "    `misc` varchar(255) DEFAULT NULL,                                     "+
            "    `recordhistorytime` DATETIME NOT NULL,                                  "+
            "    PRIMARY KEY (`idrecordhistory`),                                   "+
            "    UNIQUE INDEX `idrecordhistory_UNIQUE` (`idrecordhistory` ASC),     "+
            "    INDEX `recordhistory-barcode_idx` (`barcode_id` ASC),              "+
            "    INDEX `recordhistory-department_idx` (`department_id` ASC),        "+
            "    INDEX `recordhistory-type_idx` (`type_id` ASC),                    "+
            "    CONSTRAINT `recordhistory-barcode` FOREIGN KEY (`barcode_id`)      "+
            "        REFERENCES `machinebarcode` (`idmachinebarcode`)               "+
            "        ON DELETE NO ACTION ON UPDATE NO ACTION,                       "+
            "    CONSTRAINT `recordhistory-department` FOREIGN KEY (`department_id`)"+
            "        REFERENCES `department` (`iddepartment`)                       "+
            "        ON DELETE NO ACTION ON UPDATE NO ACTION,                       "+
            "    CONSTRAINT `recordhistory-type` FOREIGN KEY (`type_id`)            "+
            "        REFERENCES `machinetype` (`idmachinetype`)                     "+
            "        ON DELETE NO ACTION ON UPDATE NO ACTION                        "+
            ");",
        "drop" :"ff"
    }
}