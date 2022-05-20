import { defineRule } from 'vee-validate'

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
        })
}