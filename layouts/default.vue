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
  </v-app>
</template>

<script>
import Header from '~/components/Header'

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
    Header
  },

  computed: {
    isShowHeader () {
      return allowedRouterNames.includes(this.$route.name)
    },
    headerTitle () {
      return routerNamesMap[this.$route.name]
    }
  }
}
</script>
