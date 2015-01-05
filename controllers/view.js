/**
 * Created with JetBrains WebStorm.
 * User: yzjf
 * Date: 14-1-28
 * Time: 下午2:36
 * To change this template use File | Settings | File Templates.
 */
exports.login = function(req, res){
    res.render('login', { title: '嘉兴邮政设备管理系统' });
};
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
exports.reportManage = function(req, res){
    res.render('reportManage', { title: '超级管理' });
};
exports.report = function(req, res){
    res.render('report', { title: '上报报告单' });
};