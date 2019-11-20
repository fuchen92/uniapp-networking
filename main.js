import Vue from 'vue'
import VueI18n from "vue-i18n"

import LangZh from "./lang/zh.js"
import LangEn from "./lang/en.js"


import App from './App'

import navBar from "@/components/navBar";

Vue.use(VueI18n);

const i18n = new VueI18n({
	locale: "zh",
	messages: {
		"zh": LangZh,
		"en": LangEn
	}
})

Vue.config.productionTip = false

Vue.component('navBar', navBar)
 
Vue.prototype._i18n = i18n 

App.mpType = 'app'

const app = new Vue({
	i18n,
    ...App
})

app.$mount()
