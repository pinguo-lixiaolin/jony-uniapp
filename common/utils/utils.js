const dcRichAlert = uni.requireNativePlugin('DCloud-RichAlert');

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

		confirmColor = confirmColor || "#EC3955"

		// wx.showModal({
		// 	title,
		// 	content,
		// 	confirmText,
		// 	confirmColor,
		// 	success(res) {
		// 		if (res.confirm) {
		// 			onOk && onOk();
		// 		}
		// 	}
		// })

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

	}
}
