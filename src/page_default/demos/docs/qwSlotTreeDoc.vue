<template>
<div class="qwFormDoc">
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="组件预览" name="first">
            <div class="qwScrollFix" :style="{minHeight: sidebarHeight +'px',width: '300px',overflow: 'scroll'}">
            <comp ref="tree" :config="compConfig" @addNode="addNode" @editNode="editNode" @delNode="delNode">
                <template slot-scope="{node,self}">
                    <div class="nodeBox">   
                        <i class="tree_icon" :class="node.loading? 'el-icon-loading':(node.expanded? 'el-icon-caret-bottom' :'el-icon-caret-right')" :style="{color: self.styles.iconColor}" @click="self.nodeIconClick(node,node.data)"></i>
                        <span class="tree_label" @click.stop="self.nodeLabelClicked(node,node.data)" :style="((self.config.curNode&& (self.config.curNode==node))? self.styles.labelActiveSyle : self.styles.labelStyle) + (self.styles.labelTitleWidth?(';width:'+parseInt(self.styles.labelTitleWidth)+'px'):'')">{{node.data.label}}</span>
                        <span class="lebel_menuBox">
                            <el-button type="text" @click.stop="self.addNode(node,node.data)">添加</el-button>
                            <el-button v-show="node.data.id!=0" type="text" @click.stop="self.editNode(node,node.data)">编辑</el-button>
                            <el-button v-show="node.data.id!=0" type="text" @click.stop="self.delNode(node,node.data)">删除</el-button>
                        </span>
                    </div>    
                </template>   
            </comp>
            </div>
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
import comp from "../../qwComponents/tree/slotTree.vue"
import editor from 'vue2-ace'
import { mapState } from "vuex"
import qwFormTable from "../../qwComponents/formTable/formTable.vue"
import { jsonStringify } from "../../../utils/json.js";
// import ace from "../../qwComponents/ace/qwace.vue"
export default {
    name: "qwSlotTreeDoc",
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
                    name: "nodeLabelClicked",
                    desc: "树标签点击事件",
                    trigger: "树标签按钮单击",
                    params:"node=>{…}"
                },
                {
                    name: "loadChildren",
                    desc: "加载子节点事件",
                    trigger: "节点左侧三角按钮单击",
                    params:"node=>{…}"
                },
                {
                    name: "addNode",
                    desc: "添加节点事件",
                    trigger: "添加菜单单击",
                    params:"node=>{…}"
                },
                {
                    name: "editNode",
                    desc: "编辑节点事件",
                    trigger: "编辑菜单单击",
                    params:"node=>{…}"
                },
                {
                    name: "delNode",
                    desc: "删除节点事件",
                    trigger: "删除菜单单击",
                    params:"node=>{…}"
                }//loadChildren
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
                    name: "getNodeById(id)",
                    desc: "通过节点data.id获取node对象",
                    used: "是",
                    params: "id=>node.data.id"
                },
                {
                    name: "removeNodeById(id)",
                    desc: "通过节点data.id删除node节点",
                    used: "是",
                    params: "id=>node.data.id"
                },
                {
                    name: "loadChildren(node,data)",
                    desc: "加载节点数据",
                    used: "是",
                    params: "node=>node,data=>node.data"
                }
            ],
            tmplStr:""+` <qwSlotTree ref="tree" :config="compConfig" @addNode="addNode" @editNode="editNode" @delNode="delNode">
    <template slot-scope="{node,self}">
        <div class="nodeBox">   
            <i class="tree_icon" :class="node.loading? 'el-icon-loading':(node.expanded? 'el-icon-caret-bottom' :'el-icon-caret-right')" :style="{color: self.styles.iconColor}" @click="self.nodeIconClick(node,node.data)"></i>
            <span class="tree_label" @click.stop="self.nodeLabelClicked(node,node.data)" :style="((self.config.curNode&& (self.config.curNode==node))? self.styles.labelActiveSyle : self.styles.labelStyle) + (self.styles.labelTitleWidth?(';width:'+parseInt(self.styles.labelTitleWidth)+'px'):'')">{{node.data.label}}</span>
            <span class="lebel_menuBox">
                <el-button type="text" @click.stop="self.addNode(node,node.data)">添加</el-button>
                <el-button v-show="node.data.id!=0" type="text" @click.stop="self.editNode(node,node.data)">编辑</el-button>
                <el-button v-show="node.data.id!=0" type="text" @click.stop="self.delNode(node,node.data)">删除</el-button>
            </span>
        </div>    
    </template>   
</qwSlotTree>`,
            activeName: "first",
            compConfig:{  
                    isLoadFirst:true,/*初始化是否加载根元素*/               
                    propsTree: {
                    label: 'label',
                    children: 'children',
                    isLeaf: 'leaf'
                    },
                    showCheckBox: false,
                    treeData:[
                        {
                            id: 0,
                            label: '全部数据',
                            children:[]
                        }
                    ],
                    curNode:null,
                    /*加载子元素有则用此函数 无则抛出事件*/ 
                    loadChildrenFunc:(node,nodeData)=>{
                        let id = Date.parse(new Date());
                        node.loading=true;
                        node.loaded=false;
                        setTimeout(() => {
                            let data = [];
                            if(undefined==node.data.children)node.data.children=[];
                            for(let i=0;i<3; i++ ){
                                node.data.children.push({id:id+i,label:"测试数据_"+id+i,children:[]})
                            }
                            node.loading=false;
                            node.expanded=true;
                            node.loaded=true;
                        }, 500);
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
        addNode(node){
            alert("addNode")
            this.compConfig.loadChildrenFunc(node,node.data);
        },
        editNode(node){
            alert("editNode:"+JSON.stringify(node.data))
        },
        delNode(node){
            alert("delNode")
            let tree = this.$refs.tree;
            if(tree){
                tree.removeNodeById(node.data.id);
            }
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


