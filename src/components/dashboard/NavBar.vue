<template>
<div class="navbar-div" style="display: flex; flex-direction: row; justify-content: space-between">
<div id="title">
<p> {{path}}</p>
</div>
<div id="user">
<span>Marcelo Coelho</span>
<vue-gravatar :email="user.email" :size="50" />
</div>
</div>
</template>
<script>
//import md5 from "md5"

export default {
    data() {
        return {
            user: {email: 'mcoelho2011@hotmail.com'}
        }
    },
    computed: {
        path() {
            let pathInfo = this.$router.currentRoute.value.fullPath
            let currPath = pathInfo.split('/')[2]
            return currPath.charAt(0).toUpperCase() + currPath.slice(1)
        },
        // gravatar() {
        //     const hash = md5(this.user.email.trim().toLowerCase());
        //     return `https://www.gravatar.com/avatar/${hash}`;
        // }
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