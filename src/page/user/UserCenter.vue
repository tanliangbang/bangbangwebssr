<template>
  <div class="userCenter" v-if="$store.state.common.userInfo">
    <ChangeUser ref="changeUserInfo"/>
    <div class="container">
       <div>
         <div class="utop">
             <div class="fl">
               <img v-if="$store.state.common.userInfo.userAavar" class="userAavar" :src="$store.state.common.userInfo.userAavar" >
               <img v-if="!$store.state.common.userInfo.userAavar" class="userAavar" src="/static/img/user.jpg" >
             </div>
             <div class="fl simpleInfo" >
               <div >{{$store.state.common.userInfo.username}}</div>
               <div>
                 <span >{{$store.state.common.userInfo.job?$store.state.common.userInfo.job:'无'}}</span><span class="line" >|</span>
                 <span >{{$store.state.common.userInfo.address?$store.state.common.userInfo.address:'无'}}</span><span class="line" >|</span>
                 <span v-if="$store.state.common.userInfo.sex">{{$store.state.common.userInfo.sex==='1'?'男':'女'}}</span>
                 <span v-if="!$store.state.common.userInfo.sex">无</span>
               </div>
               <div>{{$store.state.common.userInfo.userBreif?$store.state.common.userInfo.userBreif:'无'}}</div>
             </div>
             <div v-on:click="showChangeUser" class="fr changeInfoBtn">修改信息</div>
         </div>

         <div class="main-right">
           <div class="main">
             <div class="listContent">
               <div class="nav">
                   <div class="active">我的文章</div>
                   <div>我的评论</div>
                   <div>我的关注</div>
                   <div>我的收藏</div>
               </div>
               <div class="content">
                 <Item v-for="(item) in articleList" v-bind:type="type" v-bind:itemData="item" :key="item.id" />
               </div>
             </div>
           </div>
           <div class="right">
             <img src="http://p3gc5ydac.bkt.clouddn.com/right.jpg">
             <img src="http://p3gc5ydac.bkt.clouddn.com/right.jpg">
             <img src="http://p3gc5ydac.bkt.clouddn.com/right.jpg">
           </div>
         </div>
       </div>

    </div>
  </div>
</template>

<script>
import * as api from '../../service/getData'
import Item from '../../components/community/Item'
import ChangeUser from './ChangeUser'
export default {
  name: 'userCenter',
  title () {
    return {
      title: '用户中心'
    }
  },
  components: {
    Item,
    ChangeUser
  },
  data () {
    return {
      articleList: null,
      type: 'javacommunity'
    }
  },
  created () {
    setTimeout(function () {
      let userInfo = this.$store.state.common.userInfo
      if (!userInfo || userInfo === null) {
        this.$router.push('/home')
      }
    }.bind(this), 1000)
    this.initDate()
  },
  mounted () {
    window.scrollTo(0, 0)
  },
  methods: {
    async initDate () {
      let obj = await api.getResContentList('javacommunity', 0, 10)
      this.articleList = obj.data.content
    },
    showChangeUser () {
      this.$refs.changeUserInfo.showFrame()
    }
  }
}
</script>

<style lang="less" scoped>
  @import "./index";
 .right{
   padding:20px;
   img{
     width:100%;
     height:200px;
     margin-bottom:20px;
   }
 }
</style>
