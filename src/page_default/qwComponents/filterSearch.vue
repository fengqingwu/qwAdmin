<template>
    <div class="search-list">
        <!-- 123123123 -->
        <div class="list-item" v-for="(item,i) in data" :style="{'border-bottom':i==data.length-1?'1px solid #E8E8E8':'none','height':currentHeight[i]}">
            <div class="item-label" :style="{'width':width+'px'}">{{item.title}}</div>
            <div class="item-data">
                <slot :row="item">
                    <span class="option" v-for="(option,index) in item.options" @click="handlerClick(option,index,i)" :class="{'select':select.indexOf(option)>=0}">{{option.name}}</span>
                </slot>
            </div>
            <div class="item-operate" @click="current(i)">
                {{currentHeight[i]=='auto'?'收起':'展开'}}
            </div>
        </div>
      <div style="margin:10px 0">
        <p>已选条件: <span style="margin: 0 5px"></span> <span style="color: #FF7742" v-for="(item,index) in select">{{item.name}}<span style="margin: 0 5px" v-show="index != select.length - 1">/</span></span></p>
      </div>
    </div>
</template>
<script>
export default {
  props:['filterData'],
  data: function () {
    return {
      currentHeight: ['40px'],
      width: 120,
      data: [
        // {
        //   title: '设备大类',
        //   options: [
        //     {
        //       name: '整经机',
        //       value: '3'
        //     },
        //     {
        //       name: '经编机',
        //       value: '4'
        //     }
        //   ]
        // }
      ],
      select: []
    }
  },
  methods: {
    handlerClick (option,index,i) {
      if(i == this.select.length - 1){
        this.currentHeight.push('40px')
      }
      if(option.name != (this.select[i] == undefined ? '' : this.select[i].name)){
        this.select.splice(i, 1,option)
        this.select.splice(i+1,this.select.length-1-i)
        this.filterData.splice(i+1,this.filterData.length-1-i)
        this.$emit('handlerClick', this.select,option,i)
      }

    },
    current(i){
      this.currentHeight[i]=='40px'? this.$set(this.currentHeight,i,'auto'):this.$set(this.currentHeight,i,'40px')
    }
  },
  mounted(){
    this.data = this.filterData
  }
}
</script>
<style lang="less" scoped>
    .search-list{
        background: #fff;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
        .list-item{
            min-height: 40px;
            line-height: 40px;
            display: flex;
            border: 1px solid #E8E8E8;
            .item-label{
                font-size:14px;
                font-family:PingFang-SC-Medium;
                color:rgba(163,163,163,1);
                padding-left: 20px;
                border-right:  1px solid #E8E8E8;
            }
            .item-data{
                height: 100%;
                overflow: hidden;
                flex: 1;
                >span{
                    margin: 0 20px;
                    font-size:14px;
                    display: inline-block;
                    font-family:PingFang-SC-Medium;
                    color:#565656;
                    cursor: pointer;
                    &.select{
                        color: #0C68F1;
                    }
                }
            }
            .item-operate{
                width: 120px;
                height: 40px;
                text-align: center;
                background-color: #F7F7F7;
            }
        }
    }
</style>
