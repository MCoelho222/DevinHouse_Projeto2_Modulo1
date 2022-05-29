<template>
<div class="container p-4">
    <div id="listcollab-header">
        <label id="collab-search-title" for="exampleDataList" class="form-label">Buscar um colaborador</label>
        <input class="form-control" type="text" id="search-user" placeholder="Digite para buscar..." @input="setCollabs">
    </div>
    <div id="collab-cards">
        <div  class="cards shadow" v-for="item in collabs" :key="item.id">
            <MediumCard
            cardType="user-list" 
            :img="item.email" 
            :first="item.nome" 
            :second="item.email" 
            :third="`(${item.telefone.substring(0, 2)}) ${item.telefone.substring(2, 3)} ${item.telefone.substring(3, 11)}`" 
            :fourth="item.cargo" 
            :item="item">
            </MediumCard>
        </div>
    </div>
    <ModalColaboradores></ModalColaboradores>
</div>
</template>
<script>
import ModalColaboradores from './ModalColaboradores.vue'
import MediumCard from '@/components/MediumCard.vue'
export default {
    components: {
    ModalColaboradores,
    MediumCard
},
    data() {
        return {
            collabs: []
        }
    },
    methods: {
        collabDetails(item) {
            let oldValue = this.$store.getters['collaborators/sendSelectedId']

            if(oldValue == item.id){
                this.$store.commit('collaborators/setSelectedId', null)
            }else{
                this.$store.commit('collaborators/setSelectedId', item.id)
            }
        },
        setCollabs() {
            let inputUser = document.getElementById('search-user')
            let allUsers = this.$store.getters['collaborators/sendCollabs']
            if (inputUser == null){
                this.collabs = allUsers
            } else {
                let filtered = []
                allUsers.forEach(user => {
                    for (const [key] of Object.entries(user)) {
                        let userKey = user[key]
                        if (typeof user[key] !== 'string') {
                            userKey = String(userKey)
                        }
                        if (userKey.toLowerCase().indexOf(inputUser.value.toLowerCase()) !== -1) {
                            filtered.push(user)
                            break
                        }
                    }
                })
                this.collabs = filtered
            }
        }
    },
    mounted() {
        this.$store.commit('collaborators/getCollab')
        this.collabs = this.$store.getters['collaborators/sendCollabs']
    }
}
</script>
<style scoped>
.cards {
    margin: 15px;
    border-radius: 10px;
   
}
#collab-cards {
    text-align: left;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    border-radius: 10px;
}
#listcollab-header {
    margin-bottom: 40px;
    margin-top: 40px;
}
#collab-search-title {
    font-size: 1.5em;
}
</style>