//设备状态图例
<template>
<div class="statusBox">
	<MacStatusIcon status="run" label="运行中"></MacStatusIcon>
	<MacStatusIcon status="stop" label="停机中"></MacStatusIcon>
</div>     
</template>	
<script>
import MacStatusIcon from "./MacStatusIcon"
let qwMacStatus={
	components:{
		MacStatusIcon
	},
	data(){
		return {

		}
	}
}	
export default qwMacStatus;
</script>
<style scoped> 
	.statusBox{
		margin-top: 18px;
		font-size: 14px;
		color: #444;
		line-height: 14px;
	}
	.statusBox label{
		display: inline-block;
		position: relative;
		margin-left: 10px;
		padding-left: 20px;
	}
	.statusBox .icon{
		position: absolute;
		left:0;
		top:0;
		display: inline-block;
		width: 12px;
		border: 1px solid #FFF;
		height: 12px;
		border-radius: 50%;
		background: #CCC;
		margin-right: 6px;
		box-shadow: 3px 1px 2px #CCC;
	}
	.icon.run{
		background: rgb(0,204,51);
	}
	.icon.stop{
		background: rgb(255,204,51);
	}
</style>