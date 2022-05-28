<template>
<div class="container">
  <div class="modal fade" id="editItemModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title" id="exampleModalLabel">Editar item</h3>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <editItem-form id="editItem-form" :validation-schema="schema" v-slot="{ errors }">
                <div class="row mb-3">
                    <div class="col-4">
                        <label class="form-label">Patrimônio</label>
                        <editItem-field type="text" class="form-control" name="patrimonio" v-model="item.patrimonio"/>
                        <span class="text-danger" v-text="errors.patrimonio" v-show="errors.patrimonio"></span>
                    </div>
                    <div class="col-8">
                        <label class="form-label">Título</label>
                        <editItem-field type="text" class="form-control" name="titulo" v-model="item.titulo"/>
                        <span class="text-danger" v-text="errors.titulo" v-show="errors.titulo"></span>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-12">
                        <label class="form-label">Categoria</label>
                        <!-- <editItem-field type="text" class="form-control" name="categoria" v-model="item.categoria"/> -->
                        <editItem-field as="select" class="form-select" aria-label="Default select example" name="categoria" v-model="item.categoria">
                            <option value="Eletrônicos">Eletrônicos</option>
                            <option value="Móveis">Móvel</option>
                            <option value="Acessórios">Acessórios</option>
                        </editItem-field>
                        <span class="text-danger" v-text="errors.categoria" v-show="errors.categoria"></span>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-3">
                        <label class="form-label">Valor R$</label>
                        <editItem-field type="text" class="form-control" name="valor" v-model="item.valor"/>
                        <span class="text-danger" v-text="errors.valor" v-show="errors.valor"></span>
                    </div>
                    <div class="col-9">
                        <label class="form-label">URL do produto</label>
                        <editItem-field type="text" class="form-control" name="url" v-model="item.url"/>
                        <span class="text-danger" v-text="errors.url" v-show="errors.url"></span>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-6">
                        <label class="form-label">Marca</label>
                        <editItem-field type="text" class="form-control" name="marca" v-model="item.marca"/>
                        <span class="text-danger" v-text="errors.marca" v-show="errors.marca"></span>
                    </div>
                    <div class="col-6">
                        <label class="form-label">Modelo</label>
                        <editItem-field type="text" class="form-control" name="modelo" v-model="item.modelo"/>
                        <span class="text-danger" v-text="errors.modelo" v-show="errors.modelo"></span>
                    </div>
                </div>
                <div class="row mb-3">
                  <div class="col-12">
                    <label for="exampleFormControlTextarea1" class="form-label">Descrição</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="item.descricao"></textarea>
                  </div>
                </div>
          </editItem-form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Sair</button>
          <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal" @click="delItem">Deletar item</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="saveItem">Salvar</button>
          
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import { Form, Field } from 'vee-validate'
import rules from '../validations/validateitens'

rules

export default {
    components: {
    "editItem-form": Form,
    "editItem-field": Field,
    },
    data() {
        return {
            schema: {
                patrimonio: 'required|patrimonycheck',
                titulo: 'required',
                categoria: 'required',
                valor: 'required|pricecheck',
                url: 'required|urlcheck',
                marca: 'required',
                modelo: 'required'
            },
            item: {},
        }
    },
    methods: {
        saveItem() {
            this.$store.commit('itens/saveItem', this.item)
            let form = document.getElementById('editItem-form')
            form.reset()
        },
        delItem() {
          console.log(this.item)
          this.$store.commit('itens/delItem', this.item.patrimonio)
        },
    },
    watch: {
      edit(item) {
        this.item = item
      }
    },
    computed: {
      edit() {
        return this.$store.getters['itens/sendItemToEdit']
      }
      
    }

}

</script>
<style scoped>
.form-label {
  margin-bottom: 1px;
}
.form-control {
  font-size: 11pt;
}
.form-select {
  font-size: 11pt;
}

</style>