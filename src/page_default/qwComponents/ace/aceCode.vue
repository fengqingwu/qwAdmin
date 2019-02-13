<template>
<div id="aceCode" class="aceCodeBox">
</div>    
</template>
<script>
let that=null;
let editer=null;
export default {
    // data(){
    //     return {
    //         editer
    //     }
    // },
    mounted(){
        that=this;
        this.initAce();
    },
    methods:{
        formatJson(msg){
            var rep = "~";
            var jsonStr = JSON.stringify(msg, function(key, val) {
                if (typeof val === 'function') {
                    return (val + '');
                }
                return val;
            },rep);//JSON.stringify(msg, null, rep)
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
                    jsonStr += "        "
                else {
                    jsonStr += text;
                }
                if (i == str.length - 2)
                    jsonStr += ""//\r
            }
            return jsonStr;
        },
        jsonParse(s){
           return JSON.parse(s,function(k,v){
            if(v.indexOf&&v.indexOf('function')>-1){
                return eval("(function(){return "+v+" })()")
            }
            return v;
            });
        },
        initAce(){
            editer = ace.edit('aceCode');
            editer.setTheme("ace/theme/monokai");
            editer.getSession().setMode("ace/mode/javascript");
            editer.setHighlightActiveLine(true);
        },
        setReadOnly(isReadOnly){
             editer.setReadOnly(isReadOnly);
        },
        setJsObject(obj){
            editer.setValue(this.formatJson(obj));
        },
        getCode(){
            return this.jsonParse(editer.getValue());
        }
    }    
}
</script>
<style lang="less">
.aceCodeBox{
    width: 100%;
    height: 100%;
    min-height: 500px;
    box-sizing: border-box;
    #aceCode{
        width: 100%;
        height: 100%;
        min-height: 500px;
    }
}
</style>

