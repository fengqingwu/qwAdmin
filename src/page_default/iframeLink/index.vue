<template>
<div class="qw_root">
	<!-- onload="this.height=ifd.document.body.scrollHeight" -->
	<iframe class="mainIframe" :style="'height:' + (sidebarHeight-40) +'px' " name="ifd" frameborder="no" scrolling="yes" width="100%" height="100%" :src="iframeLink" ref="mainIframe"></iframe>	
</div>	
</template>
<script>
import {mapMutations,mapGetters,mapState} from 'vuex';
let vueObj={
	data(){
		return {
			urlLink:"",
		}
	},
	computed:{
		...mapState({
			iframeLink: state => state.app.iframeLink,
			sidebarHeight: state => state.app.sidebarHeight
		})
	},
	watch: {
		'iframeLink' (new_,old){
			window.localStorage.setItem('iframeLink',new_)
		}
	},
	created(){
		this.url = this.$route.params.urlLink;
	},
	mounted(){
		if(''==this.iframeLink){
			this.SET_IFRAMELINK(window.localStorage.getItem('iframeLink'))
		}
	},
	methods:{
		...mapMutations(['SET_IFRAMELINK']),
	}
}	
export default vueObj;
</script>
<style lang="less">
	.qw_root{
		box-sizing:border-box;
		width:100%;
		.iframeMain{
			width:100%;
			height:100%;
			border:none;
			display:block;
			box-sizing:border-box;
		}
	}
</style>