import _get from 'lodash/get'

function getCookie (cookiename, cookies) {
  const cookiestring = new RegExp(`${cookiename}[^;]+`).exec(cookies)
  return decodeURIComponent(cookiestring ? cookiestring.toString().replace(/^[^=]+./, '') : '')
}

export default async function async ({ req, store, app: { $axios } }) {
  let token = _get(store, 'state.auth.token') || ''
  const isLoggedIn = _get(store, 'state.auth.isLoggedIn') || false
  const cookie = _get(req, 'headers.cookie') || ''

  if (isLoggedIn) {
    return
  }

  if (!token && cookie && getCookie('fiary_token', cookie)) {
    token = getCookie('fiary_token', cookie)
  } else {
    console.log('Пустой токен')
  }

  if (token) {
    $axios.onRequest((config) => {
      config.headers.common.Authorization = token
    })

    try {
      const me = await store.dispatch('ME')

      if (!me.error) {
        store.dispatch('SET_TOKEN', token)
      }
    } catch (err) {
      console.log('Ошибка проверки токена')
    }
  }
};
