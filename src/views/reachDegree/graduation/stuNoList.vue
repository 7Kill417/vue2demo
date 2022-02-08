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
            <el-button type="primary" size="small" icon="el-icon-download" @click="exuploadFn" >导出</el-button>
        </div>
        <div class="tableBox">
            <el-table
                size='small'
                :data="tableData"
                border
                v-loading="loging"
                @selection-change="handleSelectionChange"
                style="width: 100%">
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
                <el-table-column column-key="status" label="操作" width="150" fixed="right">
                    <template slot-scope="scope">
                        <el-button  title="毕业要求达成度" style="color:#409EFF" icon="el-icon-receiving" size="small" @click="openAddDia(scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <pagination :total="recordCount" :page.sync="formInline.page" :limit.sync="formInline.size" @pagination="paginationCallback"></pagination>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

import {getAchievelevelList,achievelevelDelete} from '@/api'
export default {
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
            if(num){
                if(this.multipleSelection.length){
                    this.multipleSelection.map((ev) =>{
                        data.push(parseInt(ev.id))
                    })
                }else{
                    this.$message.error('请至少选择一条数据');
                    return
                }
            }else{
                data = [item.id]
            }
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
            window.open('http://81.70.95.45:8091/douyin-api/graduationreqiure/exportExcel','_blank')
            // let myObj = { 
            //     method: 'GET',             
            //     url: 'http://81.70.95.45:8091/douyin-api/graduationreqiure/exportExcel',  //接口地址
            //     fileName: '毕业要求达成度', 
            // }
            // this.exportMethod(myObj); 
            // this.$upload.post("/graduationreqiure/exportExcel").then((res) =>{

            // })
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
        //新增弹框
        openAddDia(item){
            console.log(this.$route)
            this.$router.push({
                path:'/graduation',
                query:{stuNo:item.stuNo}
            })
        },
        //封装导出方法
        exportMethod(data) {
            axios({
                method: data.method,
                url: data.url,
                responseType: 'blob',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => { 
                const link = document.createElement('a')
                let blob = new Blob([res.data], { type: 'application/vnd.ms-excel' })
                link.style.display = 'none'
                link.href = URL.createObjectURL(blob)
        
                link.download = data.fileName + '.xls' //下载的文件名  注意：加.xls是兼容火狐浏览器
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
            }).catch(error => {
                console.log(error)
            })
        }
    }
}
</script>

<style>

</style>