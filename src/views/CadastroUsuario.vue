<template>
    <div class="template">
        <div class="header" style="display: flex; flex-direction: row; justify-content: space-between">
            <p>Preencha os campos para cadastrar</p>
            <label class="switch">
                <input type="checkbox" @click="edit">
                <span class="slider round"></span>
            </label>
            <!--<button type="button" class="btn btn-primary btn-sm" @click="edit">Editar</button>-->
        </div>
        <div class="container">
            <h5>Dados pessoais</h5>
            <user-form @submit="saveItem" id="newitem-form" :validation-schema="schema" v-slot="{ errors }">
                <div class="row">
                    <div class="col-6">
                        <label class="form-label">Nome completo</label>
                        <user-field type="text" class="form-control" name="name" v-model="user.name" :disabled="disabled"/>
                        <span class="text-danger" v-text="errors.name" v-show="errors.name"></span>
                    </div>
                    <div class="col-4">
                        <label class="form-label">Gênero</label>
                        <user-field type="text" class="form-control" name="genre" v-model="user.genre" :disabled="disabled"/>
                        <span class="text-danger" v-text="errors.genre" v-show="errors.genre"></span>
                    </div>
                    <div class="col-2">
                        <label class="form-label">Data de nascimento</label>
                        <user type="date" class="form-control" name="birth" v-model="user.birthdate"/>
                        <span class="text-danger" v-text="errors.birth" v-show="errors.birth"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-4">
                        <label class="form-label">Telefone</label>
                        <user-field type="text" class="form-control" name="phone" v-model="user.phone" :disabled="disabled"/>
                        <span class="text-danger" v-text="errors.phone" v-show="errors.phone"></span>
                    </div>
                    <div class="col-4">
                        <label class="form-label">E-mail</label>
                        <user-field type="email" class="form-control" name="email" aria-describedby="emailHelp" v-model="user.email"/>
                        <span class="text-danger" v-text="errors.email" v-show="errors.email"></span>
                    </div>
                    <div class="col-4">
                        <label class="form-label">Data de nascimento</label>
                        <user-field type="date" class="form-control" name="birth" v-model="user.birthdate"/>
                        <span class="text-danger" v-text="errors.birth" v-show="errors.birth"></span>
                    </div>
                </div>
                <h5>Dados de endereço</h5>
                <div class="row">
                    <div class="col-4">
                        <label class="form-label">CEP</label>
                        <user-field type="text" class="form-control" name="cep" v-model="item.cep" :disabled="disabled"/>
                        <span class="text-danger" v-text="errors.cep" v-show="errors.cep"></span>
                    </div>
                    <div class="col-6">
                        <label class="form-label">Cidade</label>
                        <user-field type="text" class="form-control" name="city" v-model="item.city" :disabled="disabled"/>
                        <span class="text-danger" v-text="errors.city" v-show="errors.city"></span>
                    </div>
                    <div class="col-2">
                        <label class="form-label">Estado</label>
                        <user-field type="text" class="form-control" name="state" v-model="item.state" :disabled="disabled"/>
                        <span class="text-danger" v-text="errors.state" v-show="errors.state"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-10">
                        <label class="form-label">Logradouro</label>
                        <user-field type="text" class="form-control" name="street" v-model="item.street" :disabled="disabled"/>
                        <span class="text-danger" v-text="errors.street" v-show="errors.street"></span>
                    </div>
                    <div class="col-2">
                        <label class="form-label">Número</label>
                        <user-field type="text" class="form-control" name="num" v-model="item.num" :disabled="disabled"/>
                        <span class="text-danger" v-text="errors.num" v-show="errors.num"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-4">
                        <label class="form-label">Complemento</label>
                        <user-field type="text" class="form-control" name="complement" v-model="user.complement" :disabled="disabled"/>
                        <span class="text-danger" v-text="errors.complement" v-show="errors.complement"></span>
                    </div>
                    <div class="col-4">
                        <label class="form-label">Bairro</label>
                        <user-field type="text" class="form-control" name="zone" v-model="user.zone"/>
                        <span class="text-danger" v-text="errors.zone" v-show="errors.zone"></span>
                    </div>
                    <div class="col-4">
                        <label class="form-label">Ponto de referência</label>
                        <user-field type="text" class="form-control" name="ref" v-model="user.ref"/>
                        <span class="text-danger" v-text="errors.ref" v-show="errors.ref"></span>
                    </div>
                </div>
                <button class="btn btn-secondary" type="button" @click="cleanForm">Limpar</button>
                <button type="submit" class="btn btn-primary">Salvar</button>
          </user-form>
        </div>
    </div>
</template>
<script>
import { Form, Field } from 'vee-validate'
import rules from '../validations/validateusers'
//import axios from 'axios'

rules


export default {
    components: {
    "user-form": Form,
    "user-field": Field,
    },
    data() {
        return {
            schema: {
                name: 'required',
                genre: 'required',
                birth: 'required|birthcheck',
                phone: 'required|phonecheck',
                email: 'required',
                job: 'required',
                cep: 'required|checkcep',
                city: 'required',
                state: 'required',
                street: 'required',
                num: 'required',
                complement: 'required',
                zone: 'required',
                ref: 'required'
            },
            user: {},
            disabled: true
        }
    },
    methods: {
        saveItem() {
            if (localStorage.getItem('itens') === null) {
                let registeredUsers = []
                registeredUsers.push(this.user)
                localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers))
            } else {
                let list = JSON.parse(localStorage.getItem('registeredUsers'))
                list.push(this.user)
                localStorage.setItem('registeredUsers', JSON.stringify(list))
            }
            let form = document.getElementById('user-form')
            form.reset()
        },
        cleanForm() {
            let form = document.getElementById('user-form')
            form.reset() 
        },
        edit() {
            if (this.disabled) {
                this.disabled = false
            } else {
                this.disabled = true
            }
        }
      
    },
    computed: {
      
    }
}
</script>
<style scoped>
p {
    font-size: 1.5em;
}
.template {
    padding: 50px;
}
.container
 {
     text-align: left;
     background-color: white;
     padding: 30px;
 }


 .switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>