import Vue from 'vue'
import Vuex from 'vuex'
import getters from  './getters'
import app from './modules/app'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	modules: {
		app
	},
	getters,
	strict: debug,
})
