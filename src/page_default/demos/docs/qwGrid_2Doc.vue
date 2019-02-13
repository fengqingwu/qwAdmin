<template>
<div class="qwFormDoc">
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="组件预览" name="first">
            <components v-for="(item,i) in compConfig" :key="i" :is="item.is" v-bind="item"></components>
            <!-- <qwGrid v-bind="compConfig">
            </qwGrid> -->
            <!-- <p>当前表单数据：{{compConfig.formData}}</p> -->
        </el-tab-pane>
        <el-tab-pane label="模板代码" name="second">
            <editor  ref="editor" :content="tmplStr" :height="(sidebarHeight-120) +'px'" width="100%" lang="text" theme="chrome" :sync="true"></editor>
        </el-tab-pane>
        <el-tab-pane label="组件配置项" name="third">
            <editor  ref="editor" :content="'var Config = '+ jsonStringify(compConfig)" :height="(sidebarHeight-120) +'px'" width="100%" lang="javascript" theme="chrome" :sync="true"></editor>
        </el-tab-pane>
        <!-- <el-tab-pane label="事件" name="fouth">
            <qwFormTable :tableConfig="tableConfig" :tableData="tableData"></qwFormTable>
        </el-tab-pane> -->
        <el-tab-pane label="方法" name="fifth">
            <qwFormTable :tableConfig="tableConfig2" :tableData="tableData2"></qwFormTable>
        </el-tab-pane>
    </el-tabs>
</div>
</template>
<script>
import qwGrid from "../../qwComponents/qwGrid/qwGrid.vue"

// import comp from "../../qwComponents/qwGrid/qwGrid.vue"
import editor from 'vue2-ace'
import { mapState } from "vuex"
import qwFormTable from "../../qwComponents/formTable/formTable.vue"
import { jsonStringify } from "../../../utils/json.js";
// import ace from "../../qwComponents/ace/qwace.vue"
export default {
    name: "qwGrid_2Doc",
    components:{
        qwGrid,
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
                // {
                //     name: "formBtnClicked",
                //     desc: "按钮点击事件",
                //     trigger: "组件下方按钮单击",
                //     params:"data=>{btn: {…}, index: 0, config: {…}, self: VueComponent}"
                // }
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
                    name: "setAttr(attr,data)",
                    desc: "设置配置项",
                    used: "是",
                    params: "attr=>配置项的关键字,data=>要配置的值"
                },
            ],
            tmplStr:""+`<qwGrid v-bind="compConfig"></qwGrid>`,
            activeName: "first",
            compConfig:[
                {
                    is:"qwGrid",
                    label: "布局组件",
                    rows: 2,
                    columns: 2,
                    class: "layer_0",
                    childrenData:{
                        c_1_1:{
                            type: "components",
                            id: "",
                            class: "",
                            style: "width:30%;height:200px;background:rgba(0,0,0,0.3);",
                            is:"qwGrid",                                    
                            rows:1,
                            columns: 2,
                            childrenData:{
                                c_1_1:{
                                    id:"",
                                    style:"width:50%;border:1px solid #F00;height:200px;",
                                    type: "dom",
                                    html:"<h1>测试HTML</h1>"
                                },
                                c_1_2:{
                                    id:"",
                                    style: "width:48%;height:200px;display:inline-block;",
                                    type: "components",
                                    is: "qwGrid",
                                    rows: 2,
                                    columns: 1,
                                    childrenData:{
                                        c_1_1:{
                                            type:"dom",
                                            style:"width:100px;background:yellow;height:100px;",
                                            html:"<span>test</span>"
                                        },                                                
                                        c_2_1:{
                                            type:"dom",
                                            html:"<span>test2</span>"
                                        },
                                    }
                                }
                            }
                        },
                        c_1_2:{
                            type: "dom",
                            id: "",
                            class: "",
                            // html:
                            style: "width:70%;height:200px;background:#F00;",
                        },
                        c_2_1:{
                            type: "dom",
                            id: "",
                            class: "",
                            style: "width:70%;height:200px;background:#F00;",
                        },
                        c_2_2:{
                            type: "dom",
                            id: "",
                            class: "",
                            style: "width:30%;height:200px;background:#CCC;",
                        }
                    }
                }
                ]
            // {
            //     debug:false,
            //     rows:2,
            //     columns:2,
            //     childrenData:
            //     {
            //         c_1_1:{
            //             type: "components",
            //             is:"qwGrid",
            //             id: "",
            //             rows:1,
            //             columns:2,
            //             childrenData:{
            //                 c_1_1:{
            //                     type: "dom",
            //                     id: "",
            //                     class: "",
            //                     style:  "width:50%;height:32px;background:#F00",
            //                 },
            //                 c_1_2:{
            //                     type: "dom",
            //                     id: "",
            //                     class: "",
            //                     style:  "width:50%;height:32px;background:#F00",
            //                 }
            //             },
            //             class: "",
            //             style: "width:88px;height:32px;"
            //         },
            //         c_1_2:{
            //             type: "dom",
            //             id: "",
            //             class: "",
            //             style: "width:30%;height:200px;background:#ABA;"
            //         },
            //         c_2_1:{
            //             type: "dom",
            //             id: "",
            //             class: "",
            //             style: "width:30%;height:200px;background:#DDD;"
            //         },
            //         c_2_2:{
            //             type: "dom",
            //             id: "",
            //             class: "",
            //             style: "width:70%;height:200px;background:#EEE;"
            //         },
            //     }
            // }
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


