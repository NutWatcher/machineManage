/**
 * Created with JetBrains WebStorm.
 * User: yzjf
 * Date: 14-2-12
 * Time: 下午4:36
 * To change this template use File | Settings | File Templates.
 */

var baseDb = require('./baseDao');
var m_department = require('../mode/M_department');

exports.getInfoAll = function (logInfo, cb) {
    var strSql = "SELECT " +
        "a.idmachinebarcode id, " +
        "    a.machinemsic msic, "+
        "    a.machinebarcode barcode, " +
        "    b1.department_id, " +
        "    b2.departmentname, " +
        "    c1.type_id, " +
        "    c2.typename " +
        "FROM  " +
        "machinebarcode a " +
        "left join " +
        "department_barcode b1 ON a.idmachinebarcode = b1.barcode_id " +
        "left join " +
        "department b2 ON b2.iddepartment = b1.department_id " +
        "left join " +
        "barcode_type c1 ON a.idmachinebarcode = c1.barcode_id " +
        "left join " +
        "machinetype c2 ON c2.idmachinetype = c1.type_id " +
        "where " +
        "a.machinebarcode like " + baseDb.escape(barcode) + ";"
    baseDb.queryDb(strSql, logInfo, function(err, rows) {
        if (err) {
            cb(err);
            return;
        }
        var re = [];
        for (var  i = 0 ; i < rows.length ; i ++){
            re.push(new m_machine.creatMachine(rows[i]));
        }
        cb(err, re);
    });
}