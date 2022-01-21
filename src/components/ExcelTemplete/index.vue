<template>
  <div class="ExcelTemplete" id="ExcelTemplete">
    <el-dialog :title="title" :visible.sync="handelIsExcelTemplete" @closed='closeIsExcelTemplete'  >
      <div v-loading="">
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
          <el-button type="primary" @click="uploadQuotationListDetail" v-if="activeNum ==1" >下一步</el-button>
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
      this.title = "课程质量评价导入";
    }else {
      this.title = "导入";
    }
    Bus.$on("val", (data) => {
      this.merchbillId = data;
    });
    Bus.$on("quotationId", (data) => {
      this.quotationId = data;
    });
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
      this.loading = true;
      this.activeNum = 2;
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
        formData.append("purchaseBillExcelFile", file);
        formData.append("merchbillId", this.merchbillId);
        this.loading = true;
        
        this.$upload
          .post("/purchasingList/importPurchaseBill", formData)
          .then((res) => {
            if (res.data.result.success) {
              this.activeNum = 2;
              //this.$store.commit("ExcelTemplete/getnextStep", true);
              this.$store.commit("ExcelTemplete/getDataInfo", res.data.data);
              this.loading = false;
            } else {
              this.$message({
                type: "error",
                message: res.data.result.message,
              });
            }
          })
      }
      if (path === '/quoteInventory') {
        let formData = new FormData();
        this.loading = true;
        formData.append('quotationListId', this.quotationId)
        formData.append("quotationExcelFile", file)
        this.$upload.post("/quotationList/importQuotation", formData).then((res) => {
          if (res.data.result.success) {
            this.activeNum = 2;
            this.$store.commit("ExcelTemplete/getDataInfo", res.data.data);
            this.loading = false;
            Bus.$emit('quoteInventoryFn')
          } else {
            this.$message({
              type: "error",
              message: res.data.result.message,
            });
            this.loading = false;
          }
        }).catch(() => {
          this.$message({
            message: "获取信息失败",
            type: "error",
          });
          this.loading = false;
        });
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
