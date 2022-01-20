<template>
  <div id="app" v-cloak>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
    
  </div>
</template>
<script>
import {getMenuList} from '@/api'
export default {
  created(){
    getMenuList()
  }
}
</script>

<style lang="scss">
@import "assets/css/style";

</style>
