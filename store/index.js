import Vue from 'vue'
import Vuex from 'vuex'
import fetch from '../common/common'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		//用户登录手机号
		mobile: uni.getStorageSync("mobile") || "",
		//是否登录 项目中改为真实登录信息判断，如token
		isLogin: !!uni.getStorageSync("isLogin"),
		//登录后跳转的页面路径 + 页面参数
		returnUrl: "",
		//app版本
		version: "1.0.0",
		//当前是否有网络连接
		networkConnected: true,
		isOnline: false,
		// 用户信息
		userInfo: {},
		// 场景值
		scene: {
			launch: 1000,
			show: 1000
		}
	},
	mutations: {
		login(state, payload) {
			if (payload) {
				state.mobile = payload.mobile
			}
			state.isLogin = true
		},
		logout(state) {
			state.mobile = ""
			state.isLogin = false
			state.returnUrl = ""
		},
		setReturnUrl(state, returnUrl) {
			state.returnUrl = returnUrl
		},
		networkChange(state, payload) {
			state.networkConnected = payload.isConnected
		},
		setOnline(state, payload) {
			state.isOnline = state.isOnline
		},
		SET_LOGIN(state, value) {
			state.isLogin = value
		},
		SET_USER_INFO(state, value) {
			state.userInfo = value
		},
		SET_LAUNCH_SCENE(state, value) {
			state.scene.launch = value
		},
		SET_SHOW_SCENE(state, value) {
			state.scene.show = value
		}
	},
	actions: {
		setLogin({ commit }, value) {
			commit("SET_LOGIN", value);
		},
		setUserInfo({ commit }, value) {
			commit("SET_USER_INFO", value);
		},
		setLaunchScene({ commit }, value) {
			commit("SET_LAUNCH_SCENE", value);
		},
		setShowScene({ commit }, value) {
			commit("SET_SHOW_SCENE", value);
		},
		getOnlineStatus: async function({
			commit,
			state
		}) {
			return await new Promise((resolve, reject) => {
				// #ifndef MP-WEIXIN
				resolve(true)
				// #endif
				// #ifdef MP-WEIXIN
				if (state.isOnline) {
					resolve(state.isOnline)
				} else {
					fetch.request("/Home/GetStatus", "GET", {}, false, true, true).then((res) => {
						if (res.code == 100 && res.data == 1) {
							commit('setOnline', {
								isOnline: true
							})
							resolve(true)
						} else {
							commit('setOnline', {
								isOnline: false
							})
							resolve(false)
						}
					}).catch((res) => {
						reject(false)
					})
				}
				// #endif
			})
		}
	}
})

export default store
