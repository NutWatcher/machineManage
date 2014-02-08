/**
 * Created with JetBrains WebStorm.
 * User: yzjf
 * Date: 14-2-8
 * Time: 下午12:49
 * To change this template use File | Settings | File Templates.
 */

var baseDao = require('../dao/baseDao');
var log = require('../controllers/errLog');

exports.createDB = function (req, res) {
    baseDao.createTableDb(req.ip, function (err) {
        if (err) {
            log.error(err);
            res.json({"success": false, "data": "数据库出错！！！" + err.message});
        }
        else {
            res.send({"success": true, "data": "数据库已重置！！！"});
        }
    });

};
exports.dropDB = function (req, res) {
    baseDao.dropTableDb(req.ip, function (err) {
        if (err) {
            log.error(err);
            res.json({"success": false, "data": "数据库出错！！！" + err.message});
        }

        else {
            res.send({"success": true, "data": "数据库已删除！！！"});
        }
    });
};