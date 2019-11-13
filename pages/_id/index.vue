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
        <v-btn v-if="prev.date" rounded text nuxt :to="prev.link">
          {{ prev.date }}
        </v-btn>
      </v-col>
      <v-col
        xs="12"
        sm="10"
        md="8"
      >
        <div class="currentDate">
          {{ current.date }}
        </div>
        <ContentEditable
          :content="article.content"
        />
      </v-col>
      <v-col
        xs="12"
        sm="1"
        md="1"
        align-self="center"
        class="pa-0 sticky-col d-none d-sm-flex"
      >
        <v-btn v-if="next.date" rounded text nuxt :to="next.link">
          {{ next.date }}
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

  data () {
    return {
      article: {}
    }
  },

  computed: {
    prev () {
      return this.createDateLink('prev')
    },
    next () {
      return this.createDateLink('next')
    },
    current () {
      return this.createDateLink('current')
    }
  },

  created () {
    this.getArticle()
  },

  methods: {
    createDateLink (key) {
      const date = (this.article && this.article.date && this.article.date[key]) || ''
      const link = date.replace(/\./g, '')
      return {
        date,
        link
      }
    },
    async getArticle () {
      const article = await import(`~/mocks/${this.$route.params.id}.js`)

      this.article = article.default
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
  font-size: 150px;
}
</style>
