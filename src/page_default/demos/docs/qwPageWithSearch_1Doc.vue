<template>
<div class="qwFormDoc">
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="组件预览" name="first">
            <div class="demoBox">
                <comp></comp>
            </div>
        </el-tab-pane>
        <el-tab-pane label="模板代码" name="second">
            <p style="font-size:12px;color:#666;padding-left:20px">详见： /pageWithSearchDemo/demo.vue</p>
            <!-- <editor  ref="editor" :content="tmplStr" :height="(sidebarHeight-120) +'px'" width="100%" lang="text" theme="chrome" :sync="true"></editor> -->
        </el-tab-pane>
        <el-tab-pane label="组件配置项" name="third">
            <p style="font-size:12px;color:#666;padding-left:20px">详见： /pageWithSearchDemo/demo.vue</p>            
            <!-- <editor  ref="editor" :content="'var Config = '+ jsonStringify(compConfig)" :height="(sidebarHeight-120) +'px'" width="100%" lang="javascript" theme="chrome" :sync="true"></editor> -->
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
import comp from "./pageWithSearchDemo/demo.vue"
import editor from 'vue2-ace'
import { mapState } from "vuex"
import qwFormTable from "../../qwComponents/formTable/formTable.vue"
import { jsonStringify } from "../../../utils/json.js";
// import ace from "../../qwComponents/ace/qwace.vue"
export default {
    name: "qwPageWithSearch",
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
                    name: "searchFormItemFocus",
                    desc: "搜索formItem获取焦点事件",
                    trigger: "搜索fromItem获取焦点",
                    params:"data=>{item: {…}, self: VueComponent, config: {…}}"
                },
                {
                    name: "searchFormItemInput",
                    desc: "搜索formItem输入事件",
                    trigger: "搜索fromItem输入字符",
                    params:"data=>{item: {…}, self: VueComponent, config: {…}}"
                },
                {
                    name: "searchFormItemChanged",
                    desc: "搜索formItem数据改变事件",
                    trigger: "搜索fromItem数据改变触发",
                    params:"data=>{item: {…}, self: VueComponent, config: {…}}"
                },
                {
                    name: "dialogFormItemFocus",
                    desc: "对话框formItem获取焦点事件",
                    trigger: "对话框fromItem获取焦点",
                    params:"data=>{item: {…}, self: VueComponent, config: {…}}"
                },
                {
                    name: "dialogFormItemInput",
                    desc: "对话框formItem输入事件",
                    trigger: "对话框fromItem输入字符",
                    params:"data=>{item: {…}, self: VueComponent, config: {…}}"
                },
                {
                    name: "dialogFormItemChanged",
                    desc: "对话框formItem数据改变事件",
                    trigger: "对话框fromItem数据改变触发",
                    params:"data=>{item: {…}, self: VueComponent, config: {…}}"
                },
                {
                    name: "toolbarItemClicked",
                    desc: "工具条按钮点击事件",
                    trigger: "工具条按钮单击触发",
                    params:"data=>{i: 0, j: 0, key: \"RGroup\", config: Array(1)}"
                },
                {
                    name: "formBtnClicked",
                    desc: "对话框按钮点击",
                    trigger: "对话框按钮单击",
                    params: "data=>{item: {…}, self: VueComponent, config: {…}}"
                },
                {
                    name: "getList",
                    desc: "获取列表数据",
                    trigger: "点击搜索或执行搜索逻辑时触发",
                    params: "data=>{params: {…}, self: VueComponent}"
                }                
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
                    name: "deepCopy(JSONOBJ)",
                    desc: "深度拷贝",
                    used: "是",
                    params: "JSONOBJ=>json对象"
                },
                {
                    name: "showModelForm(config,cb)",
                    desc: "配置并显示对话框且执行回调函数",
                    used: "是",
                    params: "config=>json对象，cb=>回调函数"
                },
                {
                    name: "closeModelForm(cb=()=>{})",
                    desc: "关闭对话框并执行回调",
                    used: "是",
                    params: "cb=>回调函数"
                },
                {
                    name: "clearValidate()",
                    desc: "清除对话框验证信息",
                    used: "是",
                    params: "-"
                },
                {
                    name: "setFormData(data)",
                    desc: "设置对话框数据",
                    used: "是",
                    params: "-"
                },
                {
                    name: "resetForm(cb=()=>{})",
                    desc: "重置对话框表单并执行回调函数",
                    used: "是",
                    params: "cb=>回调函数"
                },
                {
                    name: "resetSearch()",
                    desc: "清理搜索表单",
                    used: "是",
                    params: "-"
                },
                {
                    name: " doSearch()",
                    desc: "搜索数据",
                    used: "是",
                    params: "-"
                },
            ],
            tmplStr:""+`<qwForm :config="compConfig"></qwForm>`,
            activeName: "first",
            compConfig:{
            }
        }
    },
    methods:{
        jsonStringify(str){
            return jsonStringify(str);
        },
        handleClick(data){
        },
    }
}
</script>
<style lang="less">
.qwFormDoc{
    padding-left: 20px;
    .el-tabs__content{
        border:none;
    }
    .demoBox{
        box-sizing: border-box;
        padding: 0 10px;
        overflow-x: scroll;
        min-width: 800px;
        min-height: 600px;
        background: #EEE;
    }
}
</style>


