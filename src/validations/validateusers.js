import { defineRule } from 'vee-validate'
import axios from 'axios'
export default {
        required: defineRule('required', value => {
            if (!value) {
                return 'This field is required.'
            }
            return true
        }),
        password: defineRule('password', value => {
            if (value.length < 8) {
                return 'A senha deve possuir no mínimo 8 caracteres'
            }
            return true
        }),
        checkcep: defineRule('checkcep', async value => {
            //[0-9]{}
            let regexp = /^[0-9]{5}-[0-9]{3}$/
            try {

                await axios.get('viacep.com.br/ws/01001000/json/')
                if (!regexp.test(value)) {
                    return 'Número inválido'
                }
                return true
            } catch (e) {
                return 'CEP inválido'
            }
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
        zipcodecheck: defineRule('checkzip', async value => {
            //[0-9]{}
            let erro = false
            let regexp = /^[0-9]{8}$/
            if (!regexp.test(value)) {
                return 'Invalid number'}
            if (regexp.test(value)) {
                let check = () => axios.get(`viacep.com.br/ws/${value}/json/`)
               await check.then(() => {
                    if (!check) {
                        erro = true
                    }
                })
            }
            return erro === true ?  'Zip code is not valid.' : true
        }),
        phonecheck: defineRule('phonecheck', value => {
            //[0-9]{}
            let regexp = /^[0-9]{2} [0-9]{9}$/
            if (!regexp.test(value)) {
                return 'Número inválido'
            }
            return true
        }),
}