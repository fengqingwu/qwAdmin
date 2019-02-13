<template>
<div class="pageTest">
<pageWithSearch 
        ref="page"
        :hideSearch="true"
        :searchFormConfig="searchFormConfig" 
        :toolbarConfig="toolbarConfig"
        :tableConfig="tableConfig"
        :tableData="tableData"
        @toolbarItemClicked="toolbarItemClicked"
        @getList="getList"
        @formBtnClicked="formBtnClicked"/>
</div>
</template>
<script>
let that__ =null;
import pageWithSearch from "../../../qwComponents/pageWithSearch/pageWithSearch.vue"
import { jsonStringify } from "../../../../utils/json.js" //'../../utils/json.js';
import http from "../../../../utils/public.js"
export default {
    components:{
        pageWithSearch
    },
    watch:{
        'tableConfig.currentSelectArr'(new_,old){
            this.toolbarConfig[0].RGroup.items[1].disabled = new_.length!=1
            this.toolbarConfig[0].RGroup.items[2].disabled = new_.length<1 
        }
    },
    mounted(){
        this.getOptions()
        this.doSearch();
    },
    data(){
        return {
            searchFormConfig:{
                items:[
                    // {
                    //     name: "生产设备信息",
                    //     key: "test",
                    //     controlWidth: "160px",
                    //     type: "select",
                    //     dropDown:{
                    //         data:[]
                    //     }
                    // },                    
                    // {
                    //     name: "设备分类",
                    //     key: "test",
                    //     type: "select",
                    //     controlWidth: "160px",
                    //     dropDown:{
                    //         data:[]
                    //     }
                    // },
                    // {
                    //     name: "设备状态",
                    //     key: "test",
                    //     type: "select",
                    //     controlWidth: "160px",
                    //     dropDown:{
                    //         data:[]
                    //     }
                    // }
                ],
                formData:{
                    // test:""
                }
            },
            toolbarConfig:[
                {
                    LGroup:{
                        type:"buttonGroup",
                        activeIndex:0,//激活index
                        autoChangeIndex: true,//是否内部触发更改激活index
                        items:[]
                    },
                    RGroup:{
                        type:"buttons",
                        activeIndex:0,
                        autoChangeIndex: false,
                        items:[
                            {
                                "label":"新增"
                            },
                            
                            {
                                "label":"编辑",
                                disabled: true
                            },
                            {
                                "label":"删除",
                                disabled: true
                            }
                        ]
                    }
                }
            ],
            tableConfig:{
                 toolbarConfig: [],
                   colConfig: [
                        // {
                        //     field: "macName",
                        //     label: "物流设备信息",
                        //     type: "text"
                        // },
                        {
                            field: "carName",
                            label: "设备名称",
                            type: "text"
                        },
                        {
                            field: "mcatNo",
                            label: "机联网编号",
                            type: "text"
                        },                        
                        // {
                        //     field: "macName",
                        //     label: "品牌",
                        //     type: "text"
                        // },
                        // {
                        //     field: "macName",
                        //     label: "参数规格型号",
                        //     type: "text"
                        // },
                        {
                            field: "moveSpeed",
                            label: "平移的速度",
                            type: "text"
                        },
                        {
                            field: "forkSpeed",
                            label: "伸货叉的速度",
                            type: "text"
                        },
                        {
                            field: "stalkSpeed",
                            label: "拔杆电机的速度",
                            type: "text"
                        },
                        {
                            field: "movePower",
                            label: "平移的扭距极限",
                            type: "text"
                        },
                        {
                            field: "forkPower",
                            label: "伸货叉扭距极限",
                            type: "text"
                        },
                        {
                            field: "isAlive",
                            label: "设备状态",
                            type: "text",
                            transVal(val){
                               return val == true? '在线':'离线'
                            }
                        }
                    ],
                isSelection: true, //是否可选
                isPage: true, //是否分页
                currentSelectArr: [], //当前勾选的数据
                align: "center", //文本对齐方式
                pageNo: 1,
                pageSize: 20,
                total: 0,
                isHigh: false,
                isLoading: true, //是否开启loading
                loadShow: false //loading控制
            },
            tableData:[],
            dialogFormConfig: {
                qwDialog: {
                    dialogVisible: false,
                    width: "1060px",
                    title: "新增",
                    beforeClose(done){
                        if(window.that__$$){
                            window.that__$$.formBtnClicked({index:0});
                        }                        
                        if('function' == typeof(done)){
                            return done();
                        }
                    }
                },
                qwForm:{
                    itemSpan: 8,
                    labelWidth: 130,
                    items:[
                        // {
                        //     name: "物流设备信息",
                        //     key: "test",
                        //     type: "input",
                        //     controlWidth: "180px"
                        // },                        
                        {
                            name: "设备名称",
                            controlWidth: "180px",
                            key: "carName",
                            type: "input",
                            rules: [{
                                required: true,
                                trigger:["input","change","blur"],
                                validator: (rule,value,callback)=>{
                                    if(""===value || undefined===value){
                                        callback(new Error("设备名称不能为空"))
                                    }else{
                                        callback();   
                                    }
                                }
                            }]
                        },                        
                        {
                            name: "机联网编号",
                            key: "mcatNo",
                            type: "select",
                            filterable: true,
                            controlWidth: "180px",
                            dropDown:{
                                data:[]
                            },
                            rules: [{
                                required: true,
                                trigger:["input","change","blur"],
                                validator: (rule,value,callback)=>{
                                    if(""===value || undefined===value){
                                        callback(new Error("请选择机联网编号"))
                                    }else{
                                        callback();   
                                    }
                                }
                            }]
                        },                                     
                        // {
                        //     name: "品牌",
                        //     key: "test",
                        //     type: "select",
                        //     controlWidth: "180px",
                        //     dropDown:{
                        //         data:[]
                        //     }
                        // },
                        // {
                        //     name: "参数规格型号",
                        //     key: "test",
                        //     controlWidth: "180px",
                        //     type: "input"
                        // },                        
                        {
                            name: "平移的速度",
                            key: "moveSpeed",
                            controlWidth: "180px",
                            type: "inputNumber",
                            max: 8000,
                            controls: false,
                            precisions: 0,
                            rules: [{
                                required: true,
                                trigger:["input","change","blur"],
                                validator: (rule,value,callback)=>{
                                    if(""===value || undefined===value){
                                        callback(new Error("请输入平移的速度"))
                                    } else if(value<1){
                                        callback(new Error("该项数值不能小于1"))
                                    }else{
                                        callback();   
                                    }
                                }
                            }]
                        },                 
                        {
                            name: "伸货叉的速度",
                            key: "forkSpeed",
                            controlWidth: "180px",
                            type: "inputNumber",
                            controls: false,
                            precisions: 0,
                            rules: [{
                                required: true,
                                trigger:["input","change","blur"],
                                validator: (rule,value,callback)=>{
                                    if(""===value || undefined===value){
                                        callback(new Error("请输入伸货叉的速度"))
                                    } else if(value<1){
                                        callback(new Error("该项数值不能小于1"))
                                    }else{
                                        callback();   
                                    }
                                }
                            }]
                        },                        
                        {
                            name: "拔杆电机的速度",
                            key: "stalkSpeed",
                            controlWidth: "180px",
                            type: "inputNumber",
                            controls: false,
                            precisions: 0,
                            rules: [{
                                required: true,
                                trigger:["input","change","blur"],
                                validator: (rule,value,callback)=>{
                                    if(""===value || undefined===value){
                                        callback(new Error("请输入拔杆电机的速度"))
                                    } else if(value<1){
                                        callback(new Error("该项数值不能小于1"))
                                    }else{
                                        callback();   
                                    }
                                }
                            }]
                        },                 
                        {
                            name: "平移的扭距极限",
                            key: "movePower",
                            controlWidth: "180px",
                            type: "inputNumber",
                            controls: false,
                            precisions: 0,
                            rules: [{
                                required: true,
                                trigger:["input","change","blur"],
                                validator: (rule,value,callback)=>{
                                    if(""===value || undefined===value){
                                        callback(new Error("请输入平移的扭距极限"))
                                    } else if(value<1){
                                        callback(new Error("该项数值不能小于1"))
                                    }else{
                                        callback();   
                                    }
                                }
                            }]
                        },                        
                        {
                            name: "伸货叉扭距极限",
                            key: "forkPower",
                            controlWidth: "180px",
                            type: "inputNumber",
                            controls: false,
                            precisions: 0,
                            rules: [{
                                required: true,
                                trigger:["input","change","blur"],
                                validator: (rule,value,callback)=>{
                                    if(""===value || undefined===value){
                                        callback(new Error("请输入伸货叉扭距极限"))
                                    } else if(value<1){
                                        callback(new Error("该项数值不能小于1"))
                                    }else{
                                        callback();   
                                    }
                                }
                            }]
                        },           
                        {
                            name: "设备状态",
                            key: "isAlive",
                            type: "select",
                            controlWidth: "180px",
                            dropDown:{
                                data:[
                                    {
                                        label:"在线",value: true
                                    },                                    
                                    {
                                        label:"离线",value: false
                                    }
                                ]
                            },
                             rules: [{
                                required: true,
                                trigger:["input","change","blur"],
                                message: "请选择设备状态"
                                }]
                        },

                    ],
                    formData:{
                        carName:"",
                        mcatNo:"",
                        moveSpeed:"",
                        forkSpeed:"",
                        stalkSpeed:"",
                        movePower:"",
                        forkPower:"",
                        isAlive:"",
                    },
                    formBtnsStyle:"text-align:right;padding-right:30px;padding-top:40px;",
                    formBtns:[
                        {
                            label: "取消",
                            type: "",
                            size: "mini"
                            
                        },
                        {
                            label: "保存",
                            type: "primary",
                            size: "mini"
                            
                        },
                        {
                            label: "保存并继续",
                            type: "primary",
                            size: "mini"
                            
                        },
                    ]
                }
            },/////
        }
    }, 
    methods:{
        // 获取机联网编码列表
        getOptions(){
            http.fetchGet('/transportCar/optionMcatNo').then(res=>{
                let temp = [];
                for(let attr in res.data){
                   temp.push({ label: res.data[attr], value: res.data[attr]});
                }
                this.$set(this.dialogFormConfig.qwForm.items[1].dropDown, "data",temp);
            },()=>{
                this.$message.error("获取机联网下拉列表失败！请刷新重试...")
            })
        },
        doSearch(){
            let page= this.$refs.page;
            if(page){
                page.doSearch();
            }
        },
        toolbarItemClicked(data){
            let page= this.$refs.page;
            if(!page){
                this.$message.error("页面参数错误！请刷新重试");
                return;
            }
            switch (data.j) {
                case 0:
                    {
                        this.dialogFormConfig.qwForm.formData= {
                            carName:"",
                            mcatNo:"",
                            moveSpeed:"",
                            forkSpeed:"",
                            stalkSpeed:"",
                            movePower:"",
                            forkPower:"",
                            isAlive:"",
                        };
                        this.dialogFormConfig.qwForm.formData.mod ="add"; 
                        this.dialogFormConfig.qwDialog.title ="新增物流设备";   
                        this.dialogFormConfig.qwForm.formBtns = [
                        {
                            label: "取消",
                            type: "",
                            size: "mini"
                            
                        },
                        {
                            label: "保存",
                            type: "primary",
                            size: "mini"
                            
                        },
                        {
                            label: "保存并继续",
                            type: "primary",
                            size: "mini"
                            
                        }];
                        if(this.dialogFormConfig.qwForm.formData.id) delete this.dialogFormConfig.qwForm.formData.id;
                        page.showModelForm(this.dialogFormConfig,(self)=>{
                            self.resetForm();
                        });
                    }
                    break;
                case 1:
                    {
                        if(page.tableConfig.currentSelectArr.length!=1){
                            this.$message.error("请先选择指定的数据！");
                            return;
                        }
                         this.dialogFormConfig.qwForm.formData= {
                            carName:"",
                            mcatNo:"",
                            moveSpeed:"",
                            forkSpeed:"",
                            stalkSpeed:"",
                            movePower:"",
                            forkPower:"",
                            isAlive:"",
                        };                       
                        this.dialogFormConfig.qwForm.formData.mod ="edit"; 
                        this.dialogFormConfig.qwDialog.title ="编辑物流设备"; 
                        this.dialogFormConfig.qwForm.formBtns = [
                        {
                            label: "取消",
                            type: "",
                            size: "mini"
                            
                        },
                        {
                            label: "保存",
                            type: "primary",
                            size: "mini"
                            
                        }];
                        page.showModelForm(this.dialogFormConfig,(self)=>{
                            setTimeout(() => {
                                self.setFormData( JSON.parse(jsonStringify(this.tableConfig.currentSelectArr[0])));
                                setTimeout(() => {
                                    self.clearValidate()
                                }, 30);
                            }, 30);
                        });                          
                    }   
                    break; 
                case 2:
                    {
                        this.$confirm('此操作将永久删除已选数据, 是否继续?', '删除警告', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning',
                            center: true
                        }).then(() => {
                       
                            let ids = [];
                            page.tableConfig.currentSelectArr.forEach(item => {
                                ids.push(item.id);    
                            });
                            if(ids.length==0){
                                this.$message.error("请选择需要删除的条目！");
                                return;
                            }
                            http.delete('' + `/transportCar/delete/${ids.join("_")}`).then(res=>{
                                this.$message.success("操作成功！");
                                this.doSearch();
                            },(e)=>{
                                this.$message.error("操作失败！请稍后重试...");
                            })

                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消删除'
                            });
                        });
                       
                    }break;         
                default:
                    break;
            }
        },
        getList(data){
            let params = data.params;         
            http.fetchGet('/transportCar/page/'+ params.pageNo+'/'+ params.pageSize).then(res=>{
                this.tableConfig.total= res.data.totalElements;
                this.tableConfig.loadShow = false;
                this.tableData = res.data.content;
            },res=>{
                this.$message.error("系统异常！请刷新重试...")
            })
            // 以下为debug
            // console.log("getlist");
            // let data=[];
            // for(let i= (params.pageNo-1)* params.pageSize; i< params.pageNo * params.pageSize;i++){
            //     data.push({id: i,macName:"测试"+i});
            // }
            // this.tableConfig.total=100;
            // this.tableConfig.loadShow = false;
            // this.tableData = data;
        },
        formBtnClicked(data){
            let page= this.$refs.page;
            switch (data.index) {
                case 0:
                    {
                        page.resetForm(()=>{
                            page.dialogFormConfig.qwDialog.dialogVisible = false; 
                        })     
                    }
                    break;  
                case 1:
                    {
                        this.addOrUpdate(data,true);
                    }break;   
                case 2:
                    {
                        this.addOrUpdate(data, false)
                    } break;               
                default:
                    break;
            }
        },
        setParams(data){
            for(let attr in data){
                if(""===data[attr]|| (undefined=== data[attr])){
                    delete data[attr];
                }
            }
            return data;
        },
        addOrUpdate(data, closeModel){
            data.self.validate(()=>{
                let formdata_ ={}, formData = data.self.config.formData;
                let attrs=["id","carName", "mcatNo", "isAlive", "moveSpeed", "movePower", "forkSpeed", "forkPower", "stalkSpeed"];
                for(let attr in attrs){
                    formdata_[attrs[attr]] = formData[attrs[attr]];
                }

                http.fetchPostJson("/transportCar/addOrUpdate",{Vue:this,params:this.setParams(formdata_)}).then(res=>{
                    this.$message.success("操作成功");
                    this.doSearch();
                    data.self.resetForm();
                    if(closeModel){
                        let page= this.$refs.page;
                        if(page){
                            page.closeModelForm();
                        }
                    }
                }, e=>{
                    this.$message.error(res.data.message)
                })
            })
        }
    }
}
</script>
<style lang="less">

</style>
