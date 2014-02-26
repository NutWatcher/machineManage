/**
 * Created by lyy on 14-2-17.
 */
var baseDb = require('./baseDao');
exports.bindMachineType = function (connection, machine, logInfo, cb) {
    var strSql = "INSERT INTO `barcode_type` (`barcode_id`, `type_id`) VALUES ("+
        baseDb.escape(machine.id) +", "+
        baseDb.escape(machine.typeName_id) +");"
    baseDb.queryTransactions(connection, strSql, logInfo, function(err, rows) {
        if (err) {
            cb(err);
            return;
        }
        cb(err, machine);
    });
};
exports.changeMachineType = function (connection, machine, logInfo, cb) {
    var strSql = "UPDATE  `barcode_type` SET `type_id`= "+
        baseDb.escape(machine.typeName_id) +" WHERE `barcode_id`="+
        baseDb.escape(machine.id)+"; ";
    baseDb.queryTransactions(connection, strSql, logInfo, function(err, rows) {
        if (err) {
            cb(err);
            return;
        }
        cb(err, machine);
    });
};
