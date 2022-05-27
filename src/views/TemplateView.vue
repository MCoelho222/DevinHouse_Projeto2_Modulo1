<template>
  <div class="template">
    <proj-sidebar></proj-sidebar>
    <div class="router" :style="main">
      <proj-navbar></proj-navbar>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>

import SideBar from "../components/dashboard/SideBar"
import NavBar from '../components/dashboard/NavBar'
import { useCookies } from 'vue3-cookies'

const cookies = useCookies().cookies
export default {
  components: {
    "proj-sidebar": SideBar,
    'proj-navbar': NavBar
  },
  computed: {
    main() {
      return this.$store.getters['template/main']
    },
  },
  mounted() {
    if (cookies.get('logged') !== null) {
            if (cookies.get('logged').status === true) {
                this.$toast.info('Você está logado!', {position: 'top-right'})
            }
        }
  }
  
}
</script>
<style scoped>
.template {
  background-color: aliceblue;
  display: flex; 
  flex-direction: row; 
  /* width: 100vw; 
  height: 100vh; */
}
.router {
  display:flex;
  flex-direction:column;
}

</style>
