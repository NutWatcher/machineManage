/**
 * Created by lyy on 14-2-7.
 */

var machineDB = require('../dao/machineDao') ;
function creatMachine() {
    var newData = {};
    newData.id = null;
    newData.barCode = null;
    newData.misc = null;
    newData.typeName = null;
    newData.department = null;

    this.id = null;
    this.misc = null;
    this.barCode = null;
    this.typeName = null;
    this.department = null;

    this.getNewData = function(){
        return newData ;
    }

    if (typeof creatMachine._initialized == "undefined") {

        creatMachine.prototype.updataMisc = function (id, misc) {
            machineDB.updataMisc(id, misc);
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

        creatMachine._initialized = true;
    }
}