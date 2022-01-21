<template>
  <div>
    <el-menu
      class="el-menu-vertical-demo"
      :default-active="$route.path"
      @open="handleOpen" 
      @close="handleClose"
      @select='selectFn'
      :collapse="isCollapse"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-s-operation"></i>
          <span slot="title">达成度管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/curriculum">课程质量评价</el-menu-item>
          <el-menu-item index="/targetEvaluate">指标达成度</el-menu-item>
          <el-menu-item index="/graduation">毕业要求达成度</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isCollapse: false
      };
    },
    created(){
      console.log(this.$route)
    },
    methods: {
        handleOpen() {
            //console.log(key, keyPath);
        },
        handleClose() {
            //console.log(key, keyPath);
        },
        selectFn(index,indexPath){
            console.log(index,indexPath)
            this.$router.push({
                path:index
            })
        }
    }
  }
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 100%;
  }
</style>