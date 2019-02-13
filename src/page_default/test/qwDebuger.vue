<template>
<div class="qwDebuger" @mouseenter="mouseEnter">
    <h1 class="tInfo">{{targetCom.getName()}},宽:{{size.w}}px;高:{{size.h}}px;
        <el-button size="mini" type="danger" @click="doConfig">配置</el-button>
    </h1>
</div>    
</template>
<script>
import modelConfig from "./config.js"
import { mapMutations } from "vuex";
export default {
    props:{
        type:{
            type: String,
            default(){
                return "";
            }
        },
        targetCom: {
            type: Object,
            default(){
                return "";
            }
        }
    },
    data(){
        return {
            size: {
                w:0,
                h:0
            },          
        }
    },
    methods:{
        ...mapMutations(["SET_SHOW_SETTING_DIALOG","SET_DIALOG_CONFIG","SET_CUR_COMP"]),
        mouseEnter(e){
            if(e.target){
                this.size.w = e.target.offsetWidth;
                this.size.h = e.target.offsetHeight;
            }
        },
        doConfig(){
            let config = modelConfig.qwGrid;
            this.SET_DIALOG_CONFIG(config);
            this.SET_CUR_COMP(this.targetCom);
            setTimeout(() => {
                this.SET_SHOW_SETTING_DIALOG(true);
            }, 10);
        }
    }
}
</script>
<style lang="less">
.qwDebuger{
    border: 1px solid #06F;
    background: rgba(0,100,255,0.3);
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
    .tInfo{
        position: absolute;
        left: 0;
        bottom: 100%;
        color: #FFF;
        background:rgba(0,100,255,0.6);
        display: inline-block;
        width: auto;
        max-width: 100%;
        line-height: 1.2;
        font-weight: 200;
        padding: 10px 4px;
        font-size: 12px;
    }
}
</style>

