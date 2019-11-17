
<template>
  <v-container>
    <v-layout
      justify-center
      align-center
    >
      <v-row justify="center">
        <v-col
          sm="10"
          md="8"
          lg="6"
          class="d-flex align-center"
        >
          <div v-if="title" :class="$style.title">
            {{ title }}
          </div>
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
              <v-list-item
                v-for="item in menuList"
                :key="item.link"
                nuxt
                :to="item.link"
              >
                <v-list-item-title>{{ item.text }}</v-list-item-title>
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
    title: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      user: {
        avatar: 'https://cdn.vuetifyjs.com/images/john.jpg',
        name: 'Pavel',
        surname: 'Gonzales',
        sign: 'PG'
      },
      menuList: [
        {
          text: 'Главная',
          link: '/'
        },
        {
          text: 'Найстройки',
          link: 'settings'
        },
        {
          text: 'Хроника',
          link: 'list'
        },
        {
          text: 'О проекте',
          link: 'about'
        },
        {
          text: 'Помощь',
          link: 'help'
        }
      ]
    }
  }
}
</script>
<style module>
.avatar {
  border-radius: 10px;
}

.title {
  font-size: 36px;
}
</style>
