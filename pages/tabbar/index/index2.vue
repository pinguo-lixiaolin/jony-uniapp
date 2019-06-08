<template>
	<view>
		<!-- #ifdef APP-PLUS -->
		<button @click="pluginShow">PluginTestFunction</button>
		<button @click="pluginShowArrayArgu">PluginTestFunctionArrayArgu</button>
		<button @click="pluginGetString">PluginTestFunctionSync</button>
		<button @click="pluginGetStringArrayArgu">PluginTestFunctionSyncArrayArgu</button>
		<button @tap="handleOpenPage" type="primary">打开原生页面</button>
		<!-- #endif -->
	</view>
</template>
<style>
	button {
		width: 94%;
		margin: 20upx auto;
	}
</style>
<script>
	// 扩展的 js 文件的位置：common/plugins.js
	// #ifdef APP-PLUS
	var plugins = require('../../../common/plugins.js');
	// #endif
	export default {
		data() {
			return {
				// #ifdef APP-PLUS
				plugins: plugins
				// #endif
			};
		},
		onShow() {
			uni.setStorageSync('createFrom', 'index');
		},		
		methods: {
			handleOpenPage() {
				var Intent = plus.android.importClass("android.content.Intent");
				var ComponentName = plus.android.importClass("android.content.ComponentName");
				var _intent = new Intent();
				_intent.setComponent(new ComponentName("com.example.myapplication", "com.example.myapplication.MainActivity"));
				var main = plus.android.runtimeMainActivity();
				main.startActivity(_intent);
				console.log("打开原生页面");
			},
			pluginShow() {
				this.plugins.PluginTestFunction(
					'Html5',
					'Plus',
					'AsyncFunction',
					'MultiArgument!',
					function(result) {
						uni.showToast({
							title: JSON.stringify(result),
							icon: 'none'
						});
					},
					function(result) {
						uni.showToast({
							title: result
						});
					}
				);
			},
			pluginShowArrayArgu() {
				this.plugins.PluginTestFunctionArrayArgu(
					['Html5', 'Plus', 'AsyncFunction', 'ArrayArgument!'],
					function(result) {
						uni.showToast({
							title: result,
							icon: 'none'
						});
					},
					function(result) {
						uni.showToast({
							title: result,
							icon: 'none'
						});
					}
				);
			},
			pluginGetString() {
				uni.showToast({
					title: this.plugins.PluginTestFunctionSync('Html5', 'Plus', 'SyncFunction', 'MultiArgument!'),
					icon: 'none'
				});
			},
			pluginGetStringArrayArgu() {
				var Argus = this.plugins.PluginTestFunctionSyncArrayArgu([
					'Html5',
					'Plus',
					'SyncFunction',
					'ArrayArgument!'
				]);
				uni.showToast({
					title: Argus.RetArgu1 + '_' + Argus.RetArgu2 + '_' + Argus.RetArgu3 + '_' + Argus.RetArgu4,
					icon: 'none'
				});
			}
		}
	};
</script>
<style>
</style>
