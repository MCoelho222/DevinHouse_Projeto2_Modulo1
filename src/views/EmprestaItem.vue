<template>
    <div class="container">
        <div id="itens-header">
            <form id="search-item-form" @submit.prevent="editItem(selectedItem)" class="d-flex">
                <input class="form-control me-2" type="search" placeholder="Digite o código de patrimônio" aria-label="Search" v-model="selectedItem">
                <button class="btn btn-outline-info" type="submit" data-bs-toggle="modal" data-bs-target="#editItemModal">Buscar</button>
            </form>
        </div>
        <div class="itens-table">
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Patrimônio</th>
                    <th scope="col">Título</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Emprestado para</th>
                    </tr>
                </thead>
                <tbody>
                    <tr  v-for="(item, index) in getAllItens" :key="item.patrimonio" @click="editItem(item.patrimonio)">
                    <td data-bs-toggle="modal" data-bs-target="#editItemModal">{{ item.patrimonio }}</td>
                    <td data-bs-toggle="modal" data-bs-target="#editItemModal">{{ item.titulo }}</td>
                    <td data-bs-toggle="modal" data-bs-target="#editItemModal">{{ item.categoria }}</td>
                    <td>
                        <div id="collab-select">

                            <input class="form-control" 
                            list="collabOptions" 
                            :id="index"
                            :value="item.emprestado ? item.emprestado : 'Item disponível'"
                            placeholder="Digite para procurar..." 
                            @change="emprestar(item, index)" >

                            <datalist id="collabOptions">
                            <option v-for="name in allCollabs" :value="name.nome" :key="name.nome"  />
                            <option value="Item disponível"/>
                            </datalist>

                        </div>
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
            allItens: [],
            all: [{nome: 'marcelo'}, {nome: 'marcio'}],
            selectedItem: null,
            bsToggle: null,
            bsTarget: null
        }
    },
    methods: {
        emprestar(item, index) {
            let nome = document.getElementById(`${index}`).value
            this.$store.commit('itens/flagItem', {
                itemTo: nome,
                itemWhich: item
            })
        },
        editItem(num) {
            this.$store.commit('itens/editItem', num)
            let form = document.getElementById('search-item-form')
            form.reset()
        },
        callModal() {
            this.bsToggle = "modal"
            this.bsTarget = "#editItemModal"
        }


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
#itens-header {
    display:flex;
    flex-direction:row;
    padding-top: 20px;
    
}
.form-select {
    margin-right: 10px;
}
</style>