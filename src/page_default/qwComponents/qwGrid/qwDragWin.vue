<template>
<div class="qwDragWin" :style="'height:'+ (status=='min'? '32px;': 'auto;') + boxStyle + ';width:' + width + ';'">
    <div class="titleBox" :style="titleBoxStyle">
        <h1 ref="titleBox" class="title">{{title}}</h1>
        <div class="rToolBox">
            <i class="min" v-if="status!='min'" @click="changeStatus('min')"></i>
            <i class="maxMid" v-if="status!='mid'" @click="changeStatus('mid')"></i>
            <i class="close" @click="doClose"></i>
        </div>
    </div>   
    <div class="content">
        <slot></slot>       
    </div>
</div>    
</template>
<script>
export default {
    props:{
        modX:{
            type: String,
            default(){
                return "L"
            }
        },
        width: {
            type: String,
            default(){
                return "300px"
            }
        },
        modY:{
            type: String,
            default(){
                return "T"
            }
        },
        title:{
            type: String,
            default(){
                return "标题"
            }
        },
        boxStyle:{
            type: String,
            default(){
                return ""
            }
        },
        titleBoxStyle:{
            type: String,
            default(){
                return "background:#CCC;"
            }
        }
    },
    data(){
        return {
            left:0,
            top:0,
            right: 0,
            bottom:0,
            status: "mid",//mid|min |
        }
    },
    mounted(){
        let that = this;        
        let oBox = this.$refs.titleBox;
        let pos = {
            l: -1,
            t: -1,
            r: -1,
            b: -1
        }
        document.onmouseup = function () {
            document.onmousedown = null;
            document.onmousemove = null;
        };
        oBox.onmousedown = function (ev) {  
            if(ev.target!=oBox){
                return;
            }
            let root = that.$el;
            let pos = {
                l: root.style.left? parseInt(root.style.left): -1,
                t: root.style.top? parseInt(root.style.top): -1,
                r: root.style.right? parseInt(root.style.right): -1,
                b: root.style.bottom? parseInt(root.style.bottom): -1 
            }
            var iEvent = ev || event;
            var dx = iEvent.clientX;//当你第一次单击的时候，存储x轴的坐标。
            var dy = iEvent.clientY;//当你第一次单击的时候，储存Y轴的坐标。
            document.onmousemove = function (ev) {
                var iEvent = ev || event;
                switch(that.modX){
                    case 'L':{
                        root.style.left = (pos.l + iEvent.clientX - dx) +'px';
                    }break;                    
                    case 'R':{
                        root.style.right = (pos.r - iEvent.clientX + dx) + 'px';
                    }break;
                }
                switch (that.modY) { 
                    case 'T':{               
                        root.style.top  =  (pos.t + iEvent.clientY - dy) + 'px';
                    }break;
                    case 'B':{                        
                        root.style.bottom = (pos.b - iEvent.clientY + dy) + 'px';
                    }break;
                } 

            }
        }
    },
    methods:{
        changeStatus(status){
            this.status = status;
        },
        doClose(){
            this.$emit("close",{self: this});
        }
    }
}
</script>
<style lang="less">
.qwDragWin{
    position: absolute;
    min-width: 300px;
    min-height: 32px;
    background: #FFF;
    box-shadow: 4px 4px 10px rgba(0,0,0,0.3);
    overflow: hidden;
    box-sizing: border-box;
    .titleBox{
        position: relative;
        border-bottom: 1px solid #CCC;
    }
    .title{
        height: 32px;
        line-height: 32px;
        font-size: 16px;
        color: #333;
        box-sizing: border-box;
        padding-left: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .rToolBox{
        position: absolute;
        right: 0px;
        top:0;        
        i{            
            display: block;
            float: left;
            width: 30px;
            height: 32px;
            position: relative;
        }
        i:hover{
            background: rgba(0,0,0,0.3);
        }
        .min:after{
            content: "";
            position: absolute;
            display: block;
            width: 15px;
            height: 2px;
            background: #333;
            left: 7px;
            top:18px;
        }
        .maxMid:after{
            content: "";
            box-sizing: border-box;
            position: absolute;
            display: block;
            width: 15px;
            height: 10px;
            border: 2px solid #333;
            z-index: 2;
            left: 7px;
            top:12px;
        }
        
        .maxMid:before{
            content: "";
            box-sizing: border-box;
            position: absolute;
            display: block;
            width: 15px;
            height: 10px;
            z-index: 1;
            border: 1px solid #333;
            left: 10px;
            top:8px;
        }
        .close::after,.close::before{
            content: "";
            position: absolute;
            display: block;
            width: 16px;
            height: 2px;
            background: #333;
            transform-origin: center;
            left: 7px;
            top:14px;
        }
        .close::after{
            transform: rotate(-45deg);
        }
        .close::before{
            transform: rotate(45deg);
        }
    }
    .content{
        padding:10px;
    }
}
</style>
