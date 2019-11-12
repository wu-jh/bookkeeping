import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    url:'http://jizhang-api-dev.it266.com',
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
