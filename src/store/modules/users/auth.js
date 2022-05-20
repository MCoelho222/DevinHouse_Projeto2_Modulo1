import { useCookies } from 'vue3-cookies'
const cookies = useCookies().cookies

export default {
    namespaced: true,
    state() {
        return {
            // Mensagem de erro para os inputs do login
            errorMsg: null,
        }
    },
    mutations: {
        // Autenticação do login
        // Parâmetro "user" enviado pelo commit do login
        authUser(state, user) {
            let match = 0 // Se > 0, usuário está cadastrado
            let users = JSON.parse(localStorage.getItem('users'))
            // Caso a lista users seja apagada do localstorage,
            // recria-se aqui
            if (users === null) {
                let setUsers = []
                localStorage.setItem('users', JSON.stringify(setUsers))
                users = JSON.parse(localStorage.getItem('users'))
            }
            if (users.length > 0) {
                users.forEach(element => {
                    // Auntentica se email e senha derem match
                    if (user.email === element.email && user.password === element.password) {
                        cookies.set('logged', true)
                        match += 1
                    }
                    // Erros
                    // Por segurança, as mensagens não especificam o que está incorreto
                    if (user.email === element.email && user.password !== element.password) {
                        state.errorMsg = 'E-mail ou senha incorreta.'
                        match += 1
                    }
                    if (user.email !== element.email && user.password === element.password) {
                        state.errorMsg = 'E-mail ou senha incorreta.'
                        match += 1
                    }
                    
                });
            }
            // Se não caiu nos casos anteriores, criar conta
            if (match === 0 || users.length === 0) {
                state.errorMsg = 'Você deve criar uma conta antes de efetuar o login.'
            }
        }
    },
}