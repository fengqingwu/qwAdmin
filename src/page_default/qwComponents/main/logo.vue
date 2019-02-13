<template>
<div class="qw_logobox" :style="'backgroundColor:' + logoBlockBg+';'+ logoBlockStyle">
	<div class="l"> 
		<img :src="companyLogo" alt="logo" class="logo_icon">
	</div>
	<div class="r">
		<h1 class="app_name">{{appName}}</h1>
		<p class="cp_name"> {{companyName}} </p>
	</div>
	<!-- <h1 style="line-height:60px;background:#FFF;color:#06F;padding-left:10px;">QWADMIN</h1> -->
</div>	
</template>
<script>
import {mapState} from 'vuex'
let qwLogo={
	computed:{
		...mapState({
			companyName: state => state.app.companyName,
			appName: state => state.app.appName,
			companyLogo: state => state.app.companyLogo,
			logoBlockBg: state => state.skin.logoBlockBg,
			logoBlockStyle: state => state.skin.logoBlockStyle
		})
	}
}
export default qwLogo;	
</script>
<style lang="less">
.qw_logobox{
	width:260px;
	height:80px;
	background:rgba(240,242,245,1);
	.l{
		box-sizing: border-box;
		padding: 16px 10px 0 20px; 
		float: left;
		.logo_icon{
			display: inline-block;
			width: 44px;
			height: 44px;
			box-shadow: 0 0 6px rgba(0,0,0,0.2);
		}

	}
	.r{
		width: 100%;
		height: 80px;
		box-sizing: border-box;
		padding: 0 10px 0 74px;
		.app_name{
			font-size:20px;
			display: block;
			width: 100%;
			box-sizing: border-box;
			white-space: nowrap;
			overflow: hidden;
			line-height: 20px;
			padding: 17px 0 8px;
			font-family:MicrosoftYaHei-Bold;
			font-weight:bold;
			color:rgba(51,51,51,1);
		}
		.cp_name{
			white-space: nowrap;
			overflow: hidden;
			font-size: 14px;
			color: #999;
			text-align: left;
			display: block;
			height: 18px;
			line-height: 18px;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
}	
</style>