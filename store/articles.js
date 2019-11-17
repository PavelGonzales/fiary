export default {
  state: () => ({
    shortList: []
  }),

  mutations: {
    setShortList (state, articles) {
      state.shortList = articles
    }
  },

  actions: {
    async CREATE_ARTICLE ({ commit }, { content, shortContent, date }) {
      try {
        await this.$axios.post(`http://localhost:3001/article/add/`, { content, shortContent, date })
      } catch (err) {
        console.log('Ошибка articles/CREATE_ARTICLE')
      }
    },

    async GET_ARTICLE_LIST ({ commit }) {
      try {
        const articles = await this.$axios.get(`http://localhost:3001/article/list/`)

        commit('setShortList', articles.data)
      } catch (err) {
        console.log('Ошибка articles/GET_ARTICLE_LIST')
      }
    }
  }
}
