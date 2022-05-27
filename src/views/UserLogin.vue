<template>
    <div>
        <div class="row">

            <div class="col-7">
                <div class="container">
                    <img id="inventory-img" src="../assets/loginimg.png" alt="Inventário">
                </div>
                <div class="lab365">
                    <img id="lab365-img" src="../assets/lab365logo.png" alt="LAB365">
                </div>
            </div>

            <div class="col-5">
                <div class="container">
                    <div class="criar-conta">
                        <span>Não possui uma conta?</span>
                        <button 
                        class="btn btn-outline-info" 
                        data-bs-toggle="modal" 
                        data-bs-target="#newAccountModal">
                        Criar conta</button>
                    </div>
                    <div class="form">
                        <h2>Login</h2>
                        <login-form id="loginform" @submit="auth" :validation-schema="schema" v-slot="{ errors }">
                            <div class="mb-3">
                                <label class="form-label">Email</label>
                                <login-field type="email" class="form-control" name="email" v-model="user.email"/>
                                <span class="text-danger" v-text="errors.email" v-show="showMailError"></span>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Senha</label>
                                <login-field type="password" class="form-control" name="password" v-model="user.password"/>
                                <span class="text-danger" v-text="errors.password" v-show="showPassError"></span>
                            </div>
                            <button class="btn btn-outline-info" type="button" @click="cleanForm">Limpar</button>
                            <button type="submit" class="btn btn-primary">Entrar</button>
                        </login-form>
                        <div class="alternative">
                            <button id="google" class="btn btn-outline-info" @click="inProgress">Entrar com Google</button>
                            <p><router-link to="/" @click="inProgress">Esqueceu a senha?</router-link></p>
                        </div>
                    </div>
                </div>
                <div class="logo">
                    <img id="dev-inv-img" src="../assets/devinventorylogo.png" alt="Devinventory logo">
                </div>
            </div>
        </div>
        <ModalNewAccount></ModalNewAccount>
    </div>
</template>
<script>
import { Form, Field } from 'vee-validate'
import rules from '../validations/validateusers'
import { useCookies } from 'vue3-cookies'
import ModalNewAccount from './ModalNewAccount.vue'

const cookies = useCookies().cookies
rules

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
            //Cookie contém nome, email e status: true ou false
            let confirm = cookies.get('logged')
            // Caso já exista um cookie com  status: true
            if (confirm !== null) {
                if (confirm.status === true) {
                    this.$router.push('/users/inventario')
                } else {
                    // Se status: false envia para autenticação
                    this.$store.commit('auth/authUser', {...this.user})
                    // Verifica o cookie novamente
                    confirm = cookies.get('logged')
                    if(confirm.status === true) {
                        // Pega o primeiro nome do usuário
                        let name = confirm.name.split(' ')[0]
                        this.$toast.success(`Bem-vindo, ${name}`)
                        // Direciona usuário para template
                        this.$router.push('/users/inventario')
                    } else {
                        // Se status: false ou não autenticou, mostra msg
                        this.$toast.error(this.$store.state.auth.errorMsg)
                    }
                }
            }
            // Se o cookie estiver logged estiver vazio, segue para autenticar
            if (confirm === null) { 
                this.$store.commit('auth/authUser', {...this.user})
                confirm = cookies.get('logged')
                    if(confirm.status === true) {
                        this.$toast.success('Bem-vindo, usuário!')
                        // Direciona usuário para o inventario
                        this.$router.push('/users/inventario')
                    } else {
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
        },
        inProgress() {
            window.alert('Pedimos desculpas...as funcionalidades "Entrar com Google" e "Esqueceu senha?" estão em construção.')
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
        if (localStorage.getItem('itens') === null) {
            let itens = []
            localStorage.setItem('itens', JSON.stringify(itens))
        }
        if (cookies.get('logged') !== null) {
            if (cookies.get('logged').status === true) {
                this.$router.push('/users')
                this.$toast.success('Você já está logado!', {position: 'top-right'})
            }
        }
        
    }
}
</script>
<style scoped>
/* Coluna da imagem grande */
.col-7 {
    padding: 150px 100px 10px 150px;
    background-color: aliceblue;
}
/* Imagem grande */
#inventory-img {
    max-width: 450px;
}
/* Imagem pequena LAB365 */
#lab365-img {
    max-width: 90px;
}
/* Devinventory logo */
#dev-inv-img {
    max-width: 150px;
}
/* Div da imagem LAB365 */
.lab365 {
    text-align: right;
}
/* Botões */
.btn {
    margin: 4px;
}
/* Div do botão criar conta */
.criar-conta {
    text-align: right;
}
/* Div da Coluna de login */
.col-5 {
    padding-right: 40px;
    padding-left: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}
/* Div geral */
.row {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    max-height: 100%;
}
/* Div da imagem grande e (form + botão criar conta) */
.container {
    text-align: left;
}
/* Div do form */
#loginform {
    margin-top: 40px;
    margin-bottom: 40px;
    padding-right: 120px;
}
/* Div do botão Entrar com Google e esqueceu senha? */
.alternative {
    display:block;
    text-align: center;
}
/* Div do devinvetory logo */
.logo {
    text-align: right;
    
}
/* Botão Entrar com Google */
#google {
    margin-bottom: 20px;
}
</style>