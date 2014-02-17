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
var moment = require('moment');
var log = require('./errLog');
var EventProxy = require('eventproxy');
exports.upMisc = function(req, res){

    machine = new m_machine.creatMachine() ;

};
exports.getInfoByBarcode = function(req, res){
    D_machine.getInfoByBarcode('%55', moment().format('YYYY-MM-DD HH:mm:ss.SSS') + ' IP:' + req.ip + ' ' , function(err, data){
        if (err){
            log.error(err);
            res.send({"success":false,"data":req.body.barcode + " 数据库查询出错！！！" + err.message });
        }
        else{
            res.send({"success":true,"data":data });
        }
    });
};
var addMachineBarcode = function(connection, machine, cb){
    D_machine.addMachineByTrans(connection, machine, moment().format('YYYY-MM-DD HH:mm:ss.SSS') + ' IP:' + req.ip + ' ',function(err, machine){
        cb(machine) ;
    });
};
exports.addMachine = function(req, res){
    var machine = new m_machine.creatMachine({
        "barCode":req.body.barcode,
        "misc":req.body.misc,
        "typeName_id":req.body.typeId,
        "department_id":req.body.departmentId
    }) ;
    D_base.beginTransactions(function(err, connection){
        //开始事务
        if (err){
            log.error(err);
            res.send({"success":false,"data":" 数据库链接出错！！！" + err.message });
            return ;
        }
        else{
            D_machine.addMachineByTrans(connection, machine, moment().format('YYYY-MM-DD HH:mm:ss.SSS') + ' IP:' + req.ip + ' ',function(err, machine){
                if (err) {
                    log.error(err);
                    res.send({"success":false,"data":" 数据库出错！！！" + err.message });
                    connection.rollback(function() {
                        D_base.endTransactions(connection);//结束事务
                    });
                    return ;
                }
                else{
                    var ep = new EventProxy();
                    ep.all('data1', 'data2', function (tpl, data) {
                        // 成功回调
                        connection.commit(function(err) {
                            if (err) {
                                log.error(err);
                                res.send({"success":false,"data":" 数据库出错！！！" + err.message });
                                connection.rollback(function() {
                                    D_base.endTransactions(connection);//结束事务
                                });
                            }
                            ///do something
                            log..info(moment().format('YYYY-MM-DD HH:mm:ss.SSS') + ' IP:' + req.ip + 'commit');
                            res.send({"success":true,"data":" 增加成功！！！"});
                            D_base.endTransactions(connection);//结束事务
                        });
                    });
                    // error handler
                    ep.fail(function (err) {
                        log.error(err);
                        res.send({"success":false,"data":" 数据库出错！！！" + err.message });
                        connection.rollback(function() {
                            D_base.endTransactions(connection);//结束事务
                        });
                    });
                    D_barcode_type.bindMachineType(connection, machine,
                        moment().format('YYYY-MM-DD HH:mm:ss.SSS') + ' IP:' + req.ip + ' ', ep.done('data1'));
                    D_barcode_department.bindMachineDepartment(connection, machine,
                        moment().format('YYYY-MM-DD HH:mm:ss.SSS') + ' IP:' + req.ip + ' ', ep.done('data2'));
                }
            });
        }
    });
};