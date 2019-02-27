<template>
	<view class="content">{{ title }}</view>
</template>

<script>
const navigatortitle = {
	free: '免费相册',
	profesional: '专业相册',
	article: '图文直播'
};
export default {
	data() {
		return {
			type: 'free',
			title: ''
		};
	},
	onLoad(option) {
		this.type = option.type;
		this.title = navigatortitle[option.type];
		uni.setNavigationBarTitle({
			title: '添加' + this.title
		});
	},
	onShow() {}
};
</script>

<style>
.content {
	text-align: center;
	height: 400upx;
	margin-top: 200upx;
}
</style>
