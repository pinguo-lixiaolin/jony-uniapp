<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
			this.$AV.init({
				appId: 'uaN8nyxBz8xtLA6JSpvTfC9i-gzGzoHsz',
				appKey: 'BqoFgiHabN0lhlvwJyFmBnjP'
			});
			this.$Gio('init', '87a8f5f5eb47acfc', 'wx037cf4991c33a506', {
				version: '2.3.0',
				getLocation: true,
				followShare: true,
				debug: false
			});
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
	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import './common/uni.css';
</style>
