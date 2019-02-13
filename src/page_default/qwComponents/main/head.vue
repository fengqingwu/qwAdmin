<template>
<div class="qw_head" :style="'background:' + topBlockBg + ';'+ topBoxStyle">
	<Logo></Logo>
	<div class="toggle_box" @click="toggleSidebar">
		<i class="qw_top_menu_icon" :class="isShowSidebar? '':'trans'"></i>
	</div>
	<ul class="topMenu">
		<li v-for="(menu,i) in topMenu" @click="activeMenuIndex=i" :key="i" :class="i==activeMenuIndex? 'active' : ''"> <i :class="menu.icon"></i>{{menu.title}}</li>
	</ul>
	<ul class="rightMenu">
		<!-- <el-color-picker class="mainColor" v-model="mainColor"></el-color-picker> -->
		<!-- <i class="qw_icon_lock"></i> -->
		<el-tooltip class="item" effect="dark" content="全屏展示" placement="bottom">
			<i class="qw_icon_fullScreen" style="font-size:20px;" v-show="!isFull" @click="fullScreen"></i>
		</el-tooltip>
		<el-tooltip class="item" effect="dark" content="取消全屏" placement="bottom">
			<i class="qw_icon_noFullScreen" style="font-size:24px;transform:translateY(2px);-o-transform:translateY(2px);-ms-transform:translateY(2px);-moz-transform:translateY(2px);-webkit-transform:translateY(2px);" v-show="isFull" @click="exitFull"></i>
		</el-tooltip>
		<el-tooltip class="item" effect="dark" content="用户头像" placement="bottom">
			<img class="user_head" :src="userImg?userImg: 'data:image/jpeg;base64,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'" >
		</el-tooltip>
		<el-dropdown @command="handleCommand">
		  <span class="el-dropdown-link user_name">
			{{userName}}<i class="el-icon-arrow-down el-icon--right" style="font-size:14px;width:18px;"></i>
		  </span>
		  <el-dropdown-menu slot="dropdown">
		    <el-dropdown-item v-if="homePage" command="a"><span>系统首页</span></el-dropdown-item>
		    <!-- <el-dropdown-item><span @click="addTag({id: 100, title:'用户信息', link:'/userInfo'})">用户信息</span></el-dropdown-item> -->
		    <el-dropdown-item command="b"><span>退出</span></el-dropdown-item>
		  </el-dropdown-menu>
		</el-dropdown>
	</ul>	
</div>	
</template>
<script>
import Logo from  "./logo.vue"
import {mapMutations,mapGetters,mapState} from 'vuex';
var qw_head={
	data(){
		return {
			isFull:false,
			mainColor:"#06F",
			activeMenuIndex:0,
			topMenu:[
				// {
				// 	title:'首页',
				// 	path:'/',
				// 	icon:'el-icon-menu'
				// },
				// {
				// 	title:'设置',
				// 	path:'/setting',
				// 	icon:'el-icon-setting'
				// },
				// {
				// 	title:'文档',
				// 	path:'/docs',
				// 	icon:'el-icon-document'
				// }
			]
		}
	},
	computed:{
		...mapState({
			isShowSidebar: state=> state.app.isShowSidebar,
			userName: state => state.app.userName,
			userImg: state => state.app.userImg,
			logoutPage: state => state.app.logoutPage,
			homePage: state => state.app.homePage,
			topBlockBg: state => state.skin.topBlockBg,
			topBoxStyle: state => state.skin.topBoxStyle
		})
	},
	components:{
		Logo
	},
	methods:{
		...mapMutations(['TOGGLE_SIDEBAR','ADD_TAG']),
		handleCommand(cmd){
			switch (cmd) {
				case 'a':
					{
						this.addTag(this.homePage);
					}
					break;
				case 'b':
					{
						this.logout();
					}
					break;
			
				default:
					break;
			}
		},
		addTag(link){
			this.ADD_TAG(link)
		},
		toggleSidebar(){
			this.TOGGLE_SIDEBAR();
		},
		fullScreen() {
		  var el = document.documentElement;
		  var rfs = el.requestFullScreen || el.webkitRequestFullScreen || 
		      el.mozRequestFullScreen || el.msRequestFullScreen;
		  if(typeof rfs != "undefined" && rfs) {
		    rfs.call(el);
		  } else if(typeof window.ActiveXObject != "undefined") {
		    //for IE，这里其实就是模拟了按下键盘的F11，使浏览器全屏
		    var wscript = new ActiveXObject("WScript.Shell");
		    if(wscript != null) {
		        wscript.SendKeys("{F11}");
		    }

		  }
		  this.isFull=true;
		},
		exitFull() {
		  // 判断各种浏览器，找到正确的方法
		  var exitMethod = document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.webkitExitFullscreen; 
		  if (exitMethod) {
		    exitMethod.call(document);
		  }
		  else if (typeof window.ActiveXObject !== "undefined") {//for Internet Explorer
		    var wscript = new ActiveXObject("WScript.Shell");
		    if (wscript !== null) {
		      wscript.SendKeys("{F11}");
		    }
		  }
		  this.isFull=false;
		},
		logout(){
			window.location.href= this.logoutPage;
		}
	}
}	
export default qw_head;
</script>
<style lang="less">
.qw_top_menu_icon{
	display: inline-block;
	width: 24px;
	height: 80px;
	background: url("../../../assets/img/icon_menu.png") no-repeat;
	background-position: center center;
	box-sizing: border-box;	
}
.qw_head{
	width:100%;
	min-width:1024px;
	max-width:1920px;
	background:#FFF;
	height:80px;
	box-sizing: border-box;
	border-bottom:1px solid #EEE;
	position:relative;
	.toggle_box{
		width:68px;
		height:80px;
		position:absolute;
		left: 260px;
		text-align:center;
		top:0;
		
		i{
			display:inline-block;
			-o-transform-origin:center;
			-ms-transform-origin:center;
			-moz-transform-origin:center;
			-webkit-transform-origin:center;
			transform-origin:center;
			transition:all 0.2s;
			font-size:22px;
			color:#888;
			line-height:80px;
			-o-transform:rotate(-180deg);
			-ms-transform:rotate(-180deg);
			-moz-transform:rotate(-180deg);
			-webkit-transform:rotate(-180deg);
			transform:rotate(-180deg);
		}
		.trans{
			-o-transform:rotate(0deg);
			-ms-transform:rotate(0deg);
			-moz-transform:rotate(0deg);
			-webkit-transform:rotate(0deg);
			transform:rotate(0deg);
		}
	}
	.logobox{
		width:260px;
		height:80px;
		box-sizing:border-box;
		border:1px solid #F00;
	}
	.rightMenu{
		display:block;
		position:absolute;
		right:0;
		top:0;
		padding-right:10px;
		i{
			line-height:80px;
			display:inline-block;
			width:32px;
			margin-left:4px;
			font-size:22px;
			text-align:center;
		}
		.el-color-picker__trigger{	
			width:32px;
			height:32px;
			transform:translateY(8px);
			margin-right:4px;

		}
		.user_head{
			display:inline-block;
			width:32px;
			height:32px;
			border-radius:50%;
			transform: translateY(-6px)
		}
		.user_name{
			cursor:pointer;
			display:inline-block;
			line-height:45px;
			height:45px;
			color:#666;
			transform:translateY(-4px);
			padding:0 0 0 10px;
		}
	}
	.topMenu{
		display:block;
		position:absolute;
		left:328px;
		top:0;
		list-style:none;
		text-decoration:none;
		color:#666;
		margin-top: 8px;
		li{
			list-style:none;
			position:relative;
			display:inline-block;
			padding:0 20px;
			box-sizing:border-box;
			line-height:60px;
			font-size:16px;
			text-align:center;
			cursor:pointer;
		}
		li.active{
			color:#409eff;
		}
		i{
			font-size:20px;
			padding:0 6px 0 0;
			-o-transform:translateY(2px);
			-ms-transform:translateY(2px);
			-moz-transform:translateY(2px);
			-webkit-transform:translateY(2px);
			transform:translateY(2px);
		}
		li:after{
			content:"";
			-o-transform-origin:center center;
			-ms-transform-origin:center center;
			-moz-transform-origin:center center;
			-webkit-transform-origin:center center;
			transform-origin:center center;
			-o-transform:scale(0);
			-ms-transform:scale(0);
			-moz-transform:scale(0);
			-webkit-transform:scale(0);
			transform:scale(0);
			-o-transition:all 0.4s;
			-ms-transition:all 0.4s;
			-moz-transition:all 0.4s;
			-webkit-transition:all 0.4s;
			transition:all 0.4s;
			position:absolute;
			left:0;
			bottom:2px;
			width:100%;
			height:2px;
			background:#409eff;
		}
		li.active:after{
			-o-transform:scale(1);
			-ms-transform:scale(1);
			-moz-transform:scale(1);
			-webkit-transform:scale(1);
			transform:scale(1);
		}
	}
}	
</style>