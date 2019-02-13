/**
 * @description 将json对象转为字符串
 * @param { Object } msg json对象  
 */
export const jsonStringify =(msg)=>{
    var rep = "~";
    var jsonStr = JSON.stringify(msg, function (key, val) {
        // console.log(val);
        if (typeof val === 'function') {
            return (val + '');
        }
        return val;
    }, rep);//JSON.stringify(msg, null, rep)
    var str = "";
    for (var i = 0; i < jsonStr.length; i++) {
        var text2 = jsonStr.charAt(i)
        if (i > 1) {
            var text = jsonStr.charAt(i - 1)
            if (rep != text && rep == text2) {
                str += ""//\r
            }
        }
        str += text2;
    }
    jsonStr = "";
    for (var i = 0; i < str.length; i++) {
        var text = str.charAt(i);
        if (rep == text)
            jsonStr += "  "
        else {
            jsonStr += text;
        }
        if (i == str.length - 2)
            jsonStr += ""//\r
    }
    return jsonStr;
}

/**
 * @description 将字符串转为JSON对象
 * @param {String} s json字符串 
 */
export const jsonParse= (s)=>{    
    if((undefined == s) || (s==""))return s;
    else return JSON.parse(s, function (k, v) {
        if (null != v){
            if (v.indexOf && v.indexOf('function') > -1) {
                return eval("(function(){return " + v + " })()")
            }
        }       
        return v;
    });
}
