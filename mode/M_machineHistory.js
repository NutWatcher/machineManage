/**
 * Created with JetBrains WebStorm.
 * User: yzjf
 * Date: 14-2-21
 * Time: 下午2:00
 * To change this template use File | Settings | File Templates.
 */

var m_machine = require('../mode/M_machine');

var creatMachineHistory = function(data) {
    if (typeof data == "undefined"){
        data = {};
    }

    this.machine = new m_machine.creatMachine(data);
    this.date = data.date||null;

    if (typeof creatMachineHistory._initialized == "undefined") {

        creatMachineHistory._initialized = true;
    };
}
exports.creatMachineHistory = creatMachineHistory ;