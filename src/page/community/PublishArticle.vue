<template>
  <div class="publishArticle">
    <div class="container">
      <div class="myform">
        <p class="title">发表文章</p>
  <div>
  <div class="nomalInput">
  <span>标题</span> <input v-model="publishForm.title"  placeholder="请输入标题" type="text" v-on:blur="checkValue('title')" />
  <p :class="rules.title.error?'showError':'hidenError'">{{rules.title.message}}</p>
</div>
<div class="nomalInput">
  <span>简介</span> <input v-model="publishForm.breif" placeholder="请输入简介" v-on:blur="checkValue('breif')" type="text"/>
  <p :class="rules.breif.error?'showError':'hidenError'">{{rules.breif.message}}</p>
</div>
<div class="fileinput">
  <span>图片</span>
  <div v-on:click="inputClick($event)">
  <span class="addIcon">+</span>
  <img src=""/>
  </div>
  <input v-on:change="getImgDate($event)" type="file" />
  <a class="delImg" v-on:click="deleteImg($event)">删除图片</a>
  </div>
  <div class="content">
  <span>内容</span>
  <div>
  <div id="editor" class="textArea"></div>
  <p :class="rules.content.error?'showError':'hidenError'">{{rules.content.message}}</p>
</div>
</div>
<div class="commit-btn">
  <button v-on:click="publish">发&nbsp;&nbsp;表</button>
</div>
</div>
</div>
</div>
</div>
</template>

<script>
import * as api from '../../service/getData'
if (typeof window !== 'undefined') {
  require('../../../static/UE/ueditor.config')
  require('../../../static/UE/ueditor.all')
  require('../../../static/UE/lang/zh-cn/zh-cn.js')
}

export default {
  name: 'publishArticle',
  title () {
    return {
      title: '发表文章'
    }
  },
  data () {
    return {
      UE: null,
      type: null,
      publishForm: {
        userId: null,
        title: '',
        breif: '',
        titleImg: '',
        content: ''
      },
      rules: {
        title: {
          error: false,
          message: '请输入标题'
        },
        breif: {
          error: false,
          message: '请输入标题'
        },
        content: {
          error: false,
          message: '请输入标题'
        }
      }
    }
  },
  mounted () {
    window.scroll(0, 0)
    this.type = this.$route.query.type
    let _this = this
    if (!_this.$store.state.common.userInfo || _this.$store.state.common.userInfo === null) {
      _this.$router.push('/community')
    }
    let ue = this.UE = window.UE.getEditor('editor')
    ue.ready(function () {
      ue.setHeight('100%')
    })
  },
  methods: {
    inputClick ($event) {
      $event.currentTarget.nextElementSibling.click()
    },
    async getImgDate ($event) {
      let _this = $event.currentTarget
      let file = _this.files[0]
      if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg') {
        /* eslint-disable no-undef */
        let param = new FormData() // 创建form对象
        param.append('resImg', file, file.name) // 通过append向form对象添加数据
        param.append('chunk', '0') // 添加form表单中其他数据
        let config = {'Content-Type': 'multipart/form-data'}
        this.publishForm.titleImg = await api.uploadImg(param, config)
        _this.nextElementSibling.style.display = 'inline-block'
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {
          let preNode = _this.previousElementSibling
          preNode.lastChild.src = this.result
          preNode.lastChild.style.display = 'block'
          preNode.firstChild.style.display = 'none'
        }
      } else {
        _this.value = null
        this.$prompt.error('请选择正确的图片')
      }
    },
    deleteImg (event) {
      let _this = event.currentTarget
      _this.previousElementSibling.value = ''
      this.publishForm.titleImg = ''
      let preNode = _this.previousElementSibling.previousElementSibling
      preNode.lastChild.src = ''
      preNode.lastChild.style.display = 'none'
      preNode.firstChild.style.display = 'block'
      _this.style.display = 'none'
    },
    checkValue (value) {
      if (this.publishForm[value] === '') {
        this.rules[value].error = true
        if (value === 'title') {
          this.rules[value].message = '请输入标题'
        } else {
          this.rules[value].message = '请输入简介'
        }
        return false
      } else {
        this.rules[value].error = false
        return true
      }
    },
    async publish () {
      let title = this.checkValue('title')
      let breif = this.checkValue('breif')
      if (title && breif) {
        if (this.UE.getContent() === '') {
          this.rules.content.error = true
          this.rules.content.message = '请输入内容'
          return true
        } else {
          this.publishForm.content = this.UE.getContent()
          await api.publishArticle(JSON.stringify(this.publishForm), this.type)
          this.$prompt.success('发表成功')
          this.$router.push('/community?type=' + this.type)
        }
      }
    }
  },
  destroyed () {
    this.UE.destroy()
  },
  async asyncData({ store }) {
    return store.dispatch('getUserInfo')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "./index";
</style>
