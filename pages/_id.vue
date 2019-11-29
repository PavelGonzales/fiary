<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-row justify="center" :style="{width: '100%'}">
      <v-col
        sm="1"
        md="2"
        align-self="center"
        class="pa-0 sticky-col d-none d-sm-flex"
      >
        <v-btn v-if="prev.text" rounded text nuxt :to="prev.link">
          <v-icon class="d-md-none">
            mdi-chevron-left
          </v-icon>
          <span class="d-none d-md-inline-block text-lowercase">{{ prev.text }}</span>
        </v-btn>
      </v-col>
      <v-col
        sm="10"
        md="8"
        lg="6"
      >
        <HeadingDatePicker
          :date="date"
          :filled-dates="filledDates"
          class="currentDate"
          @changeDate="onChangeDate"
        />
        <ContentEditable
          v-model="contentModel"
        />
      </v-col>
      <v-col
        sm="1"
        md="2"
        align-self="center"
        class="pa-0 sticky-col d-none d-sm-flex"
      >
        <v-btn v-if="next.text" rounded text nuxt :to="next.link">
          <v-icon class="d-md-none">
            mdi-chevron-right
          </v-icon>
          <span class="d-none d-md-inline-block text-lowercase">{{ next.text }}</span>
        </v-btn>
      </v-col>
    </v-row>
    <v-dialog v-model="removeDialog" persistent max-width="290">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">Use Google's location service?</v-card-title>
        <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="removeDialog = false">Disagree</v-btn>
          <v-btn color="green darken-1" text @click="removeDialog = false">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import _get from 'lodash/get'
import dayjs from 'dayjs'
import { mapState } from 'vuex'
import ContentEditable from '~/components/ContentEditable'
import HeadingDatePicker from '~/components/HeadingDatePicker'

export default {
  middleware: 'auth',

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

  data () {
    return {
      contentModel: '',
      copyDateFromParams: undefined,
      removeDialog: false
    }
  },

  computed: {
    ...mapState({
      articles: ({ articles }) => articles.shortList,
      article: ({ articles }) => articles.current
    }),
    filledDates () {
      return this.articles.map(item => _get(item, 'date.link'))
    },
    prev () {
      return _get(this, 'article.date.prev') || {}
    },
    next () {
      return _get(this, 'article.date.next') || {
        text: 'Новая запись',
        link: dayjs().add(1, 'd').format('YYYY-MM-DD')
      }
    },
    current () {
      return _get(this, 'article.date.current') || {}
    },
    content () {
      return _get(this, 'article.content') || ''
    },
    date () {
      return this.$route.params.id
    }
  },

  watch: {
    $route (to, from) {
      this.saveChanges()
    }
  },

  fetch ({ store, params }) {
    return store.dispatch('articles/GET_ARTICLE', { date: params.id })
  },

  created () {
    this.contentModel = this.content
    this.copyDateFromParams = this.date
  },

  beforeDestroy () {
    this.saveChanges()
  },

  methods: {
    onChangeDate (date) {
      this.$router.push(date)
    },
    saveChanges () {
      if (this.content === this.contentModel) {
        return
      }
      if (this.contentModel === '') {
        this.removeDialog = true
        return
      }
      if (this.contentModel) {
        const shortContent = ''

        this.$store.dispatch('articles/CREATE_ARTICLE', {
          content: this.contentModel,
          shortContent,
          date: this.copyDateFromParams
        })
      } else {
        this.$store.dispatch('articles/REMOVE_ARTICLE', {
          date: this.copyDateFromParams
        })
      }
    }
  }
}
</script>

<style scoped>
.sticky-col {
  position: sticky;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  height: 100vh;
}

.currentDate {
  font-size: 90px;
}

@media (max-width: 680px) {
  .currentDate {
    font-size: 78px;
  }
}

@media (max-width: 599px) {
  .currentDate {
    font-size: 13vw;
  }
}
</style>
