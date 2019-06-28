<template>
	<view class="container">
		<view class="info-wrapper">
			<image class="welcome-pic" src="/static/images/login/welcome.png" mode="aspectFit" />
			<text class="subtitle">活 动 现 场 摄 影，就 用 ⌈ 一 拍 即 传 ⌋</text>
			<view class="login-choose-outview">
				<text :class="{ 'pink-bottom': loginCode }" @tap="changeLoginType('code')">验证码登录</text>
				<text :class="{ 'pink-bottom': loginPwd }" @tap="changeLoginType('pwd')">密码登录</text>
			</view>
			<view class="input-wrapper" v-show="loginCode">
				<!-- 电话 -->
				<view class="item-wrapper">
					<image class="login-phone-icon input-icon" src="/static/images/login/phone.png" mode="aspectFit" />
					<input class="input-value" placeholder="请输入手机号" type="number" cursor-spacing="50" v-model="mobile" maxlength="11" />
				</view>
				<!-- 验证码 -->
				<view class="item-wrapper margin-b-none">
					<image class="login-captch-icon input-icon" src="/static/images/login/captch.png" mode="aspectFit" />
					<input type="number" class="input-value code-input" :focus="codeInputing" placeholder="请输入验证码" cursor-spacing="50" v-model="code" maxlength="4" />
					<view class="code-btn" type="default" @tap="handleGetCode" hover-class="hover-btn" hover-stay-time="50">{{ codeSecond ? codeSecond + 's' : '获取' }}</view>
				</view>
				<view class="code-tips" @tap="handleContact" hover-class="hover-btn" hover-stay-time="50">收不到验证码？</view>
			</view>
			<view class="input-wrapper" v-show="loginPwd">
				<!-- 电话 -->
				<view class="item-wrapper">
					<image class="login-phone-icon input-icon" src="/static/images/login/phone.png" mode="aspectFit" />
					<input class="input-value" placeholder="请输入手机号" type="number" cursor-spacing="50" v-model="mobile" maxlength="11" />
				</view>
				<!-- 密码 -->
				<view class="item-wrapper margin-b-none">
					<image class="login-phone-icon input-icon" src="/static/images/login/login_lock.png" mode="aspectFit" />
					<input class="input-value" placeholder-class="placeholder" placeholder="请输入密码" type="password" :password="true" cursor-spacing="50" maxlength="50" v-model="psw" />
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

<script lang="ts" src="./login.ts"></script>
<style lang="less" src="./login.less"></style>
