<template>
<div class="qwToobar">
    <div class="qwRow" v-for="(item, i) in config" :key="i">
        <div class="LGroup"  v-if="item.LGroup" :style="item.LGroup.style">
            <el-button-group class="qwBtnGroup" v-if="item.LGroup.type=='buttonGroup'">
                <el-button size="mini" :disabled="item2.disabled" :type="item.LGroup.activeIndex== j?'primary':''" v-for="(item2,j) in item.LGroup.items" :key="j" @click="LGroupItemClicked(i,j)">{{item2.label}}</el-button>
            </el-button-group>
            <!-- 类型带扩展 -->
            <slot name="left"></slot>

        </div>
        <div class="RGroup" v-if="item.RGroup" :style="item.RGroup.style">
            <span class="btnbox" v-if="item.RGroup.type=='buttons'" v-for="(item2,j) in item.RGroup.items" :key="j">
                <el-button size="mini" :disabled="item2.disabled"  :type="item.RGroup.activeIndex== j?'primary':''"  @click="RGroupItemClicked(i,j)">{{item2.label}}</el-button>
            </span>
            <!-- 待扩展 -->
            <slot name="right"></slot>

        </div>
    </div>  
    <div class="clearFloat"></div> 
</div>
</template>
<script>
export default {
    props:["config"],
   /* data(){
        return {
            config:[
                {
                    LGroup:{
                        type:"buttonGroup",
                        activeIndex:0,//激活index
                        autoChangeIndex: true,//是否内部触发更改激活index
                        items:[
                            {
                                "label":"全部"
                            },
                            {
                                "label":"只显示启用"
                            },
                            {
                                "label":"只显示停用"
                            },
                        ]
                    },
                    RGroup:{
                        type:"buttons",
                        activeIndex:0,
                        autoChangeIndex: false,
                        items:[
                            {
                                "label":"新建结构"
                            },
                            
                            {
                                "label":"编辑"
                            },
                            {
                                "label":"删除"
                            },
                            {
                                "label":"启停"
                            }
                        ]
                    }
                }
            ]
        }
    },
    */
    methods:{
        LGroupItemClicked(i,j){
            let item = this.config[i].LGroup.items[j];
            if(this.config[i].LGroup.autoChangeIndex){
                this.config[i].LGroup.activeIndex = j;
            }
            this.$emit("itemClicked",{i:i,j:j,key:"LGroup",config: this.config});
        },
        
        RGroupItemClicked(i,j){
            let item = this.config[i].RGroup.items[j];
            if(this.config[i].RGroup.autoChangeIndex){
                this.config[i].RGroup.activeIndex = j;
            }
            this.$emit("itemClicked",{i:i,j:j,key:"RGroup",config: this.config});
        }
    }
}
</script>
<style lang="less">
.qwToobar{
        box-sizing: border-box;
        padding: 16px 20px;
        border-bottom: 1px solid #E5E5E5;
        .qwRow .btnbox{
            padding-right: -10px;
            .el-button{
                border-radius: 2px;
                margin-right: 10px;
            }
        }
        .qwRow +.qwRow{
            margin-top: 10px;
        }
        .LGroup{
            width: 50%;
            min-height: 30px;
            float: left;
        }
        .RGroup{
            text-align: right;
            box-sizing: border-box;
            width: 100%;
            min-height: 30px;
            padding-left: 50%;
        }
        .clearFloat{
            clear: both;
        }
        .qw_form_box .el-input__inner{
            height: 28px;
            line-height: 28px;
            border-radius: 2px;
            transform:  translateY(-3px);
        }
        .qw_form_box .el-input__icon{
            line-height: 28px;
            height: 28px;
            transform:  translateY(-3px);
        }
    }
</style>

