
<template>
  <ul class="qwTree">
    <li v-for="(item,index) in list " :key="index">
      <p>{{item.name}}</p>
      <tree-menus :list="item.cList"></tree-menus>
    </li>
  </ul>
</template>
 <style>
   ul{
    padding-left: 20px!important;
   }
 </style>
<script>
	export default{
		name:'treeMenus',
		props:{
			list: Array
		}
    }
</script>
<style lang="less">

</style>
    