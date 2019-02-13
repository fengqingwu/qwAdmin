<template>
<div class="baseSetting">
    <h1 class="title">系统设置-基础配置</h1>
<qwForm ref="form" :config="formConfig"></qwForm>
<p class="btnFormbox">
    <el-button size="mini" @click="doSave" type="primary">保存</el-button>
    <el-button size="mini" @click="doReset">重置</el-button>
    <el-button size="mini" @click="doGetSetting">抓取当前配置</el-button>
</p>
</div>
</template>
<script>
import http from "../../utils/public.js"
import qwForm from "../qwComponents/form/formInline.vue"
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
                labelWidth: "200px",
                controlWidth:"300px",
                items:[
                    {
                        name:"应用名称",
                        type:"input",
                        key: "appName"
                    },
                    { type: "br"},
                    {
                        name:"应用标识",
                        type:"input",
                        maxLength: 8,
                        key: "appId"
                    },
                    { type: "br"},
                    {
                        name:"企业名称",
                        type:"input",
                        key: "companyName",
                    },                    
                    { type: "br"},
                    {
                        name:"API请求地址",
                        type:"input",
                        key: "appUrl",
                    },                   
                    { type: "br"},
                    {
                        name:"文件上传地址",
                        type:"input",
                        key: "uploadUrl",
                    },                                       
                    { type: "br"},
                    {
                        name:"静态文件地址",
                        type:"input",
                        key: "staticUrl",
                    },                                  
                    { type: "br"},
                    {
                        name:"api超时阈值(毫秒)",
                        type:"inputNumber",
                        key: "timeoutNumber",
                        controls: false,
                        min:1500,
                        max:10000
                    },                                       
                    { type: "br"},
                    {
                        name:"系统退出地址",
                        type:"input",
                        key: "logoutUrl",
                    },
                    { type: "br"},
                    {
                        name: "调试模式",
                        key: "debug",
                        type: "radio",
                        items:[
                            { label: "开启",value: true },
                            { label: "关闭",value: false }
                        ]
                    }
                ],
                formData:{
                    appName:"信息系统",
                    appId:"",
                    companyName:"XXXX科技有限公司",
                    appUrl:getLocalUrl(),
                    uploadUrl:getLocalUrl(),
                    staticUrl:getLocalUrl(),
                    logoutUrl:getLocalUrl(),
                    timeoutNumber:6000,
                    logoBlockBackground:"#f0f2f5",
                    sideMenuBackground:"#00142a",
                    sideMenuHeight:40,
                    sidebarActiveColor:"#2a93ff",
                    debug: true
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
            let url= window.location.href.split("/#")[0].replace(/:\d{4}/g,"") + ':9999/baseSettingApi';
            let http_ =  http;
            http_.fetchPost(url,{Vue:this,params: data}, true).then(res=>{
                if(res.result){
                    this.$message.success("操作成功")
                }
            }).catch(e=>{
                // console.log("e===>",e);
                this.$message.error(e.data.message);
            });
            // http.fetchPost()

        },
        doReset(){
            let data = {
                    appName:"信息系统",
                    appId:"",
                    companyName:"XXXX科技有限公司",
                    appUrl:getLocalUrl(),
                    uploadUrl:getLocalUrl(),
                    staticUrl:getLocalUrl(),
                    logoutUrl:getLocalUrl(),
                    timeoutNumber:6000,
                    logoBlockBackground:"#f0f2f5",
                    sideMenuBackground:"#00142a",
                    sideMenuHeight:40,
                    sidebarActiveColor:"#2a93ff",
                    debug: true
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
            let url= window.location.href.split("/#")[0].replace(/:\d{4}/g,"") + ':9999/getBaseSettingApi';
            let http_ =  http;
            http_.fetchPost(url,{Vue:this,params: {}}, true).then(res=>{
                if(res.result){
                    this.$message.success("操作成功");
                    for(let attr in this.formConfig.formData){
                        this.formConfig.formData[attr] =  res.model[attr]?res.model[attr] : "";
                    }
                }
            }).catch(e=>{
                // console.log("e===>",e);
                this.$message.error(e.data.message);
            });
        }

    }
}
</script>
<style lang="less">
    .baseSetting{
        .title{
            display: block;
            width: 300px;
            margin-left: 200px;
            font-size: 16px;
            color: #333;
            line-height: 2.0;            
            text-align: left;
            padding-top:30px;
            padding-bottom: 16px;
        }
        .btnFormbox{
            margin-left: 200px;
            width: 300px;
            text-align: left;
        }
    }
</style>
