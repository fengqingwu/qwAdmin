<template>
<div class="sysSetting">
    <div class="menuTreeBox_set">
        <h1>系统设置选项</h1>
        <div class="treebox_set">
            <!--  @addNode="addNode" @editNode="editNode" @delNode="delNode" -->
            <qwTree ref="qwTree" :styles="treeStyles" :config="treeConfig">
                <div  slot-scope="{node}" :class="curNode&&curNode.data && curNode.data.id==node.data.id?'active':''">
                  <span @click="toggleExpended(node)" class="qwTreeIcon" :class="node.expanded? 'active':''"></span>
                  <span class="nodeLabel" :ref="'nodeLabel_' + node.data.id"  @click.stop="nodeLabelClicked(node)">{{node.data.label}}</span> 
                </div>
            </qwTree>
        </div>
    </div>
    <div class="rbox">
        <component :is="curComponent"></component>
    </div>   
    <div style="clear:both;"></div> 
</div>    
</template>
<script>
import qwTree from "../qwComponents/tree/slotTree.vue"
import baseSetting from "./baseSetting.vue"
import skinSetting from "./skinSetting.vue"
import menuSetting from "./menuSetting.vue"
import { mapState } from "vuex"
export default {
    components:{
        qwTree,
        baseSetting,
        skinSetting,
        menuSetting
    },
    data(){
        return {
            curComponent:"",
            curNode:null,
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
                                    id:1,
                                    label: '系统基础配置-API配置',
                                    component:"baseSetting",
                                    children:[]
                                },
                                {
                                    id:2,
                                    label: '系统基础属性-皮肤配置',
                                    component:"skinSetting",
                                    children:[]
                                },
                                {
                                    id:3,
                                    label: '系统基础属性-菜单配置',
                                    component:"menuSetting",
                                    children:[]
                                }
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
    computed:{
       ...mapState({
            sidebarHeight: state=> state.app.sidebarHeight
       })
    },
    mounted(){
        let tree = this.$refs.qwTree;
        if(tree){
            let node = tree.getNodeById(0);       
            if(node){
                node.expanded = true;
            }
            setTimeout(() => {
                let label = this.$refs["nodeLabel_1"];
                if(label){
                    label.click();
                }
            }, 300);
        }
    },
    methods:{
        toggleExpended(node){
            if(node&& node.data.children.length>0){
                node.expanded = !node.expanded;
            }
        },
        nodeLabelClicked(node){
            if(node.data.id>0){
                this.curNode = node;
                this.curComponent = node.data.component;
            }
        }
    }    
}
</script>
<style lang="less">
.sysSetting{
    background: #FFF;
    position: relative;
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
    .menuTreeBox_set{
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0px;
        width: 300px;
        box-sizing: border-box;
        overflow-x:scroll; 
        height: auto;
        border-right: 1px solid #E5E5E5;
        padding: 20px 0 0 20px;
        box-sizing: border-box;
        h1{
            line-height: 1;
            padding: 2px 6px;
            border-left: 3px solid #4099EF;
        }
    }
    .menuTreeBox::after{
        content: "";
        display: block;
        visibility: hidden;
        clear: both;
    }
    .treebox_set{
        box-sizing: border-box;
        padding-top: 20px;
        box-sizing: border-box;
    }
    .rbox{
        box-sizing: border-box;
        width: 100%;
        padding: 10px 0 0 300px;
    }
}
</style>
