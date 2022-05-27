<template>
<div class="container">
    <div id="data-cards">
        <label class="cards">
            <span>
                <div class="icon-data">
                    <i class="fa-solid fa-user fa-3x"></i>
                    <p class="data">{{}}</p>
                </div>
                <p class="data-footer">Colaboradores</p>
            </span>
        </label>
        <label class="cards">
            <span>
                <div class="icon-data">
                    <i class="fa-solid fa-user fa-3x"></i>
                    <p class="data">{{}}</p>
                </div>
                <p class="data-footer">Colaboradores</p>
            </span>
        </label>
        <label class="cards">
            <span>
                <div class="icon-data">
                    <i class="fa-solid fa-user fa-3x"></i>
                    <p class="data">{{}}</p>
                </div>
                <p class="data-footer">Colaboradores</p>
            </span>
        </label>
        <label class="cards">
            <span>
                <div class="icon-data">
                    <i class="fa-solid fa-user fa-3x"></i>
                    <p class="data">{{}}</p>
                </div>
                <p class="data-footer">Colaboradores</p>
            </span>
        </label>
    </div>
    <!-- <div id="collab-cards">
        <label class="cards" v-for="item in bringCollabs" :key="item.id" >
            <div id="modal-btn" data-bs-toggle="modal" data-bs-target="#collabModal" @click="collabDetails(item)">
                <span>
                    <i class="fa-solid fa-user fa-3x"></i>
                    <p id="collab-name">{{item.nome}}</p>
                    <p id="collab-name">{{item.email}}</p>
                    <p id="collab-name">{{item.telefone}}</p>
                    <p id="collab-name">{{item.cargo}}</p>
                </span>
            </div>
        </label>
    </div> -->
</div>
</template>
<script>
export default {

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
</style>