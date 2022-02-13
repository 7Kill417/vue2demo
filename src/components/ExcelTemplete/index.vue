<template>
  <div class="ExcelTemplete" id="ExcelTemplete">
    <el-dialog :title="title" :visible.sync="handelIsExcelTemplete" @close='closeIsExcelTemplete' :show-close="false"  >
      <div v-loading="loading">
        <div> 
          <el-steps :active="activeNum" align-center>
            <el-step title="导入" icon="el-icon-upload"></el-step>
            <el-step title="完成" icon="el-icon-check"></el-step>
          </el-steps>
        </div>
        <First v-if="activeNum == 1" @getUsingPriceExcelFile="getUsingPriceExcelFile" :quotationId="quotationIds"/>
        <Second v-else-if="activeNum == 2" :successData="successData"></Second>
        
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="closeIsExcelTemplete">关闭</el-button>
          <el-button type="primary" @click="uploadQuotationListDetail" v-if="activeNum ==1" v-loading="loading" >下一步</el-button>
          <el-button type="primary" @click="againFn"  v-if="activeNum == 2" >重新上传</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import First from "./component/First";
 import Second from "./component/Second";
import Bus from "@/components/bus.js";
// import bus from '../bus';

export default {
  name: "ExcelTemplete",
  data() {
    return {
      activeNum: 1, // 完成进度显示
      usingPriceExcelFile: "", //文件名
      successData: [], //成功数据
      title: "",
      merchbillId: "",
      quotationId: "",
      loading: false,
      height:500
    };
  },
  created() {
    if (this.$route.path === "/curriculum") {
      this.title = "课程达成度导入";
    }else if( this.$route.path === "/CourseInformation"){
      this.title = "课程信息导入";
    }else{
      this.title = "指标点达成度导入";
    }
  },
  props: {
    isExcelTemplete: {
      type: Boolean,
      default: false,
    },
    quotationIds: {
      type: Number,
    },
  },
  methods: {
    getUsingPriceExcelFile(data) {
      console.log(data)
      this.usingPriceExcelFile = data.name;
    },
    uploadQuotationListDetail() {
      let path = this.$route.path;
      let file = this.$store.state.ExcelTemplete.file;
      if (file.constructor === Object) {
        return this.$message({
          type: "warning",
          message: "请选择文件",
        });
      }
      if (path === "/curriculum") {
        let formData = new FormData();
        formData.append("file", file);
        // formData.append("merchbillId", this.merchbillId);
        this.loading = true;
        this.$upload.post("/achievelevel/importAchievelevel",formData )
          .then((res) => {
            this.loading = false;
            if (res.data.code == 0 ) {
              this.activeNum = 2;
              //this.$store.commit("ExcelTemplete/getnextStep", true);
              this.$store.commit("ExcelTemplete/getDataInfo", res.data.data);
              this.$message({
                type: "success",
                message: '上传成功',
              });
            } else {
              this.$message({
                type: "error",
                message: res.data.msg,
              });
            }
          })
      }
      if (path === '/CourseInformation') {
        let formData = new FormData();
        this.loading = true;
        formData.append("file", file)
        this.$upload.post("/graduationreqiure/import", formData).then((res) => {
          this.loading = false;
          if (res.data.code == 0) {
            this.activeNum = 2;
            //this.$store.commit("ExcelTemplete/getDataInfo", res.data.data);
            Bus.$emit('quoteInventoryFn')
          } else {
            this.$message({
              type: "error",
              message: res.data.msg,
            });
          }
        }).catch(() => {
          this.$message({
            message: "获取信息失败",
            type: "error",
          });
        });
      }
      if (path === "/targetEvaluate") {
        let formData = new FormData();
        formData.append("file", file);
        // formData.append("merchbillId", this.merchbillId);
        this.loading = true;
        this.$upload.post("/course/importCourselevel",formData )
          .then((res) => {
            this.loading = false;
            if (res.data.code == 0 ) {
              this.activeNum = 2;
              //this.$store.commit("ExcelTemplete/getnextStep", true);
              this.$store.commit("ExcelTemplete/getDataInfo", res.data.data);
              
              this.$message({
                type: "success",
                message: '上传成功',
              });
            } else {
              this.$message({
                type: "error",
                message: res.data.msg,
              });
            }
          })
      }
    },
    closeIsExcelTemplete() {
      this.activeNum = 1;
      this.$emit("bubblingIsExcelTemplete", false);
    },
    againFn(){
      this.activeNum = 1;
    },
  },
  computed: {
    handelIsExcelTemplete() {
      return this.isExcelTemplete;
    },
  },
  components: {
    First,
    Second,
  },
};
</script>

<style scoped>

</style>
