<template>
  <v-row
    justify="center"
    align="center"
  >
    <v-col
      sm="5"
      lg="4"
      cols="12"
    >
      <div :class="$style.title">
        Fiary
      </div>
      <v-btn
        v-for="item in listMenu"
        :key="item.link"
        nuxt
        block
        :to="item.link"
        class="mb-3"
      >
        {{ item.text }}
      </v-btn>
      <v-btn
        text
        block
        x-small
        nuxt
        to="policy"
        class="mt-8 blue--text text--darken-3 text--underline"
      >
        Политика обработки персональных данных
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
  transition: 'slide-left',

  data () {
    return {
      listMenu: [
        {
          text: 'Создать запись',
          link: new Date().toISOString().substr(0, 10)
        },
        {
          text: 'Список записей',
          link: '/list'
        },
        {
          text: 'Профиль',
          link: '/profile'
        },
        {
          text: 'О проекте',
          link: '/about'
        },
        {
          text: 'Помощь',
          link: '/help'
        }
      ]
    }
  },

  computed: {
    ...mapState({
      user: ({ user }) => user,
      isLoggedIn: ({ auth }) => auth.isLoggedIn
    })
  }
}
</script>

<style module>
.title {
  font-size: 150px;
  text-align: center;
  color: #ccc;
  margin-top: -120px;
}
</style>
