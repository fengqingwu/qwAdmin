<template>
<div class="qwPage">
	<el-tabs type="border-card" v-for="(item, i) in tabs">
      	<el-tab-pane :label="item.title">
      		<!-- @search="item.search.search" -->
      		<mes-search v-if="item.search" :ref="'tab_search_' + i" :config="item.search.searchConfig" :data="item.search.searchData"></mes-search>
			<mes-table :ref="item.table.ref" v-if="item.table" :tableConfig="item.table.tableConfig" :tableData="item.table.tableData"></mes-table>
			<!-- 弹窗 -->
			<mes-toast v-for="(item2, j) in item.toasts" :ref="'tab_'+ i +'toast'"  :config="item2">
				<ToastBodyInfo :ref="'tab_'+ i +'toastBody'"  v-if="item2.type=='info'" :config="item2.toastBodyConfig"></ToastBodyInfo>
				<ToastBodyAddEdit :ref="'tab_'+ i +'toastBody'"  v-else-if="item2.type=='add_edit'" :config="item2.toastBodyConfig"></ToastBodyAddEdit>
				<ToastBodyUserForm :ref="'tab_'+ i +'toastBody'" v-if="item2.type=='user_toast_form'" :config="item2.toastBodyConfig"></ToastBodyUserForm>	
			</mes-toast>
		</el-tab-pane>		
	</el-tabs>
</div>
</template>
<script>
import ToastBodyInfo from "./ToastBodyInfo.vue"
import ToastBodyAddEdit from "./ToastBodyAddEdit.vue"
import ToastBodyUserForm from "./ToastBodyUserForm.vue"
import http from '../api/public.js'
let that=null;
let common_toast ={	
						title: "查看详情", //弹窗标题
						type: "common_toast_form",
						attrTrans:{},//{'attr':'节点名称','attr2':'节点名称2'},
						attrData:{},//{'attr':'attr_value','attr2':'attr2_value'},
				        dialogVisible: false, //弹窗显示
				        width: "600px", //弹窗宽
				        toastBodyConfig:{
				        	span:12,
				        	attrTrans:{},//{'attr':'节点名称','attr2':'节点名称2'},
							attrData:{},//{'attr':'attr_value','attr2':'attr2_value'},
				        },
				        btnData:[],
				        btnData_: {
					        edit:{
					        	name: "关闭", //按钮名
					            method: "close",
					            methodCb: (that=null,toast,table,refToast,refToastBody)=>{
					            	toast.dialogVisible=false;
					            },//事件回调事件
					            bgColor: "dialog-white" //按钮背景
					        }
				        }
					};
let vueObj={
	props:{
		config:{
			type:[Object,Array],
			default:{},
		}
	},
	components:{
		ToastBodyInfo,
		ToastBodyAddEdit,
		ToastBodyUserForm
	},
	data(){
		return {
			inited:false,
			actions:[],
			api:{},
			tabs:[]
		}
	},
	created(){		
		that=this;
		let def_config={
			actions:[
				// {   
				// 	action:'/model/action',
				// 	method:'post'
				// },
			],
			api:{},			
			tabs:[									
				{	
					index:0,
					def_load:false,				
					title:"tab标题",
					search: {
					        searchData: {},
					        searchFunc: null,//搜索触发
					        searchConfig: [
					            [
					            	{
						                label: "下拉示例",
						                field: "cusInfo",
						                type: "select",
						                filterable: true,
						                childrens: [{label:'张三',value:'张三'},{label:'李四',value:'李四'}]
						            }
					            ]
					        ],
				    },
					table:{	
						ref:"tableMain",
						api:{listData: '/model/action',add:'/model/add',edit:'/model/edit',del:'/model/del'},
						getDataFunc:null,//获取表格数据函数
						bindFunc: (res, tableData)=>{
							tableData = res.model.items;
						},					
						tableConfig: {
							toolbarConfig: [
							{
								icon: "circle-plus",
								disabled: false,
								show: (len)=>{
									return true;
								},
								method: "add",
								type: 'primary',
								name:"新增",
								bindData:false,
								bindToast:1,
								toastConfig:{//用于覆盖绑定toast的配置
									type:'add',
									title:"新增",
									col:[]
								}
							},
							{
								icon: "edit",
								disabled: true,
								name:"编辑",
								bindData:true,
								show: (len)=>{
									return len == 1;
								},
								method: "edit",
								bindToast:1,
								toastConfig:{
									type:"edit",
									title:"编辑",
									col:[]
								}
							},
							{
								icon: "remove",
								disabled: true,								
								show: (len)=>{														
									return len > 0;
								},
								confirm:{
									title:"数据删除警告",
									msg:"该操作即将删除数据，是否继续？",
									confirmButtonText:"确定",
									cancelButtonText:"取消",
									CB_createParam:(datas)=>{
										let str="";
										for(let item of datas){
											str+=(item.id+',')
										}
										return {ids: str};
									},
									CB_success:(data)=>{
										that.$message.success({message:"操作成功！"})
										// console.log("do success!"+JSON.stringify(data))
									},
									CB_error:(data)=>{console.log("do error")}
								},
								method: "remove",
								name: "删除"
							}
							],
							// 表格字段配置
							colConfig: [
								// {
								// field: "field",
								// label: "客户信息",
								// type: "text"
								// },
								// {
								// fields: [
								// 	{
								// 		name:"查看详情",
								// 		method:"see",
								// 		type:'bindToast',
								// 		params:{
								// 			bindToast:0
								// 		}
								// 	}
								// ],
								// label: "操作",
								// type: "btnsText",

								// }
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
						tableData:[
						// {attr:"test1",attr2:"test12"},{attr:"test2",attr2:"test22"}
						]
					},//table end
					toasts:[
					{	
						title: "查看详情", //弹窗标题
						type: "info",
						attrTrans:{},//{'attr':'节点名称','attr2':'节点名称2'},
						attrData:{},//{'attr':'attr_value','attr2':'attr2_value'},
				        dialogVisible: false, //弹窗显示
				        width: "600px", //弹窗宽
				        toastBodyConfig:{
				        	span:12,
				        	attrTrans:{},//{'attr':'节点名称','attr2':'节点名称2'},
							attrData:{},//{'attr':'attr_value','attr2':'attr2_value'},
				        },
				        btnData: [
					        {
					        	name: "关闭", //按钮名
					            method: "close",
					            methodCb: (that=null,toast,table,refToast,refToastBody)=>{
					            	toast.dialogVisible=false;
					            },//事件回调事件
					            bgColor: "dialog-white" //按钮背景
					        }
				        ]
					},
					{
						title:"添加",
						type:"add_edit",
						dialogVisible: false,
						mod:'add',//add or  edit					
						width:"800px",
						toastBodyConfig:{
							attrTrans:{},//{'attr':{label:'节点名称',type:"input"},'attr2':{label:'节点名称2',type:"input"},'attr3':{label:'下拉节点3',type:'select',
							// dropDownApi:'/model/dropDown1',
							// dropDown:[{label:'test1',value:'test1'},{label:'test2',value:'test2'}]}},
							attrData:{},//{'attr':'attr_value','attr2':'attr2_value'},
							attrRule:{}//{ 'attr': [{ required: true, message: '此项为必填项', trigger: 'change'}],'attr2':[{ required: true, message: '此项为必填项', trigger: 'change',validator:(rule, value, callback) => {
														      //   if (!value||value.trim() === '') {
														      //      callback(new Error('此选择为必填,请填写'));
														      //   }else if (!/^[0-9|\.]{1,11}$/.test(value)) {
														      //     callback(new Error('格式有误'));
														      //   } else {
														      //     callback();   
														      //   }
														      // }
														  // }]}
						},
						btnData:[],
						btnData_: {
							edit:[
								 {
						        	name: "取消", //按钮名
						            method: "close",
						            methodCb: (that=null,toast=null,table=null,refToast=null,refToastBody=null)=>{
						            	console.log('refToastBody=======222222=>',refToastBody);
						            	refToastBody=refToastBody.submitForm? refToastBody : refToastBody.$children[0];
						            	refToastBody.resetForm();
						            	toast.dialogVisible=false;
						            },//事件回调事件
						            bgColor: "dialog-white" //按钮背景
						        },
						        {
						        	name:"修改",
						        	method:"edit",
						        	methodCb: (that=null,toast=null,table=null,refToast=null,refToastBody=null)=>{
						        		console.log("doSave")
						        		if(toast){
						        			let act = toast.mod=='add'? table.api.add : (toast.mod=='edit'? table.api.edit : "");
						        			let action=that.api[act];
						        			if(!action){
						        				console.error('获取api失败！请检查配置...');
						        			}else{
						        				refToastBody=refToastBody.submitForm? refToastBody : refToastBody.$children[0]
						        				// let params=that.setAttr(refToast.config.toastBodyConfig.attrData);
						        				refToastBody.submitForm((params)=>{
						        					if(table.api_CB && ('function'== typeof(table.api_CB[act]))){
						        						table.api_CB[act](params,refToastBody,toast,table,false);
						        					}else{
						        						action({Vue: this, params:params}).then(res=>{
							        					refToastBody.resetForm();
							        					toast.dialogVisible=false;
							        					table.tableConfig.pageNo=1;					        					
							        					table.getDataFunc({pageNo:1});
							        				})
						        					}
						        				
						        				})
						        				
						        			}
						        		}
						        	},
						        	bgColor: "dialog-deep-blue"
						        },
							],
							add:[
						        {
						        	name: "取消", //按钮名
						            method: "hide",
						            methodCb: (that=null,toast=null,table=null,refToast=null,refToastBody=null)=>{
						            	// console.log('refToastBody========>',refToastBody);
						            	refToastBody=refToastBody.submitForm? refToastBody : refToastBody.$children[0];
						            	refToastBody.resetForm();
						            	toast.dialogVisible=false;
						            },//事件回调事件
						            bgColor: "dialog-white" //按钮背景
						        },
						        {
						        	name:"保存",
						        	method:"save",
						        	methodCb: (that=null,toast=null,table=null,refToast=null,refToastBody=null)=>{
						        		console.log("doSave")
						        		if(toast){
						        			let act = toast.mod=='add'? table.api.add : (toast.mod=='edit'? table.api.edit : "");
						        			let action=that.api[act];
						        			if(!action){
						        				console.error('获取api失败！请检查配置...');
						        			}else{
						        				refToastBody=refToastBody.submitForm? refToastBody : refToastBody.$children[0]					        				 
						        				refToastBody.submitForm((params)=>{
						        					if(table.api_CB && ('function'== typeof(table.api_CB[act]))){
						        						table.api_CB[act](params,refToastBody,toast,table,false);
						        					}else{
						        						action({Vue: this, params:params}).then(res=>{
							        					refToastBody.resetForm();
							        					toast.dialogVisible=false;
							        					this.$set(table.tableConfig,'pageNo',1)
							        					table.tableConfig.pageNo=1;					        					
							        					table.getDataFunc({pageNo:1});
							        				})
						        					}
						        				})
						        				
						        			}
						        		}
						        	},
						        	bgColor: "dialog-deep-blue"
						        },
						        {
						        	name:"保存并继续",
						        	method:"saveAgain",
						        	bgColor: "dialog-deep-blue",
						        	methodCb:(that=null,toast=null,table=null,refToast=null,refToastBody=null)=>{
						        		console.log("saveAgain!")
						        		if(toast){
						        			let act = toast.mod=='add'? table.api.add : (toast.mod=='edit'? table.api.edit : "");
						        			let action=that.api[act];
						        			if(!action){
						        				console.error('获取api失败！请检查配置...');
						        			}else{
						        				refToastBody=refToastBody.submitForm? refToastBody : refToastBody.$children[0]
						        				// let params=that.setAttr(refToast.config.toastBodyConfig.attrData);
						        				refToastBody.submitForm((params)=>{
						        					if(table.api_CB && ('function'== typeof(table.api_CB[act]))){
						        						table.api_CB[act](params,refToastBody,toast,table,true);
						        					}else{
						        						action({Vue: this, params:params}).then(res=>{
							        					refToastBody.resetForm();
							        					toast.dialogVisible=true;
							        					table.tableConfig.pageNo=1;					        					
							        					table.getDataFunc({pageNo:1});
							        				})
						        					}
						        				})
						        			}
						        		}
						        	},
						        }
					        ]
				    },

					}
				],//toasts end	
				}//tab end
			]			
		}

		let conf= this.deepObjMerge(def_config,this.config);
		for(let attr in conf){
			this[attr]=conf[attr];
		}

	},
	mounted(){
		that=this;
		this.init();
		that=this;
	},
	methods:{
		deepObjMerge(old_,new_,types=['test','string','number','boolean','function']){
			for(var attr in new_){
				if(undefined === old_[attr]){
					if(new_[attr].type=="user_toast_form"){//获取自定义toast
						old_[attr] = this.deepObjMerge(common_toast,new_[attr]);
					}else old_[attr]=new_[attr];
				}else{
					if(types.indexOf(typeof(new_[attr]))>0){
						old_[attr]=new_[attr];
					}else{
						old_[attr]=this.deepObjMerge(old_[attr],new_[attr])
					}
				}
			}
			return old_;
		},		
		init(){	
			if(this.inited)return;		
			let api=[];
			//初始化Api
			window.__qw__http=http;
			let i=0;
			for(let item of that.actions){
				// console.log("method===>",item)
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
						api[_name] = temFun;
					}
					break;
					case "post":
					{
						let str= "temFun= function(data){\
							return __qw__http.fetchPost('" + item.action +"',data)\
						}";
						eval(str);
						api[_name] = temFun;
					}
					break;
					case "postjson":
					{
						let str= "temFun= function(data){\
							return __qw__http.fetchPostJson('" + item.action +"',data)\
						}";
						eval(str);
						api[_name] = temFun;
					}
					break;
				}
			}
			that.api=api;
			//初始化tabs
			for(let item of that.tabs){
				if(item.table){
					let tb = that.$refs[item.table.ref];
					if(!that.api[item.table.api.listData]||(!that.api[item.table.api.add]) || (!that.api[item.table.api.edit])){
						console.error("table api配置有误")
						return;
					}
					//初始化绑定数据函数
					item.table.getDataFunc=(data ={})=>{
						item.table.tableData=[];
						if(undefined===data.pageSize)data.pageSize=item.table.tableConfig.pageSize;
						if(undefined===data.pageNo)data.pageNo=item.table.tableConfig.pageNo;
						//qwtest doing
						if(item.search.searchData){
							for(let attr in item.search.searchData){
								data[attr]=item.search.searchData[attr];
							}
						}
						that.setAttr(data);
						that.api[item.table.api.listData]({Vue:that,params: data}).then(res=>{
							if(item.table.bindFunc){
								console.log("bindData to table")
								let data=item.table.bindFunc(res,item.table.tableData);
								item.table.tableData=data.tableData;
								item.table.tableConfig.total=data.total;
								item.table.tableConfig.loadShow=false;
								item.table.tableConfig.isLoading=false;
								item.table.tableConfig.currentSelectArr=[];
								setTimeout(()=>{
									for(let it_ of item.table.tableConfig.toolbarConfig){
										let value=it_.show(item.table.tableConfig.currentSelectArr.length);
										it_.disabled=!value;
									}
								},30)	
							}
						})
					}
					if(item.table.def_load){//默认加载1页
						this.$set(item.table.tableConfig,'pageNo',1)
						// item.table.tableConfig.pageNo=1;
						item.table.getDataFunc({});
					}
					//初始化绑定search函数
					if(item.search){
						item.search.searchFunc = (data={})=>{
							item.table.tableConfig.pageNo=1;
							item.table.getDataFunc(data);
						}
						let search_=that.$refs['tab_search_'+i][0];
						search_.$on('search',item.search.searchFunc);
						for(let sItem of item.search.searchConfig[0]){
							if(sItem.type=='select'){
								if(sItem.childrens.length==0 && sItem.dropDown.api && (!that.api[sItem.dropDown.api])){
									console.error("搜索框api配置有误")
								}else{
									let params=sItem.dropDown.params? sItem.dropDown.params : {};
									that.api[sItem.dropDown.api]({Vue: that,params: params}).then(res=>{
										sItem.dropDown.Cb_func(res,sItem);
									})
								}
							}
						}
						// alert(JSON.stringify(item.search.searchConfig[0]));

					}
					//表格选择项更改事件
					tb[0].$on('selectArrChange',()=>{//设置工具条按钮的状态
						if(item.table.tableConfig.toolbarConfig.length>0){
							setTimeout(()=>{
								for(let it_ of item.table.tableConfig.toolbarConfig){
									let value=it_.show(item.table.tableConfig.currentSelectArr.length);
									it_.disabled=!value;
								}
							},30)						
						}
					})
					//表格事件
					tb[0].$on('pageChange',item.table.getDataFunc);
					tb[0].$on('sizeChange',item.table.getDataFunc);
					for(let it of item.table.tableConfig.colConfig){
						if(it.type=="btnsText"){
							for(let it2 of it.fields){
								if(it2.type=="bindToast"){
									if(item.toasts[it2.params.bindToast]){
										tb[0].$on(it2.method,(scope,index,params)=>{//动态为table绑定事件
											if(params.bindToast>=0 && item.toasts[params.bindToast]){
												item.toasts[params.bindToast].dialogVisible=true;												
												setTimeout(()=>{
													let toast=that.$refs['tab_'+ item.index +'toast'][params.bindToast];
													setTimeout(()=>{
														if(toast)toast=toast.$children[0].$children[0];
														if('function'==typeof(toast.init)){
															toast.init();
														}
													},10)	
													//解除双向绑定	
													let tem={};
													for(let o in scope){
														tem[o]=scope[o]
													}					
													console.log("do bindToast")						
													item.toasts[params.bindToast].toastBodyConfig.attrData=tem;
												},10)
											}else{
												console.error("表格绑定弹窗不存在.....")
											}	
										})
									}
								}
							}
						}
					}
					//绑定工具条按钮事件
					if(item.table.tableConfig.toolbarConfig){
						for(let it3 of item.table.tableConfig.toolbarConfig){
							if(it3.bindToast >= 0 && item.toasts[it3.bindToast]){
									// let selectData= item.table.tableConfig.currentSelectArr[0];
									tb[0].$on(it3.method,(selectData) => {
										item.toasts[it3.bindToast].title=it3.toastConfig.title;
										item.toasts[it3.bindToast].mod=it3.toastConfig.type;
										if(item.toasts[it3.bindToast].type=="add_edit"){//绑定不同的按钮组
											item.toasts[it3.bindToast].btnData=item.toasts[it3.bindToast].btnData_[item.toasts[it3.bindToast].mod]
										}
										if(it3.bindData){
											item.toasts[it3.bindToast].toastBodyConfig.mod="edit";
											//解除双向绑定	
											let tem={},scope = item.table.tableConfig.currentSelectArr[0];
											for(let o in scope){
												tem[o]=scope[o]
											}		
											item.toasts[it3.bindToast].toastBodyConfig.attrData=tem;
										}else{
											item.toasts[it3.bindToast].toastBodyConfig.mod="add";
											for(let attr in item.toasts[it3.bindToast].toastBodyConfig.attrData){
												item.toasts[it3.bindToast].toastBodyConfig.attrData[attr]=null;
											}
										}
										setTimeout(()=>{;
											let toastBody=this.$refs['tab_'+ item.index +'toast'][it3.bindToast].$children[0].$children[0];
											// alert('tab_'+ item.index +'toastBody ' +11111+typeof(toastBody))
											if(toastBody && ('function' === typeof(toastBody.init))){//dialoginit
												toastBody.init();
											}
										},30)										
										item.toasts[it3.bindToast].dialogVisible=true;
									})
							}else if(it3.confirm){							
								tb[0].$on(it3.method,()=>{
									let data=item.table.tableConfig.currentSelectArr;
									// console.log("item.table.tableConfig.currentSelectArr====>",data);
									that.$confirm(it3.confirm.msg, it3.confirm.title, {
							          confirmButtonText: it3.confirm.confirmButtonText,
							          cancelButtonText: it3.confirm.cancelButtonText,
							          type: 'warning',
							          center: true
							        }).then(() => {
							        	if(!that.api[item.table.api.del]){
							        		console.error("table 删除api配置有误！")
							        	}
							        	let params=it3.confirm.CB_createParam(data);
							        	that.api[item.table.api.del]({Vue: that,params: params}).then(res=>{
							        		it3.confirm.CB_success(data);
							        		item.table.getDataFunc({});
							        	})
							        }).catch(() => {
							        	it3.confirm.CB_error(data);
							        });
								})
							}
						}
					}
					//初始化弹窗
					for(let attr=0; attr< item.toasts.length; attr++){
						if(attr>1){
							item.toasts[attr]= this.deepObjMerge(common_toast,item.toasts[attr]);
							// console.log("toast===>" + attr + " ===>",item.toasts[attr])
						}
						if(item.toasts[attr].btnData){
							let toast = that.$refs['tab_'+ i +'toast'][attr];
							if(toast){
								let btn=null;
								if(item.toasts[attr].btnData_){
									for(let i in item.toasts[attr].btnData_){
										for(let attr_ in item.toasts[attr].btnData_[i]){
											toast.$on(item.toasts[attr].btnData_[i][attr_].method,()=>{
												item.toasts[attr].btnData_[i][attr_].methodCb(that,item.toasts[attr],item.table,toast,toast.$children[0]);
											})
										}
									}
								}
								if(item.toasts.type!='add_edit')for(let attr_ in item.toasts[attr].btnData){
									toast.$on(item.toasts[attr].btnData[attr_].method,()=>{
										item.toasts[attr].btnData[attr_].methodCb(that,item.toasts[attr],item.table,toast,toast.$children[0]);
									})
								}
							}
						}
					}			
				}
				//计数自增
				i++;
			}
			console.log("inited========================================")
			this.inited=true;
		},
		setAttr(data){
			for(let attr in data){
				if(null===data[attr]||(undefined===data[attr])||(""===data[attr]))
				{
					delete data[attr];
				}
			}
			return data;
		},
		action(action=""){
			if(null==action)return null;
			else return this.api[action.replace(/\//g,"_")];
		},		
		doSearchData(data){
			console.log("doSearchData")
		}
	}
}	
export default vueObj;
</script>
<style scoped>
.qwPage{
	box-sizing: border-box;
	background: #FFF;
}	
</style>