/**
 * Created by lyy on 14-2-17.
 */
function createType(data) {
    if (typeof data =="undefined"){
        data={};
    }
    this.id = data.id||null;
    this.name = data.typename||null;

    if (typeof createType._initialized == "undefined") {
        createType.prototype.commitToDB = function () {
            var newData = this.getNewData() ;
            if ( newData.misc != this.misc ){
                this.updataMisc(this.id, newData.misc) ;
            }
            alert(this.color);
        };
        createType.prototype.getInfo = function () {
            var newData = this.getNewData() ;
            if ( newData.misc != this.misc ){
                this.updataMisc(this.id, newData.misc) ;
            }
            alert(this.color);
        };

        createType._initialized = true;
    };
};
exports.createType = createType ;