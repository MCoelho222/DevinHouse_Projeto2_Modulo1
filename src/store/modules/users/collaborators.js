import axios from "axios"

export default {
    namespaced: true,
    state() {
        return {
            registerSuccess: false,
            collaborators: null,
            sendInfo: [],
            errorMsg: false,
            cepDone: false

        }
    },
    mutations: {
        saveCollab(state, collab) {
            let addressInfo = state.sendInfo[0]
            let collabObj = {...collab, ...addressInfo}
            console.log(state.sendInfo)
            try {
                state.success = false
                if (localStorage.getItem('collaborators') === null) {
                    let collaborators = []
                    collab.id = 1
                    collaborators.push(collabObj)
                    localStorage.setItem('collaborators', JSON.stringify(collaborators))
                    state.registerSuccess = true
                } else {
                    let collabList = JSON.parse(localStorage.getItem('collaborators'))
                    let already = false
                    collabList.forEach((item) => {
                        if (item.email === collabObj.email) {
                            already = true
                        }
                    })
                    if (!already) {
                        let index = collabList.length + 1
                        collab.id = index
                        collabList.push(collabObj)
                        localStorage.setItem('collaborators', JSON.stringify(collabList))
                        state.registerSuccess = true
                        
                    }
                    
                }
            } catch(e) {
                state.registerSuccess = false
            }
            state.cepDone = false
            state.sendInfo = []
        },
    },
    actions: {
        cepInfo(context, cep) {
            
            axios.get(`https://viacep.com.br/ws/${cep}/json/`).then(response => {
                
                if (response.data.erro === 'true') {
                    context.state.errorMsg = 'CEP inválido.'
                } else {
                    context.state.sendInfo.push(response.data)
                    context.state.cepDone = true
                }
            }).catch(() => {
                context.state.errorMsg = 'CEP inválido.'
            })
            setTimeout(() => {context.state.errorMsg = false}, 3000)
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