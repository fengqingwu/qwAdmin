<template>
<div class="qwFormDoc">
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="组件预览" name="first">
            <!-- <h1>{{fromTable}}</h1> -->
            <qwFormTable ref="formTable" @toolbarBtnClicked="toolbarBtnClicked" @btnTest="btnTest" :tableConfig="compConfig" :tableData="comptableData"></qwFormTable>
            <!-- <comp :config="compConfig"></comp> -->
            <p style="margin-top:40px;font-size:12px;color:#666;">测试验证：<el-button type="primary" size="mini" @click="doTest">测试</el-button></p>
        </el-tab-pane>
        <el-tab-pane label="模板代码" name="second">
            <editor  ref="editor" :content="tmplStr" :height="(sidebarHeight-120) +'px'" width="100%" lang="text" theme="chrome" :sync="true"></editor>
        </el-tab-pane>
        <el-tab-pane label="组件配置项" name="third">
            <editor  ref="editor" :content="'var Config = '+ jsonStringify(compConfig)" :height="(sidebarHeight-120) +'px'" width="100%" lang="javascript" theme="chrome" :sync="true"></editor>
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
// import comp from "../../qwComponents/formTable/formTable.vue"
import editor from 'vue2-ace'
import { mapState } from "vuex"
import qwFormTable from "../../qwComponents/formTable/formTable.vue"
import { jsonStringify } from "../../../utils/json.js"
// import ace from "../../qwComponents/ace/qwace.vue"
export default {
    name: "formTable",
    components:{
        // comp,
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
            comptableData:[
                 {
                    name: "test",
                    desc: "test",
                    trigger:"test",
                    used: "test",
                    params: "test"
                },
            ],
            tableConfig:{
                toolbarConfig: [
                ],
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
                    name: "sizeChange",
                    desc: "表格配置pagesize改变事件",
                    trigger: "选择表格下方单页显示条数后触发",
                    params:"data=>int"
                },
                {
                    name: "pageChange",
                    desc: "表格配置pageNo改变事件",
                    trigger: "选择表格下方某个页面链接后触发",
                    params:"data=>int"
                },
                {
                    name: "rowDblclick",
                    desc: "表格row双击事件",
                    trigger: "表格条目双击触发",
                    params:"data=>{...}"
                },
                {
                    name: "自定义事件",
                    desc: "绑定在toolbar item上的method或行内菜单上的method",
                    trigger: "点击toolbar按钮或行内菜单",
                    params:"请自行测试"
                },
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
                    name: "validate(func= ()=>{})",
                    desc: "验证表单数据",
                    used: "是",
                    params: "func=> function"
                },
                {
                    name: "clearValidate()",
                    desc: "验证表单数据",
                    used: "是",
                    params: "-"
                },
            ],
            tmplStr:""+`<qwFormTable @toolbarBtnClicked="toolbarBtnClicked" @btnTest="btnTest" :tableConfig="compConfig" :tableData="comptableData"></qwFormTable>`,
            activeName: "first",
            compConfig:{
                toolbarConfig: [
                        {
                            icon:"",
                            loading:false,
                            name: "测试",
                            type: "primary",
                            method:"toolbarBtnClicked",
                            disabled: false
                        },
                        {
                            icon:"",
                            loading:false,
                            name: "测试2",
                            disabled: true
                        }
                    ],
                    colConfig: [
                        {
                            field: "name",
                            label: "列名",
                            width: "200px",
                            type: "input",
                            rules: [{ required: true, trigger:["input","change"],validator(rule,value,callcack){
                                if(undefined==value || (""===value)){
                                    callcack(new Error("请输入..."))
                                }else{
                                    callcack()
                                }
                            } }],
                            formItemStyle:"width:100px;"
                        },   
                        {
                            field: "desc",
                            label: "列名2",
                            width: "200px",
                            type: "inputNumber",
                            controls: false,
                            formItemStyle:"width:100px;"
                        },                     
                        {
                            field: "trigger",
                            label: "列名3",
                            width: "200px",
                            type: "text",
                        },
                        {
                            field: "params",
                            label: "列名4",
                            type: "text",
                        },
                        {
                            type: "btnsTextWithMethod",
                            label:"菜单测试",
                            fields:[
                                {
                                    showFunc(row){
                                        return true
                                    },
                                    method: "btnTest",
                                    name: "测试"
                                },                                
                                {
                                    showFunc(row){
                                        return true
                                    },
                                    method: "btnTest",
                                    name: "测试"
                                }
                            ]
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
            }
        }
    },
    methods:{
        toolbarBtnClicked(){
            console.log(...arguments);
            alert(arguments[0]);
        },
        jsonStringify(str){
            return jsonStringify(str);
        },
        handleClick(data){
        },
        doTest(){
            let formTable = this.$refs.formTable;
            if(formTable){
                formTable.validate(()=>{
                    alert("验证通过！")
                })
            }
        },
        btnTest(){
            console.log(...arguments)
            alert("btnTestClicked!")
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


