<template>
<div class="qw_app_root">
    <!-- 上下文菜单 -->
    <qwMenu></qwMenu>
    <!-- 组件配置 -->
    <!-- <qwEditer></qwEditer> -->
    <index :logoutPage="logoutPage" :appMenu="appMenu" :appUrl="appUrl" :appName="appName" :userName="userName" :userImg="userImg" :companyName="companyName" :companyEnglish="companyEnglish" :companyLogo="companyLogo" :debug="debug"></index>
</div>  
</template>
<script>
import {mapMutations,mapGetters,mapState} from 'vuex';
import index from "./page_default/index/index.vue"
import qwMenu from "./page_default/qwComponents/contextMenu/contextMenu.vue"
// import qwEditer from "./components/setting/editer.vue"
var vueObj={
    props:["appName","appId","appUrl","logoutPage","appMenu", "userName", "userImg","companyName","companyEnglish","companyLogo","debug", "appTimeout"],
    components:{
      index,
      qwMenu,
      // qwEditer
    },
    created(){
        // 将菜单缓存到window上面因为存到store上可能某些接口拦截不下来
        let appMenu = JSON.parse(this.appMenu);
        let temp = {};
        for(let item of appMenu){
            temp['/'+item.code] = item.buttonList;
        }
        window.qwMainNavPool = temp;
        window.localStorage.setItem('appId',this.appId);        
        window.localStorage.setItem('ports',this.appUrl);        
        window.localStorage.setItem('api_timeout',this.appTimeout);
    }
}
export default vueObj;
</script>
<style lang="less">
.qw_app_root{
    box-sizing: border-box;
    width: 100%;
    height: auto;
    .isQwDebug{
        position: relative;
    }
}
</style>

