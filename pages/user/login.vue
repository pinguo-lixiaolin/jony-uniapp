<template>
	<view class="container">
		<view class="info-wrapper">
			<image class="welcome-pic" src="/static/images/login/welcome.png" mode="aspectFit" />
			<text class="subtitle">活 动 现 场 摄 影，就 用 ⌈ 一 拍 即 传 ⌋</text>
			<view class="login-choose-outview">
				<text :class="{ 'pink-bottom': loginType }" @click.stop="changeLoginType(1)">验证码登录</text>
				<text :class="{ 'pink-bottom': !loginType }" @click.stop="changeLoginType(0)">密码登录</text>
			</view>
			<view class="input-wrapper" :hidden="!loginType">
				<!-- 电话 -->
				<view class="item-wrapper">
					<image class="login-phone-icon input-icon" src="/static/images/login/phone.png" mode="aspectFit" />
					<input class="input-value" placeholder-class="placeholder" placeholder="请输入手机号" type="number" cursor-spacing="50"
					 @focus="handleInputing('phone')" :value="mobile" maxlength="11" @blur="handleBlur" @input="handleChangePhone" />
				</view>
				<!-- 验证码 -->
				<view class="item-wrapper margin-b-none">
					<image class="login-captch-icon input-icon" src="/static/images/login/captch.png" mode="aspectFit" />
					<input :type="passwordInpType" class="input-value code-input" placeholder-class="placeholder" placeholder="请输入验证码"
					 cursor-spacing="50" :focus="codeInputing" maxlength="4" @focus="handleInputing('code')" @blur="handleBlur" @input="handleChangeCode" />
					<view class="code-btn" type="default" @tap="handleGetCode" hover-class="hover-btn" hover-stay-time="50">
						{{ codeText == '获取' ? '获取' : codeText + 's' }}
					</view>
				</view>
				<view class="code-tips" @tap="handleContact" hover-class="hover-btn" hover-stay-time="50">
					收不到验证码？
				</view>
			</view>
			<view class="psw-login-outview" :hidden="loginType">
				<view class="item-wrapper">
					<image class="login-phone-icon input-icon" src="/static/images/login/phone.png" mode="aspectFit" />
					<input class="input-value" placeholder-class="placeholder" placeholder="请输入手机号" type="number" cursor-spacing="50"
					 @focus="handleInputing('phone')" maxlength="11" @blur="handleBlur" :value="mobile" @input="handleChangePhone" />
				</view>
				<view class="item-wrapper margin-b-none">
					<image class="login-phone-icon input-icon" src="/static/images/login/login_lock.png" mode="aspectFit" />
					<input class="input-value" placeholder-class="placeholder" placeholder="请输入密码" type="password" cursor-spacing="50"
					 @focus="handleInputing('psw')" maxlength="50" @blur="handleBlur" :value="psw" @input="handleChangePsw" />
				</view>
				<view class="more-choose-outview">
					<view class="remenber-psw" @tap="shouldRemenberPsw">
						<image v-if="rememberPsw" class="login-re-psw-icon" src="/static/images/login/re_psw.png" mode="aspectFit" />
						<image v-else class="login-re-psw-icon" src="/static/images/login/no_re_psw.png" mode="aspectFit" />
						<text>记住密码</text>
					</view>
					<text class="forget-psw" @tap="forgetPsw">忘记密码</text>
				</view>
			</view>
			<!-- 登录 -->
			<view class="login-btn" @tap="handleLogin" hover-class="hover-btn" hover-stay-time="50">登录</view>
			<view class="login-btn apply-btn" @tap="handleGoToApply" hover-class="hover-btn" hover-stay-time="50">注册</view>
		</view>
	</view>
</template>
<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import {
		Validation,
		Navigate
	} from '../../common/utils';
	import {
		WepyService
	} from "../../services/WepyService";

	export default {
		data() {
			return {
				inputType: '',
				codeInputing: false,
				mobile: '',
				codeText: '获取',
				code: '',
				codeLoading: false,
				hasSended: false,
				passwordInpType: 'number',
				loginType: 1, // 1验证码登陆 0密码登陆
				psw: '', //密码
				rememberPsw: true, //默认记住密码
				pinkLine_width: 0,
				pinkLine_left: 0
			};
		},
		computed: {
			...mapState(['forcedLogin', 'userName'])
		},
		onLoad() {
			let keyStr = ''
			if (this.$userService.isDev()) {
				keyStr = 'dev_'
			}

			this.mobile = WepyService.getStorageSync(keyStr + 'mobile')
			this.loginType = WepyService.getStorageSync(keyStr + 'loginType') == '0' ? 0 : 1

			let rememberPsw = WepyService.getStorageSync(keyStr + 'rememberPsw')
			if (rememberPsw == '1') {
				this.rememberPsw = true
				this.psw = WepyService.getStorageSync(keyStr + 'psw') || ''
			}
		},
		onShow() {
			WepyService.getSystemInfo().then((res) => {
				let system = res.system.toLocaleLowerCase()
				if (system.indexOf('ios') != -1) {
					this.passwordInpType = 'text';
				}
			});
		},
		onUnload() {
			clearInterval(this.codeTimer);
			this.codeText = '获取';
			this.codeLoading = false;
		},
		onHide() {
			clearInterval(this.codeTimer);
			this.codeText = '获取';
			this.codeLoading = false;
		},
		methods: {
			...mapMutations(['login']),
			onRoute() {
				console.log("login onRoute");
			},
			changeLoginType(type) {
				this.loginType = type;
			},
			handleInputing(type) {
				this.inputType = type;
			},
			handleBlur() {
				this.inputType = '';
				this.codeInputing = false;
			},
			handleChangePhone(e) {
				this.mobile = e.target.value
			},
			handleChangePsw(e) {
				this.psw = e.target.value
			},
			shouldRemenberPsw() {
				this.rememberPsw = !this.rememberPsw
			},
			forgetPsw() {

			},
			handleGetCode() {
				if (this.codeLoading)
					return;
				if (!Validation.checkPhone(this.mobile))
					return WepyService.showToast('请输入正确的手机号');
				this.codeLoading = true;
				WepyService.showLoading("获取中...");
				this.$userService.sendCodes(this.mobile, 2).then(res => {
					this.codeText = 59;
					this.codeInputing = true;
					this.codeTimer = setInterval(() => {
						this.codeText--;
						this.hasSended = true;
						if (this.codeText === 0) {
							clearInterval(this.codeTimer);
							this.codeText = '获取';
							this.codeLoading = false;
						}
					}, 1000)
				}).catch(error => {
					this.codeText = '获取';
					this.codeLoading = false;
					WepyService.hideLoading()
					if (error.statusCode == 200) {
						if (error.data.status == 10056) {
							WepyService.showConfirmModal({
								title: '',
								content: error.data.message,
								confirmText: '注册'
							}).then((res) => {
								if (res.confirm) {
									Navigate.goTo({
										url: '/pages/login/identCode/IdentCode',
									})
								}
							})
							return
						} else {
							WepyService.showConfirmModal({
								title: '',
								content: error.data.message
							})
							return
						}
					}
					WepyService.showReqErrorModal();
				}).finally(() => WepyService.hideLoading());
			},
			handleContact() {
				WepyService.showConfirmModal({
					title: '收不到验证码请联系客服',
					content: '客服电话：18011512439',
					confirmText: '拨打'
				}).then((res) => {
					if (res.confirm) {
						WepyService.makePhoneCall('18011512439')
					}
				})
			},
			handleChangeCode(e) {
				this.code = e.target.value;
			},
			codeLogin() {
				WepyService.showLoading("登录中...");
				this.$userService.login(this.code, this.mobile)
					.then((res) => {
						WepyService.hideLoading()

						let keyStr = ''
						if (this.$userService.isDev()) {
							keyStr = 'dev_'
						}

						// 是否设置过密码
						WepyService.setStorageSync({
							key: keyStr + "hasPsw",
							data: res.data.data.isPwd ? '1' : '0'
						})

						WepyService.setStorageSync({
							key: keyStr + 'selfToken',
							data: res.data.data.token
						})
						WepyService.setStorageSync({
							key: keyStr + 'mobile',
							data: this.mobile
						})
						WepyService.setStorageSync({
							key: keyStr + "loginType",
							data: '1'
						})
						// console.log(JSON.stringify(res.data))
						uni.switchTab({
							url: "/pages/tabbar/index/index"
						})
					})
					.catch((error) => {
						WepyService.hideLoading();
						if (error.data && error.data.message) {
							WepyService.showToast(error.data.message)
						} else {
							WepyService.showToast('登录失败,请稍后重试')
						}
					});
			},
			pwdLogin() {
				WepyService.showLoading("登录中...");
				this.$userService.checkPsw(this.mobile, this.psw).then((res) => {
					let keyStr = ''
					if (this.$userService.isDev()) {
						keyStr = 'dev_'
					}
					WepyService.setStorageSync({
						key: keyStr + "loginType",
						data: '0'
					})
					WepyService.setStorageSync({
						key: keyStr + 'selfToken',
						data: res.data.data.token
					})
					WepyService.setStorageSync({
						key: keyStr + 'mobile',
						data: this.mobile
					})
					WepyService.setStorage({
						key: keyStr + 'token',
						data: res.data.data.token
					}).then(() => {
						WepyService.hideLoading()
						if (this.rememberPsw) {
							WepyService.setStorage({
								key: keyStr + 'psw',
								data: this.psw
							})
						}
						WepyService.setStorage({
							key: keyStr + 'rememberPsw',
							data: this.rememberPsw ? '1' : '0'
						})
						uni.reLaunch({
							url: '/pages/tabbar/index/index'
						});
					})
				}).catch((err) => {
					WepyService.hideLoading()
					if (err.data && err.data.message) {
						if (err.data.status == 10073) {
							WepyService.showConfirmModal({
								title: '',
								content: '您还没有设置密码，请先设置密码',
								confirmText: '去设置'
							}).then((res) => {
								if (res.confirm) {
									Navigate.goTo({
										url: '/pages/user/identCode',
										params: {
											title: '设置密码'
										}
									})
								}
							})
						} else {
							WepyService.showToast(err.data.message)
						}
					} else {
						WepyService.showToast('登录失败,请稍后重试')
					}
				})
			},
			handleLogin() {
				this.mobile = Validation.beMobile(this.mobile)
				if (!Validation.checkPhone(this.mobile)) {
					WepyService.showToast('请输入正确的手机号');
					return;
				}
				if (this.loginType) { //验证码登陆
					if (!this.code) {
						WepyService.showToast('请输入验证码')
						return
					}
					this.codeLogin()
				} else { // 密码登录
					if (this.psw.length < 1) {
						WepyService.showToast('请输入密码')
						return false;
					}
					this.pwdLogin();
				}
			},
			handleGoToApply() {
				uni.navigateTo({
					url: "/pages/user/register"
				})
			}
		}
	};
</script>

<style lang="less">
	page {
		background: #fff;
		color: #333;
		height: 100%;
	}

	.hover-btn {
		opacity: .8;
	}

	.circle {
		position: absolute;
		width: 60upx;
		height: 60upx;
		border-radius: 50%;
		overflow: hidden;
		background: #56597a;
		left: 32upx;
	}

	.container {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		overflow: hidden;

		.info-wrapper {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 100%;

			.welcome-pic {
				width: 486upx;
				height: 59.7upx;
			}

			.title {
				font-size: 24upx;
				text-align: center;
				font-weight: bold;
			}

			.subtitle {
				font-size: 28upx;
				text-align: center;
				margin-top: 24upx;
			}

			.login-choose-outview {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 420upx;
				font-size: 30upx;
				margin-top: 82upx;
				position: relative;
			}

			.input-wrapper {
				margin-top: 106upx;
				width: 486upx;
				height: 300upx;
			}

			.item-wrapper {
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				margin-bottom: 40upx;
				// border-bottom: 1px solid #ccc;
				position: relative;
			}

			.input-icon {
				position: absolute;
				left: 0;
				top: 0;
				bottom: 0;
				display: block;
				margin: auto;
				width: 46upx;
				height: 46upx;
			}

			.input-value {
				padding-left: 68upx;
				width: 100%;
				height: 82upx;
				font-size: 32upx;
				background: #fff;
				line-height: 80upx;
				border-bottom: 1px solid #ccc;
				background: rgba(0, 0, 0, 0);
			}

			.input-value:hover {
				// .item-wrapper-actived {
				border-bottom: 1px solid #444972;
			}

			.border-none {
				// border: none!important;
			}

			.margin-b-none {
				margin-bottom: 0;
			}

			.more-choose-outview {
				width: 486upx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 22upx;
			}

			.login-re-psw-icon {
				width: 31.25upx;
				height: 31.25upx;
			}

			.psw-login-outview {
				margin-top: 106upx;
				width: 486upx;
				height: 300upx;
			}

			.remenber-psw {
				display: flex;
				align-items: center;
				font-size: 24upx;
				color: #333;
			}

			.forget-psw {
				color: #444972;
				font-size: 24upx;
			}

			.login-phone-icon {
				width: 44upx;
				height: 44upx;
			}

			.login-captch-icon {
				width: 44upx;
				height: 40upx;
			}

			.code-btn {
				margin-top: 26upx;
				margin-left: 20upx;
				width: 280upx;
				height: 55upx;
				color: #333;
				text-align: center;
				font-size: 30upx;
				line-height: 55upx;
				border-radius: 6upx;
				border: 1px solid #afafaf;
			}

			.code-tips {
				width: 630upx;
				color: #444972;
				font-size: 24upx;
				margin-top: 29upx;
				text-align: left;
				// text-decoration: underline;
			}

			.login-btn {
				margin: auto;
				margin-top: 30upx;
				// left: 0;
				// right: 0;
				// bottom: 302upx;
				width: 486upx;
				height: 76upx;
				border-radius: 50upx;
				color: #fff;
				font-size: 30upx;
				line-height: 76upx;
				text-align: center;
				background: -moz-linear-gradient(left top, #c92b75 0%, #ec3955 100%);
				background: -webkit-linear-gradient(left top, #c92b75 0%, #ec3955 100%);
				background: linear-gradient(to right bottom, #c92b75 0%, #ec3955 100%);
				background: linear-gradient(left top, #c92b75 0%, #ec3955 100%);
				box-shadow: 0 0 1px 1px 1px #373d42;
			}

			.apply-btn {
				background: rgba(255, 255, 255, 0.2);
				border: 1px solid #999;
				color: #333;
				margin-top: 30upx;
				// margin: auto;
				// bottom: 190upx;
				// left: 0;
				// right: 0;
			}

			.pink-bottom {
				border-bottom: 4px solid #f91e62;
				font-size: 40upx;
				font-weight: bolder;
			}

			.pink-b-line {
				background: #f91e62;
				height: 4px;
				transition: 0.2s;
				position: absolute;
				bottom: -5upx;
			}

			.login-hover-btn {
				background: #ba225a;
			}

			.register-hover-btn {
				background: #575757;
			}
		}
	}
</style>
