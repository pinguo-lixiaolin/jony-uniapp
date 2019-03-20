import Vue from 'vue';
import App from './App';

import store from './store';
import './services';
import './mixins';

// 挂载vuex
Vue.prototype.$store = store;

Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
	store: store,
	...App
})

app.$mount();
