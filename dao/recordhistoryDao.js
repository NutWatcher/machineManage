/**
 * Created with JetBrains WebStorm.
 * User: yzjf
 * Date: 14-2-18
 * Time: 下午12:39
 * To change this template use File | Settings | File Templates.
 */
var baseDb = require('./baseDao');
var moment = require('moment');
var m_machineHistory = require('../mode/M_machineHistory');
exports.insertRecord = function (connection, machine, logInfo, cb) {
    var strSql = "INSERT INTO `recordhistory` (`barcode_id`, `department_id`, `type_id`, `misc`, `recordhistorytime` ) VALUES ("+
        baseDb.escape(machine.id) +", "+
        baseDb.escape(machine.department_id) +", "+
        baseDb.escape(machine.typeName_id) +", "+
        baseDb.escape(machine.misc) +", "+
        baseDb.escape(moment().format('YYYY-MM-DD HH:mm:ss.SSS')) +");"
    baseDb.queryTransactions(connection, strSql, logInfo, function(err, rows) {
        if (err) {
            cb(err);
            return;
        }
        cb(err, machine);
    });
};

exports.getInfoByBarcode = function (barcode, logInfo, cb) {
    var strSql = "SELECT                                                "+
        "a.barcode_id id,                                                   "+
        "    b.machinebarcode barcode,                                      "+
        "    a.misc misc,                                            "+
        "    a.department_id,                                               "+
        "    c.departmentname,                                              "+
        "    a.type_id,                                                     "+
        "    d.typename,                                                    "+
        "    a.recordhistorytime date                                       "+
        "FROM                                                               "+
        "recordhistory a                                                    "+
        "left join                                                          "+
        "machinebarcode b ON a.barcode_id = b.idmachinebarcode               "+
        "left join                                                           "+
        "department c ON a.department_id = c.iddepartment                    "+
        "left join                                                           "+
        "machinetype d ON a.type_id = d.idmachinetype                        "+
        "where                                                               "+
        "b.machinebarcode = " +  baseDb.escape(barcode) + " order by date desc;";
    baseDb.queryDb(strSql, logInfo, function(err, rows) {
        if (err) {
            cb(err);
            return;
        }
        var re = [];
        for (var  i = 0 ; i < rows.length ; i ++){
            rows[i].date = moment(rows[i].date).format("YYYY-MM-DD \n HH:mm:ss");
            re.push(new m_machineHistory.creatMachineHistory(rows[i]));
        }
        cb(err, re);
    });
}