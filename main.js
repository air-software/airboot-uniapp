import App from './App'
import store from './store'
import mixin from './mixin'
import tui from './common/common'
import api from './api'

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

// #ifndef VUE3
import Vue from 'vue'

Vue.config.productionTip = false
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
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	app.use(store)
	app.mixin(mixin)
	app.config.productionTip = false
	app.config.globalProperties.tui = tui
	app.config.globalProperties.api = api
	return {
		app
	}
}
// #endif
