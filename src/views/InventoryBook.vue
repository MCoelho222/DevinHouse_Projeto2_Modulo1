<template>
<div class="container">
    <div id="data-cards">
        <label class="cards">
            <span>
                <div class="icon-data">
                    <i class="fa-solid fa-users fa-3x"></i>
                    <p class="data">{{ allCollabs.length }}</p>
                </div>
                <p class="data-footer">Colaboradores</p>
            </span>
        </label>
        <label class="cards">
            <span>
                <div class="icon-data">
                    <i class="fa-solid fa-shapes fa-3x"></i>
                    <p class="data">{{ invStats.itens }}</p>
                </div>
                <p class="data-footer">Itens</p>
            </span>
        </label>
        <label class="cards">
            <span>
                <div class="icon-data">
                    <i class="fa-solid fa-brazilian-real-sign fa-3x"></i>
                    <p class="data">{{ invStats.total }}</p>
                </div>
                <p class="data-footer">Total</p>
            </span>
        </label>
        <label class="cards">
            <span>
                <div class="icon-data">
                    <i class="fa-solid fa-handshake-angle fa-3x"></i>
                    <p class="data">{{ invStats.emprestados }}</p>
                </div>
                <p class="data-footer">Emprestados</p>
            </span>
        </label>
    </div>
    <div id="inv-search-div">
        <form id="inv-search-form" @submit.prevent="editItem(selectedItem)" class="d-flex">
            <input class="form-control me-2" type="search" placeholder="Digite o código de patrimônio" aria-label="Search" v-model="selectedItem">
            <button class="btn btn-outline-info" type="submit" data-bs-toggle="modal" data-bs-target="#editItemModal">Buscar</button>
        </form>
    </div>
    <div id="collab-cards">
        <label class="cards" v-for="item in getAllItens" :key="item.id" >
            <div id="modal-btn" data-bs-toggle="modal" data-bs-target="#editItemModal" @click="editItem(item.patrimonio)">
                    <img class="inv-img" :src="item.url" alt="">
                    <p class="inv-card-description">{{item.descricao}}</p>
                    <p class="inv-card-brand">{{item.marca}}</p>
                    <p class="inv-card-model">{{item.modelo}}</p>
                    <span v-if="item.emprestado == 'Item disponível' || item.emprestado == ''">Na empresa</span>
                    <span v-else>Emprestado: {{item.emprestado}}</span>
            </div>
        </label>
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
            selectedItem: null,
        }
    },
    methods: {
        editItem(num) {
            this.$store.commit('itens/editItem', num)
            let form = document.getElementById('search-item-form')
            form.reset()
        },
    },
    computed: {
        getAllItens() {
            return this.$store.state.itens.sendItens
            
        },
        allCollabs() {
            return this.$store.state.collaborators.collabs
        },
        invStats() {
            return this.$store.state.itens.stats
        }


    },
    mounted() {
        this.$store.commit('itens/getItens')
        this.$store.commit('itens/itemStats')
        this.$store.commit('collaborators/getCollab')
    }

}
</script>
<style scoped>
img {
    max-width: 150px;
}
.cards {
    background-color: rgb(187, 218, 245);
    margin: 15px;
    border:black;
    max-width: 30%;
    max-height: 100%;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    box-shadow:inset;
    
}
</style>