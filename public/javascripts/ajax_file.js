/**
 * Created by lyy on 13-12-22.
 */
/*function ajax_fileToDb(filename) {
    $('#upBackInfo tbody').empty();
    $.ajax({
        type: "POST",
        url: "./fileToDb",
        timeout: 5000,
        data: {
            filename:filename
        },
        success: function(msg){
            if (msg.success == false){
                $('#fileUpInfo').text("导入失败！！！");
                $('#pInfo').text(msg.msg);
            }
            else{
                $('#fileUpInfo').text("导入成功！！！");
                $('#pInfo').text(msg.msg);
                var t = $('#upBackInfo tbody');
                for(var i = 0 ; i < msg.backInfo.length ; i ++ ){
                    var value = msg.backInfo[i];
                    t.append("<tr><td><span>第"+ value.row +"条记录："+ value.msg +"</span></td></tr>");
                }
                t.find("tr:odd").addClass("tEven");
            }
        },
        error: function (xmlHttpRequest, error){
            alert(error.toString());
            $('#fileUpInfo').text("导入失败！！！");
            $('#pInfo').text(error.toString());
        }
    });
};*/

function addDepartment(data, cb){
    $.ajax({
        method: 'POST',
        url: './addDepartment',
        data: data,
        success: function(msg){
            if (msg.success == false){
                cb(msg.data, msg) ;
            }
            else{
                cb(null, msg);
            }
        },
        error: function(xmlHttpRequest, err){
            cb(err.toString());
        }
    })
};
function addType(data, cb){
    $.ajax({
        method: 'POST',
        url: './addType',
        data: data,
        success: function(msg){
            if (msg.success == false){
                cb(msg.data, msg) ;
            }
            else{
                cb(null, msg);
            }
        },
        error: function(xmlHttpRequest, err){
            cb(err.toString());
        }
    })
};
function addMachine(data, cb){
    $.ajax({
        method: 'POST',
        url: './addMachine',
        data: data,
        success: function(msg){
            if (msg.success == false){
                cb(msg.data, msg) ;
            }
            else{
                cb(null, msg.data);
            }
        },
        error: function(xmlHttpRequest, err){
            cb(err.toString());
        }
    })
};
function getMachineInfo(data, cb){
    $.ajax({
        method: 'get',
        url: './getMachineInfoByBarcode',
        data: data,
        success: function(msg){
            if (msg.success == false){
                cb(msg.data, msg) ;
            }
            else{
                cb(null, msg.data);
            }
        },
        error: function(xmlHttpRequest, err){
            cb(err.toString());
        }
    })
};
function changeMachine(data, cb){
    $.ajax({
        method: 'post',
        url: './changeMachine',
        data: data,
        success: function(msg){
            if (msg.success == false){
                cb(msg.data, msg) ;
            }
            else{
                cb(null, msg.data);
            }
        },
        error: function(xmlHttpRequest, err){
            cb(err.toString());
        }
    })
};