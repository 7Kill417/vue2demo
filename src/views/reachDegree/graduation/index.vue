<template>
    <div>
        <div class="btnList">
            <!-- <el-button type="primary" size="small" icon="el-icon-plus" @click="openAddDia()" >新增</el-button>
            <el-button type="primary" size="small" icon="el-icon-upload2" @click="exuploadFn" >导入</el-button> -->
            <!-- <el-button type="primary" size="small" icon="el-icon-download" @click="detelFn('',1)">批量删除</el-button> -->
            <el-button  size="small" icon="el-icon-back" @click="$router.go(-1)" >返回</el-button>
        </div>
        <div class="tableBox" v-loading="loging">
                    <el-table
                    :span-method="objectSpanMethod"
                    size='small'
                    :data="tableData"
                    border
                    style="width: 100%">
                    <el-table-column
                    prop="requireName"
                    label="毕业要求"
                    width="180"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="kpiName"
                    label="指标点"
                    min-width="180">
                    </el-table-column>
                    <el-table-column
                    prop="evaluateResult"
                    label="评价结果"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="smallEvaluateResult"
                    label="评价结果最小值"
                    width="180">
                    </el-table-column>
                    <el-table-column column-key="status" label="操作" width="200" fixed="right">
                        <template slot-scope="scope">
                            <!-- <el-button  title="编辑" style="color:#409EFF" icon="el-icon-edit" size="small" @click="openAddDia(scope.row)"></el-button> -->
                            <el-button  title="相关教学活动" style="color:#409EFF" icon="el-icon-edit-outline" size="small" @click="toDetail(scope.row)" ></el-button>
                            <!-- <el-button  title="删除" style="color:red" icon="el-icon-delete" size="small" @click="detelFn(scope.row,0)"></el-button> -->
                        </template>
                    </el-table-column>
                    </el-table>
            <!-- <pagination :total="recordCount" :page.sync="formInline.pageNumber" :limit.sync="formInline.pageSize" @pagination="paginationCallback"></pagination> -->
        </div>
        <ExcelTemplate :isExcelTemplete="isExcelTemplate" @bubblingIsExcelTemplete="excelUpload"/>

        <!-- 弹框 懒得写成组件 -->
        <el-dialog
            title="教学活动详情"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <div>
                <el-table
                :data="dltableData"
                style="width: 100%">
                <el-table-column
                    prop="courseName"
                    label="相关教学活动"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="weight"
                    label="权重值"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="level"
                    label="达成度">
                </el-table-column>
                </el-table>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="graduationreqiureUpdateFn">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {graduationreqiureInfo,graduationreqiureDelete,graduationreqiureUpdate,graduationreqiureSave,graduationreqiureCourseInfo,kpiList} from '@/api'
import ExcelTemplate from '@/components/ExcelTemplete'

export default {
    components:{ExcelTemplate},
    data(){
        return{
        tableData:[],
        dltableData:[],
        recordCount:20,
        formInline:{
            user:'',
            region:'',
            pageNumber:1,
            pageSize:20
        },
        fomrData:{
            requireId:'',
            requireName:''
        },
        activeName:0,
        loging:false,
        isExcelTemplate:false,
        multipleSelection:[],
        dialogVisible:false,
        stuNo:this.$route.query.stuNo,
        kpiList:[]
        }
    },
    created(){
        this.getdataFn()
    },
    methods:{
        //数据查询
        getdataFn(){
            console.log(this.stuNo)
            this.loging = true
            graduationreqiureInfo({stuNo:this.stuNo}).then((res) =>{
                let arr = []
                let str = Object.values(res.list)
                let list =  Object.keys(res.list)
                console.log(list)
                console.log(str)
                list.map((ev,index) =>{
                    arr.push({
                        list:str[index],
                        lable:ev
                    })
                })
                this.$nextTick(()=>{
                    let tableData = [];
                    arr.forEach((val,index) => {
                    let len = val.list.length;
                    if (len > 1) {
                        val.list.forEach(value => {
                        value.mergeCell = 0;
                        });
                        val.list[0].mergeCell = len;
                    }
                        val.list.forEach((value) => {
                            value.lable = val.lable;
                            tableData.push(value);
                        });
                    });
                    this.tableData = tableData
                })
                // this.tableData= res.list
                // console.log(this.tableData)
                //this.recordCount = res.page.totalCount
                this.loging = false
            })
        },
        //删除
        detelFn(item,num){
            let data = []
            if(num){
                if(this.multipleSelection.length){
                    this.multipleSelection.map((ev) =>{
                        data.push(parseInt(ev.requireId))
                    })
                }else{
                    this.$message.error('请至少选择一条数据');
                    return
                }
            }else{
                data = [item.requireId]
            }
            this.$confirm('确认删除当前数据吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
            graduationreqiureDelete(data).then((res) =>{
                if(res.code==0){
                    this.$message.success('操作成功');
                    this.getdataFn()
                }else{
                    this.$message.error(res.msg);
                }
            })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        //分页回调
        paginationCallback(){ 
            this.getdataFn()
        },
        //上传
        exuploadFn(){
            this.isExcelTemplate = true
        },
        // Excel上传回调
        excelUpload(param) {
            this.isExcelTemplate = param
            this.getdataFn()
        },
        //新增||修改弹框
        openAddDia(item){
            this.dialogVisible = true
            if(item){
                this.dltitle = "修改毕业要求"
                this.fomrData.requireId = item.requireId
                this.fomrData.requireName = item.requireName
            }else{
                this.dltitle = "新增毕业要求"
            }
            
        },
        //确认修改新增毕业要求
        graduationreqiureUpdateFn(){
            if(this.fomrData.requireId){
                graduationreqiureUpdate(this.fomrData).then((res) =>{
                console.log(res)
                if(res.code == 0){
                    this.handleClose()  //关闭弹框
                    this.getdataFn()
                    this.$message({
                    message: '操作成功',
                    type: 'success'
                    });
                }else{
                    this.$message({
                    message: res.msg,
                    type: 'error'
                    });
                }
            })
            }else{
                graduationreqiureSave(this.fomrData).then((res) =>{
                console.log(res)
                if(res.code == 0){
                    this.handleClose()  //关闭弹框
                    this.getdataFn()
                    this.$message({
                    message: '操作成功',
                    type: 'success'
                    });
                }else{
                    this.$message({
                    message: res.msg,
                    type: 'error'
                    });
                }
            })
            }
            
        },
        //关闭弹框
        handleClose(){
            this.fomrData={
            requireId:'',
            requireName:''
            },
            this.dialogVisible = false
        },
        //指标点详情
        toDetail(item){
            let data = {
                kpiId : item.kpiId,
                achieveLevel : item.achieveLevel
            }
            graduationreqiureCourseInfo(data).then((res) =>{
                console.log(res)
                if(res.code == 0){
                    this.dialogVisible = true
                    this.dltableData = res.list
                }
                
            })
        },
        //合并单元格
        objectSpanMethod({ row, columnIndex }) {
        let mergeCell = row.mergeCell; //获取标识符（undefined为没有，0为被合并项）
        if (columnIndex < 1 || columnIndex == 3) {
            if (mergeCell) {
            return {
                rowspan: mergeCell,
                colspan: 1
            };
            } else if (mergeCell === 0) {
            return {
                rowspan: 0,
                colspan: 0
            };
            } else {
            return {
                rowspan: 1,
                colspan: 1
            };
            }
        }
        },
    }
}
</script>

<style>

</style>