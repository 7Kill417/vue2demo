<template>
    <div>
        <h3>{{fromData.studentName}}指标点达成度</h3>
        <div class="btnList">
            <el-button  size="small" icon="el-icon-back" @click="$router.go(-1)" >返回</el-button>
            <el-button  size="small" icon="el-icon-delete" type="danger" @click="deletesFn()" >批量删除</el-button>
        </div>
        <div>
            <el-table :data="dataList" border  @selection-change="handleSelectionChange">
                <el-table-column
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column label="指标点" width="80" prop="kpi"></el-table-column>
                <el-table-column label="指标点内容" prop="kpiName"></el-table-column>
                <el-table-column label="指标点达成度" prop="achieveLevel"></el-table-column>
                <el-table-column column-key="status" label="操作" width="180" fixed="right">
                    <template slot-scope="scope">
                        <el-button   title="修改" @click="editFn(scope.row)"  style="color:#409EFF;margin-right:20px" icon="el-icon-edit" size="small"></el-button>
                        <el-popconfirm
                        title="确认删除该数据吗？"
                        @confirm='detelFn(scope.row)'
                        >
                        <el-button   slot="reference" title="删除" style="color:red" icon="el-icon-delete" size="small"></el-button>
                        </el-popconfirm>
                        
                    </template>
                </el-table-column>
            </el-table>
        </div>
        
        <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <el-form :model="upfromData">
            <el-form-item label="KPI:">
                <el-input v-model="upfromData.kpi" placeholder="请输入指标点"></el-input>
            </el-form-item>
            <el-form-item label="达成度:">
                <el-input v-model="upfromData.achieveLevel" placeholder="请输入内容"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="saveFraction">确 定</el-button>
        </span>
        </el-dialog>
        
    </div>
</template>

<script>
import {studentLevelDetails,courseUpdate,courseDelete} from '@/api'
export default {
    data(){
        return{
            fromData:this.$route.query,
            dataList:[],
            upfromData:{
                stuNo:this.$route.query,
                achieveLevel:'',
                kpi:''
            },
            dialogVisible:false,
            idList:[]
        }   
    },
    created(){
        console.log(this.$route.query)
        this.getData()
    },
    methods:{
        handleClose(){
            this.dialogVisible =false
        },
        //获取详情数据
        getData(){
            studentLevelDetails({stuNo:this.fromData.stuNo}).then((res) =>{
                if(res.code == 0){
                    this.dataList = res.list
                }
            })
        },
        //修改成绩
        saveFraction(){
            courseUpdate(this.upfromData).then((res) =>{
                console.log(res)
                if(res.code == 0){
                    this.handleClose()
                    this.$message.success('修改成功')
                }
            })
        },
        //删除
        detelFn(item){
            let arr =[item.id]
            courseDelete(arr).then((res) =>{
                if(res.code == 0){
                    this.getData()
                    this.$message.success('删除成功')
                }
            })
        },
        editFn(item){
            this.upfromData = item,
            this.upfromData.stuNo = this.fromData.stuNo
            console.log(this.upfromData)
            this.dialogVisible = true
        },
        handleSelectionChange(val){
            this.idList = val;
        },
        deletesFn(){
            if(this.idList.length){
                let arr = []
                console.log()
                this.idList.map((ev)=>{
                    arr.push(ev.id)
                })
                console.log(arr)
                this.$confirm('确认要删除当前选中数据吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        courseDelete(arr).then((res) =>{
                            if(res.code == 0){
                                this.getData()
                                this.idList=[]
                                this.$message.success('删除成功')
                            }
                        })
                })
            }else{
                this.$message.warning('请至少选择一条信息')
            }
        }
    }
}
</script>

<style scoped>
.iconSt{
    margin-left:10px;color:#409EFF;cursor: pointer;
}
</style>