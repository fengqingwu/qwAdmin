<template>
<div class="qwpage">
    <!-- 所有的块 -->
    <components v-for="(item,i) in config.layers" :key="i" :is="item.is" v-bind="item"></components>
    <!-- 弹框 -->

    <!-- 配置器 -->
    <qwDragWin style="right:0;top:0" modX="R" title="页面布局"  modY="T" :width="'400px'">
        <qwTree
        :config="treeConf"></qwTree>
    </qwDragWin>
</div>    
</template>
<script>
import qwDragWin from "./qwDragWin.vue"
// import setTree from "./setTree.vue"
import qwGrid from "./qwGrid.vue"
import qwTree from "../qwComponents/tree/tree.vue"
//通用页面组件
export default {
    components:{
        qwGrid,
        qwTree,
        qwDragWin
    },
    props:{
        config:{
            type: [Array,Object],
            default(){
                return {
                    // layerActiveIndex: 0,
                    layers: [
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
                        },
                        {
                            is:"qwGrid",
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
                                        }
                                    }
                                },
                                c_1_2:{
                                    type: "dom",
                                    id: "",
                                    class: "",
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
                } 
            }
        }
    },
    data(){
        return {
            treeConf:{   
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
                            for(let i=0;i<2; i++ ){
                                node.data.children.push({id:id+i,label:"测试数据_"+id+i,children:[]})
                            }
                            node.loading=false;
                            node.expanded=true;
                            node.loaded=true;
                        }, 500);
                    }
                }
        }
    }    
}
</script>
<style lang="less">
.qwpage{

}
</style>

