import Vue from 'vue'
import App from './App'
import store from './store'
import mixin from './mixin'
import tui from './common/common'
import api from './api'

Vue.config.productionTip = false
// #ifdef H5
window.QQmap = null;
// #endif
// #ifndef MP-TOUTIAO
//网络监听
setTimeout(() => {
	uni.onNetworkStatusChange(function(res) {
		//console.log(res.networkType);
		store.commit("networkChange", {
			isConnected: res.isConnected
		})
	});
}, 100)
// #endif

Vue.prototype.tui = tui
Vue.prototype.api = api
Vue.prototype.$eventHub = Vue.prototype.$eventHub || new Vue()
Vue.prototype.$store = store
App.mpType = 'app'

Vue.mixin(mixin)

const app = new Vue({
	store,
	...App
})
app.$mount()
