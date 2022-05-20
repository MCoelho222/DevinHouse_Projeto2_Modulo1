<template>
    <div class="container center_div">
    <router-link to="/users">Voltar</router-link>
        <login-form id="loginform" @submit="auth" :validation-schema="schema" v-slot="{ errors }">
            <div class="mb-3">
                <label class="form-label">Email address</label>
                <login-field type="email" class="form-control" name="email" v-model="user.email"/>
                <span class="text-danger" v-text="errors.email" v-show="showMailError"></span>
            </div>
            <div class="mb-3">
                <label class="form-label">Password</label>
                <login-field type="password" class="form-control" name="password" v-model="user.password"/>
                <span class="text-danger" v-text="errors.password" v-show="showPassError"></span>
            </div>
            <button class="btn btn-secondary" type="button" @click="cleanForm">Limpar</button>
            <button type="submit" class="btn btn-primary">Entrar</button>
        </login-form>
        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Criar conta</button>
        <button class="btn btn-secondary" @click="google">Entrar com Google</button>
        <router-link to="/">Esqueceu a senha?</router-link>
        <ModalNewAccount></ModalNewAccount>
    </div>
</template>
<script>
import { Form, Field } from 'vee-validate'
import rules from '../validations/validateusers'
import { useCookies } from 'vue3-cookies'
import ModalNewAccount from './ModalNewAccount.vue'

const cookies = useCookies().cookies
rules.required

export default {
    data() {
        return {
            schema: {
                email: 'required',
                password: 'required',
            },
            user: {}
        }
    },
    components: {
    "login-form": Form,
    "login-field": Field,
    ModalNewAccount
},
    methods: {
        auth() {
            // Se usuário já logado, redireciona para template
            if (cookies.get('logged') === 'true') {
                this.$router.push('/users')
            } else { //Caso contrário, segue para autenticar
                this.$store.commit('auth/authUser', {...this.user})
                // Se usuário for autenticado, haverá "{logged: true} nos cookies"
                let cond = useCookies().cookies.get('logged')
                if(cond === 'true') {
                    this.$toast.success('Bem-vindo, usuário!')
                    // Direciona usuário para as funcionalidadesd a página
                    this.$router.push('/users')
                }
                if(cond === null) {
                    // Mostra mensagem referente ao tipo de erro
                    this.$toast.error(this.$store.state.auth.errorMsg)
                }  
            }
            let form = document.getElementById('loginform')
            form.reset()
        },
        cleanForm() {
            let form = document.getElementById('loginform')
            form.reset()
        }
    },
    computed: {
        showMailError() {
            // Torna a visualização da mensagem de erro responsiva
            if (this.user.email) {
                if (this.user.email.length > 0) {
                    return false
                }
            }
            return true
        },
        showPassError() {
            // Torna a visualização da  mensagem de erro responsiva
            if (this.user.password) {
                if (this.user.password.length > 0) {
                    return false
                }
            }
            return true
        },
    },
    mounted() {
        // Criar uma lista vazia no localstorage, caso esteja vazio
        if (localStorage.getItem('users') === null) {
            let users = []
            localStorage.setItem('users', JSON.stringify(users))
        }
        if (cookies.get('logged') === 'true') {
            this.$toast.warning('Você já está logado!')
        }
    }
}
</script>
<style scoped>
.btn {
    margin: 4px;
}
.center_div{
    margin: 0 auto;
    width:45% /* value of your choice which suits your alignment */
}
</style>