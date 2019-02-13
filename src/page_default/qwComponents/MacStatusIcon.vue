//设备状态图标
<template>
<label><i class="icon" :class="status"></i>{{label}}</label>	
</template>
<script>
let MacStatusIcon={
	props:['status','label']
}
export default MacStatusIcon;
</script>
<style scoped>
	label{
		display: inline-block;
		position: relative;
		margin-left: 10px;
		padding-left: 20px;
	}
	.icon{
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