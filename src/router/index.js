import Vue from 'vue'
import Router from 'vue-router'
import defaultRouters  from "./default.js"
import debugRouters from "./debugRouter.js"
import router from './router.js';

/* 下面可以添加自定义页面 */

Vue.use(Router)
export default new Router({
	routes: [
		...defaultRouters,
		...debugRouters,
		...router

	]
})
