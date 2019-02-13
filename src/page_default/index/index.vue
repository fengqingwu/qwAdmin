<template>
    <div class="app-view">
        <!-- loading state displayer -->
        <div v-show="loadingTag>0" class="qwLoadingMask">
            <div class="loader-inner line-scale-pulse-out-rapid">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div> 
        </div>
        <!-- header -->
        <qwHead></qwHead>  
        <div class="content">
            <!-- content left-->
            <div class="left" :style="{width:sideBarWidth+'px',height: sideBarHeight+'px',left: (isShowSidebar==true? 0 : -1* sideBarWidth +'px') }">
                <sideMenu></sideMenu>
            </div>
            <!-- page main -->
            <!-- :style="{height: (sideBarHeight-(40 + pagePad))+'px'}" -->
            <div class="main" :style="{height: sideBarHeight+'px',paddingLeft: (isShowSidebar? parseInt(sideBarWidth)+'px': '0')}">
                <!-- tab tags | top labels -->
                <tags @activeIndexChanged="tagsActiveIndexChanged" />
                <div class="pagebox" :style="{height: (sideBarHeight-40) + 'px',background:'rgb(240,242,245)',overflowY:'scroll',boxSizing:'border-box',paddingTop: pagePad + 'px',paddingLeft: pagePad +'px'}">
                    <transition name="fade-transverse">
                        <router-view :style="{minHeight: (sideBarHeight-40) + 'px'}"></router-view> 
                    </transition>  
                </div>
            </div>
        </div>    
    </div>
</template>
<script>
import {mapMutations,mapState} from 'vuex';
import qwHead from '../qwComponents/main/head.vue'
import tags from '../qwComponents/main/tags.vue'
import sideMenu from '../qwComponents/main/sideMenu.vue'
import { jsonParse } from '../../utils/json';
/**
 * debug id从-10000递减
 */
let id =-10000;
/**
 * debug测试用菜单
 **/ 
const debugMenu = [
    {
        id:id--,
        title:"系统设置",
        link:"/debug___sysSetting",
        childrens:[]
        
    },
    // {
    //     id:id--,
    //     title:"系统菜单",
    //     link:"/debug___menu",
    //     childrens:[]
    // },
    // {
    //     id:id--,
    //     title:"组件配置器",
    //     link:"/debug___buildComponents",
    //     childrens:[]
    // },
    {
        id:id--,
        title:"组件样例",
        link:"/debug___demos",
        childrens:[]
    },
    {
        id:id--,
        title:"测试页面",
        link:"/debug___test",
        childrens:[]
    },
    {
        id:id--,
        title:"ElementUI官方文档",
        link:"http://element-cn.eleme.io/#/zh-CN/component/installation",
        childrens:[]
    },
]
let that=null;
var vueObj= {
    name: 'app',
    components:{
        qwHead,
        tags,
        sideMenu
    },
    data () {
        return {
            transitionName:'slide-left',
            sideBarHeight: 500,
            sideBarWidth: 260,
            perMissionList:[]
        }
    },
    props:["appUrl","appMenu","logoutPage","appName", "userName", "userImg","companyName","companyEnglish","companyLogo","debug"],
    computed:{
        ...mapState({
            isShowSidebar: state => state.app.isShowSidebar,
            loadingTag: state => state.app.loadingTag,
            pagePad: state => state.skin.pagePad
        }),
    },
    watch: {
        '$route' (to, from) {
            let box=that.$refs['mainBox'];  
            if(box){
                box.setAttribute('class','mainBox ani0');
                setTimeout(()=>{
                    box.setAttribute('class','mainBox');
                },300)
            }
        }
    },
    mounted(){
        this.init();
        this.setSize();
        window.onresize=()=>{
            this.setSize();
        }
    },
    created(){
        that=this;
        this.debug= (this.debug=='true') || (this.debug==true);
        if(undefined== this.appMenu ||(null ==  this.appMenu) ||(""==this.appMenu)){
            this.appMenu ='[]';
            console.error("index.html中的appMenu菜单项为空！")
        }
        this.perMissionList = this.buildPerMissionList(this.appMenu);
    },
    methods:{
        ...mapMutations(["ADD_TAG","SET_DEBUG","SET_PERMISSION_LIST","SET_HOME_PAGE","SET_APP_NAME","SET_LOGOUT_PAGE","SET_USER_IMG", "SET_USER_NAME",'SET_COMPANY_NAME','SET_COMPANY_ENGLISH','SET_COMPANY_LOGO','setPorts','SET_IFRAMELINK','SET_SIDEBARHIEGHT','SET_SIDE_MENUS']),
        /**
         * @description 初始化框架配置
         */
        init(){
            window.localStorage.setItem('ports',this.appUrl);
            this.SET_DEBUG(this.debug)
            let appMenu = JSON.parse(this.appMenu);
            this.SET_PERMISSION_LIST(this.buildPerMissionList(appMenu));
            var mainNav = this.transMenuServerToApp(appMenu,0);            
            if(this.debug){
                mainNav = this.addDebugMenus(mainNav);
            }
            this.SET_SIDE_MENUS(mainNav)
            /*解决刷新路由问题*/
            let routeBak =  window.localStorage.getItem("QW_CUR_ROUTE");
            if(routeBak){
                routeBak = routeBak? jsonParse(routeBak):"";
                let routeBakLink = routeBak? routeBak.link:"";
                let debugStr = JSON.stringify(debugMenu);        
                if(routeBakLink && (this.appMenu.indexOf("\""+ routeBakLink.replace(/^\//,"") +"\"")>-1) || (this.appMenu.indexOf(routeBakLink)>-1||(debugStr.indexOf(routeBakLink)>-1))){
                    this.getFirst(mainNav[0], false, ()=>{
                        this.ADD_TAG(routeBak);
                        setTimeout(() => {
                            this.tagsActiveIndexChanged(routeBak);
                        }, 100);
                    })
                }else{
                    this.getFirst(mainNav[0],true);
                }
            }else{
                this.getFirst(mainNav[0],true);
            }
            this.SET_COMPANY_NAME(this.companyName);
            this.SET_APP_NAME(this.appName);
            this.SET_COMPANY_ENGLISH(this.companyEnglish);
            this.SET_USER_NAME(this.userName);
            this.SET_USER_IMG(this.userImg);
            this.SET_LOGOUT_PAGE(this.logoutPage);
            this.SET_COMPANY_LOGO(this.companyLogo)
        },
        /**
         * @description 将后台菜单转换为app菜单
         * @param { menu } 后台传入的菜单
         * @param { pid } 根节点id 
         */
        transMenuServerToApp(menu,pid){
            let menu_ =[];
            for(let item of menu){
                if(item.parentId==pid){
                    let menuItem = {
                        "id": item.id,
                        "title": item.alias,
                        "link": (/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/.test(item.code))? item.code : '/' + item.code,
                        "childrens": []
                    }
                    menuItem.childrens = this.transMenuServerToApp(menu, item.id)
                    menu_.push(menuItem);
                }
            }
            return menu_
        },
        /**
         * @description 添加debug测试菜单
         * @param { menu_ } debug菜单 
         */
        addDebugMenus(menu_){   
            let debugMenu_= {
                id:-1,
                title:"框架Debug测试相关",
                link:"debug___tests",
                childrens:[]
            }        
            for(let item of  debugMenu){
                debugMenu_.childrens.push(item);
            }   
            menu_.unshift(debugMenu_)         
            // menu_[menu_.length] = debugMenu_; 
            return menu_;
        },
        /**
         * @description 构建全局权限数组
         * @param { menu } 菜单数组
         */
        buildPerMissionList(menu){
            let list =["404","iframeLink"];
            for(let item of menu){
                list.push(item.code);
            }
            if(this.debug){
                for(let item of debugMenu){
                    if(!(/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/.test(item.link))){
                        list.push(item.link.replace(/^\//,"")) 
                    }
                }
            }    
            return list;
        },
        /**
         * @description 激活顶部某个标签
         * @param { tag } 菜单或标签数据
         */
        tagsActiveIndexChanged(tag){
            if(/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/.test(tag.link)){
                this.SET_IFRAMELINK(tag.link);
                this.$router.push({path:'/iframeLink',params:{urlLink:tag.link}})
            }else{
                this.$router.push({path:tag.link});
            }
        },
        /**
         * @description 递归找到首页面,如果没有缓存之前缓存的页面链接或者缓存的链接无权限 则默认激活缓存的路由。反之激活首页 
         * @param { menu } 系统菜单数据
         * @param { setFirstActive } 是否激活默认页
         * @param { cb } 如果不激活默认页则调用此回调函数
         */
        getFirst(menu,setFirstActive,cb=()=>{}){
            if(!menu)return;
            if(!menu.childrens||(menu.childrens.length<1)){
                setTimeout(() => {
                    this.ADD_TAG(menu);
                    this.SET_HOME_PAGE(menu);
                    if(setFirstActive){
                        this.tagsActiveIndexChanged(menu);
                    } else {
                        if("function" == typeof(cb)){
                            cb();
                        }
                    }     
                }, 50);
            }else{
                this.getFirst(menu.childrens[0],setFirstActive,cb)
            }
        },
        /**
         * @description 设置侧边栏高度
         */
        setSize(){
            this.sideBarHeight=this.getClientHeight()-85;
            this.SET_SIDEBARHIEGHT(this.sideBarHeight);
        },
        /**
         * @description 获取窗口高度
         */
        getClientHeight(){
            var clientHeight=0;
            if(document.body.clientHeight&&document.documentElement.clientHeight)
            {
                clientHeight = (document.body.clientHeight<document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
            } else {
                clientHeight = (document.body.clientHeight>document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
            }
            return clientHeight;
        }
    }
}
export default vueObj;
</script>
<style lang="less">
//基础样式
@import "../../assets/style/reset.less";
.app-view{
  width:100%;
  height:auto;
  min-height:600px;
  box-sizing:border-box;
  .content{
      position:relative;
      .left{
          width:260px;
          min-height:500px;
          background:#00142a;
          border-right:1px solid #EEE;
          position:absolute;
          left:0;
          top:0px;
          transition:all 0.2s;
      }
      .main{
         transition:all 0.2s;
         width:100%;
         padding-right:0;
         background:#FFF;
         box-sizing:border-box;
         overflow:hidden;
      }
      .fade-transverse-leave-active,
      .fade-transverse-enter-active {
          transition: all .5s;
      }

      .fade-transverse-enter {
          opacity: 0;
          transform: translateX(-30px);
      }

      .fade-transverse-leave-to {
          opacity: 0;
          transform: translateX(30px);
      }
  }
  .qwLoadingMask{
    width: 100%;
    height: 100vh;
    background: rgba(0,0,0,0.1);
    position: absolute;
    left: 0;
    top:0;
    z-index: 100000;
     .line-scale-pulse-out-rapid {
        width: 60px;
        margin:0 auto;
        margin-top: 35vh;
     }
    .line-scale-pulse-out-rapid > div:nth-child(1), .line-scale-pulse-out-rapid > div:nth-child(5) {
        -webkit-animation-delay: 0.5s !important;
        animation-delay: 0.5s !important;
    }
    .line-scale-pulse-out-rapid > div:nth-child(2), .line-scale-pulse-out-rapid > div:nth-child(4) {
        -webkit-animation-delay: 0.25s !important;
        animation-delay: 0.25s !important;
    }
    .line-scale-pulse-out-rapid > div {
        background-color: #409EFF;
        width: 4px;
        height: 35px;
        border-radius: 2px;
        margin: 2px;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        display: inline-block;
        -webkit-animation: line-scale-pulse-out-rapid 0.9s 0s infinite cubic-bezier(.11, .49, .38, .78);
        animation: line-scale-pulse-out-rapid 0.9s 0s infinite cubic-bezier(.11, .49, .38, .78);
    }

  }
}
@keyframes line-scale-pulse-out-rapid {
    0% {
        -webkit-transform: scaley(1);
        transform: scaley(1);
    }

    80% {
        -webkit-transform: scaley(0.3);
        transform: scaley(0.3);
    }
    90% {
        -webkit-transform: scaley(1);
        transform: scaley(1);
    }
}
</style>
