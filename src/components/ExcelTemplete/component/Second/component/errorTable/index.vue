<template>
  <form id="abc">
    <pl-table :data="tableData" border :stripe="true" 
              use-virtual
              highlight-current-row
              :row-height="20"
              :height="height"
              style="width: 100%">
      <pl-table-column type="index" label="序号"  width="50"/>
      <pl-table-column prop="goodsNo" label="商品编码"/>
      <pl-table-column prop="cookbookCode" label="菜品编号"/>
      <pl-table-column prop="goodsName" label="商品名称"/>
      <pl-table-column prop="cookbookName" label="菜品名称" v-if="cookbook"/>
      <pl-table-column prop="znGoodsNo" label="中农编码" v-if="!cookbook"/>
      <pl-table-column prop="lgGoodsNo" label="龙岗教育编码" v-if="!cookbook"/>
      <pl-table-column prop="categoryName" label="菜品分类"/>
      <pl-table-column prop="cuisineName" label="所属菜系" v-if="cookbook"/>
      <pl-table-column prop="property" label="规格属性"/>
      <pl-table-column prop="foodType" label="食材类型" v-if="cookbook"/>
      <pl-table-column :prop="cookbook?'usageUnitType':'unitName'" label="单位" width="70"/>
      <pl-table-column prop="error_text" label="异常信息">
        <template slot-scope="scope">
          <span style="color: red" v-if="scope.row.error_text">{{ scope.row.error_text }}</span>
          <span style="color: red" v-if="scope.row.errorMsg">{{scope.row.errorMsg}}</span>
        </template>
      </pl-table-column>
    </pl-table>
  </form>
</template>

<script>
import { PlTable, PlTableColumn } from 'pl-table';
import { getViewPortHeight } from '@/config/utils'
export default {
  components: { PlTable, PlTableColumn },
  name: "successTable",
  data() {
    return {
      tableData: [],
      cookbook: false,
      height: getViewPortHeight()-500 
    };
  },
  created(){
    console.log( getViewPortHeight())
  },
  mounted() {
    if (this.$route.path === '/foodManage') {
      this.tableData = this.$store.state.ExcelTemplete.dataInfo.errorList
      this.cookbook = true
    } else {
      this.cookbook = false
      this.tableData = this.$store.state.ExcelTemplete.dataInfo.errorItems
    }
  },
};
</script>

<style scoped>
#abc {
  /* height: 500px; */
  overflow: auto;
}
</style>