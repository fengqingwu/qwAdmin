<template>
<div class="debug_page">
    <el-tabs v-model="curTabName" @tab-click="handleClick">
        <el-tab-pane label="栅格表单/form" name="first">
           <div style="width:800px">
               <qwForm :config="qwFormConfig"></qwForm>
           </div> 
        </el-tab-pane>
        <el-tab-pane label="行内表单/formInline" name="second">

        </el-tab-pane>
        <el-tab-pane label="带UEditor/formWithUeditor" name="third">
            
        </el-tab-pane>
        <el-tab-pane label="弹框/dialog" name="fourth">
            
        </el-tab-pane>
        <el-tab-pane label="筛选器/Filter" name="fifth">
            
        </el-tab-pane>
        
        <el-tab-pane label="拖拽框/Filter" name="sixth">
            <dragBox class="dragtest"></dragBox>
        </el-tab-pane>
    </el-tabs>

</div>
</template>
<script>
import qwGroup from "../qwComponents/group/group.vue";
import qwForm from "../qwComponents/form/form.vue"
import dragBox from "../qwComponents/dragbox/dragbox.vue"
export default {
    components:{
        qwGroup,
        qwForm,
        dragBox
    },
    data(){
        return {
           curTabName:"first",
           qwFormConfig:{
               labelWidth:"80px",
               items:[
                   {
                        name:"文本框",
                        key:"input",
                        type:"input",
                        span: 8,
                        placeholder:"请输入内容",//可选
                        controlWidth:"140px",//可选
                        rules:[{required: true, message:"该项不能为空",trigger:["input","change","blur"]}],//可选
                   },
                    {
                        name:"文本域",
                        key:"textarea",
                        type:"textarea",
                        placeholder:"请输入内容",//可选
                        controlWidth:"140px",//可选
                        span: 16,
                        rows:2,
                        rules:[{required: true, message:"该项不能为空",trigger:["input","change","blur"]}],//可选
                    },
                    {
                        name:"下拉选择",
                        key:"select",
                        type:"select",
                        placeholder:"请选择",//可选
                        controlWidth:"140px",//可选
                        span:"8",
                        dropDown:{
                            data:[
                                { label:"选项1",value: 1},
                                { label:"选项2",value: 2}
                            ]
                        }
                    }
               ],
               formData:{
                   input:"",
                   textarea:"",
                   select:""
               }
           }
        }
    },
    methods:{
        handleClick(tab){
            console.log(tab);
        }
    }
}
</script>
<style lang="less">
.debug_page{
   background: #FFF;
   .dragtest{
       width: 200px;
       margin: 0 auto;
   }
}
</style>

