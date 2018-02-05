<template>
  <div class="index">
    <div class="container">
         <div class="model1">
             <p>在 bangbang，学习技能、解决问题</p>
             <p>每个月，我们帮助 1000 万的开发者解决各种各样的技术问题。并助力他们在技术能力、职业生涯、影响力上获得提升。</p>
         </div>
         <div class="model2">

           <p class="model-title">精品文章  <router-link to="/resContentList"> 更多精品文章</router-link></p>
          <div class="list-model1">
            <div v-for="(item) in goodArticles.content" :key="item.id" class="item">
              <p><router-link :to="{ path: '/resContent',query: { id: item.id, type: 'goodarticles' }}">{{item.content.title}}</router-link></p>
              <div>
                <span>作者:&nbsp;{{item.content.from}}</span>&nbsp;&nbsp;<span>日期&nbsp;:{{formatDate(item.createTime,'-')}}</span>&nbsp;&nbsp;<span>&nbsp;阅读:&nbsp;{{item.readyNum}}</span>
              </div>
              <router-link :to="{ path: '/resContent',query: { id: item.id, type: 'goodarticles' }}">立即阅读</router-link>
            </div>

          </div>

         </div>

          <div class="model4">
            <p class="model-title">我的作品  <router-link to="/resContentList"> 更多作品</router-link></p>
            <div>
                <ListItem v-for="(item) in myproduction.content" :key="item.id" v-bind:item = "item" />
            </div>
          </div>

          <div class="model3">
             <p class="model-title">项目案例  <router-link to="/myProduction"> 更多案例</router-link></p>
             <div>
               <div>
                 <img src="http://p3gc5ydac.bkt.clouddn.com/logo.png" />
                 <p>vue.js的项目搭建案例</p>
               </div>
               <div>
                 <img src="http://p3gc5ydac.bkt.clouddn.com/react.jpg" />
                 <p>vue.js的项目搭建案例</p>
               </div>
               <div>
                 <img src="http://p3gc5ydac.bkt.clouddn.com/nodejs.jpg" />
                 <p>vue.js的项目搭建案例</p>
               </div>
               <div>
                 <img src="http://p3gc5ydac.bkt.clouddn.com/angular.jpg" />
                 <p>vue.js的项目搭建案例</p>
               </div>
             </div>
            </div>

    </div>
  </div>
</template>

<script>
import Tool from '../utils/Tool'
import ListItem from '../components/production/ListItem'
import { mapGetters } from 'vuex'

export default {
  name: 'Index',
  title () {
    return {
      title: '首页',
      keywords: '码农集聚地',
      description: 'web前端资讯'
    }
  },
  components: {
    ListItem
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      goodArticles: 'getResContentList',
      myproduction: 'getIndexProduction'
    })
  },
  created () {
  },
  methods: {
    formatDate (date) {
      return Tool.formatDate2(date, '-')
    }
  },
  async asyncData({ store }) {
    await store.dispatch('getResContentList', {type: 'production', currpage: 1, size: 10})
    return store.dispatch('getResContentList', {type: 'goodarticles', currpage: 1, size: 10})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "./index";
</style>
