<template>
<div class="qwFormDoc">
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="组件预览" name="first">
            <p style="font-size:12px;color:#666;">单行工具条:</p>
            <comp :config="compConfig"></comp>
            <p style="font-size:12px;color:#666;">多行工具条:</p>
            <comp :config="compConfig2"></comp>
            <!-- <p>当前表单数据：{{compConfig.formData}}</p> -->
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
import comp from "../../qwComponents/qwToolbar/qwToolbar.vue"
import editor from 'vue2-ace'
import { mapState } from "vuex"
import qwFormTable from "../../qwComponents/formTable/formTable.vue"
import { jsonStringify } from "../../../utils/json.js";
// import ace from "../../qwComponents/ace/qwace.vue"
export default {
    name: "qwDialog",
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
                    name: "itemClicked",
                    desc: "按钮点击事件",
                    trigger: "非禁用的按钮被单击",
                    params:"data=>{i:i,j:j,key:\"LGroup|RGroup\",config: this.config}"
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
                // {
                //     name: "getRef()",
                //     desc: "获取this对象",
                //     used: "是",
                //     params: "-"
                // },
            ],
            tmplStr:""+`<qwToolbar :config="compConfig"></qwToolbar>`,
            activeName: "first",
            compConfig:[
                {
                    LGroup:{
                        type:"buttonGroup",
                        activeIndex:0,//激活index
                        autoChangeIndex: true,//是否内部触发更改激活index
                        items:[
                            {
                                "label":"全部"
                            },
                            {
                                "label":"只显示启用"
                            },
                            {
                                "label":"只显示停用"
                            },
                        ]
                    },
                    RGroup:{
                        type:"buttons",
                        activeIndex:0,
                        autoChangeIndex: false,
                        items:[
                            {
                                "label":"新建"
                            },
                            
                            {
                                disabled: true,
                                "label":"编辑"
                            },
                            {
                                disabled: true,
                                "label":"删除"
                            },
                            {
                                "label":"启停"
                            }
                        ]
                    }
                }
            ],
            compConfig2:[
                {
                    LGroup:{
                        type:"buttonGroup",
                        activeIndex:0,//激活index
                        autoChangeIndex: true,//是否内部触发更改激活index
                        items:[
                            {
                                "label":"全部"
                            },
                            {
                                "label":"只显示启用"
                            },
                            {
                                "label":"只显示停用"
                            },
                        ]
                    },
                    RGroup:{
                        type:"buttons",
                        activeIndex:0,
                        autoChangeIndex: false,
                        items:[
                            {
                                "label":"新建结构"
                            },
                            
                            {
                                disabled: true,
                                "label":"编辑"
                            },
                            {
                                "label":"删除"
                            },
                            {
                                "label":"启停"
                            }
                        ]
                    }
                },
                
                {
                    LGroup:{
                        type:"buttonGroup",
                        activeIndex:0,//激活index
                        autoChangeIndex: true,//是否内部触发更改激活index
                        items:[
                            {
                                "label":"全部"
                            },
                            {
                                "label":"只显示启用"
                            },
                            {
                                "label":"只显示停用"
                            },
                        ]
                    },
                    RGroup:{
                        type:"buttons",
                        activeIndex:0,
                        autoChangeIndex: false,
                        items:[
                            {
                                "label":"新建结构"
                            },
                            
                            {
                                "label":"编辑"
                            },
                            {
                                "label":"删除"
                            },
                            {
                                "label":"启停"
                            }
                        ]
                    }
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


