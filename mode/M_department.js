/**
 * Created with JetBrains WebStorm.
 * User: yzjf
 * Date: 14-2-8
 * Time: 下午5:30
 * To change this template use File | Settings | File Templates.
 */
/**
 * Created by lyy on 14-2-7.
 */

var machineDB = require('../dao/machineDao') ;
function creatDepartment(data) {
    if (typeof data =="undefined"){
        data={};
    }
    this.id = data.id||null;
    this.name = data.departmentname||null;

    if (typeof creatDepartment._initialized == "undefined") {

        creatDepartment.prototype.updataMisc = function (misc, cb) {
            machineDB.updataMisc(this, misc, cb);
        };


        creatDepartment.prototype.commitToDB = function () {
            var newData = this.getNewData() ;
            if ( newData.misc != this.misc ){
                this.updataMisc(this.id, newData.misc) ;
            }
            alert(this.color);
        };
        creatDepartment.prototype.getInfo = function () {
            var newData = this.getNewData() ;
            if ( newData.misc != this.misc ){
                this.updataMisc(this.id, newData.misc) ;
            }
            alert(this.color);
        };

        creatDepartment._initialized = true;
    };
};
exports.creatDepartment = creatDepartment ;