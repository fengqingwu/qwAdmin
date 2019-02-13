<template>
<div class="filterBlock">
    <div class="filterGroup" v-for="(item,i) in config" :key="i">
        <div class="l" style="position:relative;">
            <el-badge :value="getCount(item)" class="item">
                <h3 class="fTitle">{{item.title}}</h3>
            </el-badge>
            <!-- <span style="position: absolute;z-index:1;left:70px;top:0;">({{getCount(item)}})</span> -->
        </div>
        <div class="r">
            <div class="qwBtns" style="min-height:56px;" :style="(item.show?'height:auto':'height:56px;overflow: hidden;')">
                    <template v-if="item.items.length>0 && (getCount(item)>0)">
                        <!--   (item.filterMod=='all')||(item.filterMod=='on'&&(item2.isAble==true))||(item.filterMod=='off'&&(item2.isAble==false)) -->
                        <span v-for="(item2,j) in item.items" :key="j" v-show="'function'==(typeof(item.itemShowFunc))? item.itemShowFunc(item2,item.filterMod) : true">
                            <el-button :class="item2.disabled?'is-disabled':''"                                
                                v-if="item.activeIndex==j"
                                type="primary"
                                @click="changFilterActiveIndex(i,j)">{{item2.label}}</el-button>
                            <el-button :class="item2.disabled?'is-disabled':''"
                            v-else
                            :plain="true"
                            @click="changFilterActiveIndex(i,j)">{{item2.label}} <el-tooltip content="删除" placement="top" v-if="item.showClose"><i @click.stop="itemBtnCloseClicked(i,j,item2)" class="el-icon-circle-close close_btn_"></i></el-tooltip></el-button>
                        </span>
                    </template>   
                <template v-else>
                    <span class="nodata">暂无数据</span>
                </template>
            </div>
            <el-button  class="showOrHide" type="text" @click="item.show=!item.show" >{{item.show?'收起':'展开'}} <i :class="item.show? 'el-icon-arrow-up' :'el-icon-arrow-down'"></i></el-button>
        </div>
    </div>
</div> 
</template>
<script>
export default {
    props:{
        config:{
            type:[Object,Array],
            default:()=>{
                return [
                        {
                            title:"数据模型",
                            activeIndex:0,
                            filterMod:"all",
                            show:false,
                            items:[
                                // {
                                //     label:"年度运营数据",
                                //     disabled:true,
                                // },                        
                                // {
                                //     label:"年度运营数据",
                                //     disabled:false,
                                // },      
                                // {
                                //     label:"年度运营数据",
                                //     disabled:false,
                                // },      
                                // {
                                //     label:"年度运营数据",
                                //     disabled:false,
                                // },      
                                // {
                                //     label:"年度运营数据",
                                //     disabled:false,
                                // },      
                                // {
                                //     label:"年度运营数据",
                                //     disabled:false,
                                // },      
                                // {
                                //     label:"年度运营数据",
                                //     disabled:false,
                                // },      
                                // {
                                //     label:"年度运营数据",
                                //     disabled:false,
                                // },
                            ]
                        },
                        {
                            title:"版本号",
                            activeIndex:0,
                            filterMod:"all",
                            show:false,
                            items:[
                                {
                                    label:"V1.0",
                                    disabled:true,
                                },                        
                                {
                                    label:"V2.0",
                                    disabled:false,
                                },      
                                {
                                    label:"V3.0",
                                    disabled:false,
                                },      
                                {
                                    label:"V4.0",
                                    disabled:false,
                                }
                            ]
                        },
                        {
                            title:"授权策略",
                            activeIndex:0,
                            filterMod:"all",
                            show:false,
                            items:[
                                {
                                    label:"策略1.0",
                                    disabled:true,
                                },                        
                                {
                                    label:"策略2.0",
                                    disabled:false,
                                }
                            ]
                        }
                    ]
            }
        }
    },
    methods:{
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
<style>
.close_btn_{
    color:rgb(235,57,65);
}
.item .el-badge__content.is-fixed{
    top:10px;
    right: 14px;
}
</style>


