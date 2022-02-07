<template>
  <div class="home" v-cloak>
    <el-container>
      <el-header style="padding: 0" height="60">
        <vheader></vheader>
      </el-header>
      <el-container>
        <vSide></vSide>
        <el-main>
          <div style="margin-bottom:10px">
            <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
          </el-breadcrumb>
          </div>
          <div class="admin">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import vheader from "@/components/header/index";
import vSide from "@/components/side/index";
export default {
  name: "Home",
  components: {
    vheader,
    vSide,
  },
  created(){
    console.log(this.$route.meta.title)
  }
};
</script>
<style scoped lang="scss">
.el-container {
  height: calc(100vh - 60px) ;
  .admin {
    height:calc(100% - 24px);
    box-shadow: 0 0 5px #dee1e6;
    padding: 5px;
    box-sizing: border-box;
  }
  .el-main {
    padding: 10px;
    box-sizing: border-box;
  }
}
</style>
