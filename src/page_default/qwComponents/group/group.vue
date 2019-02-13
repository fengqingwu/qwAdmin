<template>
<div class="qwGroup" :style="config.boxStyle? config.boxStyle :'background:#FFF;'">
    <h1 class="title" :style="config.titleStyle? config.titleStyle : 'background:#FFF;'">{{config.title}}</h1>
    <slot>  内容区  </slot>
</div>    
</template>
<script>
export default {
    props:{
        config:{
            type: Object,
            default(){
                return {
                    title:"群组组件",
                    boxStyle:"",
                    titleStyle:"",
                }
            }
        }
    }
}
</script>
<style lang="less">
.qwGroup{
    margin-top: 16px;
    box-sizing: border-box;
    width: 100%;
    height: auto;
    border: 1px solid #E5E5E5;
    background: inherit;
    position: relative;
    padding:16px;
    .title{
        font-weight: 200;
        color: #333;
        font-size: 16px;
        line-height: 16px;
        display: inline-block;
        padding: 0 4px;
        position: absolute;
        top:-9px;
        left: 10px;
    }
}
</style>
