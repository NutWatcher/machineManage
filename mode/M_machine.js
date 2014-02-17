/**
 * Created by lyy on 14-2-7.
 */

var machineDB = require('../dao/machineDao') ;

var creatMachine = function(data) {
    if (typeof data == "undefined"){
        data = {};
    }
    this.id = data.id||null;
    this.barCode = data.barcode||null;
    this.misc = data.msic||null;
    this.typeName = data.typename||null;
    this.typeName_id = data.type_id||null;
    this.department = data.departmentname||null;
    this.department_id = data.department_id||null;

    if (typeof creatMachine._initialized == "undefined") {

        creatMachine.prototype.updataMisc = function (misc, cb) {
            machineDB.updataMisc(this, misc, cb);
        };
        creatMachine.prototype.updataDepartment = function (id, departmentId) {
            machineDB.updataDepartment(id,  departmentId);
        };
        creatMachine.prototype.updataMisc = function (id, misc) {
            machineDB.updataMisc(id, msic);
        };
        creatMachine.prototype.updataInfo = function () {
            alert(this.color);
        };

        creatMachine.prototype.changeDepartment = function (newDepartment) {
            newData.department
        };

        creatMachine.prototype.getRecord = function () {

        };

        creatMachine.prototype.commitToDB = function () {
            var newData = this.getNewData() ;
            if ( newData.misc != this.misc ){
                this.updataMisc(this.id, newData.misc) ;
            }
            alert(this.color);
        };
        creatMachine.prototype.getInfo = function () {
            var newData = this.getNewData() ;
            if ( newData.misc != this.misc ){
                this.updataMisc(this.id, newData.misc) ;
            }
            alert(this.color);
        };

        creatMachine._initialized = true;
    };
}
exports.creatMachine = creatMachine ;