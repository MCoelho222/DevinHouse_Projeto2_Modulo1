<template>
<div class="container p-4">
    <div class="row data-card">
        <SmallCard :icon="'fa-solid fa-users fa-3x'" :data="allCollabs.length" :footer="'Colaboradores'"></SmallCard>
        <SmallCard :icon="'fa-solid fa-shapes fa-3x'" :data="invStats.itens" :footer="'Itens'"></SmallCard>
        <SmallCard :icon="'fa-solid fa-brazilian-real-sign fa-3x'" :data="invStats.total" :footer="'Total'"></SmallCard>
        <SmallCard :icon="'fa-solid fa-handshake-angle fa-3x'" :data="invStats.emprestados" :footer="'Emprestados'"></SmallCard>
    </div>
    <div id="inv-search-div">
        <label id="collab-search-title" for="exampleDataList" class="form-label">
            <h3>Buscar itens</h3>
        </label>
        <input class="form-control" type="text" id="search-item" placeholder="Digite para buscar..." @input="setItems">
    </div>
    <div id="inv-cards">
        <div class="inv-card shadow" v-for="item in items" :key="item.id">
            <MediumCard cardType="inventory" :img="item.url" :first="item.descricao" :second="item.marca" :third="item.modelo" :fourth="item.emprestado" :item="item.patrimonio"></MediumCard>
        </div>
    </div>
    <ModalEditItem></ModalEditItem>
</div>
</template>
<script>
import ModalEditItem from './ModalEditItem.vue'
import MediumCard from '@/components/MediumCard.vue'
import SmallCard from '@/components/SmallCard.vue'

export default {
    components: {
    ModalEditItem,
    MediumCard,
    SmallCard
},
    data() {
        return {
            selectedItem: null,
            items: []
        }
    },
    methods: {
        editItem(num) {
            this.$store.commit('itens/editItem', num)
            let form = document.getElementById('search-item-form')
            form.reset()
        },
        setItems() {
            let inputItem = document.getElementById('search-item')
            let allItems = this.$store.state.itens.sendItens
            if (inputItem == null){
                this.items = allItems
            } else {
                let filtered = []
                allItems.forEach(item => {
                    for (const [key] of Object.entries(item)) {
                        if (item[key].toLowerCase().indexOf(inputItem.value.toLowerCase()) !== -1) {
                            filtered.push(item)
                            break
                        }
                    }
                })
                this.items = filtered
            }
        }
    },
    computed: {
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
        this.items = this.$store.state.itens.sendItens
    }

}
</script>
<style scoped>
#inv-cards {
    text-align: left;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
}
.inv-card {
    border-radius: 10px;
    margin: 15px;
}

.data-card {
    display:flex;
    justify-content: space-evenly;
}
#inv-search-div {
    padding: 20px;
}
</style>