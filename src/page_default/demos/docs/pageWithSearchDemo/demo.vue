<template>
<div class="pageTest">
<pageWithSearch 
        ref="page"
        :searchFormConfig="searchFormConfig" 
        :toolbarConfig="toolbarConfig"
        :tableConfig="tableConfig"
        :tableData="tableData"
        @searchFormItemFocus="searchFormItemFocus"
        @toolbarItemClicked="toolbarItemClicked"
        @getList="getList"
        @formBtnClicked="formBtnClicked"/>
    <!-- <qwDialog :config="dialogConfigPos">
        <dfPos></dfPos>
    </qwDialog> -->
</div>
</template>
<script>
import {
    productionInsert,
    productionUpdate,
    productionFind,
    productionFindMacCodeOption,
    productionMacTypeOption
  } from "./api.js";

import pageWithSearch from "../../../qwComponents/pageWithSearch/pageWithSearch.vue"

// import dfPos from "./dfPos.vue"
// import qwDialog from "../../page_default/qwComponents/dialog/dialog.vue"

import { jsonStringify } from '../../../../utils/json.js';
export default {
    components:{
        // qwDialog,
        pageWithSearch,
        // dfPos
    },
    watch:{
        'tableConfig.currentSelectArr'(new_,old){
            this.toolbarConfig[0].RGroup.items[1].disabled = new_.length!=1
            this.toolbarConfig[0].RGroup.items[2].disabled = new_.length<1 
        }
    },
    mounted(){
        this.doSearch();
    },
    data(){
        return {
            // dialogConfigPos:{
            //     title:"选择设备所在位置",
            //     dialogVisible: false,
            //     width: "1200px"
            // },
            searchFormConfig:{
                items:[
                    {
                        name: "生产设备名称",
                        key: "equimentName",
                        controlWidth: "160px",
                        type: "input"
                    },                    
                    {
                        name: "设备分类",
                        key: "equimentType",
                        type: "select",
                        controlWidth: "160px",
                        dropDown:{
                            data:[]
                        }
                    },
                    {
                        name: "设备状态",
                        key: "equimentStatu",
                        type: "select",
                        controlWidth: "180px",
                        dropDown:{
                            data:[
                                {
                                    label: "正常",
                                    value: 0
                                },
                                {
                                    label: "维修保养中",
                                    value: 1
                                },
                                {
                                    label: "停用",
                                    value: 2
                                }
                            ]
                        }
                    }
                ],
                formData:{
                    equimentNo:"",
                    equimentType:"",
                    equimentStatu:""
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
                        {
                            field: "equimentInfo",
                            label: "生产设备信息",
                            type: "text",
                            transVal(val){
                                return val===""|| (val==undefined) ? "-" :  val;
                            }
                        },
                        {
                            field: "equimentType",
                            label: "设备分类",
                            type: "text",
                            transVal(val){
                                return val===""|| (val==undefined) ? "-" :  val;
                            }
                        },
                        {
                            field: "commonCode",
                            label: "机联网编号",
                            type: "text",
                            transVal(val){
                                return val===""|| (val==undefined) ? "-" :  val;
                            }
                        },
                        {
                            field: "otherProperty",
                            label: "参数规格型号",
                            type: "text",
                            transVal(val){
                                return val===""|| (val==undefined) ? "-" :  val;
                            }
                        },
                        {
                            field: "brand",
                            label: "品牌",
                            type: "text",
                            transVal(val){
                                return val===""|| (val==undefined) ? "-" :  val;
                            }
                        },
                        {
                            field: "positionId",
                            label: "前端位置ID",
                            type: "text",
                            transVal(val){
                                return val===""|| (val==undefined) ? "-" : "#"+ val;
                            }
                        },
                        {
                            field: "equimentStatu",
                            label: "设备状态",
                            type: "text",
                            transVal(val){
                                if(undefined === val || (""===val)){
                                    return "-";
                                }else if(val==0){
                                    return "正常"
                                }else if(val == 1){
                                    return "维修保养中"
                                }else if(val == 2){
                                    return "停用"
                                }
                            }
                        }
                    ],
                isSelection: true, //是否可选
                isPage: false, //是否分页
                currentSelectArr: [], //当前勾选的数据
                align: "center", //文本对齐方式
                pageNo: 1,
                pageSize: 10000,
                total: 0,
                isHigh: false,
                isLoading: true, //是否开启loading
                loadShow: false, //loading控制
                qdId:""
            },
            tableData:[],
            dialogFormConfig: {
                qwDialog: {
                    dialogVisible: false,
                    width: "1000px",
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
                    labelWidth: 128,
                    items:[
                        {
                            name: "生产设备编码",
                            key: "equimentNo",
                            type: "input",
                            maxLength: 20,
                            controlWidth: "180px",
                            rules:[
                                { required: true,trigger:["input","change","blur"],validator:(rule,value,callback)=>{
                                    if(""=== value || (undefined==value)){
                                        callback(new Error("请输入生产设备编码"));
                                    }else if(!(/^[a-z|A-Z]{1}[a-z|A-Z|0-9]{5,19}$/.test(value))){
                                        callback(new Error("必须由字母开头、字母和数字组成（长度6-20位）"))
                                    }else{
                                        callback();
                                    }
                                }}
                            ]
                        },                        
                        {
                            name: "生产设备名称",
                            controlWidth: "180px",
                            key: "equimentName",
                            maxLength: 40,
                            type: "input",
                            rules:[{
                                required: true,
                                trigger:["input","change","blur"],
                                validator:(rule,value,callback)=>{
                                    if(""=== value || (undefined==value)){
                                        callback(new Error("请输入生产设备名称"));
                                    }else{
                                        callback();
                                    }
                                }
                            }]
                        },                        
                        {
                            name: "设备分类",
                            key: "equimentType",
                            type: "select",
                            controlWidth: "180px",
                            filterable: true,                          
                            dropDown:{
                                data:[]
                            },
                            rules:[
                                { required: true, trigger:["input","blur","change"], message:"请选择设备分类" }
                            ]
                        },                                     
                        {
                            name: "关联机联网编号",
                            key: "commonCode",
                            type: "select",
                            controlWidth: "180px",
                            filterable: true,
                            dropDown:{
                                data:[]
                            },
                            rules:[
                                { required: true, trigger:["input","blur","change"], message:"请选择关联机联网编号" }
                            ]
                        },
                        {
                            name: "参数规格型号",
                            key: "otherProperty",
                            controlWidth: "180px",
                            maxLength: 40,
                            type: "input",
                            rules:[
                                { required: true, trigger:["input","blur","change"], message:"请输入参数规格型号" }
                            ]
                        },                        
                        {
                            name: "品牌",
                            key: "brand",
                            controlWidth: "180px",
                            maxLength: 40,
                            type: "input",
                            rules:[
                                { required: true, trigger:["input","blur","change"], message:"请输入品牌" }
                            ]
                        },           
                        {
                            name: "设备状态",
                            key: "equimentStatu",
                            type: "select",
                            controlWidth: "180px",
                            dropDown:{
                                data:[
                                    {
                                        label: "正常",
                                        value: 0
                                    },
                                    {
                                        label: "维修保养中",
                                        value: 1
                                    },
                                    {
                                        label: "停用",
                                        value: 2
                                    }
                                ]
                            },
                            rules:[
                                { required: true, trigger:["input","blur","change"], message:"请选择设备分类" }
                            ]
                        },
                        {
                            key:"positionId",
                            name:"前端位置ID",
                            controlWidth:"180px",
                            type: "select",
                            filterable: true,
                            rules:[{
                                required: true,
                                trigger:"change",
                                validator(rue,value,callback){
                                    if(undefined== value ||(""=== value)){
                                        callback(new Error("请选择前端位置ID"))
                                    }else {
                                        callback(); 
                                    }
                                }
                            }],
                            dropDown:{
                                data:[
                                    {
                                        label:"#1|#1暂存区",
                                        value: 1
                                    },
                                    {
                                        label:"#2|#1暂存区",
                                        value: 2
                                    },
                                    {
                                        label:"#3|#1暂存区",
                                        value: 3
                                    },
                                    {
                                        label:"#4|#1暂存区",
                                        value: 4
                                    },
                                    {
                                        label:"#5|#1暂存区",
                                        value: 5
                                    },
                                    {
                                        label:"#6|#1暂存区",
                                        value: 6
                                    },
                                    {
                                        label:"#7|#1暂存区",
                                        value: 7
                                    },
                                    {
                                        label:"#8|#1暂存区",
                                        value: 8
                                    },
                                    {
                                        label:"#9|#1暂存区",
                                        value: 9
                                    },
                                    {
                                        label:"#10|#1暂存区",
                                        value: 10
                                    },
                                    {
                                        label:"#11|#1暂存区",
                                        value: 11
                                    },
                                    {
                                        label:"#12|#1暂存区",
                                        value: 12
                                    },
                                    {
                                        label:"#13|#2暂存区|A",
                                        value: 13
                                    },
                                    {
                                        label:"#14|#2暂存区|A",
                                        value: 14
                                    },
                                    {
                                        label:"#15|#2暂存区|A",
                                        value: 15
                                    },
                                    {
                                        label:"#16|#2暂存区|A",
                                        value: 16
                                    },
                                    
                                    {
                                        label:"#17|#2暂存区|B",
                                        value: 17
                                    },
                                    {
                                        label:"#18|#2暂存区|B",
                                        value: 18
                                    },
                                    {
                                        label:"#19|#2暂存区|B",
                                        value: 19
                                    },
                                    {
                                        label:"#20|#2暂存区|B",
                                        value: 20
                                    },
                                    {
                                        label:"#21|电解区|A",
                                        value: 21
                                    },
                                    {
                                        label:"#22|电解区|A",
                                        value: 22
                                    },
                                    {
                                        label:"#23|电解区|A",
                                        value: 23
                                    },
                                    {
                                        label:"#24|电解区|A",
                                        value: 24
                                    },
                                    {
                                        label:"#25|电解区|A",
                                        value: 25
                                    },
                                    {
                                        label:"#26|电解区|A",
                                        value: 26
                                    },
                                    {
                                        label:"#27|电解区|A",
                                        value: 27
                                    },
                                    {
                                        label:"#28|电解区|A",
                                        value: 28
                                    },
                                    {
                                        label:"#29|电解区|A",
                                        value: 29
                                    },
                                    {
                                        label:"#30|电解区|B",
                                        value: 30
                                    },
                                    {
                                        label:"#31|电解区|B",
                                        value: 31
                                    },
                                    {
                                        label:"#32|电解区|B",
                                        value: 32
                                    },
                                    {
                                        label:"#33|电解区|B",
                                        value: 33
                                    },
                                    {
                                        label:"#34|电解区|B",
                                        value: 34
                                    },
                                    {
                                        label:"#35|电解区|B",
                                        value: 35
                                    },
                                    {
                                        label:"#36|电解区|B",
                                        value: 36
                                    },
                                    {
                                        label:"#37|电解区|B",
                                        value: 37
                                    },
                                    {
                                        label:"#38|电解区|B",
                                        value: 38
                                    },
                                    {
                                        label:"#39|1#混料机",
                                        value: 39
                                    },
                                    {
                                        label:"#40|2#混料机",
                                        value: 40
                                    },
                                    {
                                        label:"#41|3#混料机",
                                        value: 41
                                    },
                                    {
                                        label:"#42|4#混料机",
                                        value: 42
                                    },
                                    
                                    // {
                                    //     label:"#43|摆渡位2",
                                    //     value: 43
                                    // },
                                    // {
                                    //     label:"#44|摆渡位1",
                                    //     value: 44
                                    // },
                                    {
                                        label:"#45|翻转挤干",
                                        value: 45
                                    },
                                ]
                            }
                        }
                        // {
                        //     key: "positionId",
                        //     name: "前端位置ID",
                        //     controlWidth: "114px",
                        //     btnStyle: "margin-left:-4px;-o-transform: translateY(1px);-moz-transform: translateY(1px);-ms-transform: translateY(1px);-webkit-transform: translateY(1px);transform: translateY(1px);border-top-left-radius: 0;border-bottom-left-radius: 0;",
                        //     size: "small",
                        //     type: "dfPos",
                        //     btnClick(item,self){
                        //         window.$hostPage.showDialogPos();
                        //         console.log(item,self, window.$hostPage);
                        //     }
                        // }
                    ],
                    formData:{
                        equimentNo:"",
                        equimentName:"",
                        equimentType:"",
                        commonCode:"",
                        otherProperty:"",
                        brand:"",                        
                        equimentStatu:"",
                        positionId:""
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
    created(){
        window.$hostPage =this;
    },
    mounted(){
        this.init();
    },
    methods:{
        init(){
            this.getMacTypeOption();
            this.getMacCodeOption();
            this.doSearch();
        },
        getMacTypeOption(){
            productionMacTypeOption({Vue:this,params:{}}).then(res=>{
                if(res.result){
                    this.searchFormConfig.items[1].dropDown.data = res.model;
                    this.dialogFormConfig.qwForm.items[2].dropDown.data = res.model;
                }
            })
        },
        getMacCodeOption(){
            productionFindMacCodeOption({Vue: this,params:{}}).then(res=>{
                if(res.result){
                    this.dialogFormConfig.qwForm.items[3].dropDown.data = res.model;
                }
            })
        },
        doSearch(){
            let page= this.$refs.page;
            if(page){
                page.doSearch();
            }
        },
        toolbarItemClicked(data){
            // console.log(data);
            // return;
              let page= this.$refs.page;
              if(!page){
                  this.$message.error("页面参数错误！请刷新重试");
                  return;
              }
              switch (data.j) {
                case 0:
                    {
                        this.dialogFormConfig.qwForm.formData= {
                            equimentNo:"",
                            equimentName:"",
                            equimentType:"",
                            commonCode:"",
                            otherProperty:"",
                            brand:"",                        
                            equimentStatu:""
                        };
                        this.dialogFormConfig.qwForm.formData.mod ="add"; 
                        this.dialogFormConfig.qwDialog.title ="新增生产设备";   
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
                        this.dialogFormConfig.qwForm.formData ={
                            equimentNo:"",
                            equimentName:"",
                            equimentType:"",
                            commonCode:"",
                            otherProperty:"",
                            brand:"",                        
                            equimentStatu:"",
                            positionId:"",
                            mod:"add",
                        };
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
                            equimentNo:"",
                            equimentName:"",
                            equimentType:"",
                            commonCode:"",
                            otherProperty:"",
                            brand:"",                        
                            equimentStatu:"",
                            positionId:""
                        };
                        // this.dialogFormConfig.qwForm.formData= 
                        this.dialogFormConfig.qwForm.formData.mod ="edit"; 
                        this.dialogFormConfig.qwDialog.title ="编辑生产设备";  
                        
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
                                    this.dialogFormConfig.qwForm.formData.mod="edit";
                                    self.clearValidate()
                                }, 30);
                            }, 30);
                        });                          
                    }   
                    break; 
                case 2:
                    {
                        this.$message.error("生产设备暂不支持删除功能！");
                        return;
                        let ids = [];
                        page.tableConfig.currentSelectArr.forEach(item => {
                            ids.push(item.id);    
                        });
                        if(ids.length==0){
                            this.$message.error("请选择需要删除的条目！");
                            return;
                        }

                    }break;         
                default:
                    break;
            }
        },
        getList(data){
            // console.log(data);
            let params = data.params;
            for(let attr in params){
                if(undefined== params[attr]|| (""===params[attr])){
                    delete params[attr];
                }
            }
            params['pageSize'] && delete params['pageSize'];
            params['pageNo'] && delete params['pageNo'];
            productionFind({Vue: this, params: params}).then(res => {
                if(res.result){
                    this.tableConfig.total=10000;
                    this.tableConfig.loadShow = false;
                    let temp =[];
                    let attrs={ equimentNo:"",
                        equimentName:"",
                        equimentType:"",
                        commonCode:"",
                        otherProperty:"",
                        brand:"",                        
                        equimentStatu:"",
                        positionId:""
                    }
                    for(let item of res.model){
                        for(let attr in attrs){
                            if(undefined== item[attr]){
                                item[attr] ="";
                            }
                        }
                        temp.push(item);
                    }
                    this.tableData = temp;
                }
            })
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
                case 1:{
                    data.self.validate(()=>{
                        if(data.self.config.formData.mod=="add"){
                            this.addData(data);
                        }else{
                            this.editData(data);
                        }
                    })
                }break;
                case 2: {
                    data.self.validate(()=>{
                        this.addDataMuti(data);
                    })
                }               
                default:
                    break;
            }
        },
        addData(data){
            let params = data.self.config.formData;
            productionInsert({Vue: this,params:params}).then( res=> {
                if(res.result){
                    this.$message.success("操作成功！");
                    this.doSearch();
                    let page = this.$refs.page;
                    page&& page.closeModelForm();
                }
            })
        },
        editData(data){
            let params = data.self.config.formData;
            productionUpdate({Vue: this,params:params}).then( res=> {
                if(res.result){
                    this.$message.success("操作成功！");
                    this.doSearch();
                    let page = this.$refs.page;
                    page&& page.closeModelForm();
                }
            })
        },
        addDataMuti(data){
            let params = data.self.config.formData;
            productionUpdate({Vue: this,params:params}).then( res=> {
                if(res.result){
                    this.$message.success("操作成功！");
                    this.doSearch();
                    let page = this.$refs.page;
                    page&& page.resetForm();
                }
            })
        },
        searchFormItemFocus(data){
            console.log(data);
        }
        // showDialogPos(){
        //     this.dialogConfigPos.dialogVisible = true;
        // }
    }
}
</script>
<style lang="less">

</style>
