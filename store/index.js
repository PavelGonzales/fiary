import Cookies from 'js-cookie'
import _get from 'lodash/get'

export const state = () => ({
  auth: {
    token: '',
    isLoggedIn: false
  },
  user: {
    name: '',
    surname: '',
    avatar: '',
    email: ''
  },
  browser: {
    online: true
  }
})

export const mutations = {
  setUser (state, data) {
    state.user = Object.assign(state.user, data)
  },

  setToken (state, token) {
    state.auth.token = token
    state.auth.isLoggedIn = true
  },

  setUnauthUser (state) {
    state.user = {
      username: '',
      email: ''
    }
    state.auth = {
      isLoggedIn: false,
      token: ''
    }
  },

  setNetworkStatus (state, online) {
    state.browser.online = online
  }
}

export const getters = {
  isOnline: state => state.browser.online
}

export const actions = {
  async REGISTRATION ({ dispatch }, { username, email, password }) {
    try {
      const { data } = await this.$axios.post(`${process.env.API_URL}/auth/registration`, { username, email: email.toLowerCase(), password })

      dispatch('LOGIN', { email, password })

      return data
    } catch (err) {
      return {
        error: _get(err, 'response.data.message') || 'Неизвестная ошибка'
      }
    }
  },

  async LOGIN ({ dispatch }, { email, password }) {
    try {
      const { data } = await this.$axios.post(
        `${process.env.API_URL}/auth/login`,
        { email: email.toLowerCase(), password }
      )

      const { token } = data

      this.$axios.onRequest((config) => {
        config.headers.common.Authorization = token
      })

      await dispatch('SET_TOKEN', token)
      await dispatch('ME')

      return data
    } catch (err) {
      return {
        error: _get(err, 'response.data.message') || 'Неизвестная ошибка'
      }
    }
  },

  LOGOUT ({ commit }) {
    try {
      Cookies.remove('fiary_token')

      commit('setUnauthUser')
    } catch (err) {
      return {
        error: _get(err, 'response.data.message') || 'Неизвестная ошибка'
      }
    }
  },

  async ME ({ dispatch }) {
    try {
      const { data } = await this.$axios.get(`${process.env.API_URL}/auth/me`)

      dispatch('SET_USER', data)
      return data
    } catch (err) {
      dispatch('LOGOUT')

      return {
        error: _get(err, 'response.data.message') || 'Неизвестная ошибка'
      }
    }
  },

  SET_TOKEN ({ commit }, token) {
    Cookies.set('fiary_token', token, { expires: 62 })

    commit('setToken', token)
  },

  SET_USER ({ commit }, data) {
    commit('setUser', data)
  },

  SET_NETWORK_STATUS ({ commit }, online) {
    commit('setNetworkStatus', online)
  }
}
