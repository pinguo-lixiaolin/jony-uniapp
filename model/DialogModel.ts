/**
 * @author: 马剑光
 * @Date 2018-01-15
 * @since 0.0.1
 * Dialog数据模型
 */
export interface DialogInterface {
    // 标题
    title?: string
    // 内容
    content?: string
    // 确定按钮内容
    confirmText?: string
    // 按钮颜色
    confirmColor?: string
}

export class DialogModelClass implements DialogInterface {
	static sharedInstance = new DialogModelClass();
    title: string = ''
    content: string = ''
    confirmText: string = ''
    confirmColor?: string = ''
}

export const DialogModel = DialogModelClass.sharedInstance;
