<template>
<div id="qwtoastBody" class="toastBodyAddEdit">
	<!-- <h1>toastBodyAddEdit</h1> -->
	<!-- <h1>{{config}}</h1> -->
	<el-form :model="config.attrData" ref="ruleForm" :rules="config.attrRule" label-width="100px">		
		<el-row>		
			<template v-for="(item, attr) in config.attrTrans">	
					<el-col :span="item.span? item.span : config.span">
						<el-form-item v-if="item.type=='date'" :label="item.label" :prop="attr">
							  <el-date-picker  style="width:210px" v-model="config.attrData[attr]" placeholder="请点选日期" value-format="yyyy-MM-dd"></el-date-picker>
						</el-form-item>
						<el-form-item v-if="item.type=='input'" :label="item.label" :prop="attr">
							<el-input v-if="item.readonly==true || (config.mod=='edit' && item.isReadOnlyEdit)" readonly :ref="attr" style="width:210px" v-model="config.attrData[attr]"  :placeholder="item.placeholder || '请输入' + item.label"></el-input>
							<el-input v-if="undefined==item.readonly && (!(config.mod=='edit' && item.isReadOnlyEdit))" :ref="attr" style="width:210px" v-model="config.attrData[attr]"  :placeholder="item.placeholder || '请输入' + item.label"></el-input>
						</el-form-item>
						<el-form-item v-if="item.type=='select'" :label="item.label" :prop="attr">
							<template>
							<el-select  :ref="attr":filterable="item.filterable" style="width:210px"  v-model="config.attrData[attr]">
								  <el-option v-for="(op, _i) in item.childrens" :key="_i" :label="op.label" :value="op.val"></el-option>
							</el-select>
							</template>
						</el-form-item>
						<el-form-item v-if="item.type=='textarea'" :label="item.label" :prop="attr">
							<el-input :ref="attr"  v-model="config.attrData[attr]" type="textarea"  :placeholder="'请输入' + item.label"></el-input>
						</el-form-item>					
					</el-col>
			</template>
			</el-row>	
		</el-form>	
			<div style="clear:both;"></div>
			<div class="qwsubbox">
			<template v-if="config.attrTransSub" v-for="(transItem, i) in config.attrTransSub">
					<el-form :model="config.attrDataSub[i][k]" v-for="(da, k) in config.attrDataSub[i]" ref="subForm" :rules="config.attrRuleSub[i][k]" label-width="10px">
						<div v-if="k==0" class="th" style="border:1px solid #EEE;">
							<span v-for="(sub,j) in transItem.items" :style="'display:inline-block;position:relative;width:' + (100/transItem.items.length) + '%'">{{sub.label}}</span>
						</div>
						<div class="qwtr">
							<span v-for="(sub,j) in transItem.items" :style="'display:inline-block;position:relative;width:' + (100/transItem.items.length) + '%'">
									<el-form-item  v-if="sub.type=='input'" :prop="sub.field">
										<el-input  @input="sub.inputCB? sub.inputCB(config.attrDataSub[i][k],config) :()=>{}" style="display:inline-block; float:left;height:28px;margin-top:0;" type="text" v-model="config.attrDataSub[i][k][sub.field]" size="mini" placeholder="请输入"></el-input>
									</el-form-item>
									<el-form-item  v-if="sub.type=='select'" :prop="sub.field">
										<el-select v-model="config.attrDataSub[i][k][sub.field]" @change="sub.changed(config.attrDataSub[i][k][sub.field],config,i,k,sub.field)" style="display:inline-block; float:left;height:28px;margin-top:0;" size="mini">
										<el-option v-for="op in sub.childrens" :label="op.label" :value="op.val"></el-option>
									</el-select>
									</el-form-item>
									<template v-if="sub.type=='btnsText'">
										<label style="display:inline-block;width:100%;float:left;">
											<el-button style="display:inline-block;height:28px;" @click="it.CB_func(config,i,config.attrDataSub,k)" v-for="(it, n) in sub.field" type="text" size="mini">{{it.label}}</el-button>
										</label>
									</template>
									<el-form-item  v-if="sub.type=='labelComputed'" >
										<el-input style="display:inline-block; float:left;height:28px;margin-top:0;" type="text" readonly v-model="config.attrDataSub[i][k][sub.field]" size="mini" ></el-input>
									</el-form-item>
<!-- 
									<label  style="display:inline-block;width:100%;line-height:45px; float:left;height:28px;margin-top:0;text-align:center;"  v-if="sub.type=='labelComputed'">{{config.attrDataSub[i][k][sub.field]||0}}</label> -->
							</span>
						</div>
						<!-- {{config.attrDataSub[i]}}	 -->
					</el-form>
				</template>	
			</div>

</div>
</template>
<script>
import http from '../api/public.js'
let that=null;
let vueObj={
	props:{
		config: {
			type: [Object, Array],
			default:{
				"attrTrans": { "attr": { "label": "节点名称", "type": "input" }, "attr2": { "label": "节点名称2", "type": "input" } }, 
				"attrData":{'attr':'attr_value','attr2':'attr2_value'},
				"attrRule":{},//{ 'attr': [{ required: true, message: '此项为必填项', trigger: 'change'}],'attr2':[{ required: true, message: '此项为必填项', trigger: 'change'}]}
			}
		}
	},
	data(){
		return {
			test:111,
			subRule:{},
			api:[]
		}
	},
	mounted(){

		// this.initDropdown()
	},
	methods:{
		init(){
			that=this;
			this.initData()
			this.initDropdown();
			this.clearValidate();
		},

		addApi(item){
			if(!window.__qw__http)window.__qw__http=http;
				let _name = item.action;//item.action.replace(/\//g,"_");
				let _method=item.method.toLocaleLowerCase()
				let temFun=null;
				switch(_method){
					case "get":
					{
						let str= "temFun= function(data){\
							return __qw__http.fetchGet('" + item.action +"',data)\
						}";
						eval(str);
						this.api[_name] = temFun;
						return true
					}
					break;
					case "post":
					{
						let str= "temFun= function(data){\
							return __qw__http.fetchPost('" + item.action +"',data)\
						}";
						eval(str);
						this.api[_name] = temFun;
						return true;
					}
					break;
					default:
					{
						return false
					}
				}
		},
		initData(){
			for(let attr in this.config.attrTrans){
				if(this.config.attrTrans[attr].type=="subTable"){
			 		// console.log('this.config.attrTrans[attr]===>',attr,this.config.attrTrans[attr])
			 		this.config.attrData[attr]=[];
					this.config.attrData[attr][0]={};
					for(let attr2 in this.config.attrTrans[attr].items){
						// console.log(typeof(this.config.attrTrans[attr].items[attr2].field))
					 	if("object"!=typeof(this.config.attrTrans[attr].items[attr2].field))this.config.attrData[attr][0][this.config.attrTrans[attr].items[attr2].field]=null;
					}
				}
			}
			for(let attr in this.config.attrTransSub){
				if(this.config.attrTransSub[attr].type=="subTable"){
					if(this.config.mod=="add"){
						// alert("mod:add")
					}else if(this.config.mod=="edit"){
						if(this.config.attrTransSub[attr].apiSub){
							//console.log(JSON.stringify(this.config.attrTransSub[attr].apiSub));
							if(this.addApi(this.config.attrTransSub[attr].apiSub["api"])){
								let action=this.api[this.config.attrTransSub[attr].apiSub["api"]["action"]];
								action({Vue:this,params:this.config.attrTransSub[attr].apiSub.build_param(that.config)}).then(res=>{
									this.config.attrDataSub[attr]=this.config.attrTransSub[attr].apiSub.formatRes(res);
									setTimeout(()=>{this.clearValidate()},30);									
								})
							}
						}
					}
				}
			}
		},
		initDropdown(){
			let that=this;
			for(let attr in this.config.attrTrans){
				if(this.config.attrTrans[attr].type==='select' && (this.config.attrTrans[attr].dropDown)){
					let api_=this.config.attrTrans[attr].dropDown.api;
					if(!api_){
						console.error("弹窗项 "+this.config.attrTrans[attr].label+" 配置项有误！");
					}
					if(that.addApi(api_)){
						that.api[api_.action]({Vue: this, params: this.config.attrTrans[attr].dropDown.build_param("")}).then(res=>{
							that.config.attrTrans[attr].childrens = that.config.attrTrans[attr].dropDown.formatRes(res)
						})
					}					
				}else if(this.config.attrTrans[attr].type==='subTable'){
					for(let attr2 in  this.config.attrTrans[attr].items){
						if(this.config.attrTrans[attr].items[attr2].type=='select' && (this.config.attrTrans[attr].items[attr2].dropDown)){
							let api_=this.config.attrTrans[attr].items[attr2].dropDown.api;
							if(!api_){
								console.error("弹窗项 "+this.config.attrTrans[attr].label+" 配置项有误！");
							}
							if(that.addApi(api_)){
								// console.log("done......");

							that.api[api_.action]({Vue: this, params: this.config.attrTrans[attr].items[attr2].dropDown.build_param("")}).then(res=>{
								that.config.attrTrans[attr].items[attr2].childrens = that.config.attrTrans[attr].items[attr2].dropDown.formatRes(res)
								// console.log("done...",that.config.attrTrans[attr].items[attr2].dropDown.formatRes(res));
							})
							}
						}
					}
				}
			}
			if(this.config.attrTransSub){
				for(let at in this.config.attrTransSub){
					if(this.config.attrTransSub[at].type=="subTable"){
						for(let attr in this.config.attrTransSub[at].items){
							let item=this.config.attrTransSub[at].items[attr];
							if(item.type=='select'  && item.dropDown){
								let api_=item.dropDown.api;
								if(!api_){
									console.error("弹窗项配置项有误！");
								}
								if(that.addApi(api_)){
									that.api[api_.action]({Vue: this, params: item.dropDown.build_param("")}).then(res=>{
										this.config.attrTransSub[at].items[attr].childrens = item.dropDown.formatRes(res)
									})
								}
							}
						}

					}
				}
				
			}

		},		
		clearValidate(){
			this.$refs['ruleForm'].clearValidate();
			let subs=this.$refs["subForm"];
			if(subs){
				for(let sub of subs){
					sub.clearValidate();
				}
			}
			// this.$refs[]
		},
		resetForm(){
			if(this.config.attrTransSub){
				for(let at in this.config.attrTransSub){
					if(this.config.attrTransSub[at].type=="subTable"){
						if(this.config.attrDataSub[at].length>0){
							let tem=[];
							tem.push(this.config.attrDataSub[at][0]);
							this.config.attrDataSub[at]=tem;
						}
						// let tem=[];
						// for(let attr in this.config.attrDataSub[at][0]){
						// 	this.config.attrDataSub[at][0][attr]="";
						// }

						// this.config.attrDataSub[at]=[tem];
					}
				}
			}
			setTimeout(()=>{
				this.clearValidate();
				this.$refs['ruleForm'].resetFields();
				let subs=this.$refs["subForm"];

				if(subs){
					for(let sub of subs){
						sub.resetFields();
					}
				for(let at in this.config.attrTransSub){	
					for(let attr in this.config.attrDataSub[at][0]){
						// console.log("attr========>",attr);
						if("string"==typeof(this.config.attrDataSub[at][0][attr])&& (this.config.attrDataSub[at][0][attr].length>0)){
							this.config.attrDataSub[at][0][attr]="";
						}
					}	
				}
			}			
			},10)
			
			


		},
		 vili(form){
		 	console.log("form===>",form)
			return new Promise((resolve, reject) => {
			  form.validate((valid) => {
			    // console.log("validate==>", valid)
			        if (valid) {
			            resolve(true);
			        } else {
			            resolve(false);
			        }
			      }
			    )
			})
		},
		ckVal(val){
	        if(undefined == val ||("" == val) || (null == val)){
	            return false;
	        }else return true;
	    },
	    buildData(){
	    	let data={...this.config.attrData};
	    	if(this.config.attrDataSub)for(let attr in this.config.attrDataSub){
	    		data[attr]=this.config.attrDataSub[attr];
	    	};
	    	return data;
	    },
		submitForm(cb= ()=>{}){
			let t=1;
			let tag=false;
			let subforms = this.$refs['subForm'];
			if(undefined===subforms){
					this.submitForm_def(cb)
			}else{
				let forms=[];
				forms[0]=this.$refs['ruleForm'];
				for(let form of subforms){
					forms.push(form);
				}
				let len=forms.length;
				for(let i =0; i< len;i++){
			      this.vili(forms[i]).then((res)=>{
			          t++;
			          if(!res)tag=true;
			      })
				}
				setTimeout(()=>{//解决不同步的问题
					let data=this.buildData();
					console.log("data======>",data);
				  	if(!tag && (data))cb(data)
				},10)
			}
        },
		 submitForm_def(fun) {
            this.$refs['ruleForm'].validate((valid) => {
	            if (valid) {
	                if (fun) {
	                	fun(this.buildData());
	                }
	            } else {
	                //console.log('error submit!!');
	                return false;
	            }
            });
          }
	}
}
export default vueObj;	
</script>
<style lang="less">
	.toastBodyAddEdit{
		box-sizing: border-box;
		padding: 15px;
	}
	.qwtable .th{
		border: 1px solid #EEE;
	}
	.qwtr{
		border: 1px solid #EEE;
		border-top: none;
		height: 45px;
	}
	.qwtr span,.th span{
		display: inline-block;
		box-sizing: border-box;
		text-align: center;
		line-height: 40px;
		height: 40px;
		border-right: 1px solid #EEE;
	}
	.qwtr .el-form-item span, .qwtr .el-button.el-button--text.el-button--mini span{
		border-right:none;
	}
	.qwtr span{
		height: 45px;
		box-sizing: border-box;
		padding: 0 5px;
	}
	.tr span:last-child,.th span:last-child{
		border-right: none;
	}
    #qwtoastBody .el-form-item__error{
		text-align: left!important;
		float: left;
	}
</style>