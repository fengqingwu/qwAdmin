<template>
<div class="qwFormDoc">
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="组件预览" name="first">
            <comp :config="compConfig">
                <p>对话框里面内容...</p>
            </comp>
            <p>如果对话框未展示：<el-button size="small" type="primary" @click="compConfig.dialogVisible = true">打开弹窗</el-button></p>
        </el-tab-pane>
        <el-tab-pane label="模板代码" name="second">
            <editor  ref="editor" :content="tmplStr" :height="(sidebarHeight-120) +'px'" width="100%" lang="text" theme="chrome" :sync="true"></editor>
        </el-tab-pane>
        <el-tab-pane label="组件配置项" name="third">
            <editor  ref="editor" :content="'var formConfig = '+ jsonStringify(compConfig)" :height="(sidebarHeight-120) +'px'" width="100%" lang="javascript" theme="chrome" :sync="true"></editor>
        </el-tab-pane>
         <el-tab-pane label="事件" name="fouth">
            详见 <a href="http://element-cn.eleme.io/#/zh-CN/component/dialog#dialog-dui-hua-kuang" target="blank_">element-ui对话框</a>
            <!-- <qwFormTable :tableConfig="tableConfig" :tableData="tableData"></qwFormTable> -->
        </el-tab-pane>
        <el-tab-pane label="方法" name="fifth">
            详见 <a href="http://element-cn.eleme.io/#/zh-CN/component/dialog#dialog-dui-hua-kuang" target="blank_">element-ui对话框</a>
            <!-- <qwFormTable :tableConfig="tableConfig2" :tableData="tableData2"></qwFormTable> -->
        </el-tab-pane>
    </el-tabs>
</div>
</template>
<script>
import comp from "../../qwComponents/dialog/dialog.vue"
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
            ],
            tmplStr:""+`<qwDialog :config="compConfig"><p>对话框里面内容...</p></qwdialog>`,
            activeName: "first",
            compConfig:{
                dialogVisible: false,
                width:"600px",
                title: "对话框标题",
                beforeClose:(done)=>{
                    alert("关闭前=>即将关闭弹窗？")
                    if('function'==typeof(done)){
                        done();
                    }
                },
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
}
</style>


