<template>
  <div class="template" style="display: flex; flex-direction: row; width: 100vw; height: 100vh">
    <proj-sidebar></proj-sidebar>
    <div class="router-template" :style="main">
      <proj-navbar></proj-navbar>
      <router-link to="/">Back to Login</router-link>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>

import SideBar from "../components/dashboard/SideBar";
import NavBar from '../components/dashboard/NavBar'
export default {
  components: {
    "proj-sidebar": SideBar,
    'proj-navbar': NavBar
  },
  computed: {
    main() {
      return this.$store.getters['template/main']
    },
  }
  
};
</script>
<style scoped>

</style>
