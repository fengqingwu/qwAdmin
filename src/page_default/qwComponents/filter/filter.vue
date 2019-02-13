<template>
<div class="qwFilter" v-if="config">
<div class="filterItem" v-for="(item,i) in config" :key="i" :style="!item.show? 'height:38px;' :'auto'">
    <span class="itemTitle"><el-badge :value="getCount(item)" class="item"> <h4 class="filter_title">{{item.title}}</h4></el-badge></span>
    <span class="itemList" v-if="item.items && (item.items.length>0)" >
        <span v-for="(item2,j) in item.items" :key="j" v-show="'function'==(typeof(item.itemShowFunc))? item.itemShowFunc(item2,item.filterMod) : true">
             <el-button :class="item2.disabled?'is-disabled':''"                                
                v-if="item.activeIndex==j"
                type="primary"
                :ref="'filterItem_'+ i + '_' + item2.id"
                @click="changFilterActiveIndex(i,j)">{{item2.label}}</el-button>
            <el-button :class="item2.disabled?'is-disabled':''"
            v-else
            :plain="true"
            :ref="'filterItem_'+ i + '_' + item2.id"
            @click="changFilterActiveIndex(i,j)">{{item2.label}} <el-tooltip content="删除" placement="top" v-if="item.showClose"><i @click.stop="itemBtnCloseClicked(i,j,item2)" class="el-icon-circle-close close_btn_"></i></el-tooltip></el-button>
        </span>
        <el-button  class="showOrHide" type="text" @click="item.show=!item.show" >{{item.show?'收起':'展开'}} <i :class="item.show? 'el-icon-arrow-up' :'el-icon-arrow-down'"></i></el-button>
    </span>
    <span v-else class="itemList" style="font-size:14px;color:#666;line-height:32px;padding-left:50px;">暂无数据</span>
</div>
</div>
</template>
<script>
export default {

 props:["config"],
 /*
 data(){
    return {
        config:[{
            title:"信息结构",
            activeIndex:0,
            filterMod:"all",
            show:false,
            items:[
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                },
                
                {
                    id:"abc",
                    label:"测试1",
                    value:"123313"
                }
            ]
        },
        {
            title:"信息结构",
            activeIndex:0,
            filterMod:"all",
            show:false,
            items:[]
        }
        
        ]
    } 
 }, */  
 methods:{
    doClick(i,j){
        let item = this.config[i].items[j];
        if(item){
            this.doClickByItemId(i,item.id);
        }
    },
    doClickByItemId(index,id){
        let btns =this.$refs["filterItem_"+ index +"_"+ id];
        if( btns &&btns[0]){
            btns[0]._events.click[0]();
        }
    },
    changFilterActiveIndex(i,j){
            if(this.config[i].items[j]){
                this.$set(this.config[i],"activeIndex",j);
            }
            this.$emit("changFilterActiveIndex",{i:i,j:j});
        },
        setFilterMod(mod,index){
            if(index>=0){
                if(this.config[index]){
                    this.$set(this.config[index],"filterMod", mod);
                    let count = this.getCount(this.config[index]);
                    if(count==0){
                        this.$emit("changFilterActiveIndex",{i:index,j:-1})
                    }else{
                         
                        for(let attr in  this.config[index].items){
                            let item  = this.config[index].items[attr];
                            if(('function'!= (typeof(this.config[index].itemShowFunc)))||('function'==(typeof(this.config[index].itemShowFunc)) && (this.config[index].itemShowFunc(item,this.config[index].filterMod)))){
                                  this.$emit("changFilterActiveIndex",{i:index,j:attr})
                                break;
                            } 
                        }
                    }
                    return;
                }
            }else{
                for(let attr in this.config){
                    this.$set(this.config[attr],"filterMod",mod);
                }  
            }           
        },
        getCount(item){
            let count =0;
            if('function'!=typeof(item.itemShowFunc)||(undefined==item.filterMod)||(''==item.filterMod)){
                count = item.items.length;
            }else{
                for(let it of item.items){
                    if(item.itemShowFunc(it,item.filterMod)){
                        count++;
                    }
                }
            }
            return count;
        },
        itemBtnCloseClicked(i,j,item2){
            this.$emit("itemBtnCloseClicked",{i:i,j:j,item:item2})
        },
 }
}
</script>
<style lang="less">
.qwFilter{
    background: #FFF;
    box-sizing: border-box;
    padding: 16px 0px 10px 20px;
    .filter_title{
        width: auto;
    }
    .filterItem{
        position: relative;
        min-height: 32px;
        overflow: hidden;
        .el-badge__content{
            top: 10px;
            left: auto;
            right: 0px;
        }
    }
    .itemTitle{
        display: inline-block;
        width: 100px;
        position: relative;
        float: left;
        line-height: 24px;
        height: 32px;
        white-space: nowrap;
        font-size: 16px;
    }
    .itemList{
        display: block;
        width: 100%;
        box-sizing: border-box;
        padding-left: 100px;
        padding-right: 100px;
        position: relative;
        margin-bottom:10px;
        .el-button{
            cursor: pointer!important;
            display: inline-block;
            min-width: 88px;
            margin: 0 0 10px 10px;
            padding: 0 8px;
            border-radius: 2px;
            line-height: 28px;
            height: 28px;

            text-align: center;
            span{
                display: inline-block;
                line-height: 26px;
                height: 26px;  
            }
        }
        .showOrHide{
            position: absolute;
            right: 10px;
            top: 0;
        }
    }
}
</style>
