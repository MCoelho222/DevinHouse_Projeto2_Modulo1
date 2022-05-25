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
            <collab-form @submit="saveCollab" id="collab-form" :validation-schema="schema" v-slot="{ errors }">
                <div class="row">
                    <div class="col-6">
                        <label class="form-label">Nome completo</label>
                        <collab-field type="text" class="form-control" name="name" v-model="collab.name" :disabled="disabled"/>
                        <span class="text-danger" v-text="errors.name" v-show="errors.name"></span>
                    </div>
                    <div class="col-4">
                        <label class="form-label">Gênero</label>
                        <collab-field type="text" class="form-control" name="genre" v-model="collab.genre" :disabled="disabled"/>
                        <span class="text-danger" v-text="errors.genre" v-show="errors.genre"></span>
                    </div>
                    <div class="col-2">
                        <label class="form-label">Data de nascimento</label>
                        <collab-field type="date" class="form-control" name="birth" v-model="collab.birthdate" :disabled="disabled"/>
                        <span class="text-danger" v-text="errors.birth" v-show="errors.birth"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-4">
                        <label class="form-label">Telefone</label>
                        <collab-field type="text" class="form-control" name="phone" v-model="collab.phone" :disabled="disabled"/>
                        <span class="text-danger" v-text="errors.phone" v-show="errors.phone"></span>
                    </div>
                    <div class="col-4">
                        <label class="form-label">E-mail</label>
                        <collab-field type="email" class="form-control" name="email" v-model="collab.email" :disabled="disabled"/>
                        <span class="text-danger" v-text="errors.email" v-show="errors.email"></span>
                    </div>
                    <div class="col-4">
                        <label class="form-label">Cargo</label>
                        <collab-field type="text" class="form-control" name="job" v-model="collab.job" :disabled="disabled"/>
                        <span class="text-danger" v-text="errors.job" v-show="errors.job"></span>
                    </div>
                </div>
                <h5>Dados de endereço</h5>
                <div class="row">
                    <div class="col-4">
                        <label class="form-label">CEP</label>
                        <collab-field type="text" class="form-control" name="cep" v-model="getCepInfo.cep" :disabled="disabled" v-if="cepDone" />
                        <collab-field type="text" class="form-control" name="cep" v-model="getCepInfo" :disabled="disabled" v-else />
                        <span class="text-danger" v-text="errors.cep" v-show="errors.cep"></span>
                        <span class="text-danger" v-text="errorMsg" v-show="errorMsg"></span>
                    </div>
                    <div class="col-6">
                        <label class="form-label">Cidade</label>
                        <collab-field type="text" class="form-control" name="city" v-model="getCepInfo.localidade" :disabled="disabled"/>
                       
                        <span class="text-danger" v-text="errors.city" v-show="errors.city"></span>
                    </div>
                    <div class="col-2">
                        <label class="form-label">Estado</label>
                        <collab-field type="text" class="form-control" name="state" v-model="getCepInfo.uf" :disabled="disabled" />
                        <span class="text-danger" v-text="errors.state" v-show="errors.state"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-10">
                        <label class="form-label">Logradouro</label>
                        <collab-field type="text" class="form-control" name="street" v-model="getCepInfo.logradouro" :disabled="disabled"/>
                        
                        <span class="text-danger" v-text="errors.street" v-show="errors.street"></span>
                    </div>
                    <div class="col-2">
                        <label class="form-label">Número</label>
                        <collab-field type="text" class="form-control" name="num" v-model="collab.num" :disabled="disabled"/>
                        <span class="text-danger" v-text="errors.num" v-show="errors.num"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-4">
                        <label class="form-label">Complemento</label>
                        <collab-field type="text" class="form-control" name="complement" v-model="collab.complement" :disabled="disabled"/>
                        <span class="text-danger" v-text="errors.complement" v-show="errors.complement"></span>
                    </div>
                    <div class="col-4">
                        <label class="form-label">Bairro</label>
                        <collab-field type="text" class="form-control" name="zone" v-model="getCepInfo.bairro" :disabled="disabled"/>
                        <span class="text-danger" v-text="errors.zone" v-show="errors.zone"></span>
                    </div>
                    <div class="col-4">
                        <label class="form-label">Ponto de referência</label>
                        <collab-field type="text" class="form-control" name="ref" v-model="collab.ref" :disabled="disabled"/>
                        <span class="text-danger" v-text="errors.ref" v-show="errors.ref"></span>
                    </div>
                </div>
                <button class="btn btn-secondary" type="button" @click="cleanForm">Limpar</button>
                <button type="submit" class="btn btn-primary">Salvar</button>
          </collab-form>
        </div>
        {{cepDone}}
        {{getCepInfo}}
    </div>
</template>
<script>

import { Form, Field } from 'vee-validate'
import rules from '../validations/validatecollab'

rules.required
rules.birthdate
rules.cepcheck
rules.phonecheck

export default {
    components: {
    "collab-form": Form,
    "collab-field": Field,
    },
    data() {
        return {
            schema: {
                name: 'required',
                genre: 'required',
                birth: 'required|birthcheck',
                phone: 'required|phonecheck',
                email: 'required|emailcheck',
                job: 'required',
                cep: 'required|cepcheck',
                city: 'required',
                state: 'required',
                street: 'required',
                num: 'required',
                complement: 'required',
                zone: 'required',
                ref: 'required'
            },
            collab: {},
            cepInfo: {},
            disabled: true,
        }
    },
    methods: {
        saveCollab() {
            this.$store.commit('collaborators/saveCollab', {...this.collab})
            let form = document.getElementById('collab-form')
            form.reset()
        },
        cleanForm() {
            let form = document.getElementById('collab-form')
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
        getCepInfo: {
            get() {
                let info = this.$store.getters['collaborators/sendInfo']
                return info.length > 0 ? info[0] : ''
            },
            set(cep) {
                if (cep.length == 8) {
                    this.$store.dispatch('collaborators/cepInfo', cep)
                }
            }
        },
        cepDone() {
            return this.$store.state.collaborators.cepDone
        },
        errorMsg() {
            return this.$store.getters['collaborators/sendErrorMsg']
        }
    },
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