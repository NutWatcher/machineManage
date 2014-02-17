/**
 * Created by lyy on 14-2-17.
 */
var baseDb = require('./baseDao');
var m_type = require('../mode/M_type');

exports.getInfoAll = function (logInfo, cb) {
    var strSql = "SELECT idmachinetype id, typename FROM machinetype;"
    baseDb.queryDb(strSql, logInfo, function(err, rows) {
        if (err) {
            cb(err);
            return;
        }
        var re = [];
        for (var  i = 0 ; i < rows.length ; i ++){
            re.push(new m_type.createType(rows[i]));
        }
        cb(err, re);
    });
};
exports.insert = function (typetName, logInfo, cb) {
    var strSql = "INSERT INTO `machinetype` (`typename`) VALUES ("+ baseDb.escape(typetName) +");"
    baseDb.queryDb(strSql, logInfo, function(err, rows) {
        if (err) {
            cb(err);
            return;
        }
        cb(err, rows);
    });
};