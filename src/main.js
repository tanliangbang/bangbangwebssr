// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueLoading from './plugins/loading/index'
import Prompt from './plugins/prompt/index'
import LoginAndRegist from './components/loginAndregist/index'
import { sync } from 'vuex-router-sync'
import titleMixin from './utils/title'

Vue.mixin(titleMixin)
Vue.config.productionTip = false
Vue.use(VueLoading)
Vue.use(Prompt)
/* eslint-disable no-new */
export function createApp () {
  // 同步路由状态(route state)到 store
  sync(store, router)
  // 创建应用程序实例，将 router 和 store 注入
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  // 暴露 app, router 和 store。
  return {app, router, store}
}
Vue.use(LoginAndRegist, store)
