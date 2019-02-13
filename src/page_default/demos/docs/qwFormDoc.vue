<template>
<div class="qwFormDoc">
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="组件预览" name="first">
            <comp :config="compConfig" @formBtnClicked="formBtnClicked">
                <template slot-scope="{config, item, self}" slot="formItemExtend">
                    <el-form-item  
                    v-if="item.type=='qwInput'"
                    :class="item.itemClass"
                    :label="item.name"
                    :prop="item.key"
                    :rules="item.rules? item.rules : [{required:false}]"
                    :style="self.buildItemStyle(item,config)">
                        <input type="text" class="el-input__inner" v-model="config.formData[item.key]">
                    </el-form-item>
                </template>
            </comp>
            <p>当前表单数据：{{compConfig.formData}}</p>
        </el-tab-pane>
        <el-tab-pane label="模板代码" name="second">
            <editor  ref="editor" :content="tmplStr" :height="(sidebarHeight-120) +'px'" width="100%" lang="text" theme="chrome" :sync="true"></editor>
        </el-tab-pane>
        <el-tab-pane label="组件配置项" name="third">
            <editor  ref="editor" :content="'var formConfig = '+ jsonStringify(compConfig)" :height="(sidebarHeight-120) +'px'" width="100%" lang="javascript" theme="chrome" :sync="true"></editor>
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
import comp from "../../qwComponents/form/form.vue"
import editor from 'vue2-ace'
import { mapState } from "vuex"
import qwFormTable from "../../qwComponents/formTable/formTable.vue"
import { jsonStringify } from "../../../utils/json.js";
// import ace from "../../qwComponents/ace/qwace.vue"
export default {
    name: "qwFormDoc",
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
                    name: "formBtnClicked",
                    desc: "按钮点击事件",
                    trigger: "组件下方按钮单击",
                    params:"data=>{btn: {…}, index: 0, config: {…}, self: VueComponent}"
                },
                {
                    name: "submitForm",
                    desc: "提交表单事件",
                    trigger: "调用组件内置函数submitForm并验证成功后触发",
                    params:"data=>{formData:{…}, self: VueComponent}"
                },
                {
                    name: "formItemChanged",
                    desc: "表单项change事件",
                    trigger: "表单项的值改变时触发",
                    params:"data=>{item:{…},self:VueComponent,config:{…}}"
                },
                {
                    name: "formItemFocus",
                    desc: "表单项focus事件",
                    trigger: "表单项获取焦点时触发",
                    params:"data=>{item:{…},self:VueComponent,config:{…}}"
                },
                {
                    name: "formItemInput",
                    desc: "表单项input事件",
                    trigger: "表单项输入时触发",
                    params:"data=>{item:{…},self:VueComponent,config:{…}}"
                },
                {
                    name: "formItemChange",
                    desc: "表单项更改后事件",
                    trigger: "表单项更改时触发,在input和change事件后触发此事件",
                    params:"data=>{item:{…},self:VueComponent,config:{…}}"
                },//
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
                    name: "getRef()",
                    desc: "获取this对象",
                    used: "是",
                    params: "-"
                },
                {
                    name: "qwRemoteMethod(keywords,formItem)",
                    desc: "获取this对象",
                    params: "-",
                    used: "否"
                },
                {
                    name: "buildItemStyle(item,config)",
                    desc: "构建form表单项的样式",
                    params: "-",
                    used: "否"
                },
                {
                    name: "fromBtnClicked(btn,i,config)",
                    desc: "form表单项单击事件回调",
                    params: "-",
                    used: "否"
                },
                {
                    name: "validate(func=()=>{},funcErr=()=>{})",
                    desc: "验证form表单",
                    params: "-",
                    used: "是"
                },
                {
                    name: "resetForm()",
                    desc: "重置form表单",
                    params: "-",
                    used: "是"
                },
                {
                    name: "clearValidate() ",
                    desc: "清空form表单验证状态",
                    params: "-",
                    used: "是"
                },
                {
                    name: "submitForm() ",
                    desc: "验证form表单并抛出submitForm事件",
                    params: "-",
                    used: "是"
                },
                {
                    name: "formItemChanged(item)",
                    desc: "表单项改变事件回调",
                    params: "-",
                    used: "否"
                },
                {
                    name: "formItemFocus(item)",
                    desc: "表单项获取焦点回调",
                    params: "-",
                    used: "否"
                },
                {
                    name: "formItemBlur(item)",
                    desc: "表单项失去焦点回调",
                    params: "-",
                    used: "否"
                },
                {
                    name: "formItemInput(item)",
                    desc: "表单项输入事件回调",
                    params: "-",
                    used: "否"
                },
                {
                    name: "formItemChange(item)",
                    desc: "表单项改变后事件回调",
                    params: "-",
                    used: "否"
                },//formItemInput(item)
            ],                        
            tmplStr:""+`<qwForm :config="compConfig" @formBtnClicked="formBtnClicked">
<template slot-scope="{config, item, self}" slot="formItemExtend">
    <el-form-item  
    v-if="item.type=='qwInput'"
    :class="item.itemClass"
    :label="item.name"
    :prop="item.key"
    :rules="item.rules? item.rules : [{required:false}]"
    :style="self.buildItemStyle(item,config)">
        <input type="text" class="el-input__inner" v-model="config.formData[item.key]">
    </el-form-item>
</template>
</qwForm>`,
            activeName: "first",
            compConfig:{
                labelWidth:140,
                itemStyle: "",
                itemSpan: 8,
                items:[
                    {
                        key:"item1",
                        name: "常规输入框",
                        type: "input",
                        placeholder:"请输入内容",
                        controlWidth: "140px",
                        rules:[
                            {
                                required: true,
                                trigger:["input","blur"],//input,change,blue
                                validator(rule,value,callback){
                                    if(undefined == value ||(''===value)){
                                        callback(new Error("请输入内容..."))
                                    }else{
                                        callback()
                                    }
                                }
                            }
                        ]
                    },                     
                    {
                        key:"item2",
                        name: "输入框限长度",
                        type: "input",
                        maxLength: 10,
                        placeholder:"请输入内容",
                        controlWidth: "140px",
                        rules:[
                            {
                                required: true,
                                trigger:["input","blur"],//input,change,blue
                                validator(rule,value,callback){
                                    if(undefined == value ||(''===value)){
                                        callback(new Error("请输入内容..."))
                                    }else{
                                        callback()
                                    }
                                }
                            }
                        ]
                    },                   
                    {
                        key:"item3",
                        name: "文本域",
                        type: "textarea",
                        span: 24,
                        rows: 4,
                        placeholder:"请输入内容",
                        controlWidth: "560px",
                        rules:[
                            {
                                required: true,
                                trigger:["input","blur"],//input,change,blue
                                validator(rule,value,callback){
                                    if(undefined == value ||(''===value)){
                                        callback(new Error("请输入内容..."))
                                    }else{
                                        callback()
                                    }
                                }
                            }
                        ]
                    },                                      
                    {
                        key:"item4",
                        name: "选择框",
                        type: "select",
                        span: 8,
                        rows: 4,
                        placeholder:"请选择",
                        controlWidth: "140px",
                        dropDown: {
                            data:[
                                {label:"备选项",value: "value"}
                            ]
                        },
                        rules:[
                            {
                                required: true,
                                trigger:["input","blur"],//input,change,blue
                                validator(rule,value,callback){
                                    if(undefined == value ||(''===value)){
                                        callback(new Error("请选择内容..."))
                                    }else{
                                        callback()
                                    }
                                }
                            }
                        ]
                    },
                    {
                        key: "item5",
                        name: "单选框",
                        type: "radio",
                        span: 8,
                        items: [
                            {
                                label:"备选项1",
                                value: "val1"
                            },                            
                            {
                                label:"备选项2",
                                value: "val2"
                            },
                        ]
                    },
                    {
                        key: "item6",
                        name: "组合复选框",
                        type: "checkboxgroup",
                        span: 8,
                        items: [
                            {
                                label:"备选项1",
                                value: "val1"
                            },                            
                            {
                                label:"备选项2",
                                value: "val2"
                            },
                        ]
                    },
                    {
                        key: "item7",
                        name: "普通复选框",
                        type: "checkboxgroup",
                        span: 8,
                        items: [
                            {
                                label:"备选项1",
                                value: "val1"
                            },                            
                            {
                                label:"备选项2",
                                value: "val2"
                            },
                        ]
                    },
                    {
                        key: "item8",
                        name: "计数器",
                        formItemStyle:"min-height: 59px;",
                        type: "inputNumber",
                        controlWidth: "120px"
                    },
                    {
                        key: "item8",
                        name: "计数器(按钮在右侧)",
                        formItemStyle:"min-height: 59px;",
                        type: "inputNumber",
                        controlWidth: "120px",
                        controls:true,
                        controlsPosition: "right"
                    },
                    {
                        key: "item8",
                        name: "计数器(不带按钮)",
                        controls: false,
                        type: "inputNumber",
                        formItemStyle:"min-height: 59px;",
                        controlWidth: "120px"
                    },
                    {
                        key: "item9",
                        name: "时间选择器",
                        type: "timePicker",
                         start:"8:30",
                        step:"0:15",
                        end:"20:30",
                    },
                    {
                        key: "item10",
                        name: "日期选择器",
                        type: "dateTimePicker",
                        dateType:"date",
                    },
                    {
                        key: "item11",
                        name: "日期时间选择器",
                        type: "dateTimePicker",
                        dateType:"datetime",
                    },                    
                    {
                        key: "item12",
                        name: "日期范围选择",
                        type: "dateTimePicker",
                        controlWidth:"230px",
                        dateType:"daterange",
                    },
                    
                    {
                        key: "item13",
                        name: "时间范围选择",
                        type: "dateTimePicker",
                        controlWidth:"230px",
                        dateType:"datetimerange",
                    },
                    {
                        key: "item14",
                        name: "信息展示",
                        type: "labelInfo",
                        controlWidth:"230px",
                    },
                    {
                        key: "item15",
                        name: "上传文件",
                        type: "upload",
                        fileList:[],
                        uploadUrl:"/upload",
                        onSuccess(){
                             console.log("onsuccess",...arguments)
                        },
                        onError(){
                             console.log("onError",...arguments)
                        },
                        beforeUpload(){
                            console.log("beforeUpload",...arguments)
                        }
                    },
                    {
                        key: "item16",
                        name: "颜色选择器",
                        type: "colorpicker",
                        controlWidth:"230px",
                    },
                    {
                        key: "item17",
                        name: "插槽演示项",
                        type: "qwInput"
                    }

                ],
                formData:{
                    item1:"",
                    item2:"",
                    item3:"",
                    item4:"",
                    item5:"",
                    item6:[],
                    item7:[],
                    item8:"",
                    item9:"",
                    item10:"",
                    item11:"",
                    item12:[],
                    item13:[],
                    item14:"展示内容",
                    item15:"",
                    item16:"",
                    item17:"",
                },
                formBtnsStyle: "text-align:center;padding-bottom:20px;",
                formBtns:[
                    {
                        label: "表单按钮1",
                        size: "mini",
                        type: "primary"
                    },
                    {
                        label: "表单按钮2",
                        size: "mini",
                        type: "danger"
                    },                    
                    {
                        label: "表单按钮3",
                        size: "mini"
                    },
                ]
            }
        }
    },
    methods:{
        jsonStringify(str){
            return jsonStringify(str);
        },
        handleClick(data){
        },
        formBtnClicked(data){
            alert("第" + (data.index+1) + "个按钮点击！");
            console.log("第" + (data.index+1) + "个按钮点击！事件参数=>",data);
        }
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


