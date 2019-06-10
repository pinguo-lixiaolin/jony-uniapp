<template>
	<swiper class="banner" indicator-color="rgba(255,255,255,0.5)" indicator-active-color="#fff" circular @change="swiperChange"
	 indicator-dots="true" autoplay previous-margin="25rpx" next-margin="25rpx">
		<swiper-item v-for="(img,key) in imgUrls" :key="key">
			<image class="banner-img" :class="{active: key==swiperIndex}" :src="img" mode="widthFix" />
		</swiper-item>
	</swiper>
</template>

<script>
	export default {
		data() {
			return {
				swiperIndex: 0,
				imgUrls: [
					"https://c360-o2o.c360dn.com/5ced3167be7c2",
					"https://c360-o2o.c360dn.com/ad-ps-applet-v2",
					"https://c360-o2o.c360dn.com/5c073af9e4487"
				]
			}
		},
		methods: {
			swiperChange(e) {
				this.swiperIndex = e.detail.current;
			}
		}
	}
</script>

<style lang="less">
	.banner {
		height: 306upx;
		width: 100%;
		background-color: #444972;
		padding-top: calc(var(--status-bar-height) + 90upx);
		padding-bottom: 20upx;

		swiper-item {
			border-radius: 8upx;

			.banner-img {
				width: 686upx;
				height: 280upx;
				position: absolute;
				left: 50%;
				top: 50%;
				margin-top: -140upx;
				margin-left: -343upx;
				border-radius: 8upx;
				transition: transform 0.2s ease-in 0s;

				&.active {
					transform: scale(1.0932944606413995);
				}
			}
		}
	}
</style>
