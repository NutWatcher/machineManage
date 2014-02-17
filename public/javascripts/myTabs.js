/**
 * Created with JetBrains WebStorm.
 * User: yzjf
 * Date: 14-1-25
 * Time: 下午6:43
 * To change this template use File | Settings | File Templates.
 */

jQuery.fn.myTabs = function(  method, opt ){
    if ( "undefined" == typeof myTabsId){
        myTabsId = 1 ;
    }
    var parseToString = function (o){
        var str = "";
        if(typeof o == "string" || o == null) {
            return '"' + o + '"';
        }
        if(typeof o == "object"){
            if(!o.sort){
                str ="{"
                for(var i in o){
                    str += '"'+ i +'":' ;
                    str += parseToString(o[i]) ;
                    str += "," ;
                }
                str = str.slice(0,str.length-1) + "}";
            }else{
                str ="["
                for(var i in o){
                    str += parseToString(o[i]) ;
                    str += "," ;
                }
                str = str.slice(0,str.length-1) + "]";
            }
            return str;
        }
        return o.toString();
    }
    var serialize = function(obj, opts, cb){
        var str , reg , r_min , r_max ;
        str = " <ul> ";
        for ( var i = 0 ; i < opts.titles.length ; i ++ ){
            str += " <li><a href='#" +opts.id+ "-" +i+ "'>"+opts.titles[i].text+"</a></li>" ;
        }
        str += " </ul>";
        $(obj).append(str);

        for ( var i = 0 ; i < opts.titles.length ; i ++ ){
            reg = opts.titles[i].reg ;
            r_min = parseInt(reg.split(',')[0]) ;
            r_max = parseInt(reg.split(',')[1]) ;
            str = "<div id='" +opts.id+ "-" +i+ "'>" ;
            for ( var j = 0 ; j < opts.data.length ; j ++ ){
                if ( opts.data[j].reg >= r_min && opts.data[j].reg <= r_max ){
                    str += "<button class='myTabs_button' value='"+ opts.data[j].id +"'>" + opts.data[j].name + "</button>" ;
                }
            }
            str += "</div>" ;
            $(obj).append(str);
        }
        var opts_temp = {};
        opts_temp.data=opts.data;
        opts_temp.buttonClick=opts.buttonClick;

        opts.data="";
        opts.buttonClick="";
        $(obj).attr('buttonClick',parseToString(opts_temp.buttonClick));
        $(obj).attr('myTabsData',parseToString(opts));

        opts.buttonClick= opts_temp.buttonClick;
        opts.data= opts_temp.data;
        cb(obj, opts);
    }
    var create = function(obj){
        var opts = {}
            , count = 0
            , str ;
        opts.event = opts.event || "mouseover",
        opts.heightStyle = opt.heightStyle || "fill",
        opts.height = opt.height || 'auto' ;
        opts.width = opt.width || 'auto' ;
        opts.titles = opt.titles || [{"text":"全部","reg":"0,60"}] ;
        opts.id = obj.id || 'myTabs' + (myTabsId++) ;
        opts.url = opt.url || "" ;
        opts.remote = opt.remote || false ;
        opts.buttonClick = opt.buttonClick || function(){} ;
        if ( opts.remote == true){
            $.ajax({
                type:"GET",
                url:opts.url,
                success: function(msg){
                    if ( msg.success != true ){
                        $("#pInfo").text(msg.data);
                    }
                    else{
                        opts.data = msg.data ;
                        serialize(obj, opts, function(obj, opts){
                            $(obj).tabs({
                                event: opts.event || "mouseover",
                                heightStyle: opts.heightStyle || "fill"
                            });
                            $(obj).find('button').button().on('click',opts.buttonClick);
                        });
                    }
                },
                error :function (XMLHttpRequest, textStatus, errorThrown) {
                    $("#pInfo").text(opts.url + "  " +textStatus.toString());
                }
            })
        }
        else{
            serialize(obj, opts);
        }
    };
    var reFresh = function(obj){
        var opts = $.parseJSON($(obj).attr('myTabsData'))
            , count = 0
            , str ;

        $(obj).empty();
        eval("opts.buttonClick=" + $(obj).attr('buttonClick'));
        if ( opts.remote == true){
            $.ajax({
                type:"GET",
                url:opts.url,
                success: function(msg){
                    if ( msg.success != true ){
                        $("#pInfo").text(msg.data);
                    }
                    else{
                        opts.data = msg.data ;
                        serialize(obj, opts, function(obj, opts){
                            $(obj).tabs("refresh");
                            $(obj).find('button').button().on('click',opts.buttonClick);;
                        });
                    }
                },
                error :function (XMLHttpRequest, textStatus) {
                    $("#pInfo").text(opts.url + "  " +textStatus.toString());
                }
            })
        }
        else{
            serialize(obj, opts);
        }
    };

    if ( method == "create" ){
        $(this).each(function(){
            create(this);
        });
    }
    else if ( method == "reFresh" ){
        $(this).each(function(){
            reFresh(this);
        });
    }
};