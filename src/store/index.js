import Vue from 'vue'
import Vuex from 'Vuex'
import app from './modules/app.js'
import skin from './modules/skin.js'
import skinConfig from "./modules/skinConfig.js";
import setting from "./modules/setting.js"

Vue.use(Vuex);
// const store={
//     isLoading:false,//控制全局loading显示
//     userName:'',
//     userImg:'',
//     companyName:'',
//     companyEnglish:'',
//     companyLogo:'',
//     isShowSidebar:true,
// }

export default new Vuex.Store({
    modules: {
        app:app,
        skin:skin,
        skinConfig:skinConfig,
        setting: setting
    }
})