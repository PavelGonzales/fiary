<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-row justify="center">
      <v-col
        xs="12"
        sm="10"
        md="8"
      >
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
          <hr :key="article.date.text" :class="$style.divider">
        </template>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
export default {
  transition: 'slide-left',

  computed: {
    ...mapState({
      articles: ({ articles }) => articles.shortList
    })
  },

  created () {
    this.$store.dispatch('articles/GET_ARTICLE')
  }
}
</script>

<style module>
.card {
  color: initial;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.87)!important;
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

.divider {
  position: relative;
  height: 1px;
  border: none;
  margin-top: 46px;
  margin-bottom: 16px;
}

.divider::before {
  content: "";
  position: absolute;
  top: 0;
  left: 5%;
  right: 5%;
  width: 90%;
  height: 1px;
  background-image: linear-gradient(to right, transparent, rgba(0, 0, 0, 0.5), transparent);
}
</style>
