<template>
<div class="qwFormDoc">
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="组件预览" name="first">
            <comp :config="compConfig"></comp>
            <!-- <p>当前表单数据：{{compConfig.formData}}</p> -->
        </el-tab-pane>
        <el-tab-pane label="模板代码" name="second">
            <editor  ref="editor" :content="tmplStr" :height="(sidebarHeight-120) +'px'" width="100%" lang="text" theme="chrome" :sync="true"></editor>
        </el-tab-pane>
        <el-tab-pane label="组件配置项" name="third">
            <editor  ref="editor" :content="'var config = '+ jsonStringify(compConfig)" :height="(sidebarHeight-120) +'px'" width="100%" lang="javascript" theme="chrome" :sync="true"></editor>
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
import comp from "../../qwComponents/filter/filter.vue"
import editor from 'vue2-ace'
import { mapState } from "vuex"
import qwFormTable from "../../qwComponents/formTable/formTable.vue"
import { jsonStringify } from "../../../utils/json.js";
// import ace from "../../qwComponents/ace/qwace.vue"
export default {
    name: "filterDoc",
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
                    name: "changFilterActiveIndex",
                    desc: "筛选激活项改变事件",
                    trigger: "筛选按钮被点击",
                    params:"data=>{i:index,j:-1}i行j列"
                },
                {
                    name: "itemBtnCloseClicked",
                    desc: "关闭按钮事件",
                    trigger: "筛选按钮上的关闭按钮被点击",
                    params:"data=>{i:index,j:-1,item}i行j列item被点击项的数据"
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
                    name: "doClick(i,j)",
                    desc: "触发筛选项的点击逻辑",
                    used: "是",
                    params: "i=>行,j=>列"
                },
                {
                    name: "getCount(item)",
                    desc: "统计当前筛选组的可用数量",
                    used: "是",
                    params: "item=>要筛选的组"
                },
            ],
            tmplStr:""+`<qwForm :config="compConfig"></qwForm>`,
            activeName: "first",
            compConfig:[
                {
                    title:"默认类型",
                    activeIndex:0,
                    filterMod:"all",
                    show:false,
                    items:[
                        {
                            id:"abc",
                            label:"测试1",
                            value:"123313"
                        },
                        
                        {
                            id:"abc",
                            label:"测试1",
                            value:"123313"
                        },
                        
                        {
                            id:"abc",
                            label:"测试1",
                            value:"123313"
                        }, 
                    ]
                },
                {
                    title:"带删除btn",
                    activeIndex:0,
                    filterMod:"all",
                    showClose: true,
                    show:false,
                    items:[
                        {
                            id:"abc",
                            label:"测试1",
                            value:"123313"
                        },
                        
                        {
                            id:"abc",
                            label:"测试1",
                            value:"123313"
                        },
                        
                        {
                            id:"abc",
                            label:"测试1",
                            value:"123313"
                        }, 
                    ]
                },
                
                {
                    title:"带筛选函数",
                    activeIndex:0,
                    filterMod:"abc",
                    showClose: false,
                    itemShowFunc(item2,mod){
                        return item2.id == mod
                    },
                    show:false,
                    items:[
                        {
                            id:"abc",
                            label:"测试1",
                            value:"123313"
                        },
                        
                        {
                            id:"abc",
                            label:"测试1",
                            value:"123313"
                        },
                        
                        {
                            id:"abcd",
                            label:"测试1",
                            value:"123313"
                        },
                        
                        {
                            id:"abc",
                            label:"测试1",
                            value:"123313"
                        }, 
                    ]
                },
                
                {
                    title:"禁用某些项",
                    activeIndex:0,
                    filterMod:"abc",
                    showClose: false,
                    itemShowFunc(item2,mod){
                        return item2.id == mod
                    },
                    show:false,
                    items:[
                        {
                            id:"abc",
                            label:"测试1",
                            disabled: true,
                            value:"123313"
                        },                        
                        {
                            id:"abc",
                            label:"测试1",
                            value:"123313"
                        }, 
                    ]
                },
                
            {
                title:"无内容",
                activeIndex:0,
                filterMod:"all",
                show:false,
                items:[]
            }            
            ]
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


