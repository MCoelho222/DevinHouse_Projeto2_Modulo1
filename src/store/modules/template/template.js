export default {
    namespaced: true,
    state() {
        return {
            sidebarWidth: 300,
            toggleSideBar: true
        }
    },
    mutations: {
        controlSideBar(state) {
            if (state.toggleSideBar) {
              state.sidebarWidth = 50
              state.toggleSideBar = false
            } else {
              state.sidebarWidth = 300
              state.toggleSideBar = true
            }
          },
    },
    getters: {
        sidebar(state) {
            return `width: ${state.sidebarWidth}px; height: 100vh; display: flex; flex-direction: column; justify-content: space-around`
          },
        main(state) {
            return `width: calc(100% - ${state.sidebarWidth}px); height: 100%;`
        },
    }
}