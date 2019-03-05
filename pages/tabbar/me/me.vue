<template>
	<view class="content"><button type="primary" @click="handleLogout">退出登录</button></view>
</template>

<script>
export default {
	data() {
		return {
			title: 'Hello'
		};
	},
	onLoad() {},
	onShow() {
		uni.setStorageSync('createFrom', 'me');
	},
	methods: {
		handleLogout() {
			this.$Utils.showConfirmModal({
				title: '退出登录',
				content: '是否退出当前帐号?',
				confirmText: '退出',
				confirmColor: '#EC3955',
				onOk() {
					console.log('退出');
					uni.redirectTo({
						url: '/pages/user/login'
					});
				}
			});
		}
	}
};
</script>

<style>
.content {
	text-align: center;
	height: 400upx;
	margin-top: 200upx;
	padding: 30upx;
}
</style>
