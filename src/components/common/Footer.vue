<template>
  <div class="footer">
    <p>关于本站 ： 作者：谭亮邦    QQ：648103576    程序员技术文章网站 本站展示页用的是vue.js+ webpack  后台管理系统采用的是react+redux+ant design+webpack 后端用的是node js</p>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
    }
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
  @import "../../style/common.less";
  .footer{
    height:60px;
    width:100%;
    background:#333;
    text-align: center;
    clear:both;
    >p{
      line-height:60px;
      color:#fff;
    }
  }
</style>
