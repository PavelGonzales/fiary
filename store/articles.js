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
    async GET_ARTICLE ({ commit }) {
      try {
        const articles = await this.$axios.get(`http://localhost:3001/article/list/`)

        commit('setShortList', articles.data)
      } catch (err) {
        console.log('Ошибка articles/GET_ARTICLE')
      }
    }
  }
}
