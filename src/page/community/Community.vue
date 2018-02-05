<template>
  <div class="community">
      <div class="container">
          <div class="top">
            <img src="http://p3gc5ydac.bkt.clouddn.com/hd01.jpg" />
          </div>

          <div class="navList">
            <ul >
              <li v-for="(item) in resList" v-on:click="toCommunity(item.name)" :key="item.id" :class="item.name === type?'active' : ''">{{item.cname}}</li>
              <a v-on:click="publish" class="publish-btn">我要发文</a>
            </ul>
          </div>

        <div class="main-right">
          <div class="main">
            <div class="listContent">
                <div>
                  <Item v-for="(item) in communityList.content" v-bind:type="type" v-bind:itemData="item" :key="item.id" />
                  <Pagination v-bind:pagination = "pagination"/>
                </div>
            </div>
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
import RightList from '../../components/res/RightList'
import Item from '../../components/community/Item'
import Pagination from '../../plugins/pagination/Pagination'
import { mapGetters } from 'vuex'

export default {
  name: 'community',
  title () {
    return {
      title: '精英社区'
    }
  },
  components: {
    RightList,
    Item,
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
    if (this.$route.query.type) {
      this.type = this.$route.query.type
    } else {
      this.type = this.resList[0].name
    }
    this.pagination.totalSize = this.communityList.pageTotal
  },
  computed: {
    ...mapGetters({
      resList: 'getResList',
      communityList: 'getResContentList',
      readyRank: 'getReadyRank',
      recommend: 'getRecommend'
    })
  },
  methods: {
    async getCurrDate (currpage) {
      if (this.$route.query.type) {
        this.type = this.$route.query.type
      }
      this.$store.dispatch('getReadyRank', {type: this.type, size: 5})
      this.$store.dispatch('getRecommend', {type: this.type, size: 5})
      await this.$store.dispatch('getResContentList', {type: this.type, currpage: currpage, size: this.pagination.pageSize})
      this.pagination.totalSize = this.communityList.pageTotal
    },
    formatDate (date) {
      return Tool.formatDate2(date, '-')
    },
    toCommunity (type) {
      this.$router.push('Community?type=' + type)
    },
    fetchData () {
      if (this.$route.name === 'community') {
        this.getCurrDate(1)
      }
    },
    publish () {
      let userInfo = this.$store.state.common.userInfo
      if (userInfo && userInfo !== null) {
        this.$router.push('publishArticle?type=' + this.type)
      } else {
        this.$loginOrRegist.showLogin()
      }
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  async asyncData(context) {
    let store = context.store
    let type = context.route.query.type
    await store.dispatch('getResList', 'community')
    if (!type) {
      type = store.state.res.resList[0].name
    }
    await store.dispatch('getReadyRank', {type: type, size: 5})
    await store.dispatch('getRecommend', {type: type, size: 5})
    return store.dispatch('getResContentList', {type: type, currpage: 1, size: 5})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../style/common";
.community{
  .top{
    width:100%;
    >img{
      width:100%;
      height:200px;
    }
  }
  .navList{
    >ul{
      margin: 0px;
      width: 100%;
      height: 48px;
      background: #fff;
      border: 1px solid #f0f0f0;
      overflow: hidden;
      position: relative;
      .active{
        background:@mainColor;
        color:#fff;
      }
      >li{
        float: left;
        padding: 0 30px;
        border-right: 1px solid #f0f0f0;
        font-size: 16px;
        line-height: 48px;
        position: relative;
        cursor: pointer;
      }
    }
    .publish-btn{
      position: absolute;
      right: 20px;
      top: 9px;
      width: 80px;
      text-align: center;
      height: 30px;
      font-size:14px;
      background:@mainColor;
      color: #fff;
      line-height: 30px;
      cursor: pointer;
    }
  }
  .main-right{
    margin-top:10px;
  }
  .listContent{
    margin-right:360px;
    background:#fff;
    padding:20px;
    >div{
      >div:last-child{
        border-bottom:none;
      }
    }
  }
}

</style>
