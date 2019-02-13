<template>
<!-- 查看信息类弹框 -->
   <div class="lookInfo">
        <el-row :gutter="20" span="24">
          <el-col :span="item.span? item.span : config.span" class="lookInfo-item" v-for="(item,i) in config.attrTrans">
              	<span class="title">{{item.label}}:</span>
              	<span class="value" v-if="item.type=='text'">{{config.attrData[i]}}</span>
              	<span class="value" v-if="item.type=='in_array'">{{item.childrens[''+ config.attrData[i]]}}</span>
          		
          		<!-- in_array -->
          		
          </el-col>
        </el-row>
        <template v-for="(sub, i) in config.attrTransSub">
        	<div v-if="sub.type='subTable'"  class="qwsubbox" style="margin-top:20px">
        		<div class="th" style="border:1px solid #EEE;">
        			<span  :style="'display:inline-block;box-sizing:border-box;position:relative;width:' + (100/sub.items.length) + '%;'+ (it.style? it.style :'') " v-for="(it,i) in sub.items">{{it.label}}</span>
        		</div>
        		<div class="qwtr" v-for="(da,j) in config.attrDataSub[i]">
        			<span v-for="(it,i) in sub.items" :style="'display:inline-block;overfollow:hidden;position:relative;width:' + (100/sub.items.length) + '%;' + (it.style? it.style : '') ">        			<label v-if="it.type!='select'"  style="display:inline-block;width:100%;line-height:45px; float:left;height:28px;margin-top:0;text-align:center;" >{{da[it.field]}}</label>
        				<label v-if="it.type=='select'"  style="display:inline-block;width:100%;line-height:45px; float:left;height:28px;margin-top:0;text-align:center;overfollow:hidden;" ><input style="display:inline-block;width:100%;font-size:12px;line-height:20px;border:none;text-align:center;" type="text" v-model="da[it.field]"></label>

        			</span>
        		</div>
        		<!-- <h1>{{config.attrDataSub[i]}}</h1> -->
        	</div>
        </template>
        <!-- <div>{{config.attrTransSub}}</div> -->
   </div>
</template>
<script>
let vueObj={
	props:{
		config: {
			type: [Object, Array],
			default:{
				span:8,
				attrTrans:{'attr':'节点名称','attr2':'节点名称2'},
				attrData:{'attr':'attr_value','attr2':'attr2_value'}
			}
		}
	},
	data(){
		return {
			api:[],
		}
	},
	created(){

	},
	methods:{
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
		initSub(apiSub=null,attr=""){
			// if(!apiSub || (null==attr)){
			// 	console.error("apiSub/item/attr 有误！")
			// 	return;
			// }
			// console.log("addApi=======222>",this.addApi(apiSub.api))
			// if(!apiSub.api||(!this.addApi(apiSub.api))){
			// 	console.error("apiSub配置有误！")
			// }else{
			// 	let action=this.api[apiSub["api"]["action"]];
			// 	console.log("action===>",action);
			// 	// action({Vue:this,params:apiSub.build_param(this.config)}).then(res=>{
			// 	// 	this.config.attrDataSub[attr]=apiSub.formatRes(res);
			// 	// 					// setTimeout(()=>{this.clearValidate()},30);									
			// 	// })
			// }
		},
		init(){
			if(this.config.attrTransSub){
				for(let at in this.config.attrTransSub){
					if(this.config.attrTransSub[at].type=="subTable"){
						if(this.config.attrTransSub[at].apiSub.api&&this.config.attrTransSub[at].apiSub.build_param&&this.config.attrTransSub[at].apiSub.formatRes){
							if(this.addApi(this.config.attrTransSub[at].apiSub.api)){
								this.api[this.config.attrTransSub[at].apiSub.api.action]({Vue:this,params:this.config.attrTransSub[at].apiSub.build_param(this.config)}).then(res=>{
									this.config.attrDataSub[at] = this.config.attrTransSub[at].apiSub.formatRes(res);
								});
							}
						}
						// console.log('BodyInfoInit')//,this.config.attrTransSub[at])
					}
				}
			}
		}

	}

}	
export default vueObj;
</script>
<style scoped>
.toastBodyInfo{
	box-sizing: border-box;
	padding: 0 15px;
}
.lookInfo{
    padding: 0 50px;
    font-size: 14px;
    color: #565656;
}
.title{
    margin-right: 5px;
}       
.lookInfo-item{
    margin: 10px 0;
} 
span.title{
	display: inline-block;
	width: 80px;
	font-size: 14px;
	color:#666;
}  
span.value{	
	font-size: 14px;
	color:#333;
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
</style>