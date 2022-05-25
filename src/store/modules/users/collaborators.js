import axios from "axios"

export default {
    namespaced: true,
    state() {
        return {
            saveSuccess: false,
            sendInfo: [{}],
            errorMsg: false,
        }
    },
    mutations: {
        saveCollab(state, collab) {
            let addressInfo = state.sendInfo[0]
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
                    collabList.forEach((item) => {
                        if (item.nome === collabObj.nome) {
                            already = true
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
    },
    actions: {
        cepInfo(context, cep) {
            axios.get(`https://viacep.com.br/ws/${cep}/json/`).then(response => {
                if (response.data.erro === 'true') {
                    context.state.errorMsg = 'CEP inválido.'
                } else {
                    context.state.sendInfo.pop()
                    context.state.sendInfo.push(response.data)
                }
            }).catch(() => {
                context.state.errorMsg = 'CEP inválido.'
            })
            setTimeout(() => {context.state.errorMsg = false}, 7000)
        }
    },
    getters: {
        sendInfo(state) {
            return state.sendInfo
        },
        sendErrorMsg(state) {
            return state.errorMsg
        },
    }
}