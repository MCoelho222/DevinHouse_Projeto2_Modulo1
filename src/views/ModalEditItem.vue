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
          <newitem-form id="newitem-form" :validation-schema="schema" v-slot="{ errors }">
                <div class="row">
                    <div class="col-3">
                        <label class="form-label">Código de patrimônio</label>
                        <newitem-field type="text" class="form-control" name="patrimonio" v-model="item.patrimonio"/>
                        <span class="text-danger" v-text="errors.patrimonio" v-show="errors.patrimonio"></span>
                    </div>
                    <div class="col-6">
                        <label class="form-label">Título do item</label>
                        <newitem-field type="text" class="form-control" name="titulo" v-model="item.titulo"/>
                        <span class="text-danger" v-text="errors.titulo" v-show="errors.titulo"></span>
                    </div>
                    <div class="col-3">
                        <label class="form-label">Categoria do item</label>
                        <newitem-field type="text" class="form-control" name="categoria" v-model="item.categoria"/>
                        <span class="text-danger" v-text="errors.categoria" v-show="errors.categoria"></span>
                    </div>
                </div>
                <h5>Dados complementares</h5>
                <div class="row">
                    <div class="col-3">
                        <label class="form-label">Valor R$</label>
                        <newitem-field type="text" class="form-control" name="valor" v-model="item.valor"/>
                        <span class="text-danger" v-text="errors.valor" v-show="errors.valor"></span>
                    </div>
                    <div class="col-9">
                        <label class="form-label">URL do produto</label>
                        <newitem-field type="text" class="form-control" name="url" v-model="item.url"/>
                        <span class="text-danger" v-text="errors.url" v-show="errors.url"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <label class="form-label">Marca</label>
                        <newitem-field type="text" class="form-control" name="marca" v-model="item.marca"/>
                        <span class="text-danger" v-text="errors.marca" v-show="errors.marca"></span>
                    </div>
                    <div class="col-6">
                        <label class="form-label">Modelo</label>
                        <newitem-field type="text" class="form-control" name="modelo" v-model="item.modelo"/>
                        <span class="text-danger" v-text="errors.modelo" v-show="errors.modelo"></span>
                    </div>
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Descrição</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <button class="btn btn-secondary" type="button" @click="cleanForm">Limpar</button>
                <!--<button type="submit" class="btn btn-primary">Salvar</button>-->
          </newitem-form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="saveEdit">Salvar</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
    
}

</script>