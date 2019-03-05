<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
		this.$AV.init({
			appId: 'uaN8nyxBz8xtLA6JSpvTfC9i-gzGzoHsz',
			appKey: 'BqoFgiHabN0lhlvwJyFmBnjP'
		});
		this.$gio('init', '87a8f5f5eb47acfc', 'wx037cf4991c33a506', {
			version: '2.3.0',
			getLocation: true,
			followShare: true,
			debug: false
		});
		// 		setTimeout(() => {
		// 			uni.setTabBarBadge({
		// 				index: 1,
		// 				text: '31'
		// 			});
		// 			uni.showTabBarRedDot({
		// 				index: 3
		// 			});
		// 		}, 1000);
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/*每个页面公共css */
</style>
