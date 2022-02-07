<template>
    <div>
        <div class="btnList">
            <el-button type="primary" size="small" icon="el-icon-plus" @click="openAddDia()" >新增</el-button>
            <!-- <el-button type="primary" size="small" icon="el-icon-upload2" @click="exuploadFn" >导入</el-button> -->
            <el-button  size="small" icon="el-icon-back" @click="$router.go(-1)" >返回</el-button>
            <!-- <el-button type="primary" size="small" icon="el-icon-download" @click="detelFn('',1)">批量删除</el-button> -->
        </div>
        <div class="tableBox" v-loading="loging">
                    <el-table
                    size='small'
                    :data="tableData"
                    :span-method="objectSpanMethod"
                    border
                    style="width: 100%">
                    <el-table-column
                    prop="kpiName"
                    label="指标点"
                    min-width="200"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="courseTitle"
                    label="相关教学活动"
                    min-width="180">
                    </el-table-column>
                    <el-table-column
                    prop="weight"
                    label="权重值"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="achieveLevel"
                    label="达成度"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="totalResult"
                    label="评价结果"
                    width="90"
                    >
                    </el-table-column>
                    <el-table-column column-key="status" label="操作" width="80" fixed="right">
                        <template slot-scope="scope">
                            <el-button  title="编辑" v-if="scope.row.courseTitle" style="color:#409EFF" icon="el-icon-edit" size="small" @click="openAddDia(scope.row.index)"></el-button>
                            
                        </template>
                    </el-table-column>
                    </el-table>
            <!-- <pagination :total="recordCount" :page.sync="formInline.pageNumber" :limit.sync="formInline.pageSize" @pagination="paginationCallback"></pagination> -->
        </div>
        <listDialog ref="listDialog" :requireId='requireId' @sucFn='getdataFn'></listDialog>
    </div>
</template>

<script>
import listDialog from '../components/listDialog.vue'
import {graduationreqiureDelete,getKpiInfoByRequireId} from '@/api'

export default {
    components:{listDialog},
    data(){
        return{
        tableData:[],
        recordCount:20,
        formInline:{
            user:'',
            region:'',
            pageNumber:1,
            pageSize:20
        },
        activeName:0,
        loging:false,
        isExcelTemplate:false,
        multipleSelection:[],
        testData:[],    //测试
        requireId:this.$route.query.requireId
        }
    },
    created(){
        console.log(this.requireId)
        this.getdataFn()
    },
    methods:{
        //数据查询
        getdataFn(){
            this.loging = true
            getKpiInfoByRequireId(this.requireId).then((res) =>{
                console.log(res)
                this.testData = res.data.list
                this.loging = false
                let arr = []
                res.data.list.map((ev,index) =>{
                        if(!Array.isArray(ev.activityEntityList)){
                            return
                        }
                    let len = ev.activityEntityList ? ev.activityEntityList.length : []
                    if (len > 1) {
                        ev.activityEntityList.forEach(value => {
                        value.mergeCell = 0;
                        });
                        ev.activityEntityList[0].mergeCell = len;
                    }
                    ev.activityEntityList.forEach((value) => {
                        value.index = index
                        value.kpiName = ev.kpiName;
                        value.requireId = ev.requireId;
                        value.totalResult = ev.totalResult; //多个订单号字符串
                        value.kpiId = ev.kpiId;
                        value.kpi = ev.kpi;
                        arr.push(value);
                    });
                })
                console.log(arr)
                this.tableData = arr
                this.tableData.push({
                    kpiName:'毕业要求达成度评价结果',
                    totalResult:res.data.minValue
                })
            })
        },
        //删除
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
        paginationCallback(){
            this.getdataFn()
        },
        //合并单元格
        objectSpanMethod({ row, columnIndex }) {
        let mergeCell = row.mergeCell; //获取标识符（undefined为没有，0为被合并项）
        if (columnIndex < 1  ||columnIndex >= 4 ) {
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
        handleClick(){

        },
        //打开弹框
        openAddDia(num){
            this.$refs.listDialog.opendl(this.testData,num)
        }
    }
}
</script>

<style>

</style>