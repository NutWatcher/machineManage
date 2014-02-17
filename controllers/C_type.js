/**
 * Created by lyy on 14-2-17.
 */
var d_type = require('../dao/typeDao');
var moment = require('moment');
var log = require('./errLog');
exports.upMisc = function(req, res){

    machine = new m_machine.creatMachine() ;

};
exports.getInfoAll = function(req, res){
    d_type.getInfoAll(moment().format('YYYY-MM-DD HH:mm:ss.SSS') + ' IP:' + req.ip + ' ' , function(err, data){
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
exports.addType = function(req, res){
    d_type.insert(req.body.name ,moment().format('YYYY-MM-DD HH:mm:ss.SSS') + ' IP:' + req.ip + ' ' , function(err, data){
        if (err){
            log.error(err);
            res.send({"success":false,"data":" 数据库出错！！！" + err.message });
        }
        else{
            res.send({"success":true,"data":data });
        }
    });
}
