<template>
  <div class="myProduction">
      <div class="container">
        <div class="production-page">
          <img src="http://p3gc5ydac.bkt.clouddn.com/proImg.jpg">
          <div class="productionList">
            <div>
              <ListItem v-for="(item) in myproduction.content[0]" :key="item.id" v-bind:item="item" />
            </div>
            <div>
              <ListItem v-for="(item) in myproduction.content[1]" :key="item.id" v-bind:item="item" />
            </div>
            <div>
              <ListItem v-for="(item) in myproduction.content[2]" :key="item.id" v-bind:item="item" />
            </div>
            <div>
              <ListItem v-for="(item) in myproduction.content[3]" :key="item.id" v-bind:item="item" />
            </div>
          </div>

        </div>

      </div>
  </div>
</template>

<script>
import ListItem from '../../components/production/ListItem'
import { mapGetters } from 'vuex'

export default {
  name: 'MyProduction',
  title () {
    return {
      title: '我的作品'
    }
  },
  components: {
    ListItem
  },
  data () {
    return {}
  },
  mounted () {
    window.scroll(0, 0)
  },
  computed: {
    ...mapGetters({
      myproduction: 'getMyproduction'
    })
  },
  methods: {
  },
  asyncData({ store }) {
    return store.dispatch('getResContentList', {type: 'production', currpage: 1, size: 5})
  }
}
</script>

<style lang="less" scoped>
  @import "../../style/common.less";
  .productionList{
    display: flex;
    flex-wrap:wrap;
    >div{
      flex:1;
      margin:20px;
    }
  }

  .production-page{
    background:#fff;
    >img{
      width:100%;
      height:200px;
    }
  }
</style>
