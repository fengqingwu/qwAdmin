<template>
<div class="qwGrid" :class="debug? 'isQwDebug ':''">
    <qwDebuger type="components" :targetCom="getCurComp()"  v-if="debug && showDebug"/>
    <div class="row" v-for="row in rows" :key="row">
        <template v-for="col in columns">
         <slot :data="{row:row,col:col}">
             <!-- 动态组件 -->
            <components
                class="col" v-if="childrenData['c_'+ row +'_' + col] && childrenData['c_'+ row +'_' + col].type=='components'" 
                :key="col"
                :is="childrenData['c_'+ row +'_' + col].is"
                v-bind="childrenData['c_'+ row +'_' + col]">
            </components>
            <!-- 指定的dom元素 -->
            <div      
                v-else-if="childrenData['c_'+ row +'_' + col] &&  childrenData['c_'+ row +'_' + col].type=='dom'"
                class="col"
                :key="col" 
                :id="childrenData['c_'+ row +'_' + col].id" 
                :class="childrenData['c_'+ row +'_' + col].class" 
                :style="childrenData['c_'+ row +'_' + col].style"
                v-html="childrenData['c_'+ row +'_' + col].html? childrenData['c_'+ row +'_' + col].html:'dom'"></div>
            <span :key="col" class="col" v-else>row_{{row}}col_{{col}}：未配置</span>
        </slot>
        </template>
    </div>
</div>
</template>
<script>
/*
    单层布局骨架组件初探
    需求：
        1.规定行列自动布局
        2.每个节点可自行规定样式可以自己嵌套
 */
import {
    stopEvent
} from "../../utils/fqw.js"
import qwDebuger from "./qwDebuger.vue"
export default {
    name: "qwGrid",
    components:{
        qwDebuger
    },
    props:{
        debug:{
            type: Boolean,
            default(){
                return  false
            },
        },
        rows:{
            type: Number,
            default(){
                return 1;
            }
        },
        columns:{
            type: Number,
            default(){
                return  1;
            }
        },
        childrenData:{
            type: Object,
            default(){
                return  {}
            },
        }
    },
    data(){
        return {
            showDebug: false,
            data:[],
        }
    },
    created(){
        if(this.rows<1){
            this.rows=1;
        }
        if(this.columns<1){
            this.columns = 1;
        }
    },
    mounted(){
        this.$el.onmouseenter= (e)=>{
            this.showDebug = true;
            stopEvent(e)
        }
        this.$el.onmouseleave =(e)=>{
            this.showDebug = false;
            stopEvent(e);
        }
    },
    methods:{
        setAttr(attr,data){
            console.log("setAttr==>",attr,data)
            this[attr] =  data;
        },
        getCurComp(){
            return this;
        },
        getName(){
            return "布局组件"
        }
    },
    destroyed(){
        this.$el.onmouseenter = null;
        this.$el.onmouseleave = null;
    }
}
</script>
<style lang="less">
.qwGrid{
    box-sizing: border-box;
    // display: table;
    height: auto;
    width: 100%;
    .row{
        display: block;
        // display: table-row;
        width: 100%;
    }
    .row:after{
        clear:both;
    }
    .col{
        display: inline-block;
        position: relative;
        float: left;
        // display: table-cell;
    }
}
</style>

