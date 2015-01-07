/**
 * Module dependencies.
 */


var index = require('./controllers/index');
var view = require('./controllers/view')
    ,adminManage = require('./controllers/adminManage')
    ,c_machine = require('./controllers/C_machine')
    ,c_department = require('./controllers/C_department')
    ,c_type = require('./controllers/C_type');

module.exports = function (app) {
    // home page
    app.get('/', view.login);
    app.get('/login', view.userpage);
    //app.get('/', view.index);
    app.get('/report', view.report);
    app.get('/index', view.index);
    app.get('/admin', view.admin);
    app.get('/addMachine', view.addMachine);
    app.get('/manage', view.manage);
    app.get('/reportmanage', view.reportManage);

    app.get('/dropDatabase', adminManage.dropDB);
    app.get('/createDatabase', adminManage.createDB);

    app.get('/getMachineInfoByBarcode', c_machine.getInfoByBarcode);
    app.post('/addMachine', c_machine.addMachine);
    app.post('/changeMachine', c_machine.changeMachine);
    app.get('/getMachinesByTypeDepartment', c_machine.getMachinesByTypeDepartment);

    app.get('/getDepartment', c_department.getInfoAll);
    app.post('/getDepartmentById', c_department.getDepartmentById);
    app.post('/addDepartment', c_department.addDepartment);

    app.get('/getType', c_type.getInfoAll);
    app.post('/addType', c_type.addType);


};