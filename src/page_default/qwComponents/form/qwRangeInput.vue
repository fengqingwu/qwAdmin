<template>
<div class="qwRange el-input" :class="size">
    <span class="preLabel" v-if="preLabel!==''&& (preLabel!=undefined)">{{preLabel}}</span>
    <input class="el-input__inner" type="text" autocomplete="off" :value="value" @click="onClick" @input="input" :readonly="disabled" :placeholder="placeholder" @change="change" @focus="focus" @blur="blur" >
    <span class="subLabel" v-if="subLabel!==''&& (subLabel!=undefined)">{{subLabel}}</span>
</div>    
</template>
<script>
/*
*  input 数字范围选择器
*/
export default {
    props:{                
        preLabel:{
            type: String,
            default(){
                return ""
            },
        },
        subLabel:{
            type: String,
            default(){
                return ""
            },
        },
        min: {
            type: Number,
            default(){
                return 0
            }
        },
        max: {
            type: Number,
            default(){
                return 100
            }
        },
        placeholder: {
            type: String,
            default(){
                return "-/-"
            }
        },        
        size: {
            type: String,
            default(){
                return "-/-"
            }
        },
        splider: {
            type: String,
            default(){
                return "/"
            }
        },
        value: {
            type:String,
            default(){
                return ""
            }
        },
        disabled: {
            type: Boolean,
            default(){
                return false
            }
        }
    },
    data(){
        return {
            oInput: null,
            selectionStart:0,
            selectionEnd:0
        }
    },
    mounted(){
        this.value = this.disabled? "-/-" : this.min + this.splider + this.max;
    },
    methods:{
        onClick(e){
            this.oInput = e.target;
            this.oInput.selectionStart = 0;//that.selectionStart;
            this.oInput.selectionEnd = 0;//that.selectionEnd;
        },
        change(e){            
            this.$emit("change",e.target.value);
        },        
        focus(e){
            this.oInput = e.target;
            this.$emit("focus",e.target.value);
        },
        blur(e){            
            this.$emit("blur",e.target.value);
        },
        input(e){
            let maxLength= (""+ this.max).length;                   
            this.oInput = e.target;
            this.selectionStart = e.target.selectionStart;
            this.selectionEnd = e.target.selectionEnd;
            this.value = e.target.value;
            maxLength = this.value.indexOf(this.splider) < maxLength ? this.value.indexOf(this.splider): maxLength;
            let that = this;
            setTimeout( function(){
                let value = that.value.split("/")[0];
                if(""=== value) value = 0;
                if(value.length>= maxLength&& ((e.target.selectionStart)>= maxLength)){
                    value= value.substr(value.length-maxLength,maxLength);
                }else{
                    value = value.substr(0,maxLength);
                }
                value = parseInt(value) < that.min? that.min : (parseInt(value)> that.max? that.max : parseInt(value));
                console.log("value====>",value);
                that.value = value + that.splider + that.max;
                // that.value.replace(valueOld,value);
                // that.value = that.value.replace(/([^0-9])/g, "");
                // that.value = that.value.replace(/^(.{2})(.*)$/, "$1" + that.splider + that.max);
                setTimeout(() => {
                    that.oInput.selectionStart = maxLength < that.selectionStart ? maxLength : that.selectionStart;
                    that.oInput.selectionEnd = maxLength < that.selectionEnd ? maxLength : that.selectionEnd;
                }, 30);
                that.$emit("input",that.value)
            }, 30);
        }
    }
}
</script>
<style lang="less">
.qwRange.small{
    width: auto;
    height: 32px;
    line-height: 32px;
}
.qwRange.mini{
    width: auto;
    height: 24px;
    line-height: 24px;
    .el-input__inner{
        height: 24px;
    }
}
.qwRange{
    .subLabel,.preLabel{
        display: inline-block;
        position: absolute;
        z-index: 1;
        top: 0;
        font-size:12px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(51,51,51,1);
    }
    .subLabel{
        left: 100%;
        transform: translateX(4px);
    }
    .preLabel{
        right: 100%;
        transform: translateX(-4px);
    }
}
</style>

