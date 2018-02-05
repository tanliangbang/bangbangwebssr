<template>
  <div class="commentList" v-if="commentList!==null">
    <p>评论列表</p>
    <div v-for="comment in commentList" :key="comment.id">
       <div >
             <div class="top">
               <span class="fl"><img v-if="comment.user.userAavar" :src="comment.user.userAavar"/>
                 <img v-if="!comment.user.userAavar" src="/static/img/user.jpg"/>{{comment.user.userName}}</span>
               <span class="fr">{{formatdate(comment.cTime)}}</span>
             </div>
             <p class="content">{{comment.content}}</p>
             <div class="replyBtn">
               <a v-on:click="showReply($event.currentTarget,comment.id,comment.user)">回复</a>
             </div>
       </div>
        <div class="reply" v-if="comment.reply.list.length>0">
            <div v-for="reply in comment.reply.list" :key="reply.id">
                  <div class="top">
                    <span class="fl">{{reply.user.userName}}&nbsp;&nbsp;回复:&nbsp;&nbsp;{{reply.to_user.userName}}</span>
                    <span class="fr">{{formatdate(reply.cTime)}}</span>
                  </div>
                  <p class="content">{{reply.content}}</p>
                  <div class="replyBtn">
                    <a v-on:click="showReply($event.currentTarget.parentNode, comment.id, reply.user)">回复</a>
                  </div>
            </div>
        </div>
        <div class="commentTextarea">
          <Comment v-bind:topicId="reply.id" v-bind:type="reply.type" v-bind:replyId="reply.replyId"
                   v-bind:toUserId="reply.toUserId" v-on:commentSuccess="commentSuccess" />
        </div>
    </div>

  </div>
</template>

<script>
import * as api from '../../service/getData'
import Comment from '../../components/comment/Comment'
import Tool from '../../utils/Tool'
export default {
  name: 'CommentList',
  components: {
    Comment
  },
  props: ['topicId', 'type'],
  data () {
    return {
      commentList: null,
      reply: {
        id: this.topicId,
        type: this.type,
        replyId: 0,
        toUserId: 0
      }
    }
  },
  created () {
    this.initData()
  },
  methods: {
    async initData () {
      let res = await api.getCommentList(this.topicId, this.type, 0, 5)
      this.commentList = res.data.list
    },
    commentSuccess () {
      this.initData()
    },
    showReply (event, replyId, user) {
      let currNode = event.parentNode.parentNode.parentNode.lastChild
      if (currNode.style.display === 'none' || currNode.style.display === '') {
        currNode.style.display = 'block'
        this.reply.replyId = replyId
        this.reply.toUserId = user.id
        currNode.firstChild.firstChild.focus()
        currNode.firstChild.firstChild.placeholder = '@' + user.userName
      } else {
        currNode.style.display = 'none'
        this.reply.replyId = 0
        this.reply.toUserId = 0
      }
    },
    formatdate (date) {
      return Tool.formatDate1(date)
    },
    fetchData () {
      this.initData()
    }
  },
  watch: {
    'topicId': 'fetchData'
  }
}
</script>

<style lang="less" scoped>
  @import "../../style/common";
  .commentList{
    padding:20px 50px;
    >p:nth-child(1){
      color:@mainColor;
      padding-bottom:20px;
      border-bottom:1px dashed @borderColor;
    }
    >div{
      margin-top:10px;
      border-bottom:1px dashed @borderColor;
      padding-bottom:10px;
    }
    >div:last-child{
      border-bottom:none;
    }

  }
  .reply{
    .top{
      padding-top:10px;
    }
    .replyBtn{
      font-size:14px;
    }
  }
  .top{
    height:30px;
    >span:nth-child(1){
      color:@mainColor;
      >img{
        width:30px;
        height:30px;
        border-radius:50%;
        vertical-align: middle;
        margin-right:15px;
        border:1px solid @borderColor;
      }
    }
    >span:nth-child(2){
      color:@gray-color;
      font-size:14px;
    }
  }
  .content{
    padding:5px 0px;
    margin-top:10px;
    font-size:16px;
  }
  .replyBtn{
    text-align: right;
    margin-top:5px;
    >a{
      color:@mainColor;
    }
    cursor: pointer;
  }
  .reply{
     background:#f5f7fa;
     margin:10px 40px;
    padding:10px 20px;
    border-radius:5px;
    >div{
      border-bottom:1px dashed @borderColor;
      padding-bottom:10px;
    }
    >div:last-child{
      border-bottom:none;
    }
  }

  .commentTextarea{
    display:none
  }
</style>
