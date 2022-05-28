<template>
    <div class="container p-5">
    <h3>Buscar por patrimônio</h3>
        <div class="container p-4">
            <div class="row mb-3" >
                <div class="col-12">
                    <form id="borrow-search-form" @submit.prevent="editItem(selectedItem)" class="d-flex">
                        <input class="form-control me-2" type="search" placeholder="Digite o código de patrimônio" aria-label="Search" v-model="selectedItem">
                        <button class="btn btn-primary" type="submit" data-bs-toggle="modal" data-bs-target="#editItemModal">Buscar</button>
                    </form>
                </div>
            </div>
        </div>
        <div class="container pl-4">
            <h3 >Situação atual</h3>
        </div>
        <div class="container p-4">
            <table class="table table-hover table-borderless align-middle">
                <thead>
                    <tr>
                    <th scope="col">Patrimônio</th>
                    <th scope="col">Título</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Emprestado para</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in getAllItens" :key="item.patrimonio" @click="editItem(item.patrimonio)">
                        <td data-bs-toggle="modal" data-bs-target="#editItemModal"><span>{{ item.patrimonio }}</span></td>
                        <td data-bs-toggle="modal" data-bs-target="#editItemModal"><span>{{ item.titulo }}</span></td>
                        <td data-bs-toggle="modal" data-bs-target="#editItemModal"><span>{{ item.categoria }}</span></td>
                        <td>
                            <select :id="index" class="form-select" @input="emprestar(item, index)">
                                <option disabled selected>{{ item.emprestado }}</option>
                                <option v-for="name in allCollabs" :value="name.nome" :key="name.nome">{{name.nome}}</option>
                                <option v-show="item.emprestado !== 'Item disponível'" value="Item disponível">Item disponível</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <ModalEditItem></ModalEditItem>
    </div>
</template>
<script>
import ModalEditItem from './ModalEditItem.vue'

export default {
    components: {
   
        ModalEditItem
},
    data() {
        return {
            selectedItem: null
        }
    },
    methods: {
        emprestar(item, index) {
            let nome = document.getElementById(`${index}`).value
            this.emprestado = nome
            this.$store.commit('itens/flagItem', {
                itemTo: nome,
                itemWhich: item
            })
            this.$toast.success(nome !== "Item disponível" ? `Item emprestado para ${nome}.` : "Item disponível")
        },
        editItem(num) {
            this.$store.commit('itens/editItem', num)
            let form = document.getElementById('borrow-search-form')
            form.reset()
        },
    },
    computed: {
        getAllItens() {
            return this.$store.state.itens.sendItens
            
        },
        allCollabs() {
            return this.$store.state.collaborators.collabs
        }

    },
    mounted() {
        this.$store.commit('itens/getItens')
        this.$store.commit('collaborators/getCollab')
    }

}
</script>
<style scoped>
.container {
    background-color: aliceblue;
}
h3 {
    margin-bottom: 10px;
}
.form-select {
    margin-right: 10px;
}

th {
    font-size: 1.2em;
    margin-bottom: 20px;
}
td:hover {
    cursor: pointer;
}

</style>