import { Vue, Component } from 'vue-property-decorator';
import { mapState, mapMutations } from 'vuex';
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
	onRoute() {}
	changeLoginType(type: string) {
		this.loginType = type;
	}
	shouldRemenberPsw() {
		this.rememberPsw = !this.rememberPsw;
	}
	handleInputing(type: string) {
		this.inputType = type;
	}
	handleGetCode() {}
	handleContact() {
		console.log('hello');
	}
	handleBlur() {}
	handleChangeCode() {}
	handleChangePhone() {}
	handleGetCode() {}
}
