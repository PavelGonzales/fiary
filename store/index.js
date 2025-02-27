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
    username: '',
    sign: '',
    avatar: '',
    email: ''
  },
  browser: {
    online: true
  },
  theme: {
    dark: false
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
      name: '',
      surname: '',
      username: '',
      sign: '',
      avatar: '',
      email: ''
    }
    state.auth = {
      isLoggedIn: false,
      token: ''
    }
  },

  setNetworkStatus (state, online) {
    state.browser.online = online
  },

  switchTheme (state, value) {
    state.theme.dark = value
  }
}

export const getters = {
  isOnline: state => state.browser.online
}

export const actions = {
  async REGISTRATION ({ dispatch }, { name, surname, email, password }) {
    try {
      const { data } = await this.$axios.post(`${process.env.API_URL}/auth/registration`, {
        name,
        surname,
        username: `${name} ${surname}`.trim(),
        email: email.toLowerCase(),
        password
      })

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

      if (!data.error) {
        dispatch('articles/GET_ARTICLE_LIST')
      }
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
    const name = data.name || ''
    const surname = data.surname || ''

    const processData = {
      ...data,
      username: `${name} ${surname}`,
      sign: `${(name && name[0]) || ''}.${(surname && surname[0]) || ''}.`
    }
    commit('setUser', processData)
  },

  SET_NETWORK_STATUS ({ commit }, online) {
    commit('setNetworkStatus', online)
  },

  SWITCH_THEME ({ commit }, value) {
    commit('switchTheme', value)
    console.log(this.app.vuetify.framework.theme.dark)
    this.app.vuetify.framework.theme.dark = value
    console.log(this.app.vuetify.framework.theme.dark)
  }
}
