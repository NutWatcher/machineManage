/**
 * Created with JetBrains WebStorm.
 * User: yzjf
 * Date: 14-1-28
 * Time: 下午2:36
 * To change this template use File | Settings | File Templates.
 */

exports.index = function(req, res){
    res.render('index', { title: '设备管理' });
};
exports.addMachine = function(req, res){
    res.render('addMachine', { title: '添加管理' });
};
exports.admin = function(req, res){
    res.render('admin', { title: '超级管理' });
};
exports.manage = function(req, res){
    res.render('manageMachine', { title: '超级管理' });
};