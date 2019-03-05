import { Base64Instance, Base64 } from './index';

export class CommonUtils {
	private static _instance: CommonUtils | null = null;

	static get sharedInstance(): CommonUtils {
		if (CommonUtils._instance == null) {
			CommonUtils._instance = new CommonUtils();
		}
		return CommonUtils._instance;
	}

	constructor() {}

	static systemInfo = uni.getSystemInfoSync();

	static rpxToPx(rpx: number) {
		return (rpx * (CommonUtils as any).systemInfo.windowWidth) / 750;
	}

	static pxToRpx(px: number) {
		return px / ((CommonUtils as any).systemInfo.windowWidth / 750);
	}

	static imageMogr() {
		return `imageslim`;
	}
}

export const CommonUtilsInstance = CommonUtils.sharedInstance;
