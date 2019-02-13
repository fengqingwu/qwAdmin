<template>
  <div class="qwUeditor">
    <script :id="id" type="text/plain"></script>
  </div>
</template>
<script>
//         {
//             name:"文章内容",
//             key:"content",
//             type:"ueditor",
//             controlWidth: "800px",
//             editorConfig:{
//                 serverUrl: uploadUrl,
//                 initialFrameWidth: null,
//                 initialFrameHeight: 350,
//                 zIndex:10000
//             }    
//         },
let that_ = null;
  export default {
    name: 'UE',
    data () {
      return {
        editor: null
      }
    },
    props: {
      value: {
        type: String
      },
      config: {
        type: Object
      },
      id: {
        type: String
      },
    },
    created(){
      that_ = this;
    },
    mounted() {
        this.init();
    },
    watch:{
       value(new_,old_){
          let con = that_.getUEContent();
          if(new_!= con){
            that_.setContent(new_);
          }
       }
    },
    methods: {
      init(){
          const _this = this;
          this.editor = UE.getEditor(this.id, this.config); // 初始化UE
          this.editor.addListener("ready", function () {
          _this.editor.setContent(_this.value); // 确保UE加载完成后，放入内容。
          });
          _this.editor.addListener("contentChange",function(){
              _this.$emit("input",_this.editor.getContent());
          }); 
          _this.editor.addListener("focus",function(){
              _this.$emit("focus",_this.editor.getContent());
          })
          
          _this.editor.addListener("blur",function(){
              _this.$emit("blur",_this.editor.getContent());
          })
      },
      setContent(str){
         that_.editor.setContent(str);
      },
      getUEContent() { // 获取内容方法
         return this.editor.getContent()
      },
      getUEContentTxt() { // 获取纯文本内容方法
        return this.editor.getContentTxt()
      }
    },
    destroyed() {
      this.editor.destroy();
    }
  }
</script>
