<template>
	<view class="container">
		<view class="info-wrapper">
			<image class="welcome-pic" src="/static/images/login/welcome.png" mode="aspectFit" />
			<text class="subtitle">活 动 现 场 摄 影，就 用 ⌈ 一 拍 即 传 ⌋</text>
			<view class="login-choose-outview">
				<text :class="{ 'pink-bottom': loginType }" @tap.stop="changeLoginType(1)">验证码登录</text>
				<text :class="{ 'pink-bottom': !loginType }" @tap.stop="changeLoginType(0)">密码登录</text>
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
		onShow() {},
		methods: {
			...mapMutations(['login']),
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
				if (this.codeLoading) return false;
				if (!Validation.checkPhone(this.mobile)) {
					uni.showToast({
						title: "请输入正确的手机号",
						icon: "none"
					});
					return;
				}
				this.codeLoading = true;
				uni.showLoading({
					title: "获取中..."
				})
				this.$userService.sendCodes(this.mobile).then(res => {
					console.log(JSON.stringify(res));
				}).finally(() => {
					uni.hideLoading();
				})
			},
			handleContact() {
				this.$Utils.showConfirmModal({
					title: '收不到验证码请联系客服',
					content: '客服电话：18011512439?',
					confirmText: '拨打',
					onOk() {
						uni.makePhoneCall({
							phoneNumber: '18011512439'
						});
					}
				});
			},
			handleChangeCode(e) {
				this.code = e.target.value;
			},
			handleLogin() {

			},
			handleGoToApply() {

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

	.circle {
		position: absolute;
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		overflow: hidden;
		background: #56597a;
		left: 32rpx;
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
				width: 486rpx;
				height: 59.7rpx;
			}

			.title {
				font-size: 24rpx;
				text-align: center;
				font-weight: bold;
			}

			.subtitle {
				font-size: 28rpx;
				text-align: center;
				margin-top: 24rpx;
			}

			.login-choose-outview {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 420rpx;
				font-size: 30rpx;
				margin-top: 82rpx;
				position: relative;
			}

			.input-wrapper {
				margin-top: 106rpx;
				width: 486rpx;
				height: 300rpx;
			}

			.item-wrapper {
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				margin-bottom: 40rpx;
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
				width: 46rpx;
				height: 46rpx;
			}

			.input-value {
				padding-left: 68rpx;
				width: 100%;
				height: 82rpx;
				font-size: 32rpx;
				background: #fff;
				line-height: 80rpx;
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
				width: 486rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 22rpx;
			}

			.login-re-psw-icon {
				width: 31.25rpx;
				height: 31.25rpx;
			}

			.psw-login-outview {
				margin-top: 106rpx;
				width: 486rpx;
				height: 300rpx;
			}

			.remenber-psw {
				display: flex;
				align-items: center;
				font-size: 24rpx;
				color: #333;
			}

			.forget-psw {
				color: #444972;
				font-size: 24rpx;
			}

			.login-phone-icon {
				width: 44rpx;
				height: 44rpx;
			}

			.login-captch-icon {
				width: 44rpx;
				height: 44rpx;
			}

			.code-btn {
				margin-top: 26rpx;
				margin-left: 20rpx;
				width: 280rpx;
				height: 55rpx;
				color: #333;
				text-align: center;
				font-size: 30rpx;
				line-height: 55rpx;
				border-radius: 6rpx;
				border: 1px solid #afafaf;
			}

			.code-tips {
				width: 630rpx;
				color: #444972;
				font-size: 24rpx;
				margin-top: 29rpx;
				text-align: left;
				// text-decoration: underline;
			}

			.login-btn {
				margin: auto;
				margin-top: 30rpx;
				// left: 0;
				// right: 0;
				// bottom: 302rpx;
				width: 486rpx;
				height: 76rpx;
				border-radius: 50rpx;
				color: #fff;
				font-size: 30rpx;
				line-height: 76rpx;
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
				margin-top: 30rpx;
				// margin: auto;
				// bottom: 190rpx;
				// left: 0;
				// right: 0;
			}

			.pink-bottom {
				border-bottom: 4px solid #f91e62;
				font-size: 40rpx;
				font-weight: bolder;
			}

			.pink-b-line {
				background: #f91e62;
				height: 4px;
				transition: 0.2s;
				position: absolute;
				bottom: -5rpx;
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
