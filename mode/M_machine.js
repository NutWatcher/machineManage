/**
 * Created by lyy on 14-2-7.
 */

var machineDB = require('../dao/machineDao');

var creatMachine = function (data) {
    if (typeof data == "undefined") {
        data = {};
    }
    this.id = data.id || null;
    this.barCode = data.barcode || null;
    this.misc = data.misc || null;
    this.typeName = data.typename || null;
    this.typeName_id = data.type_id || null;
    this.department = data.departmentname || null;
    this.department_id = data.department_id || null;

    if (typeof creatMachine._initialized == "undefined") {

        creatMachine.prototype.isSame = function (t_machine, cb) {
            if (typeof t_machine != "object") {
                return false;
            }
            if (t_machine.id != this.id ||
                t_machine.barCode != this.barCode ||
                t_machine.misc != this.misc ||
                t_machine.typeName_id != this.typeName_id ||
                t_machine.department_id != this.department_id
                ) {
                return false;
            }
            return true ;
        };
        creatMachine.prototype.updataDepartment = function (id, departmentId) {
            machineDB.updataDepartment(id, departmentId);
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
            var newData = this.getNewData();
            if (newData.misc != this.misc) {
                this.updataMisc(this.id, newData.misc);
            }
            alert(this.color);
        };
        creatMachine.prototype.getInfo = function () {
            var newData = this.getNewData();
            if (newData.misc != this.misc) {
                this.updataMisc(this.id, newData.misc);
            }
            alert(this.color);
        };

        creatMachine._initialized = true;
    }
    ;
}
exports.creatMachine = creatMachine;