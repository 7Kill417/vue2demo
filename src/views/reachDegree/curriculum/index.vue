<template>
    <div>
        <div class="searchFrom">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" size='small'>
                <el-form-item label="学生编号：">
                    <el-input v-model="formInline.stuNo" placeholder="请输入学生编号查询"></el-input>
                </el-form-item>
                <el-form-item label="学生名称：">
                    <el-input v-model="formInline.name" placeholder="请输入学生名称查询"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <el-button  icon="el-icon-circle-close" @click="clearFn" ></el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="btnList">
            <!-- <el-button type="primary" size="small" icon="el-icon-plus" @click="openAddDia()" >新增</el-button> -->
            <el-button type="primary" size="small" icon="el-icon-upload2" @click="exuploadFn" >导入</el-button>
        </div>
        <div class="tableBox">
            <el-table
                size='small'
                :data="tableData"
                border
                v-loading="loging"
                style="width: 100%">
                <!-- <el-table-column
                type="selection"
                width="55">
                </el-table-column> -->
                <el-table-column
                type="index"
                label="编号"
                width="50">
                </el-table-column>
                <el-table-column
                prop="stuNo"
                label="学号"
                width="180">
                </el-table-column>
                <el-table-column
                prop="studentName"
                label="姓名"
                width="100">
                </el-table-column>
                <el-table-column
                prop="className"
                label="班级"
                >
                </el-table-column>
                <el-table-column column-key="status" label="操作" width="180" fixed="right">
                    <template slot-scope="scope">
                        <el-button  title="详情" style="color:#409EFF" icon="el-icon-info" size="small" @click="toDetail(scope.row)"></el-button>
                        <el-button  title="编辑" style="color:#409EFF" icon="el-icon-edit" size="small" @click="openAddDia(scope.row)"></el-button>
                        <el-button  title="删除" style="color:red" icon="el-icon-delete" size="small" @click="detelFn(scope.row,0)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <pagination :total="recordCount" :page.sync="formInline.page" :limit.sync="formInline.size" @pagination="paginationCallback"></pagination>
        </div>
        <ExcelTemplate :isExcelTemplete="isExcelTemplate" @bubblingIsExcelTemplete="excelUpload"/>
        <detailDialog ref="detailDialog" @closeAddDia='closeAddDia'></detailDialog>
    </div>
</template>

<script>
import ExcelTemplate from '@/components/ExcelTemplete'
import detailDialog from './components/detailDialog'
import {getAchievelevelList,achievelevelDelete} from '@/api'
export default {
    components:{ExcelTemplate,detailDialog},
    data(){
        return{
            formInline:{
                stuNo:'',
                name:'',
                page:1,
                size:20
            },
            recordCount:0,
            currentPage:1,
            max_results:20,
            tableData:[],
            isExcelTemplate: false,
            multipleSelection:[],
            loging :false
        }
    },
    created(){
        this.getdata()
    },
    methods:{
        getdata(){
            this.loging = true
            getAchievelevelList(this.formInline).then((res) =>{
                console.log(res)
                if(!res.code){
                    this.tableData = res.page.list
                    this.recordCount = res.page.totalCount
                }
                this.loging = false
            })
        },
        clearFn(){
            this.formInline={
                stuNo:'',
                name:'',
                page:1,
                size:20
            },
            this.getdata()
        },
        onSubmit(){
            this.formInline.page = 1
            this.getdata()
        },
        paginationCallback(data){
            console.log(data)
            console.log(this.currentPage)
            this.getdata()
        },
        detelFn(item,num){
            let data = []
            data = [item.stuNo]
            this.$confirm('确认删除当前数据吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
            achievelevelDelete(data).then((res) =>{
                if(res.code==0){
                    this.$message.success('操作成功');
                    this.getdata()
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
        // Excel上传回调
        excelUpload(param) {
            this.isExcelTemplate = param
            this.getdata()
        },
        //上传
        exuploadFn(){
            this.isExcelTemplate = true
        },
        //多选
        handleSelectionChange(val){
            this.multipleSelection = val
        },
        //新增关闭弹框回调
        closeAddDia(ev){
            console.log(ev)
                if(ev){
                    this.getdata()
                }
        }, 
        //信息修改
        openAddDia(item){
            this.$refs.detailDialog.openDia(item)
        },
        //详情
        toDetail(item){
            //this.$refs.detailDialog.openDia(item)
            this.$router.push({
                path:'/stuDetails',
                query:item
            })
        },
    }
}
</script>

<style>

</style>