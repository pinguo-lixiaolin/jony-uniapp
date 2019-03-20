<template>
	<view class="">login</view>
</template>

<script lang="ts">
	import {
		Vue,
		Component
	} from 'vue-property-decorator';
	@Component({
		onShow() {
			let that: any = this;
		}
	})
	export default class App extends Vue {
		constructor() {
			super();
		}
		onRoute() {
			console.log("onRoute")
		}
	}
</script>
