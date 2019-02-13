//TableEx td渲染组件
<template>
<div class="TableColRender">
		<!-- 普通文本 -->
		<span v-if="item.type === 'text'">{{'function'==typeof(item.transVal)? item.transVal(scope.row[item.field]) : scope.row[item.field]}}</span>
		<!-- 按钮 -->
		<el-button v-else-if="item.type=='button'" :size="item.size">{{item.label}}</el-button>
		<!-- 多按钮 -->
		<div v-else-if="item.type === 'btnsText'"><el-button type="text" v-for="(it,m2) in item.fields" :key="m2" @click="callBack(it.method,scope.row,scope.$index)" size="mini">{{it.name}}</el-button></div>
		<!-- 输入框 -->
		<el-input v-else-if="item.type === 'input'" v-model.trim="scope.row[item.field]" size="mini"></el-input>
		<!-- 日期 -->
		<el-date-picker v-else-if="item.type === 'date'" v-model="scope.row[item.field]" type="date" placeholder="选择日期" size="mini" value-format="yyyy-MM-dd"> </el-date-picker>
		<!-- 数字输入框 -->
		<el-input-number size="mini" :controls="false" style="width:90%" placeholder="请输入数量" v-else-if="item.type === 'inputNumber'" v-model="scope.row[item.field]"></el-input-number>
		<!-- 下拉菜单 -->
		<el-select @change="selectChange(scope,item)" v-else-if="item.type === 'select'" v-model="scope.row[item.field]" clearable placeholder="请选择" size="mini">
				<el-option v-for="(_item, m) in scope.row['select_'+item.field]" :key="m" :label="_item.label" :value="_item.value"><!-- select的数据与字段名相匹配 'select_'+'字段名' -->	</el-option>
		</el-select>
		<!-- 盘点录入 -->
		<el-input-number  v-else-if="item.type === 'actAmount'" size="mini" :min="0" :controls="false" style="width:90%" placeholder="请输入数量" 
		v-model="scope.row[item.field]" :disabled="scope.row['isActAmount']"></el-input-number>
		<el-input-number  v-else-if="item.type === 'proAmount'" size="mini" :controls="false" style="width:90%" placeholder="请输入数量" 
		v-model="scope.row[item.field]" :disabled="scope.row['isProAmount']"></el-input-number>
		<!-- 普通单个按钮 -->
		<span v-else-if="item.type == 'btnText'"><el-button size="small" type="text" @click="buttonFunction(scope.row) ">{{item.field}}</el-button></span>
		<span v-else-if="item.type=='buttonAble'"><el-button :type="scope.row.isAble?'primary':'danger'" size="mini" :plain="true">{{scope.row.isAble?'启用':'停用'}}</el-button></span>
		<span v-else-if="item.type=='btnsTextWithMethod'"><el-button v-if="undefined==it.showFunc || (it.showFunc(scope.row))" type="text" v-for="(it,k) in item.fields" @click="callBack(it.method,scope.row,scope.$index)" size="mini" :key="k">{{it.name}}</el-button></span>

		<!-- 盘点录入 -->
		<span v-else-if="item.type == 'el-btnText'">
		<el-button size="small" type="text" @click="buttonFunction(scope.row,'info')">查看详情</el-button>
		<el-button size="small" type="text" @click="buttonFunction(scope.row,'print')">打印</el-button>
		</span>
		<!-- 未完待续 -->

		</div>	
</template>
<script type="text/babel">
let TableColRender = {
	props:["item","scope"],
	methods:{
		callBack(method,val,index) {
			this.$emit("callBack",{'method': method,"val": val,"index": index});
		},
		selectChange(scope,item){
			this.$emit("selectChange",{"scope":scope,"item":item})
		},
		//单行操作按钮
		buttonFunction(row,type) {
			//console.log(row)
			this.$emit("buttonFunction",row,type);
		}
	}
} 
export default TableColRender;	
</script>
<style lang="less">
  @colPading: 8px 0;
  @theadColor: white;
  @theadImage: linear-gradient(to right, #4a8dd2, #2acaff);
  .TableColRender {
    position: relative;
    padding: 10px;
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
  }
</style>