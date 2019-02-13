<template>
    <div class="qw_form_box">
        <el-form v-if="config" :ref="formName" :inline="true" :model="config.formData" :label-width="parseInt(config.labelWidth) +'px'" :label-position="config.formLabelAlign">
        <el-row>
            <!-- input 输入框或者 文本选择区域 -->
            <el-col :span="item.span?item.span:config.itemSpan" v-for="(item,i) in config.items" :key="i" :class="item.type" :style="'height:' + (item.type == 'textarea'? '':'auto;')+ (item.colStyle? item.colStyle:'')">
                <el-form-item 
                    v-if="item.type=='input'|| (item.type == 'textarea')"
                    :prop="item.key" 
                    :label="item.name" 
                    :rules="item.rules? item.rules : [{required:false}]" 
                    :style="buildItemStyle(item,config)">
                    <el-input v-model.trim="config.formData[item.key]"
                            :style="{width: item.controlWidth? item.controlWidth: (config.controlWidth? config.controlWidth: '')}"
                            :disabled="item.disabled"
                            :clearable="item.clearable"
                            :placeholder="item.placeholder? item.placeholder :'请输入'+ item.name"
                            :maxlength="item.maxLength"
                            :minLength="item.minLength"
                            :suffix-icon="item.suffixIcon"
                            :prefix-icon="item.prefixIcon"
                            :rows="item.rows"
                            :auto-complete="item.autoComplete"
                            :name="item.name"
                            :readonly="item.readonly"
                            :type="item.type"
                            @input="formItemInput(item)"
                            @focus="formItemFocus(item)"
                            @blur="formItemBlur(item)"
                            @change="formItemChange(item)"></el-input>
                </el-form-item>
                <!-- 搜索下拉框 或下拉选择框 -->
                <el-form-item
                    v-if="item.type=='select'"
                    :label="item.name"
                    :prop="item.key"
                    :ref="'select_'+item.key"
                    :rules="item.rules? item.rules : [{required:false}]"
                   :style="buildItemStyle(item,config)">
                    <el-select :config="item" v-model="config.formData[item.key]"
                            :style="{width: item.controlWidth? item.controlWidth: (config.controlWidth? config.controlWidth: '')}"
                            :multiple="item.multiple"
                            :size="item.size"
                            :clearable="item.clearable"
                            :allow-create="item.allowCreate"
                            :disabled="item.disabled"
                            :filterable="item.filterable"
                            :placeholder="item.placeholder? item.placeholder : (item.remote?'请输入关键字查询并选择':('请选择'+item.name))"
                            :remote="item.remote"
                            :remote-method="qwRemoteMethod"
                            @input="formItemInput(item)"
                            @focus="formItemFocus(item)"
                            @blur="formItemBlur(item)"
                            @change="formItemChange(item)">
                    <el-option v-for="(dropItem,j) in item.dropDown.data" :key="j" :disabled="dropItem.disabled" :label="dropItem.label" :value="dropItem.value"></el-option>
                    </el-select>
                </el-form-item>
                <!-- radio -->
                <el-form-item 
                    v-if="item.type.toLocaleLowerCase()=='radio'"
                    :prop="item.key" 
                    :ref="'radio_'+item.key"
                    :label="item.name"
                    :rules="item.rules? item.rules : [{required:false}]"
                   :style="buildItemStyle(item,config)">
                    <el-radio-group v-model="config.formData[item.key]">
                        <el-radio 
                            v-for="(ra,k) in item.items" 
                            :key="k" :label="ra.value"
                            :disabled="ra.disabled"  
                            @change="formItemChange(item)">{{ra.label}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <!-- checkbox -->
                <el-form-item 
                    v-if="item.type=='checkbox'"
                    :prop="item.key"
                    :rules="item.rules? item.rules : [{required:false}]" 
                    :label="item.name"
                   :style="buildItemStyle(item,config)">
                    <el-checkbox 
                        v-for="(ch,n) in item.items"
                        :key="n"
                        size="small"
                        :disabled="ch.disabled"
                        @change="formItemChange(item)"
                        v-model="config.formData[ch.key]">
                        {{ch.label}}
                    </el-checkbox>
                </el-form-item>
                <!-- checkboxgroup  注意这里fromData必须是数组-->
                <el-form-item
                    v-if="item.type=='checkboxgroup'"
                    :prop="item.key"
                    :rules="item.rules? item.rules : [{required:false}]" 
                    :label="item.name"
                   :style="buildItemStyle(item,config)">
                    <el-checkbox-group v-model="config.formData[item.key]"
                    @change="formItemChange(item)">
                        <el-checkbox 
                            v-for="(ch,n) in item.items"
                            :key="n"
                            :disabled="ch.disabled"
                            :label="ch.value">
                            {{ch.label}}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <!-- inputNumber计数器 -->
                <el-form-item
                    v-if="item.type=='inputNumber'"
                    :prop="item.key"
                    :rules="item.rules? item.rules : [{required:false}]"
                    :label="item.name"
                    size="small"
                   :style="buildItemStyle(item,config)">
                    <el-input-number 
                        v-model="config.formData[item.key]"
                        :style="{width: item.controlWidth? item.controlWidth: (config.controlWidth? config.controlWidth: '')}"
                        :disabled="item.disabled"
                        :min="item.min"
                        :max="item.max"
                        :step="item.step"
                        :precision="item.precision"
                        :controls="item.controls"
                        :size="item.size?item.size :'small'"
                        :label="item.label"
                        :controls-position="item.controlsPosition"
                        @input="formItemInput(item)"
                        @focus="formItemFocus(item)"
                        @blur="formItemBlur(item)"
                        @change="formItemChange(item)"></el-input-number>
                </el-form-item>
                <!-- 时间选择器 -->
                <el-form-item v-if="item.type=='timePicker'"
                    :label="item.name"
                    :prop="item.key"
                    :rules="item.rules? item.rules : [{required:false}]"
                   :style="buildItemStyle(item,config)">
                    <el-time-select
                        v-model="config.formData[item.key]"
                        :style="{width: item.controlWidth? item.controlWidth: (config.controlWidth? config.controlWidth: '')}"
                        :picker-options="{
                            start: item.start,
                            step: item.step,
                            end: item.end
                        }"
                        :readonly="item.readonly"
                        :disabled="item.disabled"
                        :editable="item.editable"
                        :clearable="item.clearable"
                        :size="item.size"
                        :startPlaceholder="item.startPlaceholder"
                        :endPlaceholder="item.endPlaceholder"
                        :isRange="item.isRange"
                        :placeholder="item.placeholder?item.placeholder : '选择时间'"
                        @input="formItemInput(item)"
                        @focus="formItemFocus(item)"
                        @blur="formItemBlur(item)"
                        @change="formItemChange(item)">
                    </el-time-select>
                </el-form-item>   
                <!-- 日期时间选择器 -->
                <el-form-item v-if="item.type=='dateTimePicker'"
                    :label="item.name"
                    :prop="item.key"
                    :rules="item.rules? item.rules : [{required:false}]"
                   :style="buildItemStyle(item,config)">
                    <el-date-picker
                        v-model="config.formData[item.key]"
                        :style="{width: item.controlWidth? item.controlWidth: (config.controlWidth? config.controlWidth: '')}"
                        :type="item.dateType?item.dateType : 'date'"
                        :value-format="item.valueFormat"
                        :placeholder="item.placeholder?item.placeholder:'选择日期时间'"
                        :range-separator="item.rangeSeparator? item.rangeSeparator :'至'"
                        :start-placeholder="item.startPlaceholder? item.startPlaceholder :'开始日期'"
                        :end-placeholder="item.endPlaceholder? item.endPlaceholder :'结束日期'"
                        @input="formItemInput(item)"
                        @focus="formItemFocus(item)"
                        @blur="formItemBlur(item)"
                        @change="formItemChange(item)">
                    </el-date-picker>
                </el-form-item>
                <!-- labelInfo用于查看详情或展示 -->                
                <el-form-item class="labelInfo" v-if="item.type=='labelInfo'"
                    :label="item.name"
                    :prop="item.key"
                    :rules="item.rules? item.rules : [{required:false}]"
                   :style="buildItemStyle(item,config)">
                   <span class="labelInfoVal" :style="{width: item.controlWidth? item.controlWidth: (config.controlWidth? config.controlWidth: '')}">{{'function'==typeof(item.transVal)? item.transVal(config.formData[item.key]) : config.formData[item.key]}}</span>
                </el-form-item>
                <el-form-item v-if="item.type=='slider'"
                    :label="item.name"
                    :prop="item.key"
                    :rules="item.rules? item.rules : [{required:false}]"
                   :style="buildItemStyle(item,config)">
                    <el-slider 
                        v-model="config.formData[item.key]"
                        :style="(item.controlStyle?item.controlStyle : '') +';width:' + (item.controlWidth? item.controlWidth: (config.controlWidth? config.controlWidth: ''))"
                        :min = "item.min"  
                        :size = "item.size"                           
                        :max = "item.max"                              
                        :disabled = "item.disabled"                     
                        :step = "item.step"                             
                        :show-input = "item.showInput"                  
                        :show-input-controls = "item.showInputControls" 
                        :input-size = "item.inputSize"                  
                        :show-stops= "item.showStops"                  
                        :show-tooltip = "item.showTooltip"              
                        :format-tooltip = "item.formatTooltip"          
                        :range = "item.range"                           
                        :vertical = "item.vertical"                     
                        :height = "item.height"                         
                        :label = "item.label"                           
                        :debounce = "item.debounce"     
                        :tooltip-class = "item.tooltipClass"
                        @input="formItemInput(item)"
                        @focus="formItemFocus(item)"
                        @blur="formItemBlur(item)"
                        @change="formItemChange(item)"></el-slider>
                        <span :style="item.afterStyle" v-if="item.showAfterHtml">{{item.afterHtml(item,config)}}</span>
                </el-form-item>
                 <!-- 上传组件 -->
                <el-form-item v-if="item.type=='upload'"
                    :ref="'upload_'+ item.key"
                    :class="item.itemClass"
                    :label="item.name"
                    :prop="item.key"
                    :rules="item.rules? item.rules : [{required:false}]"
                    :style="buildItemStyle(item,config)">
                    <el-upload class="qwUpload"
                    :multiple="false"
                    :on-success="item.onSuccess"
                    :on-error="item.onError"
                    :action="item.uploadUrl"
                    :file-list="item.fileList"
                    :accept="item.accept? item.accept :''"
                    beforeAvatarUpload="item.beforeUpload"
                    :show-file-list="false">
                    <span class="el-input el-input--mini" :style="'width:' + (item.inputWidth? item.inputWidth :'100px')+';'">
                        <input  class="el-input__inner" style="transform: translateY(-2px);" placeholder="点击上传" type="text" v-model = "config.formData[item.key]">
                    </span>
                        <el-button size="small" type="primary" class="uploadBtn" style="border-radius:0;" :style="'width:'+ (item.btnWidth? item.btnWidth :'56px')+';'">{{item.btnLabel? item.btnLabel :'浏览'}}</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item v-if="item.type&& (item.type.toLocaleLowerCase()=='colorpicker')"
                    :class="item.itemClass"
                    :label="item.name"
                    :prop="item.key"
                    :rules="item.rules? item.rules : [{required:false}]"
                   :style="buildItemStyle(item,config)">
                    <el-color-picker size="small" v-model="config.formData[item.key]"></el-color-picker>
                </el-form-item>    
                <!-- 未完待续 -->
                <!-- 扩展具名插槽 -->
                <slot v-else :config="config" :self="getRef()" :item="item" name="formItemExtend"></slot>
            </el-col>
        </el-row> 
        <el-row v-if="config.formBtns && config.formBtns.length>0">
            <p :style="'text-align:left;'+config.formBtnsStyle">
                <template  v-for="(btn,i) in config.formBtns">
                    <el-badge v-if="undefined!=btn.badge" :value="btn.badge"  :key="i" class="item">
                        <el-button                       
                        :size="btn.size"
                        :type="btn.type"
                        :plain="btn.plan"
                        :round="btn.round"
                        :circle="btn.circle"
                        :loading="btn.loading"
                        :disabled="btn.disabled"
                        :icon="btn.icon"
                        :autofocus="btn.autofocus"
                        :nativeType="btn.nativeType"
                        :style="btn.style"
                        :class="btn.class"
                        @click="fromBtnClicked(btn,i,config)"
                        >{{btn.label}}</el-button>
                    </el-badge>
                    <el-button  
                        v-else
                        :key="i"                     
                        :size="btn.size"
                        :type="btn.type"
                        :plain="btn.plan"
                        :round="btn.round"
                        :circle="btn.circle"
                        :loading="btn.loading"
                        :disabled="btn.disabled"
                        :icon="btn.icon"
                        :autofocus="btn.autofocus"
                        :nativeType="btn.nativeType"
                        :style="btn.style"
                        :class="btn.class"
                        @click="fromBtnClicked(btn,i,config)"
                        >{{btn.label}}</el-button>
                </template>
                
            </p>
        </el-row>
        <!-- {{config.formData}} -->
        </el-form>
        <p v-else>表单配置项有误！</p>   
        
    </div>
</template>
<script>
const config2={             
                labelWidth: 80,
                itemWidth:300,
                itemSpan:12,
                items:[
                    {   
                        colStyle:"",
                        key:"item1",
                        type:"input",
                        name:"项目1",
                        disabled:false,
                        clearable:true,
                        suffixIcon:"",
                        prefixIcon:"",
                        maxLength:40,
                        minLength:0,
                        rows:1,//textarea适用
                        autoComplete:"off",
                        readonly:false,
                        rules:[{required:true,message:"请输入项目1",trigger:["input","change","blur"]}],
                    },
                    // {
                    //     key:"item4",
                    //     type:"input",
                    //     name:"项目4",
                    //     disabled:false,
                    //     clearable:true,
                    //     suffixIcon:"",
                    //     prefixIcon:"",
                    //     maxLength:40,
                    //     minLength:0,
                    //     rows:1,//textarea适用
                    //     autoComplete:"off",
                    //     readonly:false,
                    //     rules:[{required:true,message:"请输入项目1",trigger:["input","change","blur"]}],
                    // },
                   
                    // {
                    //     key: "item3",
                    //     type:"select",
                    //     filterable:true,
                    //     remote:true,
                    //     remoteMethod(query){//this.config.items[3]
                    //         let conf=this.$attrs.config;
                    //           if(query) conf.dropDown.data=[{label:'下拉1',value:'数据1'},{label:'下拉2',value:'数据2'}]//res.model;
                    //           else conf.dropDown.data=[];
                    //         http.fetchPost('/itemList/getItem3',{params:{query:query}}).then(res=>{
                    //             this.config.formData['item3'].dropDown.data=[{label:'下拉1',value:'数据1'},{label:'下拉2',value:'数据2'}]//res.model;
                    //         })
                    //     },
                    //     dropDown:{
                    //         data:[],
                    //         api:{
                    //             method:"post",
                    //             action:"/itemlist/get"
                    //         }
                    //     },
                    //     name:"项目3",
                    //     disabled:false,
                    //     rule:[{required:true,message:"请选择项目2",trigger:["input","change","blur"]}],
                    // },
                    // {
                    //     key: "item5",
                    //     type:"select",
                    //     filterable:true,
                    //     remote:false,
                    //     dropDown:{
                    //         data:[{label:"item5 label",value:"item5 value"},{label:"item5 label2",value:"item5 value2"}]
                    //     },
                    //     name:"项目5",
                    //     disabled:false,
                    //     rule:[{required:true,message:"请选择项目2",trigger:["input","change","blur"]}],
                    // },{
                    //     key:"item6",
                    //     type:"radio",
                    //     name:"项目7",
                    //     items:[{
                    //         label:'备选项1',
                    //         value:'1',
                    //         disabled:false,
                    //     },{
                    //         label:'备选项2',
                    //         value:'2',
                    //         disabled:true,
                    //     }],
                    // },{
                    //     type:"checkbox",                        
                    //     name:"项目8",
                    //     items:[{                            
                    //         key:"item7",
                    //         disabled:false,
                    //         label:'备选项1',
                    //     },{                    
                    //         key:"item8",
                    //         label:'备选项2',
                    //         disabled:true
                    //     }],
                    // },{
                    //     type:"checkboxgroup",
                    //     key:"item9",
                    //     name:"项目9",
                    //     rules:[{required:false}],
                    //     items:[{
                    //         disabled:false,
                    //         label:'备选项1',
                    //         value:111
                    //     },{
                    //         label:'备选项2',
                    //         disabled:false,
                    //         value:22222
                    //     }],
                    // },{
                    //     type:"inputNumber",
                    //     key:"item10",
                    //     name:"项目10",
                    //     rules:[{required:false}],
                    //     disabled:false,
                    //     min:0,
                    //     max:100,
                    //     step:0.01,
                    //     precision:2,//精度
                    //     controls:true,//是否使用控制按钮
                    //     size:"medium",//small,mini
                    //     label:"",
                    //     controlsPosition:"right",//right or ''
                    // },{
                    //     type:"timePicker",
                    //     key:"item11",
                    //     name:"项目11",
                    //     start:"8:30",
                    //     step:"0:15",
                    //     end:"20:30",
                    //     readonly:false,
                    //     disabled:false,
                    //     editable:true,
                    //     clearable:true,
                    //     size:"",                        
                    //     placeholder:"",
                    //     startPlaceholder:"",
                    //     endPlaceholder:"",
                    //     isRange:false,//是否
                    // },{
                    //     key:"item2",
                    //     type:"textarea",
                    //     name:"项目2",
                    //     span:24,
                    //     width:400,
                    //     disabled:false,
                    //     clearable:true,
                    //     suffixIcon:"",
                    //     prefixIcon:"",
                    //     maxLength:40,
                    //     minLength:0,
                    //     rows:3,//textarea适用
                    //     autoComplete:"off",
                    //     readonly:false,
                    //     rule:[{required:true,message:"请输入项目1",trigger:["input","change","blur"]}],
                    // },
                ],
                formData:{
                    item1:"",
                    item2:"",
                    item3:"",
                    item4:"",
                    item5:"",
                    item6:"",
                    item7:"",
                    item8:"",
                    item9:[],
                    item10:"",
                    item11:"",
                },
                formBtnsStyle:"text-align:right",
                formBtns:[
                    {
                        size:"small",//medium / small / mini
                        type:"primary",//primary / success / warning / danger / info / text
                        plain:false,//是否朴素
                        round:false,//是否圆角按钮
                        circle:false,//是否圆形按钮
                        loading:false,//是否加载中状态
                        disabled:false,//是否禁用
                        icon:"",//图标class
                        autofocus:false,//自动获取焦点
                        nativeType:"button",//button / submit / reset
                        label:"测试一",
                        class:"",
                        style:"width:100px;text-align:center;"
                    }
                ],
                itemEventCB:{
                    focus:{},   //获取焦点
                    blur:{},    //失去焦点
                    input:{},   //输入事件
                    change:{},  //值被改变
                    // focus_item1: (data)=>{}//fromItemEventCallBack  item.key + "_"  eventName
                },
                eventCB:{//回调事件
                    formBtnClicked:(data)=>{
                        return false;//return false或者该函数不存在则直接触发emit "formBtnClicked" return true则不向下执行
                    }
                }
            }
import http from '../../../utils/public.js'
export default {
    props:{
        formName:{
            type:String,
            default:()=>{
                return 'form'
            }
        },
        config: {
            type:Object,
            default:()=>{
                return config2
            }
        }
    },
    data(){
        return {
            http:null,
        }
    },   
    created(){
        this.http = http;
    }, 
    methods: {
        getRef(){
            return this
        },
        // 
        qwRemoteMethod(keywords,formItem){
            let query = keywords;
            // console.log(keywords,formItem)
            let conf=formItem.$attrs.config;
            if(conf){
                if("function" == typeof(conf.remoteMethod)){
                    conf.remoteMethod(keywords,conf)
                }else{
                    if("function" == typeof(this.http[conf.dropDown.method])){
                        let isUrl = /^http[s]{0,1}:\/\//.test(conf.dropDown.romotePath);
                        this.http[conf.dropDown.method](conf.dropDown.romotePath,{Vue:this,params: conf.dropDown.params},isUrl).then(res=>{
                            let temp=[];
                            if(res.result==true){
                                for(let item of res.model){
                                    temp.push({...item,label:item[conf.dropDown.key],value:item[conf.dropDown.value]})
                                }
                                this.$set(formItem.$attrs.config.dropDown,"data", temp);
                            }else{
                                this.$message.error(res.message);
                            }
                        })
                    }
                }
            }
        },
        buildItemStyle(item,config){
            let css = 'width:' + (item.width? item.width : config.itemWidth?config.itemWidth +'px;': "auto;") + (item.formItemStyle? item.formItemStyle :'') + ';' + (config.itemStyle||"")
            return css;
        },
        //按钮被点击
        fromBtnClicked(btn,i,config){
            let params = {"btn":btn,"index":i,"config":config,self:this};           
            if(!this.config.eventCB){
                this.config.eventCB={};
            }
            if('function'==typeof(this.config.eventCB.formBtnClicked)){
                if(this.config.eventCB.formBtnClicked(params)){
                    this.$emit('formBtnClicked',params);
                } 
            }else{
                this.$emit('formBtnClicked',params)
            }               
          
        },
        //验证表单
        validate(func=()=>{},funcErr=()=>{}){           
            this.$refs[this.formName].validate((valid) => {
                if(valid){
                    if('function'== typeof(func))func()
                    return true 
                }else{
                    if('function'== typeof(funcErr))funcErr();
                    return false
                }
            });
        },
        //重置表单
        resetForm(){
            // console.log("reset form!")
            let form = this.$refs[this.formName];
            if(form) form.resetFields();
        },
        clearValidate(){            
            let form = this.$refs[this.formName];
            if(form)form.clearValidate();
        },
        //提交表单
        submitForm() {
            this.validate(()=>{
                this.$emit("submitForm",{self:this,formData:this.config.formData})
            })
        },
        /*itemchange*/
        formItemChanged(item){
            if(item.type=="radio"){
                let itemRef=this.$refs['radio_'+item.key][0];
                /***************** 解决单选框选择时不验证的bug *******************/
                if(itemRef){
                    itemRef.validate("change");
                }
            }
            this.$emit("formItemChanged",{item:item,self:this,config:this.config})
        },
        doConfigEvents(item,evtName){
            // console.log(evtName,"done!");
            if(this.config.itemEventCB){
                if(this.config.itemEventCB[evtName]){
                    if("function" == typeof(this.config.itemEventCB[evtName][item.key])){
                        this.config.itemEventCB[evtName][item.key]({item:item,self:this,config:this.config})
                    }
                }
            }
        },
        /* 获取焦点 */
        formItemFocus(item){
            this.doConfigEvents(item, "focus");        
            this.$emit("formItemFocus",{item:item,self:this,config:this.config})
        },
        /* 失去焦点 */ 
        formItemBlur(item){
            this.doConfigEvents(item, "blur");        
            this.$emit("formItemBlur",{item:item,self:this,config:this.config})
        },
        /* 输入事件 */ 
        formItemInput(item){
            this.doConfigEvents(item, "input");        
            this.$emit("formItemInput",{item:item,self:this,config:this.config})
            this.formItemChanged(item);/*兼容以前的接口*/
        },
        /* 值改变 */
        formItemChange(item){
            this.doConfigEvents(item, "change");        
            this.$emit("formItemChange",{item:item,self:this,config:this.config})
            this.formItemChanged(item);/*兼容以前的接口*/
        }
    }
  }
</script>
<style lang="less">
    @import url(./less/_form.less);
</style>