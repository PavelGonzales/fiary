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
    <v-dialog :value="removeDialog" persistent max-width="290">
      <v-card>
        <v-card-title>
          Вы уверены что хотите удалить запись?
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn color="green darken-1" text @click="answer('decline')">
            Вернуть запись
          </v-btn>
          <v-btn color="green darken-1" text @click="answer('accept')">
            Уверен
          </v-btn>
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

  beforeRouteLeave (to, from, next) {
    const contentChanged = this.contentModel !== this.content
    const contentRemoved = this.contentModel === ''

    if (!contentChanged) {
      next()
      return
    }

    if (!contentRemoved) {
      this.saveOrRemoveArticle()
      next()
      return
    }

    if (contentRemoved && !this.modalAnswer) {
      this.removeDialog = true
      this.routerTo = to.fullPath
      return
    }

    if (contentRemoved && this.modalAnswer === 'accept') {
      this.saveOrRemoveArticle()
      this.removeDialog = false
      next()
      return
    }

    if (contentRemoved && this.modalAnswer === 'decline') {
      this.removeDialog = false
      next()
    }
  },

  data () {
    return {
      contentModel: '',
      isAgreeRemove: false,
      routerTo: null,
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

  fetch ({ store, params }) {
    return store.dispatch('articles/GET_ARTICLE', { date: params.id })
  },

  created () {
    this.contentModel = this.content
    this.copyDateFromParams = this.date
  },

  methods: {
    onChangeDate (date) {
      this.$router.push(date)
    },
    saveOrRemoveArticle () {
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
    },
    answer (modalAnswer) {
      this.removeDialog = false
      this.modalAnswer = modalAnswer
      this.$router.push(this.routerTo)
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
