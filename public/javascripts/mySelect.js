/**
 * Created with JetBrains WebStorm.
 * User: yzjf
 * Date: 14-1-28
 * Time: 下午3:32
 * To change this template use File | Settings | File Templates.
 */

jQuery.fn.mySelectStyle = function(){
    $(this).on({
        'mouseenter': function (e) {
            e.stopPropagation();
            $(this).addClass("lyy-dark-background lyy-cursor-pointer");
        },
        'mouseleave': function (e) {
            e.stopPropagation();
            $(this).removeClass("lyy-dark-background lyy-cursor-pointer");
        },
        'mousedown': function (e) {
            e.stopPropagation();
            $(this).addClass("lyy-null-background");
        },
        'mouseup': function (e) {
            e.stopPropagation();
            $(this).removeClass("lyy-null-background");
        }
    });
};