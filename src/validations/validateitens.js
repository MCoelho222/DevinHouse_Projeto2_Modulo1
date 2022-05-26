import { defineRule } from 'vee-validate'

export default {
        required: defineRule('required', value => {
            if (!value) {
                return 'Campo obrigatório.'
            }
            return true
        }),
        patrimonycheck: defineRule('patrimonycheck', value => {
            let regexp = /^[A-Z]{1}[A-Z]{1}[0-9]{4}-[0-9]{3}$/
            if (!regexp.test(value)) {
                return 'Código inválido.'
            }
            return true
        }),
        pricecheck: defineRule('pricecheck', value => {
            let regexp = /^[0-9]{1,},[0-9]{2}$/
            if (!regexp.test(value)) {
                return 'Valor inválido.'
            }
            return true
        }),
        urlcheck: defineRule('urlcheck', url => {
            let regexp = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
            if(!regexp.test(url)) {
                return 'URL inválida.'
            } 
            return true
        })
}