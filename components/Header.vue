
<template>
  <v-container class="pa-0">
    <v-layout
      justify-center
      align-center
    >
      <v-row justify="center">
        <v-col
          sm="10"
          md="8"
          lg="6"
          class="d-flex"
        >
          <v-spacer />
          <v-menu
            offset-y
            left
            origin="top right"
            transition="scale-transition"
          >
            <template v-slot:activator="{ on }">
              <v-avatar
                size="40"
                tile
                :class="[$style.avatar]"
                class="mr-2"
                v-on="on"
              >
                <img
                  v-if="user.avatar"
                  :src="user.avatar"
                  :alt="`${user.name} ${user.surname}`"
                >
                <span v-else class="white--text headline">
                  {{ user.sign }}
                </span>
              </v-avatar>
            </template>

            <v-list>
              <v-list-item nuxt to="/">
                <v-list-item-title>Главная</v-list-item-title>
              </v-list-item>
              <v-list-item nuxt to="/settings">
                <v-list-item-title>Найстройки</v-list-item-title>
              </v-list-item>
              <v-list-item nuxt to="/list">
                <v-list-item-title>Список записей</v-list-item-title>
              </v-list-item>
              <v-list-item nuxt to="/about">
                <v-list-item-title>О проекте</v-list-item-title>
              </v-list-item>
              <v-list-item nuxt to="/help">
                <v-list-item-title>Помощь</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: ''
    },
    contenteditable: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      user: {
        avatar: 'https://cdn.vuetifyjs.com/images/john.jpg',
        name: 'Pavel',
        surname: 'Gonzales',
        sign: 'PG'
      }
    }
  },

  computed: {

  },

  mounted () {
  },

  destroyed () {
  },

  methods: {

  }
}
</script>
<style module>
.avatar {
  border-radius: 10px;
}
</style>
