import Vue from 'vue';
import App from './App';

import AV from "leancloud-storage/dist/av-weapp-min.js";
import Utils from './common/utils/utils.js';
import $gio from './common/utils/gio-minp.js';
import store from './store';
import './services';

// 挂载vuex
Vue.prototype.$store = store;
Vue.prototype.$AV = AV;
Vue.prototype.$Utils = Utils;
Vue.prototype.$gio = $gio;

Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
	store: store,
	...App
})

app.$mount();
