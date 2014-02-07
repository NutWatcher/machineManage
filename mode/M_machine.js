/**
 * Created by lyy on 14-2-7.
 */
function creatMachine() {
    this.id = null ;
    this.barCode = null ;
    this.typeName = null ;
    this.department = null ;
    this.record = [] ;

    this.drivers = new Array("Mike", "Sue");

    if (typeof creatMachine._initialized == "undefined") {

        creatMachine.prototype.showColor = function () {
            alert(this.color);
        };

        creatMachine._initialized = true;
    }
}
