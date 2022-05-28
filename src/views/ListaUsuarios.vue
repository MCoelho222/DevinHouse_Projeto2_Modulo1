<template>
<div class="container">
    <div id="listcollab-header">
        <label id="collab-search-title" for="exampleDataList" class="form-label">Buscar um colaborador</label>
        <input class="form-control" type="text" id="search-user" placeholder="Digite para buscar..." @input="setCollabs">
    </div>
    <div id="collab-cards">
        <label class="cards shadow" v-for="item in collabs" :key="item.id" >
            <div id="modal-btn" data-bs-toggle="modal" data-bs-target="#collabModal" @click="collabDetails(item)">
                <vue-gravatar class="gravatar rounded-circle" :email="item.email" size="100"/>
                <span>
                    <p><strong>{{item.nome}}</strong></p>
                    <p id="collab-email">{{item.email}}</p>
                    <p id="collab-tel">{{`(${item.telefone.substring(0, 2)}) ${item.telefone.substring(2, 3)} ${item.telefone.substring(3, 11)}`}}</p>
                    <p style="color:rgb(10, 117, 183);"><strong>{{item.cargo}}</strong></p>
                </span>
            </div>
        </label>
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
            if (inputUser == null){
                this.collabs = this.$store.getters['collaborators/sendCollabs']
            } else {
                let users = this.$store.getters['collaborators/sendCollabs']
                let user = users.filter(item => item.nome.toLowerCase().indexOf(inputUser.value.toLowerCase()) !== -1)
                this.collabs = user
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
span {
    margin-top: 10px;
    display: flex; 
    flex-direction: column;
}

.cards {
    background-color: rgb(187, 218, 245);
    margin: 15px;
    min-width: 20%;
    min-height: 100%;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
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