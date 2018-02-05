import * as api from '../../service/getData'

const state = {
  home: {}
}

const getters = {
  getHome: state => {
    return state.home
  }
}

const mutations = {
  GET_HOME: (state, home) => {
    state.home = home
  }
}

const actions = {
  async getHome ({ state, commit }, param) {
    let data = {}
    let obj1 = await api.getResContentList('goodarticles', 0, 5)
    data.goodArticles = obj1.data.content
    let obj2 = await api.getResContentList('production', 0, 10)
    data.myproduction = obj2.data.content
    commit('GET_HOME', data)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
