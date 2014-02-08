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
function creatDepartment() {
    var newData = {};
    newData.id = null;
    newData.name = null;

    this.id = null;
    this.name = null;

    this.getNewData = function(){
        return newData ;
    }
    this.setNewData = function(attribute, value){
        newData[attribute] = value ;
    }

    if (typeof creatDepartment._initialized == "undefined") {

        creatDepartment.prototype.updataName = function (id, name) {
            machineDB.updataMisc(id, name);
        };
        creatDepartment.prototype.changeName = function (newName) {
            this.setNewData('name', newName) ;
        };
        creatDepartment.prototype.addDepartment = function (name) {
            machineDB.updataMisc(id, name);
        };
        creatDepartment.prototype.commitToDB = function () {
            var newData = this.getNewData() ;
            if (this.id == null && newData.name != null){
                this.addDepartment(newData.name) ;
            }
            else if ( newData.name != this.name ){
                this.updataName(this.id, newData.name) ;
            }
        };

        creatDepartment._initialized = true;
    }
}