/**
 * @author: majianguang
 * @Date 2018-01-11
 * @since 0.0.1
 * 登录接口类
 */

import { NetworkBaseInterface, NetworkBase } from './NetworkBase';
import { NetworkConfig, InterfaceConfig } from '../common/Config';
import { DialogModel, DialogInterface } from '../model/DialogModel';
/**
 * 微信登录接口
 * 继承基础接口，保留了基础接口的请求网络功能
 */
interface WepyServiceInterface extends NetworkBaseInterface {
    /**
     * 微信登录
     * @param 
     * @returns Promise对象
     */
    login?<T>(): Promise<T>;
    /**
     * 设置导航标题
     * @param 标题
     * @returns Promise对象
     */
    setNavigationBarTitle?<T>(title: string): Promise<T>;
    /**
     * 显示对话框
     * @param modal
     * @returns Promise对象
     */
    showModal?<T>(modal: DialogInterface): Promise<T>
    /**
     * 显示默认对话框
     * @param content
     * @returns Promise对象
     */
    showSingleModal?<T>(content: string): Promise<T>
    /**
     * 显示错误对话框
     * @param content
     * @returns Promise对象
     */
    showReqErrorModal?<T>(): Promise<T>
    /**
     * 显示确定对话框
     * @param modal
     * @returns Promise对象
     */
    showConfirmModal?<T>(modal: DialogInterface): Promise<T>
    /**
     * 显示未绑定对话框
     * @param modal
     * @returns Promise对象
     */
    showNotBindModal?<T>(): Promise<T>
    /**
     * 显示loading
     * @param content
     * @returns Promise对象
     */
    showLoading?<T>(content: string): Promise<T>
    /**
     * 隐藏loading
     * @param content
     * @returns Promise对象
     */
    hideLoading?<T>(content: string): Promise<T>
    /**
     * 显示toast
     * @param content
     * @returns Promise对象
     */
    showSuccessToast?<T>(content: string): Promise<T>
    /**
     * 删除缓存
     * @param content
     * @returns Promise对象
     */
    removeStorage?<T>(removeKey: string): Promise<T>
    
    // 导航逻辑暂时放到UTIL里面
    // navigateBack?<T>(delta: number): Promise<T>
    // redirectTo?<T>(url: string): Promise<T>
    // navigateTo?<T>(url: string): Promise<T>

    /**
     * 微信获取用户信息
     * @param 
     * @returns Promise对象
     */
    getUserInfo?<T>(): Promise<T>
    /**
     * 授权
     * @param 
     * @returns Promise对象
     */
    authorize?<T>(scope: string): Promise<T>
    /**
     * 打开微信设置
     * @param 
     * @returns Promise对象
     */
    openSetting?<T>(): Promise<T>
    /**
     * 微信下载图片
     * @param 
     * @returns Promise对象
     */
    getImageInfo?<T>(src: string): Promise<T>
    /**
     * 触发微信下拉刷新
     * @param 
     * @returns Promise对象
     */
    startPullDownRefresh?<T>():Promise<T>
    /**
     * 微信停止下拉刷新
     * @param 
     * @returns Promise对象
     */
    stopPullDownRefresh?<T>():Promise<T>
    /**
     * 缓存路径保存到相册
     * @param filePath
     * @returns Promise对象
     */
    saveImageToPhotosAlbum?<T>(filePath: string): Promise<T>
    /**
     * 删除缓存路径
     * @param filePath
     * @returns Promise对象
     */
    removeSavedFile?<T>(filePath: string): Promise<T>
    /**
     * 微信打电话
     * @param phoneNum
     * @returns Promise对象
     */
    makePhoneCall?<T>(phoneNum: string): Promise<T>
    /**
     * 微信弹窗actionsheet
     * @param sheetInfo
     * @returns Promise对象
     */
    showActionSheet?<T>(sheetInfo:{}): Promise<T>
    /**
     * 微信剪切板
     * @param data
     * @returns Promise对象
     */
    setClipboardData?<T>(data:{}): Promise<T>
      /**
     * 微信获取本地缓存
     * @param data
     * @returns Promise对象
     */
    getStorageSync?<T>(data:{}): Promise<T>
    /**
     * 微信获取本地存储
     * @param data
     * @returns Promise对象
     */
    getStorage?<T>(data:{}): Promise<T>
    /**
     * 微信定位
     * @param data
     * @returns Promise对象
     */
    getLocation?<T>(data:{}): Promise<T>
    /**
     * 微信存入本地缓存
     * @param data
     * @returns Promise对象
     */
    setStorage?<T>(data:{}): Promise<T>
    /**
     * 微信存入本地缓存
     * @param data
     * @returns Promise对象
     */
    setStorageSync?<T>(data:{}): Promise<T>
    /**
     * 微信存入本地缓存
     * @param data
     * @returns Promise对象
     */
    createAnimation?<T>(animate:{}): Promise<T>
    /**
     * 微信支付
     * @param params
     * @returns Promise对象
     */
    requestPayment?<T>(params: {}): Promise<T>
    /**
     * 获取系统信息同步
     * @returns Promise对象
     */
    getSystemInfoSync?<T>(): Promise<T>
    /**
     * 获取系统信息 
     * @returns Promise对象
     */
    getSystemInfo?<T>(): Promise<T>

    setNavigationBarColor?<T>(): Promise<T>
}

export class WepyService extends NetworkBase implements WepyServiceInterface {
    static showToast(title: string) {		
        return uni.showToast({
            title: title || '成功',
            icon: 'none'
        });
    }
	static showLoading(title: string) {
        return uni.showLoading({
            title: title || '请稍候...',
            mask: true
        });
    }
	static hideLoading() {
        return uni.hideLoading();
    }
    static showConfirmModal(modal: DialogInterface) {
        let obj: DialogInterface = modal || DialogModel
        return new Promise((resolve,reject)=>{
			uni.showModal({
			    title: obj.title,
			    content: obj.content,
			    confirmText: obj.confirmText || '重试',
			    confirmColor: obj.confirmColor || '#000000',
			    cancelColor: '#666',
				success: resolve,
				fail: reject
			})
		});
    }
    static showReqErrorModal() {
        return new Promise((resolve,reject)=>{
			uni.showModal({
			    title: '请求失败',
			    content: '请检查网络或稍后重试',
			    showCancel: false,
			    confirmText: '确定',
			    confirmColor: '#666',
				success: resolve,
				fail: reject				
			})
		})
    }
    static makePhoneCall(phoneNum: string) {
        return uni.makePhoneCall({phoneNumber: phoneNum})
    }
    static getStorageSync(key:string) {
        return (uni as any).getStorageSync(key)
    }
	
    static getSystemInfoSync() {
        return uni.getSystemInfoSync()
    }

    static getSystemInfo() {
        return new Promise((resolve,reject)=>{
			uni.getSystemInfo({
				success: resolve,
				fail: reject
			})
		});
    }
	
	static setStorageSync(setObj: {key: string, data: any}) {
		return new Promise((resolve,reject)=>{
			try{				
				(uni as any).setStorageSync(setObj.key, setObj.data)
				resolve();
			}catch(e){
				reject(e);
			}
		})
    }
	
}
