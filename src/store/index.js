import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		course:null
  },
  mutations: {
		editCourse(state,obj){
			state.name=obj
		}
  },
	getters:{
		getCourse(state){
			return state.course
		}
	},
  actions: {
  },
  modules: {
  }
})
