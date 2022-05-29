<template>
    <label>
        <div id="modal-btn" data-bs-toggle="modal" :data-bs-target="cardType == 'inventory' ? '#editItemModal' : '#collabModal'" @click="cardType == 'inventory' ? editItem(item): collabDetails(item)">
            <img v-if="cardType == 'inventory'" class="img" :src="img" alt="">
            <vue-gravatar class="gravatar rounded-circle" :email="img" size="100" v-else/>
            <span class="first mb-3 mt-3 lh-1 fw-bold">{{ first }}</span>
            <p class="second">{{ second }}</p>
            <p class="third">{{ third }}</p>
            <span class="fourth" v-if="cardType == 'inventory' && (fourth == 'Item disponível' || fourth == '')">Na empresa</span>
            <span class="fourth" v-else-if="cardType == 'inventory'">{{fourth}}</span>
            <p class="fourth" v-else-if="cardType == 'user-list'">{{ fourth }}</p>
        </div>
    </label>
</template>
<script>
export default {
    props: {
        img: {
            type: String
        },
        first: {
            type: String
        },
        second: {
            type: String
        },
        third: {
            type: String
        },
        fourth: {
            type: String
        },
        cardType: {
            type: String
        },
        item: {

        }
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
        },
         editItem(item) {
            this.$store.commit('itens/editItem', item)
            // let form = document.getElementById('search-item-form')
            // form.reset()
        },
    }
}
</script>
<style scoped>
img {
max-width: 150px;
max-height: 100px;
}
.first {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 260px;
    height: 340px;
    background-color: rgb(187, 218, 245);
    border-radius: 10px;
    padding: 20px;
    text-align: center;
}
.fourth {
    
    font-weight: bold;
    color: rgb(17, 110, 183);
}
</style>