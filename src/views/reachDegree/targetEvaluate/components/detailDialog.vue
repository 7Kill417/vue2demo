<template>
    <div>
        <el-dialog
            :title= title
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <div>
                <el-form ref="fromData" :model="fromData" label-width="90px">
                    <el-form-item label="学生编码:" prop='stuNo'>
                        <el-input v-model="fromData.stuNo" :disabled="fromData.id!=''"></el-input>
                    </el-form-item>
                    <el-form-item label="学生名称:" prop='studentName'>
                        <el-input v-model="fromData.studentName" :disabled="fromData.id!=''"></el-input>
                    </el-form-item>
                    <el-form-item label="教学目标1对应指标点1.1" prop='achieveLevel'> 
                        <el-input v-model="fromData.achieveLevel"></el-input>
                    </el-form-item>
                    <el-form-item label="教学目标2对应指标点3.1:" prop='kpi'> 
                        <el-input v-model="fromData.kpi"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="saveDetail">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {achievelevelInfo,achievelevelUpdate,achievelevelSave} from '@/api'

export default {
    data(){
        return{
            dialogVisible : false,
            title:'',
            fromData:{
                "id": '',
                "teachTarget": "",
                "stuNo": "",
                "achieveLevel": '',
                "courseId": '',
                "kpi": "",
                "createTime": ""
            }
        }
    },
    methods:{
        openDia(item){
            this.dialogVisible = true
            if(item){
                this.title = '修改课程达成度'
                achievelevelInfo({id:item.id}).then((res) =>{
                    if(res.code == 0){
                        this.fromData = res.achieveLevel
                    }else{
                        this.$message.error(res.msg);
                    }
                })
            }else{
                this.title='新增课程达成度'
                
            }
        },
        //确定！
        saveDetail(){
            console.log(this.fromData.id)
            if(this.fromData.id){
                achievelevelUpdate(this.fromData).then((res) =>{
                    console.log(res)
                    if(res.code == 0){
                        this.$message.success('操作成功');
                        this.dialogVisible = false
                        this.$emit('closeAddDia',1)
                    }else{
                        this.$message.error(res.msg);
                    }
                })
            }else{
                achievelevelSave(this.fromData).then((res) =>{
                    console.log(res)
                })
            }
        },
        //关闭弹框
        handleClose(){
            this.dialogVisible = false
            this.$refs['fromData'].resetFields();
            this.fromData.id = ''   //因为id不在from表单内 手动清除
            this.$emit('closeAddDia')
        }
    }
}
</script>

<style>

</style>