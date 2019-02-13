<template>
<!-- <div> -->
    <div class="qwAce" ref="ace" :style=" height +';'+config.style"></div>
<!-- </div> -->
</template>
<script>
  import ace from 'ace-builds'
  import 'ace-builds/src-noconflict/snippets/javascript'
  import 'ace-builds/src-noconflict/snippets/html'
  import 'ace-builds/src-noconflict/snippets/css'
  import 'ace-builds/src-noconflict/snippets/scss'
  import 'ace-builds/src-noconflict/snippets/json'
  import 'ace-builds/src-noconflict/snippets/java'
  import 'ace-builds/src-noconflict/snippets/text'
  import 'ace-builds/webpack-resolver'
  import 'ace-builds/src-noconflict/ext-language_tools'
  import 'ace-builds/src-noconflict/theme-monokai'
  import 'ace-builds/src-noconflict/mode-javascript'
  let that_;
export default {
    props:{
        height: {
            type: String,
            default(){
                return  "300px"
            }
        },
        lang:{
            type: String,
            default(){
                return  "javascript"
            }
        },
        theme: {
            type: String,
            default(){
                return  "chrome"
            }
        },
        readonly: {
            type: Boolean,
            default(){
                return  false
            }
        },
        sync: {
            type: Boolean,
            default(){
                return  true
            }
        },
        value: {
            type: String,
            default(){
                return  ""
            }
        },
        config:{
            type: Object,
            default(){
                return {
                    maxLines: 20,
                    minLines: 10,
                    fontSize: 14,
                    value: "",
                    theme: 'ace/theme/monokai',
                    mode: 'ace/mode/javascript',
                    wrap: true,
                    tabSize: 2,
                    style:"width:100%;min-height:100px;"
                }
            }
        }
    },
    watch:{
        value(new_,old_){
            if(!this.aceEditor)return;
            let old = this.aceEditor.getSession().getValue();
            if(new_ != old){
                this.aceEditor.setValue(new_);
            }
        }
    },
    data(){
        return {
            aceEditor: null,
            config_: {
                maxLines: 20,
                minLines: 10,
                fontSize: 14,
                value: "",
                theme: 'ace/theme/monokai',
                mode: 'ace/mode/javascript',
                wrap: true,
                tabSize: 2,               
            }
        }  
    },
    created(){
        that_ = this;
    },
    mounted(){
        for(let attr in this.config_){
            if(undefined != this.config[attr]){
                 this.config_[attr] = this.config[attr];
            }
        }
        this.config_.theme = 'ace/theme/'+ this.theme;
        this.config_.lang = 'ace/mode/' + this.lang;
        this.aceEditor = ace.edit(this.$refs.ace, this.config_)
        if(this.readonly)this.aceEditor.setReadOnly(this.readonly);
        // 激活自动提示
        // this.aceEditor.setOptions({
        //     enableSnippets: true,
        //     enableLiveAutocompletion: true,
        //     enableBasicAutocompletion: true
        // })
        this.aceEditor.setHighlightActiveLine(true);
        this.aceEditor.getSession().on('change', this.change)
        },
    methods:{
        change () {
            this.$emit('input', this.aceEditor.getSession().getValue())
        },
        handleModelPathChange (modelPath) {
            this.aceEditor.getSession().setMode(modelPath)
        },
        handleWrapChange (wrap) {
            this.aceEditor.getSession().setUseWrapMode(wrap)
        }
    }
}
</script>
<style lang="less">
.qwAce{
    width: 100%;
    min-height: 100px;
}
</style>