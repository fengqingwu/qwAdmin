<template>
<div class="qwFormDoc">
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="组件预览" name="first">
            <comp :config="compConfig" @formBtnClicked="formBtnClicked">
                <template slot-scope="{config, item, self}" slot="formItemExtend">
                    <el-form-item  
                    v-if="item.type=='qwInput'"
                    :class="item.itemClass"
                    :label="item.name"
                    :prop="item.key"
                    :rules="item.rules? item.rules : [{required:false}]"
                    :style="self.buildItemStyle(item,config)">
                        <input type="text" class="el-input__inner" v-model="config.formData[item.key]">
                    </el-form-item>
                </template>
            </comp>
            <p>当前表单数据：{{compConfig.formData}}</p>
        </el-tab-pane>
        <el-tab-pane label="模板代码" name="third">
            <editor  ref="editor" :content="tmplStr" :height="(sidebarHeight-120) +'px'" width="100%" lang="text" theme="chrome" :sync="true"></editor>
        </el-tab-pane>
        <el-tab-pane label="组件配置项" name="second">
            <editor  ref="editor" :content="'var formConfig = '+ jsonStringify(compConfig)" :height="(sidebarHeight-120) +'px'" width="100%" lang="javascript" theme="chrome" :sync="true"></editor>
        </el-tab-pane>
        <el-tab-pane label="事件" name="fouth">
            <qwFormTable :tableConfig="tableConfig" :tableData="tableData"></qwFormTable>
        </el-tab-pane>
        <el-tab-pane label="方法" name="fifth">
            <qwFormTable :tableConfig="tableConfig2" :tableData="tableData2"></qwFormTable>
        </el-tab-pane>
    </el-tabs>
</div>
</template>
<script>
import comp from "../../qwComponents/form/formWithUeditor.vue"
import editor from 'vue2-ace'
import { mapState } from "vuex"
import qwFormTable from "../../qwComponents/formTable/formTable.vue"
import { jsonStringify } from "../../../utils/json.js";
// import ace from "../../qwComponents/ace/qwace.vue"
export default {
    name: "qwFormWithUEDoc",
    components:{
        comp,
        editor,
        qwFormTable,
        // ace
    },
    computed:{
        ...mapState({
            sidebarHeight: state => state.app.sidebarHeight
        })
    },
    data(){
        return {
            tableConfig:{
                toolbarConfig: [],
                   colConfig: [
                        {
                            field: "name",
                            label: "事件",
                            width: "200px",
                            type: "text",
                        },   
                        {
                            field: "desc",
                            label: "名称",
                            width: "200px",
                            type: "text",
                        },                     
                        {
                            field: "trigger",
                            label: "触发方式",
                            width: "200px",
                            type: "text",
                        },
                        {
                            field: "params",
                            label: "参数",
                            type: "text",
                        },
                    ],
                isSelection: false, //是否可选
                isPage: false, //是否分页
                currentSelectArr: [], //当前勾选的数据
                align: "center", //文本对齐方式
                pageNo: 1,
                pageSize: 20,
                total: 0,
                isHigh: false,
                isLoading: true, //是否开启loading
                loadShow: false //loading控制
            },
            tableData:[
                {
                    name: "formBtnClicked",
                    desc: "按钮点击事件",
                    trigger: "组件下方按钮单击",
                    params:"data=>{btn: {…}, index: 0, config: {…}, self: VueComponent}"
                },
                {
                    name: "submitForm",
                    desc: "提交表单事件",
                    trigger: "调用组件内置函数submitForm并验证成功后触发",
                    params:"data=>{formData:{…}, self: VueComponent}"
                },
                {
                    name: "formItemChanged",
                    desc: "表单项change事件",
                    trigger: "表单项的值改变时触发",
                    params:"data=>{item:{…},self:VueComponent,config:{…}}"
                },
                {
                    name: "formItemFocus",
                    desc: "表单项focus事件",
                    trigger: "表单项获取焦点时触发",
                    params:"data=>{item:{…},self:VueComponent,config:{…}}"
                },
                {
                    name: "formItemInput",
                    desc: "表单项input事件",
                    trigger: "表单项输入时触发",
                    params:"data=>{item:{…},self:VueComponent,config:{…}}"
                },
                {
                    name: "formItemChange",
                    desc: "表单项更改后事件",
                    trigger: "表单项更改时触发,在input和change事件后触发此事件",
                    params:"data=>{item:{…},self:VueComponent,config:{…}}"
                },//
            ],
            tableConfig2:{
                toolbarConfig: [],
                   colConfig: [
                        {
                            field: "name",
                            label: "函数",
                            width: "200px",
                            type: "text",
                        },   
                        {
                            field: "desc",
                            label: "描述",
                            width: "200px",
                            type: "text",
                        },
                        {
                            field: "used",
                            label: "是否可外部调用",
                            type: "text",
                        },
                        {
                            field: "params",
                            label: "参数说明",
                            type: "text",
                        }
                    ],
                isSelection: false, //是否可选
                isPage: false, //是否分页
                currentSelectArr: [], //当前勾选的数据
                align: "center", //文本对齐方式
                pageNo: 1,
                pageSize: 20,
                total: 0,
                isHigh: false,
                isLoading: true, //是否开启loading
                loadShow: false //loading控制
            },
            tableData2:[
                {
                    name: "getRef()",
                    desc: "获取this对象",
                    used: "是",
                    params: "-"
                },
                {
                    name: "qwRemoteMethod(keywords,formItem)",
                    desc: "获取this对象",
                    params: "-",
                    used: "否"
                },
                {
                    name: "buildItemStyle(item,config)",
                    desc: "构建form表单项的样式",
                    params: "-",
                    used: "否"
                },
                {
                    name: "fromBtnClicked(btn,i,config)",
                    desc: "form表单项单击事件回调",
                    params: "-",
                    used: "否"
                },
                {
                    name: "validate(func=()=>{},funcErr=()=>{})",
                    desc: "验证form表单",
                    params: "-",
                    used: "是"
                },
                {
                    name: "resetForm()",
                    desc: "重置form表单",
                    params: "-",
                    used: "是"
                },
                {
                    name: "clearValidate() ",
                    desc: "清空form表单验证状态",
                    params: "-",
                    used: "是"
                },
                {
                    name: "submitForm() ",
                    desc: "验证form表单并抛出submitForm事件",
                    params: "-",
                    used: "是"
                },
                {
                    name: "formItemChanged(item)",
                    desc: "表单项改变事件回调",
                    params: "-",
                    used: "否"
                },
                {
                    name: "formItemFocus(item)",
                    desc: "表单项获取焦点回调",
                    params: "-",
                    used: "否"
                },
                {
                    name: "formItemBlur(item)",
                    desc: "表单项失去焦点回调",
                    params: "-",
                    used: "否"
                },
                {
                    name: "formItemInput(item)",
                    desc: "表单项输入事件回调",
                    params: "-",
                    used: "否"
                },
                {
                    name: "formItemChange(item)",
                    desc: "表单项改变后事件回调",
                    params: "-",
                    used: "否"
                },//formItemInput(item)
            ],            
            tmplStr:""+`<qwFormWithUeditor :config="compConfig" @formBtnClicked="formBtnClicked">
<template slot-scope="{config, item, self}" slot="formItemExtend">
    <el-form-item  
    v-if="item.type=='qwInput'"
    :class="item.itemClass"
    :label="item.name"
    :prop="item.key"
    :rules="item.rules? item.rules : [{required:false}]"
    :style="self.buildItemStyle(item,config)">
        <input type="text" class="el-input__inner" v-model="config.formData[item.key]">
    </el-form-item>
</template>
</qwFormWithUeditor>`,
            activeName: "first",
            compConfig: {
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
                    },
                    {
                        type: "br"
                    },                                   
                    {
                        name: "插槽测试：",
                        type: "labelInfo",
                        itemClass:"lineTitle",
                        controlWidth: "0",
                        formItemStyle: "width:200px;",
                        key: "labelInfo"
                    },
                    {
                        name:"自定义输入框",
                        type: "qwInput",
                        key: "item17"
                    },
                    {
                        type: "br"
                    },                                   
                    {
                        name: "富文本框：",
                        type: "labelInfo",
                        itemClass:"lineTitle",
                        controlWidth: "0",
                        formItemStyle: "width:200px;",
                        key: "labelInfo"
                    },
                    {
                        name:"UEditor",
                        type: "ueditor",
                        key: "item18",
                        controlWidth: "600px",
                        editorConfig:{}
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
                    item17:"",
                    item18:""
                }
            }
        }
    },
    methods:{
        jsonStringify(str){
            return jsonStringify(str);
        },
        handleClick(data){
        },
        formBtnClicked(data){
            alert("第" + (data.index+1) + "个按钮点击！");
            console.log("第" + (data.index+1) + "个按钮点击！事件参数=>",data);
        }
    }
}
</script>
<style lang="less">
.qwFormDoc{
    padding-left: 20px;
    .el-tabs__content{
        border:none;
    }
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


