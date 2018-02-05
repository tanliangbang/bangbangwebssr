<template>
  <div class="item">
    <div class="top" v-if="itemData.username">
      <img v-if="itemData.userAavar !== null" class="avatar"  :src="itemData.userAavar" />
      <img v-if="itemData.userAavar === null" class="avatar" src="/static/img/user.jpg">
      <span >{{itemData.username}}</span>
    </div>
    <p class="title" >
      <router-link :to="{ path: '/resContent',query: { id: itemData.id, type: type }}">{{itemData.content.title}}</router-link>
    </p>
    <p class="summary">{{itemData.content.breif}}</p>
    <div class="bottom" >评论:1222&nbsp;&nbsp;浏览:{{itemData.readyNum}}&nbsp;&nbsp;喜欢:1555</div>
    <img class="summaryImg" v-if="itemData.content.titleImg!==''&&itemData.content.titleImg!==null" :src="itemData.content.titleImg">
  </div>
</template>

<script>
export default {
  name: 'list',
  props: ['itemData', 'type'],
  data () {
    return {
    }
  },
  mounted () {
  },
  created () {
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
 @import "../../style/common.less";
.item{
    background:#fff;
    position:relative;
    margin:0px;
    border-bottom: 1px dashed @borderColor;
    padding:10px;
    .avatar{
      width:20px;
      height:20px;
      border-radius: 50%;
      margin-right:5px;
      vertical-align: -5px;
    }
    .title{
      margin:10px 0 8px;
      display: inherit;
      font-size: 16px;
      font-weight: 700;
      line-height: 1.5;
      a{
        color:@mainColor;
      }
    }
    .summary{
      padding-right:150px;
      font-size:14px;
    }
    .bottom{
      margin-top:10px;
      font-size:13px;
      color:@borderColor;
    }
    .summaryImg{
      width:100px;
      height:80px;
      position:absolute;
      right:20px;
      top:50%;
      margin-top:-40px;
    }
}
</style>
