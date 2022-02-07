<template>
    <div v-loading="loading">
        <div class="btnList">
            <el-button type="primary" size="small" icon="el-icon-upload2" @click="exuploadFn" >导入</el-button>
            <el-button type="primary" size="small" icon="el-icon-plus" @click="addGraduation(1)" >新增毕业要求</el-button>
        </div> 
        <el-collapse v-model="activeNames" >
            <el-collapse-item v-for="(item,index) in dataList" :title="item.label" :name="item.id" :key="index">
                <template slot="title">
                    <div v-if="!item.detilIf">
                        <span  style="color:#409EFF">
                            {{item.label}}
                            <i class="el-icon-edit" style="margin-left:20px" @click="openDl(1,item)"></i>
                            <i class="el-icon-delete" style="margin-left:20px;color:red" @click="deleteDl(1,item)"></i>
                        </span> 
                    </div>
                    
                    <el-input v-else v-model="item.label" placeholder="请输入毕业要求"></el-input>
                </template>
                <div>
                    <el-button type="primary" size="small" icon="el-icon-plus" @click="addGraduation(2,item.id)" >新增指标点</el-button>
                    <el-table :data="item.textList" :span-method="objectSpanMethod" border  >
                        <el-table-column label="指标点" prop="kpi" width="80"></el-table-column>
                        <el-table-column label="指标点名称" prop="requireLable">
                            <template slot-scope="scope">
                                {{scope.row.requireLable}}
                                <el-button type="primary" icon="el-icon-circle-plus" title="新增课程" @click="addGraduation(3,scope.row.kpiId)" size="mini" circle></el-button>
                                <el-button type="primary" icon="el-icon-edit" size="mini" title="修改指标点" @click="openDl(2,scope.row)" circle></el-button>
                                <el-button type="danger" icon="el-icon-circle-close" size="mini" title="删除指标点" @click="deleteDl(2,scope.row)" circle></el-button>

                            </template>
                        </el-table-column>
                        <el-table-column label="相关教学活动" prop="label"></el-table-column>
                        <el-table-column label="权重值" prop="weight"></el-table-column>
                        <el-table-column column-key="status" label="操作" width="120" fixed="right">
                        <template slot-scope="scope">
                            <el-button  title="编辑" style="color:#409EFF" icon="el-icon-edit" size="small" @click="openDl(3,scope.row)"></el-button>
                            <el-button  title="删除"  style="color:red" icon="el-icon-delete" size="small" @click="deleteDl(3,scope.row)"></el-button>
                            
                        </template>
                    </el-table-column>
                    </el-table>
                </div>
            </el-collapse-item>
        </el-collapse>
        <!-- 新增毕业要求 -->
        <el-dialog
        title="新增或修改毕业要求"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <div>
            <el-input v-model="graduationReqiureEntity.requireName" placeholder="请输入名称"></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="saveFn">确 定</el-button>
        </span>
        </el-dialog>
        <!-- 新增指标点信息 -->
        <el-dialog
        title="新增或修改指标点"
        :visible.sync="dialogkpInfo"
        width="30%"
        :before-close="handleClose">
        <div>
            <el-input v-model="kpInfoEntity.kpi" style="width:200px" placeholder="请输入指标点"></el-input><br/>
            <el-input v-model="kpInfoEntity.kpiName" style="margin-top:20px" placeholder="请输入指标点名称"></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="saveFn">确 定</el-button>
        </span>
        </el-dialog>
        <!-- 新增课程信息 -->
        <el-dialog
        title="新增或修改课程"
        :visible.sync="dialogTeachActivity"
        width="30%"
        :before-close="handleClose">
        <div>
            <el-input v-model="teachActivityEntity.weight" style="width:200px" placeholder="请输入权重值"></el-input><br/>
            <el-input v-model="teachActivityEntity.courseTitle" style=" margin-top:20px" placeholder="请输入课程名称"></el-input>
            
            
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="saveFn">确 定</el-button>
        </span>
        </el-dialog>
        <ExcelTemplate :isExcelTemplete="isExcelTemplate" @bubblingIsExcelTemplete="excelUpload"/>
    </div>
</template>

<script> 
import ExcelTemplate from '@/components/ExcelTemplete'

import {kpiList,kpinfoSave,kpinfoUpdate,kpinfoDelete} from '@/api'
export default {
    components:{ExcelTemplate},
    data(){
        return{
            
            dataList:[],
            activeNames:'',
            loading:false,
            dialogVisible:false,//毕业要求弹框
            dialogkpInfo:false,//指标点信息弹框
            dialogTeachActivity:false,  //课程信息弹框
            graduationReqiureEntity:{   //毕业要求信息
                requireName:''
            },
            kpInfoEntity:{  //指标点信息
                kpiName:'',
                kpi:'',
                requireId:'',
                kpiId:'',
                activityEntityList:[]
            },
            teachActivityEntity:{   //课程信息
                courseTitle:'',
                kpiId:'',
                weight:''
            },
            addData:{
                type:1,
            },
            isExcelTemplate: false,
        }
    },
    created(){
        this.getDataFn()
    },
    methods:{
        //关闭所有弹框
        handleClose(){
            this.dialogVisible = false
            this.dialogkpInfo = false
            this.dialogTeachActivity = false
            this.kpInfoEntity={  //指标点信息
                kpiName:'',
                kpi:'',
                requireId:'',
                kpiId:''
            }
            this.graduationReqiureEntity={   //毕业要求信息
                requireName:''
            }
            this.teachActivityEntity={   //课程信息
                courseTitle:'',
                kpiId:'',
                weight:''
            }
            this.addData={
                type:1,
            }
        },
        //获取数据
        getDataFn(){
            this.loading = true
            kpiList().then((res) =>{
                if(res.code == 0){
                    this.loading = false
                    let arr = []
                    res.list.map((op)=>{
                        op.detilIf = false
                        arr = []
                        op.children = Array.isArray(op.children) ? op.children : []
                        op.children.map((ev,index) =>{
                            
                            let len =Array.isArray(ev.children) ? ev.children.length : 0
                            if(!Array.isArray(ev.children)){
                                ev.children = []
                            }
                            if (len > 1) {
                                ev.children.forEach(value => {
                                value.mergeCell = 0;
                                });
                                ev.children[0].mergeCell = len;
                            }
                            
                            if(len == 0 ){
                                ev.requireLable = ev.label
                                ev.label = ''
                                ev.kpiId = ev.id
                                ev.requireId = op.id;
                                arr.push(ev)
                            }
                            ev.children.forEach((value) => {
                                value.index = index
                                //value.label = ev.label;
                                value.requireId = op.id;
                                value.totalResult = ev.totalResult; //多个订单号字符串
                                value.kpi = ev.kpi;
                                value.kpiId = ev.id
                                value.requireLable =  ev.label;
                                arr.push(value);
                            });
                        })
                        op.textList = arr
                    })
                    console.log(res.list)
                    this.dataList = res.list
                    this.activeNames = res.list[0].requireId
                    this.$nextTick(() =>{
                        this.loading = false
                    })
                }
            })
        },
        //新增毕业要求
        addGraduation(num,id){
            console.log(id)
            this.addData.type  = num
            if(num == 1){
            this.dialogVisible = true
            }else if(num == 2){
            this.dialogkpInfo = true
            this.kpInfoEntity.requireId = id
            }else{
            this.dialogTeachActivity = true
            this.teachActivityEntity.kpiId = id
            }
        },
        //确认新增
        saveFn(){
            
            if(this.addData.type == 1){
                this.addData.graduationReqiureEntity = this.graduationReqiureEntity
            }else if(this.addData.type == 2){
                this.addData.kpInfoEntity = this.kpInfoEntity
            }else{
                this.addData.teachActivityEntity = this.teachActivityEntity
            }
            console.log(this.addData)
            
            if(this.graduationReqiureEntity.requireId || this.kpInfoEntity.kpiId || this.teachActivityEntity.id){
                kpinfoUpdate(this.addData).then((res) =>{
                    console.log(res)
                    if(res.code == 0){
                        this.$message.success('操作成功')
                        this.getDataFn()
                        this.handleClose()
                    }
                })
            }else{
                kpinfoSave(this.addData).then((res) =>{
                    console.log(res)
                    if(res.code == 0){
                        this.$message.success('操作成功')
                        this.getDataFn()
                        this.handleClose()
                    }
                })
            }
            
        },
        //编辑
        openDl(num,item){
            this.addData.type = num
            if(num == 1){
                this.dialogVisible = true
                this.graduationReqiureEntity.requireName = item.label
                this.graduationReqiureEntity.requireId = item.id
            }else if(num ==2){
                this.dialogkpInfo = true
                this.kpInfoEntity =JSON.parse(JSON.stringify(item)) 
                this.$set(this.kpInfoEntity,'kpiName',item.requireLable)
                //this.kpInfoEntity.kpiName = item.requireLable
            }else{
                this.dialogTeachActivity = true
                this.teachActivityEntity =JSON.parse(JSON.stringify(item)) 
                this.teachActivityEntity.kpiId = item.kpiId
                this.$set(this.teachActivityEntity,'courseTitle',item.label)
                //this.teachActivityEntity.courseTitle = item.label
            }
            console.log(this.teachActivityEntity)
        },
        //删除
        deleteDl(num,item){
            
            this.addData.type = num
            if(num == 1){
                this.addData.ids = [item.id]
            }else if(num ==2){
                this.addData.ids = [item.kpiId]
            }else{
                this.addData.ids = [item.id]
            }
            
            console.log(this.addData)
            this.$confirm('确认要删除当前数据吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                kpinfoDelete(this.addData).then((res) =>{
                    console.log(res)
                    if(res.code == 0){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getDataFn()
                        this.handleClose()
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        //合并单元格
        objectSpanMethod({ row, columnIndex }) {
        let mergeCell = row.mergeCell; //获取标识符（undefined为没有，0为被合并项）
        if (columnIndex < 2  ) {
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
        //上传
        exuploadFn(){
            this.isExcelTemplate = true
        },
        // Excel上传回调
        excelUpload(param) {
            this.isExcelTemplate = param
            this.getDataFn()
        },
    }
}
</script>

<style>

</style>