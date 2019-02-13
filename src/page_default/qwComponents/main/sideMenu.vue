<template>
<div class="menu_root" :style="'minHeight:'+ sidebarHeight+'px;'+ 'background-color:'+ sideNavBg +';' + sideBarBoxStyle" >
	<HappyScroll  color="rgba(0,0,0,0.5)" size="5" resize  :style="{minHeight: sidebarHeight+'px'}">
		<div class="menuContent" ref="qwMenuContent" :style="{minHeight: sidebarHeight+'px'}">
			<ul class="box" v-if="mainNav.length>0" :style="{lineHeight: sideNavHeight +'px'}">
				<li v-for="(menu,i) in mainNav" :class="{'father': (menu.childrens && menu.childrens.length>0),'opened':menu.opened}" :key="i" :style="(menu.height? 'height:'+menu.height+'px':'')">
					<a href="javascript:void(0);" 
						@click.stop="menuClicked(menu,mainNav,i)" class="link" 
						:class="(menu.link==$route.path)||($route.path==remoteRoutePath&&menu.link==iframeLink)? 'active' : ''"
						:style="(menu.link==$route.path)||($route.path==remoteRoutePath&&menu.link==iframeLink)? ('background:' + sideNavActiveBgColor) : '' + ';line-height:' + sideNavHeight + 'px;' +'color:' +sideNavColor+';'">
						<span>{{menu.title}}</span><i v-if="menu.childrens" :class="{'el-icon-arrow-right':(menu.childrens.length>0 && (!menu.opened)),'el-icon-arrow-up':(menu.childrens.length>0 && (menu.opened))}"></i></a>		
					<ul v-if="menu.childrens" class="box sub" >
						<li v-for="(menu_2,j) in menu.childrens" :key="j" :style="(menu_2.height? 'height:'+menu_2.height+'px':'')">
							<a href="javascript:void(0);" class="link"  
							@click.stop="menuClicked(menu_2,menu.childrens,j)" 
							:class="menu_2.link==$route.path||($route.path==remoteRoutePath && menu_2.link==iframeLink)?'active' : ''"  
							:style="menu_2.link==$route.path||($route.path==remoteRoutePath && menu_2.link==iframeLink) ? 'background:'+ sideNavActiveBgColor :'' + ';line-height:' + sideNavHeight + 'px;' +'color:' +sideNavColor+';'"><span>{{menu_2.title}}</span> <i v-if="menu_2.childrens" :class="{'el-icon-arrow-right':(menu_2.childrens.length>0 && (!menu_2.opened)),'el-icon-arrow-up':(menu_2.childrens.length>0 && (menu_2.opened))}"></i></a>
								<ul v-if="menu_2.childrens" class="box sub" >
									<li v-for="(menu_3,k) in menu_2.childrens"  :key="k">
										<a href="javascript:void(0);"  
										@click.stop="menuClicked(menu_3,menu_2.childrens,k)" class="link" 
										:class="menu_3.link==$route.path ||($route.path==remoteRoutePath&& menu_3.link==iframeLink)?'active' : ''" 
										:style="menu_3.link==$route.path ||($route.path==remoteRoutePath&& menu_3.link==iframeLink ? ('background:' + sideNavActiveBgColor) : '') + ';line-height:' + sideNavHeight + 'px;' +'color:' +sideNavColor+';'">
										<span>{{menu_3.title}}</span></a>
									</li>
								</ul>
						</li>
					</ul>
				</li>
			</ul>
		</div>		
	</HappyScroll>
</div>	
</template>
<script>
/**
 * 侧边栏组件
 * created by 谭成才 2018/10/30
 */
import { HappyScroll } from 'vue-happy-scroll'
import 'vue-happy-scroll/docs/happy-scroll.css'
import { mapMutations, mapState } from 'vuex'
let that_;
let menuObj = {
	components:{
		HappyScroll
	},
	data(){
		return {
			remoteRoutePath:"/iframeLink"
		}
	},
	computed:{
		...mapState({
			tags: state=> state.app.tags,
			sidebarHeight: state=> state.app.sidebarHeight,
		    tagsActiveIndex: state => state.app.tagsActiveIndex,
		    curRoute: state => state.app.curRoute,
		    iframeLink: state=> state.app.iframeLink,
			mainNav: state=> state.app.sideMenus,
			sideNavActiveBgColor: state => state.skin.sideNavActiveBgColor,
			sideNavHeight: state => state.skin.sideNavHeight,
			sideBarBoxStyle: state => state.skin.sideBarBoxStyle,
			sideNavBg: state => state.skin.sideNavBg,
			sideNavColor: state => state.skin.sideNavColor
		})
	},
	watch:{
		sidebarHeight(new_,old_){
			setTimeout(() => {
				this.$refs.qwMenuContent.parentNode.parentNode.style.height= new_+"px"
			}, 500);
		}
	},
	created(){
		this.initNav();
	},
	methods:{
		...mapMutations(['ADD_TAG','SET_SIDE_MENUS']),
		initNav(){
			for(let menu of this.mainNav){
				if(menu.childrens&&menu.childrens.length>0){
					menu.opened=false;
				}
			}
		},		
	    getHeight(menu){
	    	var h= this.sideNavHeight;
	    	if(!menu.childrens || !menu.opened) return h;
	    	for(let item of menu.childrens){
	    		h+=this.getHeight(item);
	    	}
	    	return h;
		},
		refreshHeight(){
			for(let attr in this.mainNav){
				this.$set(this.mainNav[attr],'height',this.getHeight(this.mainNav[attr]));
				if(this.curRoute && (this.curRoute.link == this.mainNav[attr]))this.$set(this.mainNav[attr],'active',true);
				if(this.mainNav[attr].childrens){
					for(let attr2 in this.mainNav[attr].childrens){
						this.mainNav[attr].childrens[attr2].height=this.getHeight(this.mainNav[attr].childrens[attr2]);						
					}
				}
			}
		},
		menuClicked(menu,parent,index){
			// console.log("curMenu========>",menu)
			if(!menu.childrens||menu.childrens.length==0){
				this.ADD_TAG(menu);
				return;
			}
			if(menu.childrens.length>0){
				if(undefined==menu.opened)menu.opened=false;
				for(let attr in parent){
					if(undefined==parent[attr].opend)parent[attr].opend=false;						
					if(parseInt(attr)==parseInt(index)){
						this.$set(parent[attr],'opened', !parent[attr].opened);
						this.refreshHeight();
					}else{
						this.$set(parent[attr],'opened', false);
						this.refreshHeight();
					}						
				}
			}
		},
	}
}	
export default menuObj;
</script>
<style lang="less">

.menu_root{
	overflow-x: hidden;
	ul,li,a,span,i{
		line-height: inherit;
	}
	.menuContent{
		width: 260px;
		min-height: 600px;
	}
	.box{
		list-style:none;
		width:100%;
		box-sizing:border-box;
		text-align:left;
		font-size:14px;
		color:rgba(255,255,255,0.8);
		li,ul li,ul li ul,ul li ul li{
			cursor:pointer;
			transform-origin:center 0;
			-o-transition:all 0.3s;
			-ms-transition:all 0.3s;
			-moz-transition:all 0.3s;
			-webkit-transition:all 0.3s;
			transition:all 0.3s;
		}
		li{
			box-sizing:border-box;
			height:auto;
			overflow:hidden;			
			position:relative;
			.link{
				box-sizing: border-box;
				position:relative;
				color:inherit;
				text-decoration:none;
				display:block;
				padding-left:42px;
				font-size: 15px;
				width:100%;				
				background: transparent;
			}
			.link.active{
				background:rgba(42,147,255,1);
				font-weight:200;
				color:#FFF;
			}
			// ul:before{
			// 	content:"";
			// 	display:block;
			// 	position:absolute;
			// 	left:12px;
			// 	width:1px;
			// 	height: calc(100% - 60px);
			// 	border-left:1px solid rgba(255,255,255,0.36);
			// }
			ul .link{
				padding-left:1em;
				background: rgba( 0, 12, 23, 0.3);
				padding-left:50px;
			}
			
			i{
				float:right;
				color:inherit;
				font-size:10px;
				margin-right:1.5em;
			}

		}
		.father{
			ul{
				height:0;
				overflow:hidden;
				// .link:before{
				// 	display:block;
				// 	content:"";
				// 	background: transparent;
				// 	position: absolute;
				// 	z-index:10;
				// 	top:10px;
				// 	left:12px;
				// 	content:"";
				// 	width:4px;
				// 	height:8px;
				// 	border:1px solid transparent;
				// 	border-bottom-color:  rgba(255,255,255,0.36);
				// }
				ul:before{
					left:36px;
				}
				ul .link{
					padding-left:60px;
				}
				ul .link:before{
					left:36px;
				}
				i{
					margin-right:2em;
				}
			}
		}

		.father.opened{
			ul{
				height:auto;
			}
		}
		.box.sub{
			li span{
				padding-left:1em;
			}
		}
		.link:hover{
				background:rgba(255,255,255,0.10);
				font-weight:200;
				color:#FFF;
		}
	}

}	
</style>