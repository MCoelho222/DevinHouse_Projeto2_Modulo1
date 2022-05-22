<template>
<div class="container">
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Criar Conta</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <newuser-form id="registerform" :validation-schema="schema" v-slot="{ errors }">
              <div class="mb-3">
                  <label class="form-label">E-mail</label>
                  <newuser-field type="email" class="form-control" name="email" aria-describedby="emailHelp" v-model="user.email"/>
                  <span class="text-danger" v-text="errors.email" v-show="errors.email"></span>
              </div>
              <div class="mb-3">
                  <label class="form-label">Senha</label>
                  <newuser-field type="password" class="form-control" name="password" v-model="user.password"/>
                  <span class="text-danger" v-text="errors.password" v-show="showError"></span>
              </div>
          </newuser-form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="setAccount">Submit</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import { Form, Field } from 'vee-validate'
import rules from '../validations/validateusers'

rules.required
rules.password

export default {
    components: {
    "newuser-form": Form,
    "newuser-field": Field,
    },
    data() {
        return {
            schema: {
                email: 'required',
                password: 'required|password',
            },
            user: {}
        }
    },
    methods: {
      // Cria nova conta
      setAccount() {

        this.$store.commit('users/setAccount', {...this.user})
        let form = document.getElementById('registerform')
        form.reset()
        // Se houver successo na criação da conta, success === true
        let success = this.$store.state.users.success
        if (success) {
          this.$toast.success('Conta criada com sucesso!')
        }
        if (!success) {
          this.$toast.warning('E-mail já cadastrado.', {position: 'top-right'})
        }
      }
    },
    computed: {
      // Se, 0 < n. de caracteres no input < 8,
      // apresenta msg de erro
      showError() {
        if (this.user.password) {
          let show = this.user.password.length
          // 
          if (show > 0 && show < 8) {
            return true
          }
        }
        return false
      }
    }
}
</script>
<style scoped>
</style>
