/**
 * Created with JetBrains WebStorm.
 * User: yzjf
 * Date: 14-2-18
 * Time: 下午12:39
 * To change this template use File | Settings | File Templates.
 */
var baseDb = require('./baseDao');
var moment = require('moment');
exports.bindMachineDepartment = function (connection, machine, logInfo, cb) {
    var strSql = "INSERT INTO `machinemanage`.`recordhistory` (`barcode_id`, `department_id`, `type_id`, `recordhistorytime`) VALUES ("+
        baseDb.escape(machine.id) +", "+
        baseDb.escape(machine.department_id) +", "+
        baseDb.escape(machine.typeName_id) +", "+
        baseDb.escape(moment().format('YYYY-MM-DD HH:mm:ss.SSS')) +");"
    baseDb.queryTransactions(connection, strSql, logInfo, function(err, rows) {
        if (err) {
            cb(err);
            return;
        }
        cb(err, machine);
    });
};