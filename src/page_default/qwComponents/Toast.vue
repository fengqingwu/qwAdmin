      /* toastData:{
import func from './vue-temp/vue-editor-bridge';
import { removeMatter } from '../api/MaterialStorehouse';
          title:'啦啦啦',//弹窗标题
          dialogVisible:true,//弹窗显示
          width:'600px',//弹窗宽
          btnData:[{
            name:'确定',//按钮名
            method:'dialogSuer',//回调函数
            bgColor:'dialog-bule'//按钮背景
          },{
            name:'确定并继续',
            method:'savaAgain',
            bgColor:'dialog-deep-blue'
          }]
      }*/
<template>
    <el-dialog class="poc-toast" :title="config.title"  :visible.sync="config.dialogVisible" :close-on-click-modal="false" :append-to-body="config.appendToBody" :width="config.width" @close="callBack({method:'handleClose'})">
        <!-- 内容   主题内容自定义部分-->
        <slot></slot>
        <!-- 按钮组 -->
        <div class="btn-group">
            <el-button class="dialog-white" :key="item.method" v-for="item in config.btnData"  :class="item.bgColor" @click="callBack(item)">{{item.name}}</el-button>
        </div>
        <!-- 遮盖 -->
        <div class="poc-toast-z" v-show="config.isShow"></div>
    </el-dialog>
</template>
<script>
export default {
  props: ["config"],
  methods: {
    callBack(item) {
      this.$emit(item.method);
    }
  }
};
</script>
<style lang="less">
// @headerbgImage: linear-gradient(to right, #4a8dd2, #2acaff);
// @headerbgColor:#4a8dd2;
@headerbgColor: rgba(39, 44, 52, 1);
.poc-toast {
  .el-dialog {
    border-radius: 5px;
    overflow: hidden;
  }
  .dialog-bule {
    background-color: white;
    color: white;
    padding: 9px 14px;
    color: #2A93FF;
    border: 1px solid #2A93FF;
  }
  .dialog-deep-blue {
    background-color: #2A93FF;
    color: white;
    padding: 10px 15px;
  }
  .dialog-white {
    padding: 10px 15px;
  }
  .el-dialog__header {
    background-color: @headerbgColor;
    // background-image: @headerbgImage;
    padding: 15px;

    .el-dialog__title {
      color: white;
    }
  }
  .el-dialog__body {
    padding: 25px 0  0;
  }
  .btn-group {
    text-align: right;
    background-color: #eef1f5;
    padding: 5px 10px;
    margin-top: 20px;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: white;
  }
  .poc-toast-z{
    position: absolute;
    top: 54px;
    bottom:45px;
    width: 100%;
    background-color: rgba(255, 255, 255, .2);
    z-index: 10000;
    cursor: no-drop;
  }
}
</style>
