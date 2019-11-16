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
          <span class="d-none d-md-inline-block">{{ prev.text }}</span>
        </v-btn>
      </v-col>
      <v-col
        sm="10"
        md="8"
      >
        <HeadingDatePicker
          :date="current.link"
          class="currentDate"
        />
        <ContentEditable
          :content="content"
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
          <span class="d-none d-md-inline-block">{{ next.text }}</span>
        </v-btn>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import _get from 'lodash/get'
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
    prev () {
      return _get(this, 'article.date.prev') || {}
    },
    next () {
      return _get(this, 'article.date.next') || {}
    },
    current () {
      return _get(this, 'article.date.current') || {}
    },
    content () {
      return _get(this, 'article.content') || ''
    }
  },

  async asyncData ({ store, params, $axios }) {
    const { data } = await $axios.get(`http://localhost:3001/article/${params.id}`)
    return {
      article: data
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
</style>
