    :fixed="item.fixed" //列是否固定在左侧或者右侧
    :prop="item.field" //对应列内容的字段名
    :width="item.width" //对应列的宽度
    :sortable="item.isSort" //排序
    :resizable="item.isResize" //对应列是否可以通过拖动改变宽度
    :show-overflow-tooltip="true" //当内容过长被隐藏时显示tooltip
    :label="item.label" //标头标题
    :align="tableConfig.align" //文本对齐方式
    :disabled="item.disabled"//输入框禁用判断
    <template>
        <div class="myTable">
            <!-- 交互按钮 -->
            <toolbar v-if="tableConfig.toolbarConfig"
                        @toolbarBack="toolbarBack"
                        :toolbarConfig="tableConfig.toolbarConfig">
                        <slot></slot>
                        </toolbar>
            <!-- 表格 -->
            <el-table :data="tableData"
                        @select="select"
                        @select-all="select"
                        @row-dblclick="rowDblclick"
                        :height="tableConfig.height?tableConfig.height:560"
                        :highlight-current-row="tableConfig.isHigh">
                <!-- 是否勾选 -->
                <el-table-column
                    v-if="tableConfig.isSelection"
                    :selectable="selectable"
                    type="selection"
                    width="50"
                    :align="tableConfig.align"
                    :disabled="tableData.length<0">
                </el-table-column>
                <el-table-column type="index" label="序号" v-if="tableConfig.isOrder" width="50"></el-table-column>
                <!-- 表格配置 -->
                    <el-table-column v-for="(item,index,$index) in tableConfig.colConfig"
                        :fixed="item.fixed"
                        :prop="item.field"
                        :width="item.width"
                        :sortable="item.isSort"
                        :resizable="item.isResize"
                        :show-overflow-tooltip="!item.noTooltip"
                        :label="item.label"
                        :align="tableConfig.align"
                        >
                        <!-- 自定义表格内容 -->
                            <template slot-scope="scope">
                            <!-- 普通文本 -->
                            <span v-if="item.type === 'text'">{{formatter(item.field,scope.row[item.field])}}</span>
                            <div v-else-if="item.type === 'btnsText'">
                                <el-button type="text" v-for="it in item.btnData" @click="callBack(it.method,scope.row,scope.$index)" size="mini">
                                    <!--<span v-if=""></span>-->
                                    {{it.name}}
                                </el-button>
                            </div>
                            <!-- 未完待续 -->
                            </template>
                    </el-table-column>
            </el-table>
            <!-- 分页 -->
                <div class="my-pagination">
                    <el-pagination v-if="tableConfig.isPage"
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="tableConfig.pageNo"
                                :page-sizes="[20, 40, 60, 80]"
                                :page-size="tableConfig.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableConfig.total">
                    </el-pagination>
                </div>
                <!-- loading -->
                <loading v-show="tableConfig.loadShow"></loading>
        </div>
    </template>


    <script>
    import toolbar from "./toolbar.vue"
    import loading from "./Loading.vue"
    export default {
    props: ["tableConfig", "tableData"],
    components:{
        toolbar,
        loading
    },
    data(){
        return{
            pickerOptions:{
                disabledDate(time) {
                    return time.getTime() < Date.now();
                },
            },
        }
    },
    methods:{
        callBack(method,val,index) {
            this.$emit(method,val,index);
        },
        // 自定义列内容
        formatter(field, cellValue) {
            if (this.tableConfig.isFormatter) {
                let val = null;
                this.$emit("formatter", field, cellValue, value => {
                val = value;
                });
                return val;
            } else {
                return cellValue;
            }
        },
        toolbarBack(data){//操作按钮回调
            this.$emit(data.method,data.index);
        },
        handleSizeChange(val){//每页数量变化
            if(this.tableConfig.isLoading){
                this.tableConfig.loadShow = true;//加载
            }
            this.tableConfig.pageSize = val;
            this.$emit("pageChange");
        },
        handleCurrentChange(val){//页码变化
            if(this.tableConfig.isLoading){
                this.tableConfig.loadShow = true;//加载
            }
            this.tableConfig.pageNo = val;
            this.$emit("pageChange");
        },
        select(val){//表格Checkbox勾选触发
            this.tableConfig.currentSelectArr = val;
        },
        rowDblclick(val){//表格单行双击
            this.$emit('rowDblclick',val);
        },
    },
    watch:{
        'tableData':function(){
                this.tableConfig.currentSelectArr = [];
            }
        }
    };
    </script>
    <style lang="less">
    @colPading:8px 0;
    @theadColor:#333333;
    @theadImage:linear-gradient(to right, #DEE3E8, #DEE3E8);
    .myTable{
        position: relative;
        .my-pagination{
        text-align: center;
        margin-top: 10px;
        }
        .el-table td{
        padding:@colPading;
        }
        .el-table thead {
            color: @theadColor;
            font-weight: 500;
            background-image: @theadImage;
            // background-color: #DEE3E8;
        }
        .el-table th, .el-table tr {
        background-color: rgba(0,0,0,0);
    }
    }
    </style>

