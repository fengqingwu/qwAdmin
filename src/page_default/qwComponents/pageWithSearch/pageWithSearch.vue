<template>
<!-- 带搜索的页面 -->
<div class="pageWithSearch">
    <div class="searchBl" v-if="!hideSearch">
        <template  v-if="searchFormConfig">
            <formInline ref="formSearch" style="width:780px;" :config="searchFormConfig" @formItemInput="searchFormItemInput" @formItemFocus="searchFormItemFocus" @formItemChanged="searchFormItemChanged"/>
            <el-button size="mini" type="primary" @click="doSearch" class="fl" icon="el-icon-search">搜索</el-button>
            <el-button size="mini" @click="resetSearch" class="fl" type="danger">清空搜索</el-button>
        </template>
        <slot v-else name="search"></slot>
        <div style="clear:both;"></div>
    </div>
    <div class="mainBl"  :style="{ minHeight: (sidebarHeight- (hideSearch? 0 : 160)) + 'px',marginTop: (hideSearch? '0': '20px')}">    
        <qwToolbar v-if="toolbarConfig" :config="toolbarConfig" @itemClicked="itemClicked"/>
        <slot v-else name="toolbar" :self="getRef"></slot>
        <qwTable v-if="tableConfig" style="margin-top:20px;" @pageChange="pageChange" @sizeChange="sizeChange" :tableConfig="tableConfig" :tableData="tableData"></qwTable>
    </div> 
    <!-- slot -->
    <slot :self="getRef"></slot>
    <!-- 新增或编辑 -->
    <dialogForm ref="dialogForm" v-if="dialogFormConfig" :config="dialogFormConfig" @formBtnClicked="formBtnClicked"  @formItemInput="dialogFormItemInput" @formItemFocus="dialogFormItemFocus" @formItemChanged="dialogFormItemChanged"></dialogForm>
</div>
</template>
<script>
import formInline from "../form/formInline.vue";
import qwToolbar from "../qwToolbar/qwToolbar.vue";
import qwTable from "../formTable/formTable.vue"
import dialogForm from "../modelForm/modelForm.vue"
import { mapState } from "vuex"
import { jsonStringify,jsonParse  } from "../../../utils/json.js";
let that__ = null;
export default {
    components:{
        formInline,
        qwToolbar,
        qwTable,
        dialogForm
    },
    created(){
        that__ = this;
        this.dialogFormConfig = this.addFormConfig;
    },
    props:{
        hideSearch:{
            type: Boolean,
            default(){
                return false
            }
        },
        searchFormConfig:{
            type: Object,
            default(){
                return null
            }
        },
        addFormConfig:{
            type: Object,
            default(){
                return null
            }
        },
        editFormConfig:{
            type: Object,
            default(){
                return null
            }
        },
        delCallback:{
            type: Function,
            default(){
                return ()=>{}
            }
        },
        toolbarConfig:{
            type: Array,
            default(){
                return null
            }
        },
        tableConfig:{
            type: Object,
            default(){
                return null
            }
        },
        tableData:{
            type: Array,
            default(){
                return null
            }
        },
    },
    data(){
        return {
            dialogFormConfig: null,
        }
    },
    computed:{
        ...mapState({
            sidebarHeight: state=> state.app.sidebarHeight
        })
    },
    methods:{
        /**
         *  获取本组件vue对象
         *  */ 
        getRef(){
            return this;
        },
        /**
         *  深度拷贝
         *  @param { Object[JSON] } 
         */
        deepCopy(JSONOBJ){
            return jsonParse(jsonStringify(JSONOBJ));
        },
        /**
         * 工具条按钮点击事件
         */
        itemClicked(data){
            this.$emit("toolbarItemClicked",data);
        },
        /**
         * 显示对话框
         *  */ 
        showModelForm(config,cb){
            window.that__$$ = this;
            this.dialogFormConfig = jsonParse(jsonStringify(config));
            setTimeout(() => {
                this.dialogFormConfig.qwDialog.dialogVisible = true;
                setTimeout(() => {
                    if('function' == typeof(cb)){
                        cb(this)
                    }
                //     this.resetForm();
                }, 100);
            }, 100);
        },
        /**
         * 关闭对话框
         *  */ 
        closeModelForm(cb=()=>{}){
            this.resetForm(()=>{
               setTimeout(() => {
                this.dialogFormConfig.qwDialog.dialogVisible = false;
                setTimeout(() => {
                    if('function' == typeof(cb)){
                        cb(this)
                    }
                }, 100);
            }, 100);
            })
        },
        /**
         * 清除对话框验证信息
         */
        clearValidate(){
            let modelForm = this.$refs.dialogForm;
            modelForm.clearValidate();
        },
        /**
         * 设置对话框表单数据
         */
        setFormData(data){
            for(let attr in data){
                this.$set(this.dialogFormConfig.qwForm.formData,attr,data[attr]); 
            }
        },
        /**
         * 重置对话框并调用回调函数
         */
        resetForm(cb=()=>{}){
            let dialog = this.$refs.dialogForm;
            if(dialog){
                dialog.resetForm();
                setTimeout(() => {
                    dialog.clearValidate();
                    setTimeout(() => {
                       if('function' == typeof(cb)){
                           cb()
                       }
                    }, 100);
                }, 100);
            }                 
        },
        /**
         * 对话框按钮点击事件
         */
        formBtnClicked(data){
            this.$emit("formBtnClicked",data);
        },
        /**
         * 重置搜索框
         */
        resetSearch(){
            let formSearch = this.$refs.formSearch;
            if(formSearch){
                formSearch.resetForm();
                setTimeout(() => {
                    this.doSearch();
                }, 300);
            }
        },
        /**
         * 搜索数据
         */
        doSearch(){
            this.tableConfig.pageNo =1;
            this.getData();
        },
        /**
         * 页码改变事件
         */
        pageChange(){
            this.getData();
        },
        /**
         * 单页显示条数改变事件
         */
        sizeChange(){
            this.getData();
        },
        /**
         * 获取数据
         */
        getData(){
            let params = this.hideSearch? {}: this.searchFormConfig.formData;
            params.pageSize = this.tableConfig.pageSize;
            params.pageNo = this.tableConfig.pageNo;
            this.$emit("getList",{params:params,self: this});
        },
        
        searchFormItemFocus(data){
            this.$emit("searchFormItemFocus",data);
        },
        searchFormItemInput(data){
            this.$emit("searchFormItemInput",data);
        },
        searchFormItemChanged(data){
            this.$emit("searchFormItemChanged",data);
        },
        
        dialogFormItemFocus(data){
            this.$emit("dialogFormItemFocus",data);
        },
        dialogFormItemInput(data){
            this.$emit("dialogFormItemInput",data);
        },
        dialogFormItemChanged(data){
            this.$emit("dialogFormItemChanged",data);
        },
    }
}
</script>
<style lang="less">
.pageWithSearch{
    .searchBl{
        background: #FFF;
        position: relative;
        box-sizing: border-box;
        padding: 20px 20px 0 20px;
        min-height: 68px;
        .qw_form_box{
            float: left;
        }
        .el-button.fl{
            // float: left;
            transform: translateY(2px);
        }
    }
    .mainBl {
        background: #FFF;
        padding: 10px 20px 20px 20px;
        margin-top: 20px;
        // .el-table__body-wrapper.is-scrolling-none{
        //     min-height: 300px;
        // }
    }
    .el-table__empty-text{
        line-height: 200px;
    }
    .el-table::before{
        display: none;
    }
}
</style>

