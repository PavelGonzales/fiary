<template>
  <v-app :style="{'background-color': '#fff'}">
    <transition name="slide-left">
      <Header v-if="isShowHeader" :title="headerTitle" />
    </transition>

    <v-content>
      <v-container class="fill-height">
        <nuxt />
      </v-container>
    </v-content>
    <AuthModal :open="open" />
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

import Header from '~/components/Header'
import AuthModal from '~/components/AuthModal'

const routerNamesMap = Object.freeze({
  profile: 'Профиль',
  list: 'Хроника',
  about: 'О проекте',
  help: 'Помощь'
})

const allowedRouterNames = Object.freeze([
  'profile',
  'list',
  'about',
  'help'
])

export default {
  components: {
    Header,
    AuthModal
  },

  computed: {
    ...mapState({
      open: ({ modal }) => modal.auth.open,
      isLoggedIn: ({ auth }) => auth.isLoggedIn
    }),
    isShowHeader () {
      return allowedRouterNames.includes(this.$route.name)
    },
    headerTitle () {
      return routerNamesMap[this.$route.name]
    }
  },

  created () {
    if (this.$route.query.auth === 'open') {
      this.$store.dispatch('modal/auth/TOGGLE', true)
    }
  },

  mounted () {
    if (this.isLoggedIn) {
      this.$store.dispatch('articles/GET_ARTICLE_LIST')
    }
  }
}
</script>
