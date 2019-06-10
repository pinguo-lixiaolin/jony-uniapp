<template>
	<view class="segmented-control">
		<view v-for="(item, index) in values" :class="['text', { active: index === currentIndex }]" :key="index" class="segmented-control-item"
		 @click="_onClick(index)">
			{{ item }}
		</view>
	</view>
</template>

<script>
	export default {
		name: 'UniSegmentedControl',
		props: {
			current: {
				type: Number,
				default: 0
			},
			values: {
				type: Array,
				default () {
					return []
				}
			},
			activeColor: {
				type: String,
				default: '#007aff'
			},
			styleType: {
				type: String,
				default: 'button'
			}
		},
		data() {
			return {
				currentIndex: 0
			}
		},
		watch: {
			current(val) {
				if (val !== this.currentIndex) {
					this.currentIndex = val
				}
			}
		},
		created() {
			this.currentIndex = this.current
		},
		methods: {
			_onClick(index) {
				if (this.currentIndex !== index) {
					this.currentIndex = index
					this.$emit('clickItem', index)
				}
			}
		}
	}
</script>

<style>
	@charset "UTF-8";

	.segmented-control {
		display: flex;
		flex-direction: row;
		width: 100%;
		box-sizing: border-box;
		margin: 10upx auto;
		border-radius: 10upx
	}

	.segmented-control-item {
		text-align: left;
		margin-left: 30upx;
		margin-right: 30upx;
		font-size: 36upx;
		line-height: 80upx;
		box-sizing: border-box;
		transition: all 0.2s ease-out;
		font-weight: normal;
		color: #555555;
	}

	.segmented-control-item.active {
		transform: scale(1.1);
		font-weight: 900;
		color: #444972;
	}
</style>
