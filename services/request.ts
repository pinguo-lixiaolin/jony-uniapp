import http from '@/common/vmeitime-http/interface';

//设置baseUrl
http.config.baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:8080/api/' : '';
//设置请求前拦截器
http.interceptor.request = config => {	
	try {
		const value = uni.getStorageSync('storage_key');
		if (value) {
			console.log(value);
		}
	} catch (e) {
		// error
	}
	//添加通用参数
	config.header = {
		token: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
	};
};
//设置请求结束后拦截器
http.interceptor.response = response => {
	//判断返回状态 执行相应操作
	return response;
};
