<template>
<div class="qwFormDoc">
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="组件预览" name="first">
            <comp :config="compConfig" @formBtnClicked="formBtnClicked"></comp>
            <p>如果对话框未展示：<el-button size="small" type="primary" @click="compConfig.qwDialog.dialogVisible = true">打开对话框</el-button></p>
        </el-tab-pane>
        <el-tab-pane label="模板代码" name="second">
            <editor  ref="editor" :content="tmplStr" :height="(sidebarHeight-120) +'px'" width="100%" lang="text" theme="chrome" :sync="true"></editor>
        </el-tab-pane>
        <el-tab-pane label="组件配置项" name="third">
            <editor  ref="editor" :content="'var formConfig = '+ jsonStringify(compConfig)" :height="(sidebarHeight-120) +'px'" width="100%" lang="javascript" theme="chrome" :sync="true"></editor>
        </el-tab-pane>
         <el-tab-pane label="事件" name="fouth">
            <qwFormTable :tableConfig="tableConfig" :tableData="tableData"></qwFormTable>
        </el-tab-pane>
        <el-tab-pane label="方法" name="fifth">
            <!-- 详见 <a href="http://element-cn.eleme.io/#/zh-CN/component/dialog#dialog-dui-hua-kuang" target="blank_">element-ui对话框</a> -->
            <qwFormTable :tableConfig="tableConfig2" :tableData="tableData2"></qwFormTable>
        </el-tab-pane>
    </el-tabs>
</div>
</template>
<script>
import comp from "../../qwComponents/modelForm/modelForm.vue"
import editor from 'vue2-ace'
import { mapState } from "vuex"
import qwFormTable from "../../qwComponents/formTable/formTable.vue"
import { jsonStringify } from "../../../utils/json.js";
// import ace from "../../qwComponents/ace/qwace.vue"
export default {
    name: "demoDoc",
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
                    name: "showModal()",
                    desc: "显示对话框",
                    used: "是",
                    params: "-"
                },
                {
                    name: "closeModal()",
                    desc: "关闭对话框",
                    used: "是",
                    params: "-"
                },
                {
                    name: "resetForm()",
                    desc: "重置表单",
                    used: "是",
                    params: "-"
                },
                {
                    name: "clearValidate()",
                    desc: "清空表单验证信息",
                    used: "是",
                    params: "-"
                },
                {
                    name: "setFormData(data)",
                    desc: "设置表单FormData数据",
                    used: "是",
                    params: "data=>{...}"
                }
            ],
            tmplStr:""+`<modelForm :config="compConfig"></modelForm>`,
            activeName: "first",
            compConfig:{
                qwDialog:{                    
                    dialogVisible: false,
                    width:"600px",
                    title: "对话框标题",
                    beforeClose:(done)=>{
                        alert("关闭前=>即将关闭弹窗？")
                        if('function'==typeof(done)){
                            done();
                        }
                    },
                },
                qwForm:{
                    labelWidth: "80px",
                    items:[
                        {
                            span: 12,
                            name: "测试",
                            type: "input",
                            controlWidth: "140px",
                            key:"item1",
                            rules: [
                                { required: true, trigger:["input","blur","change"],validator(rule,value,callback){
                                    if("" === value || (undefined== value)){
                                        callback(new Error("请输入..."))
                                    }else{
                                        callback();
                                    }
                                }}
                            ]
                        },
                        {
                            span: 12,
                            name: "测试2",
                            type: "input",
                            controlWidth: "140px",
                            key:"item2",
                        }
                    ],
                    formData:{
                        item1:"",
                        item2:""
                    },
                    formBtnsStyle:"text-align:center",
                    formBtns:[
                        {
                            label:"保存",
                            type:"primary",
                            size:"mini"
                        },                        
                        {
                            label:"关闭",
                            type: "danger",
                            size:"mini"
                        }
                    ]
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
            console.log("data===>",data);
            switch (data.index) {
                case 0:
                    {
                        data.self.validate(()=>{
                            alert("验证通过！")
                        },()=>{
                            alert("验证不通过！")
                        })
                    }
                    break;            
                default:
                    {
                        this.compConfig.qwDialog.dialogVisible = false;
                    }
                    break;
            }
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
}
</style>


