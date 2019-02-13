<template>
<div class="tags_root" ref='tags_root'>
	<ul ref="tags_box" class="list_box" :style="'width:'+ (170* tags.length+20)+'px'">
		<li v-for="(item,i) in tags" @click.stop="clickTag(i)" :class="tagsActiveIndex==i? 'active':''" :style="tagsActiveIndex==i? 'border: 1px solid ' + mainHColor+';color:' + mainHColor :''" :key="i"><i :class="i==0? 'qw_icon_home' : 'qw_icon_page'" :style="tagsActiveIndex==i? 'color:' + mainHColor :''"></i> {{item.title}} <span v-if="i>0" @click.stop="closeTag(i)" class="el-icon-error" :style="tagsActiveIndex==i? 'color:' + mainHColor :''"></span></li>
	</ul>
	<div class="qw_tool_box">
		<el-dropdown style="margin:6px 0 0 11px;"  @command="handleCommand">
		  <el-button size="mini" type="primary">
		    更多操作
		  </el-button>
		  <el-dropdown-menu slot="dropdown" style="width:110px;">
		    <el-dropdown-item command="a"><span>关闭其他</span></el-dropdown-item>
		    <el-dropdown-item command="b"><span>关闭全部</span></el-dropdown-item>
		  </el-dropdown-menu>
		</el-dropdown>
	</div>
</div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
let that=null;
var vueObj={
	data(){
		return {
			activeIndex:0,
			isDown:false,
			clientX:0,
			clientX2:0,
			left:0,
			L:0,
			tagsBox:null,
		}
	},
	created(){
		that=this;
	},
	computed:{
		...mapState({
			tags: state=> state.app.tags,
			tagsActiveIndex: state => state.app.tagsActiveIndex,
			sideNavHeight: state => state.skin.sideNavHeight,
			mainHColor: state => state.skin.mainHColor
		})
	},
	watch:{
		tagsActiveIndex: (new_,old_)=>{
            if(window.sessionStorage){//将当前路由存储到session 方便刷新后获取并设置
				window.localStorage.setItem("QW_CUR_ROUTE",JSON.stringify(that.tags[new_]));
				that.SET_CUR_ROUTE(that.tags[new_]);	
            }
			that.$emit('activeIndexChanged',that.tags[new_])
		},
	},
	mounted(){
		this.tagsBox=this.$refs['tags_box'];
		var div1=this.tagsBox;
		var that=this;
		div1.onmousedown = function(ev){
		　　　　var oevent = ev || event;
		　　　　var distanceX = oevent.clientX - div1.offsetLeft;
		// 　　　　var distanceY = oevent.clientY - div1.offsetTop;
		　　　　document.onmousemove = function(ev){
		　　　　　　var oevent = ev || event;
			if(oevent.clientX - distanceX>0){
					div1.style.left = 0;
				}else if(Math.abs(oevent.clientX - distanceX)+parseInt(that.$refs['tags_root'].offsetWidth)-106-parseInt(div1.offsetWidth)>0){
					div1.style.left = -1*(parseInt(div1.offsetWidth)-parseInt(that.$refs['tags_root'].offsetWidth)+106)
				} else {					
		　　　　　　     div1.style.left = oevent.clientX - distanceX + 'px';
				}
		// 　　　　　　div1.style.top = oevent.clientY - distanceY + 'px'; 
		　　　　};
		　　　　document.onmouseup = function(){
		　　　　　　document.onmousemove = null;
		　　　　　　document.onmouseup = null;
		　　　　};
		};
	},
	methods:{
		...mapMutations(['SET_TAGS','ADD_TAG','SET_TAG_ACTIVE_INDEX','REMOVE_TAG','SET_CUR_ROUTE']),
		handleCommand(cmd){
			switch (cmd) {
				case 'a':
					{
						this.closeOther();
					}
					break;					
				case 'b':
					{
						this.closeAll();
					}
					break;			
				default:
					break;
			}
		},
		clickTag(id){
			this.setActive(id);
		},
		setActive(id){
			this.SET_TAG_ACTIVE_INDEX(id);
			// this.SET_CUR_ROUTE(this.tags[id]);
		},
		closeTag(id){
			this.REMOVE_TAG(id);
			if(this.tagsActiveIndex==id){
				this.setActive(0);
			}else if(id< this.tagsActiveIndex){	
				setTimeout(() => {
					this.setActive(this.tagsActiveIndex-1);
				}, 30);	
			}
		},
		closeOther(){
			if(this.tagsActiveIndex==0){
				let tem= [this.tags[0]];
				this.SET_TAGS(tem);
			}else{
				let tem= [this.tags[0],this.tags[this.tagsActiveIndex]];
				this.SET_TAGS(tem);
				this.setActive(1)
			}
			this.$refs['tags_box'].style.left=0;
		},
		closeAll(){
			let tem= [this.tags[0]];
			this.SET_TAGS(tem);
			this.setActive(0);
			this.$refs['tags_box'].style.left=0;
		}
	}
}	
export default vueObj;
</script>
<style lang="less">
.tags_root{
	position:relative;
	overflow:hidden;
	width:100%;
	height:40px;
	box-sizing:border-box;
	border-bottom:1px solid #EEE;
	box-shadow:0px 3px 10px 3px rgba(0,0,0,.03);
	li{
		list-style:none;
		display:inline-block;
		box-sizing:border-box;
		border-radius:2px;
		padding: 0 30px;
		height:32px;
		line-height:32px;
		font-size:14px;
		color:#666;
		border:1px solid #EEE;
		cursor:pointer;
		transition: all 0.2s;
		width:160px;
		overflow:hidden;
		position:relative;
		i{
			position:absolute;
			left:8px;
			top:4px;
			font-size:22px;
		}
		span{
			position:absolute;
			right:0px;
			top:0px;
			padding:0 10px;
			line-height:32px;
			color:#999;
			font-size:10px;
		}	
		
		
	}
	li:hover span{
		color:#C00;
	}
	li:first-child i{
		left:10px;
		top:6px;
		font-size:18px;
	}
	li.active{
		border:1px solid #409eff;
		color:#409eff;
		i:before{
			color: inherit;
		}
		span{
			color:#409eFF;
		}
	}
	li + li{
		margin-left:10px;
	}
	.list_box{
		display:block;
		height:40px;
		position:absolute;
		left:0;
		top:0;
		width:auto;
		min-width:1024px;
		padding-left:20px;
		padding-top:4px;
		moz-user-select: -moz-none; 
		-moz-user-select: none; 
		-o-user-select:none; 
		-khtml-user-select:none; 
		-webkit-user-select:none; 
		-ms-user-select:none; 
		user-select:none;
	}
	.list_box:active{
		cursor:move;
	}
	.qw_tool_box{
		width:106px;
		height:40px;
		position:absolute;
		right:0;
		top:0;
		background:#FFF;
		box-shadow:-3px 0 16px 3px rgba(0,0,0,.1);
	}
	.qwTagMenus{
		display: block;
		width: 100%;
		line-height: 32px;
		height: 32px;
		background: #F00;
	} 
}	
</style>