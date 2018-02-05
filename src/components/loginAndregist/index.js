import LoginAndRegist from './LoginAndRegist.vue'
export default {
  /**
   * 每个插件都有的install方法，用于安装插件
   * @param {Object} Vue - Vue类
   * @param {Object} [pluginOptions] - 插件安装配置
   */
  install (Vue, pluginOptions) {
    // 创建"子类"方便挂载
    const VueLoginAndRegist = Vue.extend(LoginAndRegist)
    let temp = null
    let $loginOrRegist = {}
    /**
     * 初始化并显示loading
     * @returns {Promise} Promise实例
     */
    function showLoginOrRegist () {
      // 判断是否创建
      if (!temp) {
        temp = new VueLoginAndRegist()
        // 手动创建一个未挂载的实例
        temp.$mount()
        // 挂载
        if (document) {
          document.querySelector('body').appendChild(temp.$el)
        }
      }
    }
    $loginOrRegist.showLogin = function () {
      showLoginOrRegist()
      temp.showLogin()
    }
    $loginOrRegist.showRegist = function () {
      showLoginOrRegist()
      temp.showRegist()
    }
    Vue.mixin({
      store: pluginOptions
    })
    Vue.$loginOrRegist = Vue.prototype.$loginOrRegist = $loginOrRegist
  }
}
