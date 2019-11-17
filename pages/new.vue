<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-row justify="center" :style="{width: '100%'}">
      <v-col
        sm="10"
        md="8"
        lg="6"
      >
        <HeadingDatePicker
          :filled-dates="filledDates"
          :class="$style.currentDate"
          @changeDate="onChangeDate"
        />
        <ContentEditable />
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import ContentEditable from '~/components/ContentEditable'
import HeadingDatePicker from '~/components/HeadingDatePicker'

export default {
  components: {
    ContentEditable,
    HeadingDatePicker
  },

  transition (to, from) {
    if (!from) {
      return 'slide-left'
    }
    return +to.params.id < +from.params.id ? 'slide-right' : 'slide-left'
  },

  computed: {
    ...mapState({
      articles: ({ articles }) => articles.shortList
    }),
    filledDates () {
      return this.articles.map(item => item.date.link)
    }
  },

  async fetch ({ store }) {
    await store.dispatch('articles/GET_ARTICLE_LIST')
  },

  methods: {
    onChangeDate (date) {
      this.$router.push(date)
    }
  }
}
</script>

<style module>
.currentDate {
  font-size: 90px;
}

@media (max-width: 599px) {
  .currentDate {
    font-size: 13vw;
  }
}
</style>
