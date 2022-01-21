<template>
    <div>
        <div class="searchFrom">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" size='small'>
                <el-form-item label="审批人">
                    <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item label="活动区域">
                    <el-select v-model="formInline.region" placeholder="活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="btnList">
            <el-button type="primary" size="small" icon="el-icon-plus" >新增</el-button>
            <el-button type="primary" size="small" icon="el-icon-upload2" @click="exuploadFn" >导入</el-button>
            <el-button type="primary" size="small" icon="el-icon-download">导出</el-button>
        </div>
        <div class="tableBox">
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                prop="date"
                label="日期"
                width="180">
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
                width="180">
                </el-table-column>
                <el-table-column
                prop="address"
                label="地址">
                </el-table-column>
                <el-table-column column-key="status" label="操作" width="150" fixed="right">
                    <template slot-scope="scope">
                        <el-button  title="编辑" style="color:#409EFF" icon="el-icon-edit" size="small" @click="detelFn(scope.row)"></el-button>
                        <el-button  title="删除" style="color:red" icon="el-icon-delete" size="small" @click="detelFn(scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <pagination :total="recordCount" :page.sync="currentPage" :limit.sync="max_results" @pagination="paginationCallback"></pagination>
        </div>
        <ExcelTemplate :isExcelTemplete="isExcelTemplate" @bubblingIsExcelTemplete="excelUpload"/>
    </div>
</template>

<script>
import ExcelTemplate from '@/components/ExcelTemplete'
export default {
    components:{ExcelTemplate},
    data(){
        return{
            formInline:{
                user:'',
                region:''
            },
            recordCount:50,
            currentPage:1,
            max_results:20,
            tableData:[{
                date:'2021-1',
                name:'测试',
                address:'广东'
            }],
            isExcelTemplate: false,
        }
    },
    methods:{
        onSubmit(){

        },
        paginationCallback(data){
            console.log(data)
            console.log(this.currentPage)
        },
        detelFn(){

        },
        // Excel上传
        excelUpload(param) {
            this.isExcelTemplate = param
            //this.getBookList()
        },
        exuploadFn(){
            this.isExcelTemplate = true
        }
    }
}
</script>

<style>

</style>