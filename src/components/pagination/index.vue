<template>
    <div class="page-box">
        <div class="page-left">
            共
            <span class="numcl">{{total}}</span> 条记录，当前显示第
            <span class="numcl">{{currentPage}}</span> 页
        </div>
        <div class="page-right">
            <el-pagination
                    :current-page.sync="currentPage"
                    :page-size.sync="pageSize"
                    :layout="layout"
                    :page-sizes="pageSizes"
                    :total="total"
                    v-bind="$attrs"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"/>
            <div class="pageTo">跳转至
              <el-input size="mini" v-model.number="pageTo" @focus="focus($event)" 
              oninput="value=value.replace(/^\.+|[^\d.]/g,'')" 
              @keyup.enter.native="handlePageTo" placeholder="请输入内容">
              </el-input>页
              <el-button @click="handlePageTo" size="small">确定</el-button>
            </div>
        </div>
    </div>
</template>

<script>

  export default {
    name: 'Pagination',
    props: {
      total: {
        required: true,
        type: Number
      },
      page: {
        type: Number,
        default: 1
      },
      limit: {
        type: Number,
        default: 20
      },
      pageSizes: {
        type: Array,
        default () {
          return [this.limit, 50, 100]
        }
      },
      layout: {
        type: String,
        default () {
          return 'sizes, prev, pager, next'
        }
      }
    },
    data () {
      return {
        pageTo: this.page
      }
    },
    watch: {
      page:{//深度监听，可监听到对象、数组的变化
        handler(val){
          this.pageTo = val
        },
        deep:true //true 深度监听
      }
    },
    computed: {
      currentPage: {
        get () {
          return this.page
        },
        set (val) {
          this.$emit('update:page', val)
        }
      },
      pageSize: {
        get () {
          return this.limit
        },
        set (val) {
          this.$emit('update:limit', val)
        }
      }
    },
    methods: {
      handleSizeChange (val) {
        this.$emit('pagination', { page: this.currentPage, limit: val })
      },
      handleCurrentChange (val) {
        this.$emit('pagination', { page: val, limit: this.pageSize })
      },
      handlePageTo () {
        this.$emit('update:page', this.pageTo)
        this.$emit('pagination', { page: this.pageTo, limit: this.pageSize })
      },
      focus(event) {
        event.currentTarget.select();
      }
    }
  }
</script>
<style scoped lang="scss">
.page-box {
  z-index: 20;
  padding: 10px 20px;
  background: #fff;
  justify-content: space-between;
  align-items: center;
  border-left: 1px solid #eaeaea;
  border-right: 1px solid #eaeaea;
  border-bottom: 1px solid #eaeaea;
  font-size: 13px;
  overflow: hidden;
  .page-left {
    color: #595959;
    float: left;line-height: 30px;
    .numcl {
      color: #CE0100;
    }
  }
  .page-right {
    position: relative;
    padding-right: 180px;
    // .el-button {
    //   height: 28px;
    //   margin-top: 3px;
    // }
    .pageTo{
      position: absolute;right: 0;top: 2px;
      .el-input{
        display: inline-block;width: 45px;margin: 0 5px;
        input{text-align: center;}
      }
      .el-button{margin-left: 5px;}
    }
    .el-pagination {
      text-align: right;overflow: hidden;
      .el-pagination__sizes{float: left;}
      .el-select .el-input{width: 80px;text-align: left;}
      button {
        border: 1px solid #e8e8e8;
        &:first-child {
          border-radius: 3px 0px 0px 3px;
        }
        &:last-child {
          border-radius: 0px 3px 3px 0px;
        }
      }
      .el-pager {
        li {
          border: 1px solid #e8e8e8;
          border-left: transparent;
          font-weight: normal;
          &:last-child {
            border-right: transparent;
          }
        }
        .active {
          color: #ffff;
          cursor: default;
          background: #ED991B;
        }
      }
    }
  }
}
</style>
