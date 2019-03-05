/**
 * 验证模块
 */

export class Validation {
    private static _instance: Validation|null = null;

    static get sharedInstance(): Validation  {
        if (Validation._instance == null) {
            Validation._instance = new Validation();
        }
        return Validation._instance;
    }

    static checkNumberDigit(text:string):string {
        const reg = /^(\.*)(\d+)(\.?)(\d{0,2}).*$/g; if (reg.test(text)) { //正则匹配通过，提取有效文本
          text = text.replace(reg, '$2$3$4');
        } else { //正则匹配不通过，直接清空
          text = '0.';
        } return text; //返回符合要求的文本（为数字且最多有带2位小数）
    }

    static checkPhone(phoneNum: string): boolean {
        if (/^1\d{10}$/.test(phoneNum)) {
            return true;
        } else {
            return false;
        }
    }

    static checkEmail(email: string): boolean {
        if (/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(email)) {
            return true;
        } else {
            return false;
        }
    }

    static trimStr(str: string) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
    }

    static checkNumber(str: string) {
        var reg = /^[0-9]+.?[0-9]*$/;
        if (reg.test(str)) {
          return true;
        }
        return false;
    }

    static beMobile(str: number) {
        let mobile = ''
        for (let index = 0; index < String(str).length; index++) {
            if (this.checkNumber(String(str)[index])) {
                mobile += String(str)[index]
            }
        }
        return mobile
    }

    static password(str: string) {
        let lastStr = '',
            numReg = /[0-9]/,
            engReg =  /[a-z]/i
        for (let i = 0; i < str.length; i++) {
            if (numReg.test(str[i])) {
                lastStr += str[i]
            } else if (engReg.test(str[i])) {
                lastStr += str[i]
            }
        }
        return lastStr
    }

    static filteremoji(str: string) {
        var ranges = [
            '\ud83c[\udf00-\udfff]',
            '\ud83d[\udc00-\ude4f]',
            '\ud83d[\ude80-\udeff]'
        ]
        return str = str.replace(new RegExp(ranges.join('|'), 'g'), '')
    }

    static checkStrLength(str: string, length: number, checkUpper: boolean = true, fullLength: boolean = false) {
        let value = this.filteremoji(str),
        chineseReg = /^[\u3220-\uFA29]+$/,
        numReg = /[0-9]/,
        spaceReg = /(^s*)|(s*$)/g,
        engReg =  /[a-z]/i,
        numTime = 0,
        numEngSize = 0.5,
        // defaultString = this.trim(value),
        defaultString = value,
        lastString = ''
        if (fullLength) {
            numEngSize = 1
        }

        for(let i=0; i< defaultString.length; i++) {
            let itemName = defaultString[i]
            if(itemName === ' '){
                numTime += numEngSize
            } else if (numReg.test(itemName)) {
                numTime += numEngSize
            } else if (chineseReg.test(itemName)) {
                numTime += 1
            } else if (engReg.test(itemName)){
                if (checkUpper) {
                    if (this.isUpper(itemName)){
                        numTime += 1
                    } else if (this.isLower(itemName)){
                        numTime += numEngSize
                    }
                } else {
                    numTime += numEngSize
                }
            } else {
                numTime += numEngSize
            }
            lastString += itemName
            if (numTime == length) {
                return lastString
            } else if (numTime > length) {
                return lastString.substr(0, lastString.length - 1)
            }
        }
        return lastString
    }

    static isUpper(code:string) {
        return code === code.toUpperCase()
    }

    static isLower(code:string) {
        return code === code.toLowerCase()
    }

    static trim(str:string){
        str = str.replace(/^(\s|\u00A0)+/,'');
        for(var i=str.length-1; i>=0; i--){
            if(/\S/.test(str.charAt(i))){
                str = str.substring(0, i+1);
                break;
            }
        }
        return str;
    }

    static checkLiveUrl(url: string){
        let isLiveUrl = /mudu.tv|live.vhall.com|lezhibo.com/ig.test(url);
        return isLiveUrl;
    }

    static getLiveUrl(url: string){
        let result = url.match(/<iframe[^<>]*?\ssrc=['"]?(.*?)['"]?\s.*?<\/iframe>/i);
        console.log(result);
        return result?result[1]:''
    }

    static checkPic(type: string) {
        if (type.toLowerCase() != 'jpg' && type.toLowerCase() != 'jpeg' && type.toLowerCase() != 'png') {
            return false
        }
        return true
    }

}


// 有的情况下需要使用直接导出的`实例化`的类
export const ValidationInstance = Validation.sharedInstance;
