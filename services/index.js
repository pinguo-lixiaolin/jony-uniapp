import Vue from "vue";


import AV from "leancloud-storage/dist/av-weapp-min.js";
import Utils from "../common/utils/utils.js";
import Gio from "../common/utils/gio-minp.js";

import UserService from "./UserService";

Vue.prototype.$AV = AV;
Vue.prototype.$Utils = Utils;
Vue.prototype.$Gio = Gio;

Vue.prototype.$userService = new UserService();