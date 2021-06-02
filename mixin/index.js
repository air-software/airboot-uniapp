// 全局混合的Vue实例
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
    }
  },
  computed: {
    // 引入所有vuex的state，可以直接通过this来调用，属性名前加上$表示全局属性
    ...mapState({
      $isLogin: 'isLogin',
      $userInfo: 'userInfo',
      $scene: 'scene'
    }),
    // 是否展示公众号关注组件，当小程序启动的场景值为1047，1124，1011（扫码打开体验版）或1017（新版体验版入口，官方文档未提及）时可以展示，参考文档：https://developers.weixin.qq.com/miniprogram/dev/component/official-account.html
    $showOfficialAccount() {
      return this.$scene.launch === 1047 || this.$scene.launch === 1124 || this.$scene.launch === 1011 || this.$scene.launch === 1017
    }
  },
  methods: {
    // 展开所有vuex的actions，可以直接通过this来调用，方法名前加上$表示全局方法
    ...mapActions({
      $setLogin: 'setLogin',
      $setUserInfo: 'setUserInfo',
      $setLaunchScene: 'setLaunchScene',
      $setShowScene: 'setShowScene'
    }),
    // 深拷贝
    $clone: obj => JSON.parse(JSON.stringify(obj)),
    $paramsToUrl(url, params) {
      if (!params) return url
      let suffix = ''
      for (const key in params) {
        suffix += `&${key}=${params[key]}`
      }
      suffix = url.indexOf('?') > -1 ? suffix : suffix.replace('&', '?')
      return url + suffix
    },
    $toPage(url, params) {
      uni.navigateTo({
        url: this.$paramsToUrl(url, params)
      })
    },
    $back(delta) {
      uni.navigateBack({
        delta
      })
    },
    // 打电话
    $callPhone(phoneNumber) {
      uni.makePhoneCall({
        phoneNumber
      })
    }
  }
}
