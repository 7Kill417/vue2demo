<template>
  <div class="home" v-cloak>
    <el-container>
      <el-header style="padding: 0" height="60">
        <vheader></vheader>
      </el-header>
      <el-container>
        <vSide></vSide>
        <el-main>
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
};
</script>
<style scoped lang="scss">
.el-container {
  height: 100vh;
  .admin {
    height: 100%;
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
