import { createStore } from 'vuex'
import users from './modules/users/users'
import auth from './modules/users/auth'
import itens from './modules/itens/itens'
import template from './modules/template/template'

const store = createStore({
    modules: {
        auth,
        users,
        itens,
        template
    }
})

export default store