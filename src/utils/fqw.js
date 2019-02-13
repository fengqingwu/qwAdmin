//https://www.cnblogs.com/jiqing9006/p/6510114.html

/**
 * 获取html元素的光标位置
 * @param { htmlElement } ctrl html元素
 */
export const getCursortPosition = (ctrl) => {
    var CaretPos = 0;   // IE Support
    if (document.selection) {
        ctrl.focus();
        var Sel = document.selection.createRange();
        Sel.moveStart('character', -ctrl.value.length);
        CaretPos = Sel.text.length;
    }
    // Firefox support
    else if (ctrl.selectionStart || ctrl.selectionStart == '0')
        CaretPos = ctrl.selectionStart;
    return (CaretPos);
}

/**
 * 设置光标位置
 * @param {htmlElement} ctrl html元素 
 * @param {int} pos 位置
 */
export const setCaretPosition = (ctrl, pos) => {
    if (ctrl.setSelectionRange) {
        ctrl.focus();
        ctrl.setSelectionRange(pos, pos);
    }
    else if (ctrl.createTextRange) {
        var range = ctrl.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
}
/**
 * @description 阻止事件冒泡
 * @param {event} e 
 */
export const  stopEvent =(e) => { 
    if (e.stopPropagation) {
        e.stopPropagation();//ie9+
    } else {//ie678
        e.cancelBubble = true;
    }
}