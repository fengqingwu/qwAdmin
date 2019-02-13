<template>
    <el-dialog
        :title="config.title"
        :visible="config.dialogVisible"
        :width="config.width"
        :fullscreen="config.fullscreen"
        :top="config.top"
        :modal="config.modal"
        :modal-append-to-body="config.modalAppendToBody"
        :append-to-body="config.appendToBody"
        :lock-scroll="config.lockScroll"
        :custom-class="config.customClass"
        :close-on-click-modal="false"
        :close-on-press-escape="config.closeOnPressEscape"
        :show-close="config.showClose"
        :center="config.center"
        :before-close="beforeCloseReal"
        @close="close"
        @open="open"
        @closed="closed"
    >
    <!-- undefined==config.closeOnClickModal? false: config.closeOnClickModal -->
    <slot name="title" 
        :style="config.titleStyle">
    </slot>
    <slot></slot>
    <slot name="footer"></slot>
    </el-dialog>  
</template>
<script>
let qwDialogObj={
    props:{
        config:{
            type:Object,
            default: ()=>{
                return {
                    title:"弹出框标题",
                    titleStyle:"background:#FFF;",
                    dialogVisible:false,
                    width:"50%",
                    fullscreen:false,
                    top:"15vh",
                    modal:true,//遮罩
                    modalAppendToBody:true,
                    appendToBody:false,
                    lockScroll:true,
                    customClass:"",
                    closeOnClickModal:true,
                    closeOnPressEscape:true,
                    showClose:true,
                    center:false,
                    beforeClose:(done)=>{
                        // console.log("done==>",done);
                        // return done;
                        if('function'==typeof(done)){
                            done();
                        }
                    }
                }
            }
        }
    },
    methods:{
        open(){
            this.config.dialogVisible=true;
        },
        close(){
            this.$emit("close",{self:this})
            this.config.dialogVisible=false;
        },
        closed(){
            this.$emit("closed")
        },
        beforeCloseReal(done){
            if('function'==typeof(this.config.beforeClose)){
                this.config.beforeClose();
                if('function'==typeof(done)){
                    done();
                }
            }else{
                if('function'==typeof(done)){
                    done();
                }   
            }
            
        }
    }
}
export default qwDialogObj;
</script>

