import Vue from 'vue';
import VueI18n from "vue-i18n";

import LangZh from "./lang/zh.js";
import LangEn from "./lang/en.js";


import App from './App';
import store from "./store/index.js";

import navBar from "@/components/navBar";

Vue.use(VueI18n);

const i18n = new VueI18n({
	locale: App.globalData.lang,
	messages: {
		"zh": LangZh,
		"en": LangEn
	}
})

Vue.config.productionTip = false;

Vue.component('navBar', navBar);

Vue.prototype.$store = store;
Vue.prototype.$eventNo = 68;
Vue.prototype.$localApiDomain = 'http://192.168.1.21:89';
Vue.prototype.$apiDomain = 'https://socialapi.traveldaily.cn';
Vue.prototype._i18n = i18n;

App.mpType = 'app';

const app = new Vue({
	i18n,
	store,
    ...App
})

app.$mount()
