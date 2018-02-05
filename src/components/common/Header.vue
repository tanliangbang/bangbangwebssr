<template>
  <div class="header">
    <div class="container">
      <p class="my-logo"><router-link to="/home">bangbang</router-link></p>
      <ul class="nav">
        <li><router-link to="/home" > 首页 </router-link></li>
        <li><router-link to="/resContentList">技术文章</router-link></li>
        <li><router-link to="/myProduction"> 作品展示</router-link></li>
        <li><router-link to="/community"> 程序员社区</router-link></li>
      </ul>
      <div class="loginOrRegist" v-if="this.$store.state.common.userInfo === null">
        <a v-on:click="showLoginOrRegsit('login')">登入</a>/<a v-on:click="showLoginOrRegsit('regist')">注册</a>
      </div>
      <div class="loginOrRegist" v-if="this.$store.state.common.userInfo!==null">
        <router-link to="/userCenter">{{this.$store.state.common.userInfo.username}}</router-link>/<a v-on:click="loginOut" class="loginOut">退出</a>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from '../../service/getData'
import {mapActions} from 'vuex'
export default {
  name: 'Header',
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    ...mapActions([
      'setUserInfo'
    ]),
    showLoginOrRegsit (str) {
      if (str === 'login') {
        this.$loginOrRegist.showLogin()
      } else {
        this.$loginOrRegist.showRegist()
      }
    },
    async loginOut () {
      await api.loginOut()
      this.setUserInfo(null)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
 @import "../../style/common.less";
.header{
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  background: #333;
  color:#fff;
  z-index: 3000;
  transition: all 1s ease;
  .router-link-active{
    color:@mainColor;
  }
  .loginOrRegist{
    float:right;
    margin-top:18px;
    a{
      color:#fff;
      cursor: pointer;
    }
    a:hover{
      color:@mainColor;
    }
  }
  .my-logo{
    float:left;
    font-family: 'Open Sans',sans-serif;
    text-shadow: -2px 2px 4px rgba(255,255,255,1);
    font-style: italic;
    font-size: 2em;
    display: inline-block;
    position: relative;
    margin-top:5px;
    a{
      color:@mainColor;
    }
  }
  ul{
    line-height:60px;
    margin-left:40px;
    float:left;
    li{
      float:left;
      margin:0px 20px;
      a{
        color:#999;
      }
      a:hover{
        color:@mainColor;
      }
    }
  }
}
</style>
