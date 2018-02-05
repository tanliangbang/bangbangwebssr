<template>
  <div class="listItem" v-on:mouseenter="showCode($event)" v-on:mouseleave="hideCode($event)">
    <div class="hide" >
      <img v-if="item.content.isWeb!=='1'" :src="item.content.code"/>
      <a target="view_window" :href="item.content.link"  v-if="item.content.isWeb!=='0'">网站应用点击直接查看</a>
    </div>
    <img :src="item.content.img"/>
    <p>{{item.content.title}}</p>
  </div>
</template>

<script>
export default {
  name: 'ListItem',
  props: ['item'],
  data () {
    return {}
  },
  methods: {
    showCode (event) {
      event.target.firstChild.style.display = 'block'
    },
    hideCode (event) {
      event.currentTarget.firstChild.style.display = 'none'
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../../style/common.less";
  .listItem{
      width:100%;
      height:300px;
      border: 1px solid #d5e0dd;
      background: #fff;
      box-shadow: 0 0 7px #cae7df;
      margin-bottom:20px;
      padding:20px;
      position:relative;
      >img{
        width:100%;
        height:230px;
      }
      p{
        margin-top:10px;
        color:#999;
        text-align: center;
        font-size:14px;
      }
      >div{
        position:absolute;
        background:rgba(0,0,0,0.5);
        width:100%;
        height:100%;
        top:0px;
        left:0px;
        padding:40px;
        transition: display 0.3s ease;
        >img{
          width:100%;
          height:100%;
        }
        >a{
          width:100%;
          height:100%;
          display:block;
          color:@mainColor;
          font-size:20px;
          text-align: center;
          padding-top:80px;
        }
      }
  }

</style>
