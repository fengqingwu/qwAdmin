<template>
<div class="qwTest">
    <h1 class="title">组件测试</h1>
    <!-- 组件盒子 -->
    <div class="comBox" :style="{minHeight: sidebarHeight-140 +'px'}">
        <div class="comBoxReal">
            <components ref="curComp" :is="curCom" v-bind="curProps">
                <template slot-scope="item">
                    {{item}}
                </template>
            </components>
        </div>    
        <div class="rBox">
            <qwForm :config="qwFormConfig"></qwForm>
            <input type="number" v-model="formData.row">
            <input type="number" v-model="formData.col">
            <el-button size="mini" type="primary" @click="test">保存</el-button>
        </div>
    </div>
    <!-- 配置弹窗 -->
    <qwModelForm :config="qwModelFormConfigSet" @formBtnClicked="formBtnClicked"/>
</div>
</template>
<script>
import {
    mapState, mapMutations
} from "vuex"

import qwModelForm from "../qwComponents/modelForm/modelFormInline.vue"
import qwForm from "../qwComponents/form/formInline.vue"
import qwGrid from "./qwGrid.vue"
let that_ = null;
// 测试用的组件
export default {
    components:{
        qwForm,
        qwGrid,
        qwModelForm
    },
    data(){
        return {
            curCom: "qwGrid",
            curProps: {
                rows: 2,
                columns: 4,
                debug: true
            },
            formData:{
                row:"1",
                col:"1"
            },
            qwModelFormConfigSet:{
                qwDialog:{
                    title: "组件设置",
                    width: "800px",
                    dialogVisible: false,
                    beforeClose(){
                        that_.closeSettingModel();
                    }
                },
                qwForm:  {
                    items: [{
                        type:"labelInfo",
                        name: "测试",
                        key: "test"
                    }],
                    formData: {
                        test:""
                    },
                }
            },
            qwFormConfig:{
                items: [
                    {
                        name: "组件",
                        key: "component",
                        type: "select",
                        dropDown:{
                            data: [
                                {
                                    label: "层布局组件",
                                    value: "qwGrid"
                                }
                            ]
                        }
                    }
                ],
                formData:{
                    component: ""
                }
            },
            
        }
    },
    created(){
        that_ = this;
    },
    watch:{
        showSettingDialog(new_, old_){
            if(new_==true){
                console.log("showModel",new_)
                that_.showModelFormSet();
            } else {
                that_.closeSettingModel()
            }
        },
        dialogConfig(new_,old){
            
        }
    },
    computed:{
        ...mapState({
            sidebarHeight: state => state.app.sidebarHeight,
            showSettingDialog: state =>  state.setting.showSettingDialog,
            dialogConfig: state => state.setting.dialogConfig,
            curComp: state => state.setting.curComp
        })
    },
    methods: {
        ...mapMutations(["SET_SHOW_SETTING_DIALOG","SET_DIALOG_CONFIG","SET_CUR_COMP"]),
        test(){
            this.$set(this.curProps,"rows",parseInt(this.formData.row) || 1)
            this.$set(this.curProps,"columns",parseInt(this.formData.col) || 1)
        },
        showModelFormSet(){
            this.qwModelFormConfigSet.qwDialog.dialogVisible = true;
            var new_ = this.dialogConfig;
            setTimeout(() => {
                this.qwModelFormConfigSet.qwForm = new_;
            }, 30);
        },
        closeSettingModel(){
            this.qwModelFormConfigSet.qwDialog.dialogVisible = false;
            this.SET_SHOW_SETTING_DIALOG(false);
        },
        doSaveSetting(data){
            let formData = data.config.formData;
            for(let attr in formData){
                this.$set(this.curProps,attr,formData[attr]);
            }
            this.closeSettingModel();
            // console.log(formData);
            // console.log("11333=>",this.curComp);
        },
        formBtnClicked(data){
            switch (data.index) {
                case 0:
                    {
                        this.doSaveSetting(data);
                    }
                    break;
                case 1:
                    {
                        data.self.resetForm();
                    }
                    break;
                case 2:
                    {
                        this.closeSettingModel();
                    }
                    break;
            
                default:
                    break;
            }
        }
    }
}
</script>
<style lang="less">
@rboxWidth: 0px;
.qwTest{
    background: #FFF;
    padding: 20px;
    box-sizing: border-box;
    .title{
        display: block;
        line-height: 32px;
        color: #333;
    }
    .comBox{
        position: relative;
        width: 100%;
        box-sizing: border-box;
        padding-right: @rboxWidth;
    }
    .comBoxReal{       
        width: 100%;
        // border: 1px solid #F00;
    }
    .rBox{
        position: absolute;
        box-sizing: border-box;
        width:  @rboxWidth;
        right: 0;
        top:0;
        bottom: 0;
        overflow-y: scroll;
        // border: 1px solid #F00;
    }
 
}
</style>

