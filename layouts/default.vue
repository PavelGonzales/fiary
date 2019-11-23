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
  settings: 'Найстройки',
  list: 'Хроника',
  about: 'О проекте',
  help: 'Помощь'
})

const allowedRouterNames = Object.freeze([
  'settings',
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
    ...mapState('modal', {
      open: ({ auth }) => auth.open
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
  }
}
</script>
