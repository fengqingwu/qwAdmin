<template>
<div class="debug_menu">
    <div class="menuTreeBox" :style="{ minHeight: sidebarHeight+'px'}">
        <h1>系统菜单配置</h1>
        <div class="treebox">
            <qwTree ref="qwTree" :config="treeConfig" @nodeLabelClicked="nodeLabelClicked" @addNode="addNode" @editNode="editNode" @delNode="delNode"></qwTree>
        </div>
    </div>
    <div class="rbox">
        <p style="padding-top:10px;">
            <el-button-group size="small">
                <el-button size="small" @click="changeRmod(0)" :type="rModActiveIndex==0?'primary':''">菜单配置</el-button>
                <el-button size="small" @click="changeRmod(1)" :type="rModActiveIndex==1?'primary':''">模拟代码</el-button>
                <el-button size="small" @click="changeRmod(2)" :type="rModActiveIndex==2?'primary':''">路由代码</el-button>
                <el-button size="small" @click="changeRmod(3)" :type="rModActiveIndex==3?'primary':''">后端导入</el-button>
            </el-button-group>
            <el-button-group size="small">
                <el-button size="small" @click="doMenu(0)">抓取系统菜单</el-button>
                <el-button size="small" @click="doMenu(1)">写入菜单</el-button>
                <el-button size="small" @click="doMenu(2)">写入路由|页面</el-button>
                <el-button size="small" @click="doMenu(3)">检测&绑定路由</el-button>
                <!-- <el-button size="small" @click="doMenu(4)">清空树</el-button>
                <el-button size="small" @click="doMenu(5)">写入树</el-button> -->


            </el-button-group>
        </p>
        <!-- monokai -->
        <div class="configbox" style="padding-top: 20px;">
            <editor  ref="editor" :content="strMenus" :height="(sidebarHeight-120) +'px'" width="100%" lang="javascript" theme="chrome" :sync="true"></editor>
        </div>
        <div class="codbox">

        </div>
    </div>
    <qwDialog ref="qwDialog" :config="dialogConfig">
        <qwForm ref="form" :config="formConfig"></qwForm>
    </qwDialog>
</div>
</template>
<script>
import qwTree from "../qwComponents/tree/tree.vue"
import qwForm from "../qwComponents/form/form.vue"
import qwDialog from "../qwComponents/dialog/dialog.vue"

import { jsonStringify, jsonParse } from "../../utils/json.js"
import http from "../../utils/public.js"

import editor from 'vue2-ace'
import 'brace/mode/javascript'
import 'brace/theme/chrome'

import { mapState } from "vuex"
export default {
    components:{
        qwTree,
        qwForm,
        qwDialog,
        editor
    },
    data(){
        return {
            rModActiveIndex:0,
            menus:[],
            files:[],
            strMenus:"",
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
                            children:[]
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

                dialogConfig:{
                    title:"弹出框标题",
                    titleStyle:"background:#FFF;",
                    dialogVisible:false,
                    width:"600px",
                    fullscreen:false,
                    top:"15vh",
                    modal:true,//遮罩
                    modalAppendToBody:true,
                    appendToBody:false,
                    lockScroll:true,
                    customClass:"",
                    closeOnClickModal:true,
                    closeOnPressEscape:true,
                    showClose:true,
                    center:false,
                    beforeClose:(done)=>{
                        if('function'==typeof(done)){
                            done();
                        }
                    }
                },
                formConfig:{
                    labelWidth:100,
                    items:[
                        {
                            key:"ptitle",
                            name:"父级菜单",
                            type:"input",
                            width:"500px",
                            controlWidth:"400px",
                            clearable: true,
                            readonly: true
                        },
                        {
                            key:"title",
                            name:"菜单名称",
                            type:"input",
                            maxLength: 20,
                            width:"500px",
                            controlWidth:"400px",
                            clearable: true,
                            rules:[{required: true,message:"该项为必填项",trigger:["input","change","blur"]}]
                        },
                        {
                            key:"link",
                            name:"路由连接",
                            type:"input",
                            width:"500px",
                            controlWidth:"400px",
                            clearable: true,
                            rules:[{required: true,message:"",trigger:["input","change","blur"],validator:(rule,value,callback)=>{
                                if(""==value){
                                    return callback(new Error("该项为必填项"))
                                }
                                if(/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/.test(value)||(/^\/[a-z|A-Z|0-9]{1,}$/.test(value))){
                                    return callback()
                                }else{
                                    return callback(new Error("该项为http|https开头的网址或该项由‘/’加上字母数字组成"))
                                }
                            }}]
                        }
                    ],
                    formData:{
                        mod:'',
                        node:null,
                        ptitle:"",
                        title:"",
                        link:"",
                    },
                    formBtnsStyle:"text-align:right;padding-top:20px;",
                    formBtns:[
                        {
                            type:"primary",
                            label:"保存",
                            size:"small",
                            style:"min-width:100px;border-radius:2px;"
                        },
                        {
                            type:"",
                            label:"取消",
                            size:"small",
                            style:"min-width:100px;border-radius:2px;margin-right:60px;"
                        }
                    ],
                    eventCB:{//回调事件
                        formBtnClicked:(data)=>{
                            this.formBtnClicked(data);
                            return false;//return false或者该函数不存在则直接触发emit "formBtnClicked" return true则不向下执行
                        }
                    }
                }
        }
    },
    watch:{
        'treeConfig.treeData':{
            handler(new_, old){
                this.changeRmod(this.rModActiveIndex);
            },
            deep: true
        }
    },
    mounted(){
        this.$on('editor-update', this.editorUpdate);
        this.$refs.editor.editor.setReadOnly(true);
        this.getSysMenu();
    },
    computed:{
        ...mapState({
            sidebarHeight : state=> state.app.sidebarHeight-40
        })
    },
    methods:{
        editorUpdate(data){
            // console.log("editorUpdate==>",data);
        },
        jsonStringify(obj){
            return jsonStringify(obj)
        },
        jsonParse(str){
            return jsonParse(str)
        },
        nodeLabelClicked(node){
            // console.log("nodeLabelClicked",node)
            // alert("点击："+ node.data.label)
        },
        addNode(node){
            if(node.level==4){
                return this.$message.error("最多仅支持3级菜单！")
            }
            this.dialogConfig.title = "添加菜单"
            let form = this.$refs.form;
            if(form)form.resetForm();
            setTimeout(() => {
                this.$set(this.formConfig.formData,"mod","add");
                this.$set(this.formConfig.formData,"node",node);
                this.$set(this.formConfig.formData,"ptitle",node.data.label);
            }, 30);
            this.showDialogAdd();
            // let id = Date.parse(new Date());
            // node.data.children.push({id:id,label:"添加数据_"+id,children:[]})
            // node.loading=false;
            // node.expanded=true;
            // node.loaded=true;
            // this.$set(node, "expended", true);
            // console.log("addNode",node)
        },
        editNode(node){
            this.dialogConfig.title = "编辑菜单"
            this.showDialogAdd();
             let form = this.$refs.form;
            if(form)form.resetForm();
            setTimeout(() => {
                this.$set(this.formConfig.formData,"mod","edit");
                this.$set(this.formConfig.formData,"node",node);
                this.$set(this.formConfig.formData,"title",node.data.label);
                this.$set(this.formConfig.formData,"link",node.data.link);
                this.$set(this.formConfig.formData,"ptitle",node.parent.data.label);
            })
            // console.log("editNode",node)
        },
        delNode(node){
            let qwTree = this.$refs.qwTree;
            if(qwTree){
                qwTree.remove(node.data.id);
            }
        },
        showDialogAdd(){
            this.dialogConfig.dialogVisible = true;            
        },
        formBtnClicked(data){
            switch (data.index) {
                case 0://保存
                    {
                        let form =  this.$refs.form;
                        if(form)form.validate(()=>{
                            let formData = data.config.formData;
                            if(formData.mod=="add"){
                                let node = formData.node;
                                if(!node){
                                    this.$message.error("系统错误！请刷新重试！");
                                    return;
                                }
                                let id = Date.parse(new Date());
                                node.data.children.push({id:id,label:formData.title,link: formData.link,children:[]})
                                node.loading=false;
                                node.expanded=true;
                                node.loaded=true;
                                this.$set(node, "expended", true);
                                form.resetForm();
                                this.dialogConfig.dialogVisible = false;
                            }else if( formData.mod=="edit"){
                                let node = formData.node;
                                if(!node){
                                    this.$message.error("系统错误！请刷新重试！");
                                    return;
                                }
                                this.$set(node.data,'label',formData.title)
                                this.$set(node.data,'link',formData.link);
                                form.resetForm();
                                this.dialogConfig.dialogVisible = false;
                            }
                           
                        })
                    }
                    break;
                case 1:{
                    let form = this.$refs.form;
                    if(form)form.resetForm();
                    this.dialogConfig.dialogVisible = false;
                }    
            
                default:
                    break;
            }
        },
        changeRmod(index){
            this.rModActiveIndex = index;
            switch (index) {
                case 0:{
                    let config=`/*菜单配置数据*/

`+
                    jsonStringify(this.transReal(this.treeConfig.treeData[0].children))
                    this.strMenus = config;
                }break;
                case 1:{
                    this.strMenus =`/*此代码用于index.html  app-menu项 用于模拟后台传递的权限菜单参数*/

`+
                    jsonStringify(this.transTreeData2ServerMenu(this.treeConfig.treeData[0].children,0));
                }break;
                case 2:{
                   this.strMenus = this.buildRouter()
                }break;
                case 3:{//用于后台导入

                }break;
                default:
                    break;
            }
        },
        buildRouter(){
             let files=[];
             let routers = this.transTreeData2Router(this.treeConfig.treeData[0].children);
                    let imports=`/* 请将此代码粘贴到 src/router/router.js */

`;
                    for(let item of routers){
                        files.push(`/page/${item.component}/${item.component}.vue`+'');
                        imports+=`import ${item.component} from "../page/${item.component}/${item.component}.vue"
`
                    }
                    this.files=files;
                    imports += `

export default `
                    return imports + jsonStringify(routers).replace(/(\"component\"\:) (\")([a-z|A-Z|0-9]{1,})(\")/g, "$1$3");
        },
        transReal(data,pid){
            let menu=[];
            for(let item of data){
                let menuItem={
                    id:item.id,
                    pid:pid,
                    title:item.label,
                    link: item.link,                    
                    childrens:[]
                };
                if(!item.children || item.children.length==0){
                    menu.push(menuItem);
                }else{
                    menuItem.childrens = this.transReal(item.children,menuItem.id);
                    menu.push(menuItem);
                }
            }
            return menu;
        },
        transTreeData2menuData(data){
            if(data.length==0){
                this.menus=[];
            }else this.menus = this.transReal(data,0);
            this.strMenus=`/*可以用于/src/page_default/index/index.vue 模拟菜单 */
` + jsonStringify(this.menus);
        },
        transTreeData2ServerMenu(data,pid){
            let menu =[];
            for(let item of data){
                menu.push({
                    "id": item.id,
                    "parentId": pid,
                    "alias": item.label,
                    "code":  item.link.replace(/^\/{1}/, ""),
                    "descs": item.label,
                    "buttonList": [],
                    "childList": []
                });
                if(item.children && item.children.length>0){
                    let temp = this.transTreeData2ServerMenu(item.children,item.id);
                    for(let item2 of temp){
                        menu.push(item2);
                    }
                }
            }
            return menu;
        },
         transTreeData2Router(data){
            let menu =[];
            for(let item of data){
                if(item.children && item.children.length>0){
                    let temp = this.transTreeData2Router(item.children);
                    for(let item2 of temp){
                        menu.push(item2);
                    }
                }else{
                    if(!(/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/.test(item.link))){
                        menu.push({
                            path: item.link,
                            name: item.link.replace(/^\/{1}/, ""),
                            component: item.link.replace(/^\/{1}/, "")
                        });
                    }
                }
            }
            return menu;
        },
        doMenu(index){
            switch (index) {
                case 0:
                    {
                        this.getSysMenu();
                    }
                    break;
                case 1: //写入菜单
                    {
                        if(this.treeConfig.treeData[0].children.length==0){
                            this.$message.error("请添加至少1条菜单数据！")
                            return;
                        }
                        let url= window.location.href.split("/#")[0].replace(/:\d{4}/g,"") + ':9999/writeMenu';
                        let http_ =  http;
                        http_.fetchPost(url,{Vue:this,params:{ menus: JSON.stringify(this.transTreeData2ServerMenu(this.treeConfig.treeData[0].children,0)),files: jsonStringify(this.files)}}, true).then(res=>{
                            this.$message.success("操作成功！请刷新页面！")
                        }).catch(e=>{
                            this.$message.error("操作失败！请稍后重试")
                        });
                    }
                    break;
                case 2://写入路由界面
                    {
                        let url= window.location.href.split("/#")[0].replace(/:\d{4}/g,"") + ':9999/writeRoute';
                        let http_ =  http;
                        http_.fetchPost(url,{Vue:this,params:{content: this.buildRouter(),files: jsonStringify(this.files)}}, true).then(res=>{
                            this.$message.success("操作成功！")
                        }).catch(e=>{
                            this.$message.error("操作失败！请稍后重试")
                        });
                    }
                    break;
                
                case 3://写入路由界面
                    {
                        let url= window.location.href.split("/#")[0].replace(/:\d{4}/g,"") + ':9999/writeRouteLink';
                        let http_ =  http;
                        http_.fetchPost(url,{Vue:this,params:{content: this.buildRouter(),files: jsonStringify(this.files)}}, true).then(res=>{
                            this.$message.success("操作成功！")
                        }).catch(e=>{
                            this.$message.error("操作失败！请稍后重试")
                        });
                    }
                    break;
                default:
                    break;
            }
        },
        resetData(){
            let tree = this.$refs.qwTree;
                if(tree){
                    let node = tree.getNodeById(0);                        
                    this.$set(node.data,"children",[]);
                    tree.removeNodeById(0);
                    this.$set(this.treeConfig, 'treeData',[
                    {
                        id: 0,
                        label: '全部数据',
                        children:[]
                    }
                ])
            }
        },
        transTreeData2ImportJson(treeData){
            let temp =[];
            for(let item of treeData){

            }
        },
        transMenuData2TreeData(menus){
            let treeData=[];
            for(let item of menus){
                let treeItem = {
                    id: item.id,
                    label: item.title,
                    link: item.link,
                    children:[]
                };
                if(item.childrens && item.childrens.length>0){
                    treeItem.children = this.transMenuData2TreeData(item.childrens);
                }
                treeData.push(treeItem)
            }
            return treeData;
        },
         /* 将后台菜单转换为app菜单 */
        transMenuServerToApp(menu,pid){
            let menu_ =[];
            for(let item of menu){
                if(item.parentId==pid){
                    let menuItem = {
                        "id": item.id,
                        "title": item.alias,
                        "link": (/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/.test(item.code))? item.code : '/' + item.code,
                        "childrens": []
                    }
                    menuItem.childrens = this.transMenuServerToApp(menu, item.id)
                    menu_.push(menuItem);
                }
            }
            return menu_
        },
        getSysMenu(){
            this.resetData();            
            let url= window.location.href.split("/#")[0].replace(/:\d{4}/g,"") + ':9999/getMenu'; 
            let http_ =  http;
            http_.fetchPost(url,{Vue:this,params:{}}, true).then(res=>{
                let menu = JSON.parse(res.match);
                let tree= this.$refs.qwTree;
                if(tree){
                    let node= tree.$refs.tree.getNode(0);
                        if(node){  
                            node.expanded=false;
                            node.loaded = true;
                            node.loading= true;
                            this.$set(this.treeConfig.treeData[0],"children", this.transMenuData2TreeData(this.transMenuServerToApp(menu,0)));
                            setTimeout(() => {
                                node.expanded = true;
                                node.loaded = true;
                                node.loading = false;
                            }, 30);
                        }
                }
             })
           
        },
    }
}
</script>
<style lang="less">
.debug_menu{
    background: #FFF;
    .menuTreeBox{
        float: left;
        width: 400px;
        overflow-x:scroll; 
        height: auto;
        border-right: 1px solid #E5E5E5;
        padding: 20px;
        box-sizing: border-box;
        h1{
            line-height: 1;
            padding: 2px 6px;
            border-left: 3px solid #06F;
        }
    }
    .menuTreeBox::after{
        content: "";
        display: block;
        visibility: hidden;
        clear: both;
    }
    .treebox{
        padding-top:20px;
    }
    .rbox{
        box-sizing: border-box;
        width: 100%;
        padding: 10px 0 0 410px;
    }
}
</style>
