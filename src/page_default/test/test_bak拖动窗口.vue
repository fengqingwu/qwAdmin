<template>
<div class="qwTest">
    <el-button @click="showLayWin">测试图层展示</el-button>    
    <!-- 各种弹框_图层 -->
    <qwDragWin v-if="layWinShow" style="right:0;top:0;" title="图层" modX="R" modY="T" @close="closeLayWin">
        <div style="layerContent">
            <div class="layerItem" :class="layers.activeIndex== (layers.items.length-i)? 'active':''" @click="layerItemClicked(layers.items[layers.items.length-i],layers.items.length-i)" v-for="i in layers.items.length" :key="i">
                <span class="img">                    
                </span>
                <div class="r">
                    <h3 class="lay_title">{{layers.items[layers.items.length-i].title}}</h3>
                </div>
            </div>
            <p class="tools">
                <el-button type="text" size="mini"><i class="el-icon-plus" @click="addLayer" title="添加新图层"></i></el-button>
                <i class="el-icon-minus" @click="removeLayer" title="删除当前图层"></i>
                <i class="el-icon-edit" title="编辑当前图层"></i>
            </p>
        </div>
    </qwDragWin>
</div>    
</template>
<script>
import qwDragWin from "./qwDragWin.vue"
export default {
    components:{
        qwDragWin
    },
    data(){
        return {
            layWinShow: true,
            layers:{
                activeIndex: 0,
                items:[
                    {
                        title: "图层1"
                    },
                    {
                        title: "图层2"
                    },
                ]
            }
        }
    },
    methods:{
        layerItemClicked(item,i){
            this.layers.activeIndex = i;
        },
        addLayer(){
            let temp = { title: '图层' + parseInt(Math.random()*1000) }
            this.layers.items.push(temp);
            setTimeout(() => {
                this.$set(this.layers,"activeIndex", this.layers.items.length-1);
            }, 100);
            
        },
        closeLayWin(){
            this.layWinShow = false;
        },
        showLayWin(){
            this.layWinShow = true;
        },
        removeLayer(){
            if(this.layers.items.length==1){
                this.$message.error("请至少保留1层图层！");
                return;
            }
            this.layers.items.splice(this.layers.activeIndex,1);
            setTimeout(() => {
                this.layers.activeIndex = this.layers.items.length-1;
            }, 100);
        }
    }
}
</script>
<style lang="less">
.qwTest{
    position: relative;
    background: #FFF;
    .layerItem{
        width: 100%;
        box-sizing: border-box;
        height: 58px;
        padding:4px;
        position: relative;
        .img{
            display: inline-block;
            width: 50px;
            height: 50px;
            background: #EEE;
        }
        .r{
            display: inline-block;
            padding-left: 0;
            position: absolute;
            left: 60px;
            width: 200px;
            top: 6px;
           
        }
        .lay_title{
                font-size: 12px;
                line-height: 50px;
                height: 50px;
                white-space: nowrap;
                font-weight: 200px;
                color: #333;
        }
    }
    .layerItem.active{
        background: #4099EF;
        .r .lay_title{
            color: #FFF;
        }
    }
    .layerItem + .layerItem{
        margin-top: 4px;
    }
    .tools{
        padding-top: 4px;
        padding-left: 50px;
        i{
            cursor: pointer;
            display: inline-block;
            font-size: 18px;
            font-weight: 400;
            color: #333;
            width: 24px;
            height: 24px;
            line-height: 30px;
            text-align: center;
        }
    }
}
</style>
