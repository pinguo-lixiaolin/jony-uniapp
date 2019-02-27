<template>
	<view class="content" @click="handleClose" :class="{ active: active }">
		<image
			class="logo"
			:class="{ active: active }"
			src="../../../static/img/video.png"
			mode="aspectFit"
		/>
		<view class="tabbar-box-wrap" :class="{ active: active }">
			<view class="tabbar-box">
				<view class="tabbar-box-item" @click="goToPage('/pages/create/create?type=free')">
					<image class="box-image" src="../../../static/img/qa.png" mode="aspectFit" />
					<text class="explain">免费相册</text>
				</view>
				<view
					class="tabbar-box-item"
					@click="goToPage('/pages/create/create?type=profesional')"
				>
					<image class="box-image" src="../../../static/img/video.png" mode="aspectFit" />
					<text class="explain">专业相册</text>
				</view>
				<view
					class="tabbar-box-item"
					@click="goToPage('/pages/create/create?type=article')"
				>
					<image
						class="box-image"
						src="../../../static/img/release.png"
						mode="aspectFit"
					/>
					<text class="explain">图文直播</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			active: false
		};
	},
	onLoad() {},
	onShow() {
		setTimeout(() => {
			this.active = true;
		}, 10);
	},
	onHide() {
		this.active = false;
	},
	onBackPress(options) {
		if (options.from == 'backbutton') {
			this.goBack();
		}
		return true;
	},
	methods: {
		handleClose() {
			this.goBack();
		},
		goBack() {
			let from = uni.getStorageSync('createFrom');
			uni.switchTab({
				url: `/pages/tabbar/${from}/${from}`
			});
		},
		goToPage(url) {
			if (!url) return;
			uni.navigateTo({
				url
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	/* #ifdef H5 */
	height: calc(100vh - var(--window-bottom) - var(--window-top));
	/* #endif */
	/* #ifndef H5 */
	height: 100vh;
	/* #endif */
	transition: opacity 0.3s;
	background: #999;
	opacity: 0;
	&.active {
		opacity: 1;
	}
	.logo {
		position: relative;
		margin-top: -200upx;
		width: 200upx;
		height: 200upx;
		// z-index: -1;
		opacity: 0;
		transition: opacity 0.3s;
		&.active {
			opacity: 0.2;
		}
	}
}
.tabbar-box-wrap {
	position: absolute;
	width: 100%;
	padding: 50upx;
	box-sizing: border-box;
	bottom: -300upx;
	left: 0;
	transition: bottom 0.3s;
	&.active {
		bottom: 0upx;
	}
	.tabbar-box {
		position: relative;
		display: flex;
		width: 100%;
		background: #fff;
		border-radius: 20upx;
		padding: 15upx 20upx;
		box-sizing: border-box;
		z-index: 2;
		box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.1);
		&:after {
			content: '';
			position: absolute;
			bottom: -16upx;
			left: 0;
			right: 0;
			margin: auto;
			width: 50upx;
			height: 50upx;
			transform: rotate(45deg);
			background: #fff;
			z-index: 1;
			box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.1);
			border-radius: 2px;
		}
		&:before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: #ffffff;
			border-radius: 20upx;
			z-index: 2;
		}
		.tabbar-box-item {
			// position: relative;
			width: 100%;
			z-index: 3;
			margin: 10upx;
			color: $uni-color-subtitle;
			text-align: center;
			font-size: $uni-font-size-base;
			.box-image {
				width: 100%;
				height: $uni-img-size-lg;
			}
		}
	}
}
</style>
