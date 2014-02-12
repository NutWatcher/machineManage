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
    var create = function(obj){
        var opts = {}
            , count = 0
            , str ;
        opts.height = opt.height || 'auto' ;
        opts.width = opt.width || 'auto' ;
        opts.titles = opt.titles || ['title1','dfg'] ;
        opts.content = opt.content || ['<button style="margin: 5px;">名字</button><button style="margin: 5px;">名字</button>','dfg'] ;
        opts.id = obj.id || 'myTabs' + myTabsId ++ ;

        str = " <ul> ";
        for ( var i = 0 ; i < opts.titles.length ; i ++ ){
            str += " <li><a href='#" +opts.id+ "-" +i+ "'>"+opts.titles[i]+"</a></li>" ;
        }
        str += " </ul>";

        $(obj).append(str);
        for ( var i = 0 ; i < opts.content.length ; i ++ ){
            $(obj).append("<div id='" +opts.id+ "-" +i+ "'>" + opts.content[i] + "</div>");
        }
        $(obj).tabs({
            event: opt.event || "mouseover",
            heightStyle: opt.heightStyle || "fill"
        });

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