import { createRouter, createWebHashHistory } from 'vue-router'

import routes from './routes/routes'
//import Template from '../views/TemplateView.vue'


const router = createRouter({
    routes, 
    history: createWebHashHistory()
})

export default router