/**
 * @author: 韦浩东
 * @Date 2018-01-12
 * @since 0.0.1
 * 用户信息接口相关类
 */

import { NetworkBaseInterface, NetworkBase } from './NetworkBase';
import { NetworkConfig, InterfaceConfig } from '../common/Config';


export interface UserServiceInterface extends NetworkBaseInterface {
    /**
     * 检查验证码是否正确
     * @param code 验证码
     * @returns Promise对象
     */
    checkCode?<T>(code: string, mobile: string): Promise<T>;

    /**
     * 检查是否绑定过
     * @param code wx登录返回代码
     * @returns Promise对象
     */
    login?<T>(code: string, mobile: string): Promise<T>;
    /**
     * 发送验证码
     * @param mobile 手机号
     * @param type 类型 1 注册短信 2 登录短信
     * @returns Promise对象
     */
    sendCodes?<T>(mobile: number, type: number): Promise<T>;
    /**
     * 绑定
     * @param mobile 手机号
     * @param code 验证码
     * @param nickname 名字
     * @param address 地址
     * @param company 公司
     * @param type 类型
     * @param channel 注册来源
     * @returns Promise对象
     */
    binding?<T>(data: object): Promise<T>;
    /**
     * 更新用户信息
     * @param nickname
     * @param phone
     * @param area
     * @param introduce
     * @returns Promise对象
     */
    updateUser?<T>(infoObj: object): Promise<T>;
    /**
     * 获取用户信息
     * @returns Promise对象
     */
    getUserInfo?<T>(token?: string): Promise<T>;
    /**
     * 获取拍摄信息
     * @returns Promise对象
     */
    getCensus?<T>(): Promise<T>;
    /**
     * 获取用户token
     * @returns Promise对象
     */
    changeAccount?<T>(uid: string): Promise<T>;
    /**
     * 拉取作品
     * @param mobile
     * @returns Promise对象
     */
    getImages?<T>(): Promise<T>;
    /**
     * 新增作品
     * @param etag 图片etag
     * @param sort 排序序号
     * @returns Promise对象
     */
    addImage?<T>(etag: string, sort?: number): Promise<T>;
    /**
     * 更新作品
     * @param type 类型：0 作品；1 二维码
     * @param id 图片id
     * @param etag 图片etag
     * @param sort 排序序号
     * @returns Promise对象
     */
    updateImage?<T>(objInfo: object): Promise<T>;
    /**
     * 删除作品
     * @param id 图片id
     * @returns Promise对象
     */
    deleteImage?<T>(id: number): Promise<T>;
    /**
     * 名片H5地址
     * @param orderId
     * @returns url
     */
    getH5ProfileUrl?<T>(token: string): String;
    /**
     * 拍摄类型列表
     * @param orderId
     * @returns
     */
    getShotList?<T>(): Promise<T>;
    /**
     * 添加拍摄类型
     * @param id
     * @returns
     */
    addShot?<T>(id: string): Promise<T>;
    /**
     * 删除拍摄类型
     * @param id
     * @returns
     */
    deleteShot?<T>(id: string): Promise<T>;
    /**
     * 获取用户案例列表
     * @param token  page limit type
     * @returns
     */
    getUserCase?<T>(page: number, limit: number, type: number): Promise<T>;
    /**
     * 添加删除用户案例
     * @param token orderId type
     * @returns
     */
    updateUserCase?<T>(orderId: string, type: number): Promise<T>;
    /**
     * 添加预约用户列表
     * @param pageSize pageNo status
     * @returns
     */
    getBespeakList?<T>(pageSize: number, pageNo: number, status: string): Promise<T>;
    /**
     * 验证密码是否正确
     * @param token mobile psw
     * @returns
     */
    checkPsw?<T>(mobile: string, psw: string): Promise<T>;
    /**
     * 修改密码
     * @param token mobile code 验证码 pwd 密码 confirmPwd 二次输入的密码
     * @returns
     */
    changePsw?<T>(mobile: string, code: string, pwd: string, confirmPwd: string): Promise<T>;
    /**
     * 用户注册
     * @param token mobile code 验证码 pwd 密码 confirmPwd 二次输入的密码
     * @returns
     */
    userRegister?<T>(mobile: string, code: string, nickname: string, chan: string, pos: string, pwd: string, confirmPwd: string): Promise<T>;
    /**
     * 初始化密码
     * @param token token  pwd 密码 confirmPwd 二次输入的密码
     * @returns
     */
    initPsw?<T>(token: string, pwd: string, confirmPwd: string): Promise<T>;
}


export default class UserService extends NetworkBase implements UserServiceInterface {
    sendCodes(mobile: number, type: number = 1): Promise<any> {
        return this.request(
            InterfaceConfig.UserInterfaceConfig.sendCodes,
            {
                mobile,
                type
            },
            NetworkConfig.RequestMethod.POST
        );
    }
    login(code: string, mobile: string): Promise<any> {
        return this.request(
            InterfaceConfig.UserInterfaceConfig.login,
            {
                code: code,
                mobile: mobile
            },
            NetworkConfig.RequestMethod.POST
        );
    }	
}