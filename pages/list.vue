<template>
  <v-layout
    justify-center
    :class="{[$style.dark]: isDarkTheme}"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        sm="10"
        md="8"
        lg="6"
      >
        <template v-if="!isLoggedIn">
          <p :style="{'font-size': '24px'}">
            К сожалению мы пока не поддерживаем оффлайн режим. Поэтому рекомендуем авторизоваться.
          </p>
          <v-btn outlined class="mt-5" @click="openAuthModal">
            Войти в аккаунт
          </v-btn>
        </template>
        <template v-else-if="!hasArticles">
          <p :style="{'font-size': '24px'}">
            У вас еще нет ниодной записи
          </p>
          <v-btn outlined class="mt-5" nuxt :to="new Date().toISOString().substr(0, 10)">
            Написать
          </v-btn>
        </template>
        <template v-if="isLoggedIn">
          <template
            v-for="article in articles"
          >
            <nuxt-link
              :key="article.date.link"
              :class="['mb-5', $style.card]"
              :to="article.date.link"
            >
              <div :class="$style.cardDate">
                {{ article.date.text }}
              </div>
              <div :class="$style.cardContent">
                {{ article.content }}
              </div>
            </nuxt-link>
            <hr :key="article.date.text" class="divider mt-12 mb-4">
          </template>
        </template>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'

export default {
  middleware: 'auth',

  transition: 'slide-left',

  computed: {
    ...mapState({
      articles: ({ articles }) => articles.shortList,
      isLoggedIn: ({ auth }) => auth.isLoggedIn,
      isDarkTheme: ({ theme }) => theme.dark
    }),
    hasArticles () {
      return this.articles.length
    }
  },

  methods: {
    openAuthModal () {
      this.$store.dispatch('modal/auth/TOGGLE', true)
    }
  }
}
</script>

<style module>
.card {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.87)!important;
}

.dark .card {
  color: rgba(255, 255, 255, 0.87)!important;
}

.cardDate {
  font-size: 76px;
}

@media (max-width: 599px) {
  .cardDate {
    font-size: 14vw;
  }
}

.cardContent {
  font-size: 24px;
}
</style>
