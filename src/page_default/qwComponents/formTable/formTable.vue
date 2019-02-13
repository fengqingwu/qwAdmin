//多级表头表格（目前支持三级）by 风轻舞
<template>
<div class="tableEx" v-if="tableConfig" >
 <!-- 交互按钮 -->
    <toolbar @toolbarBack="toolbarBack" :toolbarConfig="tableConfig.toolbarConfig" v-if="tableConfig.toolbarConfig&&tableConfig.toolbarConfig.length">
      <slot></slot>
    </toolbar>
    <!-- form表单 -->
    <el-form v-model="tableData" label-width="0">
    <!-- 表格 -->    
    <el-table :data="tableData" :class="tableData.length>0?'':'nodata'" @select="select" :size="tableConfig.size" @select-all="selectAll" @row-dblclick="rowDblclick" :highlight-current-row="tableConfig.isHigh"  :border="tableConfig.isBorder">
      <!-- 是否勾选 -->
      <el-table-column v-if="tableConfig.isSelection" :show-overflow-tooltip="tableConfig.showOverflowTooltip"  type="selection" width="50" :align="tableConfig.align" :disabled="tableData.length<0">
      </el-table-column>
      <!-- 表格配置 -->
      <el-table-column v-for="(item,index) in tableConfig.colConfig" :fixed="item.fixed" :key="index" :prop="item.field" :width="item.width"
        :min-width="item.minWidth" :sortable="item.isSort" :resizable="item.isResize" :label="item.label"
        :align="tableConfig.align">
        <!-- 自定义表格内容 -->
        <template v-if="!item.children || (item.children && item.children.length==0)" slot-scope="scope">
          <!-- 渲染扩展 -->
          <TableColRender ref="render"  @selectChange="selectChange" :scope="scope" :item="item" @callBack="callBack" @buttonFunction="buttonFunction"></TableColRender>	
          <!-- 渲染扩展 -->
        </template>        
        <!-- 二级表头 -->
         <el-table-column v-if="item.children&&item.children.length>0" :show-overflow-tooltip="tableConfig.showOverflowTooltip"  v-for="(item2 , index2) in item.children"  :key="index2" :fixed="item2.fixed" :prop="item2.field" :width="item2.width"
        :min-width="item2.minWidth" :sortable="item2.isSort" :resizable="item2.isResize" :label="item2.label"
        :align="tableConfig.align">
         	<template v-if="!item2.children ||(item2.children && item2.children.length)" slot-scope="scope">
         		 <TableColRender ref="render2" @selectChange="selectChange" :scope="scope" :item="item2" @callBack="callBack" @buttonFunction="buttonFunction"></TableColRender>	
         	</template>
			<!-- 三级表头  -->
			<el-table-column v-if="item2.children&&item2.children.length>0" :show-overflow-tooltip="tableConfig.showOverflowTooltip"  v-for="(item3 , index3) in item2.children" :key="index3" :fixed="item3.fixed" :prop="item3.field" :width="item3.width"
		        :min-width="item3.minWidth" :sortable="item3.isSort" :resizable="item3.isResize" :label="item3.label"
		        :align="tableConfig.align">
		       	<template v-if="!item3.children ||(item3.children && item3.children.length)" slot-scope="scope">
		      		<TableColRender ref="render3"  @selectChange="selectChange" :scope="scope" :item="item3" @callBack="callBack" @buttonFunction="buttonFunction"></TableColRender>	
		        </template>		
		    </el-table-column>
         	<!-- /三级表头 -->
         </el-table-column>
         <!-- /二级表头 -->
      </el-table-column>
    </el-table>
    </el-form>
    <!-- 分页 -->
    <div class="my-pagination" v-if="tableConfig.isPage&&tableData&&(tableData.length>0)"  >
      <el-pagination  @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableConfig.pageNo"
        :page-sizes="[20, 40, 60, 80]" :page-size="tableConfig.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableConfig.total">
      </el-pagination>
    </div>
    <!-- loading -->
    <loading v-show="tableConfig.loadShow"></loading>
</div>	
</template>

<script type="text/babel">
import TableColRender from "./qwFormTableRender";
import toolbar from "../toolbar.vue"
import loading from "../Loading.vue"
let TableEx = {
	components:{
    TableColRender,
    toolbar,
    loading
	},
	props: ["tableConfig", "tableData"],
	data(){
		return {}
	},//data end
	mounted(){
		// console.log("mounted===>",this.$refs.render);
	},
	methods:{
        selectChange(data){
        this.$emit("selectChange",data)
        },
		callBack(data) {
			this.$emit(data.method,data);
		},
		toolbarBack(data) {
			//操作按钮回调
			this.$emit(data.method, data.index);
		},
		handleSizeChange(val) {
			//每页数量变化
			if (this.tableConfig.isLoading) {
				this.tableConfig.loadShow = true; //加载
			}
			this.tableConfig.pageSize = val;
			this.tableConfig.currentSelectArr = [];
			this.$emit("sizeChange");
		},
		handleCurrentChange(val) {
			//页码变化
			if (this.tableConfig.isLoading) {
			  	this.tableConfig.loadShow = true; //加载
			}
			this.tableConfig.pageNo = val;
			this.$emit("pageChange");
		},
		select(val) {
			//表格Checkbox勾选触发
			this.tableConfig.currentSelectArr = val;
		},
		selectAll(val) {
			//表格Checkbox全选触发
			this.tableConfig.currentSelectArr = val;
		},
		rowDblclick(val) {
			//表格单行双击
			this.$emit("rowDblclick", val);
		},
		//单行操作按钮
		buttonFunction(row,type) {
			this.$emit("buttonFunction",row,type);
        },
        getAllRender(){
            let renders=[];
            let render= this.$refs.render;  
            if(render){
                renders=[...render];
            }          
            let render2= this.$refs.render2;
            if(render2){
                renders=[...renders, ...render2];
            }
            let render3= this.$refs.render3;
            if(render3){
                renders =[...renders, render3];   
            }
            return renders;
        },
        validate(func= ()=>{}){
          // this.$message.warning("正在验证并保存数据...");
            let renders= this.getAllRender();
            let tag= true;
            for(let render of renders){
                if(!render.validate()){
                    tag= false;
                }
            }
            if(tag){
                func();
            }
            // let validators= [];
            // for(let item of renders){
            //     validators.push(item.validate())
            
            // }
            // Promise.all(validators).then(()=>{
            //     func()
            // }).catch((e)=>{
            //     console.log("验证不通过！")
            // })
        },
        clearValidate(){
            let renders = this.getAllRender();
            if(renders){
                for(let item of renders){
                    item.clearValidate();
                }
            }
        }
    },
    watch:{
      'tableData':function(){
        	this.tableConfig.currentSelectArr = [];
      }
    }

}

export default TableEx;	
</script>

<style lang="less">
    @colPading:0px 0;
    @theadColor:#666;
    @theadImage:#F0F2F5;
    .tableEx{
        position: relative;
        .my-pagination{
        text-align: center;
        margin-top: 10px;
        }
        .el-table td{
        padding:@colPading;
        min-height: 32px;
        }
        .el-table thead {
            color: @theadColor;
            font-weight: 500;
            background: @theadImage;
            // background-color: #DEE3E8;
        }
        .el-table tr td{
          color: #333;
        }
        .el-table th, .el-table tr {
        background-color: rgba(0,0,0,0);
    }
    .nodata .el-table__body-wrapper{
      min-height: 300;
    }
    .el-table__body-wrapper{
      min-height: 0;
    }
    .TableColRender{
      min-height: 32px;
    }

    }
  // @colPading: 8px 0;
  // @theadColor: white;
  // @theadImage: linear-gradient(to right, #4a8dd2, #2acaff);
  // .root {
    
    // position: relative;
    // // padding: 10px;
    // // border: 1px solid #dee3e8;
    // .my-pagination {
    //   text-align: center;
    //   margin-top: 10px;
    // }
    // .el-table {
    //   // border: 1px solid #dee3e8;
    //   border:none;
    // }
    // .el-table td {
    //   padding: @colPading;
    // }
    // .el-table thead {
    //   background-color: #dee3e8; // color: @theadColor;
    //   font-weight: 500; // background-image: @theadImage;
    // }
    // .has-gutter th,
    // .has-gutter tr {
    //  background-color: #F0F2F5;
    // }
    // .el-date-editor.el-input, .el-date-editor.el-input__inner{
    //     width: 130px;
    //   }
  // }
</style>
//配置实例
/***
  tableConfig:{
                 toolbarConfig: [],
                   colConfig: [
                    {
                    field: "macName",
                    label: "栏目",
                    type: "text",
                    children:[
                        {
                        field: "macName",
                        label: "栏目1",
                        type: "text"
                        },
                        {
                        field: "macName",
                        label: "栏目2",
                        type: "input"
                        },
                    ]
                    },{
                    field: "macName",
                    label: "标题",
                    type: "text"
                    },{
                    field: "macName",
                    label: "点击率",
                    type: "text"
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
            tableData:[1],
  ***/
	