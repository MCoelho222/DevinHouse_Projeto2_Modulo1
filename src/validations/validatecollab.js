import { defineRule } from 'vee-validate'
//import axios from 'axios'
export default {
        required: defineRule('required', value => {
            if (!value) {
                return 'Campo obrigatório.'
            }
            return true
        }),
        emailcheck: defineRule ('emailcheck', email => {
            let regexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
            if (!regexp.test(email)) {
                return 'Email inválido.'
            }
            return true
        }),
        namecheck: defineRule('namecheck', name => {
            if (name.split(' ').length < 2) {
                return 'Informe o nome completo'
            }
            return true
        }),
        // checkcep: defineRule('checkcep', async value => {
        //     //[0-9]{}
        //     let regexp = /^[0-9]{5}-[0-9]{3}$/
        //     try {
        //         await axios.get(`viacep.com.br/ws/${value}/json/`)
        //         if (!regexp.test(value)) {
        //             return 'Número inválido'
        //         }
        //         return true
        //     } catch (e) {
        //         return 'CEP inválido'
        //     }
        // }),
        birthdate: defineRule('birthcheck', value => {
            let now = new Date()
            let day = String(now.getDate()).length > 1 ? String(now.getDate()) : `0${String(now.getDate())}`
            let month = String(now.getMonth()).length > 1 ? String(now.getMonth() + 1) : `0${String(now.getMonth() + 1)}`
            let year = String(now.getFullYear())
            let checkDate = new Date(`${year}-${month}-${day}` + " 00:00:00")
            let birth = new Date(value + " 00:00:00")
            if (Date.parse(birth) > Date.parse(checkDate)) {
                return 'Date is not valid.'
            }
            return true
        }),
        // cepcheck: defineRule('cepcheck', async value => {
        //     //[0-9]{}
        //     //let erro = false
        //     // let regexp = /^[0-9]{5}-[0-9]{3}$/
        //     // if (!regexp.test(value) || value.length > 9) {
        //     //     return 'Número inválido'
        //     // }
            
        //     if (value.length > 9) {
        //         return 'Número inválido'
        //     }
        //     return true
        //     // if (regexp.test(value)) {
        //     //     console.log('passei')
        //     //     console.log(value)
        //     //     let check = axios.get(`viacep.com.br/ws/${value}/json/`)
        //     //     await check.then(() => {
        //     //         if (!check) {
        //     //             erro = true
        //     //         }
        //     //     })
        //     // }
        //     // return erro === true ?  'CEP inválido' : true
        // }),
        phonecheck: defineRule('phonecheck', value => {
            //[0-9]{}
            let regexp = /^[0-9]{2}[0-9]{9}$/
            if (!regexp.test(value)) {
                return 'Número inválido'
            }
            return true
        }),
}