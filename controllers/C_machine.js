/**
 * Created with JetBrains WebStorm.
 * User: yzjf
 * Date: 14-2-12
 * Time: 下午12:10
 * To change this template use File | Settings | File Templates.
 */

var D_machine = require('../dao/machineDao');
var moment = require('moment');
exports.upMisc = function(req, res){

    machine = new m_machine.creatMachine() ;

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