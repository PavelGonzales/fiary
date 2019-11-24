import _get from 'lodash/get'

export default {
  state: () => ({
    open: false
  }),

  mutations: {
    toggle (state, value) {
      state.open = value
    }
  },

  actions: {
    TOGGLE ({ commit }, value) {
      try {
        commit('toggle', value)
        const query = { ...(_get(this, '$router.history.current.query') || {}) }
        if (!value) {
          delete query.auth
          this.$router.replace({ query })
        } else {
          query.auth = 'open'
        }
        this.$router.replace({ query })
      } catch (err) {
        console.log('Ошибка modal/auth/CLOSE', err)

        return {
          error: _get(err, 'response.data.message') || 'Неизвестная ошибка'
        }
      }
    }
  }
}
