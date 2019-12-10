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
        <UnauthNotice v-if="!isLoggedIn" />

        <template v-else-if="!hasArticles">
          <p :style="{'font-size': '24px'}">
            У вас еще нет ниодной записи
          </p>
          <v-btn outlined class="mt-5" nuxt :to="new Date().toISOString().substr(0, 10)">
            Написать
          </v-btn>
        </template>
        <v-date-picker
          v-if="isLoggedIn"
          v-model="dateModel"
          no-title
          full-width
          :events="filledDates"
          event-color="green lighten-1"
          @change="onChangeDate"
        />
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import _get from 'lodash/get'
import UnauthNotice from '~/components/UnauthNotice'

export default {
  middleware: 'auth',

  transition: 'slide-left',

  components: {
    UnauthNotice
  },

  data () {
    return {
      dateModel: ''
    }
  },

  computed: {
    ...mapState({
      articles: ({ articles }) => articles.shortList,
      isLoggedIn: ({ auth }) => auth.isLoggedIn,
      isDarkTheme: ({ theme }) => theme.dark
    }),
    filledDates () {
      return this.articles.map(item => _get(item, 'date.link'))
    },
    hasArticles () {
      return this.articles.length
    }
  },

  methods: {
    onChangeDate (date) {
      this.$router.push(date)
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
