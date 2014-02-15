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
    var strSql = "SELECT iddepartment id , departmentname FROM machinemanage.department;"
    baseDb.queryDb(strSql, logInfo, function(err, rows) {
        if (err) {
            cb(err);
            return;
        }
        var re = [];
        for (var  i = 0 ; i < rows.length ; i ++){
            re.push(new m_department.creatDepartment(rows[i]));
        }
        cb(err, re);
    });
}