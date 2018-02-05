<template>
  <div v-if="showChangeUser!==null" :class="showChangeUser?'changeUser showAnimation':'changeUser hideAnimation'">
    <div class="mask"></div>
    <div class="changeContent">
        <div class="content">
          <button class="closeFrame" v-on:click="closeFrame">X</button>
          <div class="maskCommonTop">
            <label class="loginTitle">修改资料</label>
          </div>
          <div>
            <div class="avarHeard" v-on:click="selectImg($event)">
              <img :src="userInfo.userAavar">
            </div>
            <input name="resImg" v-on:change="getImgDate($event)" id="resImg" type="file" class="none" >
          </div>
          <div class="nomalInput" >
            <span>昵称：</span>
            <input name="nick" v-model="userInfo.nick" type="text">
          </div>
          <div class="nomalInput">
            <span>电话：</span>
            <input name="phone" v-model="userInfo.phone" type="text" >
          </div>
          <div class="nomalInput">
            <span >职业：</span>
            <input name="job" v-model="userInfo.job" type="text">
          </div>
          <div class="sexSelect" >
            <span>性别：</span>
            <div>
              <span>男:&nbsp; &nbsp;</span>
              <input v-model="userInfo.sex" value="1" checked="" type="radio">
              <span>&nbsp; &nbsp; &nbsp; &nbsp; 女:&nbsp; &nbsp;</span>
              <input v-model="userInfo.sex" value="0" type="radio">
            </div>
          </div>
          <div class="nomalInput">
            <span>地区：</span>
            <input name="address" v-model="userInfo.address" type="text">
          </div>
          <div class="nomalInput">
            <span>简介：</span>
            <textarea name="userBreif" v-model="userInfo.userBreif" placeholder="300字以内" class="selfDesc" type="text" >
            </textarea>
          </div>
          <button type="submit" v-on:click="changeUser" class="change_user">修&nbsp;&nbsp;&nbsp;&nbsp;改</button>
        </div>
    </div>
  </div>
</template>

<script>
import * as api from '../../service/getData'
import Tool from '../../utils/Tool'
import {mapActions} from 'vuex'
export default {
  name: 'changeUser',
  data () {
    return {
      userInfo: {},
      showChangeUser: null
    }
  },
  created () {
    let user = this.$store.state.common.userInfo
    this.userInfo = {
      nick: user.nick,
      userAavar: user.userAavar,
      phone: user.phone,
      job: user.job,
      address: user.address,
      sex: user.sex,
      userBreif: user.userBreif
    }
  },
  methods: {
    ...mapActions([
      'setUserInfo'
    ]),
    closeFrame () {
      this.showChangeUser = false
    },
    showFrame () {
      this.showChangeUser = true
    },
    selectImg ($event) {
      $event.currentTarget.nextElementSibling.click()
    },
    async getImgDate ($event) {
      let currNode = $event.currentTarget
      let _this = this
      let file = currNode.files[0]
      if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg') {
        /* eslint-disable no-undef */
        let param = new FormData() // 创建form对象
        param.append('resImg', file, file.name) // 通过append向form对象添加数据
        param.append('chunk', '0') // 添加form表单中其他数据
        let config = {'Content-Type': 'multipart/form-data'}
        _this.userInfo.userAavar = await api.uploadImg(param, config)
      } else {
        currNode.value = null
        this.$prompt.error('请选择正确的图片')
      }
    },
    async changeUser () {
      let user = await api.changeUserInfo(this.userInfo)
      this.setUserInfo(user)
      this.$prompt.success('个人信息修改成功')
      Tool.localItem('userInfo', JSON.stringify(user))
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../style/common.less";
.changeUser{
  .mask{
    position:fixed;
    top:0px;
    width:100%;
    height:100%;
    z-index:5000;
    background:#000;
    opacity: 0.7;
  }
  .changeContent{
    display: flex;
    justify-content: center;
    align-items: center;
    z-index:9999;
    position:fixed;
    width:100%;
    height:100%;
    top:0px;
  }
  .content{
    padding:15px 20px 0px;
    background: white;
    text-align: center;
    position:relative;
    .maskCommonTop {
      color: @mainColor;
      font-size: 18px;
      padding-bottom:10px;
      border-bottom:1px dashed @borderColor;
      margin-bottom:10px;
    }
    .avarHeard{
      text-align: center;
      margin-bottom:20px;
      img{
        width:120px;
        height:120px;
        border-radius:50%;
        cursor: pointer;
      }
    }
    .sexSelect{
      font-size:16px;
      >div{
        width: 280px;
        display:inline-block;
        height: 32px;
        font-size: 14px;
        padding-left: 10px;
        text-align: left;
        >input{
          width:15px;
          height:15px;
          vertical-align: -3px;
        }
      }
    }
  }
}

.selfDesc{
  height: 87px;
  color: #666;
  font-size: 14px;
  padding-top: 11px;
  padding-left: 14px;
  border: 1px solid @borderColor;
  vertical-align: top;
  width:280px;
}

.change_user{
  width:70%;
  height:35px;
  line-height: 30px;
  text-align: center;
  background:@mainColor;
  font-size:16px;
  margin:0px auto 20px;
  border:none;
  color:#fff;
  cursor: pointer;
}
.nomalInput {
  font-size: 16px;
  margin-bottom: 20px;
  input {
    width: 280px;
    height: 32px;
    border: 1px solid @borderColor;
    font-size: 14px;
    padding-left: 10px;
  }
}

.showAnimation{
  .mask{
    display:block;
  }
  .changeContent{
    animation:showFrameAnimation 0.4s ease-in;
    animation-fill-mode: forwards;
  }
}
.hideAnimation{
  .mask{
    height:0;
    animation:maskShow 0.4s ease-in;
  }
  .changeContent{
    animation:hideFrameAnimation 0.2s;
    animation-fill-mode: forwards;
  }
}
</style>
