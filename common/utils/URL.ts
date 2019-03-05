/**
 * URL解析相关的模块
 */

// 导出URL的参数接口
export interface URLParams {
    url?: string,
    params? : any
}

export class URL {
    private static _instance: URL|null = null;
    
    static get sharedInstance(): URL  {
        if (URL._instance == null) {
            URL._instance = new URL();
        }
        return URL._instance;
    }

    static parseParams(params: any) {
        if (!params) return '';
        let requestParams: string[] = [];
        // Object.keys只遍历hasOwnProperty属性
        Object.keys(params).forEach(key => {
            const element = params[key];
            requestParams.push(key + '=' + element);
        });
        const requestParamsStr = requestParams.join('&');
        if (requestParamsStr.length > 0) {
            return requestParamsStr;
        } else {
            return '';
        }
    }
}


export const URLInstance = URL.sharedInstance;