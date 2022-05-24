import UserLogin from '../../views/UserLogin.vue'
import CadastroUsuario from '../../views/CadastroUsuario.vue'
import Template from '../../views/TemplateView.vue'
import ListaItens from '../../views/ListaItens.vue'
import EmprestaItem from '../../views/EmprestaItem.vue'
import CadastroItem from '../../views/CadastroItem.vue'
import ListaUsuarios from '../../views/ListaUsuarios.vue'
import { useCookies } from 'vue3-cookies'
const cookies = useCookies().cookies

const routes = [
    {path: '/', component: UserLogin, beforeEnter: (to) => {
        let check1 = cookies.get('logged')
        if (check1 !== null) {
            if(check1.status === true) {
                return to.path = '/users'
            }
        }
        return true
    }},
    {path: '/users', component: Template, beforeEnter: (to) => {
        let check2 = cookies.get('logged')
        if (check2 !== null) {
            if (!check2.status === true) {
                return to.path = '/'
            }
        }
        return true
    }, children: [
        {path: 'lista-usuarios', component: ListaUsuarios},
        {path: 'inventario', component: ListaItens},
        {path: 'emprestar', component: EmprestaItem},
        {path: 'cadastro-item', component: CadastroItem},
        {path:'cadastro-usuario', component: CadastroUsuario}
    ]},
    
    
]

export default routes