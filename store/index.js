import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
		Token: uni.getStorageSync('token') || "",
    },
	mutations: {
		login(state, token) {
			state.Token = "agadsfasdf";
			// state.Token = token;
		},
		logout(state) {
			state.Token = "";
		},
	}
});

