<template>
<div class="page404 bg404"  :style="'height:' + (sidebarHeight-40) +'px;' ">
	<div class="box" :style="{height: sidebarHeight +'px'}">
		<div class="cont">
			<div class="img"></div>
			<div class="r">
				<h3 class="title">404</h3>
				<p class="msg">抱歉，找不到您的页面</p>
				<el-button class="btn_refresh" type="primary" size="small" @click="goBack"><i class="el-icon-refresh"></i> 返回上一页</el-button>
			</div>
		</div>
	</div>
</div>
</template>
<script>
import {mapMutations,mapGetters,mapState} from 'vuex';
let vueObj={
	data(){
		return {
			
		}
	},
	computed:{
		...mapState({
			sidebarHeight: state => state.app.sidebarHeight
		})
	},
	methods:{
		goBack(){
			this.$router.go(-1);
		}
	}
}
export default vueObj;
</script>
<style lang="less">
.page404{
	width: 100%;
	min-width: 1024px;
	box-sizing:border-box;
}	
.bg404{
	background:rgb(244,244,244);
	.box{
		background: #FFF;
		position: relative;
		box-sizing: border-box;
		padding-top: 15vh;
	}
	.cont{
		width: 850px;
		margin: 0 auto;
		position: relative;
	}
	.img{
		width: 526px;
		height: 280px;
		background: url("../../assets\img\404\404_1.png") no-repeat;
		background-position:0 0; 
		background-size: 100% auto;

	}
	.r{
		width: 340px;
		position: absolute;
		top:0px;
		left: 550px;
	}
	.title{
		width:273px;
		height:100px;
		font-size:120px;
		line-height: 100px;
		font-family:MicrosoftYaHeiLight;
		font-weight:300;
		color:rgba(51,51,51,1);
	}
	.msg{
		width:299px;
		margin-top:30px;
		height:31px;
		font-size:28px;
		font-family:MicrosoftYaHei;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height:36px;
	}
	.btn_refresh{
		margin-top: 40px;
		width:120px;
		height:32px;
	}
}
</style>