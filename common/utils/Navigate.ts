/**
 * 通用的微信导航模块
 * @author: pengxiaolong
 * @Date 2018-01-16
 */

import { URL, URLParams } from './URL';

export class Navigate {
	private static _instance: Navigate | null = null;

	static get sharedInstance(): Navigate {
		if (Navigate._instance == null) {
			Navigate._instance = new Navigate();
		}
		return Navigate._instance;
	}

	static back(delta: number = 1) {
		uni.navigateBack({
			delta
		});
	}

	static redirectTo(obj: URLParams) {
		const parseString = URL.parseParams(obj.params);

		const urlStr = parseString ? obj.url + '?' + parseString : obj.url;
		uni.redirectTo({
			url: urlStr
		});
	}

	static goTo(obj: URLParams) {
		const parseString = URL.parseParams(obj.params);

		const urlStr = parseString ? obj.url + '?' + parseString : obj.url;
		return uni.navigateTo({
			url: urlStr
		});
	}
}

export const NavigateInstance = Navigate.sharedInstance;
