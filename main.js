import Vue from 'vue';
import App from './App';

// 挂载服务
import './services';

// 挂载公共方法
import './mixins';

// 挂载vuex
import store from './store';
Vue.prototype.$store = store;

Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
	store: store,
	...App
})

app.$mount();
