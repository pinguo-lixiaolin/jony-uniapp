<template>
	<view class="home">
		<banners />
		<view class="main">
			<view class="tab-nav">
				<uni-segmented-control :current="current" :values="items" :style-type="styleType" :active-color="activeColor"
				 @clickItem="onClickItem" />
			</view>
			<view class="content">
				<view class="content-box" v-show="current === 0">
					3
				</view>
				<view class="content-box" v-show="current === 1">
					2
				</view>
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
	.main {
		display: flex;
		flex-direction: column;
		min-height: calc(100vh - 90upx - var(--status-bar-height));

		.tab-nav {
			left: 0;
			right: 0;
			position: fixed;
			background-color: rgba(255, 255, 255, .9);
			top: calc(90upx + var(--status-bar-height));
		}

		.content {
			display: flex;
			width: 100%;
			flex: 1;

			&-box {
				width: 100%;
				height: 300upx;
			}
		}

	}
</style>
