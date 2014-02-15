/**
 * Created with JetBrains WebStorm.
 * User: yzjf
 * Date: 14-2-15
 * Time: 下午4:01
 * To change this template use File | Settings | File Templates.
 */
var d_department = require('../dao/departmentDao');
var moment = require('moment');
var log = require('./errLog');
exports.upMisc = function(req, res){

    machine = new m_machine.creatMachine() ;

};
exports.getInfoAll = function(req, res){
    d_department.getInfoAll(moment().format('YYYY-MM-DD HH:mm:ss.SSS') + ' IP:' + req.ip + ' ' , function(err, data){
        if (err){
            log.error(err);
            res.send({"success":false,"data":" 数据库查询出错！！！" + err.message });
        }
        else{
            for (var i = 0 ; i < data.length ; i ++){
                data[i].reg = 1 ;
            }
            res.send({"success":true,"data":data });
        }
    });
}
exports.getInfoByBarcode = function(req, res){

    D_machine.getInfoByBarcode('%55', moment().format('YYYY-MM-DD HH:mm:ss.SSS') + ' IP:' + req.ip + ' ' , function(err, data){
        if (err){
            log.error(err);
            res.send({"success":false,"data":req.body.barcode + " 数据库查询出错！！！" + err.message });
        }
        else{
            res.send({"success":true,"data":data });
        }
    })
}