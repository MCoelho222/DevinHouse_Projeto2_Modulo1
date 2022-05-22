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
            <h5>Dados principais</h5>
            <newitem-form @submit="saveItem" id="newitem-form" :validation-schema="schema" v-slot="{ errors }">
                <div class="row">
                    <div class="col-3">
                        <label class="form-label">Código de patrimônio</label>
                        <newitem-field type="text" class="form-control" name="patrimonio" v-model="item.patrimonio" :disabled="disabled"/>
                        <span class="text-danger" v-text="errors.patrimonio" v-show="errors.patrimonio"></span>
                    </div>
                    <div class="col-6">
                        <label class="form-label">Título do item</label>
                        <newitem-field type="text" class="form-control" name="titulo" v-model="item.titulo" :disabled="disabled"/>
                        <span class="text-danger" v-text="errors.titulo" v-show="errors.titulo"></span>
                    </div>
                    <div class="col-3">
                        <label class="form-label">Categoria do item</label>
                        <newitem-field type="text" class="form-control" name="categoria" v-model="item.categoria" :disabled="disabled"/>
                        <span class="text-danger" v-text="errors.categoria" v-show="errors.categoria"></span>
                    </div>
                </div>
                <h5>Dados complementares</h5>
                <div class="row">
                    <div class="col-3">
                        <label class="form-label">Valor R$</label>
                        <newitem-field type="text" class="form-control" name="valor" v-model="item.valor" :disabled="disabled"/>
                        <span class="text-danger" v-text="errors.valor" v-show="errors.valor"></span>
                    </div>
                    <div class="col-9">
                        <label class="form-label">URL do produto</label>
                        <newitem-field type="text" class="form-control" name="url" v-model="item.url" :disabled="disabled"/>
                        <span class="text-danger" v-text="errors.url" v-show="errors.url"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <label class="form-label">Marca</label>
                        <newitem-field type="text" class="form-control" name="marca" v-model="item.marca" :disabled="disabled"/>
                        <span class="text-danger" v-text="errors.marca" v-show="errors.marca"></span>
                    </div>
                    <div class="col-6">
                        <label class="form-label">Modelo</label>
                        <newitem-field type="text" class="form-control" name="modelo" v-model="item.modelo" :disabled="disabled"/>
                        <span class="text-danger" v-text="errors.modelo" v-show="errors.modelo"></span>
                    </div>
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Descrição</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" :disabled="disabled"></textarea>
                </div>
                <button class="btn btn-secondary" type="button" @click="cleanForm">Limpar</button>
                <button type="submit" class="btn btn-primary">Salvar</button>
          </newitem-form>
        </div>
    </div>
</template>
<script>
import { Form, Field } from 'vee-validate'
import rules from '../validations/validateusers'

rules.required


export default {
    components: {
    "newitem-form": Form,
    "newitem-field": Field,
    },
    data() {
        return {
            schema: {
                patrimonio: 'required',
                titulo: 'required',
                categoria: 'required',
                valor: 'required',
                url: 'required',
                marca: 'required',
                modelo: 'required',
            },
            item: {},
            disabled: true
        }
    },
    methods: {
        saveItem() {
            if (localStorage.getItem('itens') === null) {
                let itens = []
                localStorage.setItem('itens', JSON.stringify(itens))
            } else {
                let list = JSON.parse(localStorage.getItem('itens'))
                list.push(this.item)
                localStorage.setItem('itens', JSON.stringify(list))
            }
        },
        cleanForm() {
            let form = document.getElementById('newitem-form')
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