<template>
    <div class="myEditor">
        <p class="status">
            语言： {{language}} &nbsp;模式： {{readonly?'只读':'读写'}}
        </p>
        <div :id="id" ref="container" :style="editorStyle"></div>
        <div class="mask" v-if="readonly== true" @click="maskClick"></div>
    </div>
</template>
<script>
import * as monaco from 'monaco-editor';
export default {
    props:{
        id: {
            type:String,
            default:function(){
                return 'id_'+((Math.random()+'').replace('0.',""));
            }
        },
        editorStyle:{
            type:String,
            default:function(){
                return "min-height:300px;";
            }
        },
        value:{
            type:String,
            default:function(){
                return ''
            }
        },
        readonly:{
            type: Boolean,
            default(){
                return  false
            }
        },
        language:{
            type:String,
            default:function(){
                return 'html'
            }
        },
        theme:{
            type:String,
            default:function(){
                return 'vs'
            }
        },
        editorOptions:{
            type:Object,
            default:function(){
                return {
                    selectOnLineNumbers: true,
                    roundedSelection: false,
                    //  readOnly: false,        // 只读
                    cursorStyle: 'line',        //光标样式
                    automaticLayout: false, //自动布局
                    glyphMargin: true,  //字形边缘
                    useTabStops: false,
                    fontSize: 18,       //字体大小
                    autoIndent:false,//自动布局
                    //quickSuggestionsDelay: 500,   //代码提示延时
                }
            }
        }
    },
    watch:{
        value(new_, old_){
            let old =  this.monacoEditor.getValue();
            if(old != new_){
                this.monacoEditor.setValue(new_);
            }
        },
        language(new_, old_){
            this.$emit("beforeLanguageChanged",{value: this.value,lang_new:new_,lang_old: old_});
            this.init();
        },
        // readonly(new_, old_){
        //     this.init();
        // },
        editorStyle(new_, old_){
            this.init();
        }
    },
    data(){
        return{
            monacoEditor:null,
        }
    },
    mounted(){
        this.init();
    },
    methods:{
        maskClick(){
            this.$message.error("当前为只读模式！")
        },
        init(){
            let self = this;
            if(self.monacoEditor){
                self.monacoEditor.dispose();
            }
            self.$refs.container.innerHTML = '';
            self.editorOptions.readonly =self.readonly;
            self.monacoEditor = monaco.editor.create(self.$refs.container, {
                value:self.value,
                language: self.language,
                theme: self.theme,//vs, hc-black, or vs-dark
                editorOptions:self.editorOptions,
            });
            self.$emit('onMounted',self.monacoEditor);//编辑器创建完成回调
            self.monacoEditor.onDidChangeModelContent(function(event){//编辑器内容changge事件
            // alert(111)
                self.$emit('changed',self.monacoEditor.getValue());
                self.$emit('input',self.monacoEditor.getValue());
            });
        }
    }
}
</script>
<style lang="less">
.myEditor{
    position: relative;
    *{
        font-family: Consolas, "Courier New", monospace; font-weight: normal!important;
    }
     .container{
        position: absolute;
        width:100%;
        height:100%;
        text-align: left;
    }
    .status {
        font-size: 10px;
        line-height: 10px;
        padding:4px  20px;
        color:#999;
        background: #ECECEC;
    }
}
.myEditor .mask{
    position: absolute;
    width: 100%;
    height: 100%;
    background:rgba(0, 0, 0, 0.01);
    left: 0;
    top: 0;
    z-index: 100;
}
   

</style>