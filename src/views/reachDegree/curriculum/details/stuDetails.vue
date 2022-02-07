<template>
    <div>
        <h3>{{fromData.studentName}}课程成绩</h3>
        <div class="btnList">
            <el-button  size="small" icon="el-icon-back" @click="$router.go(-1)" >返回</el-button>
        </div>
        <div>
            <el-table :data="dataList">
                <el-table-column label="课程" prop="curriculum"></el-table-column>
                <el-table-column label="成绩" prop="result">
                    <template slot-scope="scope">
                        <div>
                            <el-input v-if="scope.row.ifInp" v-model="scope.row.result" style="width:200px" placeholder="请输入课程成绩">
                                <el-button slot="append" icon="el-icon-check" @click="saveFraction(scope.row)"></el-button>
                            </el-input>
                            <div  v-else>
                                <span>{{scope.row.result}}</span>
                                <i  class="el-icon-edit-outline iconSt" @click="scope.row.ifInp = true" ></i>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column column-key="status" label="操作" width="180" fixed="right">
                    <template slot-scope="scope">
                        <el-popconfirm
                        title="确认删除该学生课程成绩吗？"
                        @confirm='detelFn(scope.row)'
                        >
                        <el-button   slot="reference" title="删除" style="color:red" icon="el-icon-delete" size="small"></el-button>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        
    </div>
</template>

<script>
import {achievelevelInfo,achievelevelUpdateResult,achievelevelDeleteResult} from '@/api'
export default {
    data(){
        return{
            fromData:this.$route.query,
            dataList:[]
        }   
    },
    created(){
        this.getData()
    },
    methods:{
        //获取详情数据
        getData(){
            achievelevelInfo({stuNo:this.fromData.stuNo}).then((res) =>{
                if(res.code == 0){
                    res.list.map((ev) =>{
                        ev.ifInp  = false
                    })
                    this.dataList = res.list
                }
            })
        },
        //修改成绩
        saveFraction(item){
            let data = {
                id:item.id,
                result:item.result,
                stuNo:this.fromData.stuNo
            }
            achievelevelUpdateResult(data).then((res) =>{
                console.log(res)
                if(res.code == 0){
                    item.ifInp = false
                    this.$message.success('修改成功')
                }
            })
        },
        //删除
        detelFn(item){
            let arr = [item.id]
            achievelevelDeleteResult(arr).then((res) =>{
                if(res.code == 0){
                    this.getData()
                    this.$message.success('删除成功')
                }
            })
        }
    }
}
</script>

<style scoped>
.iconSt{
    margin-left:10px;color:#409EFF;cursor: pointer;
}
</style>