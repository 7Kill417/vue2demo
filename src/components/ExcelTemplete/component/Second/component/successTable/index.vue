<template>
  <form id="abc">
    <el-table
            :data="tableData"
            border
            :stripe="true"
            highlight-current-row
            style="width: 100%">
      <el-table-column  type="index" label="序号" width="150">
      </el-table-column>

      <el-table-column prop="goodsCode" label="商品编码"> </el-table-column>

      <el-table-column prop="znGoodsNo" label="中农编码"> </el-table-column>

      <el-table-column prop="lgGoodsNo" label="龙岗教育编码">
      </el-table-column>
 
      <el-table-column prop="buyerCategoryName" label="商品分类"> </el-table-column>

      <el-table-column prop="goodsName" label="商品名称"> </el-table-column>
    
      <el-table-column prop="standardName" label="规格属性"> </el-table-column>

      <el-table-column prop="unitName" label="单位"> </el-table-column>

      <el-table-column prop="goodsprice" label="默认单价"> </el-table-column>
   
      <el-table-column prop="error_text" label="异常信息"> 
         <template slot-scope="scope">
        <span style="color: red">{{ scope.row.error_text }}</span>
      </template>
      </el-table-column>

     
    </el-table>
  </form>
</template>

<script>
export default {
  name: "successTable",
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    this.tableData = this.$store.state.ExcelTemplete.dataInfo.errorItems;
  },
};
</script>

<style scoped>
#abc {
  height: 500px;
  overflow: auto;
}
</style>