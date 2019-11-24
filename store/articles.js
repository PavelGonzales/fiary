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
        console.log('Ошибка articles/CREATE_ARTICLE', err)
      }
    },

    async GET_ARTICLE_LIST ({ commit }) {
      try {
        const { data } = await this.$axios.post(`http://localhost:3001/article/list/`)

        commit('setShortList', data)
      } catch (err) {
        console.log('Ошибка articles/GET_ARTICLE_LIST', err)
      }
    },

    async FILE_UPLOAD ({ commit }, file) {
      try {
        const { data } = await this.$axios.post(`http://localhost:3001/article/fileUpload/`, file, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        return data
      } catch (err) {
        console.log('Ошибка articles/FILE_UPLOAD', err)
      }
    },

    async REMOVE_ARTICLE ({ commit }, { date }) {
      try {
        await this.$axios.post(`http://localhost:3001/article/remove/`, { date })
      } catch (err) {
        console.log('Ошибка articles/REMOVE_ARTICLE', err)
      }
    }
  }
}
