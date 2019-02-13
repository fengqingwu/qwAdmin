<template>
<div class="qwDialog">
    <h1 class="title">{{title}}</h1>
</div>    
</template>
<script>
export default {
    props:{
        title: {
            type:String,
            default: "弹框标题"
        }
    }
}
</script>
<style lang="less">
.qwDialog{
    box-sizing: border-box;
    width: 800px;
    min-height: 400px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top:15vh;
    z-index: 100;
    background: #FFF;
    box-shadow: 0 0 10px rgba(0,0,0,0.3);
    .title{
        display: block;
        // width: 100%;
        line-height: 32px;
        padding: 0 20px;
        .btnClose{
            float:right;
            padding:10px 6px 0;
        }
    }
}
</style>
