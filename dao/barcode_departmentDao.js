/**
 * Created by lyy on 14-2-17.
 */
var baseDb = require('./baseDao');
exports.bindMachineDepartment = function (connection, machine, logInfo, cb) {
    var strSql = " INSERT INTO .`department_barcode` (`department_id`, `barcode_id`) VALUES ("+
        baseDb.escape(machine.department_id) +", "+
        baseDb.escape(machine.id) +");"
    baseDb.queryTransactions(connection, strSql, logInfo, function(err, rows) {
        if (err) {
            cb(err);
            return;
        }
        cb(err, machine);
    });
};