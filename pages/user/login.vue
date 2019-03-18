<template>
	<view class="">login</view>
</template>

<script lang="ts">
	import { Vue, Component } from 'vue-property-decorator';
	@Component({
		onShow() {
			console.log("login onshow");
		}
	})
	export default class App extends Vue {
		constructor() {
			super();
		}
		onRoute() {
			console.log("hello word")
		}
	}
</script>
