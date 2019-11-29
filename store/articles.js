export default {
  state: () => ({
    shortList: [],
    current: {}
  }),

  mutations: {
    setShortList (state, articles) {
      state.shortList = articles
    },

    setCurrentArticle (state, article) {
      state.current = article
    }
  },

  actions: {
    async CREATE_ARTICLE ({ commit }, { content, shortContent, date }) {
      try {
        await this.$axios.post(`${process.env.API_URL}/article/add/`, { content, shortContent, date })
      } catch (err) {
        console.log('Ошибка articles/CREATE_ARTICLE', err)
      }
    },

    async GET_ARTICLE ({ commit }, { date }) {
      try {
        const { data } = await this.$axios.get(`${process.env.API_URL}/article/${date}`)

        commit('setCurrentArticle', data)
        return data
      } catch (err) {
        console.log('Ошибка articles/GET_ARTICLE', err)
      }
    },

    async GET_ARTICLE_LIST ({ commit }) {
      try {
        const { data } = await this.$axios.post(`${process.env.API_URL}/article/list/`)

        commit('setShortList', data)
      } catch (err) {
        console.log('Ошибка articles/GET_ARTICLE_LIST', err)
      }
    },

    async FILE_UPLOAD ({ commit }, file) {
      try {
        const { data } = await this.$axios.post(`${process.env.API_URL}/article/fileUpload/`, file, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        return data
      } catch (err) {
        console.log('Ошибка articles/FILE_UPLOAD', err)
      }
    },

    async REMOVE_ARTICLE ({ commit }, { date }) {
      try {
        await this.$axios.post(`${process.env.API_URL}/article/remove/`, { date })
      } catch (err) {
        console.log('Ошибка articles/REMOVE_ARTICLE', err)
      }
    }
  }
}
