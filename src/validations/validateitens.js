import { defineRule } from 'vee-validate'

export default {
        required: defineRule('required', value => {
            if (!value) {
                return 'This field is required.'
            }
            return true
        }),
}