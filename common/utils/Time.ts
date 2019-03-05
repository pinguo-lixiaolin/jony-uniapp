/**
 * 时间处理模块
 */

export class Time {
    private static _instance: Time|null = null;
    
    static get sharedInstance(): Time  {
        if (Time._instance == null) {
            Time._instance = new Time();
        }
        return Time._instance;
    }
    
    /**
     * 将时间戳格式化为 yyyy-mm-dd hh:mm
     * @param date 时间戳
     * @return [年月日, 时分]
     */
    static timeFormat(_date?: number) {
        let date = this.getDate(_date||0)
        // let date = new Date()
        // date.setTime(String(_date + '')[10]?_date:_date*1000)
        return [
            [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(this.formatNumber).join('-'),
            [date.getHours(), date.getMinutes()].map(this.formatNumber).join(':')
        ].join(' ')
    }

    /**
     * 将时间戳格式化为 yyyy-mm-dd hh:mm:ss
     * @param date
     * @return [年月日, 时分秒]
     */
    static timeLogFormat(date: Date) {
        return [
            [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(this.formatNumber).join(''),
            [date.getHours(), date.getMinutes(), date.getSeconds()].map(this.formatNumber).join('')
        ]
    }

    /**
     * 将时间转化为两位
     * @param n 转化结果
     */
    static formatNumber(n: number) {
        let _n = n.toString()
        return _n[1] ? _n : '0' + _n
    }

    /**
     * 将时间转化为时间戳
     * @param stringTime 时间
     * @return 时间戳
     */
    static getTimestamp(stringTime?: string) {
        return Date.parse(String(new Date(stringTime!.replace(/\-/g, "/")))) / 1000;
    }

    /**
     * 时间戳转Date
     */
    static getDate(timestamp?: number) {
        let date = new Date()
        if (timestamp) {
            date.setTime(String(timestamp + '')[10]?timestamp:timestamp*1000)
        }
        return date
    }
}

export const TimeInstance = Time.sharedInstance;