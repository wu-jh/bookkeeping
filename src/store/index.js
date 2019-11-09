import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
    isLogin(state,data){
      if(!sessionStorage.getItem('token')){
        data.$router.push('/login')
      }
      data.token = sessionStorage.getItem('token')
    }
  },
  actions: {
  },
  modules: {
  }
})
