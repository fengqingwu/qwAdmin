<template>
<div class="contexMask" v-show="contextMenuShow&&contextMenuDataEvent" @click="SET_SHOW_CONTEXTMENU(false)">    
    <div class="qwMenu" :style="{left:(!contextMenuDataEvent? 0: contextMenuDataEvent.clientX)+'px',top:(!contextMenuDataEvent? 0: contextMenuDataEvent.clientY)+'px'}">
        <a href="javascript:void(0);" @click.stop="contextMenuClicked($event,menu,i)" v-for="(menu, i) in config.items" :key="i">{{menu.title}}</a>
    </div>    
</div>
</template>
<script>
import {mapMutations,mapGetters,mapState} from 'vuex';
let vueObj={
    props:{
        config:{
            type: Object,
            default(){
                return {                       
                    // show:false,
                    items:[
                        {id:0,title:"编辑",clicked:"openEdit"},
                        {id:1,title:"取消",clicked:"closeEdit"},
                        {id:2,title:"重置",clicked:"resetEdit"}
                    ]                       
                }
            }
       }
    },
    watch:{
        isShowSidebar(new_,old_){
            // console.log("contextMenuShow==>",new_,old_);
        },
        contextMenuDataEvent(new_,old_){
            // console.log("contextMenuDataEvent==>",new_,old_);
        },
    },
    mounted(){
        // console.log("vuecontextMenu==>",this);
    },
    computed:{
        ...mapState({
            isShowSidebar: state => state.skinConfig.isShowSidebar, 
            contextMenuShow: state=>state.skinConfig.contextMenuShow,
            contextMenuDataEvent: state=>state.skinConfig.contextMenuDataEvent,
            contextMenuDataTarget: state=>state.skinConfig.contextMenuDataTarget
        })
    },
    methods:{
       ...mapMutations(['SET_SHOW_EDITER','SET_SHOW_CONTEXTMENU']),
       contextMenuClicked(e,menu,i){
           if(menu.id==0){
               this.SET_SHOW_EDITER(true);
           }
           this.SET_SHOW_CONTEXTMENU(false);
       }
    }
}
export default vueObj;
</script>
<style lang="less">
.contexMask{
    position: fixed;
    z-index: 10000;
    left: 0;
    top:0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.3);
    .qwMenu{
        display: inline-block;
        min-width: 100px;
        max-width: 200px;
        height: auto;
        background: #FFF;
        box-sizing: border-box;
        position: absolute;
        left: 300px;
        top:200px;
        font-style: normal;
        a{
            text-decoration:none;
            color: #333;
            font-size: 12px;
            color:#666;
            box-sizing: border-box;
            padding: 0 10px;
            width: 100%;
            display: block;
            height: 32px;
            line-height: 32px;
        }
        a:hover{
            background: rgba(0,0,0,0.1);
        }
    }
}
</style>


