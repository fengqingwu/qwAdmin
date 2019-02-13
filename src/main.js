/**
 * 入口文件
 * date 2019/02/13
 * created by 谭成才 qq841196685 
 */
import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'
import Element from 'element-ui'
import router from './router/index.js'
import store from './store/index.js'

/**
 * @description 如需使用ueeditor或者 formWithUEditor 组件请放开ueditor配置
 */
import '../static/UE/ueditor.config.js'
import '../static/UE/ueditor.all.min.js'
import '../static/UE/lang/zh-cn/zh-cn.js'
import '../static/UE/ueditor.parse.min.js'

/**
 * @description ace 代码富文本编辑器 如需使用请安装ace-builds 并且开放以下配置 同时请放开 webpack.base.conf.js
 */
// import ace from 'ace-builds'
// Vue.use(ace)


import { install } from 'vuex';
Vue.config.productionTip = true
/**
 * @description 全局引入element-ui组件
 */
Vue.use(Element);
/**
 * @description 可以在此引入全局组件
 */

/**
 * 兼容IE请放开以下配置
 */
import 'babel-polyfill';
import 'url-search-params-polyfill';

/**
 * @description 路由拦截器 此处进行鉴权操作
 */
router.beforeEach((to, from, next) => {
    window.sessionStorage.setItem("curlink",to.path);
    if (to.path == "/404") {
        next();
        return;
    }
    if (store.state.app.perMissionList.length == 0) {
        next();
        return;
    } else if (store.state.app.perMissionList.indexOf(to.path.replace(/^\//, "")) < 0) {
        router.push({ path: "/404" });
        return;
    } else next();
});

/**
 * init root vue obj
 */
new Vue({
  el: '#qwApp',
  router,
  store,
  components: { App }
})