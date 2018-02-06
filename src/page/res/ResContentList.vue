<template>
  <div class="resContentList">
    <div class="nav">
      <div class="container">
        <ul>
          <li v-for="(item) in resList" :key="item.id" :class="item.name===type?'selectedBottom':''">
            <a v-on:click="changeList(item.name)">{{item.cname}}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="container">
      <div class="main-right">
          <div class="main">
            <List v-bind:resContentList="resContentList.content" v-bind:type="type"></List>
            <Pagination v-bind:pagination = "pagination"/>
          </div>
          <div class="right">
            <RightList   v-bind:rightList="readyRank" v-bind:type="type" v-bind:title="'阅读排行'"/>
            <RightList   v-bind:rightList="recommend" v-bind:type="type" v-bind:title="'推荐排行'"/>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tool from '../../utils/Tool'
import List from '../../components/res/List'
import RightList from '../../components/res/RightList'
import Pagination from '../../plugins/pagination/Pagination'
import { mapGetters } from 'vuex'

export default {
  name: 'ResContentList',
  title () {
    return {
      title: '精选文章'
    }
  },
  components: {
    List,
    RightList,
    Pagination
  },
  data () {
    return {
      type: null,
      pagination: {
        current: 1,
        pageSize: 5,
        total: 0,
        totalSize: 0,
        onShowSizeChange: this.getCurrDate,
        onChange: null
      }
    }
  },
  mounted () {
    window.scroll(0, 0)
    if (this.$route.query.type) {
      this.type = this.$route.query.type
    } else {
      this.type = this.resList[0].name
    }
    this.pagination.totalSize = this.resContentList.pageTotal
  },
  computed: {
    ...mapGetters({
      resList: 'getArticleNav',
      resContentList: 'getResContentList',
      readyRank: 'getReadyRank',
      recommend: 'getRecommend'
    })
  },
  methods: {
    async getCurrDate (currpage) {
      window.scroll(0, 0)
      if (this.$route.query.type) {
        this.type = this.$route.query.type
      }
      this.$store.dispatch('getReadyRank', {type: this.type, size: 5})
      this.$store.dispatch('getRecommend', {type: this.type, size: 5})
      await this.$store.dispatch('getResContentList', {type: this.type, currpage: currpage, size: this.pagination.pageSize})
      this.pagination.totalSize = this.resContentList.pageTotal
    },
    formatDate (date) {
      return Tool.formatDate1(date)
    },
    changeList (name) {
      this.$router.push('resContentList?type=' + name)
    },
    fetchData () {
      if (this.$route.name === 'resContentList' && this.$route.query.type && this.type !== null) {
        this.getCurrDate(1)
      }
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  async asyncData(context) {
    let store = context.store
    let type = context.route.query.type
    await store.dispatch('getArticleNav', 'myArticle')
    if (!type) {
      type = store.state.res.articleNav[0].name
    }
    await store.dispatch('getReadyRank', {type: type, size: 5})
    await store.dispatch('getRecommend', {type: type, size: 5})
    return store.dispatch('getResContentList', {type: type, currpage: 1, size: 5})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../style/common.less";
  .resContentList{
    width:100%;
  }
  .mainList{
     background:#fff;
     margin-top:20px;
     padding-top:20px;
  }
  .nav{
    width:100%;
    height:50px;
    background:#fff;
    margin-bottom:10px;
    border-bottom:1px solid @borderColor;
    line-height:47px;
    ul{
      li{
        float:left;
        margin:0px 20px;
        font-size:14px;
        color:#71777c;
        a{
          cursor: pointer;
        }
      }
    }
    .selectedBottom{
      border-bottom:3px solid @mainColor;
    }
  }
</style>
