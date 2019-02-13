<template>
<div class="qwModalForm" >  <!--@contextmenu="contextMenu"-->
    <qwDialog v-if="config.qwDialog" :config=config.qwDialog>
        <slot name="title" 
            :style="config.titleStyle">
        </slot>
        <qwForm ref="qwform"
            v-if="config.qwForm"
            :config="config.qwForm" 
            @formBtnClicked="formBtnClicked"
            @submitForm="submitFormEmit"
            @formItemChanged="formItemChanged"
            @formItemFocus="formItemFocus"
            @formItemInput="formItemInput"
            @formItemChange="formItemChange">
            </qwForm>
        <slot name="footer">
        </slot>
    </qwDialog>
</div>    
</template>
<script>
import qwForm from "../form/formInline.vue"
import qwDialog from "../dialog/dialog.vue"
import { mapMutations } from 'vuex'
let qwModalForm = {
    name:"qwModalForm",
    props:{
        config:{
            type:Object,
            default:()=>{
                return null
            }
        }
    },
    components:{
        qwForm,
        qwDialog
    },
    methods:{
        ...mapMutations(['SET_CONTEXTMENU_EVENT','SET_CONTEXTMENU_TARGET','SET_SHOW_CONTEXTMENU']),
        showModal(){
            this.config.qwDialog.dialogVisible=true;
        },
        resetForm(){
            this.$refs["qwform"].resetForm();
        },
        closeModal(){
            this.config.qwDialog.dialogVisible=false;
        },
        clearValidate(){
            this.$refs["qwform"].clearValidate();
        },
        setFormData(data){
            // console.log('setformData');
            this.config.qwForm.formData=data;
        },
        formBtnClicked(data){
            if('function'==typeof(data.config.formBtns[data.index].clicked)){
                data.config.formBtns[data.index].clicked() && this.$emit("formBtnClicked",data);
            }else{
                this.$emit("formBtnClicked",data);
            }
        },  
        submitFormEmit(data){
            this.$emit("submitForm",data);
        },
        formItemChanged(data){
            this.$emit("formItemChanged",data);
        },
        formItemFocus(data){
            this.$emit("formItemFocus",data);
        },
        formItemInput(data){
            this.$emit("formItemInput",data);
        },
        formItemChange(data){
            this.$emit("formItemChange",data);
        },        
        open(){
            this.config.qwDialog.dialogVisible=true;
            // console.log(this);
            // this.$emit("open",{});
        },
        close(){
            // console.log(this);
            // this.config.dialogVisible=false;
            // console.log("close",...arguments);
            // this.$emit("close",...arguments);
        },
        closed(){
            // console.log(this)
            // this.$emit("closed",...arguments);
        },
        contextMenu(e){
            e.preventDefault();
            this.SET_CONTEXTMENU_EVENT(e);
            this.SET_CONTEXTMENU_TARGET(this);
            this.SET_SHOW_CONTEXTMENU(true);
        }
    }
}
export default qwModalForm;
</script>
