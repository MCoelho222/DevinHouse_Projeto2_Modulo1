export default {
    namespaced: true,
    state() {
        return {
            sendItens: [],
            item: {},
            errorMsg: null,
            toEdit: null,
            stats: {}
            //emprestado: false
        }
    },
    mutations: {
        saveItem(state, item) {
            if (localStorage.getItem('itens') === null) {
                let itens = []
                itens.push(item)
                localStorage.setItem('itens', JSON.stringify(itens))
            } else {
                let list = JSON.parse(localStorage.getItem('itens'))
                //Para edições
                let already = false
                list.forEach(prod => {
                    if (prod.patrimonio === item.patrimonio) {
                        let index = list.indexOf(prod)
                        list[index] = item
                        already = true
                    }
                })
                if (!already) {
                    list.push(item)
                }
                localStorage.setItem('itens', JSON.stringify(list))
            }
        },
        getItens(state) {
            let allItens = JSON.parse(localStorage.getItem('itens'))
            state.sendItens = allItens
        },
        // Deve-se chamar getItens primeiro
        getItem(state, patr) {
            state.sendItens.forEach(item => {
                if (item.patrimonio == patr) {
                    state.item = item
                }
            })
        },
        flagItem(state, itemEmprestado) {
            let itens = JSON.parse(localStorage.getItem('itens'))
            itens.forEach(item => {
                if (item.patrimonio === itemEmprestado.itemWhich.patrimonio) {
                    item.emprestado = itemEmprestado.itemTo
                }
            })
            localStorage.setItem('itens', JSON.stringify(itens))
        },
        editItem(state, patr) {
            state.toEdit = patr
        },
        delItem(state, patr) {
            let allItens = JSON.parse(localStorage.getItem('itens'))
            let newItens = allItens.filter(item => item.patrimonio !== patr)
            localStorage.setItem('itens', JSON.stringify(newItens))
        },
        itemStats(state) {
            state.stats.itens = state.sendItens.length
            state.stats.total = state.sendItens.reduce((acc, item) =>
                Number(item.valor.replace(',', '.')) + acc, 0
            )
            let emprestados = 0
            state.sendItens.forEach(item => {
                if (item.emprestado !== "Item disponível" && item.emprestado !== "") {
                    emprestados++
                }
            })
            state.stats.emprestados = emprestados  
        }
    },
    actions: {

    },
    getters: {
        sendItemToEdit(state) {
            let itemToEdit = {}
            let itens = JSON.parse(localStorage.getItem('itens'))
            itens.forEach(item => {
                if (item.patrimonio == state.toEdit) {
                    itemToEdit = item
                }
            })
            return itemToEdit
        }
    }
}