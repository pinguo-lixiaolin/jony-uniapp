import Vue from "vue"

import UserService from "./UserService";

let userService: UserService = new UserService();

Vue.prototype.$userService = userService;