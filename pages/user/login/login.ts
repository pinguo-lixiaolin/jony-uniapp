import { Vue, Component } from 'vue-property-decorator';
import { mapState, mapMutations } from 'vuex';
import { Validation, Navigate } from '@/common/utils';
@Component({
	computed: {
		...mapState(['forcedLogin', 'userName'])
	}
})
export default class App extends Vue {
	loginType: string = 'code';
	inputType: string = '';
	codeInputing: boolean = false;
	mobile: string = '';
	codeSecond: number = 0;
	code: string = '';
	rememberPsw: boolean = false;

	get loginCode() {
		return this.loginType === 'code';
	}
	get loginPwd() {
		return this.loginType === 'pwd';
	}

	changeLoginType(type: string) {
		this.loginType = type;
	}

	shouldRemenberPsw() {
		this.rememberPsw = !this.rememberPsw;
	}

	startGetCode() {
		this.codeSecond = 59;
		let codeTimer = setInterval(() => {
			this.codeSecond--;
			if (this.codeSecond == 0) {
				clearInterval(codeTimer);
				uni.hideLoading();
			}
		}, 1000);
	}

	handleGetCode() {
		if (this.codeSecond != 0) return;
		if (!Validation.checkPhone(this.mobile)) return uni.showToast({ icon: 'none', title: '请输入正确的手机号' });
		this.codeInputing = true;
		// uni.showLoading({ title: '获取中...', mask: true });
		this.startGetCode();
	}

	handleContact() {
		console.log('hello');
	}
}
