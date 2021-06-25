import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		course:null,
		userInfo:null,
		chooseusers:[],
		token:false
  },
  mutations: {
		editCourse(state,obj){
			state.name=obj
		},
		setUserInfo(state,payload){
			state.userInfo=payload
			state.token=payload.sessionId
		},
		setUsers(state,payload){
			state.chooseusers=payload
		},
		initUser(state){
			let user=localStorage.getItem('user_info')
			if(user){
				user=JSON.parse(user)
				state.userInfo=user
				state.token=user.sessionId
			}
		},
		logout(state){
			localStorage.removeItem('user_info')
			state.userInfo=null
			state.token=false
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
