// const dcRichAlert = uni.requireNativePlugin('DCloud-RichAlert');

export default {
	// 模拟onRoute
	onRoute(cb) {
		var pages = getCurrentPages();		
		var pageId = pages[pages.length - 1].__route__;
		var webViewId = pages[pages.length - 1].__wxWebviewId__;
		console.log("current:"+this.__wxWebviewId__);
		console.log('page:'+ webViewId);
// 		if (this.__wxWebviewId__ !== webViewId) {
// 			this.__route__ = pageId;
// 			this.__wxWebviewId__ = webViewId;
// 			cb && cb();
// 		}
	},
	showConfirmModal(params) {
		let {
			title,
			titleColor,
			content,
			contentAlign,
			confirmText,
			confirmColor,
			onOk
		} = params;

		confirmColor = confirmColor || "#EC3955"

		wx.showModal({
			title,
			content,
			confirmText,
			confirmColor,
			success(res) {
				if (res.confirm) {
					onOk && onOk();
				}
			}
		})

		/*dcRichAlert.show({
				position: 'center',
				title,
				titleColor,
				content,
				contentAlign,
				buttons: [{
						title: confirmText || '确定',
						titleColor: confirmColor || '#EC3955'
					},
					{
						title: '取消'
					}
				]
			},
			result => {
				switch (result.index) {
					case 0:
						onOk && onOk();
						break;
					default:
						break;
				}
			}
		); */

	}
}
