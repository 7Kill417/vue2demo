<template>
    <div class="first">
        <el-upload
            class="upload-demo"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            action="Preview"
            :on-exceed="handleExceed"
            :on-success="successPreview"
            :http-request="uploadPreview"
            :on-change="handleChange"
            :file-list="fileList">
            <el-button class="up" size="medium" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
                <slot name="rule">
                    <div style="">Excel格式，支持扩展名：.xls .xlsx</div>
                    <div style="">
                        <a :href="downSrc" target="_blank" style="color: #28BE88">下载模板</a>
                    </div>
                </slot>
            </div>
        </el-upload>
    </div>
</template>

<script>

export default {
    name: 'first',
    data () {
        return {
            isExcelTempletes: this.isExcelTemplete,
            fileList: [],
            merchbillId:'',
            quotationId:'',
            downSrc:'',//下载模板路径
            warningInfo:'',
            uploadName:'',
        }
    },
    created(){

    },
    mounted(){

    },
    methods: {
        uploadPreview(option){
            this.$store.commit("ExcelTemplete/getFile", option.file);
        },
        successPreview(response, file, fileList){
            this.$emit('getUsingPriceExcelFile',fileList[0])
        },
        handleRemove() {},
        handleExceed(files) {
            this.fileList[0] = files
        },
        handleChange(file, fileList) {
            if (fileList.length > 0) {
                this.fileList = [fileList[fileList.length - 1]]  // 这一步，是 展示最后一次选择的csv文件
            }
        },
        beforeRemove(file) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        }
    },
}
</script>

<style scoped>
    .first{
        padding-top: 15px;
        text-align: center;
    }
    .up{
        width: 400px;
    }
    .upload-demo{
        text-align: center;
    }
    .el-upload__tip{

    }
</style>
