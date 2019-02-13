// js获取富文本中的第一张图片url正则公式及去除字符串里面的html标签
export const imgUrlFun = (str)=> {
    var data = '';
    str.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/, function (match, capture) {
        data = capture;
    });
    return data
}

export const filterHTMLTag = (str)=> {
    str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
    str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
    str = str.replace(/ /ig, '');//去掉 
    return str;
}