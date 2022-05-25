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
            let parts = name.split(' ')
            if (parts.length < 2 || parts[1].length == 0) {
                return 'Informe o nome completo'
            }
            return true
        }),
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
        phonecheck: defineRule('phonecheck', value => {
            let regexp = /^[0-9]{11}$/
            if (!regexp.test(value)) {
                return 'Utilize apenas números, com DDD'
            }
            return true
        }),
}