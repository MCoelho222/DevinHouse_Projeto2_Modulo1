<template>
<div class="side-bar" :style="sidebar">
        <div class="sb-icon" v-show="toggleSideBar">
            <img src="../../assets/InventaryLogonobg.png" alt="DevInventary Logo">
        </div>
        <div class="btn-div" v-show="toggleSideBar">
            <div class="sb-btns">
                <label for="">Geral</label>
                <button type="button" class="btn btn-outline-info" @click="inventario">
                <i class="fa-solid fa-chart-simple"></i> 
                Inventário</button>
                <button type="button" class="btn btn-outline-info" @click="sair">
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
                Sair</button>
            </div>
            <div class="sb-btns">
                <label for="">Colaboradores</label>
                <button type="button" class="btn btn-outline-info" @click="cadastraUser">
                <i class="fa-solid fa-user-plus"></i>
                Cadastrar</button>
                <button type="button" class="btn btn-outline-info" @click="listaUsers">
                <i class="fa-solid fa-list"></i> 
                Listar</button>
            </div>
            <div class="sb-btns">
                <label for="">Produtos</label>
                <button type="button" class="btn btn-outline-info" @click="cadastraItens">
                <i class="fa-solid fa-user-plus"></i>
                Cadastrar</button>
                <button type="button" class="btn btn-outline-info" @click="emprestaItens">
                <i class="fa-solid fa-share-nodes"></i>
                Emprestar</button>
            </div>
        </div>
        <div id="toggler" style="display: flex; justify-content: end">
            <label class="switch">
                <input type="checkbox" @click="controlSideBar">
                <span class="slider round"></span>
            </label>
        </div>
    </div>
</template>
<script>
// import { useCookies } from 'vue3-cookies'
// const cookies = useCookies().cookies
export default {
  data() {
    return {
      //sidebarWidth: 300,
      //toggleSideBar: true,
      //alreadyLogout: this.$store.getters['auth/alreadyLogout']
      //logoutMsg: this.$store.state.auth.logoutMsg
    }
  },
  methods: {
    controlSideBar() {
      this.$store.commit('template/controlSideBar')
      // if (this.toggleSideBar) {
      //   this.sidebarWidth = 70
      //   this.toggleSideBar = false
      // } else {
      //   this.sidebarWidth = 300
      //   this.toggleSideBar = true
      // }
    },
    inventario() {
      this.$router.push('/users/inventario')
    },
    sair() {
      this.$store.commit('auth/logOutUser')
      this.$toast.success(this.$store.getters['auth/setLogoutMsg'])
      this.$router.push('/')
    },
    cadastraUser() {
      this.$router.push('/users/cadastro-usuario')
    },
    listaUsers() {
      this.$router.push('/users/lista-usuarios')
    },
    cadastraItens() {
      this.$router.push('/users/cadastro-item')
    },
    emprestaItens() {
      this.$router.push('/users/emprestar')
    }
  },
  computed: {
    sidebar() {
      return this.$store.getters['template/sidebar']
      // return `width: ${this.sidebarWidth}px; height: 100vh; display: flex; flex-direction: column; justify-content: space-around`
    },
    toggleSideBar() {
      return this.$store.state.template.toggleSideBar
    },
    // logoutMsg() {
      
    // }
  },
}
</script>
<style scoped>
label {
    color: rgb(7, 201, 239);
}
button {
    text-align: left;
    font-size: small;
}
#toggler {
    position:absolute;
    bottom: 0;
    left: 0;
}
#sb-fa-icon {
    color: #2196F3;
}
.side-bar {
    background-color:rgb(0, 56, 139);
    padding-right: 10px;
}
.btn-div {
    
}
.sb-btns {
    display: grid;
    text-align: left;
    padding-left: 10%;
    padding-right: 10%;
    gap:5px;
    margin-bottom: 30px;
}

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color:aliceblue;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  background-color: rgb(7, 201, 239);
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color:aliceblue;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}



.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

</style>