import Vue from "vue";
import UserService from "./UserService";

Vue.prototype.$userService = new UserService();

function onRoute() {	
	const app = getApp();
	var pages = getCurrentPages();
	if (app && pages.length) {
		var pageId = pages[pages.length - 1].__route__;
		var webViewId = pages[pages.length - 1].__wxWebviewId__;
		if (app.globalData.__wxWebviewId__ !== webViewId) {
			app.globalData.__route__ = pageId;
			app.globalData.__wxWebviewId__ = webViewId;
			this.onRoute && this.onRoute();
		}
	}
}

// 重写公共方法
Vue.mixin({
	onShow: function() {
		// 模拟onRoute函数
		onRoute.call(this);
	}
})
