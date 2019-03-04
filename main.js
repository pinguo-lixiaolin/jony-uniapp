import Vue from 'vue'
import App from './App'

import AV from "leancloud-storage/dist/av-weapp-min.js"
import Utils from './common/utils/utils.js';

Vue.prototype.$AV = AV;
Vue.prototype.$Utils = Utils;
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
