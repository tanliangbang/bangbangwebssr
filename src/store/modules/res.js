import * as api from '../../service/getData'

const state = {
  resContentList: {},
  myprouction: {},
  resContent: {},
  communityNav: [],
  articleNav: []
}

const getters = {
  getArticleNav: state => {
    return state.articleNav
  },
  getCommunityNav: state => {
    return state.communityNav
  },
  getResContent: state => {
    return state.resContent
  },
  getResContentList: state => {
    return state.resContentList
  },
  getIndexProduction: state => {
    return state.myprouction
  },
  getMyproduction: state => {
    let resContentList = state.myprouction.content
    let myproduction = [[], [], [], []]
    for (let i = 0; i < resContentList.length; i++) {
      if (i % 4 === 0) {
        myproduction[0].push(resContentList[i])
      }
      if (i % 4 === 1) {
        myproduction[1].push(resContentList[i])
      }
      if (i % 4 === 2) {
        myproduction[2].push(resContentList[i])
      }
      if (i % 4 === 3) {
        myproduction[3].push(resContentList[i])
      }
    }
    return {content: myproduction, pageTotal: state.myprouction.pageTotal}
  }
}

const mutations = {
  GET_RESCONTENTLIST: (state, data) => {
    state.resContentList = data.data
  },
  GET_MYPRODUCTION: (state, data) => {
    state.myprouction = data.data
  },
  GET_ARTICLENAV: (state, data) => {
    state.articleNav = data
  },
  GET_COMMUNITY_NAV: (state, data) => {
    state.communityNav = data
  },
  GET_RESCONTENT: (state, data) => {
    state.resContent = data[0]
  }
}

const actions = {
  getArticleNav ({ state, commit }, type) {
    return api.getNav(type).then((response) => {
      commit('GET_ARTICLENAV', response.data)
    }).catch((error) => {
      console.log(error)
    })
  },
  getCommunityNav ({ state, commit }, type) {
    return api.getNav(type).then((response) => {
      commit('GET_COMMUNITY_NAV', response.data)
    }).catch((error) => {
      console.log(error)
    })
  },
  getResContent ({ state, commit }, param) {
    return api.getResContentById(param.id, param.type).then((response) => {
      commit('GET_RESCONTENT', response.data)
    }).catch((error) => {
      console.log(error)
    })
  },
  getResContentList ({ state, commit }, param) {
    let start = (param.currpage - 1) * param.size
    return api.getResContentList(param.type, start, param.size).then((response) => {
      if (param.type === 'production') {
        commit('GET_MYPRODUCTION', {data: response.data, type: param.type})
      } else {
        commit('GET_RESCONTENTLIST', {data: response.data, type: param.type})
      }
    }).catch((error) => {
      console.log(error)
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
