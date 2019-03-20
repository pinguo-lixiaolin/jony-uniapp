import Vue from "vue";


import AV from "leancloud-storage/dist/av-weapp-min.js";
import Utils from "../common/utils/utils.js";
import $gio from "../common/utils/gio-minp.js";

import UserService from "./UserService";

Vue.prototype.$AV = AV;
Vue.prototype.$Utils = Utils;
Vue.prototype.$gio = $gio;

Vue.prototype.$userService = new UserService();