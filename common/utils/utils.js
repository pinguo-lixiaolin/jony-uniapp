// #ifdef APP-PLUS
const dcRichAlert = uni.requireNativePlugin('DCloud-RichAlert');
// #endif
export default {
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
		// #ifdef MP-WEIXIN
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
		// #endif
		// #ifdef APP-PLUS
		dcRichAlert.show({
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
		);
		// #endif
	}
}
