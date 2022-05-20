<template>
    <div class="container">
    <h1>Template</h1>
    <router-link to="/">Back to Login</router-link>
        <router-view></router-view>
    </div>
</template>
<script>
// import SideBar from '../components/dashboard/SideBar'
// import NavBar from '../components/dashboard/NavBar'
export default {
    components: {
        // 'proj-sidebar': SideBar,
        // 'proj-navbar': NavBar
    },
    data() {
        return {

        }
    },
    methods: {

    },
    computed: {

    },
    
}
</script>
<style scoped>

</style>