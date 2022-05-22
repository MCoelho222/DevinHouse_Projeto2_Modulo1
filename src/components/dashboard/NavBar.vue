<template>
<div class="navbar-div" style="display: flex; flex-direction: row; justify-content: space-between">

    <div id="title">
        <p>{{path}}</p>
    </div>

    <div id="user">
        <span>Marcelo Coelho</span>
        <vue-gravatar :email="user.email" :size="50" />
    </div>

</div>
</template>
<script>
import { useCookies } from 'vue3-cookies'

const cookies = useCookies().cookies

export default {
    data() {
        return {
            user: {email: 'user@user.com'}
        }
    },
    computed: {
        // Retorna o nome da rota atual
        path() {
            try {
                let pathInfo = this.$router.currentRoute.value.fullPath
                console.log(pathInfo)
                let currPath = pathInfo.split('/')[2]
                console.log(currPath)
                return currPath.charAt(0).toUpperCase() + currPath.slice(1)
            } catch (e) {
                let pathInfo = this.$router.currentRoute.value.fullPath
                console.log(pathInfo)
                let currPath = pathInfo.split('/')[1]
                console.log(currPath)
                return currPath.charAt(0).toUpperCase() + currPath.slice(1)
            }
            
        },
    },
    mounted() {
        this.user = cookies.get('logged').email
    }
}
</script>
<style scoped>
.navbar-div {
    padding-left: 20px;
    padding-right: 20px;
    background-color:rgb(0, 56, 139);
}
p {
    color: rgb(7, 201, 239);
    font-size: 1.5em;
    margin: 0;
    margin-top: 10px;
    margin-bottom: 10px;
}
span {
    color: rgb(7, 201, 239);
    margin-right: 4px;
}
</style>