<template>
<div class="qwTree" :style="(styles.treeBoxStyle)+ ';width:'+((maxLevel-1)* 18 + 290)+'px'">
<el-tree
    ref="tree"
    :props="config.propsTree"
    :style="(styles.treeStyle? styles.treeStyle:'')"
    :data="config.treeData"
    :show-checkbox="config.showCheckBox"
    :default-expand-all="config.defaultExpandAll == true"
    node-key="id"
    :filter-node-method="filterNode"
    :expand-on-click-node="false">
     <div class="nodeBox" slot-scope="{ node, data}">   
        <slot :node="node" :self="getRef()"></slot>
     </div>    
</el-tree>      
</div>  
</template>
<script>
export default {
    props:{
        styles:{
            type:Object,
            default:()=>{
                return{
                    treeBoxStyle:"width:300px;height:500px;",
                    treeStyle:"",
                    iconColor: "#4099FF",
                    labelStyle: "font-size: 14px;color:#333",
                    labelActiveSyle: "font-size: 14px;color:#4099FF",
                    labelTitleWidth:140,
                }
            }
        },
        config:{
            type:Object,
            default:()=>{
                return {   
                    isLoadFirst:true,/*初始化是否加载根元素*/               
                    propsTree: {
                        id: "id",
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
        }
    },
    data(){
        return {
            maxLevel:1,
        }
    },
    created(){
        if(!this.styles.labelTitleWidth){
            this.styles.labelTitleWidth=140;
        }
    },
    methods:{
        getRef(){
            return this
        },
        // resetData(data){
        //     this.config.treeData = data;
        // },
        getNodeById(id){
            if(null== id || (undefined == id)){
                return null;
            }
            let tree = this.$refs.tree;
            if(tree){
                return tree.getNode(id)
            }
        },
        removeNodeById(id){
             if(null== id || (undefined == id)){
                return null;
            }
            let tree = this.$refs.tree;
            if(tree){
                tree.remove(id)
            }
        },
        nodeLabelClicked(node,data){
            // if(node.data.id!=0){
            this.$set(this.config,"curNode",node);
            // }
            this.$emit("nodeLabelClicked",node)
        },
        nodeIconClick(node,data){
            alert(12);
            if(node.loaded){
                node.expanded = !node.expanded;
            }else{
                this.loadChildren(node,data);
            }
        },
        loadChildren(node,data){
            if('function' == typeof(this.config.loadChildrenFunc)){
                this.config.loadChildrenFunc(node,data);
            }else{              
                this.$emit("loadChildren",node);
            }
            setTimeout(() => {
                this.maxLevel=this.maxLevel> (node.level+1)? this.maxLevel :node.level+1;
            }, 200);
        },
        addNode(node,data){
            this.$emit("addNode",node)
            setTimeout(() => {
                this.maxLevel=this.maxLevel> (node.level+1)? this.maxLevel :node.level+1;
            }, 200);
        },
        editNode(node,data){
            this.$emit("editNode",node)
        },
        remove(id){
            this.$refs.tree.remove(id);
        },
        setCheckedKeys(keys){
             let tree = this.$refs.tree;
             if(!tree){
                return null;
            }else{
                if(keys && (keys.length>-1)){
                    tree.setCheckedKeys(keys)
                }
            }
            
        },
        getCheckedData(){
            let tree = this.$refs.tree;
            if(!tree){
                return null;
            }else{
                return tree.getCheckedNodes();
            }
        },
        delNode(node,data){            
            this.$emit("delNode",node)
        },
        /*筛选tree数据*/
        filterNode(value,data) {
            if(data.id==0){
                return true;
            }else{
                if(value.status==0){
                    if(value.keyWords!=""){
                         return data.label.indexOf(value.keyWords)>=0;
                     }else{
                         return true;
                    }
                 }else{
                    let tag= value.status==1? true:false;
                     if(data.isAble==tag){
                         if(value.keyWords!=""){
                             return data.label.indexOf(value.keyWords)>=0;
                         }else{
                             return true;
                         }
                     }
                }
            }
        },
    }
}
</script>
<style lang="less">
.qwTree{
    .el-tree-node__loading-icon.el-icon-loading{
        display: none;
    }
    .nodeBox{
        width: 100%;
    }
    .tree_icon{
        box-sizing: border-box;
        padding: 4px;
        float: left;
    }
    .el-tree-node__expand-icon.el-icon-caret-right{
        display: none;
    }
    .tree_label{
        display: inline-block!important;
        overflow: hidden;
        box-sizing: border-box;
        padding-top:2px;
        white-space: nowrap!important;
        float: left;
    }
    .lebel_menuBox{
        padding: 0 10px 0 10px;
        // float: right;
        .el-button{
            padding: 0;
            height: 20px;
        }
        .el-button +.el-button{
            margin-left: 0;
        }
    }
}
</style>
