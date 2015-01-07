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
exports.addDepartment = function(req, res){
    d_department.insert(req.body.name ,moment().format('YYYY-MM-DD HH:mm:ss.SSS') + ' IP:' + req.ip + ' ' , function(err, data){
        if (err){
            log.error(err);
            res.send({"success":false,"data":" 数据库出错！！！" + err.message });
        }
        else{
            for (var i = 0 ; i < data.length ; i ++){
                data[i].reg = 1 ;
            }
            res.send({"success":true,"data":data });
        }
    });
}
exports.getDepartmentById = function(req, res){
    d_department.getDepartmentById(req.body.id, moment().format('YYYY-MM-DD HH:mm:ss.SSS') + ' IP:' + req.ip + ' ' , function(err, data){
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
