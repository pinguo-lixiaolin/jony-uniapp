import Vue from "vue";

import Utils from "@/common/utils/utils";
import Gio from "@/common/utils/gio-minp";


import api from '@/common/vmeitime-http';
import UserService from "./UserService";

Vue.prototype.$api = api
Vue.prototype.$Utils = Utils;
Vue.prototype.$Gio = Gio;

Vue.prototype.$userService = new UserService();
