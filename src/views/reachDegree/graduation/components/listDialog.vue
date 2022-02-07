<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="700px"
      :before-close="handleClose">
      <div>
        <el-form ref="fromData" :model="fromData"  :inline="true" label-width="90px">
          <el-form-item label="指标点">
            <el-input v-model="fromData.kpi" style="width:200px" size="small" placeholder="请输入指标点"></el-input>
          </el-form-item>
          <el-form-item label="指标点名称">
            <el-input v-model="fromData.kpiName" style="width:200px" size="small" placeholder="请输入指标点名称"></el-input>
          </el-form-item>
        </el-form>
        <p>相关教学活动</p>
        <div>
              <el-table
              max-height="400px"
              :data="fromData.activityEntityList"
              style="width: 100%">
              <el-table-column
                prop="courseTitle"
                label="相关教学活动名称"
                >
                <template slot-scope="scope">
                  <el-input v-model="scope.row.courseTitle" size="small"  placeholder="请输入相关教学活动名称"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="weight"
                label="权重值"
                width="80">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.weight" size="small"  placeholder="请输入权重值"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="achieveLevel"
                label="达成度"
                width="120">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.achieveLevel" size="small"  placeholder="请输入达成度"></el-input>
                </template>
              </el-table-column>
              <el-table-column column-key="status" label="操作" width="65" fixed="right">
                <template slot-scope="scope">
                    <el-button  title="删除" style="color:red" icon="el-icon-delete" size="small" @click="detelFn(scope.row,scope.$index)"></el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button size="mini" @click="addListFn" style="width:100%">添加数据</el-button>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="saveDataFn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {kpinfoSave,kpinfoUpdate,graduationreqiureDelete } from '@/api'
export default {
  props:['requireId'],
  data(){
    return{
      input:'',
      dialogVisible:false,
      fromData:{
        requireId:'', //毕业要求id
        kpi:'',
        kpiName:'',
        delFlag:null,
        totalResult:2000,
        activityEntityList:[]
      }
    }
  },
  methods:{
    handleClose(){
      this.fromData={
        requireId:'', //毕业要求id
        kpi:'',
        kpiName:'',
        delFlag:null,
        totalResult:2000,
        activityEntityList:[]
      }
      //this.fromData.requireId = requireId
      this.dialogVisible = false
    },
    opendl(item,num){
      this.fromData.requireId = this.requireId
      console.log(item,num)
      if(num >=0){
        this.fromData =JSON.parse(JSON.stringify(item[num])) 
        console.log(this.fromData)
      }
      this.dialogVisible = true
    },
    //新增一条数据
    addListFn(){
      this.fromData.activityEntityList.push({
        courseTitle:'',
        weight:'',
        achieveLevel:'',
        id:'',
        kpi:'',
      })
    },
    //确定
    saveDataFn(){
      console.log(this.fromData)
      if(this.fromData.kpiId){
        this.upFn()
      }else{
        this.saveFn()
      }
      
    },
    //新增
    saveFn(){
      kpinfoSave(this.fromData).then((res) =>{
        if(res.code == 0){
          this.$message({
            message: '操作成功',
            type: 'success'
          });
          this.handleClose()
          this.$emit('sucFn')
        }else{
          this.$message({
            message: res.msg,
            type: 'error'
          });
        }
      })
    },
    //修改
    upFn(){
      kpinfoUpdate(this.fromData).then((res) =>{
        if(res.code == 0){
          this.handleClose()
          this.$message({
            message: '操作成功',
            type: 'success'
          });
          this.$emit('sucFn')
        }else{
          this.$message({
            message: res.msg,
            type: 'error'
          });
        }
      })
    },
    //删除
    detelFn(item,index){
      console.log(item,index)
      if(item.id){
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = [item.id]
          graduationreqiureDelete(data).then((res) =>{
            console.log(res)
            if(res.code == 0){
              this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.fromData.activityEntityList.splice(index,1)
            this.$emit('sucFn')
            }else{
              this.$message({
              type: 'error',
              message:res.msg
            });
            }
            
          })
          
        })
      }else{
        this.fromData.activityEntityList.splice(index,1)
      }
    }
  }
}
</script>

<style>

</style>