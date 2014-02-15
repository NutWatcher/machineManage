/**
 * Module dependencies.
 */


var index = require('./controllers/index');
var view = require('./controllers/view')
    ,adminManage = require('./controllers/adminManage')
    ,c_machine = require('./controllers/C_machine')
    ,c_department = require('./controllers/C_department');

module.exports = function (app) {
    // home page
    app.get('/', view.index);
    app.get('/index', view.index);
    app.get('/admin', view.admin);
    app.get('/addMachine', view.addMachine);

    app.get('/dropDatabase', adminManage.dropDB);
    app.get('/createDatabase', adminManage.createDB);

    app.get('/getMachineInfoByBarcode', c_machine.getInfoByBarcode);

    app.get('/getDepartment', c_department.getInfoAll);

};