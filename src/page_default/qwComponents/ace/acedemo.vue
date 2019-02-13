<template>
  <div class="aceDemo">
    <h1>test</h1>
    <div class="aceBox" :id="id"></div>
  </div>
</template>
<script>
export default {
  props:{
    id:{
      type: String,
      default(){
          return   "id_"+ new Date().getUTCSeconds();
      }
    }
  },
  data(){
    return {
        editor:null,
    }
  },
  mounted(){
      //初始化对象
        this.editor = ace.edit(this.id);

        //设置风格和语言（更多风格和语言，请到github上相应目录查看）
        var theme = "clouds"
        var language = "javascript"
        this.editor.setTheme("ace/theme/" + theme);
        this.editor.session.setMode("ace/mode/" + language);

        //字体大小
        this.editor.setFontSize(18);

        //设置只读（true时只读，用于展示代码）
        this.editor.setReadOnly(false);

        //自动换行,设置为off关闭
        this.editor.setOption("wrap", "free")

        //启用提示菜单
        ace.require("ace/ext/language_tools");
        this.editor.setOptions({
            enableBasicAutocompletion: true,
            enableSnippets: true,
            enableLiveAutocompletion: true
        });
  }
}
</script>
<style lang="less">
.aceDemo{
  width: 100%;
  min-height: 300px;
  background: #FFF;
  .aceBox{
      width: 100%;
      min-height: 300px;
  }
}
</style>
