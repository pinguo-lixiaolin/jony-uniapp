<template>
	<view class="home">
		<banners />
		<view class="tab-nav">
			<uni-segmented-control :current="current" :values="items" :style-type="styleType" :active-color="activeColor"
			 @clickItem="onClickItem" />
		</view>
		<view class="content">
			<view class="content-box" v-show="current === 0">
			</view>
			<view class="content-box" v-show="current === 1">

			</view>
		</view>
	</view>
</template>

<script>
	import banners from "./banners.vue";
	import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue'
	export default {
		data() {
			return {
				items: [
					'直播相册',
					'相册合辑'
				],
				current: 0,
				colorIndex: 0,
				activeColor: '#444972',
				styleType: 'text'
			}
		},
		components: {
			banners,
			uniSegmentedControl
		},
		methods: {
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index
				}
			}
		}
	}
</script>

<style lang="less">
	.content {
		display: flex;
		width: 100%;
		height: calc(100vh - 90upx - var(--status-bar-height));
		background: #ffffff;
		box-sizing: border-box;
		position: relative;

		&-box {
			height: 100%;
			position: absolute;
			display: flex;
			flex-direction: column;
			left: 0;
			right: 0;
			bottom: 0;
			top: 0;
			width: 100%;
		}
	}
</style>
