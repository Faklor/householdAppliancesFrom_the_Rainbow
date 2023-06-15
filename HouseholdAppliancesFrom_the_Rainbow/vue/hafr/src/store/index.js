import { createStore } from 'vuex'

export default createStore({
  state: {
    visiable:1,
    timer:null,
    user:localStorage.userRole,
  },
  mutations: {
  },
  actions: {
    async startTimer(ctx) {
      state.timer = setInterval(() => {
        console.log(state.visibleMenu)
        state.visibleMenu = localStorage.vis
      }, 500)
    },
    stopTimer() {
      clearTimeout(state.timer)
    },
  },
  getters:{
    openCloseTimer(state){
      return state.visiable
    }
  },
  modules: {
  }
})
