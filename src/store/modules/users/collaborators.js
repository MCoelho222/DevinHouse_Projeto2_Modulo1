import axios from "axios"

export default {
    namespaced: true,
    state() {
        return {
            saveSuccess: false,
            cepInfo: {},
            errorMsg: false,
            collabs: [],
            selectedId: null
        }
    },
    mutations: {
        setSelectedId(state, value) {
            state.selectedId = value
        },
        saveCollab(state, collab) {
            let addressInfo = state.cepInfo
            let cleanInfo = {}
            for (const [key, value] of Object.entries(addressInfo)) {
                if (key !== 'complemento') {
                    cleanInfo[key] = value
                }
            }
            let collabObj = {...collab, ...cleanInfo}
            try {
                state.saveSuccess = false
                if (localStorage.getItem('collaborators') === null) {
                    let collaborators = []
                    collabObj.id = 1
                    collaborators.push(collabObj)
                    localStorage.setItem('collaborators', JSON.stringify(collaborators))
                    state.saveSuccess = true
                } else {
                    let collabList = JSON.parse(localStorage.getItem('collaborators'))
                    let already = false
                    collabList.forEach(item => {
                        let firstName = item.nome.split(' ')[0]
                        let collabFirstName = collabObj.nome.split(' ')[0]
                        if (item.nascimento === collabObj.nascimento && firstName === collabFirstName) {
                            already = true
                            let index = collabList.indexOf(item)
                            item = {...collabObj}
                            collabList[index] = item
                            localStorage.setItem('collaborators', JSON.stringify(collabList))
                        }
                    })
                    if (!already) {
                        let index = collabList.length + 1
                        collabObj.id = index
                        collabList.push(collabObj)
                        localStorage.setItem('collaborators', JSON.stringify(collabList))
                        state.saveSuccess = true
                    } 
                }
            } catch(e) {
                state.saveSuccess = false
            }
        },
        getCollab(state) {
            let collabs = JSON.parse(localStorage.getItem('collaborators'))
            if (collabs !== null) {
                state.collabs = collabs
            }

        }
    },
    actions: {
        cepInfo(context, cep) {

            axios.get(`https://viacep.com.br/ws/${cep}/json/`).then(response => {

                if (response.data.erro === 'true') {
                    context.state.errorMsg = 'CEP inválido.'
                } else {

                    let localidade = document.getElementById('localidade')
                    let bairro = document.getElementById('bairro')
                    let logradouro = document.getElementById('logradouro')
                    let uf = document.getElementById('uf')
                    localidade.value = response.data.localidade
                    bairro.value = response.data.bairro
                    logradouro.value = response.data.logradouro
                    uf.value = response.data.uf
                    
                    context.state.cepInfo = response.data
                }
            }).catch(() => {

                context.state.errorMsg = 'CEP inválido.'
            })

            setTimeout(() => {context.state.errorMsg = false}, 5000)
        }
    },
    getters: {
        sendErrorMsg(state) {
            return state.errorMsg
        },
        sendCollabs(state) {
            return state.collabs
        },
        sendSelectedId(state) {
            return state.selectedId
        }
    }
}