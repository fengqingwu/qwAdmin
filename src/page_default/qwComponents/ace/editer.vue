<template>
<div class="qwEditer" v-show="showEditer" ref="editerBox">
<h1 class="qwEditTitle">组件配置<span class="qwCloseBtn" @click="closeEditer"><i class="el-icon-close"></i></span></h1>
 <el-tabs v-model="activeName" tabPosition="right" @tab-click="handleClick" style="height:100%;padding-top:46px;box-sizing:border-box;">
    <el-tab-pane label="表单模式" name="first">表单模式</el-tab-pane>
    <el-tab-pane label="代码模式" name="second">
     <div class="qwscroll">
        <div id="editerCode">
            {{editData}}    
        </div>
        <p class="qwCodeToolBox">
            <el-button size="mini" type="primary">校验</el-button>
            <el-button size="mini" type="primary" @click="saveConfig">保存</el-button>
        </p> 
       <!-- <el-input type="textarea" class="contextArea" v-model="editData" @input="textareaChange"> </el-input>  -->
     </div> 
    </el-tab-pane>
  </el-tabs>
</div>
</template>
<script>
import {mapMutations,mapGetters,mapState} from 'vuex';
let that=null;
let editer=null;
let vueObj={
    data(){
        return {
            editer:null,
            activeName:"first",
            editData:"",
        }
    },
    created(){
        that=this;
    },
    computed:{
        ...mapState({
            'showEditer': state=> state.skinConfig.showEditer,
            'contextMenuDataTarget': state=> state.skinConfig.contextMenuDataTarget
        }),
        curConfig(){
            if(!this.contextMenuDataTarget){
                this.editData="";
                editor.setValue(this.editData);
                return "";
            }else{
                this.editData=this.formatJson(this.contextMenuDataTarget.config);
                // console.log("setValue",this.editData)
                editor.setValue(this.editData);
                return this.editData;
            }
        }
    },
    watch:{
        'contextMenuDataTarget':(new_,old_)=>{
            if(new_){
                that.editData=that.formatJson(new_.config);
                // setTimeout(() => {
                //         that.
                // }, 30);
            }else{
                that.editData="";
            }
            // console.log("watch done!",new_)
        }
    },
    mounted(){
        editer = ace.edit('editerCode');
        editer.setTheme("ace/theme/monokai");
        editer.getSession().setMode("ace/mode/javascript");
        this.initDrag();
        // this.editor.session.setMode("ace/mode/javascript");
        // console.log(editer);
    },
    methods:{
         ...mapMutations(['SET_SHOW_EDITER']),
        closeEditer(){
            this.SET_SHOW_EDITER(false);
        },
        formatJson(msg){
            var rep = "~";
            var jsonStr = JSON.stringify(msg, function(key, val) {
                // console.log(val);
                if (typeof val === 'function') {
                    return (val + '');
                }
                return val;
            },rep);//JSON.stringify(msg, null, rep)
            var str = "";
            for (var i = 0; i < jsonStr.length; i++) {
                var text2 = jsonStr.charAt(i)
                if (i > 1) {
                    var text = jsonStr.charAt(i - 1)
                    if (rep != text && rep == text2) {
                        str += "\r\n"
                    }
                }
                str += text2;
            }
            jsonStr = "";
            for (var i = 0; i < str.length; i++) {
                var text = str.charAt(i);
                if (rep == text)
                    jsonStr += "        "
                else {
                    jsonStr += text;
                }
                if (i == str.length - 2)
                    jsonStr += "\r\n"
            }
            return jsonStr;
        },
        jsonParse(s){
           return JSON.parse(s,function(k,v){
            if(v.indexOf&&v.indexOf('function')>-1){
                return eval("(function(){return "+v+" })()")
            }
            return v;
            });
        },
        saveConfig(){
            var config=this.jsonParse(editer.getValue());
            this.contextMenuDataTarget.config=config;
            // console.log("editer.getValue",this.jsonParse(editer.getValue()));
        },
        textareaChange(e){            
            // console.log("textareachange===>",e);
        },
        handleClick(name){
            if(this.activeName=="second"){
                if(editer)editer.setValue(this.editData);
                // console.log("done!!",this.editData);
            }
        },
        initDrag(){
            console.log("this.$refs['editerBox']===>",this.$refs['editerBox']);
            var div1=this.$refs['editerBox'];
            div1.onmousedown = function(ev){
		　　　　var oevent = ev || event;
        　　　　var distanceX = oevent.clientX - div1.offsetLeft;
                // console.log(distanceX);
		// 　　　　var distanceY = oevent.clientY - div1.offsetTop;
		　　　　document.onmousemove = function(ev){
        　　　　　　 var oevent = ev || event;
                    // console.log(oevent.clientX - distanceX)
                //     if(oevent.clientX - distanceX>0){
                //         console.log(console.log(oevent.clientX))

                //         // div1.style.right = 0;
                //     }else if(Math.abs(oevent.clientX - distanceX)){
                //         console.log(oevent.clientX)
                //         // div1.style.right = -1*(parseInt(div1.offsetWidth)-parseInt(that.$refs['tags_root'].offsetWidth)+106)
                //     } else {					
                // // 　　     div1.style.right = oevent.clientX - distanceX + 'px';
                //     }
		// 　　　　　　div1.style.top = oevent.clientY - distanceY + 'px'; 
		　　　　};
		　　　　document.onmouseup = function(){
		　　　　　　document.onmousemove = null;
		　　　　　　document.onmouseup = null;
		　　　　};
		};
            // let that=this;
            // var addEvent=function(target, type, handler) {
            //     if (target.addEventListener) {
            //         target.addEventListener(type, handler, false);
            //     } else {
            //         target.attachEvent('on' + type, function (event) {
            //             return handler.call(target, event);
            //         });
            //     }
            // }
            // (function () {
            //     var x0, y0, x1, y1, EW, EH, isChanging;
            //     var ele = document.getElementById('editerBox');
            //     var mousedownHandler = function (e) {
            //         e = e || event;
            //         //获取元素距离定位父级的x轴及y轴距离
            //         x0 = ele.offsetLeft;
            //         y0 = ele.offsetTop;
            //         //获取此时鼠标距离视口左上角的x轴及y轴距离
            //         x1 = e.clientX;
            //         y1 = e.clientY;
            //         //获取此时元素的宽高
            //         EW = ele.offsetWidth;
            //         EH = ele.offsetHeight;
            //         //按下鼠标时，表示正在改变尺寸
            //         isChanging = true;
            //     }
            //     var mousemoveHandler = function (e) {
            //         e = e || event;
            //         //元素边界确定
            //         var L0 = ele.offsetLeft;
            //         var R0 = ele.offsetLeft + ele.offsetWidth;
            //         var T0 = ele.offsetTop;
            //         var B0 = ele.offsetTop + ele.offsetHeight;
            //         //范围边界确定
            //         var L = L0 + 10;
            //         var R = R0 - 10;
            //         var T = T0 + 10;
            //         var B = B0 - 10;
            //         //范围确定
            //         var areaL = e.clientX < L;
            //         var areaR = e.clientX > R;
            //         var areaT = e.clientY < T;
            //         var areaB = e.clientY > B;
            //         //左侧范围
            //         if (areaL) { ele.style.cursor = 'w-resize'; }
            //         //右侧范围
            //         if (areaR) { ele.style.cursor = 'e-resize'; }
            //         //上侧范围
            //         if (areaT) { ele.style.cursor = 'n-resize'; }
            //         //下侧范围
            //         if (areaB) { ele.style.cursor = 's-resize'; }
            //         //左上范围
            //         if (areaL && areaT) { ele.style.cursor = 'nw-resize'; }
            //         //右上范围
            //         if (areaR && areaT) { ele.style.cursor = 'ne-resize'; }
            //         //左下范围
            //         if (areaL && areaB) { ele.style.cursor = 'sw-resize'; }
            //         //右下范围
            //         if (areaR && areaB) { ele.style.cursor = 'se-resize'; }
            //         //中间范围    
            //         if (!areaL && !areaR && !areaT && !areaB) { ele.style.cursor = 'default'; }

            //         //获取此时鼠标距离视口左上角的x轴及y轴距离
            //         var x2 = e.clientX;
            //         var y2 = e.clientY;
            //         //如果改变元素尺寸功能开启
            //         if (isChanging) {
            //             //处于左侧范围
            //             if (areaL) {
            //                 var eleL = x0 + (x2 - x1) + 'px';
            //                 var eleW = EW + (x1 - x2) + 'px';
            //             }
            //             //处于右侧范围
            //             if (areaR) { var eleW = EW + (x2 - x1) + 'px'; }
            //             //处于上侧范围
            //             if (areaT) {
            //                 var eleT = y0 + (y2 - y1) + 'px';
            //                 var eleH = EH + (y1 - y2) + 'px';
            //             }
            //             //处于下侧范围
            //             if (areaB) { var eleH = EH + (y2 - y1) + 'px'; }
            //             //范围限定
            //             if (parseInt(eleW) < 60) { eleW = '60px'; }
            //             if (parseInt(eleH) < 60) { eleH = '60px'; }
            //             //赋值
            //             if (eleW != undefined) { ele.style.width = eleW; }
            //             if (eleH != undefined) { ele.style.height = eleH; }
            //             if (eleT != undefined) { ele.style.top = eleT; }
            //             if (eleL != undefined) { ele.style.left = eleL; }
            //         }
            //     }
            //     var mouseupHandler = function (e) {
            //         //鼠标抬起时，表示停止运动
            //         isChanging = false;
            //         if (ele.releaseCapture) {
            //             ele.releaseCapture();
            //         }
            //     }
            //     var preventDefaultHandler = function (e) {
            //         e = e || event;
            //         if (e.preventDefault) {
            //             e.preventDefault();
            //         } else {
            //             e.returnValue = false;
            //         }
            //         //IE8-浏览器阻止默认行为
            //         if (ele.setCapture) {
            //             ele.setCapture();
            //         }
            //     }
            //     addEvent(ele, 'mousedown', mousedownHandler);
            //     addEvent(ele, 'mousedown', preventDefaultHandler);
            //     addEvent(document, 'mousemove', mousemoveHandler);
            //     addEvent(document, 'mouseup', mouseupHandler);

            // })();
        }
    }
}
export default vueObj;
</script>
<style lang="less">
.qwEditer{
    width: 600px;
    height: 100vh;
    background: #FFF;
    border-left:1px solid #EEE;
    overflow-y: scroll;
    position: fixed;
    right: 0;
    top: 0;    
    box-sizing: border-box;
    z-index: 9999;
    .qwEditTitle{
        position: absolute;
        width: 100%;
        height: 45px;
        line-height: 45px;
        border-bottom: 1px solid #EEE;
        font-size: 16px;
        color: #333;
        font-weight: 200;
        padding: 0 10px;
        box-sizing: border-box;
    }
    .el-tabs__nav{
        margin-left: 0;
        margin-top: 0;
    }
    .el-tabs__nav-wrap.is-right::after{
        display: none;
    }
    .el-tabs--right .el-tabs__nav.is-right{
        margin-left: 0;
        margin-bottom: 0;
    }
    .el-tabs--right .el-tabs__header.is-right{
        margin-left: 0;
    }
    .contextArea.el-textarea ,
    .contextArea.el-textarea .el-textarea__inner{
        height: 100%;
    }
    .qwCodeToolBox{
        margin-top: 20px;
        text-align: right;
        padding-right: 10px;
    }
}
.qwscroll{
    width: 100%;
    height: 100vh;
    overflow-y: scroll;
    box-sizing: border-box;
    padding-bottom: 68px;
}
.qwscroll::-webkit-scrollbar {/*滚动条整体样式*/
    width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
}
.qwscroll::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
}
.qwscroll::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: rgba(0,0,0,0.1);
}
.qwCloseBtn{
    cursor: pointer;
    width: 30px;
    display: block;
    float: right;
    padding-right:10px; 
}
#editerCode{
    width: 100%;
    height: 80vh;
}
</style>


