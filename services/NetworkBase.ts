/**
 * @author: majianguang
 * @Date 2018-01-11
 * @since 0.0.1
 * 网络基础接口类
 */

import { NetworkConfig } from '../common/Config';
import { URL } from '../common/utils';


export function getHost(type?: NetworkConfig.NetworkType): string {
    // ENV从全局配置里面取。如果都没有定义就是release
    type = type || NetworkConfig.ENV || NetworkConfig.NetworkType.Release;
    const { NetworkHost, NetworkType } = NetworkConfig;

    return NetworkHost[type];
}

/**
 * 基础接口，只有单纯的请求，没有其他强相关请求
 * 登录相关、上传相关的，抽到其子类里面
 */
type RequestMethod = "OPTIONS" | "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT" | undefined;

export interface NetworkBaseInterface {
    root: string;
    request<T>(url: string, params: {}, method: RequestMethod): Promise<T>;
    isDev: () => boolean;
}

export class NetworkBase implements NetworkBaseInterface {
    root: string;

    constructor() {
        this.root = getHost();
    }

    isDev() {
        if (this.root === NetworkConfig.NetworkHost.Debug) {
            return true;
        } else {
            return false;
        }
    }


    request<T>(url: string, params: Object = {}, method: RequestMethod = NetworkConfig.RequestMethod.POST): Promise<T> {
        if (method === NetworkConfig.RequestMethod.GET) {
            let requestParamsStr = URL.parseParams(params);
            if (requestParamsStr) {
                url = url + '?' + requestParamsStr;
            }
        }

        return new Promise((resolve, reject) => {
            uni.request({
                url: this.root + url,
                data: params,
                header: NetworkConfig.RequestHeader,
                method: method,
                success: (res: any) => {
                    if (res.data.status == 200) {
                        resolve && resolve(res)
                    } else {
                        reject && reject(res)
                    }
                },
                fail: (error: any) => {
					console.log(JSON.stringify(error));
                    reject && reject(error)
                }
            })
        });
    }

}

