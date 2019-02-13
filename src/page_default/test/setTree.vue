<template>
<ul class="qwTree">
    <li class="nodeBox" :class="item.isExpanded?'isExpanded':''" v-for="(item,i) in treeData " :key="i">
      <p class="nodeLabel"><span class="nodeIcon"><i @click="nodeIconClicked(item,i)" :class="item.loading?'el-icon-loading': (item.isExpanded?'el-icon-minus':'el-icon-plus')"></i></span>{{item.label}}</p>
      <qwTree v-if="item.childrenData && item.childrenData" :treeData="item.childrenData"></qwTree>
    </li>
  </ul>
</template>
<script>
export default {
    name:"qwTree",
    props:{
		treeData: Array
    },
    methods:{
        nodeIconClicked(item,i){
            item.isExpanded = !item.isExpanded;
        }
    }
}
</script>

<style lang="less">
.qwTree{
    box-sizing: border-box;
    ul{
        padding-left: 20px!important;
    }
    .nodeBox{
        display: block;
        height: 24px;
        overflow: hidden;
    }
    .nodeBox .nodeLabel{
        font-size: 14px;
        line-height: 24px;
    }
    .nodeBox.isExpanded{
        height: auto;
    }
}
</style>
