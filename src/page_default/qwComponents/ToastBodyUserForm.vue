<template>
<div class="qwtostbox">
	<el-form :model="config.attrData" ref="ruleForm" :rules="config.attrRule||{}" label-width="100px">		
		<el-row>		
			<template v-for="(item, attr) in config.attrTrans">	
					<el-col :span="item.span? item.span : config.span">
						<el-form-item v-if="item.type=='date'" :label="item.label" :prop="attr">
							  <el-date-picker  style="width:210px" v-model="config.attrData[attr]" placeholder="请点选日期" value-format="yyyy-MM-dd"></el-date-picker>
						</el-form-item>
						<el-form-item v-if="item.type=='input'" :label="item.label" :prop="attr">
							<el-input :ref="attr" style="width:210px" v-model="config.attrData[attr]"  :placeholder="'请输入' + item.label"></el-input>
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
						<el-form-item v-if="item.type=='label'" :label="item.label" :prop="attr">
							<label style="color:#333;">{{config.attrData[attr]}}</label>
						</el-form-item>					
					</el-col>
			</template>
			<!-- {{config}} -->
			</el-row>
	</el-form>

	<!-- <h1>{{config}}</h1> -->

</div>	
</template>
<script>
let obj={
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
			api:[]
		}
	},
	methods:{
		init(){
			if('function'==typeof(this.config.opened)){
				this.config.opened(this);
			}
		}
	}
}	
export default obj;
</script>
<style lang="less">
.qwtostbox{
	box-sizing:border-box;
	padding:0 15px;
}	
</style>