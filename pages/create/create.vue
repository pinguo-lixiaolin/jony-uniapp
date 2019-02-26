<template>
	<view class="content">页面 - {{ type }}</view>
</template>

<script>
export default {
	data() {
		return {
			type: 'free'
		};
	},
	onLoad(option) {
		this.type = option.type;
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
