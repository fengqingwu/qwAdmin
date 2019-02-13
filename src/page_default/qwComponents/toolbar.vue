//按钮组
<template>
	<div class="toolbarAll">
		<div class="clear toolbar">
			<div class="toolleft">
				<span >
					<slot></slot>
				</span>				
			</div>
			<div class="toolright">
				<el-button 
          :style="item.style"
          :class="item.class"
				  :loading="item.loading" 
				  :size="item.size ||'mini'" v-for="(item,index) in toolbarConfig"  
				  :icon="item.isDefaultIcon? item.icon: 'el-icon-'+item.icon" :key="index" 
				  :disabled="item.disabled" 
          :round="item.round"
				  :type="item.type?item.type : 'info'"
				  @click="btnClick(item.method,index)">{{item.name}}</el-button>
			</div>
		</div>
	</div>
</template>
<style type="text/css" scoped lang="less">
.toolbar {
  height: 50px;
  line-height: 50px;
  .toolleft {
    float: left;
    span {
      margin-left: 10px;
    }
  }
  .toolright {
    float: right;
    margin-right: 10px;
  }
}
</style>
<script type="text/javascript">
export default {
  props: {
    toolbarConfig: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      //数据传递参考
      // toolbarConfig:[{
      //      loading:true,
      //      icon:'xxx',
      // 	    disabled:true,
      //      method:'xxxx',
      // 	    name:'小黑'
      // },
      // {
      //      icon:'xxx',
      //      method:'xxxx',
      // 	    name:'小黑'
      // }]
    };
  },
  methods: {
    btnClick(val, index) {
      //按钮事件回调
      // console.log(val);
      this.$emit("toolbarBack", { index: index, method: val });
    }
  }
};
</script>
<style lang="less">
@btnBgColor: #409eff; //按钮背景颜色
@btnBgImage: linear-gradient(to right, #e6e6e6, #e6e6e6); //按钮背景图片
@btnTextColor: #686868; //按钮文字颜色
@btnHoverColor: #686868; //按钮交互文字颜色
.toolbarAll {
  .el-button--default {
    // background-color: @btnBgColor;
    // background-image: @btnBgImage;
    //     color: @btnTextColor;
  }
  .el-button:focus,
  .el-button:hover,
  .el-button:active {
    //  color: @btnHoverColor;
  }
}
</style>
