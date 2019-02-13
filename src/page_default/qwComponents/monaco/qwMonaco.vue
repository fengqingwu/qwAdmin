<template>
<div>
    <MonacoEditor
        :language="config.language?config.language : 'javascript'"
        :height="config.height? config.height: '100%'"
        :width = "config.width? config.width: '100%'"
        :code="value"
        :editorOptions="config.options? config.options : {}"
        @mounted="onMounted"
        @codeChange="onCodeChange"
        >
    </MonacoEditor>  
</div>
</template>
<script>
export default {
    components: {
        Monaco
    },
    props:{
        value:{
            required: true,
            default(){
                return ""
            }
        },
        config:{
            type: Object,
            default(){
                return {
                selectOnLineNumbers: true,
                roundedSelection: false,
                readOnly: false,
                cursorStyle: 'line',
                automaticLayout: false,
                glyphMargin: true,                
                }
            }
        }
    },
    data(){
       return {
           editor: null,
       } 
    },
    methods:{
        onMounted(editor) {
            this.editor = editor;
        },
        onCodeChange(editor) {
        // console.log(editor.getValue());
        }
    }
}
</script>
<style lang="less">
.qwMocano{

}
</style>
// created by fengqingwu
// based https://github.com/matt-oconnell/vue-monaco-editor
/*
Option	Type	Default	Description
language	String	javascript	
height	Number/String	100%	
width	Number/String	100%	
code	String	// code \n	Initial code to show
theme	String	vs-dark	vs, hc-black, or vs-dark
highlighted	Array[Object]	[{ number: 0, class: ''}]	Lines to highlight with numbers and .classes
changeThrottle	Number(ms)	0	throttle codeChange emit
srcPath	String	""	see Webpack Use below
editorOptions	Object	Merged with defaults below	See Monaco Editor Options
 */
