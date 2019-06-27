<template>
	<view class="container">
		<view class="info-wrapper">
			<image class="welcome-pic" src="/static/images/login/welcome.png" mode="aspectFit" />
			<text class="subtitle">活 动 现 场 摄 影，就 用 ⌈ 一 拍 即 传 ⌋</text>
			<view class="login-choose-outview">
				<text :class="{ 'pink-bottom': loginCode }" @tap.stop="changeLoginType('code')">验证码登录</text>
				<text :class="{ 'pink-bottom': loginPwd }" @tap.stop="changeLoginType('pwd')">密码登录</text>
			</view>
			<view class="input-wrapper" v-show="loginCode">
				<!-- 电话 -->
				<view class="item-wrapper">
					<image class="login-phone-icon input-icon" src="/static/images/login/phone.png" mode="aspectFit" />
					<input class="input-value" placeholder-class="placeholder" placeholder="请输入手机号" type="number" cursor-spacing="50"
					 @focus="handleInputing('phone')" :value="mobile" maxlength="11" @blur="handleBlur" @input="handleChangePhone" />
				</view>
				<!-- 验证码 -->
				<view class="item-wrapper margin-b-none">
					<image class="login-captch-icon input-icon" src="/static/images/login/captch.png" mode="aspectFit" />
					<input type="number" class="input-value code-input" placeholder-class="placeholder" placeholder="请输入验证码"
					 cursor-spacing="50" :focus="codeInputing" maxlength="4" @focus="handleInputing('code')" @blur="handleBlur" @input="handleChangeCode" />
					<view class="code-btn" type="default" @tap="handleGetCode" hover-class="hover-btn" hover-stay-time="50">
						{{ codeSecond ? codeSecond + 's': '获取' }}
					</view>
				</view>
				<view class="code-tips" @tap="handleContact" hover-class="hover-btn" hover-stay-time="50">
					收不到验证码？
				</view>
			</view>
			<view class="input-wrapper" v-show="loginPwd">

			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import {
		Vue,
		Component
	} from 'vue-property-decorator';
	@Component({})
	export default class App extends Vue {
		loginType: string = 'code'
		inputType: string = ''
		codeInputing: boolean = false
		mobile: string = ''
		codeSecond: number = 0
		code: string = ''
		get loginCode() {
			return this.loginType === 'code';
		}
		get loginPwd() {
			return this.loginType === 'pwd';
		}
		onRoute() {}
		changeLoginType(type: string) {
			this.loginType = type;
		}
		handleInputing(type: string) {
			this.inputType = type;
		}
		handleBlur() {

		}
		handleChangeCode() {

		}
		handleGetCode() {

		}
	}
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
				border-bottom: 1px solid #444972;
			}

			.border-none {}

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
			}

			.login-btn {
				margin: auto;
				margin-top: 30upx;
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
