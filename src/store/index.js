import { createStore } from 'vuex'
import users from './modules/users/users'
import auth from './modules/users/auth'
import itens from './modules/itens/itens'

const store = createStore({
    modules: {
        auth,
        users,
        itens
    }
})

export default store