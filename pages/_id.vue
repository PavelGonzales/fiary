<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-row justify="center" :style="{width: '100%'}">
      <v-col
        xs="12"
        sm="1"
        md="1"
        align-self="center"
        class="pa-0 sticky-col d-none d-sm-flex"
      >
        <v-btn v-if="prev.text" rounded text nuxt :to="prev.link">
          {{ prev.text }}
        </v-btn>
      </v-col>
      <v-col
        xs="12"
        sm="10"
        md="8"
      >
        <div class="currentDate">
          {{ current.text }}
        </div>
        <ContentEditable
          :content="content"
        />
      </v-col>
      <v-col
        xs="12"
        sm="1"
        md="1"
        align-self="center"
        class="pa-0 sticky-col d-none d-sm-flex"
      >
        <v-btn v-if="next.text" rounded text nuxt :to="next.link">
          {{ next.text }}
        </v-btn>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import ContentEditable from '~/components/ContentEditable'

export default {
  components: {
    ContentEditable
  },

  transition (to, from) {
    if (!from) {
      return 'slide-left'
    }
    return +to.params.id < +from.params.id ? 'slide-right' : 'slide-left'
  },

  computed: {
    prev () {
      return this.article.date.prev
    },
    next () {
      return this.article.date.next
    },
    current () {
      return this.article.date.current
    },
    content () {
      return this.article.content
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
