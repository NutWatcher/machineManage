/**
 * Created by lyy on 14-2-7.
 */

var machineDB = require('../dao/machineDao') ;

var creatMachine = function(data) {
    if (data === undefined){}
    this.id = data?data.id:null;
    this.barCode = data?data.barcode:null;
    this.misc = data?data.msic:null;
    this.typeName = data?data.typename:null;
    this.typeName_id = data?data.type_id:null;
    this.department = data?data.departmentname:null;
    this.department_id = data?data.department_id:null;

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