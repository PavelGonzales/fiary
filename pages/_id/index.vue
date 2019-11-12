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
        <div class="currentDate">{{ current.date }}</div>
        <app-editable-filed
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
import EditableFiled from '~/components/EdittableField'

export default {
  components: {
    'app-editable-filed': EditableFiled
  },

  data () {
    return {
      article: {}
    }
  },

  computed: {
    prev () {
      const date = (this.article && this.article.date && this.article.date.prev) || ''
      const link = date.replace(/\./g, '')
      return {
        date,
        link
      }
    },
    next () {
      const date = (this.article && this.article.date && this.article.date.next) || ''
      const link = date.replace(/\./g, '')
      return {
        date,
        link
      }
    },
    current () {
      const date = (this.article && this.article.date && this.article.date.current) || ''
      const link = date.replace(/\./g, '')
      return {
        date,
        link
      }
    }
  },

  created () {
    this.getArticle()
  },

  methods: {
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
