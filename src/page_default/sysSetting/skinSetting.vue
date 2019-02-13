<template>
<div class="baseSetting">
    <h1 class="title">系统设置-皮肤设置</h1>
    <qwForm ref="form" :config="formConfig"></qwForm>
    <p class="btnFormbox">
    <el-button size="mini" @click="doSave" type="primary">保存</el-button>
    <el-button size="mini" @click="doReset">重置</el-button>
    <el-button size="mini" @click="doGetSetting">当前配置</el-button>
</p>
</div>
</template>
<script>
import http from "../../utils/public.js"
import qwForm from "../qwComponents/form/formInline.vue"
import { jsonParse } from '../../utils/json.js';
const getLocalUrl = ()=>{
    return  window.location.href.split("/#")[0].replace(/:\d{4}/g,"");
}
export default {
    components:{
        qwForm
    },
    data(){
        return {
            formConfig:{
                // labelWidth: "200px",
                controlWidth:"300px",
                items:[    
                    {
                        name: "色调配置：",
                        type: "labelInfo",
                        itemClass:"lineTitle",
                        controlWidth: "0",
                        formItemStyle: "width:200px;",
                        key: "labelInfo"
                    },
                    {
                        name: "高亮色",
                        itemClass:"qw_main_color_item",
                        type: "colorPicker",
                        formItemStyle: "width:108px;",
                        key: "mainHColor"
                    },
                    {
                        name: "常规色",
                        type: "colorPicker",
                        itemClass:"qw_main_color_item",
                        formItemStyle: "width:146px;",
                        key: "mainMColor"
                    },
                    {
                        name: "次色",
                        type: "colorPicker",
                        itemClass:"qw_main_color_item",
                        formItemStyle: "width:196px;",
                        key: "mainLColor"
                    },
                    {
                        type:"br",
                    },                                        
                    {
                        name: "Logo区域配置：",
                        type: "labelInfo",
                        itemClass:"lineTitle",
                        controlWidth: "0",
                        formItemStyle: "width:200px;",
                        key: "labelInfo"
                    },
                    {
                        name: "背景色",
                        type: "colorPicker",
                        key: "logoBlockBg",
                        formItemStyle: "width:108px;",
                        controls: false,
                        min:24,
                        max:48
                    },                    
                    {
                      name: "css样式",
                      type: "input",
                      controlWidth:"284px",
                      key: "logoBlockStyle"  
                    },
                    { type: "br"},                               
                    {
                        name: "侧边栏配置：",
                        type: "labelInfo",
                        itemClass:"lineTitle",
                        controlWidth: "0",
                        formItemStyle: "width:200px;",
                        key: "labelInfo"
                    },
                    {
                        name: "背景色",
                        type: "colorPicker",
                        key: "sideNavBg",
                        formItemStyle: "width:108px;",
                        controls: false,
                        min:24,
                        max:48
                    },

                    {
                        name:"菜单背景(激活)",
                        type: "colorPicker",
                        formItemStyle: "width:146px;",
                        key:"sideNavActiveBgColor"
                    },
                    {
                        name:"文字颜色",
                        type: "colorPicker",
                        formItemStyle: "width:146px;",
                        key:"sideNavColor"
                    },
                    
                    { type: "br"},                               
                    {
                        name: " ",
                        type: "labelInfo",
                        itemClass:"lineTitle",
                        controlWidth: "0",
                        formItemStyle: "width:200px;",
                        key: "labelInfo"
                    },              
                    {
                        name: "菜单栏行高",
                        type: "inputNumber",
                        key: "sideNavHeight",
                        formItemStyle: "width:197px;",
                        controlWidth: "96px",
                        controls: false,
                        min:24,
                        max:48
                    },
                    {type:"br"},
                    {
                        name: "",
                        type: "labelInfo",
                        itemClass:"lineTitle",
                        controlWidth: "0",
                        formItemStyle: "width:200px;",
                        key: "labelInfo"
                    },                   
                    {
                        name:"css样式",
                        type: "textarea",
                        controlWidth: "401px",
                        key:"sideBarBoxStyle"
                    },
                    { type: "br"},
                    {
                        name: "顶部配置：",
                        type: "labelInfo",
                        itemClass:"lineTitle",
                        controlWidth: "0",
                        formItemStyle: "width:200px;",
                        key: "labelInfo"
                    },
                    {
                        name:"主背景",
                        type: "colorPicker",
                        key:"topBlockBg",
                        formItemStyle: "width:108px;",
                    },                    
                    {
                        name:"样式",
                        type: "input",                        
                        controlWidth: "302px",
                        key:"topBoxStyle"
                    },
                    { type: "br" },                    
                    {
                        name: "顶部栏目：",
                        type: "labelInfo",
                        itemClass:"lineTitle",
                        controlWidth: "0",
                        formItemStyle: "width:200px;",
                        key: "labelInfo"
                    },
                    {
                        name:"是否显示",
                        key: "isShowTop",
                        type: "radio",
                        items: [
                            { label: "是", value: true },
                            { label: "否", value: false}
                        ]
                    },
                    { type: "br" },                    
                    {
                        name: "模块设置：",
                        type: "labelInfo",
                        itemClass:"lineTitle",
                        controlWidth: "0",
                        formItemStyle: "width:200px;",
                        key: "labelInfo"
                    },
                    {
                        name:"间距(px)",
                        key: "pagePad",
                        type: "inputNumber",
                        controls: false,
                        precision: 0,
                        controlWidth: "60px",
                        min:10,
                        max:40
                    }
                ],
                formData:{
                   	mainHColor: "",					//主色调（高亮）
                    mainMColor: "",						//主色调（常规）
                    mainLColor: "",						//主色调（次色） 

                    logoBlockBg: "",
                    topBlockBg: "",
                    logoBlockStyle:"",
                    
                    sideNavBg: "",
                    sideNavColor:"",
                    sideNavHeight: "",						//侧边栏菜单单条高度
                    sideNavActiveBgColor: "",		//侧边栏活动菜单背景色
                    sideBarBoxStyle:"",
                                        
                    isShowTop: true,							//是否显示顶部
                    topBoxStyle: "",							//顶部导航条样式
                    sideBarBoxStyle:"",						//侧边栏box样式
                    pagePad: 10,								//主页面padding
                }
            }
        }
    },
    mounted(){
        this.doGetSetting();
    },
    methods:{
        doSave(){
            let data= JSON.parse(JSON.stringify(this.formConfig.formData));   
            for(let attr in data){
                if("string" == typeof(data[attr]))data[attr] = data[attr].replace(/[\r|\n]/g,"").replace(/\"/g,"'");
            }         
            let url= window.location.href.split("/#")[0].replace(/:\d{4}/g,"") + ':9999/setSkinSetting';
            let http_ =  http;
            http_.fetchPost(url,{Vue:this,params: data}, true).then(res=>{
                if(res.result){
                    this.$message.success("操作成功")
                }
            }).catch(e=>{
                // console.log("e===>",e);
                this.$message.error(e.data.message);
            });
        },
        doReset(){
            let data = {
                    mainHColor: "#409eff",					//主色调（高亮）
                    mainMColor: "#666",						//主色调（常规）
                    mainLColor: "#999",						//主色调（次色） 

                    logoBlockBg: "#f0f2f5",
                    logoBlockStyle:"",
                    topBlockBg: "#FFF",
                    
                    sideNavBg: "#00142a",
                    sideNavColor: "#FFF",                    
                    sideNavHeight: 40,						//侧边栏菜单单条高度
                    sideNavActiveBgColor: "#409eff",		//侧边栏活动菜单背景色
                                        
                    isShowTop:true,							//是否显示顶部
                    topBoxStyle:"",							//顶部导航条样式
                    sideBarBoxStyle:"",						//侧边栏box样式
                    pagePad:10,								//主页面padding
                };
            for(let attr in data){
                this.$set(this.formConfig.formData,attr,data[attr]);
            }
            let form = this.$refs.form;
            if(form){
                form.clearValidate();
            }
        },
        doGetSetting(){
            let url= window.location.href.split("/#")[0].replace(/:\d{4}/g,"") + ':9999/getSkinSetting';
            let http_ =  http;
            http_.fetchPost(url,{Vue:this,params: {}}, true).then(res=>{
                if(res.result){
                    this.$message.success("操作成功");
                    for(let attr in this.formConfig.formData){
                        this.formConfig.formData[attr] = (undefined != res.model[attr])? res.model[attr] : "";
                    }
                }else{
                    this.$message.error(res.message);
                }               
            });
        }
    }
}
</script>
<style lang="less">
    .baseSetting{
        .el-form-item__label{
            color:#999;
        }
        .lineTitle .el-form-item__label{
            width: 200px;
            color: #333;
        }
        .qw_main_color_item {

        }
        .title{
            display: block;
            width: 300px;
            margin-left: 260px;
            font-size: 16px;
            color: #333;
            line-height: 2.0;            
            text-align: left;
            padding-top:30px;
            padding-bottom: 16px;
        }
        .btnFormbox{
            margin-left: 220px;
            width: 300px;
            text-align: left;
        }
    }
</style>
