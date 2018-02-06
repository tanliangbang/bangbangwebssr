<template>
  <div :class="showLoginAndRegist?'showAnimation':'hideAnimation'">
     <div class="mask"></div>
    <div class="loginAndRegist">
      <div class="login">
         <button class="closeFrame" v-on:click="closeFrame">X</button>
        <div class="title">
          <span v-on:click="loginOrRegist('loginAndregist')" :class="isLogin?'active':''">登入</span>
          <span v-on:click="loginOrRegist('regist')" :class="isLogin?'':'active'">注册</span>
        </div>
        <div class="nomalInput">
           <div class="inputClass">
             <input type="text"  v-model="myForm.username" v-on:blur="checkValue('username')"  placeholder="请输入登入名" />
             <p :class="rules.username.showError?'showError':'hidenError'">{{rules.username.message}}</p>
           </div>
           <div class="inputClass">
             <input type="password" v-model="myForm.password" v-on:blur="checkValue('password')"  placeholder="请输入密码，区分大小写" />
              <p :class="rules.password.showError?'showError':'hidenError'">{{rules.password.message}}</p>
           </div>

          <div v-if="!isLogin" class="inputClass">
            <input type="password" v-model="myForm.repassword"  v-on:blur="checkValue('repassword')"  placeholder="确认密码" />
            <p :class="rules.repassword.showError?'showError':'hidenError'">{{rules.repassword.message}}</p>
          </div>

            <p  :class="rules.loginError.showError?'showError':'hidenError'">{{rules.loginError.message}}</p>
          <div v-if="isLogin" class="otherOpear">
            <input type="checkbox" />记住密码    <a>忘记密码</a>
          </div>
          <button v-on:click="commit">{{isLogin?'登&nbsp;&nbsp;入':'注&nbsp;&nbsp;册'}}</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Tool from '../../utils/Tool'
import {login, regist} from '../../service/getData'
import {mapState, mapActions} from 'vuex'
export default {
  name: 'LoginAndRegist',
  data () {
    return {
      showLoginAndRegist: true,
      isLogin: true,
      myForm: {
        username: '',
        password: '',
        repassword: ''
      },
      rules: {
        username: {
          showError: false,
          message: '请输入用户名'
        },
        password: {
          showError: false,
          message: '请输入密码'
        },
        repassword: {
          showError: false,
          message: '两次密码不一致'
        },
        loginError: {
          showError: false,
          message: '用户名密码错误'
        }
      }
    }
  },
  computed: {
    ...mapState({
    })
  },
  methods: {
    ...mapActions([
      'setUserInfo'
    ]),
    showLogin () {
      this.showLoginAndRegist = true
      this.loginOrRegist('loginAndregist')
    },
    showRegist () {
      this.showLoginAndRegist = true
      this.loginOrRegist('regist')
    },
    closeFrame () {
      this.showLoginAndRegist = false
    },
    loginOrRegist (type) {
      if (type === 'loginAndregist') {
        this.isLogin = true
      } else {
        this.isLogin = false
      }
    },
    async commit () {
      let username = this.checkValue('username')
      let password = this.checkValue('password')
      if (username && password) {
        let data = null
        if (this.isLogin) {
          data = await login(this.myForm.username, Tool.md5(this.myForm.password))
        } else {
          if (!this.checkValue('repassword')) {
            return true
          }
          data = await regist(this.myForm.username, Tool.md5(this.myForm.password))
        }
        if (data.statusCode === 500) {
          this.rules.loginError.showError = true
          this.rules.loginError.message = data.errorMsg
          let _this = this
          setTimeout(function () {
            _this.rules.loginError.showError = false
          }, 2000)
          return false
        } else if (data.statusCode === 511) {
          this.rules.loginError.showError = true
          this.rules.loginError.message = '用户名已存在'
          let _this = this
          setTimeout(function () {
            _this.rules.loginError.showError = false
          }, 2000)
          return false
        }
        this.setUserInfo(data.data)
        if (this.isLogin) {
          this.$prompt.success('登入成功')
        } else {
          this.$prompt.success('注册成功')
        }
        this.showLoginAndRegist = false
      }
    },
    checkValue (value) {
      if (this.myForm[value] === '') {
        this.rules[value].showError = true
        if (value === 'username') {
          this.rules[value].message = '请填写用户名'
        } else if (value === 'password') {
          this.rules[value].message = '请填写密码'
        } else {
          this.rules[value].message = '两次密码不一致'
        }
        return false
      } else {
        if (value === 'repassword') {
          if (this.myForm.password !== this.myForm.repassword) {
            this.rules[value].message = '两次密码不一致'
            this.rules[value].showError = true
            return false
          }
        }
        this.rules[value].showError = false
        return true
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "./index";
</style>
