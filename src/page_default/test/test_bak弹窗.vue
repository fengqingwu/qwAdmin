<template>
<div class="qwTest">
    <h1>测试</h1>
    <div class="comBox">
        <tree :list="list"></tree>
    </div>    
    <div class="comBox2">
        <qwPage />
    </div>
    <!-- 弹框 -->
    <!-- <qwDragWin style="right:0;top:0;" modX="R" modY="T"></qwDragWin>
    <qwDragWin style="left:0;top:0;" modX="L" modY="T"></qwDragWin>
    <qwDragWin style="right:0;bottom:0;" modX="R" modY="B"></qwDragWin>
    <qwDragWin style="left:0;bottom:0;" modX="L" modY="B"></qwDragWin>
    <qwDragWin style="left:100px;top:100px;" modX="L" modY="T"></qwDragWin> -->
</div>    
</template>
<script>
import qwDragWin from "./qwDragWin.vue";
import tree from "./tree.vue"
import qwPage from "./qwPage.vue"
export default {
    components:{
        tree,
        qwPage,
        qwDragWin
    },
    data(){
        return {
             list: [
                {
                name: '黄焖鸡米饭111111111',
                cList: [
                    { name: '二级黄焖鸡' },
                    {
                    name: 'one chicken',
                    cList: [
                        { name: '三级黄焖鸡3333', cList: [{ name: '四级黄焖鸡' }] }
                    ]
                    }
                ]
                },
                { name: '2222222222' },
                {
                name: '黄焖鸡米饭33333333',
                cList: [{ name: '二级黄焖鸡' }, { name: 'one chicken' }]
                }
            ]
        }
    }
}
</script>
<style lang="less">

</style>
