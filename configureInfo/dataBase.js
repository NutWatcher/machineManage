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
            "    UNIQUE INDEX `machinebarcode_UNIQUE` (`idmachinebarcode` ASC)       "+
            ");                                                                      "+
            "CREATE TABLE if not exists `department_barcode` (         "+
            "    `iddepartment_barcode` INT NOT NULL AUTO_INCREMENT,                 "+
            "    `department_id` INT NOT NULL,                                       "+
            "    `barcode_id` INT NOT NULL,                                          "+
            "    PRIMARY KEY (`iddepartment_barcode`),                               "+
            "    UNIQUE INDEX `barcode_id_UNIQUE` (`iddepartment_barcode` ASC)       "+
            ");                                                                      "+
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

            "CREATE TABLE if not exists `recordhistory` (              "+
            "    `idrecordhistory` INT NOT NULL AUTO_INCREMENT,                      "+
            "    `barcode_id` INT NOT NULL,                                          "+
            "    `department_id` INT NOT NULL,                                       "+
            "    `recordhistorytime` DATETIME NOT NULL,                              "+
            "    PRIMARY KEY (`idrecordhistory`),                                    "+
            "    INDEX `department_idx` (`department_id` ASC),                       "+
            "    INDEX `barcode_idx` (`idrecordhistory` ASC),                        "+
            "    CONSTRAINT `barcode` FOREIGN KEY (`barcode_id`)                     "+
            "        REFERENCES `machinemanage`.`machinebarcode` (`idmachinebarcode`)"+
            "        ON DELETE NO ACTION ON UPDATE NO ACTION,                        "+
            "    CONSTRAINT `department` FOREIGN KEY (`department_id`)               "+
            "        REFERENCES `machinemanage`.`department` (`iddepartment`)        "+
            "        ON DELETE NO ACTION ON UPDATE NO ACTION                         "+
            ");",
        "drop" :"ff"
    }
}