/**
 * Created with JetBrains WebStorm.
 * User: yzjf
 * Date: 14-2-12
 * Time: 下午12:10
 * To change this template use File | Settings | File Templates.
 */

var D_machine = require('../dao/machineDao');
var D_base = require('../dao/baseDao');
var D_barcode_type = require('../dao/barcode_typeDao');
var D_barcode_department = require('../dao/barcode_departmentDao');
var D_recordhistory = require('../dao/recordhistoryDao');
var m_machine = require('../mode/M_machine');
var moment = require('moment');
var log = require('./errLog');
var EventProxy = require('eventproxy');
exports.upMisc = function (req, res) {

    machine = new m_machine.creatMachine();

};
exports.getMachinesByTypeDepartment = function(req, res){
    D_machine.getInfoByTypeDepartment(req.query.typeId, req.query.departmentId, moment().format('YYYY-MM-DD HH:mm:ss.SSS') + ' IP:' + req.ip + ' ', function (err, data) {
        if (err) {
            log.error(err);
            res.send({"success": false, "data": req.body.barcode + " 数据库查询出错！！！" + err.message });
        }
        else {
            res.send({"success": true, "data": data });
        }
    });
};
exports.getInfoByBarcode = function (req, res) {
    D_machine.getInfoByBarcode(req.query.barcode, moment().format('YYYY-MM-DD HH:mm:ss.SSS') + ' IP:' + req.ip + ' ', function (err, dataInfo) {
        if (err) {
            log.error(err);
            res.send({"success": false, "data": req.body.barcode + " 数据库查询出错！！！" + err.message });
        }
        else {
            D_recordhistory.getInfoByBarcode(req.query.barcode, moment().format('YYYY-MM-DD HH:mm:ss.SSS') + ' IP:' + req.ip + ' ', function (err, data) {
                if (err) {
                    log.error(err);
                    res.send({"success": false, "data": req.body.barcode + " 数据库查询出错！！！" + err.message });
                }
                else {
                    res.send({"success": true, "data": {"info": dataInfo, "records": data} });
                }
            });
        }
    });
};
exports.changeMachine = function (req, res) {
    var machine = new m_machine.creatMachine({
        "barcode": req.body.barcode.trim(),
        "misc": req.body.misc,
        "type_id": req.body.typeId,
        "department_id": req.body.departmentId,
        "misc": req.body.misc
    });

    var epGetInfo = new EventProxy();
    var epGetTrans = new EventProxy();
    var bindMachineDepartment = new EventProxy();

    epGetInfo.fail(function (err) {
        log.error(err);
        res.send({"success": false, "data": req.body.barcode + " 数据库查询出错！！！" + err.message });
    });
    epGetTrans.fail(function (err) {
        log.error(err);
        res.send({"success": false, "data": " 数据库链接出错！！！" + err.message });
    });
    bindMachineDepartment.fail(function (err) {
        log.error(err);
        res.send({"success": false, "data": " 数据库出错！！！" + err.message });
        err.myConnection.rollback(function () {
            D_base.endTransactions(err.myConnection);//结束事务
        });
    });

    epGetInfo.all('dataInfo', function (dataInfo) {
        if (dataInfo.length == 0) {
            res.send({"success": true, "data": ""});
            return;
        }
        else if (machine.isSame(dataInfo[0]) == true) {
            res.send({"success": false, "data": req.body.barcode + " 无此设备！！！"});
            return;
        }
        machine.id = dataInfo[0].id ;
        D_base.beginTransactions(epGetTrans.done('connection'));
    });
    epGetTrans.all('connection', function (connection) {
        D_recordhistory.insertRecord(connection, machine, moment().format('YYYY-MM-DD HH:mm:ss.SSS') + ' IP:' + req.ip + ' ', function (err, machine){
            if (err){
                err.myConnection = connection ;
                return bindMachineDepartment.emit('error', err);
            }
            else{
                bindMachineDepartment.emit("connection", connection);
            }
        });
    });
    bindMachineDepartment.all('connection', function (connection) {
        var ep = new EventProxy();
        ep.all('data1', 'data2', 'data3', function (data1, data2, data3) {
            connection.commit(function (err) {
                if (err) {
                    log.error(err);
                    res.send({"success": false, "data": " 数据库出错！！！" + err.message });
                    connection.rollback(function () {
                        D_base.endTransactions(connection);//结束事务
                    });
                }
                log.info(moment().format('YYYY-MM-DD HH:mm:ss.SSS') + ' IP:' + req.ip + 'commit');
                res.send({"success": true, "data": " 增加成功！！！"});
                D_base.endTransactions(connection);//结束事务
            });
        });
        ep.fail(function (err) {
            log.error(err);
            res.send({"success": false, "data": " 数据库出错！！！" + err.message });
            connection.rollback(function () {
                D_base.endTransactions(connection);//结束事务
            });
        });
        D_barcode_type.changeMachineType(connection, machine,
            moment().format('YYYY-MM-DD HH:mm:ss.SSS') + ' IP:' + req.ip + ' ', ep.done('data1'));
        D_barcode_department.changeMachineDepartment(connection, machine,
            moment().format('YYYY-MM-DD HH:mm:ss.SSS') + ' IP:' + req.ip + ' ', ep.done('data2'));
        D_machine.changeMachinemisc(connection, machine,
            moment().format('YYYY-MM-DD HH:mm:ss.SSS') + ' IP:' + req.ip + ' ', ep.done('data3'));
    });
    D_machine.getInfoByBarcode(machine.barCode, moment().format('YYYY-MM-DD HH:mm:ss.SSS') + ' IP:' + req.ip + ' ',epGetInfo.done('dataInfo') );


    /*D_machine.getInfoByBarcode(machine.barcode, moment().format('YYYY-MM-DD HH:mm:ss.SSS') + ' IP:' + req.ip + ' ', function (err, dataInfo) {
        if (err) {
            log.error(err);
            res.send({"success": false, "data": req.body.barcode + " 数据库查询出错！！！" + err.message });
        }
        else {
            if (dataInfo.length == 0) {
                res.send({"success": true, "data": ""});
                return;
            }
            else if (machine.isSame(dataInfo[0]) == true) {
                res.send({"success": false, "data": req.body.barcode + " 无此设备！！！"});
            }
            D_base.beginTransactions(function (err, connection) {
                //开始事务
                if (err) {
                    log.error(err);
                    res.send({"success": false, "data": " 数据库链接出错！！！" + err.message });
                    return;
                }
                else {
                    D_recordhistory.bindMachineDepartment(connection, machine, moment().format('YYYY-MM-DD HH:mm:ss.SSS') + ' IP:' + req.ip + ' ', function (err, machine) {
                        if (err) {
                            log.error(err);
                            res.send({"success": false, "data": " 数据库出错！！！" + err.message });
                            connection.rollback(function () {
                                D_base.endTransactions(connection);//结束事务
                            });
                            return;
                        }
                        else {
                            var ep = new EventProxy();
                            ep.all('data1', 'data2', 'data3', function (tpl, data) {
                                // 成功回调
                                connection.commit(function (err) {
                                    if (err) {
                                        log.error(err);
                                        res.send({"success": false, "data": " 数据库出错！！！" + err.message });
                                        connection.rollback(function () {
                                            D_base.endTransactions(connection);//结束事务
                                        });
                                    }
                                    ///do something
                                    log.info(moment().format('YYYY-MM-DD HH:mm:ss.SSS') + ' IP:' + req.ip + 'commit');
                                    res.send({"success": true, "data": " 增加成功！！！"});
                                    D_base.endTransactions(connection);//结束事务
                                });
                            });
                            // error handler
                            ep.fail(function (err) {
                                log.error(err);
                                res.send({"success": false, "data": " 数据库出错！！！" + err.message });
                                connection.rollback(function () {
                                    D_base.endTransactions(connection);//结束事务
                                });
                            });
                            D_barcode_type.changeMachineType(connection, machine,
                                moment().format('YYYY-MM-DD HH:mm:ss.SSS') + ' IP:' + req.ip + ' ', ep.done('data1'));
                            D_barcode_department.bindMachineDepartment(connection, machine,
                                moment().format('YYYY-MM-DD HH:mm:ss.SSS') + ' IP:' + req.ip + ' ', ep.done('data2'));
                            D_barcode_department.changeMachineDepartment(connection, machine,
                                moment().format('YYYY-MM-DD HH:mm:ss.SSS') + ' IP:' + req.ip + ' ', ep.done('data2'));
                        }
                    });
                }
            });
        }
    }); */
};
exports.addMachine = function (req, res) {
    var machine = new m_machine.creatMachine({
        "barcode": req.body.barcode.trim(),
        "misc": req.body.misc,
        "type_id": req.body.typeId,
        "department_id": req.body.departmentId,
        "misc": req.body.misc
    });
    D_base.beginTransactions(function (err, connection) {
        //开始事务
        if (err) {
            log.error(err);
            res.send({"success": false, "data": " 数据库链接出错！！！" + err.message });
            return;
        }
        else {
            D_machine.addMachineByTrans(connection, machine, moment().format('YYYY-MM-DD HH:mm:ss.SSS') + ' IP:' + req.ip + ' ', function (err, machine) {
                if (err) {
                    log.error(err);
                    res.send({"success": false, "data": " 数据库出错！！！" + err.message });
                    connection.rollback(function () {
                        D_base.endTransactions(connection);//结束事务
                    });
                    return;
                }
                else {
                    var ep = new EventProxy();
                    ep.all('data1', 'data2', 'data3', function (tpl, data) {
                        // 成功回调
                        connection.commit(function (err) {
                            if (err) {
                                log.error(err);
                                res.send({"success": false, "data": " 数据库出错！！！" + err.message });
                                connection.rollback(function () {
                                    D_base.endTransactions(connection);//结束事务
                                });
                            }
                            ///do something
                            log.info(moment().format('YYYY-MM-DD HH:mm:ss.SSS') + ' IP:' + req.ip + 'commit');
                            res.send({"success": true, "data": " 增加成功！！！"});
                            D_base.endTransactions(connection);//结束事务
                        });
                    });
                    // error handler
                    ep.fail(function (err) {
                        log.error(err);
                        res.send({"success": false, "data": " 数据库出错！！！" + err.message });
                        connection.rollback(function () {
                            D_base.endTransactions(connection);//结束事务
                        });
                    });
                    D_barcode_type.bindMachineType(connection, machine,
                        moment().format('YYYY-MM-DD HH:mm:ss.SSS') + ' IP:' + req.ip + ' ', ep.done('data1'));
                    D_barcode_department.bindMachineDepartment(connection, machine,
                        moment().format('YYYY-MM-DD HH:mm:ss.SSS') + ' IP:' + req.ip + ' ', ep.done('data2'));
                    D_recordhistory.insertRecord(connection, machine,
                        moment().format('YYYY-MM-DD HH:mm:ss.SSS') + ' IP:' + req.ip + ' ', ep.done('data3'));
                }
            });
        }
    });
};