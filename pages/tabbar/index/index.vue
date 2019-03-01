<template>
	<view class="content">
		<image @click="showArgs" class="logo" src="../../../static/logo.png"></image>
		<view>
			<text class="title" @click="showToast">{{ title }}</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: 'Hello Word'
		};
	},
	onLoad() {
		uni.setStorageSync('createFrom', 'index');
	},
	onShow() {},
	methods: {
		showArgs() {
			plus.nativeUI.alert(JSON.stringify(plus.runtime.arguments));
		},
		showToast() {
			var user = new this.$AV.User();
			user.setUsername('lixiaolin222' + Date.now());
			user.setPassword('123456');
			user.setEmail('lixiaolin_23@foxmail.com');
			console.log(JSON.stringify(user.signUp()));
			user.signUp().then(
				function(loginedUser) {
					// 注册成功，跳转到商品 list 页面
					console.log(loginedUser);
					wx.showToast({
						title: '注册成功',
						duration: 3000
					});
				},
				function(error) {
					console.log(JSON.stringify(error));
					plus.nativeUI.toast(
						(error.rawMessage && error.rawMessage.replace('。', '')) || '访问出错'
					);
				}
			);
		}
	}
};
</script>

<style>
.content {
	text-align: center;
	height: 400upx;
}
.logo {
	height: 200upx;
	width: 200upx;
	margin-top: 200upx;
}
.title {
	font-size: 36upx;
	color: #8f8f94;
}
</style>
