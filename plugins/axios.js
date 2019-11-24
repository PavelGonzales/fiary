import _get from 'lodash/get'

export default function ({ $axios, app, store }) {
  $axios.onRequest((config) => {
    const token = _get(store, 'state.auth.token') || ''
    if (token) {
      config.headers.common.Authorization = token
    }
  })
}
