<template>
<div class="qwDemos">
   <dragBox :minWidth="300" :minHeight="sidebarHeight-pagePad-40" @dragEnd="dragEnd">
       <div>
            <h1 class="leftTitle">组件列表</h1>
            <slotTree :config="treeConfig" :styles="treeStyles">
                <div  slot-scope="{node}" :class="curNode&&curNode.data && curNode.data.id==node.data.id?'active':''">
                    <span @click="toggleExpended(node)" :ref="'nodeIcon_'+ node.data.id" class="qwTreeIcon" :class="node.expanded? 'active':''"></span>
                    <span class="nodeLabel" :ref="'nodeLabel_' + node.data.id"  @click.stop="nodeLabelClicked(node)">{{node.data.label}}</span>
                </div>
            </slotTree>
       </div>      
   </dragBox>
   <div class="rbox" :style="{paddingLeft:rboxPL+'px',minHeight:(sidebarHeight-pagePad-40)+'px'}">
       <h1 class="docTitle" v-if="curComp">组件：{{curComp.replace(/Doc$/,"")}}</h1>
       <h1 class="docTitle" v-else>框架组件文档,请选择指定的组件...</h1>
       <components :is="curComp"></components>
   </div>
</div>    
</template>
<script>
import { mapState } from "vuex";
import dragBox from "../qwComponents/dragbox/dragbox.vue"
import slotTree from "../qwComponents/tree/slotTree.vue"

import qwFormDoc from "./docs/qwFormDoc.vue"
import qwFormInlineDoc from "./docs/qwFormInlineDoc.vue"
import qwFormWithUEDoc from "./docs/qwFormWithUEDoc.vue"
import qwDialogDoc from "./docs/qwDialogDoc.vue"
import qwModelFormDoc from "./docs/qwModelFormDoc.vue"
import qwModelFormInlineDoc from "./docs/qwModelFormInlineDoc.vue"
import filterDoc from "./docs/filterDoc.vue"
import dragBoxDoc from "./docs/dragBoxDoc.vue"
import formTableDoc from "./docs/formTableDoc.vue"
import formTable2Doc from "./docs/formTable2Doc.vue"
import formTable3Doc from "./docs/formTable3Doc.vue"
import qwToolbarDoc from "./docs/qwToolbarDoc.vue"
import qwTreeDoc from "./docs/qwTreeDoc.vue"
import qwSlotTreeDoc from "./docs/qwSlotTreeDoc.vue"
import qwUeditorDoc from "./docs/qwUeditorDoc.vue"
import pageWithSearch_1Doc from "./docs/qwPageWithSearch_1Doc.vue"
import pageWithSearch_2Doc from "./docs/qwPageWithSearch_2Doc.vue"
import qwGrid_1Doc from "./docs/qwGrid_1Doc.vue"
import qwGrid_2Doc from "./docs/qwGrid_2Doc.vue"


export default {
    components:{
        dragBox,
        slotTree,
        qwFormDoc,
        qwFormInlineDoc,
        qwFormWithUEDoc,
        qwDialogDoc,
        qwModelFormInlineDoc,
        qwModelFormDoc,
        dragBoxDoc,
        filterDoc,
        formTableDoc,
        formTable2Doc,
        formTable3Doc,
        qwToolbarDoc,
        qwTreeDoc,
        qwSlotTreeDoc,
        qwUeditorDoc,
        pageWithSearch_1Doc,
        pageWithSearch_2Doc,
        qwGrid_1Doc,
        qwGrid_2Doc
    },
    computed:{
        ...mapState({
            sidebarHeight: state => state.app.sidebarHeight,
            pagePad: state=> state.skin.pagePad
        })
    },
    mounted(){
        // this.init();
    },
    data(){
        return {
            curComp: null,
            rboxPL: 340,
            curNode: null,
            treeStyles:{
                treeBoxStyle:"width:270px;height:500px;", 
                treeStyle:"",
                iconColor: "#4099FF",
                labelStyle: "font-size: 14px;color:#333",
                labelActiveSyle: "font-size: 14px;color:#4099FF",
                labelTitleWidth:120,
            },
            treeConfig:{   
                    isLoadFirst:true,/*初始化是否加载根元素*/       
                    defaultExpandAll: true,        
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
                            children:[
                                {
                                    id: 9,
                                    label: "拖拽框(dragBox)",
                                    components:"dragBoxDoc",
                                    children:[]
                                },
                                {
                                    id:1,
                                    label: '表单',
                                    components:"",
                                    children:[
                                        {
                                            id: 2,
                                            label: "常规表单(qwFormdoc)",
                                            components: "qwFormDoc",
                                            children:[]
                                        }, 
                                        {
                                            id: 3,
                                            label: "行内表单(qwFormInlineDoc)",
                                            components: "qwFormInlineDoc",
                                            children:[]
                                        },
                                        {
                                            id: 4,
                                            label: "带ueditor的表单(qwFormWithUEDoc)",
                                            components: "qwFormWithUEDoc",
                                            children:[]
                                        }
                                    ]
                                },
                                {
                                    id:5,
                                    label: '对话框',
                                    components:"qwDialogDoc",
                                    children:[]
                                },
                                {
                                    id:6,
                                    label: '表单对话框',
                                    components:"",
                                    children:[
                                        {
                                            id:7,
                                            label: '带表单的对话框(集成qwForm)',
                                            components:"qwModelFormDoc",
                                            children:[]
                                        },                                        
                                        {
                                            id:8,
                                            label: '带表单的对话框(集成FormInline)',
                                            components:"qwModelFormInlineDoc",
                                            children:[]
                                        }
                                    ]
                                },
                                {
                                    id: 10,
                                    label: "多行筛选(filter)",
                                    components:"filterDoc",
                                    children:[]
                                },
                                {
                                    id: 11,
                                    label: "表格(fromTable)",
                                    children:[
                                        {
                                            id:12,
                                            label: "常规表格",
                                            components:"formTableDoc",
                                            children:[]
                                        },
                                        {
                                            id:13,
                                            label: "表单表格",
                                            components:"formTable2Doc",
                                            children:[]
                                        },                                        
                                        {
                                            id:14,
                                            label: "多级表头表格",
                                            components:"formTable3Doc",
                                            children:[]
                                        },
                                    ]
                                }, 
                                {
                                    id:15,
                                    label: "工具条",
                                    components:"qwToolbarDoc",
                                    children:[]
                                },
                                {
                                    id:16,
                                    label: "树组件",
                                    components:"",
                                    children:[
                                        {
                                            id:17,
                                            label: "树组件1(qwTree)",
                                            components:"qwTreeDoc",
                                            children:[]
                                        },
                                        {
                                            id:18,
                                            label: "树组件2(qwSlotTree)",
                                            components:"qwSlotTreeDoc",
                                            children:[]
                                        },
                                    ]
                                },                                
                                {
                                    id:19,
                                    label: "富文本编辑器(UEditor)",
                                    components:"qwUeditorDoc",
                                    children:[]
                                },
                                {
                                    id:20,
                                    label: "CURD通用页面组件(pageWithSearch)",
                                    components:"",
                                    children:[
                                        {                                                
                                            id:21,
                                            label: "常规用法",
                                            components:"pageWithSearch_1Doc",
                                            children:[]
                                        },                                        
                                        {                                                
                                            id:22,
                                            label: "特殊用法(只需要部分功能)",
                                            components:"pageWithSearch_2Doc",
                                            children:[]
                                        }
                                    ]
                                },
                                {
                                    id:23,
                                    label: "网格组件(qwGrid)",
                                    components:"",
                                    children:[
                                        {
                                            id:24,
                                            label: "网格组件(纯插槽)",
                                            components:"qwGrid_1Doc",
                                            children:[]
                                        },
                                        {
                                            id:25,
                                            label: "网格组件(带配置组件)",
                                            components:"qwGrid_2Doc",
                                            children:[]
                                        },
                                    ]
                                },
                            ]
                        }
                    ],
                    curNode:null,
                    /*加载子元素有则用此函数 无则抛出事件*/ 
                    loadChildrenFunc:(node,nodeData)=>{
                        if(node.data.children&& node.data.children.length>0){
                            node.loaded=true;
                            node.expanded= true;
                        }
                        return;
                        // let id = Date.parse(new Date());
                        // node.loading=true;
                        // node.loaded=false;
                        // setTimeout(() => {
                        //     let data = [];
                        //     if(undefined==node.data.children)node.data.children=[];
                        //     for(let i=0;i<3; i++ ){
                        //         node.data.children.push({id:id+i,label:"测试数据_"+id+i,children:[]})
                        //     }
                        //     node.loading=false;
                        //     node.expanded=true;
                        //     node.loaded=true;
                        // }, 500);
                    }
                },
        }
    },
    methods:{
        init(){
            let root = this.$refs.nodeIcon_0;
            if(root){
                root.click();
            }
        },
        dragEnd(data){
            this.rboxPL = data.w;
        },
        toggleExpended(node){
            if(node&& node.data.children.length>0){
                node.expanded = !node.expanded;
            }
        },
        nodeLabelClicked(node){
            if(node.data.children&& (node.data.children.length>0)){
                // this.curComp = null;
                this.toggleExpended(node);
            }else{
                this.curNode = node;
                // console.log(node.data);
                this.curComp = node.data.components;
            }
        }
    }
}
</script>
<style lang="less">
.qwDemos{
    background: #FFF;
    .qwDragbox{
        float: left;
        width: 340px;
        .dragContent{
            box-sizing: border-box;
            padding: 20px 0  0 20px;
        }
        .treeOuterBox{
            width: 100%;
            border: 1px solid #F00;
        }
        .leftTitle{
            position: relative;
            font-size: 18px;
            padding-left: 8px;
            line-height: 32px;
            font-weight: 200;
            color: #333;
        }
        .leftTitle::before{
            content: "";
            position: absolute;
            top: 7px;
            left: 0;
            display: block;
            width: 3px;
            height: 18px;
            background: #4099EF;
        }
        .qwTreeIcon{
            display: inline-block;
            float: left;
            width: 20px;
            position: relative;
            height: 20px;
            transform-origin: 50% 60%;
        }
        .nodeBox .active .nodeLabel{
            color:#4099EF;
        }
        .qwTreeIcon::after{
            content: "";
            transform: scaleY(0.75);
            display: block;
            position: absolute;
            width: 0;
            height: 0;
            top: 5px;
            left: 7px;
            border: 6px solid transparent;
            border-left-color: #4099EF;
        }
        .qwTreeIcon.active{
            transform: rotate(90deg);
        }
        .nodeLabel{
            font-size: 14px;
            line-height: 20px;
        }        
    }
    .rbox{
        box-sizing: border-box;
        padding:20px;
        width: 100%;
        box-sizing: border-box;
        .docTitle{
            display: block;
            text-align: left;
            padding-left: 40px;
            padding: 20px;
        }
    }
}
</style>
