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
    var serialize = function(obj, opts){
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
                    str += "<button value='"+ opts.data[j].id +"'>" + opts.data[j].name + "</button>" ;
                }
            }
            str += "</div>" ;
            $(obj).append(str);
        }
        $(obj).tabs({
            event: opts.event || "mouseover",
            heightStyle: opts.heightStyle || "fill"
        });
        $(obj).find('button').button();
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
        opts.content = opt.content || ['<button style="margin: 5px;">名字</button><button style="margin: 5px;">名字</button>','dfg'] ;
        opts.id = obj.id || 'myTabs' + (myTabsId++) ;
        if ( opt.remote == 'true'){
            $.ajax({
                type:"GET",
                url:opt.url,
                success: function(msg){
                    if ( msg.success != true ){
                        $("#pInfo").text(msg.data);
                    }
                    else{
                        opts.data = msg.data ;
                        serialize(obj, opts);
                    }
                },
                error :function (XMLHttpRequest, textStatus) {
                    $("#pInfo").text(textStatus.toString());
                }
            })
        }
        else{
            serialize(obj, opts);
        }
    };
    var reFresh = function(obj){
        var opts = {}
            , count = 0
            , str ;
        opts.height = opt.height || 'auto' ;
        opts.width = opt.width || 'auto' ;
        opts.titles = opt.titles || ['title1','dfg'] ;
        opts.content = opt.content || ['<button style="margin: 5px;">名字3</button><button style="margin: 5px;">名4字</button>','dfg'] ;
        opts.id = obj.id || 'myTabs' + myTabsId ++ ;

        $(obj).find('ul').empty();
        $(obj).find('div').remove();
        str = "";
        for ( var i = 0 ; i < opts.titles.length ; i ++ ){
            str += " <li><a href='#" +opts.id+ "-" +i+ "'>"+opts.titles[i]+"</a></li>" ;
        }

        $(obj).find('ul').append(str);
        for ( var i = 0 ; i < opts.content.length ; i ++ ){
            $(obj).append("<div id='" +opts.id+ "-" +i+ "'>" + opts.content[i] + "</div>");
        }
        $(obj).tabs("refresh");
    };

    if ( method == "creat" ){
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