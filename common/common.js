import api from '../api'
import store from '../store'

/**
 * 常用方法封装 请求，文件上传等
 **/

const tui = {
	//接口地址
	interfaceUrl: function() {
		return 'http://localhost:8080'
	},
	toast: function(text, duration, success) {
		uni.showToast({
			title: text || "出错啦~",
			icon: success ? 'success' : 'none',
			duration: duration || 2000
		})
	},
	modal: function(title, content, showCancel, callback, confirmColor, confirmText) {
		uni.showModal({
			title: title || '提示',
			content: content,
			showCancel: showCancel,
			cancelColor: "#555",
			confirmColor: confirmColor || "#5677fc",
			confirmText: confirmText || "确定",
			success(res) {
				if (res.confirm) {
					callback && callback(true)
				} else {
					callback && callback(false)
				}
			}
		})
	},
	isAndroid: function() {
		const res = uni.getSystemInfoSync();
		return res.platform.toLocaleLowerCase() === "android"
	},
	isPhoneX: function() {
		const res = uni.getSystemInfoSync();
		let iphonex = false;
		let models=['iphonex','iphonexr','iphonexsmax','iphone11','iphone11pro','iphone11promax']
		const model=res.model.replace(/\s/g,"").toLowerCase()
		if (models.includes(model)) {
			iphonex = true;
		}
		return iphonex;
	},
	constNum: function() {
		let time = 0;
		// #ifdef APP-PLUS
		time = this.isAndroid() ? 300 : 0;
		// #endif
		return time
	},
	/**
	 * 请求数据处理
	 * @param string url 请求地址
	 * @param string method 请求方式
	 *  GET or POST
	 * @param {*} data 请求参数
	 * @param bool isForm 数据格式
	 *  true: 'application/x-www-form-urlencoded'
	 *  false:'application/json'
	 * @param bool hideLoading 是否隐藏loading
	 *  true: 隐藏
	 *  false:显示
	 */
	request: function({ url, method, data, isForm, hideLoading }) {
		//接口请求
		uni.hideLoading()
		if (!hideLoading) {
			uni.showLoading({
				mask: true,
				title: '请稍候...'
			})
		}

		return new Promise((resolve, reject) => {
			uni.request({
				url: tui.interfaceUrl() + url,
				data,
				header: {
					'content-type': isForm ? 'application/x-www-form-urlencoded' : 'application/json',
					'Authorization': 'Bearer ' + tui.getToken()
				},
				method: method, //'GET','POST'
				dataType: 'json',
				timeout: 15000,
				success: (res) => {
					// 未设置状态码则默认成功状态
					const code = res.data.code || 200
					// 获取错误信息
					const message = res.data.msg
					
					if (code === 401) {
						uni.redirectTo({
							url: '/pages/index/login'
						})
					} else if (code !== 200) {
						if (message) tui.toast(message)
						else uni.hideLoading()
						reject(res)
					} else {
						uni.hideLoading()
						resolve(res.data.data)
					}
				},
				fail: (res) => {
					tui.toast("网络不给力，请稍后再试~")
					reject(res)
				}
			})
		})
	},
	/**
	 * 上传文件
	 * @param string url 请求地址
	 * @param string src 文件路径
	 */
	uploadFile: function(url, src) {
		uni.showLoading({
			title: '请稍候...'
		})
		return new Promise((resolve, reject) => {
			const uploadTask = uni.uploadFile({
				url: tui.interfaceUrl() + url,
				filePath: src,
				name: 'imageFile',
				header: {
					'Authorization': 'Bearer ' + tui.getToken()
				},
				formData: {
					// sizeArrayText:""
				},
				success: function(res) {
					uni.hideLoading()
					let d = JSON.parse(res.data.replace(/\ufeff/g, "") || "{}")
					if (d.code % 100 == 0) {
						//返回图片地址
						let fileObj = d.data;
						resolve(fileObj)
					} else {
						that.toast(res.msg);
					}
				},
				fail: function(res) {
					reject(res)
					that.toast(res.msg);
				}
			})
		})
	},
	tuiJsonp: function(url, callback, callbackname) {
		// #ifdef H5
		window[callbackname] = callback;
		let tuiScript = document.createElement("script");
		tuiScript.src = url;
		tuiScript.type = "text/javascript";
		document.head.appendChild(tuiScript);
		document.head.removeChild(tuiScript);
		// #endif
	},
	//设置token
	setToken(token) {
		uni.setStorageSync('token', token)
	},
	//获取token
	getToken() {
		return uni.getStorageSync('token')
	},
	//设置手机
	setMobile(mobile) {
		uni.setStorageSync('mobile', mobile)
	},
	//获取手机
	getMobile() {
		return uni.getStorageSync('mobile')
	},
	setLogin(val) {
		uni.setStorageSync('isLogin', val)
	},
	//判断是否登录
	isLogin: function() {
		return !!uni.getStorageSync('isLogin')
	},
	setUserInfo() {
		api.user.profile().then(data => {
			uni.setStorageSync('userInfo', data)
			store.commit('SET_USER_INFO', data)
		})
	},
	getUserInfo(key) {
		const userInfo = uni.getStorageSync('userInfo')
		return key ? userInfo[key] : userInfo
	},
	// 登出，删除缓存
	logout: function() {
		uni.removeStorageSync('token')
		tui.setLogin(false)
		store.commit('SET_LOGIN', false)
	},
	//跳转页面，校验登录状态
	href(url, isVerify) {
		if (isVerify && !tui.isLogin()) {
			uni.navigateTo({
				url: '/pages/common/login'
			})
		} else {
			uni.navigateTo({
				url: url
			});
		}
	},
	// 计算时间差
	calDateSpan(inDateTime) {
		//inDateTime 格式为 yyyy-MM-dd HH:mm:ss 2010-09-03 19:11:12
		let tempDateTime = inDateTime.replace(/\-/g, " ").replace(/:/g, " ").split(" ");
		tempDateTime = new Date(tempDateTime[0],tempDateTime[1]-1,tempDateTime[2],tempDateTime[3],tempDateTime[4],tempDateTime[5]);
		let hours = tempDateTime.getHours() + ''
		if (hours.length === 1) {
			hours = '0' + hours
		}
		let minutes = tempDateTime.getMinutes() + ''
		if (minutes.length === 1) {
			minutes = '0' + minutes
		}
		let date = new Date();
		let seconds = (date.getTime() - tempDateTime.getTime())/ 1000;
		if(seconds < 60){
			return "刚刚";
		}else if(seconds < 60*60){
			return parseInt(seconds / 60 % 60) + "分钟前";
		}else if(seconds < 60*60*24){
			return parseInt(seconds / 60 / 60 % 24) + "小时前";
		}else if(seconds < 60*60*48){
			return "昨天 " + hours + ":" + minutes;
		}else if(seconds < 60*60*72){
			return "前天 " + hours + ":" + minutes;
		}else {
			return inDateTime.substring(0, inDateTime.length - 3);
		}
	}
}

export default tui
