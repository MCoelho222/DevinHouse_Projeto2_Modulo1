<template>
<div class="container">
    <div id="listcollab-header">
        <label id="collab-search-title" for="exampleDataList" class="form-label">Buscar um colaborador</label>
        <input class="form-control" list="datalistOptions" id="exampleDataList" placeholder="Type to search...">
        <datalist id="datalistOptions">
        <option v-for="item in bringCollabs" :value="item.nome" :key="item.id"/>
        </datalist>
    </div>
    <div id="collab-cards">
    
    <label class="cards" v-for="item in bringCollabs" :key="item.id" >
    <div id="modal-btn" data-bs-toggle="modal" data-bs-target="#collabModal" @click="collabDetails(item)">
        <span>
            <i class="fa-solid fa-user fa-3x"></i>
            <p id="collab-name">{{item.nome}}</p>
            <p id="collab-name">{{item.email}}</p>
            <p id="collab-name">{{item.telefone}}</p>
            <p id="collab-name">{{item.cargo}}</p>
        </span></div></label>
    </div>
    <ModalColaboradores></ModalColaboradores>
</div>
</template>
<script>
import ModalColaboradores from './ModalColaboradores.vue'
export default {
    components: {
        ModalColaboradores
    },
    data() {
        return {
            
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
        }
    },
    computed: {
        bringCollabs() {
            return this.$store.getters['collaborators/sendCollabs']
        }
    },
    mounted() {
        this.$store.commit('collaborators/getCollab')
    }

}
</script>
<style scoped>
.cards {
    background-color: rgb(187, 218, 245);
    margin: 15px;
    border:black;
    min-width: 20%;
    min-height: 100%;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    box-shadow:inset;
    
}
#collab-cards {
    text-align: left;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
}
#listcollab-header {
    margin-bottom: 40px;
    margin-top: 40px;
}
.container {
    padding: 30px;
    text-align: left;
}
#collab-search-title {
    font-size: 1.5em;
}
#modal-btn {
    background: none;
    border: none;
}
</style>