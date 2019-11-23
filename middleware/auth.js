function getCookie (cookiename, cookies) {
  const cookiestring = new RegExp(`${cookiename}[^;]+`).exec(cookies)
  return decodeURIComponent(cookiestring ? cookiestring.toString().replace(/^[^=]+./, '') : '')
}

export default async function async ({ req, store, redirect, $axios }) {
  let token = ''

  if (store.state && store.state.auth && store.state.auth.isLoggedIn) {
    return
  }

  if (store.state && store.state.auth && store.state.auth.token) {
    token = store.state.auth.token
  } else if (req && req.headers && req.headers.cookie && getCookie('fiary_token', req.headers.cookie)) {
    token = getCookie('fiary_token', req.headers.cookie)
  } else {
    console.log('Пустой токен')
  }

  if (token) {
    $axios.onRequest((config) => {
      config.headers.common.Authorization = token
    })

    try {
      await store.dispatch('ME')

      store.dispatch('SET_TOKEN', token)
    } catch (err) {
      console.log('Ошибка проверки токена')
    }
  }
};
