//TableEx td渲染组件
<template>
<div class="qwFormTableRender">
		<!-- 普通文本 -->
		<span v-if="item.type === 'text'">{{'function'==typeof(item.transVal)? item.transVal(scope.row[item.field]) : scope.row[item.field]}}</span>
		<!-- 单个按钮 -->
		<el-button v-else-if="item.type=='button'" :size="item.size">{{item.label}}</el-button>
		<!-- 带回调函数的按钮组 -->
        <span v-else-if="item.type=='btnsTextWithMethod'"><el-button v-if="undefined==it.showFunc || (it.showFunc(scope.row))" type="text" v-for="(it,k) in item.fields" @click="callBack(it.method,scope.row,scope.$index)" size="mini" :key="k">{{it.name}}</el-button></span>
		<!-- 多按钮 -->
		<div v-else-if="item.type === 'btnsText'"><el-button type="text" v-for="(it,m2) in item.fields" :disabled="'function'==(typeof(it.checkDisable))? it.checkDisable(scope):false" :key="m2" @click="callBack(it.method,scope.row,scope.$index)" size="mini">{{it.name}}</el-button></div>
		<!--表格元素相关-------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
		<!-- form表单 -->
        <!-- :rules="item.rules? item.rules : [{required:false}]"  -->
        <el-form-item 
            :prop="item.field" 
            label="" 
            :size ="item.size?item.size : 'small'"
            :style="'margin-left:0;margin-bottom:0;width:' + ('number'==typeof(item.width)? (item.width+'px') : item.width) + (item.formItemStyle? item.formItemStyle :'')">
            <!-- 输入框 -->
            <el-input 
                v-if="item.type=='input'|| (item.type == 'textarea')"
                v-model.trim="scope.row[item.field]"
                :style="'width:' + ('number'==typeof(item.controlWidth)? (item.controlWidth+'px') : item.controlWidth)+';' + (item.style?item.style:'')"
                :disabled="item.disabled"
                :clearable="item.clearable? item.clearable : true"
                :placeholder="item.placeholder? item.placeholder :'请输入'+ item.label"
                :maxlength="item.maxLength"
                :minLength="item.minLength"
                :suffix-icon="item.suffixIcon"
                :prefix-icon="item.prefixIcon"
                :size ="item.size?item.size : 'small'"
                :rows="item.rows"
                :auto-complete="item.autoComplete"
                :name="item.label"
                :readonly="item.readonly"
                :type="item.type"
                @input="formItemInput(item,scope)"
                @focus="formItemFocus(item,scope)"
                @blur="formItemBlur(item,scope)"
                @change="formItemChange(item,scope)"></el-input>
                <!-- 下拉框 -->
            <el-select :config="item" v-model="scope.row[item.field]"
                v-else-if="item.type === 'select'"
                :style="'width:' + ('number'==typeof(item.controlWidth)? (item.controlWidth+'px') : item.controlWidth)+';' + (item.style?item.style:'')"
                :multiple="item.multiple"
                :size="item.size"
                :clearable="item.clearable"
                :allow-create="item.allowCreate"
                :disabled="item.disabled"
                :filterable="item.filterable"
                :placeholder="item.placeholder? item.placeholder : (item.remote?'请输入关键字查询并选择':('请选择'+item.label))"
                :remote="item.remote"
                :remote-method="qwRemoteMethod"
                @input="formItemInput(item,scope)"
                @focus="formItemFocus(item,scope)"
                @blur="formItemBlur(item,scope)"
                @change="formItemChange(item,scope)">
                    <el-option v-for="(_item, m) in scope.row['select_'+item.field]" :key="m" :label="_item.label" :value="_item.value"><!-- select的数据与字段名相匹配 'select_'+'字段名' -->	</el-option>
            </el-select>
            <!-- 单选框 -->
            <template  v-else-if="item.type === 'radio'">
                <el-radio 
                    v-for="(ra,k) in item.items" 
                    :key="k" :label="ra.value"
                    :disabled="ra.disabled"  
                    @change="formItemChange(item,scope)"
                    v-model="scope.row[item.field]">{{ra.label}}</el-radio>
            </template>
            <!-- 复选框 -->
            <el-checkbox-group v-model="scope.row[item.field]"
                v-else-if="item.type === 'checkboxgroup'"
                @change="formItemChange(item,scope)">
                <el-checkbox 
                    v-for="(ch,n) in item.items"
                    :key="n"
                    :disabled="ch.disabled"
                    :label="ch.value">
                    {{ch.label}}
                </el-checkbox>
            </el-checkbox-group>
            <!-- 数字框 -->
             <el-input-number 
                v-else-if="item.type === 'inputNumber'"
                v-model="scope.row[item.field]"
                :style="'width:' + ('number'==typeof(item.controlWidth)? (item.controlWidth+'px') : item.controlWidth)+';' + (item.style?item.style:'')"
                :disabled="item.disabled"
                :min="item.min"
                :max="item.max"
                :step="item.step"
                :precision="item.precision"
                :controls="item.controls"
                :size="item.size"
                :label="item.label"
                :controls-position="item.controlsPosition"
                @input="formItemInput(item,scope)"
                @focus="formItemFocus(item,scope)"
                @blur="formItemBlur(item,scope)"
                @change="formItemChange(item,scope)"></el-input-number>
                <!-- 时间选择器 -->
            <el-time-select
                v-else-if="item.type === 'timePicker'"
                v-model="scope.row[item.field]"
                :style="'width:' + ('number'==typeof(item.controlWidth)? (item.controlWidth+'px') : item.controlWidth)+';' + (item.style?item.style:'')"
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
                @input="formItemInput(item,scope)"
                @focus="formItemFocus(item,scope)"
                @blur="formItemBlur(item,scope)"
                @change="formItemChange(item,scope)">
            </el-time-select>
            <!-- 日期时间选择器 -->
             <el-date-picker
                v-else-if="item.type === 'dateTimePicker'"
                v-model="scope.row[item.field]"
                :style="'width:' + ('number'==typeof(item.controlWidth)? (item.controlWidth+'px') : item.controlWidth)+';' + (item.style?item.style:'')"
                :type="item.dateType?item.dateType : 'date'"
                :value-format="item.valueFormat"
                :placeholder="item.placeholder?item.placeholder:'选择日期时间'"
                :range-separator="item.rangeSeparator? item.rangeSeparator :'至'"
                :start-placeholder="item.startPlaceholder? item.startPlaceholder :'开始日期'"
                :end-placeholder="item.endPlaceholder? item.endPlaceholder :'结束日期'"
                @input="formItemInput(item,scope)"
                @focus="formItemFocus(item,scope)"
                @blur="formItemBlur(item,scope)"
                @change="formItemChange(item,scope)">
            </el-date-picker>
                <!-- 验证错误信息 -->
            <div v-if="errMsg!=''" class="el-form-item__error"><i class="el-icon-warning"></i> {{errMsg}} </div>

		</el-form-item>         
        <!--表格元素相关 END-------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
		<!-- 未完待续 -->

		</div>	
</template>
<script type="text/babel">
// import http from '../../utils/public.js'
import  http from "../../../utils/public.js"
let qwFormTableRender = {
    props:["item","scope"],
    data(){
        return {
            errMsg:"",
            http:null,
        }
    },
    created(){
        this.http = http;
    }, 
	methods:{
        qwRemoteMethod(keywords,formItem){
            let query = keywords;
            // console.log(keywords,formItem)
            let conf=formItem.$attrs.config;
            if(conf){
                if("function" == typeof(conf.remoteMethod)){
                    conf.remoteMethod.call(query)
                }else{
                    if("function" == typeof(this.http[conf.dropDown.method])){
                        let isUrl = /^http[s]{0,1}:\/\//.test(conf.dropDown.romotePath);
                        this.http[conf.dropDown.method](conf.dropDown.romotePath,{Vue:this,params: conf.dropDown.params},isUrl).then(res=>{
                            let temp=[];
                            if(res.result==true){
                                for(let item of res.model){
                                    temp.push({...item,label:item[conf.dropDown.key],value:item[conf.dropDown.value]})
                                }
                                this.$set(scope.row,'select_'+ this.item.field, temp);
                            }else{
                                this.$message.error(res.message);
                            }
                        })
                    }
                }
            }
        },
		callBack(method,val,index) {
			this.$emit("callBack",{'method': method,"val": val,"index": index});
		},
		selectChange(item,scope){
			this.$emit("selectChange",{"scope":scope,"item":item})
		},
		//单行操作按钮
		buttonFunction(row,type) {
			//console.log(row)
			this.$emit("buttonFunction",row,type);
        },
        checkRuleReal(rules_,val){
            if(rules_.length==0){
                this.errMsg="";
                return true;
            }
            let tag =true;
            for(let item of rules_){
                if(item.validator && ('function'== typeof(item.validator))){
                    item.validator(item,val,(err)=>{
                        if(err&& err.message){
                            this.errMsg=err.message;
                            tag=false;
                        }else{
                            this.errMsg="";
                        }
                    })
                }
                if(item.required==true &&(val==="")){
                    this.errMsg =item.message? item.message+'' : '该项不能为空！';
                    return false; 
                }                
            }
            if(tag){
                this.errMsg="";
                return true;
            }else{
                return false;
            }
        },
        /*"自定义验证"*/ 
        checkRules(evtName="change"){
            this.errMsg="";
            let key = this.item.field;
            let val = this.scope.row[key];
            let rules = this.item.rules;
            if(!rules)return true;
            if(!evtName){
                return this.checkRuleReal(rules,val)
            }
            let rules_=[];
            for(let rule of rules){
                if((('string'==typeof(rule.trigger))&& rule.trigger==evtName)|| ((rule.trigger.constructor===Array)&&(rule.trigger.indexOf(evtName)>=0))){
                    rules_.push(rule);
                }
            }
            return this.checkRuleReal(rules_,val)
        },
        clearValidate(){
            this.errMsg="";
        },
        validate(){
            return this.checkRules()
            // let result = this.checkRules();
            // return new Promise((resolve, reject) =>{
            //     if(result){
            //         resolve();
            //     }else reject()
            // });
        },
        formItemInput(item,scope){
            this.$emit("formItemInput",{item:item,scope:scope})
            this.checkRules("input")
            this.selectChange(item, scope)
        },
        formItemChange(item,scope){
            this.$emit("formItemChange",{item:item,scope:scope})
            this.checkRules("change")
            this.selectChange(item, scope)
        },
        formItemFocus(item,scope){
            this.$emit("formItemFocus",{item:item,scope:scope})
        },
        formItemBlur(item,scope){
            this.$emit("formItemBlur",{item:item,scope:scope})
            this.checkRules("blur")
        }
	}
} 
export default qwFormTableRender;	
</script>
<style lang="less">
  @colPading: 8px 0;
  @theadColor: white;
  @theadImage: linear-gradient(to right, #4a8dd2, #2acaff);
  .qwFormTableRender {
    position: relative;
    padding: 8px 0;
    .my-pagination {
      text-align: center;
      margin-top: 10px;
    }
    .el-table {
      border: 1px solid #dee3e8;
    }
    .el-table td {
      padding: @colPading;
    }
    .el-table thead {
      background-color: #dee3e8; // color: @theadColor;
      font-weight: 500; // background-image: @theadImage;
    }
    .has-gutter th,
    .has-gutter tr {
     background-color: #F0F2F5;
    }
    .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width: 130px;
    }
    .el-form-item__error{
        position: relative;
    }
  }
</style>